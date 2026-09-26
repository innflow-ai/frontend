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
it("waits for the overview, responds to reverse scroll and resize, and preserves showcase hiding", () => {
  let overviewTop = window.innerHeight + 500;
  render(
    <>
      <SiteHeader />
      <section id="workspace-overview" />
    </>,
  );
  const overview = document.getElementById("workspace-overview");
  if (!overview) throw new Error("Missing overview fixture");
  vi.spyOn(overview, "getBoundingClientRect").mockImplementation(() => ({
    top: overviewTop,
    bottom: overviewTop + 500,
    left: 0,
    right: 1000,
    width: 1000,
    height: 500,
    x: 0,
    y: overviewTop,
    toJSON: () => ({}),
  }));
  const header = screen.getByRole("banner");
  header.setAttribute("data-showcase-hidden", "true");
  header.inert = true;
  window.scrollY = 120;
  fireEvent.scroll(window);
  expect(header).toHaveAttribute("data-preview-navigation", "flat");
  overviewTop = window.innerHeight * 0.75;
  window.scrollY = 5000;
  fireEvent.scroll(window);
  expect(header).toHaveAttribute("data-preview-navigation", "floating");
  expect(header).toHaveAttribute("data-showcase-hidden", "true");
  expect(header.inert).toBe(true);
  overviewTop = window.innerHeight * 0.75 + 1;
  window.scrollY = 4900;
  fireEvent.scroll(window);
  expect(header).toHaveAttribute("data-preview-navigation", "flat");
  overviewTop = window.innerHeight * 0.75 - 1;
  fireEvent.resize(window);
  expect(header).toHaveAttribute("data-preview-navigation", "floating");
  overviewTop = window.innerHeight + 500;
  fireEvent.resize(window);
  expect(header).toHaveAttribute("data-preview-navigation", "flat");
  expect(header).toHaveAttribute("data-showcase-hidden", "true");
  expect(header.inert).toBe(true);
  overviewTop = 0;
  window.scrollY = 0;
  fireEvent.scroll(window);
  expect(header).toHaveAttribute("data-preview-navigation", "flat");
});
it("fails safely to flat navigation when the overview is absent", () => {
  render(<SiteHeader />);
  window.scrollY = 5000;
  fireEvent.scroll(window);
  fireEvent.resize(window);
  expect(screen.getByRole("banner")).toHaveAttribute(
    "data-preview-navigation",
    "flat",
  );
});
it("preserves default header on other routes and similarly prefixed paths", () => {
  for (const path of [
    "/rent-collection",
    "/pricing",
    "/preview/scroll-showcase/other",
  ]) {
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
