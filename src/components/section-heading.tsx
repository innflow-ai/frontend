import { createElement, type ReactNode } from "react";
import styles from "./section-heading.module.css";

/**
 * Archivo Bold span for words that share a line with the serif title.
 * `emphasis` is the second line, with a break before this span.
 */
export function HeadingEmphasis({ children }: { children: ReactNode }) {
  return <span className={styles.emphasis}>{children}</span>;
}

type HeadingTag = "h1" | "h2" | "h3";
type HeadingSize = "hero" | "section" | "h2" | "h3";

/**
 * Brand kit heading (Figma `TI7hq816ZzDMvvTd3HjyIS` node `432:1541`,
 * component set `52:9544` in `1fbFIPN1GfSkioiOSUZMaV`).
 *
 * `title` is Source Serif 4 Regular and comes first. `emphasis` is Archivo
 * Bold and comes second. Sizes live on `.block` as `--section-heading-*`.
 * `h2` and `h3` are the kit's smaller steps: 28/34 and 22/28, tracking 0.
 */
export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  subtitle,
  size = "section",
  align = "center",
  as = "h2",
  tone = "default",
  emphasisWeight = "bold",
  id,
  className,
  children,
}: {
  eyebrow?: ReactNode;
  /** Source Serif 4 Regular. The whole heading, when there is no emphasis. */
  title: ReactNode;
  /** Archivo Bold. Second line, after a break. */
  emphasis?: ReactNode;
  subtitle?: ReactNode;
  size?: HeadingSize;
  align?: "center" | "start";
  /** Semantic heading level. Independent of the type size. */
  as?: HeadingTag;
  /** `inverse` is for dark backgrounds. */
  tone?: "default" | "inverse";
  /** Feature pages use SemiBold. The shared kit default stays Bold. */
  emphasisWeight?: "bold" | "semibold";
  id?: string;
  className?: string;
  /** Extra content under the subtitle, such as the pricing billing control. */
  children?: ReactNode;
}) {
  return (
    <div
      className={[styles.block, className].filter(Boolean).join(" ")}
      data-align={align}
      data-emphasis={emphasisWeight}
      data-size={size}
      data-tone={tone}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      {createElement(
        as,
        { id, className: styles.title },
        title,
        emphasis ? (
          <>
            <br />
            <HeadingEmphasis>{emphasis}</HeadingEmphasis>
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
