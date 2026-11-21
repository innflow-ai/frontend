"use client";

import { type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import styles from "./connected-channels.module.css";
import { useDemoPlayback } from "./use-demo-playback";

const sources = [
  { label: "Slack", icon: "/integrations/slack.svg" },
  { label: "Teams", icon: "/integrations/teams.svg" },
  { label: "Email", icon: "/integrations/gmail.svg" },
  { label: "Discord" },
  { label: "Chat" },
  { label: "Portal" },
];
const messages = [
  { source: "Slack", text: "Can you help with onboarding?" },
  { source: "Email", text: "Here’s the setup guide." },
  { source: "Portal", text: "All updates are in one place." },
];

function ConversationRow({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.3 + index * 0.16;
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const transform = useTransform(
    progress,
    [start, start + 0.12],
    ["translateY(10px)", "translateY(0px)"],
  );
  return (
    <motion.div className={styles.message} style={{ opacity, transform }}>
      <span className={styles.source}>{messages[index].source}</span>
      <p>{messages[index].text}</p>
    </motion.div>
  );
}

/** Original Channels motion draft, based on the existing six-channel brief.
 * Background intentionally supplied by the host, not part of this component.
 */
export function ConnectedChannelsDemo({
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
  const sourcesOpacity = useTransform(progress, [0, 0.12], [0, 1]);
  const sourcesTransform = useTransform(
    progress,
    [0, 0.12],
    ["translateY(-8px)", "translateY(0px)"],
  );
  const connectorScale = useTransform(
    progress,
    [0.1, 0.23],
    ["scaleY(0)", "scaleY(1)"],
  );
  const cardOpacity = useTransform(progress, [0.2, 0.34], [0, 1]);
  const cardTransform = useTransform(
    progress,
    [0.2, 0.34],
    ["translateY(12px) scale(0.97)", "translateY(0px) scale(1)"],
  );
  const statusOpacity = useTransform(progress, [0.82, 0.95], [0, 1]);

  return (
    <div
      ref={ref}
      className={styles.demo}
      data-demo="connected-channels"
      data-playing={playing}
      role="img"
      aria-label="Illustrative demo: Slack, Teams, email, Discord, chat and portal conversations come together with shared context."
    >
      <div className={styles.scene} aria-hidden="true">
        <motion.div
          className={styles.sources}
          style={{ opacity: sourcesOpacity, transform: sourcesTransform }}
        >
          {sources.map((source) => (
            <span className={styles.channel} key={source.label}>
              {source.icon && (
                <Image src={source.icon} alt="" width={18} height={18} />
              )}
              {source.label}
            </span>
          ))}
        </motion.div>
        <motion.div
          className={styles.connector}
          style={{ transform: connectorScale }}
        />
        <motion.div
          className={styles.panel}
          style={{ opacity: cardOpacity, transform: cardTransform }}
        >
          <div className={styles.glass} />
          <div className={styles.card}>
            <header className={styles.header}>
              <div>
                <strong>One conversation</strong>
                <p>Shared with your team</p>
              </div>
              <motion.span
                className={styles.connected}
                style={{ opacity: statusOpacity }}
              >
                Connected
              </motion.span>
            </header>
            {messages.map((message, index) => (
              <ConversationRow
                key={message.source}
                index={index}
                progress={progress}
              />
            ))}
          </div>
        </motion.div>
        <span className={styles.note}>Illustrative conversation</span>
      </div>
    </div>
  );
}
