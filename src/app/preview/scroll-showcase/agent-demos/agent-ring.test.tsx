import { cleanup, render } from "@testing-library/react";
import { motionValue } from "motion/react";
import { afterEach, expect, it, vi } from "vitest";
import { AgentRingDemo } from "./agent-ring";
import {
  ringArrival,
  ringDuration,
  ringOpeningEnd,
  ringOrbitStart,
  ringTiming,
  rotationTrack,
  selectionTrack,
} from "./agent-ring-motion";

const playback = vi.hoisted(() => ({ reduced: false }));
vi.mock("./use-demo-playback", () => ({
  useDemoPlayback: () => ({
    ref: { current: null },
    progress: motionValue(0),
    reducedMotion: playback.reduced,
    playing: false,
    completed: false,
  }),
}));
afterEach(() => {
  cleanup();
  playback.reduced = false;
});

it("keeps a readable opening and a clear gap between expanded selections", () => {
  expect(ringOrbitStart - ringOpeningEnd).toBeCloseTo(0.8);
  for (let slot = 0; slot < 8; slot++) {
    const outgoing =
      ringArrival(slot) +
      ringTiming.expansion +
      ringTiming.hold +
      ringTiming.contraction;
    expect(ringArrival(slot + 1) - outgoing).toBeGreaterThanOrEqual(
      ringTiming.readingHold,
    );
    expect(selectionTrack(slot).values.at(-1)).toBe(0);
  }
  expect(rotationTrack.times.length).toBe(rotationTrack.values.length);
  expect(
    rotationTrack.times.every(
      (time, index) => index === 0 || time >= rotationTrack.times[index - 1],
    ),
  ).toBe(true);
  expect(rotationTrack.values.at(-1)).toBe(-90);
  expect(ringDuration).toBeGreaterThan(ringArrival(8));
});

it("starts with a compact shell and mounted, hidden orbit artwork", () => {
  const { container } = render(<AgentRingDemo />);
  expect(container.querySelectorAll("[data-orbit-slot]")).toHaveLength(32);
  expect(
    container.querySelector('[data-orbit-slot="0"]')?.getAttribute("style"),
  ).toContain("scale(0)");
  expect(container.querySelector("[data-ring-label]")).toHaveStyle({
    opacity: "0",
  });
  expect(
    container.querySelector('img[src$="innflow-approved.svg"]'),
  ).toBeInTheDocument();
});

it("shows the unobscured center immediately for reduced motion", () => {
  playback.reduced = true;
  const { container } = render(<AgentRingDemo />);
  expect(container.querySelector("[data-ring-label]")).toHaveStyle({
    opacity: "1",
  });
  expect(container.querySelector("[data-ring-skeleton]")).toHaveStyle({
    opacity: "0",
  });
  expect(
    container.querySelector('[data-orbit-slot="0"]')?.getAttribute("style"),
  ).toContain("scale(0)");
});
