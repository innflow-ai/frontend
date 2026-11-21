"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import styles from "./motion.module.css";

const spring = { type: "spring", stiffness: 120, damping: 20 } as const;

/** CSS enhancement keeps the hero readable before hydration. */
export function HeroIntro({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

/** Child of HeroIntro. */
export function HeroItem({ children }: { children: ReactNode }) {
  return <div className={styles.heroItem}>{children}</div>;
}

/** Scroll-triggered section reveal (fires once). */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Gentle perpetual float. */
export function Float({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
