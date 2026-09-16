import { describe, expect, it } from "vitest";
import {
  chapterScrollProgress,
  ENTRANCE_END,
  EXIT_START,
  hideShowcaseNavigation,
  showcaseMotion,
} from "./scroll-showcase-motion";

describe("showcase scroll phases", () => {
  it("pans continuously within chapters and across a chapter boundary", () => {
    const first = showcaseMotion(0.15);
    const second = showcaseMotion(0.2);
    expect(first.chapter).toBe(second.chapter);
    expect(second.chapterProgress).toBeGreaterThan(first.chapterProgress);
    const before = showcaseMotion(0.3 - 0.00001);
    const after = showcaseMotion(0.3 + 0.00001);
    expect(before.chapter).toBe(0);
    expect(after.chapter).toBe(1);
    expect(after.chapterProgress - before.chapterProgress).toBeLessThan(0.0001);
    expect(showcaseMotion(ENTRANCE_END).chapterProgress).toBe(0);
    expect(showcaseMotion(EXIT_START).chapterProgress).toBe(1);
  });
  it("keeps navigation hidden through contraction and restores using actual following-section bounds", () => {
    expect(hideShowcaseNavigation(0, 2000, 900)).toBe(false);
    expect(hideShowcaseNavigation(0.9, 1200, 900)).toBe(true);
    expect(hideShowcaseNavigation(1, 900, 900)).toBe(true);
    expect(hideShowcaseNavigation(1, 675, 900)).toBe(false);
    expect(hideShowcaseNavigation(1, -100, 900)).toBe(false);
  });
  it("expands, holds four chapters, then contracts", () => {
    expect(showcaseMotion(0).expansion).toBe(0);
    expect(showcaseMotion(ENTRANCE_END).expansion).toBe(1);
    expect(showcaseMotion(EXIT_START).expansion).toBe(1);
    expect(showcaseMotion(1).expansion).toBe(0);
    expect(showcaseMotion(1).chapter).toBe(3);
    expect(showcaseMotion(1).immersive).toBe(false);
  });
  it("tab targets land in the center of the corresponding chapter", () => {
    for (let index = 0; index < 4; index++) {
      const motion = showcaseMotion(chapterScrollProgress(index));
      expect(motion.chapter).toBe(index);
      expect(motion.immersive).toBe(true);
      expect(motion.expansion).toBe(1);
    }
  });
  it("clamps overscroll and invalid input", () => {
    expect(showcaseMotion(-1)).toEqual(showcaseMotion(0));
    expect(showcaseMotion(2)).toEqual(showcaseMotion(1));
    expect(showcaseMotion(Number.NaN)).toEqual(showcaseMotion(0));
  });
});
