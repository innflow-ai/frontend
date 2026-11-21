"use client";

import { type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import styles from "./insights.module.css";
import { useDemoPlayback } from "./use-demo-playback";

const issues = [
  {
    company: "Cedar",
    issue: "Slack API: thread creation failing",
    cropY: 112.66,
  },
  {
    company: "Flowbit",
    issue: "Thread creation only works in UI",
    cropY: 147.33,
  },
  { company: "Ollo", issue: "Missing permissions in Slack API", cropY: 182 },
  {
    company: "Codemesh",
    issue: "Race condition when creating a thread",
    cropY: null,
  },
] as const;

function IssueRow({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const issue = issues[index];
  const start = 0.03 + index * 0.08;
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const transform = useTransform(
    progress,
    [start, start + 0.15],
    ["translateY(10px)", "translateY(0px)"],
  );
  const highlight = useTransform(
    progress,
    [0.35 + index * 0.025, 0.47 + index * 0.025, 0.75, 1],
    [0, 0.15, 0.08, 0.04],
  );
  return (
    <motion.li className={styles.row} style={{ opacity, transform }}>
      <motion.div
        className={styles.highlight}
        style={{ opacity: highlight }}
        aria-hidden="true"
      />
      <span className={styles.logo} aria-hidden="true">
        {issue.cropY !== null && (
          <span className={styles.sourceArtwork} style={{ top: -issue.cropY }}>
            <Image
              src="/preview/homepage/agent-demos/insight-brand-artwork.png"
              alt=""
              fill
              sizes="387px"
              unoptimized
            />
          </span>
        )}
      </span>
      <span className={styles.company}>{issue.company}</span>
      <span className={styles.issue}>{issue.issue}</span>
    </motion.li>
  );
}

/** Illustrative data from the supplied design; timing is a proposed reveal. */
export function InsightsDemo({
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
  const summaryOpacity = useTransform(progress, [0.58, 0.8], [0, 1]);
  const summaryTransform = useTransform(
    progress,
    [0.58, 0.82],
    ["translateY(10px) scale(0.98)", "translateY(0px) scale(1)"],
  );
  return (
    <div
      ref={ref}
      className={styles.demo}
      data-demo="insights"
      data-source-node="439:10457"
      data-playing={playing}
      data-completed={completed}
      data-reduced-motion={reducedMotion}
    >
      <div className={styles.composition}>
        <p className={styles.disclaimer}>Illustrative data</p>
        <motion.div
          className={styles.summaryWrap}
          style={{ opacity: summaryOpacity, transform: summaryTransform }}
        >
          <div className={styles.glass} aria-hidden="true" />
          <p className={styles.summary}>
            11 Customers reported issues with Slack thread creation errors,
            missing properties, and API key permissions.
          </p>
        </motion.div>
        <div className={styles.rowsWrap}>
          <div className={styles.glass} aria-hidden="true" />
          <ul
            className={styles.rows}
            aria-label="Illustrative customer issue examples"
          >
            {issues.map((issue, index) => (
              <IssueRow key={issue.company} index={index} progress={progress} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
