import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import {
  ANNOUNCEMENT_RIBBON_SRC,
  ANNOUNCEMENT_STORAGE_KEY,
  SIGNUP_OFFER_SCROLL_PX,
  SIGNUP_OFFER_STORAGE_KEY,
} from "@/lib/marketing-chrome";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

beforeEach(() => {
  sessionStorage.clear();
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  Object.defineProperty(window, "scrollY", {
    value: 0,
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("renders a dismissible ribbon announcement and a signup offer after scroll", () => {
  render(<SiteHeader />);
  const bar = screen.getByRole("complementary", {
    name: "Innflow announcement",
  });
  expect(bar).toBeVisible();
  expect(bar.getAttribute("style")).toContain(ANNOUNCEMENT_RIBBON_SRC);
  fireEvent.click(screen.getByRole("button", { name: "Dismiss announcement" }));
  expect(
    screen.queryByRole("complementary", { name: "Innflow announcement" }),
  ).toBeNull();
  expect(sessionStorage.getItem(ANNOUNCEMENT_STORAGE_KEY)).toBe("1");

  expect(screen.queryByRole("heading", { name: "50% off signup" })).toBeNull();
  window.scrollY = SIGNUP_OFFER_SCROLL_PX + 40;
  fireEvent.scroll(window);
  const offer = screen.getByRole("heading", { name: "50% off signup" });
  expect(offer).toBeVisible();
  expect(screen.getByRole("link", { name: "Claim 50% off" })).toHaveAttribute(
    "href",
    siteConfig.googleAuthUrl,
  );
  fireEvent.click(screen.getByRole("button", { name: "Dismiss offer" }));
  expect(screen.queryByRole("heading", { name: "50% off signup" })).toBeNull();
  expect(sessionStorage.getItem(SIGNUP_OFFER_STORAGE_KEY)).toBe("1");
});
