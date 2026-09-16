"use client";

import { useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

export const channelsScrollQuery =
  "(min-width: 1101px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(channelsScrollQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const snapshot = () => window.matchMedia(channelsScrollQuery).matches;
const serverSnapshot = () => false;

export function channelsIndexAtProgress(
  progress: number,
  stops: readonly number[],
) {
  let nearest = 0;
  for (let index = 1; index < stops.length; index++) {
    if (Math.abs(stops[index] - progress) < Math.abs(stops[nearest] - progress))
      nearest = index;
  }
  return nearest;
}

export function useChannelsScroll(
  channels: boolean,
  onSelect: (index: number) => void,
) {
  const desktop = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const enabled = channels && desktop;
  const gridRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const geometry = useRef({
    start: 0,
    span: 1,
    from: 0,
    travel: 0,
    stops: [0],
    ready: false,
  });
  const selected = useRef(-1);
  const y = useMotionValue(0);
  const { scrollY } = useScroll();

  const update = useCallback(
    (scroll: number) => {
      const g = geometry.current;
      if (!enabled || !g.ready) return;
      const progress = Math.max(0, Math.min(1, (scroll - g.start) / g.span));
      y.set(g.from - progress * g.travel);
      const next = channelsIndexAtProgress(progress, g.stops);
      if (next !== selected.current) {
        selected.current = next;
        onSelect(next);
      }
    },
    [enabled, onSelect, y],
  );
  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    if (!enabled) {
      geometry.current.ready = false;
      y.set(0);
      return;
    }
    const grid = gridRef.current;
    const rows = rowsRef.current;
    const windowElement = windowRef.current;
    const visual = visualRef.current;
    if (!grid || !rows || !windowElement || !visual) return;
    let disposed = false;
    function measure() {
      if (disposed || !grid || !rows || !windowElement || !visual) return;
      const children = Array.from(rows.children) as HTMLElement[];
      if (!children.length) return;
      const centers = children.map(
        (row) => row.offsetTop + row.offsetHeight / 2,
      );
      const travel = Math.max(1, centers[centers.length - 1] - centers[0]);
      // Extra native scroll lets the final state settle before the sticky release.
      const span = travel + 120;
      grid.style.setProperty(
        "--channels-scroll-height",
        `${visual.offsetHeight + span}px`,
      );
      geometry.current = {
        start: grid.getBoundingClientRect().top + window.scrollY - 110,
        span,
        from: windowElement.clientHeight / 2 - centers[0],
        travel,
        stops: centers.map((center) => (center - centers[0]) / travel),
        ready: true,
      };
      update(window.scrollY);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(rows);
    observer.observe(windowElement);
    observer.observe(visual);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", measure);
      grid.style.removeProperty("--channels-scroll-height");
    };
  }, [enabled, y, update]);

  function select(index: number) {
    onSelect(index);
    selected.current = index;
    const g = geometry.current;
    if (enabled && g.ready) {
      window.scrollTo({
        top: g.start + (g.stops[index] ?? 0) * g.span,
        behavior: "instant",
      });
    }
  }
  return { enabled, gridRef, rowsRef, windowRef, visualRef, y, select };
}
