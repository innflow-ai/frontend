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
  loop?: boolean;
};

/** One shared, pausable clock; foreground layers derive transforms from it.
 * No intervals or per-frame React state. Off-screen demos pause. `loop`
 * repeats only while the demo stays active and in view.
 */
export function useDemoPlayback({
  active = true,
  replayKey = 0,
  duration = 6,
  loop = false,
}: PlaybackOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const inView = useInView(ref, { amount: 0.25 });
  const reducedMotion = useReducedMotion() === true;
  const [documentVisible, setDocumentVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
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
    void replayKey;
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
  }, [duration, loop, progress, reducedMotion, replayKey]);

  const playing =
    active && inView && documentVisible && !reducedMotion && !completed;

  useEffect(() => {
    void duration;
    void loop;
    void reducedMotion;
    void replayKey;
    if (playing) controls.current?.play();
    else controls.current?.pause();
  }, [playing, duration, loop, reducedMotion, replayKey]);

  return { ref, progress, reducedMotion, playing, completed };
}
