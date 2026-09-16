import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { SiteHeader } from "./site-header";

const route = vi.hoisted(() => ({ value: "/preview/scroll-showcase" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.value }));
beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  route.value = "/preview/scroll-showcase";
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
it("reserves preview-only chrome and dismisses the announcement with focus restored", () => {
  render(<SiteHeader />);
  expect(
    screen.getByRole("complementary", { name: "Innflow announcement" }),
  ).toBeVisible();
  expect(
    screen.getByRole("link", {
      name: "Learn more about the new Innflow experience",
    }),
  ).toHaveAttribute("href", "#workspace-overview");
  const header = screen.getByRole("banner");
  expect(header).toHaveAttribute("data-preview-navigation", "flat");
  fireEvent.click(screen.getByRole("button", { name: "Dismiss announcement" }));
  expect(
    screen.queryByRole("complementary", { name: "Innflow announcement" }),
  ).toBeNull();
  expect(document.querySelector("[data-preview-chrome]")).toHaveAttribute(
    "data-announcement-dismissed",
    "true",
  );
  expect(screen.getByRole("link", { name: "innflow home" })).toHaveFocus();
});
it("switches between flat and floating without disturbing showcase hiding", () => {
  render(<SiteHeader />);
  const header = screen.getByRole("banner");
  header.setAttribute("data-showcase-hidden", "true");
  header.inert = true;
  window.scrollY = 120;
  fireEvent.scroll(window);
  expect(header).toHaveAttribute("data-preview-navigation", "floating");
  expect(header).toHaveAttribute("data-showcase-hidden", "true");
  expect(header.inert).toBe(true);
  window.scrollY = 0;
  fireEvent.scroll(window);
  expect(header).toHaveAttribute("data-preview-navigation", "flat");
});
it("preserves default header on other routes and similarly prefixed paths", () => {
  for (const path of ["/", "/pricing", "/preview/scroll-showcase/other"]) {
    route.value = path;
    const view = render(<SiteHeader />);
    expect(document.querySelector("[data-preview-chrome]")).toBeNull();
    expect(screen.getByRole("banner")).not.toHaveAttribute(
      "data-preview-navigation",
    );
    expect(screen.queryByText("Explore the new Innflow experience")).toBeNull();
    view.unmount();
  }
});
it("keeps the mobile navigation and Escape focus behavior intact", () => {
  render(<SiteHeader />);
  const toggle = screen.getByRole("button", { name: "Open navigation" });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("banner")).toHaveAttribute(
    "data-preview-navigation",
    "floating",
  );
  fireEvent.keyDown(toggle, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
  expect(document.body.style.overflow).not.toBe("hidden");
});
