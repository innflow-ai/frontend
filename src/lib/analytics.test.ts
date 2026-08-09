import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { captureMarketingEvent } from "@/lib/analytics";

describe("captureMarketingEvent", () => {
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
  });

  afterEach(() => {
    window.localStorage.clear();
    Reflect.deleteProperty(window, "posthog");
  });

  it("emits the first-party event without analytics consent", () => {
    const listener = vi.fn();
    const posthog = { capture: vi.fn() };
    Object.assign(window, { posthog });
    window.addEventListener("innflow:analytics", listener, { once: true });

    captureMarketingEvent("marketing_cta_clicked", { label: "hero_demo" });

    expect(listener).toHaveBeenCalledOnce();
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it("forwards events to PostHog only after analytics consent", () => {
    const posthog = { capture: vi.fn() };
    Object.assign(window, { posthog });
    window.localStorage.setItem("innflow-cookie-consent", "analytics");

    captureMarketingEvent("marketing_cta_clicked", { label: "hero_demo" });

    expect(posthog.capture).toHaveBeenCalledWith("marketing_cta_clicked", {
      label: "hero_demo",
    });
  });
});
