import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/rent-collection" }));
beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((media: string) => ({
      media,
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it("opens on mouse hover and allows time to enter the dropdown", () => {
  vi.useFakeTimers();
  vi.mocked(window.matchMedia).mockImplementation((media) => ({
    media,
    matches: true,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  render(<SiteHeader />);
  const group = screen.getByRole("group", { name: "Product" });
  const trigger = screen.getByRole("button", { name: "Product" });
  fireEvent.pointerEnter(group, { pointerType: "mouse" });
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  fireEvent.pointerLeave(group, { pointerType: "mouse" });
  act(() => vi.advanceTimersByTime(100));
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  fireEvent.pointerEnter(group, { pointerType: "mouse" });
  act(() => vi.advanceTimersByTime(200));
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  fireEvent.pointerLeave(group, { pointerType: "mouse" });
  act(() => vi.advanceTimersByTime(180));
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

it("keeps direct login links and returns focus to the product disclosure on Escape", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);
  for (const link of screen.getAllByRole("link", { name: "Log in" })) {
    expect(link).toHaveAttribute("href", "https://app.innflow.ai/login");
  }
  const trigger = screen.getByRole("button", { name: "Product" });
  trigger.focus();
  await user.keyboard("{Enter}");
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  const platform = screen.getByRole("link", { name: "Platform" });
  expect(platform).toHaveAttribute("href", "/platform");
  await user.tab();
  expect(platform).toHaveFocus();
  await user.keyboard("{Escape}");
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(
    screen.queryByRole("link", { name: "Platform" }),
  ).not.toBeInTheDocument();
});

it("closes on an outside click and keeps only one navbar disclosure open", async () => {
  const user = userEvent.setup();
  render(
    <>
      <SiteHeader />
      <button type="button">Outside</button>
    </>,
  );
  const product = screen.getByRole("button", { name: "Product" });
  await user.click(product);
  await user.click(screen.getByRole("button", { name: "Outside" }));
  expect(product).toHaveAttribute("aria-expanded", "false");
  await user.click(product);
  await user.click(screen.getByRole("button", { name: "Resources" }));
  expect(product).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByRole("button", { name: "Resources" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
});
