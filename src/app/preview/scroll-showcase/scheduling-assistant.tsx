"use client";

import { motion, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useDemoPlayback } from "./agent-demos/use-demo-playback";
import styles from "./scheduling-assistant.module.css";

const message = "Hi Innflow, find a time for us to meet next week.";
const assets = "/preview/scroll-showcase";

export function SchedulingAssistant({ active }: { active: boolean }) {
  const { ref, progress, playing, reducedMotion } = useDemoPlayback({
    active,
    duration: 5,
  });
  const scene = useRef<HTMLDivElement>(null);
  const typed = useTransform(progress, (value) =>
    message.slice(
      0,
      Math.floor(
        Math.min(1, Math.max(0, (value - 0.1) / 0.5)) * message.length,
      ),
    ),
  );
  const replyOpacity = useTransform(progress, [0.7, 0.82], [0, 1]);
  const replyY = useTransform(progress, [0.7, 0.82], [8, 0]);
  const cursorOpacity = useTransform(progress, [0, 0.6, 0.65], [1, 1, 0]);
  const signalScale = useTransform(
    progress,
    [0, 0.15, 0.4, 0.65, 0.82, 1],
    [0.65, 1, 0.8, 1, 0.85, 1],
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
      data-playing={playing}
      data-reduced-motion={reducedMotion}
      role="img"
      aria-label="AI assistant receives a scheduling request and replies: I’ll coordinate a time with everyone."
    >
      <div ref={scene} className={styles.scene} aria-hidden="true">
        <motion.div className={styles.signal} style={{ scaleY: signalScale }}>
          <Image
            src={`${assets}/assistant-signal.svg`}
            width={516}
            height={120}
            alt=""
            unoptimized
          />
        </motion.div>
        <div className={styles.glass}>
          <div className={styles.email}>
            <div className={styles.sender}>
              <Image
                src={`${assets}/dominic.png`}
                width={36}
                height={36}
                alt=""
                unoptimized
              />
              <div>
                <strong>Dominic Mills</strong>
                <small>To Innflow, Tori Mathers ▾</small>
              </div>
            </div>
            <p className={styles.message}>
              <motion.span>{typed}</motion.span>
              <motion.span
                className={styles.cursor}
                style={{ opacity: cursorOpacity }}
              >
                ▏
              </motion.span>
            </p>
            <motion.div
              className={styles.reply}
              style={{ opacity: replyOpacity, y: replyY }}
            >
              <Image
                src={`${assets}/callie.svg`}
                width={18}
                height={18}
                alt=""
              />
              <span>I’ll coordinate a time with everyone.</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
