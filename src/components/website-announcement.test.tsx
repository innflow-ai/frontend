import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  announcementState,
  normalizeAnnouncement,
  remainingSeconds,
  type WebsiteAnnouncement,
} from "@/config/website-announcement";
import { WebsiteAnnouncementBar } from "./website-announcement";

const now = Date.parse("2026-11-13T12:00:00Z");
const config: WebsiteAnnouncement = {
  enabled: true,
  id: "test",
  offer: {
    message: "Test offer",
    targetTime: new Date(now + 2000).toISOString(),
    displayTimeZone: "UTC",
    action: { label: "View offer", href: "/pricing" },
  },
  modelRelease: {
    id: "release",
    name: "Example model",
    iconSrc: "/brand/google-g.svg",
    action: { label: "Explore model", href: "/" },
  },
};
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
it("keeps model and switches action after offer expiry, then stops ticking", () => {
  render(<WebsiteAnnouncementBar config={config} initialNow={now} />);
  expect(screen.getByRole("link", { name: /View offer/ })).toBeInTheDocument();
  act(() => vi.advanceTimersByTime(2000));
  expect(screen.queryByText("Test offer")).toBeNull();
  expect(screen.getByText("Example model")).toBeInTheDocument();
  expect(screen.getByText("- Exclusive on innflow")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Explore model/ }),
  ).toBeInTheDocument();
  expect(vi.getTimerCount()).toBe(0);
});
it("dismisses persistently but new releases appear", () => {
  const view = render(
    <WebsiteAnnouncementBar config={config} initialNow={now} />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Dismiss announcement" }));
  view.unmount();
  const next = render(
    <WebsiteAnnouncementBar config={config} initialNow={now} />,
  );
  expect(screen.queryByRole("complementary")).toBeNull();
  next.rerender(
    <WebsiteAnnouncementBar
      config={{
        ...config,
        modelRelease: { ...config.modelRelease!, id: "next" },
      }}
      initialNow={now}
    />,
  );
  expect(screen.getByText("Example model")).toBeInTheDocument();
});
it("supports model-only and scheduled offer states", () => {
  expect(
    announcementState(
      {
        ...config,
        offer: {
          ...config.offer!,
          startsAt: new Date(now + 1000).toISOString(),
        },
      },
      now,
    ).offer,
  ).toBeUndefined();
  render(
    <WebsiteAnnouncementBar
      config={{ ...config, offer: undefined }}
      initialNow={now}
    />,
  );
  expect(screen.queryByRole("timer")).toBeNull();
  expect(screen.getByText("Example model")).toBeInTheDocument();
});
it("hides offer-only exactly at deadline and clears offset", () => {
  render(
    <WebsiteAnnouncementBar
      config={{ ...config, modelRelease: undefined }}
      initialNow={now}
    />,
  );
  act(() => vi.advanceTimersByTime(2000));
  expect(screen.queryByRole("complementary")).toBeNull();
  expect(
    document.documentElement.style.getPropertyValue("--announcement-h"),
  ).toBe("0px");
  expect(remainingSeconds(config.offer!.targetTime, now + 1999)).toBe(1);
  expect(remainingSeconds(config.offer!.targetTime, now + 2000)).toBe(0);
});
it("allows static deadline mode and catches up after tab sleep", () => {
  render(<WebsiteAnnouncementBar config={config} initialNow={now} />);
  fireEvent.click(screen.getByRole("button", { name: "Show deadline" }));
  expect(screen.queryByRole("timer")).toBeNull();
  act(() => {
    vi.setSystemTime(now + 10000);
    window.dispatchEvent(new Event("focus"));
  });
  expect(screen.queryByText("Test offer")).toBeNull();
});
it("works when storage is unavailable", () => {
  const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  render(<WebsiteAnnouncementBar config={config} initialNow={now} />);
  expect(screen.getByText("Example model")).toBeInTheDocument();
  spy.mockRestore();
});
it("normalizes invalid offers independently and rejects unsafe destinations", () => {
  expect(
    normalizeAnnouncement({
      ...config,
      offer: { ...config.offer, targetTime: "bad" },
    })?.offer,
  ).toBeUndefined();
  expect(
    normalizeAnnouncement({
      ...config,
      modelRelease: undefined,
      offer: {
        ...config.offer,
        action: { label: "Bad", href: "javascript:alert(1)" },
      },
    }),
  ).toBeNull();
  expect(normalizeAnnouncement({ ...config, enabled: false })).toBeNull();
  expect(
    normalizeAnnouncement({
      ...config,
      offer: { ...config.offer, displayTimeZone: "invalid" },
    })?.modelRelease?.name,
  ).toBe("Example model");
});
