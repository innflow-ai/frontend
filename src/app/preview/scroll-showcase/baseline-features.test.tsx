import { existsSync } from "node:fs";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BaselineFeatures, baselineFeatures } from "./baseline-features";

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    sizes: _sizes,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    // biome-ignore lint/performance/noImgElement: Test double for next/image.
    <img {...props} alt={props.alt ?? ""} />
  ),
}));
afterEach(cleanup);

describe("baseline feature continuation", () => {
  it("preserves the four reference sections without comparison or sequence additions", () => {
    render(<BaselineFeatures />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
    for (const feature of baselineFeatures) {
      expect(
        screen.queryByText(feature.label, { exact: true }),
      ).not.toBeInTheDocument();
    }
    expect(
      screen.getByRole("button", { name: "Use Ari, Plain’s agent" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Before" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("A request arrives")).not.toBeInTheDocument();
  });
  it("selects all six Channels illustrations via pointer input", () => {
    render(<BaselineFeatures />);
    const section = screen.getByRole("region", {
      name: /Consolidate support\.\s+Keep the context\./,
    });
    baselineFeatures[0].items.forEach((item, index) => {
      const button = within(section).getByRole("button", {
        name: item.title,
      });
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-pressed", "true");
      expect(
        within(section).getByAltText(
          "Channels — reference product illustration",
        ),
      ).toHaveAttribute(
        "src",
        index === 0
          ? "/preview/homepage/baseline-features/channels-imgCanvas.png"
          : `/preview/homepage/channels-${index + 1}.png`,
      );
    });
  });
  it("supports arrow, Home and End focus without fabricating collapsed copy", () => {
    render(<BaselineFeatures />);
    const first = screen.getByRole("button", {
      name: "Orchestrate actions",
    });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    const second = screen.getByRole("button", {
      name: "Use Ari, Plain’s agent",
    });
    expect(second).toHaveFocus();
    expect(second).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Expanded artwork for this state is not supplied in the baseline yet.",
    );
    fireEvent.keyDown(second, { key: "End" });
    const last = screen.getByRole("button", {
      name: "Build your own agents",
    });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: "Home" });
    expect(first).toHaveFocus();
  });
  it("references downloaded baseline art and exact exported icons", () => {
    for (const feature of baselineFeatures) {
      for (const asset of [
        "imgCanvas.png",
        "imgIcon.svg",
        "imgArrowUpRight.svg",
        feature.glyph,
        ...feature.items.map((item) => item.icon),
      ]) {
        expect(
          existsSync(
            `public/preview/homepage/baseline-features/${feature.id}-${asset}`,
          ),
        ).toBe(true);
      }
    }
  });
  it("changes every secondary Workflow and Insights illustration to its mapped draft", () => {
    render(<BaselineFeatures />);
    for (const feature of baselineFeatures.filter(
      (entry) => entry.id === "workflows" || entry.id === "insights",
    )) {
      feature.items.slice(1).forEach((item, offset) => {
        fireEvent.click(screen.getByRole("button", { name: item.title }));
        const src = `/preview/homepage/baseline-features/${feature.id}-${offset + 1}.png`;
        expect(
          screen.getByAltText(
            `${feature.label} — reference product illustration`,
          ),
        ).toHaveAttribute("src", src);
        expect(existsSync(`public${src}`)).toBe(true);
      });
    }
  });
});
