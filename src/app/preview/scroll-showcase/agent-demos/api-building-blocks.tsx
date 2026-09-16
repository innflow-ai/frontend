"use client";

import { type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import styles from "./api-building-blocks.module.css";
import { useDemoPlayback } from "./use-demo-playback";

const root = "/preview/homepage/agent-demos/building-blocks-";
const icons = [
  { name: "book", left: "25%", top: "23%" },
  { name: "globe", left: "62%", top: "29%" },
  { name: "laptop", left: "15%", top: "45%" },
  { name: "link", left: "22%", top: "70%" },
  { name: "link", left: "82%", top: "21%" },
  { name: "target", left: "82%", top: "59%" },
];
function OrbitIcon({
  index,
  progress,
  playing,
}: {
  index: number;
  progress: MotionValue<number>;
  playing: boolean;
}) {
  const icon = icons[index];
  const start = 0.18 + index * 0.065;
  const opacity = useTransform(progress, [start, start + 0.15], [0, 1]);
  const rotate = useTransform(progress, [start, 0.85], [-9, 0]);
  const counterRotate = useTransform(progress, [start, 0.85], [9, 0]);
  return (
    <motion.div
      className={styles.orbit}
      style={{
        opacity,
        rotate,
        willChange: playing ? "transform, opacity" : undefined,
      }}
      aria-hidden="true"
    >
      <motion.div
        className={styles.icon}
        style={{ left: icon.left, top: icon.top, rotate: counterRotate }}
      >
        <Image src={`${root}${icon.name}.png`} alt="" width={20} height={20} />
      </motion.div>
    </motion.div>
  );
}

/** Proposed short orbit and settle; every layer holds its final source position. */
export function ApiBuildingBlocksDemo({
  active = true,
  replayKey = 0,
}: {
  active?: boolean;
  replayKey?: number;
}) {
  const { ref, progress, playing } = useDemoPlayback({
    active,
    replayKey,
    duration: 6,
  });
  const cardOpacity = useTransform(progress, [0, 0.15], [0, 1]);
  const cardY = useTransform(progress, [0, 0.15], [12, 0]);
  const ringsOpacity = useTransform(progress, [0.08, 0.3], [0, 1]);
  return (
    <div
      ref={ref}
      className={styles.demo}
      data-demo="api-building-blocks"
      data-source-node="439:10324"
    >
      <div
        className={styles.scene}
        role="img"
        aria-label="Illustrative Your AI agent card surrounded by connected building blocks."
      >
        <motion.div
          className={styles.rings}
          style={{ opacity: ringsOpacity }}
          aria-hidden="true"
        >
          {[50, 97, 142, 182].map((radius) => (
            <Image
              key={radius}
              className={styles.ring}
              src={`${root}ring-${radius}.png`}
              alt=""
              width={radius * 2}
              height={radius * 2}
              style={{
                width: `${radius / 1.94}%`,
                height: `${radius / 1.94}%`,
              }}
            />
          ))}
        </motion.div>
        {icons.map((icon, index) => (
          <OrbitIcon
            key={`${icon.name}-${icon.left}`}
            index={index}
            progress={progress}
            playing={playing}
          />
        ))}
        <motion.div
          className={styles.panel}
          style={{
            opacity: cardOpacity,
            y: cardY,
            willChange: playing ? "transform, opacity" : undefined,
          }}
        >
          <div className={styles.glass} aria-hidden="true" />
          <div className={styles.card}>
            <Image
              className={styles.logo}
              src={`${root}ai.png`}
              alt=""
              width={28}
              height={28}
            />
            <div className={styles.copy}>
              <p>
                Your AI <span>AI agent</span>
              </p>
              <div className={styles.skeleton} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
