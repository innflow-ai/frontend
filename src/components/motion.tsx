"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const spring = { type: "spring", stiffness: 120, damping: 20 } as const;

/** Hero entrance: staggered fade-rise on mount. */
export function HeroIntro({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <div>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.12, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child of HeroIntro. */
export function HeroItem({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: spring },
      }}
    >
      {children}
    </motion.div>
  );
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
