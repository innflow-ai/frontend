import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDemoPlayback } from "./use-demo-playback";

const motion = vi.hoisted(() => ({
  inView: true,
  reduced: false,
  animate: vi.fn(),
}));
vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useInView: () => motion.inView,
  useReducedMotion: () => motion.reduced,
  animate: motion.animate,
}));

let hidden = false;
let runs: {
  play: ReturnType<typeof vi.fn>;
  pause: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  complete: () => void;
}[];

beforeEach(() => {
  hidden = false;
  motion.inView = true;
  motion.reduced = false;
  runs = [];
  vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
  motion.animate
    .mockReset()
    .mockImplementation((progress, _target, options) => {
      const controls = {
        play: vi.fn(),
        pause: vi.fn(),
        stop: vi.fn(),
        complete: () => {
          progress.set(1);
          options.onComplete();
        },
      };
      runs.push(controls);
      return controls;
    });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("shared demo playback", () => {
  it("pauses inactive selection and resumes the same clock without resetting", () => {
    const hook = renderHook(({ active }) => useDemoPlayback({ active }), {
      initialProps: { active: false },
    });
    expect(hook.result.current.playing).toBe(false);
    expect(runs[0].play).not.toHaveBeenCalled();
    expect(runs[0].pause).toHaveBeenCalled();
    act(() => hook.result.current.progress.set(0.4));
    hook.rerender({ active: true });
    expect(hook.result.current.playing).toBe(true);
    expect(runs[0].play).toHaveBeenCalledTimes(1);
    expect(hook.result.current.progress.get()).toBe(0.4);
    hook.rerender({ active: false });
    expect(runs[0].pause).toHaveBeenCalledTimes(2);
    hook.rerender({ active: true });
    expect(motion.animate).toHaveBeenCalledTimes(1);
    expect(hook.result.current.progress.get()).toBe(0.4);
  });
  it("pauses offscreen and when the document is hidden, then resumes", () => {
    motion.inView = false;
    const hook = renderHook(() => useDemoPlayback());
    expect(hook.result.current.playing).toBe(false);
    expect(runs[0].play).not.toHaveBeenCalled();
    motion.inView = true;
    hook.rerender();
    expect(hook.result.current.playing).toBe(true);
    act(() => {
      hook.result.current.progress.set(0.65);
      hidden = true;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(hook.result.current.playing).toBe(false);
    act(() => {
      hidden = false;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(hook.result.current.playing).toBe(true);
    motion.inView = false;
    hook.rerender();
    expect(hook.result.current.playing).toBe(false);
    motion.inView = true;
    hook.rerender();
    expect(hook.result.current.progress.get()).toBe(0.65);
    expect(motion.animate).toHaveBeenCalledTimes(1);
  });
  it("holds completion until an explicit replay resets progress", () => {
    const hook = renderHook(({ replayKey }) => useDemoPlayback({ replayKey }), {
      initialProps: { replayKey: 0 },
    });
    expect(motion.animate).toHaveBeenCalledWith(
      hook.result.current.progress,
      1,
      expect.objectContaining({ duration: 6, ease: "linear", autoplay: false }),
    );
    act(() => runs[0].complete());
    expect(hook.result.current.completed).toBe(true);
    expect(hook.result.current.playing).toBe(false);
    motion.inView = false;
    hook.rerender({ replayKey: 0 });
    motion.inView = true;
    hook.rerender({ replayKey: 0 });
    expect(hook.result.current.progress.get()).toBe(1);
    expect(runs[0].play).toHaveBeenCalledTimes(1);
    hook.rerender({ replayKey: 1 });
    expect(runs[0].stop).toHaveBeenCalledTimes(1);
    expect(hook.result.current.progress.get()).toBe(0);
    expect(hook.result.current.completed).toBe(false);
    expect(runs[1].play).toHaveBeenCalledTimes(1);
  });
  it("replays a completed demo on reentry when opted in", () => {
    const hook = renderHook(() => useDemoPlayback({ replayOnReentry: true }));
    act(() => runs[0].complete());
    expect(hook.result.current.completed).toBe(true);
    motion.inView = false;
    hook.rerender();
    motion.inView = true;
    hook.rerender();
    expect(runs[0].stop).toHaveBeenCalledTimes(1);
    expect(runs[1].play).toHaveBeenCalledTimes(1);
    expect(hook.result.current.progress.get()).toBe(0);
    expect(hook.result.current.completed).toBe(false);
  });
  it("pauses and resumes looping demos without starting a reentry run", () => {
    const hook = renderHook(() =>
      useDemoPlayback({ loop: true, replayOnReentry: true }),
    );
    expect(motion.animate).toHaveBeenCalledWith(
      hook.result.current.progress,
      1,
      expect.objectContaining({ repeat: Infinity }),
    );
    act(() => runs[0].complete());
    expect(hook.result.current.completed).toBe(false);
    motion.inView = false;
    hook.rerender();
    expect(hook.result.current.playing).toBe(false);
    motion.inView = true;
    hook.rerender();
    expect(hook.result.current.playing).toBe(true);
    expect(motion.animate).toHaveBeenCalledTimes(1);
  });
  it("shows only the completed static state with reduced motion", () => {
    motion.reduced = true;
    const hook = renderHook(() => useDemoPlayback());
    expect(hook.result.current.reducedMotion).toBe(true);
    expect(hook.result.current.progress.get()).toBe(1);
    expect(hook.result.current.completed).toBe(true);
    expect(hook.result.current.playing).toBe(false);
    expect(motion.animate).not.toHaveBeenCalled();
  });
  it("stops its animation and removes visibility listeners on unmount", () => {
    const remove = vi.spyOn(document, "removeEventListener");
    const hook = renderHook(() => useDemoPlayback());
    hook.unmount();
    expect(runs[0].stop).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function),
    );
  });
});
