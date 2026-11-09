import { describe, expect, it } from "vitest";
import {
  aimVelocity,
  circlesOverlap,
  clampAim,
  shotSpeedFromCharge,
  waveCoreHp,
  waveTargetCount,
} from "./game-math";

describe("B-Daman game math", () => {
  it("maps charge into a bounded shot speed", () => {
    expect(shotSpeedFromCharge(0)).toBeCloseTo(7.5);
    expect(shotSpeedFromCharge(1)).toBeCloseTo(16.5);
    expect(shotSpeedFromCharge(0.5)).toBeGreaterThan(7.5);
    expect(shotSpeedFromCharge(0.5)).toBeLessThan(16.5);
  });

  it("clamps aim so shots stay in the arena cone", () => {
    expect(clampAim(10)).toBeCloseTo(Math.PI / 2.35);
    expect(clampAim(-10)).toBeCloseTo(-Math.PI / 2.35);
    expect(clampAim(0.2)).toBeCloseTo(0.2);
  });

  it("fires straight up when aim is zero", () => {
    const v = aimVelocity(0, 10);
    expect(v.x).toBeCloseTo(0);
    expect(v.y).toBeCloseTo(-10);
  });

  it("detects marble/target circle overlaps", () => {
    expect(circlesOverlap({ x: 0, y: 0, r: 5 }, { x: 8, y: 0, r: 4 })).toBe(
      true,
    );
    expect(circlesOverlap({ x: 0, y: 0, r: 5 }, { x: 20, y: 0, r: 4 })).toBe(
      false,
    );
  });

  it("scales wave pressure", () => {
    expect(waveTargetCount(1)).toBe(3);
    expect(waveTargetCount(20)).toBe(9);
    expect(waveCoreHp(1)).toBe(1);
    expect(waveCoreHp(5)).toBe(3);
  });
});
