"use client";

import { motion, useReducedMotion } from "motion/react";
import styles from "./agent-loop-motion.module.css";

const AGENTS = [
  { id: "vscode-1", kind: "vscode" as const, angle: 0 },
  { id: "cursor-1", kind: "cursor" as const, angle: 45 },
  { id: "claude-1", kind: "claude" as const, angle: 90 },
  { id: "codex-1", kind: "codex" as const, angle: 135 },
  { id: "vscode-2", kind: "vscode" as const, angle: 180 },
  { id: "cursor-2", kind: "cursor" as const, angle: 225 },
  { id: "claude-2", kind: "claude" as const, angle: 270 },
  { id: "codex-2", kind: "codex" as const, angle: 315 },
];

const PERIOD = 24;

function VsCodeMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#0078D4"
        d="M17.1 2.1 9.4 9.1 4.8 5.7 2 7.1v9.8l2.8 1.4 4.6-3.4 7.7 7 4.1-1.7V3.8z"
      />
    </svg>
  );
}

function CursorMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="#111"
        strokeWidth="1.6"
        d="M12 3.2 20.2 8v8L12 20.8 3.8 16V8z"
      />
      <path fill="none" stroke="#111" strokeWidth="1.4" d="M12 3.2v17.6M3.8 8l16.4 8M20.2 8 3.8 16" />
    </svg>
  );
}

function ClaudeMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#D97757"
        d="M12 2.2 13.4 9l6.6.1-5.3 4.1 2 6.4L12 16.2 7.3 19.6l2-6.4L4 9.1l6.6-.1z"
      />
    </svg>
  );
}

function CodexMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#7C6CF0"
        d="M7.2 8.2c.6-2.6 3-4.4 5.7-4.4 2.4 0 4.5 1.4 5.4 3.6 2.3.3 4 2.2 4 4.6 0 2.5-2 4.6-4.5 4.6H8.1C5.3 16.6 3 14.3 3 11.5c0-2.3 1.6-4.3 3.8-4.8z"
      />
      <path fill="#fff" d="M8.4 11.1h1.6l.8 2.2h-1.3zm3.2 0H13l.5 2.2h-1.3zm2.6 0h2.4v.8h-1.5v.3h1.3v.7h-1.3v.4H16.6v.8h-2.4z" />
    </svg>
  );
}

function InnflowMark({ variant }: { variant: "solid" | "glass" }) {
  const fill = variant === "solid" ? "#fff" : "#3DB7F5";
  return (
    <svg viewBox="0 0 64 72" aria-hidden="true">
      <path
        fill={fill}
        d="M8 18c0-6 4.8-10.8 10.8-10.8h8.4C33.2 7.2 38 12 38 18v8.4c0 6-4.8 10.8-10.8 10.8h-8.4C12.8 37.2 8 32.4 8 26.4zm18 18c0-6 4.8-10.8 10.8-10.8h8.4C51.2 25.2 56 30 56 36v8.4c0 6-4.8 10.8-10.8 10.8h-8.4C30.8 55.2 26 50.4 26 44.4z"
      />
    </svg>
  );
}

function AgentIcon({ kind }: { kind: (typeof AGENTS)[number]["kind"] }) {
  if (kind === "vscode") return <VsCodeMark />;
  if (kind === "cursor") return <CursorMark />;
  if (kind === "claude") return <ClaudeMark />;
  return <CodexMark />;
}

export function AgentLoopMotion({
  className,
  duration = PERIOD,
}: {
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const spin = reduce
    ? undefined
    : {
        rotate: 360,
        transition: { duration, repeat: Infinity, ease: "linear" as const },
      };
  const counter = reduce
    ? undefined
    : {
        rotate: -360,
        transition: { duration, repeat: Infinity, ease: "linear" as const },
      };

  return (
    <div
      className={`${styles.root} ${className ?? ""}`}
      role="img"
      aria-label="Innflow agents orbiting a shared workspace: VS Code, Cursor, Claude, and Codex."
    >
      <div className={styles.stage}>
        <div className={styles.spine} />
        <span className={`${styles.node} ${styles.nodeTop}`} />
        <span className={`${styles.node} ${styles.nodeBottom}`} />

        <div className={styles.hub}>
          <div className={styles.hubTile}>
            <div className={styles.hubFaceGlass}>
              <InnflowMark variant="glass" />
            </div>
          </div>
          <div className={styles.hubTile}>
            <div className={styles.hubFaceSolid}>
              <InnflowMark variant="solid" />
            </div>
          </div>
        </div>

        <motion.div className={styles.orbit} animate={spin}>
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className={styles.slot}
              style={{ transform: `rotate(${agent.angle}deg)` }}
            >
              <motion.div className={styles.tileWrap} animate={counter}>
                <div className={styles.tile}>
                  <AgentIcon kind={agent.kind} />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
