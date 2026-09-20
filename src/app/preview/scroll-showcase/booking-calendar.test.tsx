import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { motionValue } from "motion/react";
import { afterEach, expect, it, vi } from "vitest";
import { BookingCalendar } from "./booking-calendar";

const playback = vi.hoisted(() => ({ reduced: false, options: vi.fn() }));
vi.mock("./agent-demos/use-demo-playback", () => ({
  useDemoPlayback: (options: unknown) => {
    playback.options(options);
    return {
      ref: { current: null },
      progress: motionValue(0),
      playing: false,
      reducedMotion: playback.reduced,
    };
  },
}));
afterEach(() => {
  cleanup();
  playback.reduced = false;
  playback.options.mockClear();
});

it("uses a five-second visibility-gated loop with explicit pause and replay", () => {
  const { rerender } = render(<BookingCalendar active />);
  expect(playback.options).toHaveBeenLastCalledWith(
    expect.objectContaining({
      active: true,
      duration: 5,
      loop: true,
      inViewAmount: 0.5,
      replayKey: 0,
    }),
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Pause calendar animation" }),
  );
  expect(playback.options).toHaveBeenLastCalledWith(
    expect.objectContaining({ active: false }),
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Replay calendar animation" }),
  );
  expect(playback.options).toHaveBeenLastCalledWith(
    expect.objectContaining({ active: true, replayKey: 1 }),
  );
  rerender(<BookingCalendar active={false} />);
  expect(playback.options).toHaveBeenLastCalledWith(
    expect.objectContaining({ active: false }),
  );
});

it("shows the resolved pose rather than the reset pose for reduced motion", () => {
  playback.reduced = true;
  const { container } = render(<BookingCalendar active />);
  expect(container.querySelector("[data-booking-calendar]")).toHaveAttribute(
    "data-reduced-motion",
    "true",
  );
  expect(screen.getByText("Book")).toHaveStyle({ opacity: "1" });
  expect(
    screen.getByRole("button", { name: "Replay calendar animation" }),
  ).toBeDisabled();
  expect(
    screen.getByRole("button", { name: "Pause calendar animation" }),
  ).toBeDisabled();
  expect(
    screen.queryByRole("button", { name: "Book" }),
  ).not.toBeInTheDocument();
  expect(screen.queryByText(/confirmed|reservation/i)).not.toBeInTheDocument();
  expect(container.querySelectorAll('img[src$="waveform.svg"]')).toHaveLength(
    10,
  );
});
