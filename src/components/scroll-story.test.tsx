import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ScrollStory, storyPosition } from "./scroll-story";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("scroll story", () => {
  it("fills each segment in order and reverses when scrolling back", () => {
    expect(storyPosition(-100, 500, 4)).toEqual({ position: 0, active: 0 });
    expect(storyPosition(750, 500, 4)).toEqual({ position: 1.5, active: 1 });
    expect(storyPosition(1500, 500, 4)).toEqual({ position: 3, active: 3 });
    expect(storyPosition(250, 500, 4)).toEqual({ position: 0.5, active: 0 });
    expect(storyPosition(3000, 500, 4)).toEqual({ position: 4, active: 3 });
  });

  it("keeps every section accessible in the reduced-motion/mobile fallback", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );
    render(
      <ScrollStory
        steps={[
          { id: "first", label: "First", content: <h3>First feature</h3> },
          { id: "second", label: "Second", content: <h3>Second feature</h3> },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Second" })).toHaveAttribute(
      "href",
      "#second",
    );
    expect(
      screen.getByRole("heading", { name: "First feature" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Second feature" }),
    ).toBeVisible();
  });
  it("preserves a supplied page layout instead of adding mobile progress navigation", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );
    render(
      <ScrollStory
        steps={[
          {
            id: "rental",
            label: "Rental work",
            content: <h3>Desktop panel</h3>,
          },
        ]}
        fallback={
          <section id="rental">
            <h3>Existing mobile panel</h3>
          </section>
        }
        after={<h3>Desktop additional features</h3>}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "Existing mobile panel" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Desktop panel" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Desktop additional features" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Explore features" }),
    ).not.toBeInTheDocument();
  });
  it("keeps all desktop panels accessible in the stacked progress layout", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );
    const { container } = render(
      <ScrollStory
        layout="stacked"
        steps={[
          { id: "one", label: "One", content: <h3>First stacked panel</h3> },
          { id: "two", label: "Two", content: <h3>Second stacked panel</h3> },
        ]}
      />,
    );
    expect(
      container.querySelector('[data-enhanced="true"]'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "First stacked panel" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Second stacked panel" }),
    ).toBeVisible();
    expect(
      container.querySelector('[data-active][aria-hidden="true"], [inert]'),
    ).not.toBeInTheDocument();
  });
});
