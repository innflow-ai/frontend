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
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  render(<ScrollShowcase />);
  expect(
    screen.getByText(/Bring conversations, AI agents, and workflows/),
  ).toBeVisible();
  expect(
    screen.getByRole("link", { name: "Sign up with email" }),
  ).toHaveAttribute("href", siteConfig.signupUrl);
  expect(screen.getByText(/No credit card required/)).toBeVisible();
  expect(
    screen.queryByText("Scroll to explore, or choose a tab."),
  ).not.toBeInTheDocument();
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
  const scheduling = screen.getByRole("tabpanel", { name: "Agents" });
  expect(scheduling).toHaveTextContent("Less busywork. More on autopilot.");
  expect(scheduling).not.toHaveTextContent(
    /Calendly|Meeting confirmed|#1 scheduling/,
  );
  expect(scheduling.querySelector("a")).toHaveAttribute(
    "href",
    "/products/platform",
  );
  expect(
    scheduling.querySelector("[data-booking-calendar]"),
  ).toBeInTheDocument();
});
