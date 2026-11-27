"use client";

import { useLayoutEffect, type RefObject } from "react";

export type HeroTimeline = {
  at: (ms: number, properties: Keyframe) => Keyframe;
  animate: (target: Element, frames: Keyframe[]) => void;
  duration: number;
};

type Draw = (
  scene: HTMLElement,
  viewport: HTMLElement,
  timeline: HeroTimeline,
) => void;

// Each scene holds its final position through the fade. Playback returns to
// the first frame during the invisible 150 ms between iterations.
export function useHeroLoop(
  sceneRef: RefObject<HTMLDivElement | null>,
  play: boolean,
  fadeStart: number,
  drawScene: Draw,
  playbackRate = 1,
) {
  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const viewport = scene?.parentElement;
    if (!scene || !viewport || !play || !scene.animate) return;
    const duration = fadeStart + 600;
    let animations: Animation[] = [];
    const draw = () => {
      const elapsed = Number(animations[0]?.currentTime ?? 0);
      for (const animation of animations) animation.cancel();
      animations = [];
      const at: HeroTimeline["at"] = (ms, values) => ({
        easing: "cubic-bezier(.42,0,.25,1)",
        ...values,
        offset: ms / duration,
      });
      const animate: HeroTimeline["animate"] = (target, frames) => {
        const animation = target.animate(frames, {
          duration: duration / playbackRate,
          iterations: Infinity,
          fill: "both",
        });
        animation.currentTime = elapsed;
        animations.push(animation);
      };
      drawScene(scene, viewport, { at, animate, duration });
      animate(scene, [
        at(0, { opacity: 0 }),
        at(240, { opacity: 1 }),
        at(fadeStart, { opacity: 1 }),
        at(fadeStart + 450, { opacity: 0 }),
        at(duration, { opacity: 0 }),
      ]);
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(scene);
    observer.observe(viewport);
    return () => {
      observer.disconnect();
      for (const animation of animations) animation.cancel();
    };
  }, [sceneRef, play, fadeStart, drawScene, playbackRate]);
}
