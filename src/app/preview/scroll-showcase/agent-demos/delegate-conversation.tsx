"use client";

import { type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import styles from "./delegate-conversation.module.css";
import { useDemoPlayback } from "./use-demo-playback";

const messages = [
  {
    name: "Joseph Myers",
    avatar: "joseph.png",
    body: "I'm stuck with onboarding. Can you help?",
  },
  {
    name: "Quinn",
    avatar: "innflow.svg",
    body: "Of course. Which step are you on?",
  },
  {
    name: "Joseph Myers",
    avatar: "joseph.png",
    body: "Connecting our shared support inbox.",
  },
  {
    name: "Maya Chen",
    avatar: "maya.png",
    body: "I've invited the team. What comes next?",
  },
  {
    name: "Quinn",
    avatar: "innflow.svg",
    body: "Connect the inbox, then assign your team and choose a default owner.",
  },
  {
    name: "Maya Chen",
    avatar: "maya.png",
    body: "Connected. Joseph, can you see it now?",
  },
  {
    name: "Joseph Myers",
    avatar: "joseph.png",
    body: "Yes, all set. Thanks, Quinn!",
  },
  {
    name: "Quinn",
    avatar: "innflow.svg",
    body: "You're ready. I'll help with the next step.",
  },
];
const duration = 24;
function Message({
  index,
  progress,
  reduced,
}: {
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const message = messages[index];
  const start = (index * 2.6) / duration;
  const opacity = useTransform(progress, [start, start + 0.02], [0, 1]);
  const y = useTransform(progress, [start, start + 0.025], [16, 0]);
  return (
    <motion.li
      className={styles.card}
      style={reduced ? undefined : { opacity, y }}
    >
      <div className={styles.surface}>
        <div className={styles.avatar} data-agent={message.name === "Quinn"}>
          <Image
            src={`/preview/homepage/delegate-conversation/${message.avatar}`}
            alt=""
            width={56}
            height={56}
            unoptimized
          />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>
            {message.name}
            {message.name === "Quinn" && <span>AI agent</span>}
          </div>
          <p>{message.body}</p>
        </div>
      </div>
    </motion.li>
  );
}

/** Figma 1086:14434, with a requested sequential message reveal and scroll loop. */
export function DelegateConversation() {
  const [paused, setPaused] = useState(false);
  const { ref, progress, reducedMotion, playing } = useDemoPlayback({
    active: !paused,
    duration,
    loop: true,
  });
  const y = useTransform(
    progress,
    [
      0,
      7.8 / 24,
      8.5 / 24,
      10.4 / 24,
      11.1 / 24,
      13 / 24,
      13.7 / 24,
      15.6 / 24,
      16.3 / 24,
      18.2 / 24,
      18.9 / 24,
      1,
    ],
    [
      0, 0, -203.377, -203.377, -406.754, -406.754, -610.131, -610.131,
      -813.508, -813.508, -1016.885, -1016.885,
    ].map((value) => `${(value / 771) * 100}cqw`),
  );
  const opacity = useTransform(progress, [0, 0.02, 0.94, 1], [1, 1, 1, 0]);
  return (
    <div
      ref={ref}
      className={styles.demo}
      data-demo="delegate-conversation"
      data-source-node="1086:14434"
      data-playing={playing}
      data-reduced-motion={reducedMotion}
    >
      <motion.ol
        className={styles.thread}
        aria-label="Example conversation with Quinn"
        style={reducedMotion ? undefined : { y, opacity }}
      >
        {messages.map((message, index) => (
          <Message
            key={message.body}
            index={index}
            progress={progress}
            reduced={reducedMotion}
          />
        ))}
      </motion.ol>
      {!reducedMotion && (
        <button
          className={styles.pause}
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={
            paused
              ? "Resume conversation animation"
              : "Pause conversation animation"
          }
        >
          {paused ? "Play" : "Pause"}
        </button>
      )}
    </div>
  );
}
