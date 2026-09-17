"use client";

import { motion, useTransform } from "motion/react";
import Image from "next/image";
import styles from "./orchestrate-actions.module.css";
import { useDemoPlayback } from "./use-demo-playback";

const asset = "/preview/homepage/agent-demos/orchestrate-";

/** CMS_Template 502:10184 / 567:738 — nine-beat node creation loop. */
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
    duration: 9,
    loop: true,
  });
  const changing = playing ? "opacity" : undefined;

  const conditionOpacity = useTransform(progress, [0, 1 / 9, 2 / 9, 1], [0, 0.55, 1, 1]);
  const userOpacity = useTransform(progress, [3 / 9, 4 / 9], [0, 1]);
  const agentOpacity = useTransform(progress, [4 / 9, 5 / 9], [0, 1]);
  const ifDraw = useTransform(progress, [5 / 9, 6 / 9], [0, 1]);
  const elseDraw = useTransform(progress, [7 / 9, 8 / 9], [0, 1]);
  const portOpacity = useTransform(progress, [1 / 9, 2 / 9], [0, 1]);

  return (
    <div ref={ref} className={styles.demo} data-demo="orchestrate-actions">
      <div
        className={styles.scene}
        role="img"
        aria-label="If/else workflow: Priority IS Urgent routes to Lara Kim; Else routes to AI Agent."
      >
        <div className={styles.routes} aria-hidden="true">
          <motion.div className={styles.ifReveal} style={{ scaleX: ifDraw }}>
            <Image
              className={styles.ifRoute}
              src={`${asset}if-route.svg`}
              alt=""
              width={42}
              height={18}
            />
          </motion.div>
          <motion.div className={styles.elseReveal} style={{ scaleX: elseDraw }}>
            <Image
              className={styles.elseRoute}
              src={`${asset}else-route.svg`}
              alt=""
              width={42}
              height={20}
            />
          </motion.div>
          {[
            [45.39, 43.41],
            [45.39, 58.86],
            [56.25, 35.68],
            [56.25, 67.5],
          ].map(([left, top], index) => (
            <motion.div
              key={`${left}-${top}`}
              className={styles.port}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                opacity: index < 2 ? portOpacity : index === 2 ? userOpacity : agentOpacity,
              }}
            >
              <Image src={`${asset}port.svg`} alt="" width={5} height={5} />
            </motion.div>
          ))}
        </div>
        <motion.div
          className={`${styles.panel} ${styles.condition}`}
          style={{ opacity: conditionOpacity, willChange: changing }}
          aria-hidden="true"
        >
          <div className={styles.glass} />
          <div className={styles.card}>
            <p className={styles.title}>If/else</p>
            <div className={styles.conditionInput}>
              <span>If</span>
              <span>Priority&nbsp; IS&nbsp; Urgent</span>
            </div>
            <div className={styles.elseInput}>Else</div>
          </div>
        </motion.div>
        <motion.div
          className={`${styles.panel} ${styles.user}`}
          style={{ opacity: userOpacity, willChange: changing }}
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
          style={{ opacity: agentOpacity, willChange: changing }}
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
