"use client";

import { type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useDemoPlayback } from "./agent-demos/use-demo-playback";
import styles from "./calendar-storyboard.module.css";

const assets = "/preview/scroll-showcase/calendar-storyboard";
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const skeletons = [
  [39, 51, 204],
  [137.5, 76, 103],
  [41.5, 108, 196],
  [38, 140, 206],
  [38, 172, 206],
  [38, 204, 174],
];

function AvailabilityRow({
  row,
  progress,
}: {
  row: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [0.6 + row * 0.03, 0.66 + row * 0.03],
    [0, 1],
  );
  return (
    <motion.div
      className={styles.availability}
      style={{
        opacity,
        clipPath: `inset(${65 + row * 32}px 0 ${238 - 93 - row * 32}px 0)`,
      }}
    >
      <Image
        src={`${assets}/available-dates.svg`}
        width={280}
        height={238}
        alt=""
      />
    </motion.div>
  );
}

/** Figma 731:728: build, skeleton, month, grid, availability, then hold.
 * Decorative illustration only: no automatic date selection or booking result.
 */
export function CalendarStoryboard({ active }: { active: boolean }) {
  const { ref, progress, playing } = useDemoPlayback({
    active,
    duration: 3.2,
  });
  const scene = useRef<HTMLDivElement>(null);
  const shell = useTransform(
    progress,
    [0, 0.14, 0.25, 1],
    [
      "scale(0.2, 0.184874)",
      "scale(0.660714, 0.630252)",
      "scale(1, 1)",
      "scale(1, 1)",
    ],
    { ease: (t) => t * t * (3 - 2 * t) },
  );
  const glass = useTransform(
    progress,
    [0, 0.14, 0.25, 1],
    [
      "scale(0.243243, 0.23622)",
      "scale(0.679054, 0.653543)",
      "scale(1, 1)",
      "scale(1, 1)",
    ],
    { ease: (t) => t * t * (3 - 2 * t) },
  );
  const month = useTransform(progress, [0.34, 0.4], [0, 1]);
  const grid = useTransform(progress, [0.49, 0.55], [0, 1]);
  const monthSkeleton = useTransform(
    progress,
    [0.23, 0.25, 0.34, 0.4],
    [0, 1, 1, 0],
  );
  const gridSkeleton = useTransform(
    progress,
    [0.23, 0.25, 0.49, 0.55],
    [0, 1, 1, 0],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const fitScene = () => {
      if (scene.current)
        scene.current.style.transform = `translate(-50%, -50%) scale(${Math.min(element.clientWidth / 516, element.clientHeight / 333)})`;
    };
    fitScene();
    const observer = new ResizeObserver(fitScene);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div
      ref={ref}
      className={styles.viewport}
      aria-hidden="true"
      data-calendar-storyboard
      data-playing={playing}
    >
      <div ref={scene} className={styles.scene}>
        <Image
          className={styles.waveform}
          src={`${assets}/waveform.svg`}
          width={516}
          height={108}
          alt=""
        />
        <motion.div className={styles.glass} style={{ transform: glass }} />
        <motion.div className={styles.shell} style={{ transform: shell }} />
        <div className={styles.content}>
          <motion.div style={{ opacity: month }}>
            <Image
              className={styles.controls}
              src={`${assets}/month-controls.svg`}
              width={118}
              height={22}
              alt=""
            />
            <span className={styles.month}>July 2026</span>
          </motion.div>
          <motion.i
            className={styles.skeleton}
            style={{
              left: 107.5,
              top: 24.5,
              width: 65,
              opacity: monthSkeleton,
            }}
          />
          <motion.div style={{ opacity: gridSkeleton }}>
            {skeletons.map(([left, top, width]) => (
              <i
                key={top}
                className={styles.skeleton}
                style={{ left, top, width }}
              />
            ))}
          </motion.div>
          {[0, 1, 2, 3, 4].map((row) => (
            <AvailabilityRow key={row} row={row} progress={progress} />
          ))}
          <motion.div style={{ opacity: grid }}>
            {weekdays.map((day, column) => (
              <span
                key={day}
                className={styles.weekday}
                style={{ left: 31 + column * 32 }}
              >
                {day}
              </span>
            ))}
            {days.map((day) => {
              const cell = day + 2;
              const column = cell % 7;
              return (
                <span
                  key={day}
                  className={styles.date}
                  data-weekend={column === 0 || column === 6}
                  style={{
                    left: 31 + column * 32,
                    top: 72 + Math.floor(cell / 7) * 32,
                  }}
                >
                  {day}
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
