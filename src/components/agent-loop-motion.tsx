"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./agent-loop-motion.module.css";

type Kind =
  | "codex"
  | "vscode"
  | "claude"
  | "cursor"
  | "muse"
  | "devin"
  | "grokbot"
  | "quinn";

const AGENTS: { id: string; kind: Kind; label: string }[] = [
  { id: "codex", kind: "codex", label: "Codex" },
  { id: "vscode", kind: "vscode", label: "VS Code" },
  { id: "claude", kind: "claude", label: "Claude" },
  { id: "cursor", kind: "cursor", label: "Cursor" },
  { id: "muse", kind: "muse", label: "Muse" },
  { id: "devin", kind: "devin", label: "Devin" },
  { id: "grokbot", kind: "grokbot", label: "Grokbot" },
  { id: "quinn", kind: "quinn", label: "Quinn AI" },
];

const ENTRANCE_MS = 450;
const ROTATE_MS = 700;
const EXPAND_MS = 300;
const HOLD_MS = 1200;
const EXIT_MS = 450;
const RESET_MS = 450;
const GAP_MS = 600;

type Phase = "enter" | "rotate" | "expand" | "hold" | "exit" | "reset" | "gap";

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
      <path
        fill="none"
        stroke="#111"
        strokeWidth="1.4"
        d="M12 3.2v17.6M3.8 8l16.4 8M20.2 8 3.8 16"
      />
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
      <path
        fill="#fff"
        d="M8.4 11.1h1.6l.8 2.2h-1.3zm3.2 0H13l.5 2.2h-1.3zm2.6 0h2.4v.8h-1.5v.3h1.3v.7h-1.3v.4H16.6v.8h-2.4z"
      />
    </svg>
  );
}

function MuseMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#F2A100"
        d="M12 2.4 13.6 9l6.6.2-5.2 4 1.9 6.3L12 16.3 7.7 19.5l1.9-6.3-5.2-4 6.6-.2z"
      />
    </svg>
  );
}

function DevinMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#5B5B5B" d="M12 3.2 20.2 8v8L12 20.8 3.8 16V8z" />
      <path fill="#8A8A8A" d="M12 3.2 20.2 8 12 12.4 3.8 8z" />
      <path fill="#3F3F3F" d="M12 12.4 20.2 8v8L12 20.8z" />
    </svg>
  );
}

function GrokbotMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#111"
        d="M7.2 6.4c2.4-2.8 7.4-2.8 9.6 0 2.6 3.2 2.2 8.2-1 10.6-2.4 1.8-6.6 1.6-8.8-.6-2.6-2.6-2.6-7.2.2-10z"
      />
    </svg>
  );
}

function QuinnMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8.2" cy="14.2" r="4.1" fill="#111" />
      <circle cx="15.8" cy="14.2" r="4.1" fill="#111" />
      <circle cx="12" cy="8.1" r="4.1" fill="#111" />
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

function AgentIcon({ kind }: { kind: Kind }) {
  if (kind === "vscode") return <VsCodeMark />;
  if (kind === "cursor") return <CursorMark />;
  if (kind === "claude") return <ClaudeMark />;
  if (kind === "codex") return <CodexMark />;
  if (kind === "muse") return <MuseMark />;
  if (kind === "devin") return <DevinMark />;
  if (kind === "grokbot") return <GrokbotMark />;
  return <QuinnMark />;
}

function phaseDuration(phase: Phase) {
  if (phase === "enter") return ENTRANCE_MS;
  if (phase === "rotate") return ROTATE_MS;
  if (phase === "expand") return EXPAND_MS;
  if (phase === "hold") return HOLD_MS;
  if (phase === "exit") return EXIT_MS;
  if (phase === "reset") return RESET_MS;
  return GAP_MS;
}

export function AgentLoopMotion({
  className,
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "80px 0px" });
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setTimeout(() => {
      if (phase === "enter") {
        setPhase("expand");
        return;
      }
      if (phase === "rotate") {
        setPhase("expand");
        return;
      }
      if (phase === "expand") {
        setPhase("hold");
        return;
      }
      if (phase === "hold") {
        setPhase("exit");
        return;
      }
      if (phase === "exit") {
        const next = index + 1;
        if (next >= AGENTS.length) {
          setPhase("reset");
          return;
        }
        setIndex(next);
        setPhase("rotate");
        return;
      }
      if (phase === "reset") {
        setPhase("gap");
        return;
      }
      setIndex(0);
      setPhase("enter");
    }, phaseDuration(phase));
    return () => window.clearTimeout(id);
  }, [inView, reduce, phase, index]);

  const selected = AGENTS[index];
  const ringOn = phase !== "reset" && phase !== "gap";
  const selectedOn =
    !reduce && (phase === "expand" || phase === "hold") && ringOn;
  const rotation = -index * 45;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${className ?? ""}`}
      role="img"
      aria-label="Agent icon selection: Codex, VS Code, Claude, Cursor, Muse, Devin, Grokbot, and Quinn AI take turns in the workspace slot."
    >
      <div className={styles.stage}>
        <div className={styles.spine} />
        <span className={`${styles.node} ${styles.nodeTop}`} />
        <span className={`${styles.node} ${styles.nodeBottom}`} />

        <div className={styles.hub}>
          <div className={styles.hubTile}>
            <div
              className={
                selectedOn || reduce
                  ? styles.hubFaceSelected
                  : styles.hubFaceEmpty
              }
            >
              {selectedOn || reduce ? (
                <AgentIcon kind={reduce ? "codex" : selected.kind} />
              ) : (
                <p className={styles.emptyLabel}>
                  YOUR
                  <br />
                  AGENT
                  <br />
                  HERE
                </p>
              )}
            </div>
          </div>
          <div className={styles.hubTile}>
            <div className={styles.hubFaceSolid}>
              <InnflowMark variant="solid" />
            </div>
          </div>
        </div>

        <motion.div
          className={styles.orbit}
          animate={reduce ? undefined : { rotate: rotation }}
          transition={{ duration: ROTATE_MS / 1000, ease: [0.45, 0, 0.2, 1] }}
        >
          {AGENTS.map((agent, slot) => {
            const active = slot === index && selectedOn;
            return (
              <div
                key={agent.id}
                className={styles.slot}
                style={{ transform: `rotate(${slot * 45}deg)` }}
              >
                <motion.div
                  className={styles.tileWrap}
                  animate={
                    reduce
                      ? { scale: 0 }
                      : {
                          scale: ringOn ? (active ? 1.35 : 1) : 0,
                          rotate: -rotation - slot * 45,
                        }
                  }
                  initial={{ scale: 0 }}
                  transition={{
                    scale: {
                      duration:
                        phase === "enter" || phase === "reset"
                          ? ENTRANCE_MS / 1000
                          : EXPAND_MS / 1000,
                      ease: [0.45, 0, 0.2, 1],
                    },
                    rotate: { duration: 0 },
                  }}
                >
                  <div
                    className={styles.tile}
                    data-selected={active ? "true" : undefined}
                  >
                    <AgentIcon kind={agent.kind} />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
