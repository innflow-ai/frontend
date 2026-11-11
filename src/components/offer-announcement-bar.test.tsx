import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  announcementBar,
  announcementStorageKey,
  countdownParts,
  offerBarBootScript,
} from "@/config/announcement-bar";
import { OfferAnnouncementBar } from "./offer-announcement-bar";

const target = Date.parse(announcementBar.targetTime);

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  document.documentElement.removeAttribute("data-offer-bar");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("shows the offer, an exact pricing link, and a stable countdown", () => {
  vi.setSystemTime(target - (2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000);
  render(
    <OfferAnnouncementBar config={{ ...announcementBar, enabled: true }} />,
  );
  const offer = screen.getByRole("complementary", { name: "Get 63% off now" });
  expect(offer).toHaveAttribute("data-announcement-id", announcementBar.id);
  expect(screen.getByRole("link", { name: "See pricing" })).toHaveAttribute(
    "href",
    "/pricing?ref=announcement-bar",
  );
  expect(
    offer
      .querySelector("[data-ready='true']")
      ?.textContent?.replace(/\s+/g, ""),
  ).toBe("02d03h04m05s");
});

it("hides the bar when the countdown reaches zero", () => {
  vi.setSystemTime(target - 1500);
  render(
    <OfferAnnouncementBar config={{ ...announcementBar, enabled: true }} />,
  );
  expect(
    screen.getByRole("complementary", { name: "Get 63% off now" }),
  ).toBeInTheDocument();
  act(() => {
    vi.advanceTimersByTime(2000);
  });
  expect(
    screen.queryByRole("complementary", { name: "Get 63% off now" }),
  ).toBeNull();
  expect(document.documentElement).toHaveAttribute("data-offer-bar", "hidden");
});

it("keeps an optional live message hidden unless one is configured", () => {
  vi.setSystemTime(target + 1000);
  const { unmount } = render(
    <OfferAnnouncementBar config={{ ...announcementBar, enabled: true }} />,
  );
  expect(
    screen.queryByRole("complementary", { name: "Get 63% off now" }),
  ).toBeNull();
  unmount();
  document.documentElement.removeAttribute("data-offer-bar");
  render(
    <OfferAnnouncementBar
      config={{
        ...announcementBar,
        enabled: true,
        liveMessage: "The offer is live",
      }}
    />,
  );
  expect(
    screen.getByRole("complementary", { name: "The offer is live" }),
  ).toBeInTheDocument();
  expect(screen.queryByText("00d", { exact: false })).toBeNull();
});

it("remembers a dismissal per announcement id", () => {
  vi.setSystemTime(target - 86400 * 1000);
  render(
    <OfferAnnouncementBar config={{ ...announcementBar, enabled: true }} />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Dismiss offer" }));
  expect(localStorage.getItem(announcementStorageKey(announcementBar.id))).toBe(
    "dismissed",
  );
  expect(
    screen.queryByRole("complementary", { name: "Get 63% off now" }),
  ).toBeNull();

  cleanup();
  document.documentElement.removeAttribute("data-offer-bar");
  render(
    <OfferAnnouncementBar
      config={{ ...announcementBar, enabled: true, id: "next-discount" }}
    />,
  );
  expect(
    screen.getByRole("complementary", { name: "Get 63% off now" }),
  ).toBeInTheDocument();
});

it("stays off while the offer switch is disabled", () => {
  render(<OfferAnnouncementBar />);
  expect(screen.queryByRole("complementary")).toBeNull();
});

it("does not render when the offer is disabled", () => {
  render(
    <OfferAnnouncementBar config={{ ...announcementBar, enabled: false }} />,
  );
  expect(screen.queryByRole("complementary")).toBeNull();
});

it("counts whole seconds and stops at zero", () => {
  expect(countdownParts(10_000, 4_200)).toEqual({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 5,
  });
  expect(countdownParts(5_000, 5_000)).toBeNull();
  expect(countdownParts(Number.NaN, 0)).toBeNull();
});

it("boot script hides a dismissed or ended offer before paint", () => {
  const script = offerBarBootScript(announcementBar);
  expect(script).toContain(announcementStorageKey(announcementBar.id));
  expect(script).toContain(announcementBar.targetTime);
  expect(script).toContain("data-offer-bar");
  expect(script).toContain("ended=true");
  expect(
    offerBarBootScript({ ...announcementBar, liveMessage: "Now live" }),
  ).toContain("ended=false");
});
