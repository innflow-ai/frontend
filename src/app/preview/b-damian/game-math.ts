/**
 * Pure helpers for B. Damian collision + difficulty.
 * Kept free of DOM so unit tests can pin the arcade rules.
 */

export type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

/** Axis-aligned overlap used for collect/hazard hits. */
export function rectsOverlap(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

/**
 * Spawn interval shrinks as score climbs so late-game pressure feels earned.
 * Floor keeps the loop readable on mid-tier phones.
 */
export function spawnIntervalMs(score: number): number {
  return Math.max(380, 980 - score * 14);
}

/** Fall speed scales gently with score so early rounds stay learnable. */
export function fallSpeedForScore(score: number, base: number): number {
  return base + Math.min(4.2, score * 0.045);
}
