import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { ScrollShowcase } from "./scroll-showcase";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("offers Google sign-in and clearly marks Microsoft sign-in unavailable", () => {
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
    screen.queryByRole("link", { name: "Book a demo" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText("Microsoft sign-in link pending"),
  ).not.toBeInTheDocument();
  expect(screen.queryByText("Scroll to explore ↓")).not.toBeInTheDocument();
  expect(screen.queryByText(/01 \/ 04/)).not.toBeInTheDocument();
  const scheduling = screen.getByRole("tabpanel", { name: "Scheduling" });
  expect(scheduling).toHaveTextContent(
    "Bring scheduling into the conversation",
  );
  expect(
    scheduling.querySelector("[data-booking-calendar]"),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("tab", { name: "AI assistant" }));
  expect(
    screen.getByRole("tabpanel", { name: "AI assistant" }),
  ).toHaveTextContent("Let your assistant take the next step");
  expect(
    screen.getByRole("img", {
      name: /AI assistant receives a scheduling request/,
    }),
  ).toBeInTheDocument();
});
