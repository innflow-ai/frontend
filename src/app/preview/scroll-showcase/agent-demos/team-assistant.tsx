"use client";

import { motion, useTransform } from "motion/react";
import Image from "next/image";
import styles from "./team-assistant.module.css";
import { useDemoPlayback } from "./use-demo-playback";

/** Proposed message/reply sequence, not timing measured from a recording. */
export function TeamAssistantDemo({
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
  const messageOpacity = useTransform(progress, [0, 0.16], [0, 1]);
  const messageY = useTransform(progress, [0, 0.16], [16, 0]);
  const replyOpacity = useTransform(progress, [0.22, 0.36], [0, 1]);
  const replyY = useTransform(progress, [0.22, 0.36], [16, 0]);
  const typingOpacity = useTransform(
    progress,
    [0.3, 0.36, 0.52, 0.58],
    [0, 1, 1, 0],
  );
  const answerOpacity = useTransform(progress, [0.55, 0.76], [0, 1]);
  const answerY = useTransform(progress, [0.55, 0.76], [4, 0]);
  const changing = playing ? "transform, opacity" : undefined;
  return (
    <div
      ref={ref}
      className={styles.demo}
      data-demo="team-assistant"
      data-source-node="439:10309"
    >
      <div
        className={styles.scene}
        role="img"
        aria-label="Illustrative conversation: Joseph Myers asks for onboarding help. Ari replies asking which part is causing trouble."
      >
        <div
          className={`${styles.silhouette} ${styles.previous}`}
          aria-hidden="true"
        />
        <motion.div
          className={`${styles.panel} ${styles.message}`}
          style={{ opacity: messageOpacity, y: messageY, willChange: changing }}
        >
          <div className={styles.glass} aria-hidden="true" />
          <div className={styles.card}>
            <Image
              src="/preview/homepage/agent-demos/assistant-joseph.png"
              alt=""
              width={28}
              height={28}
              className={styles.avatar}
            />
            <div className={styles.copy}>
              <p className={styles.name}>Joseph Myers</p>
              <p>Currently stuck with onboarding. Help?</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={`${styles.panel} ${styles.reply}`}
          style={{ opacity: replyOpacity, y: replyY, willChange: changing }}
        >
          <div className={styles.glass} aria-hidden="true" />
          <div className={styles.card}>
            <Image
              src="/preview/homepage/agent-demos/assistant-ari.png"
              alt=""
              width={28}
              height={28}
              className={styles.avatar}
            />
            <div className={styles.copy}>
              <p className={styles.name}>
                Ari <span className={styles.badge}>AI agent</span>
              </p>
              <div className={styles.response}>
                <motion.span
                  className={styles.typing}
                  style={{ opacity: typingOpacity }}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                </motion.span>
                <motion.p style={{ opacity: answerOpacity, y: answerY }}>
                  Happy to be of help. What part are you having trouble with?
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
        <div
          className={`${styles.silhouette} ${styles.next}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
