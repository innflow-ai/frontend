"use client";

import { motion, useTransform } from "motion/react";
import Image from "next/image";
import styles from "./orchestrate-actions.module.css";
import { useDemoPlayback } from "./use-demo-playback";

const asset = "/preview/homepage/agent-demos/orchestrate-";

/** Proposed six-second reveal; the source is a static reference, not a recording. */
export function OrchestrateActionsDemo({
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
  const conditionOpacity = useTransform(progress, [0, 0.14], [0, 1]);
  const conditionY = useTransform(progress, [0, 0.14], [10, 0]);
  const inputOpacity = useTransform(progress, [0.15, 0.3], [0, 1]);
  const routeOpacity = useTransform(progress, [0.3, 0.45], [0, 1]);
  const userOpacity = useTransform(progress, [0.43, 0.6], [0, 1]);
  const userX = useTransform(progress, [0.43, 0.6], [8, 0]);
  const agentOpacity = useTransform(progress, [0.61, 0.8], [0, 1]);
  const agentX = useTransform(progress, [0.61, 0.8], [8, 0]);
  const changing = playing ? "transform, opacity" : undefined;

  return (
    <div ref={ref} className={styles.demo} data-demo="orchestrate-actions">
      <div
        className={styles.scene}
        role="img"
        aria-label="If/else workflow: Priority IS Urgent routes to Lara Kim; Else routes to AI Agent."
      >
        <motion.div
          className={styles.routes}
          style={{ opacity: routeOpacity }}
          aria-hidden="true"
        >
          <Image
            className={styles.ifRoute}
            src={`${asset}if-route.svg`}
            alt=""
            width={42}
            height={18}
          />
          <Image
            className={styles.elseRoute}
            src={`${asset}else-route.svg`}
            alt=""
            width={42}
            height={20}
          />
          {[
            [45.39, 43.41],
            [45.39, 58.86],
            [56.25, 35.68],
            [56.25, 67.5],
          ].map(([left, top]) => (
            <Image
              key={`${left}-${top}`}
              className={styles.port}
              style={{ left: `${left}%`, top: `${top}%` }}
              src={`${asset}port.svg`}
              alt=""
              width={5}
              height={5}
            />
          ))}
        </motion.div>
        <motion.div
          className={`${styles.panel} ${styles.condition}`}
          style={{
            opacity: conditionOpacity,
            y: conditionY,
            willChange: changing,
          }}
          aria-hidden="true"
        >
          <div className={styles.glass} />
          <div className={styles.card}>
            <p className={styles.title}>If/else</p>
            <motion.div
              className={styles.conditionInput}
              style={{ opacity: inputOpacity }}
            >
              <span>If</span>
              <span>Priority&nbsp; IS&nbsp; Urgent</span>
            </motion.div>
            <div className={styles.elseInput}>Else</div>
          </div>
        </motion.div>
        <motion.div
          className={`${styles.panel} ${styles.user}`}
          style={{ opacity: userOpacity, x: userX, willChange: changing }}
          aria-hidden="true"
        >
          <div className={styles.glass} />
          <div className={styles.card}>
            <p className={styles.title}>Assign to user</p>
            <div className={styles.assignment}>Lara Kim</div>
          </div>
        </motion.div>
        <motion.div
          className={`${styles.panel} ${styles.agent}`}
          style={{ opacity: agentOpacity, x: agentX, willChange: changing }}
          aria-hidden="true"
        >
          <div className={styles.glass} />
          <div className={styles.card}>
            <p className={styles.title}>Assign to agent</p>
            <div className={styles.assignment}>AI Agent</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
