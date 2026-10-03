import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { BaselaneInvesting } from "./baselane-investing";
import { BaselaneLibrary } from "./baselane-library";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it.each([
  ["resources", false],
  ["resources", true],
  ["investing", false],
  ["investing", true],
] as const)(
  "%s category arrows honor reduced motion=%s",
  async (kind, reduced) => {
    const user = userEvent.setup();
    const matchMedia = vi.fn().mockReturnValue({ matches: reduced });
    vi.stubGlobal("matchMedia", matchMedia);
    render(
      kind === "resources" ? (
        <BaselaneLibrary kind="articles" />
      ) : (
        <BaselaneInvesting />
      ),
    );
    const track = screen.getByRole("navigation", {
      name: kind === "resources" ? "Categories" : "Investing categories",
    });
    const scrollBy = vi.fn();
    track.scrollBy = scrollBy;
    await user.click(screen.getByRole("button", { name: "More categories" }));
    await user.click(
      screen.getByRole("button", { name: "Previous categories" }),
    );
    expect(matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
    expect(scrollBy).toHaveBeenNthCalledWith(1, {
      left: 300,
      behavior: reduced ? "instant" : "smooth",
    });
    expect(scrollBy).toHaveBeenNthCalledWith(2, {
      left: -300,
      behavior: reduced ? "instant" : "smooth",
    });
  },
);
