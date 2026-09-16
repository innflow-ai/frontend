import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { ScrollShowcase } from "./scroll-showcase";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("offers configured Google sign-in and disabled Microsoft sign-in without a progress strip", () => {
  vi.stubGlobal("matchMedia", () => ({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.stubGlobal("requestAnimationFrame", () => 1);
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  render(<ScrollShowcase />);
  expect(screen.queryByText("HOMEPAGE MOTION STUDY")).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Continue with Google" }),
  ).toHaveAttribute("href", siteConfig.googleAuthUrl);
  expect(
    screen.getByRole("button", { name: "Continue with Microsoft" }),
  ).toBeDisabled();
  expect(
    screen.getByRole("button", { name: "Continue with Microsoft" }),
  ).toHaveAccessibleDescription("Microsoft sign-in link pending");
  expect(screen.queryByText("Scroll to explore ↓")).not.toBeInTheDocument();
  expect(screen.queryByText(/01 \/ 04/)).not.toBeInTheDocument();
});
