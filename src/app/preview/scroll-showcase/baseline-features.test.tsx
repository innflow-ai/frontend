import { existsSync, readFileSync } from "node:fs";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BaselineFeatures, baselineFeatures } from "./baseline-features";
import type { Storyboard } from "./storyboard-artwork";

vi.mock("./storyboard-artwork", () => ({
  StoryboardArtwork: ({ storyboard }: { storyboard: Storyboard }) => (
    <div
      data-storyboard={storyboard.number}
      data-source={storyboard.src ?? "poster-only"}
    />
  ),
}));

beforeEach(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
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
function element(id: string) {
  const result = document.getElementById(id);
  if (!result) throw new Error(`Missing ${id}`);
  return result;
}

describe("numbered homepage storyboards", () => {
  it("places all 18 stories in the approved 6/4/4/4 section order", () => {
    render(<BaselineFeatures />);
    expect(
      baselineFeatures.map((feature) => [
        feature.label,
        feature.items.map((item) => item.number),
      ]),
    ).toEqual([
      ["Bot mode", [3, 2, 1, 4, 5, 6]],
      ["Flows", [7, 8, 9, 10]],
      ["Channels", [11, 12, 13, 14]],
      ["Computer", [15, 16, 17, 18]],
    ]);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
    expect(
      within(element("agents")).getAllByRole("heading", { level: 3 })[0],
    ).toHaveTextContent("Map the route from start to finish");
    expect(
      within(element("workflows")).getAllByRole("heading", { level: 3 })[1],
    ).toHaveTextContent("Bring an agent into the thread");
    expect(
      within(element("insights")).getAllByRole("heading", { level: 3 })[3],
    ).toHaveTextContent("Check what came back");
  });

  it.each(baselineFeatures)(
    "selects each $label story with its own asset and description",
    (feature) => {
      render(<BaselineFeatures />);
      const section = element(feature.id);
      for (const [index, item] of feature.items.entries()) {
        const trigger = within(section).getByRole("button", {
          name: item.title,
        });
        fireEvent.click(trigger);
        const artwork = section.querySelector("[data-storyboard]");
        expect(artwork).toHaveAttribute("data-storyboard", String(item.number));
        expect(artwork).toHaveAttribute("data-source", item.src);
        expect(artwork?.parentElement).toHaveAttribute("data-feature", {
          channels: "bot", agents: "flow", workflows: "channels", insights: "computer",
        }[feature.id]);
        expect(
          element(`${feature.id}-baseline-panel-${index}`),
        ).toHaveTextContent(item.body);
        expect(trigger).toHaveAttribute(
          "aria-expanded",
          "true",
        );
      }
    },
  );

  it("supports arrow, Home, End and wrapping focus within each section", () => {
    render(<BaselineFeatures />);
    for (const feature of baselineFeatures) {
      const triggers = feature.items.map((_, i) =>
        element(`${feature.id}-baseline-trigger-${i}`),
      );
      triggers[0].focus();
      for (const [key, index] of [
        ["ArrowDown", 1],
        ["ArrowUp", 0],
        ["End", triggers.length - 1],
        ["ArrowRight", 0],
        ["ArrowLeft", triggers.length - 1],
        ["Home", 0],
      ] as const) {
        fireEvent.keyDown(document.activeElement ?? triggers[0], { key });
        expect(triggers[index]).toHaveFocus();
        expect(triggers[index]).toHaveAttribute("aria-expanded", "true");
      }
    }
  });

  it("shows one Bot mode story at a time on mobile and keeps other sections selectable", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(max-width: 800px)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    render(<BaselineFeatures />);
    expect(
      element("channels").querySelectorAll("[data-storyboard]"),
    ).toHaveLength(1);
    for (let index = 0; index < 6; index++) {
      fireEvent.click(element(`channels-baseline-trigger-${index}`));
      expect(element(`channels-baseline-panel-${index}`)).toBeVisible();
      expect(element("channels").querySelectorAll("section:not([hidden])")).toHaveLength(1);
      expect(element("channels").querySelectorAll("[data-storyboard]")).toHaveLength(1);
    }
    const first = element("agents-baseline-trigger-0");
    const next = element("agents-baseline-trigger-1");
    expect(first).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(next);
    expect(element("agents-baseline-panel-0")).not.toBeVisible();
    expect(next).toHaveAttribute("aria-expanded", "true");
    expect(next.closest("h3")?.parentElement).toContainElement(
      element("agents-baseline-visual"),
    );
  });

  it("ships playable Lottie compositions and named Rive timelines", () => {
    for (const item of baselineFeatures.flatMap((feature) => feature.items)) {
      expect(existsSync(`public${item.poster}`)).toBe(true);
      const bytes = readFileSync(`public${item.src}`);
      if (item.status === "lottie") {
        const animation = JSON.parse(bytes.toString());
        expect(animation.nm).toBe(item.title);
        expect(animation.op - animation.ip).toBe(item.duration * animation.fr);
        expect(animation.layers.length).toBeGreaterThan(1);
        continue;
      }
      if (!item.artboard || !item.animation) throw new Error(item.title);
      expect(bytes.subarray(0, 4).toString()).toBe("RIVE");
      expect(bytes.includes(Buffer.from(item.artboard))).toBe(true);
      expect(bytes.includes(Buffer.from(item.animation))).toBe(true);
      expect(bytes.includes(Buffer.from(item.stateMachine ?? ""))).toBe(true);
    }
  });
});
