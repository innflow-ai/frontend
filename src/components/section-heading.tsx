import { createElement, type ReactNode } from "react";
import { MixedHeadingText } from "./mixed-heading-text";
import styles from "./section-heading.module.css";

/**
 * Archivo Bold span for words that share a line with the serif title.
 * `emphasis` is the second line, with a break before this span.
 */
export function HeadingEmphasis({ children }: { children: ReactNode }) {
  return <span className={styles.emphasis}>{children}</span>;
}

export type HeadingVariant = "default" | "mixed-italic";
type HeadingBreak = "always" | "desktop" | "never";

/** One semantic sentence, with independently styled font runs. */
export function MixedHeadingContent({
  title,
  emphasis,
  breakAt = "always",
}: {
  title: ReactNode;
  emphasis?: ReactNode;
  breakAt?: HeadingBreak;
}) {
  return (
    <>
      <span className={styles.mixedLead}>{title}</span>
      {emphasis ? (
        <>
          {" "}
          <span className={styles.mixedTail} data-break={breakAt}>
            {emphasis}
          </span>
        </>
      ) : null}
    </>
  );
}

/** Preserve arbitrary CMS text unless an exact word-boundary split is supplied. */
export function splitHeading(text: string, splitAfter?: string) {
  if (
    !splitAfter ||
    !text.startsWith(splitAfter) ||
    !/\s/.test(text.charAt(splitAfter.length))
  )
    return null;
  const continuation = text.slice(splitAfter.length).trimStart();
  return continuation ? { title: splitAfter, emphasis: continuation } : null;
}

type HeadingTag = "h1" | "h2" | "h3";
type HeadingSize = "hero" | "section" | "h2" | "h3";

/**
 * Shared marketing heading. Mixed italic is the Web default; `default` retains
 * the legacy serif-first treatment for explicitly unmigrated consumers.
 * Sizes, semantic levels, alignment, and color stay independent of typography.
 */
export function SectionHeading({
  eyebrow,
  variant = "mixed-italic",
  breakAt = "always",
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
  variant?: HeadingVariant;
  breakAt?: HeadingBreak;
  eyebrow?: ReactNode;
  /** Opening phrase, or the full title when no explicit split is supplied. */
  title: ReactNode;
  /** Continuation phrase. Source Serif 4 Italic in the mixed variant. */
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
      data-heading-variant={variant}
      data-align={align}
      data-emphasis={emphasisWeight}
      data-size={size}
      data-tone={tone}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      {createElement(
        as,
        {
          id,
          className: styles.title,
          "data-mixed-heading": variant === "mixed-italic" || undefined,
        },
        variant === "mixed-italic" ? (
          emphasis ? (
            <MixedHeadingContent
              title={title}
              emphasis={emphasis}
              breakAt={breakAt}
            />
          ) : (
            <MixedHeadingText>{title}</MixedHeadingText>
          )
        ) : (
          title
        ),
        variant !== "mixed-italic" && emphasis ? (
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
