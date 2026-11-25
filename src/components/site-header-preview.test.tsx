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
it("keeps the experience strip off without leaving a gap above the nav", () => {
  render(<SiteHeader />);
  expect(
    screen.queryByRole("complementary", { name: "Innflow announcement" }),
  ).toBeNull();
  expect(screen.queryByText("Explore the new Innflow experience")).toBeNull();
  const header = screen.getByRole("banner");
  expect(header).toHaveAttribute("data-preview-navigation", "flat");
  expect(document.querySelector("[data-preview-chrome]")).toHaveAttribute(
    "data-announcement-dismissed",
    "true",
  );
});
it("floats after a short scroll, returns at the top, and preserves showcase hiding", () => {
  render(
    <>
      <SiteHeader />
      <section id="workspace-overview" />
    </>,
  );
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
  window.scrollY = 48;
  fireEvent.resize(window);
  expect(header).toHaveAttribute("data-preview-navigation", "floating");
});
it("floats when the overview is absent", () => {
  render(<SiteHeader />);
  window.scrollY = 5000;
  fireEvent.scroll(window);
  fireEvent.resize(window);
  expect(screen.getByRole("banner")).toHaveAttribute(
    "data-preview-navigation",
    "floating",
  );
});
it("uses homepage navigation on inner pages, including help and nested routes", () => {
  for (const path of [
    "/rent-collection",
    "/pricing",
    "/help",
    "/blog/example",
    "/legal/privacy-policy",
    "/preview/scroll-showcase/other",
  ]) {
    route.value = path;
    const view = render(<SiteHeader />);
    expect(document.querySelector("[data-preview-chrome]")).not.toBeNull();
    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-preview-navigation",
      "flat",
    );
    expect(
      screen.getByRole("link", { name: "Continue with Google" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Get started" })).toBeNull();
    window.scrollY = 100;
    fireEvent.scroll(window);
    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-preview-navigation",
      "floating",
    );
    window.scrollY = 0;
    fireEvent.scroll(window);
    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-preview-navigation",
      "flat",
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
it("hides after deliberate downward travel and reveals on a short upward scroll", () => {
  render(<SiteHeader />);
  const header = screen.getByRole("banner");
  function scroll(y: number, hidden: boolean) {
    window.scrollY = y;
    fireEvent.scroll(window);
    expect(header).toHaveAttribute("data-scroll-hidden", String(hidden));
  }
  scroll(30, false);
  scroll(80, true);
  scroll(115, true);
  scroll(109, true);
  scroll(103, false);
  scroll(100, false);
  scroll(160, true);
  fireEvent.focusIn(screen.getByRole("link", { name: "innflow home" }));
  expect(header).toHaveAttribute("data-scroll-hidden", "false");
  fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
  scroll(400, false);
});
