"use client";

import {
  easeIn,
  easeInOut,
  easeOut,
  type MotionValue,
  motion,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useState } from "react";
import styles from "./agent-ring.module.css";
import {
  ringGeometry as geometry,
  ringAssets,
  ringDuration,
  ringExitStart,
  ringNames,
  ringTiming,
  rotationTrack,
  selectionTrack,
} from "./agent-ring-motion";
import { useDemoPlayback } from "./use-demo-playback";

const assets = "/preview/homepage/agent-ring/";
const slots = Array.from({ length: geometry.count }, (_, slot) => slot);
function OrbitTile({
  slot,
  progress,
  presence,
  reduced,
}: {
  slot: number;
  progress: MotionValue<number>;
  presence: MotionValue<number>;
  reduced: boolean;
}) {
  const angle = slot * geometry.step;
  const radians = (angle * Math.PI) / 180;
  const track = selectionTrack(slot);
  const selected = useTransform(progress, track.times, track.values, {
    ease: easeInOut,
  });
  const transform = useTransform(() => {
    const amount = reduced ? Number(slot === 0) : selected.get();
    const scale =
      (reduced ? 1 : presence.get()) *
      (1 + amount * (geometry.selected / geometry.tile - 1));
    return `rotate(${angle}deg) scale(${scale})`;
  });
  const selectionOpacity = useTransform(() =>
    reduced ? Number(slot === 0) : selected.get(),
  );
  const identity = slot % ringAssets.length;
  return (
    <motion.div
      className={styles.tile}
      data-orbit-slot={slot}
      style={{
        left: `${((960 + Math.sin(radians) * geometry.radius - geometry.tile / 2) / 1920) * 100}%`,
        top: `${((960 - Math.cos(radians) * geometry.radius - geometry.tile / 2) / 1920) * 100}%`,
        transform,
      }}
    >
      <motion.div
        className={styles.selection}
        style={{ opacity: selectionOpacity }}
      />
      <Image
        className={identity === 6 ? styles.fullArtwork : styles.icon}
        src={`${assets}${ringAssets[identity]}`}
        alt=""
        fill
        sizes="110px"
        unoptimized
      />
    </motion.div>
  );
}

/** Native layered animation of Figma STORYBOARD_1; logos are exact exports. */
export function AgentRingDemo({
  active = true,
  replayKey = 0,
}: {
  active?: boolean;
  replayKey?: number;
}) {
  const { ref, progress, reducedMotion, playing, completed } = useDemoPlayback({
    active,
    replayKey,
    duration: ringDuration,
    replayOnReentry: true,
  });
  const rotation = useTransform(
    progress,
    rotationTrack.times,
    rotationTrack.values,
    { ease: easeInOut },
  );
  const presence = useTransform(
    progress,
    [0, ringTiming.entrance / ringDuration, ringExitStart / ringDuration, 1],
    [0, 1, 1, 0],
    { ease: [easeOut, easeInOut, easeIn] },
  );
  const transform = useTransform(
    () => `rotate(${reducedMotion ? 0 : rotation.get()}deg)`,
  );
  return (
    <div
      ref={ref}
      className={styles.demo}
      role="img"
      aria-label={`Agent selection storyboard: ${ringNames.join(", ")}. Each icon rotates into the selected white card above Innflow.`}
      data-demo="agent-ring"
      data-source-node="534:10184"
      data-playing={playing}
      data-completed={completed}
      data-reduced-motion={reducedMotion}
    >
      <div className={styles.canvas} aria-hidden="true">
        <div className={styles.connector} />
        <div className={styles.shell}>
          <div className={styles.upperTile}>
            <span>
              Your
              <br />
              agent
              <br />
              here
            </span>
          </div>
          <div className={styles.lowerTile}>
            <div className={styles.blueFace}>
              <Image
                src={`${assets}innflow.svg`}
                alt=""
                fill
                sizes="100px"
                unoptimized
              />
            </div>
          </div>
          <span className={styles.topNode} />
          <span className={styles.bottomNode} />
        </div>
        <motion.div className={styles.orbit} style={{ transform }}>
          {slots.map((slot) => (
            <OrbitTile
              key={slot}
              slot={slot}
              progress={progress}
              presence={presence}
              reduced={reducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function AgentStoryboardPreview() {
  const [paused, setPaused] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  return (
    <div className={styles.preview}>
      <AgentRingDemo active={!paused} replayKey={replayKey} />
      <fieldset
        className={styles.controls}
        aria-label="Agent storyboard playback"
      >
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? "Resume animation" : "Pause animation"}
        </button>
        <button
          type="button"
          onClick={() => {
            setReplayKey((value) => value + 1);
            setPaused(false);
          }}
        >
          Replay agent animation
        </button>
      </fieldset>
    </div>
  );
}
