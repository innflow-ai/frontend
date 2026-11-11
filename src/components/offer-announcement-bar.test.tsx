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
  announcementModelName,
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
  expect(screen.getByRole("link", { name: "Claim 63% off" })).toHaveAttribute(
    "href",
    "/pricing?ref=announcement-bar",
  );
  expect(screen.getByRole("timer")).toBeInTheDocument();
  expect(
    offer
      .querySelector("[data-ready='true']")
      ?.textContent?.replace(/\s+/g, ""),
  ).toBe("02d:03h:04m:05");
  expect(
    screen.getByText("Offer ends in 2 days 3 hours 4 minutes"),
  ).toBeInTheDocument();
  expect(screen.queryByText("[Model name]")).toBeNull();
  expect(screen.queryByText("NEW")).toBeNull();
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
  fireEvent.click(screen.getByRole("button", { name: "Dismiss announcement" }));
  expect(localStorage.getItem(announcementStorageKey(announcementBar.id))).toBe(
    "1",
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

it("announces the remaining time when the minute changes, not every second", () => {
  vi.setSystemTime(target - (2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000);
  render(
    <OfferAnnouncementBar config={{ ...announcementBar, enabled: true }} />,
  );
  expect(
    screen.getByText("Offer ends in 2 days 3 hours 4 minutes"),
  ).toBeInTheDocument();
  act(() => {
    vi.advanceTimersByTime(4000);
  });
  expect(
    screen.getByText("Offer ends in 2 days 3 hours 4 minutes"),
  ).toBeInTheDocument();
  expect(
    screen.queryByText("Offer ends in 2 days 3 hours 3 minutes"),
  ).toBeNull();
  act(() => {
    vi.advanceTimersByTime(2000);
  });
  expect(
    screen.getByText("Offer ends in 2 days 3 hours 3 minutes"),
  ).toBeInTheDocument();
});

it("hides the model pill unless a real model name is configured", () => {
  vi.setSystemTime(target - 3600 * 1000);
  const { unmount } = render(
    <OfferAnnouncementBar
      config={{ ...announcementBar, enabled: true, modelName: "[Model name]" }}
    />,
  );
  expect(screen.queryByText("NEW")).toBeNull();
  unmount();
  render(
    <OfferAnnouncementBar
      config={{ ...announcementBar, enabled: true, modelName: "Atlas" }}
    />,
  );
  expect(screen.getByText("NEW")).toBeInTheDocument();
  expect(screen.getByText("Atlas")).toBeInTheDocument();
  expect(announcementModelName("")).toBeNull();
  expect(announcementModelName("[Model name]")).toBeNull();
  expect(announcementModelName("Atlas")).toBe("Atlas");
});

it("does not bring the offer back after the countdown ends", () => {
  vi.setSystemTime(target - 1500);
  render(
    <OfferAnnouncementBar config={{ ...announcementBar, enabled: true }} />,
  );
  act(() => {
    vi.advanceTimersByTime(2000);
  });
  vi.setSystemTime(target - 20_000);
  act(() => {
    vi.advanceTimersByTime(3000);
  });
  expect(
    screen.queryByRole("complementary", { name: "Get 63% off now" }),
  ).toBeNull();
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
