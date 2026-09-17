import { existsSync } from "node:fs";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
function requiredElement(id: string) {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing test element: ${id}`);
  return element;
}

describe("baseline feature continuation", () => {
  it.each([true, false])(
    "recenters secondary-arrow focus only when Channels scroll is enabled (%s)",
    (enhanced) => {
      vi.stubGlobal("matchMedia", () => ({
        matches: enhanced,
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
      const scrollTo = vi.fn();
      vi.stubGlobal("scrollTo", scrollTo);
      render(<BaselineFeatures />);
      scrollTo.mockClear();
      const index = baselineFeatures[0].items.length - 1;
      const arrow = screen.getByRole("button", {
        name: `Show ${baselineFeatures[0].items[index].title}`,
      });
      fireEvent.focus(arrow);
      expect(
        requiredElement(`channels-baseline-trigger-${index}`),
      ).toHaveAttribute("aria-pressed", String(enhanced));
      if (enhanced) {
        expect(scrollTo).toHaveBeenCalledWith({
          top: expect.any(Number),
          behavior: "instant",
        });
      } else {
        expect(requiredElement("channels-baseline-trigger-0")).toHaveAttribute(
          "aria-pressed",
          "true",
        );
        expect(scrollTo).not.toHaveBeenCalled();
      }
    },
  );
  it("preserves the four reference sections without comparison or sequence additions", () => {
    render(<BaselineFeatures />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
    for (const feature of baselineFeatures) {
      expect(
        screen.queryByText(feature.label, { exact: true }),
      ).not.toBeInTheDocument();
    }
    expect(
      screen.getByRole("button", {
        name: "Delegate a task. Review the result.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Before" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("A request arrives")).not.toBeInTheDocument();
  });
  it("selects all seven matching Channels demos via pointer input", () => {
    render(<BaselineFeatures />);
    const section = screen.getByRole("region", {
      name: /10x with agent/,
    });
    const layers = section.querySelectorAll("[data-channel-art]");
    expect(layers).toHaveLength(7);
    expect(section).toHaveAttribute("data-channels-scroll", "false");
    baselineFeatures[0].items.forEach((item, index) => {
      const button = within(section).getByRole("button", {
        name: item.title,
      });
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-pressed", "true");
      layers.forEach((layer, layerIndex) => {
        expect(layer).toHaveAttribute(
          "data-selected",
          String(layerIndex === index),
        );
      });
      expect(layers[index]).toHaveAttribute("data-demo-title", item.title);
      expect(layers[index]).not.toHaveAttribute("inert");
      layers.forEach((layer, layerIndex) => {
        expect(layer).toHaveAttribute(
          "aria-hidden",
          String(layerIndex !== index),
        );
      });
    });
    expect(section.querySelector("[data-channel-demos] > img")).toHaveAttribute(
      "src",
      "/preview/homepage/agent-demos/channels-background.png",
    );
  });
  it("supports arrow, Home and End focus without fabricating collapsed copy", () => {
    render(<BaselineFeatures />);
    const agents = screen.getByRole("region", {
      name: "Orchestrate your AI agents",
    });
    const first = within(agents).getByRole("button", {
      name: "Orchestrate actions",
    });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    const second = screen.getByRole("button", {
      name: "Delegate a task. Review the result.",
    });
    expect(second).toHaveFocus();
    expect(second).toHaveAttribute("aria-expanded", "true");
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
  it("supports Channels keyboard selection in both directions and keeps descriptions available", () => {
    render(<BaselineFeatures />);
    const triggers = baselineFeatures[0].items.map((_item, index) =>
      requiredElement(`channels-baseline-trigger-${index}`),
    );
    triggers[0].focus();
    for (const [key, index] of [
      ["ArrowDown", 1],
      ["ArrowUp", 0],
      ["End", 6],
      ["ArrowRight", 0],
      ["ArrowLeft", 6],
      ["Home", 0],
    ] as const) {
      fireEvent.keyDown(document.activeElement ?? triggers[0], { key });
      expect(triggers[index]).toHaveFocus();
      triggers.forEach((trigger, otherIndex) => {
        expect(trigger).toHaveAttribute(
          "aria-pressed",
          String(otherIndex === index),
        );
        expect(
          requiredElement(`channels-baseline-panel-${otherIndex}`),
        ).not.toHaveAttribute("hidden");
      });
    }
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
  it.each(baselineFeatures)(
    "reveals the prepared description for every $id item",
    (feature) => {
      render(<BaselineFeatures />);
      feature.items.forEach((item, index) => {
        expect(item.body).toBeTruthy();
        if (!item.body) throw new Error(`Missing description: ${item.title}`);
        const trigger = requiredElement(
          `${feature.id}-baseline-trigger-${index}`,
        );
        fireEvent.click(trigger);
        const panel = requiredElement(`${feature.id}-baseline-panel-${index}`);
        expect(panel).not.toHaveAttribute("hidden");
        expect(
          within(panel).getByText(item.body, { exact: true }),
        ).toBeVisible();
        expect(trigger).toHaveAttribute(
          feature.id === "channels" ? "aria-pressed" : "aria-expanded",
          "true",
        );
        feature.items.forEach((_other, otherIndex) => {
          const otherPanel = requiredElement(
            `${feature.id}-baseline-panel-${otherIndex}`,
          );
          if (feature.id !== "channels" && otherIndex !== index) {
            expect(otherPanel).toHaveAttribute("hidden");
          } else {
            expect(otherPanel).not.toHaveAttribute("hidden");
          }
        });
      });
    },
  );
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
