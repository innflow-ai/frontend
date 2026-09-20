"use client";

import {
  cubicBezier,
  type MotionValue,
  motion,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDemoPlayback } from "./agent-demos/use-demo-playback";
import styles from "./booking-calendar.module.css";
import base from "./calendar-storyboard.module.css";

const assets = "/preview/scroll-showcase/booking-calendar";
const expandEase = cubicBezier(0.22, 1, 0.36, 1);
const splitEase = cubicBezier(0.4, 0, 0.6, 1);
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
// Heights measured from the exported six storyboard poses, not random noise.
const waveHeights = [
  [32, 62, 98, 80],
  [70, 108, 62, 90],
  [104, 46, 108, 76],
  [54, 98, 46, 70],
  [88, 40, 32, 58],
  [40, 88, 70, 82],
  [98, 54, 104, 84],
  [62, 104, 54, 78],
  [108, 70, 88, 92],
  [46, 32, 40, 74],
];

function WaveBar({
  index,
  clock,
}: {
  index: number;
  clock: MotionValue<number>;
}) {
  const transform = useTransform(
    clock,
    [0, 0.9, 1.5, 2.4, 2.55, 2.7, 5],
    [108, ...waveHeights[index], 108, 108].map((h) => `scaleY(${h / 108})`),
  );
  const left = 2 + index * 56;
  return (
    <motion.div className={styles.waveBar} style={{ left, transform }}>
      <Image
        src={`${assets}/waveform.svg`}
        width={516}
        height={108}
        alt=""
        style={{ left: -left }}
      />
    </motion.div>
  );
}

function TimeRow({
  index,
  clock,
  children,
}: {
  index: number;
  clock: MotionValue<number>;
  children: React.ReactNode;
}) {
  const start = 1.06 + index * 0.06;
  const opacity = useTransform(
    clock,
    [0, start, start + 0.32, 4.5, 5],
    [0, 0, 1, 1, 0],
  );
  const transform = useTransform(
    clock,
    [0, start, start + 0.32, 4.5, 5],
    [
      "translateX(12px)",
      "translateX(12px)",
      "translateX(0px)",
      "translateX(0px)",
      "translateX(12px)",
    ],
    { ease: expandEase },
  );
  return (
    <motion.div className={styles.timeRow} style={{ opacity, transform }}>
      {children}
    </motion.div>
  );
}

/** Approved Figma 615:710. Decorative date/time selection, never a booking request. */
export function BookingCalendar({ active }: { active: boolean }) {
  const [paused, setPaused] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const { ref, progress, playing, reducedMotion } = useDemoPlayback({
    active: active && !paused,
    replayKey,
    duration: 5,
    loop: true,
    inViewAmount: 0.5,
  });
  const scene = useRef<HTMLDivElement>(null);
  // The loop returns to Ready; reduced motion must instead hold the resolved pose.
  const clock = useTransform(() => (reducedMotion ? 2.7 : progress.get() * 5));
  const expansion = useTransform(
    clock,
    [0, 0.9, 1.5, 4.5, 5],
    [0, 0, 1, 1, 0],
    { ease: expandEase },
  );
  const shell = useTransform(
    () =>
      `translateX(${-87 * expansion.get()}px) scaleX(${1 + (180 / 280) * expansion.get()})`,
  );
  const glass = useTransform(
    () =>
      `translateX(${-87 * expansion.get()}px) scaleX(${1 + (180 / 296) * expansion.get()})`,
  );
  const calendar = useTransform(
    () =>
      `translate(${-68.2 * expansion.get()}px, ${14.28 * expansion.get()}px) scale(${1 - 0.12 * expansion.get()})`,
  );
  const selected = useTransform(clock, [0, 0.72, 0.9, 4.5, 5], [0, 0, 1, 1, 0]);
  const selectedColor = useTransform(
    clock,
    [0, 0.72, 0.9, 4.5, 5],
    ["#2987ff", "#2987ff", "#ffffff", "#ffffff", "#2987ff"],
  );
  const timesOpacity = useTransform(
    clock,
    [0, 1.06, 1.38, 4.5, 5],
    [0, 0, 1, 1, 0],
  );
  const timesX = useTransform(
    expansion,
    [0, 1],
    ["translateX(-73.2px)", "translateX(0px)"],
  );
  const timeColor = useTransform(
    clock,
    [0, 2.22, 2.4, 4.5, 5],
    ["#edf5ff", "#edf5ff", "#9dccff", "#9dccff", "#edf5ff"],
  );
  const split = useTransform(clock, [0, 2.4, 2.7, 4.5, 5], [0, 0, 1, 1, 0], {
    ease: splitEase,
  });
  const chipScale = useTransform(
    () => `scaleX(${1 - (78 / 148) * split.get()})`,
  );
  const chipLabel = useTransform(() => `translateX(${-39 * split.get()}px)`);
  const bookX = useTransform(
    split,
    [0, 1],
    ["translateX(78px)", "translateX(0px)"],
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
      className={`${base.viewport} ${styles.viewport}`}
      data-booking-calendar
      data-playing={playing}
      data-reduced-motion={reducedMotion}
    >
      <div ref={scene} className={base.scene} aria-hidden="true">
        <div className={base.waveform}>
          {waveHeights.map((heights, index) => (
            <WaveBar key={heights[0]} index={index} clock={clock} />
          ))}
        </div>
        <motion.div className={base.glass} style={{ transform: glass }} />
        <motion.div className={base.shell} style={{ transform: shell }} />
        <motion.div
          className={`${base.content} ${styles.calendar}`}
          style={{ transform: calendar }}
        >
          <Image
            className={base.controls}
            src={`${assets}/month-controls.svg`}
            width={118}
            height={22}
            alt=""
          />
          <span className={base.month}>July 2026</span>
          <Image
            className={base.availability}
            src={`${assets}/available-dates.svg`}
            width={280}
            height={238}
            alt=""
          />
          <motion.i
            className={styles.selectedDate}
            style={{ opacity: selected }}
          />
          {weekdays.map((day, column) => (
            <span
              key={day}
              className={base.weekday}
              style={{ left: 31 + column * 32 }}
            >
              {day}
            </span>
          ))}
          {days.map((day) => {
            const cell = day + 2;
            const column = cell % 7;
            return (
              <motion.span
                key={day}
                className={base.date}
                data-weekend={column === 0 || column === 6}
                style={{
                  left: 31 + column * 32,
                  top: 72 + Math.floor(cell / 7) * 32,
                  ...(day === 14 ? { color: selectedColor } : {}),
                }}
              >
                {day}
              </motion.span>
            );
          })}
        </motion.div>
        <motion.div
          className={styles.times}
          style={{ opacity: timesOpacity, transform: timesX }}
        >
          <div className={styles.selectedDay}>
            <strong>Tuesday</strong>
            <span>July 14, 2026</span>
          </div>
          <TimeRow index={0} clock={clock}>
            <span className={styles.time}>12:30 PM</span>
          </TimeRow>
          <TimeRow index={1} clock={clock}>
            <span className={styles.time}>2:30 PM</span>
          </TimeRow>
          <TimeRow index={2} clock={clock}>
            <motion.i
              className={styles.chipSurface}
              style={{ backgroundColor: timeColor, transform: chipScale }}
            />
            <motion.span
              className={styles.chipLabel}
              style={{ transform: chipLabel }}
            >
              3:00 PM
            </motion.span>
            <motion.span
              className={styles.book}
              style={{ transform: bookX, opacity: split }}
            >
              Book
            </motion.span>
          </TimeRow>
        </motion.div>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          aria-label={
            paused ? "Resume calendar animation" : "Pause calendar animation"
          }
          onClick={() => setPaused((value) => !value)}
          disabled={reducedMotion}
        >
          {paused ? "Play" : "Pause"}
        </button>
        <button
          type="button"
          aria-label="Replay calendar animation"
          onClick={() => {
            setReplayKey((value) => value + 1);
            setPaused(false);
          }}
          disabled={reducedMotion}
        >
          Replay
        </button>
      </div>
    </div>
  );
}
