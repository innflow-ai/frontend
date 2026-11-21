import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { BaselaneNews } from "./baselane-news";

afterEach(cleanup);

it("offers responsive candidates for both news feature photos", () => {
  render(<BaselaneNews />);
  for (const name of [
    "An investor reviewing paperwork",
    "A plumbing professional at work",
  ]) {
    const image = screen.getByRole("img", { name });
    expect(image).toHaveAttribute(
      "sizes",
      expect.stringContaining("(max-width: 700px) calc(100vw - 48px)"),
    );
    expect(image).toHaveAttribute("srcset", expect.stringMatching(/\d+w/));
  }
});
