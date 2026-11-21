import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/rent-collection" }));

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

it("keeps the announcement and retired signup offer hidden after scroll", () => {
  render(<SiteHeader />);
  expect(
    screen.queryByRole("complementary", { name: "Innflow announcement" }),
  ).toBeNull();

  expect(screen.queryByRole("heading", { name: "50% off signup" })).toBeNull();
  window.scrollY = 600;
  fireEvent.scroll(window);
  expect(screen.queryByRole("heading", { name: "50% off signup" })).toBeNull();
  expect(screen.queryByRole("link", { name: "Claim 50% off" })).toBeNull();
});
