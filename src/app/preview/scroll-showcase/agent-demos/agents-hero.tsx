"use client";

import { type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./agents-hero.module.css";
import { useDemoPlayback } from "./use-demo-playback";

const assets = "/preview/homepage/agent-demos/hero-";

function ArrivalTile({
  progress,
  start,
  className,
  image,
  rotate = 0,
}: {
  progress: MotionValue<number>;
  start: number;
  className: string;
  image?: string;
  rotate?: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const transform = useTransform(
    progress,
    [start, start + 0.16],
    [
      `translateY(2cqw) scale(0.88) rotate(${rotate - 5}deg)`,
      `translateY(0cqw) scale(1) rotate(${rotate}deg)`,
    ],
  );
  return (
    <motion.div className={className} style={{ opacity, transform }}>
      {image && (
        <Image
          src={`${assets}${image}`}
          alt=""
          fill
          sizes="120px"
          unoptimized
        />
      )}
    </motion.div>
  );
}

/** Proposed motion over the supplied static design; no integration capability claims. */
export function AgentsHeroDemo({
  active = true,
  replayKey = 0,
}: {
  active?: boolean;
  replayKey?: number;
}) {
  const { ref, progress, reducedMotion, playing, completed } = useDemoPlayback({
    active,
    replayKey,
    duration: 6,
  });
  const opacity = useTransform(progress, [0, 0.16], [0, 1]);
  const transform = useTransform(
    progress,
    [0, 0.2],
    ["translateY(2cqw) scale(0.94)", "translateY(0cqw) scale(1)"],
  );
  const pulseOpacity = useTransform(
    progress,
    [0, 0.3, 0.36, 0.7, 0.8, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const pulseTransform = useTransform(
    progress,
    [0.3, 0.75],
    ["translateY(0cqw)", "translateY(43cqw)"],
  );
  const agentTransform = useTransform(
    progress,
    [0, 0.48, 0.58, 0.7, 1],
    ["scale(1)", "scale(1)", "scale(1.035)", "scale(1)", "scale(1)"],
  );
  return (
    <div
      ref={ref}
      className={styles.demo}
      role="img"
      aria-label="Illustrative agent coordination: reference agent marks surrounding an Innflow agent."
      data-demo="agents-hero"
      data-source-node="439:10270"
      data-playing={playing}
      data-completed={completed}
      data-reduced-motion={reducedMotion}
    >
      <div className={styles.canvas} aria-hidden="true">
        <div className={styles.connector}>
          <Image src={`${assets}connector.svg`} alt="" fill unoptimized />
        </div>
        <motion.div
          className={styles.connectionPulse}
          style={{ opacity: pulseOpacity, transform: pulseTransform }}
        />
        <ArrivalTile
          progress={progress}
          start={0.03}
          className={styles.greenTile}
          rotate={-30}
        />
        <ArrivalTile
          progress={progress}
          start={0.07}
          className={styles.cubeTile}
          image="cube.svg"
          rotate={-15}
        />
        <ArrivalTile
          progress={progress}
          start={0.12}
          className={styles.diagonalTile}
          image="diagonal-tile.png"
        />
        <ArrivalTile
          progress={progress}
          start={0.17}
          className={styles.radialTile}
          image="radial-tile.png"
        />
        <motion.div
          className={styles.agentGroup}
          style={{ opacity, transform }}
        >
          <div className={styles.glass} />
          <div className={styles.shell} />
          <div className={styles.upperTile} />
          <div className={styles.duck}>
            <Image
              src={`${assets}duck.png`}
              alt=""
              fill
              sizes="128px"
              unoptimized
            />
          </div>
          <motion.div
            className={styles.lowerTile}
            style={{ transform: agentTransform }}
          >
            <div className={styles.innflow}>
              <Image
                src={`${assets}innflow-icon.png`}
                alt=""
                fill
                sizes="128px"
                unoptimized
              />
            </div>
          </motion.div>
          {[0, 1].map((index) => (
            <div
              key={index}
              className={styles.node}
              style={
                { "--node-top": index ? "97.75%" : "-1.65%" } as CSSProperties
              }
            >
              <Image src={`${assets}node.svg`} alt="" fill unoptimized />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
