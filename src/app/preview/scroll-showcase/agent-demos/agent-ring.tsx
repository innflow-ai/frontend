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
  ringOpeningEnd,
  ringOrbitStart,
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
  rotation,
  reduced,
}: {
  slot: number;
  progress: MotionValue<number>;
  presence: MotionValue<number>;
  rotation: MotionValue<number>;
  reduced: boolean;
}) {
  const angle = slot * geometry.step;
  const track = selectionTrack(slot);
  const selected = useTransform(progress, track.times, track.values, {
    ease: easeInOut,
  });
  const transform = useTransform(() => {
    const amount = selected.get();
    const turn = angle + rotation.get();
    const radians = (turn * Math.PI) / 180;
    const scale =
      (reduced ? 0 : presence.get()) *
      (1 + amount * (geometry.selected / geometry.tile - 1));
    return `translate(-50%, -50%) translate(${((Math.sin(radians) * geometry.radius) / geometry.width) * 100}cqw, ${((-Math.cos(radians) * geometry.radius) / geometry.width) * 100}cqw) rotate(${turn}deg) scale(${scale})`;
  });
  const selectionOpacity = useTransform(() => (reduced ? 0 : selected.get()));
  const zIndex = useTransform(() => (selected.get() > 0 ? 2 : 0));
  const identity = slot % ringAssets.length;
  return (
    <motion.div
      className={styles.tile}
      data-orbit-slot={slot}
      style={{
        transform,
        zIndex,
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
        loading="eager"
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
    [
      0,
      ringOrbitStart / ringDuration,
      (ringOrbitStart + ringTiming.entrance) / ringDuration,
      ringExitStart / ringDuration,
      1,
    ],
    [0, 0, 1, 1, 0],
    { ease: [easeInOut, easeOut, easeInOut, easeIn] },
  );
  const clock = useTransform(() =>
    reducedMotion ? ringOpeningEnd : progress.get() * ringDuration,
  );
  const build = useTransform(clock, [0, ringTiming.build], [0, 1], {
    ease: easeInOut,
  });
  const shellHeight = useTransform(build, [0, 1], ["54.52%", "100%"]);
  const upperClip = useTransform(
    build,
    [0, 1],
    ["inset(100% 0 0)", "inset(0% 0 0)"],
  );
  const labelOpacity = useTransform(
    clock,
    [0, ringTiming.build, ringOpeningEnd],
    [0, 0, 1],
  );
  const skeletonOpacity = useTransform(labelOpacity, [0, 1], [1, 0]);
  const topNodeY = useTransform(
    build,
    [0, 1],
    ["translateY(19cqw)", "translateY(0cqw)"],
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
        <motion.div className={styles.connector} style={{ opacity: build }} />
        <div className={styles.shell}>
          <motion.div
            className={styles.shellBacking}
            style={{ height: shellHeight }}
          />
          <motion.div
            className={styles.upperTile}
            style={{ clipPath: upperClip }}
          >
            <div className={styles.insetPanel}>
              <motion.span style={{ opacity: labelOpacity }} data-ring-label>
                Your
                <br />
                agent
                <br />
                here
              </motion.span>
              <motion.div
                className={styles.skeleton}
                style={{ opacity: skeletonOpacity }}
                data-ring-skeleton
              >
                <i />
                <i />
                <i />
              </motion.div>
              {[0, 1, 2, 3].map((corner) => (
                <Image
                  key={corner}
                  className={styles.fastener}
                  data-corner={corner}
                  src={`${assets}fastener.svg`}
                  alt=""
                  width={7}
                  height={7}
                />
              ))}
            </div>
          </motion.div>
          <div className={styles.lowerTile}>
            <div className={styles.blueFace}>
              <Image
                src={`${assets}innflow-approved.svg`}
                alt=""
                fill
                sizes="100px"
                unoptimized
              />
            </div>
          </div>
          <motion.span
            className={styles.topNode}
            style={{ transform: topNodeY, opacity: build }}
          />
          <motion.span
            className={styles.bottomNode}
            style={{ opacity: build }}
          />
        </div>
        {slots.map((slot) => (
          <OrbitTile
            key={slot}
            slot={slot}
            progress={progress}
            presence={presence}
            rotation={rotation}
            reduced={reducedMotion}
          />
        ))}
      </div>
    </div>
  );
}

export function AgentStoryboardPreview({
  active = true,
  showControls = true,
}: {
  active?: boolean;
  showControls?: boolean;
}) {
  const [paused, setPaused] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  return (
    <div className={styles.preview}>
      <AgentRingDemo active={active && !paused} replayKey={replayKey} />
      {showControls && (
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
      )}
    </div>
  );
}
