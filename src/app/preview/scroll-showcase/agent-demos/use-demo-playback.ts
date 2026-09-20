"use client";

import { animate, useInView, useMotionValue } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(update: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}
function readReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}
const serverReducedMotion = () => false;

type PlaybackOptions = {
  active?: boolean;
  replayKey?: number;
  duration?: number;
  replayOnReentry?: boolean;
  loop?: boolean;
  inViewAmount?: number;
};

/** One shared, pausable clock; foreground layers derive transforms from it.
 * No intervals or per-frame React state. Off-screen demos pause. `loop`
 * repeats only while the demo stays active and in view.
 */
export function useDemoPlayback({
  active = true,
  replayKey = 0,
  duration = 6,
  replayOnReentry = false,
  loop = false,
  inViewAmount = 0.25,
}: PlaybackOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const inView = useInView(ref, { amount: inViewAmount });
  // Match the server on the hydration pass, then resolve the real preference.
  // Subscribe directly so changing the preference also updates existing demos.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    readReducedMotion,
    serverReducedMotion,
  );
  const [documentVisible, setDocumentVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [entryRun, setEntryRun] = useState(0);
  const wasInView = useRef(false);
  const controls = useRef<{
    play: () => void;
    pause: () => void;
    stop: () => void;
  } | null>(null);

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (replayOnReentry && inView && !wasInView.current && completed) {
      setEntryRun((value) => value + 1);
    }
    wasInView.current = inView;
  }, [inView, completed, replayOnReentry]);

  useEffect(() => {
    // Reset on explicit replay, an opted-in reentry, or changed playback settings.
    void replayKey;
    void entryRun;
    progress.set(reducedMotion ? 1 : 0);
    setCompleted(reducedMotion);
    if (reducedMotion) {
      controls.current = null;
      return;
    }
    let alive = true;
    const animation = animate(progress, 1, {
      duration,
      ease: "linear",
      autoplay: false,
      repeat: loop ? Infinity : 0,
      onComplete: () => {
        if (alive && !loop) setCompleted(true);
      },
    });
    controls.current = animation;
    return () => {
      alive = false;
      animation.stop();
      controls.current = null;
    };
  }, [duration, loop, progress, reducedMotion, replayKey, entryRun]);

  const playing =
    active && inView && documentVisible && !reducedMotion && !completed;

  useEffect(() => {
    void duration;
    void loop;
    void reducedMotion;
    void replayKey;
    void entryRun;
    if (playing) controls.current?.play();
    else controls.current?.pause();
  }, [playing, duration, loop, reducedMotion, replayKey, entryRun]);

  return { ref, progress, reducedMotion, playing, completed };
}
