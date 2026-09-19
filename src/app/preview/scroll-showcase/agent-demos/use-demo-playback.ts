"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

type PlaybackOptions = {
  active?: boolean;
  replayKey?: number;
  duration?: number;
  replayOnReentry?: boolean;
};

/** One shared, pausable clock; foreground layers derive transforms from it.
 * No intervals or per-frame React state, and no off-screen repeat loops.
 */
export function useDemoPlayback({
  active = true,
  replayKey = 0,
  duration = 6,
  replayOnReentry = false,
}: PlaybackOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const inView = useInView(ref, { amount: 0.25 });
  const reducedMotion = useReducedMotion() === true;
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
    // Selection and visibility never reset the clock. Only an explicit replay
    // (or a changed duration/accessibility preference) creates a new run.
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
      onComplete: () => {
        if (alive) setCompleted(true);
      },
    });
    controls.current = animation;
    return () => {
      alive = false;
      animation.stop();
      controls.current = null;
    };
  }, [duration, progress, reducedMotion, replayKey, entryRun]);

  const playing =
    active && inView && documentVisible && !reducedMotion && !completed;

  useEffect(() => {
    // Include reset inputs so a replay starts even if playing was already true.
    void duration;
    void reducedMotion;
    void replayKey;
    void entryRun;
    if (playing) controls.current?.play();
    else controls.current?.pause();
  }, [playing, duration, reducedMotion, replayKey, entryRun]);

  return { ref, progress, reducedMotion, playing, completed };
}
