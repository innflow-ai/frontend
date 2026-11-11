import { createElement, type ReactNode } from "react";
import styles from "./section-heading.module.css";

type HeadingLevel = 1 | 2 | 3;

/**
 * Section heading taken from the pricing page intro.
 *
 * Desktop title: Archivo, 71px, weight 700, line-height 0.95,
 * letter-spacing -0.03em, color #333, margin 0.
 * Accent line: Source Serif 4, weight 400, same size.
 * Subtitle: Archivo, 20px / 26px, color #333.
 * Block: centered, max-width 1200px, 12px gap (32px under 1200px, 24px under 700px).
 * Under 700px the title is 38px with -1.2px tracking and the subtitle is 16px.
 * Pricing has no eyebrow; the optional eyebrow sits above the title in the same stack.
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
  /** Second line, set in Source Serif 4. Pricing uses this. */
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
            <span className={styles.accent}>{accent}</span>
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
