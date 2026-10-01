import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { ScrollShowcase } from "./scroll-showcase";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("offers Google sign-in and routes Microsoft through the regular login page", () => {
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
    screen.getByText(
      /Connect conversations, delegate tasks, and keep work moving/,
    ),
  ).toBeVisible();
  expect(
    screen.getByRole("link", { name: "Sign up with email" }),
  ).toHaveAttribute("href", siteConfig.signupUrl);
  expect(
    screen.queryByText("Scroll to explore, or choose a tab."),
  ).not.toBeInTheDocument();
  expect(screen.queryByText("HOMEPAGE MOTION STUDY")).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Continue with Google" }),
  ).toHaveAttribute("href", siteConfig.googleAuthUrl);
  expect(
    screen.getByRole("link", { name: "Continue with Microsoft" }),
  ).toHaveAttribute("href", `${siteConfig.appOrigin}/login`);
  expect(
    screen.queryByRole("link", { name: "Book a demo" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText("Microsoft sign-in link pending"),
  ).not.toBeInTheDocument();
  expect(screen.queryByText("Scroll to explore ↓")).not.toBeInTheDocument();
  expect(screen.queryByText(/01 \/ 04/)).not.toBeInTheDocument();
  const scheduling = screen.getByRole("tabpanel", { name: "AI agent" });
  expect(scheduling).toHaveTextContent("Delegate tasks to your AI agent");
  expect(
    scheduling.querySelector("[data-booking-calendar]"),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("tab", { name: "Workflows" }));
  expect(screen.getByRole("tabpanel", { name: "Workflows" })).toHaveTextContent(
    "Keep work moving across your tools",
  );
  expect(
    screen.getByRole("img", {
      name: /AI assistant receives a scheduling request/,
    }),
  ).toBeInTheDocument();
});
