import { createElement, type ReactNode } from "react";
import styles from "./section-heading.module.css";

/**
 * Source Serif 4 span for the pricing mix: Archivo around it, serif inside it.
 * Use this inside `title` when the serif words stay on the same line.
 * The `accent` prop is the second line, with a break before this span.
 */
export function HeadingAccent({ children }: { children: ReactNode }) {
  return <span className={styles.accent}>{children}</span>;
}

type HeadingLevel = 1 | 2 | 3;

/**
 * Shared heading structure from the pricing intro.
 *
 * Archivo is the default face. `accent` and `HeadingAccent` switch those
 * words to Source Serif 4. Sizes, weights, tracking, and line height live
 * as `--section-heading-*` on `.block` and are still the live pricing
 * measurements. Brand kit frame 432:1292 replaces them when the specs arrive.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  level = 2,
  align = "center",
  id,
  className,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Second line in Source Serif 4, after a line break. Pricing uses this. */
  accent?: ReactNode;
  subtitle?: ReactNode;
  level?: HeadingLevel;
  align?: "center" | "start";
  id?: string;
  className?: string;
  /** Extra content under the subtitle, such as the pricing billing control. */
  children?: ReactNode;
}) {
  const tag = headingTag(level);
  return (
    <div
      className={[styles.block, className].filter(Boolean).join(" ")}
      data-align={align}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      {createElement(
        tag,
        { id, className: styles.title },
        title,
        accent ? (
          <>
            <br />
            <HeadingAccent>{accent}</HeadingAccent>
          </>
        ) : null,
      )}
      {subtitle || children ? (
        <div className={styles.details}>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}

function headingTag(level: HeadingLevel) {
  switch (level) {
    case 1:
      return "h1";
    case 2:
      return "h2";
    case 3:
      return "h3";
    default: {
      const unreachable: never = level;
      return unreachable;
    }
  }
}
