import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
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
  "shifts the compact hero backdrop with scroll and keeps the chapter on the tab (%s)",
  (reduced) => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? reduced : true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    let frame: FrameRequestCallback | undefined;
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      frame = callback;
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
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
    let top = 400;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      () => ({ top }) as DOMRect,
    );
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(700);
    const { container } = render(<ScrollShowcase />);
    const track = screen.getByRole("region", {
      name: "Interactive feature showcase",
    });
    const stage = container.querySelector<HTMLElement>(
      '[style*="--gradient-progress"]',
    );
    const pan = () =>
      Number(stage?.style.getPropertyValue("--gradient-progress"));
    const scroll = (nextTop: number) => {
      top = nextTop;
      act(() => {
        fireEvent.scroll(window);
        frame?.(0);
      });
    };

    expect(track).toHaveAttribute("data-compact", "true");
    expect(track).toHaveAttribute("data-reduced", String(reduced));
    expect(screen.queryByRole("button", { name: "Skip showcase" })).toBeNull();
    const initial = pan();
    scroll(100);
    expect(pan() > initial).toBe(!reduced);
    const afterScroll = pan();
    fireEvent.click(screen.getByRole("tab", { name: "Workflows" }));
    expect(screen.getByRole("tab", { name: "Workflows" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(pan() > afterScroll).toBe(!reduced);
    expect(window.scrollTo).not.toHaveBeenCalled();
    scroll(-100);
    expect(screen.getByRole("tab", { name: "Workflows" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    const forwards = pan();
    scroll(100);
    expect(pan() < forwards).toBe(!reduced);
    if (reduced) expect(pan()).toBe(0);
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
  expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute(
    "href",
    siteConfig.loginUrl,
  );
  expect(screen.queryByRole("dialog", { hidden: true })).toBeNull();
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
