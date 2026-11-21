"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import {
  channelsIndexAtProgress,
  channelsScrollQuery,
} from "@/app/preview/scroll-showcase/use-channels-scroll";

function subscribe(update: () => void) {
  const media = window.matchMedia(channelsScrollQuery);
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}
const snapshot = () => window.matchMedia(channelsScrollQuery).matches;
const serverSnapshot = () => false;
const stops = [0, 1 / 3, 2 / 3, 1];

/** Native page scrolling drives four discrete views, using the next section's motion breakpoint. */
export function useCollaborationScroll(onSelect: (index: number) => void) {
  const pinned = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const layoutRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const geometry = useRef({ start: 0, span: 1, ready: false });
  const selected = useRef(-1);
  const update = useCallback(() => {
    const g = geometry.current;
    if (!pinned || !g.ready) return;
    const progress = Math.max(
      0,
      Math.min(1, (window.scrollY - g.start) / g.span),
    );
    const next = channelsIndexAtProgress(progress, stops);
    if (selected.current !== next) {
      selected.current = next;
      onSelect(next);
    }
  }, [pinned, onSelect]);

  useEffect(() => {
    const layout = layoutRef.current;
    const visual = visualRef.current;
    if (!pinned || !layout || !visual) {
      geometry.current.ready = false;
      return;
    }
    let frame = 0;
    let disposed = false;
    const requestUpdate = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    const measure = () => {
      if (disposed) return;
      const span = 3 * Math.max(420, window.innerHeight * 0.65);
      layout.style.setProperty(
        "--collaboration-scroll-height",
        `${Math.max(visual.offsetHeight, 460) + span}px`,
      );
      geometry.current = {
        start: layout.getBoundingClientRect().top + window.scrollY - 120,
        span,
        ready: true,
      };
      update();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(visual);
    // Earlier sections can change height when media or fonts load.
    observer.observe(document.body);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
      layout.style.removeProperty("--collaboration-scroll-height");
    };
  }, [pinned, update]);

  function select(index: number) {
    selected.current = index;
    onSelect(index);
    const layout = layoutRef.current;
    if (pinned && layout) {
      // Read live geometry here as a resize can precede the observer callback.
      const start = layout.getBoundingClientRect().top + window.scrollY - 120;
      const span = 3 * Math.max(420, window.innerHeight * 0.65);
      window.scrollTo({
        top: start + stops[index] * span,
        behavior: "instant",
      });
    }
  }
  return { pinned, layoutRef, visualRef, select };
}
