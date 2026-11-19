import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { ScrollShowcase } from "./scroll-showcase";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it.each([false, true])(
  "keeps chapter selection on the tabs and ignores page scroll (%s)",
  (reduced) => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? reduced : true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal("scrollTo", vi.fn());
    vi.stubGlobal("innerHeight", 844);
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    const { container } = render(<ScrollShowcase />);
    const track = screen.getByRole("region", {
      name: "Interactive feature showcase",
    });
    const stage = container.querySelector<HTMLElement>(
      '[style*="--gradient-progress"]',
    );
    const pan = () =>
      Number(stage?.style.getPropertyValue("--gradient-progress"));

    expect(track).toHaveAttribute("data-compact", "true");
    expect(track).toHaveAttribute("data-reduced", String(reduced));
    expect(screen.queryByRole("button", { name: "Skip showcase" })).toBeNull();
    const initial = pan();
    act(() => {
      fireEvent.scroll(window);
    });
    expect(pan()).toBe(initial);
    expect(screen.getByRole("tab", { name: "AI agent" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    fireEvent.click(screen.getByRole("tab", { name: "Workflows" }));
    expect(screen.getByRole("tab", { name: "Workflows" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(window.scrollTo).not.toHaveBeenCalled();
    if (reduced) expect(pan()).toBe(0);
    else expect(pan()).toBeGreaterThan(initial);
    act(() => {
      fireEvent.scroll(window);
    });
    expect(screen.getByRole("tab", { name: "Workflows" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  },
);
it("offers Google, email and the general sign-in page", () => {
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
    screen.queryByRole("link", { name: "Sign up with email" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText("Scroll to explore, or choose a tab."),
  ).not.toBeInTheDocument();
  expect(screen.queryByText("HOMEPAGE MOTION STUDY")).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Continue with Google" }),
  ).toHaveAttribute("href", siteConfig.signupUrl);
  expect(
    screen.getByRole("link", { name: "More sign-in options" }),
  ).toHaveAttribute("href", siteConfig.signupUrl);
  expect(
    screen.queryByRole("link", { name: "Book a demo" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText("Microsoft sign-in link pending"),
  ).not.toBeInTheDocument();
  expect(screen.queryByText("Scroll to explore ↓")).not.toBeInTheDocument();
  expect(screen.queryByText(/01 \/ 04/)).not.toBeInTheDocument();
  const destinations = [
    ["AI agent", "/products/ai-agents"],
    ["Workflows", "/features/workflows"],
    ["Sidekick", "#workflows"],
    ["Insights", "#insights"],
  ];
  for (const [label, href] of destinations) {
    fireEvent.click(screen.getByRole("tab", { name: label }));
    expect(
      screen.getByRole("link", { name: `Learn more about ${label}` }),
    ).toHaveAttribute("href", href);
  }
  fireEvent.click(screen.getByRole("tab", { name: "AI agent" }));
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
