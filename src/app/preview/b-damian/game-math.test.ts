import { describe, expect, it } from "vitest";
import { fallSpeedForScore, rectsOverlap, spawnIntervalMs } from "./game-math";

describe("B. Damian game math", () => {
  it("detects overlapping rectangles", () => {
    expect(
      rectsOverlap({ x: 0, y: 0, w: 10, h: 10 }, { x: 5, y: 5, w: 10, h: 10 }),
    ).toBe(true);
    expect(
      rectsOverlap(
        { x: 0, y: 0, w: 10, h: 10 },
        { x: 20, y: 20, w: 10, h: 10 },
      ),
    ).toBe(false);
  });

  it("tightens spawn cadence as score rises but keeps a floor", () => {
    expect(spawnIntervalMs(0)).toBe(980);
    expect(spawnIntervalMs(50)).toBe(380);
    expect(spawnIntervalMs(500)).toBe(380);
  });

  it("ramps fall speed with a soft cap", () => {
    expect(fallSpeedForScore(0, 2)).toBe(2);
    expect(fallSpeedForScore(100, 2)).toBeCloseTo(6.2);
    expect(fallSpeedForScore(1000, 2)).toBe(6.2);
  });
});
