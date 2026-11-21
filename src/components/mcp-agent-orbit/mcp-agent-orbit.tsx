"use client";
import { useInView, useReducedMotion } from "motion/react";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import styles from "./mcp-agent-orbit.module.css";
import { FigmaScene } from "./scene";

const coverFont = Inter({ subsets: ["latin"], weight: "400", display: "swap" });

/** One proposed 4.4-second pass, preserving the eleven Figma poses. */
export function McpAgentOrbit({
  paused = false,
  reducedMotion = false,
  poseFrame,
  className,
}: {
  paused?: boolean;
  reducedMotion?: boolean;
  poseFrame?: number;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.15 });
  const preference = useReducedMotion();
  const elapsed = useRef(0);
  const [frame, setFrame] = useState(0);
  const [visible, setVisible] = useState(false);
  const reduce = reducedMotion || preference;
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const resize = new ResizeObserver(([entry]) =>
      node.style.setProperty(
        "--scene-scale",
        String(entry.contentRect.width / 771),
      ),
    );
    resize.observe(node);
    return () => resize.disconnect();
  }, []);
  useEffect(() => {
    if (
      !inView ||
      !visible ||
      reduce ||
      paused ||
      poseFrame !== undefined ||
      elapsed.current >= 4400
    )
      return;
    let previous: number | undefined;
    let request = 0;
    const tick = (now: number) => {
      if (previous !== undefined)
        elapsed.current = Math.min(4400, elapsed.current + now - previous);
      previous = now;
      setFrame((elapsed.current * 60) / 1000);
      if (elapsed.current < 4400) request = requestAnimationFrame(tick);
    };
    request = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(request);
  }, [inView, visible, reduce, paused, poseFrame]);
  const displayedFrame = reduce
    ? 75
    : Math.max(0, Math.min(264, poseFrame ?? frame));
  return (
    <div
      ref={root}
      className={`${styles.root} ${coverFont.className} ${className ?? ""}`}
      role="img"
      aria-label="An agent docks in the Innflow workspace, enlarges, then returns to the orbit as the next agent approaches."
      data-motion-frame={Math.round(displayedFrame)}
    >
      <div className={styles.canvas} aria-hidden="true">
        <FigmaScene frame={displayedFrame} />
      </div>
    </div>
  );
}
