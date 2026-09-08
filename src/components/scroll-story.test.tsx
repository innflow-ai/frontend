import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ScrollStory, storyPosition } from "./scroll-story";

afterEach(() => vi.unstubAllGlobals());

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
});
