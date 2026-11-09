/**
 * Pure B-Daman arena helpers — aiming, charge shots, and marble collisions.
 * Kept DOM-free so unit tests can lock the rules without a canvas.
 */

export type Vec = { x: number; y: number };

export type Circle = {
  x: number;
  y: number;
  r: number;
};

/** Convert a charge 0→1 into launch speed for the marble shot. */
export function shotSpeedFromCharge(
  charge: number,
  min = 7.5,
  max = 16.5,
): number {
  const t = Math.max(0, Math.min(1, charge));
  // Ease-out so mid-charge still feels punchy.
  const eased = 1 - (1 - t) ** 1.6;
  return min + (max - min) * eased;
}

/**
 * Aim angle in radians.
 * 0 is straight up; negative aims left, positive aims right.
 */
export function clampAim(radians: number, limit = Math.PI / 2.35): number {
  return Math.max(-limit, Math.min(limit, radians));
}

/** Unit velocity for a B-Daman launch from the muzzle. */
export function aimVelocity(aim: number, speed: number): Vec {
  return {
    x: Math.sin(aim) * speed,
    y: -Math.cos(aim) * speed,
  };
}

/** Circle overlap used for marble ↔ target / bumper hits. */
export function circlesOverlap(a: Circle, b: Circle): boolean {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const rr = a.r + b.r;
  return dx * dx + dy * dy <= rr * rr;
}

/** Reflect velocity off a normal (used when a marble kisses a bumper). */
export function reflect(vel: Vec, nx: number, ny: number): Vec {
  const dot = vel.x * nx + vel.y * ny;
  return {
    x: vel.x - 2 * dot * nx,
    y: vel.y - 2 * dot * ny,
  };
}

/** Wave recipe: more targets and tougher cores as rounds climb. */
export function waveTargetCount(wave: number): number {
  return Math.min(9, 3 + Math.floor(wave * 0.85));
}

export function waveCoreHp(wave: number): number {
  return 1 + Math.floor((wave - 1) / 2);
}
