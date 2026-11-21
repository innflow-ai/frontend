import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  channelsIndexAtProgress,
  channelsScrollQuery,
  useChannelsScroll,
} from "./use-channels-scroll";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Channels scroll selection", () => {
  const stops = [0, 0.12, 0.38, 0.6, 0.81, 1];
  it("selects measured row centers in forward and reverse order", () => {
    expect(stops.map((p) => channelsIndexAtProgress(p, stops))).toEqual([
      0, 1, 2, 3, 4, 5,
    ]);
    expect(
      [...stops].reverse().map((p) => channelsIndexAtProgress(p, stops)),
    ).toEqual([5, 4, 3, 2, 1, 0]);
  });
  it("changes at nearest-center boundaries without skipping rows", () => {
    for (let index = 0; index < stops.length - 1; index++) {
      const midpoint = (stops[index] + stops[index + 1]) / 2;
      expect(channelsIndexAtProgress(midpoint - 0.00001, stops)).toBe(index);
      expect(channelsIndexAtProgress(midpoint + 0.00001, stops)).toBe(
        index + 1,
      );
    }
    expect(channelsIndexAtProgress(-1, stops)).toBe(0);
    expect(channelsIndexAtProgress(2, stops)).toBe(5);
    expect(channelsIndexAtProgress(0.8, [0])).toBe(0);
  });
  it("gates pinning by desktop height and motion preference and unsubscribes", () => {
    let matches = false;
    const listeners = new Set<() => void>();
    const remove = vi.fn((_event: string, listener: () => void) => {
      listeners.delete(listener);
    });
    const media = {
      get matches() {
        return matches;
      },
      addEventListener: vi.fn((_event: string, listener: () => void) => {
        listeners.add(listener);
      }),
      removeEventListener: remove,
    };
    const matchMedia = vi.fn(() => media);
    const scrollTo = vi.fn();
    vi.stubGlobal("matchMedia", matchMedia);
    vi.stubGlobal("scrollTo", scrollTo);
    const onSelect = vi.fn();
    const hook = renderHook(() => useChannelsScroll(true, onSelect));
    expect(channelsScrollQuery).toContain("min-width: 1101px");
    expect(channelsScrollQuery).toContain("min-height: 700px");
    expect(channelsScrollQuery).toContain(
      "prefers-reduced-motion: no-preference",
    );
    expect(matchMedia).toHaveBeenCalledWith(channelsScrollQuery);
    expect(hook.result.current.enabled).toBe(false);
    act(() => hook.result.current.select(4));
    expect(onSelect).toHaveBeenLastCalledWith(4);
    expect(scrollTo).not.toHaveBeenCalled();
    act(() => {
      matches = true;
      for (const listener of listeners) listener();
    });
    expect(hook.result.current.enabled).toBe(true);
    act(() => {
      matches = false;
      for (const listener of listeners) listener();
    });
    expect(hook.result.current.enabled).toBe(false);
    expect(hook.result.current.y.get()).toBe(0);
    hook.unmount();
    expect(remove).toHaveBeenCalled();
    expect(listeners.size).toBe(0);
  });
  it("never enables the scroll rail for other feature sections", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const hook = renderHook(() => useChannelsScroll(false, vi.fn()));
    expect(hook.result.current.enabled).toBe(false);
  });
});
