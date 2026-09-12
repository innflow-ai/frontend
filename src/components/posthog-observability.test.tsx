import { act, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  dropThirdPartyExceptions,
  PostHogObservability,
} from "@/components/posthog-observability";
import { EXPERIENCE_KEY } from "@/lib/marketing-experience";

function exceptionEvent(filename: string | undefined) {
  return {
    event: "$exception",
    properties: {
      $exception_list: [{ stacktrace: { frames: [{ filename }] } }],
    },
  } as unknown as Parameters<typeof dropThirdPartyExceptions>[0];
}

const posthog = vi.hoisted(() => ({
  __loaded: false,
  capture: vi.fn(),
  has_opted_out_capturing: vi.fn(() => false),
  init: vi.fn(),
  get_property: vi.fn(),
  opt_in_capturing: vi.fn(),
  opt_out_capturing: vi.fn(),
  startSessionRecording: vi.fn(),
  stopSessionRecording: vi.fn(),
}));

vi.mock("posthog-js", () => ({ default: posthog }));
vi.mock("@/config/site", () => ({
  siteConfig: {
    analytics: {
      posthogHost: "https://us.i.posthog.com",
      posthogKey: "test-project-key",
    },
  },
}));

describe("PostHogObservability", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    const storage: Storage = {
      get length() {
        return values.size;
      },
      clear: () => values.clear(),
      getItem: (key) => values.get(key) ?? null,
      key: (index) => [...values.keys()][index] ?? null,
      removeItem: (key) => values.delete(key),
      setItem: (key, value) => values.set(key, value),
    };

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: storage,
    });
    window.localStorage.clear();
    vi.clearAllMocks();
    posthog.__loaded = false;
    Reflect.deleteProperty(window, "posthog");
  });

  it("loads PostHog only after Termly grants analytics consent", async () => {
    const handlers = new Map<
      string,
      (data: { categories?: string[] }) => void
    >();

    window.Termly = {
      getConsentState: () => ({ analytics: false }),
      on: (event, callback) => handlers.set(event, callback),
    };

    render(<PostHogObservability />);

    expect(posthog.init).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(window.localStorage.getItem("innflow-cookie-consent")).toBe(
        "denied",
      ),
    );

    act(() => handlers.get("consent")?.({ categories: ["analytics"] }));

    await waitFor(() => expect(posthog.init).toHaveBeenCalledOnce());
    const beforeSend = posthog.init.mock.calls[0][1].before_send;
    posthog.get_property.mockImplementation((key: string) =>
      key === "experiment_version" ? EXPERIENCE_KEY : "new",
    );
    expect(
      beforeSend(exceptionEvent("https://connect.facebook.net/bridge.js")),
    ).toBeNull();
    const siteException = exceptionEvent("/_next/static/chunk.js");
    expect(beforeSend(siteException)).toBe(siteException);
    expect(siteException?.properties).toMatchObject({
      [`$feature/${EXPERIENCE_KEY}`]: "new",
      experiment_version: EXPERIENCE_KEY,
    });
    const pageview = { event: "$pageview", properties: {} };
    expect(beforeSend(pageview)).toBe(pageview);
    expect(pageview.properties).toMatchObject({
      [`$feature/${EXPERIENCE_KEY}`]: "new",
      experiment_version: EXPERIENCE_KEY,
    });
    expect(posthog.startSessionRecording).not.toHaveBeenCalled();
    expect(window.localStorage.getItem("innflow-cookie-consent")).toBe(
      "analytics",
    );

    act(() => handlers.get("consent")?.({ categories: ["essential"] }));

    await waitFor(() =>
      expect(posthog.stopSessionRecording).toHaveBeenCalledOnce(),
    );
    expect(posthog.opt_out_capturing).toHaveBeenCalledOnce();
    expect(window.localStorage.getItem("innflow-cookie-consent")).toBe(
      "denied",
    );

    posthog.has_opted_out_capturing.mockReturnValue(true);
    act(() => handlers.get("consent")?.({ categories: ["analytics"] }));

    await waitFor(() =>
      expect(posthog.opt_in_capturing).toHaveBeenCalledOnce(),
    );
    expect(posthog.capture).toHaveBeenCalledWith("$pageview");
    expect(posthog.startSessionRecording).toHaveBeenCalledOnce();
  });
});

describe("dropThirdPartyExceptions", () => {
  it("drops an exception with no site-owned frame", () => {
    expect(
      dropThirdPartyExceptions(
        exceptionEvent("https://connect.facebook.net/bridge.js"),
      ),
    ).toBeNull();
  });

  it("keeps an exception raised by a same-origin script", () => {
    const event = exceptionEvent(
      `${window.location.origin}/_next/static/chunk.js`,
    );
    expect(dropThirdPartyExceptions(event)).toBe(event);
  });

  it("keeps an exception raised by a root-relative script", () => {
    const event = exceptionEvent("/_next/static/chunk.js");
    expect(dropThirdPartyExceptions(event)).toBe(event);
  });

  it("drops an exception with no resolvable filename", () => {
    expect(dropThirdPartyExceptions(exceptionEvent(undefined))).toBeNull();
  });

  it("keeps events that are not exceptions", () => {
    const event = {
      event: "$pageview",
      properties: {},
    } as unknown as Parameters<typeof dropThirdPartyExceptions>[0];
    expect(dropThirdPartyExceptions(event)).toBe(event);
  });
});
