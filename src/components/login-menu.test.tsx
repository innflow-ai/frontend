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
  const group = screen.getByRole("group", { name: "Login options" });
  const trigger = screen.getByRole("button", { name: "Log in" });
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

it("opens ordered login choices with the shared destination and returns focus on Escape", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);
  const trigger = screen.getByRole("button", { name: "Log in" });
  trigger.focus();
  await user.keyboard("{Enter}");
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  const links = screen.getAllByRole("link", {
    name: /^(Landlord|Tenant) login/,
  });
  expect(links.map((link) => link.textContent)).toEqual([
    "Landlord login",
    "Tenant loginBeta",
  ]);
  for (const link of links)
    expect(link).toHaveAttribute("href", "https://app.innflow.ai/login");
  await user.tab();
  expect(links[0]).toHaveFocus();
  await user.tab();
  expect(links[1]).toHaveFocus();
  await user.keyboard("{Escape}");
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(
    screen.queryByRole("link", { name: "Landlord login" }),
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
  const login = screen.getByRole("button", { name: "Log in" });
  await user.click(login);
  await user.click(screen.getByRole("button", { name: "Outside" }));
  expect(login).toHaveAttribute("aria-expanded", "false");
  await user.click(login);
  await user.click(screen.getByRole("button", { name: "Resources" }));
  expect(login).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByRole("button", { name: "Resources" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
});
