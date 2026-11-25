"use client";

import {
  LayoutGroup,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  MixedHeadingContent,
  SectionHeading,
  splitHeading,
} from "@/components/section-heading";

import { SHOW_TESTIMONIAL } from "./testimonial-visibility";
import type { Testimonial } from "@/lib/testimonials";
import styles from "./baseline-lower-sections.module.css";
import pager from "@/components/carousel-pagination.module.css";
import { AgentCapabilities } from "@/components/agent-capabilities";
import { IntegrationPillars } from "./integration-pillars";

const assets = "/preview/homepage";
const lower = `${assets}/baseline-lower`;

const storyLayoutPhotos = [
  `${assets}/closing-imgImage.png`,
  `${assets}/closing-imgImage2.png`,
  `${assets}/closing-imgImage3.png`,
  `${lower}/closing-four-person.png`,
  `${assets}/innflow-mark.png`,
];

function CustomerStoryLayoutPreview() {
  const [active, setActive] = useState(0);
  const layoutId = useId();
  const reducedMotion = useReducedMotion();
  const copyControls = useAnimationControls();
  const previousActive = useRef(active);
  useEffect(() => {
    if (reducedMotion) {
      previousActive.current = active;
      copyControls.stop();
      copyControls.set({ opacity: 1 });
      return;
    }
    if (previousActive.current === active) return;
    previousActive.current = active;
    copyControls.stop();
    // Reference copy fades out before the moving portrait settles, then returns.
    // Keep one semantic copy subtree instead of duplicate outgoing article content.
    void copyControls.start({
      opacity: [1, 0, 0, 1],
      transition: { duration: 0.6, times: [0, 0.2, 0.5, 1], ease: "linear" },
    });
  }, [active, reducedMotion, copyControls]);
  const transition = {
    duration: reducedMotion ? 0 : 0.6,
    ease: [0.22, 1, 0.36, 1] as const,
  };
  return (
    <section
      className={styles.stories}
      aria-labelledby="baseline-stories-heading"
      data-source-node="348:10178"
      data-story-layout-preview="true"
      data-motion={reducedMotion ? "reduced" : "shared-layout"}
    >
      <header data-home-reveal className={styles.heading}>
        <h2 id="baseline-stories-heading" data-mixed-heading>
          <MixedHeadingContent
            title="Real customers."
            emphasis={<strong>Real results.</strong>}
            breakAt="never"
          />
        </h2>
      </header>
      <LayoutGroup id={layoutId}>
        <div className={`${styles.storyStage} ${styles.previewStoryStage}`}>
          <div className={styles.previewStoryBridges} aria-hidden="true">
            {[0, 1, 2, 3].map((slot) => (
              <svg
                key={slot}
                aria-hidden="true"
                data-slot={slot}
                viewBox={slot < 2 ? "0 0 22 42" : "0 0 18 28"}
                fill="none"
              >
                {/* Exact white bridge paths from the supplied Figma reference. */}
                <path
                  fill="white"
                  d={
                    slot < 2
                      ? "M0 0C0 0 1.36642 15.2727 11 15.2727C20.6336 15.2727 22 0 22 0V42C22 42 20.6336 26.7272 11 26.7272C1.36642 26.7272 0 42 0 42V0Z"
                      : "M0 0C0 0 1.11798 10.1818 9 10.1818C16.882 10.1818 18 0 18 0V28C18 28 16.882 17.8182 9 17.8182C1.11798 17.8182 0 28 0 28V0Z"
                  }
                />
              </svg>
            ))}
          </div>
          <article
            className={styles.storyCard}
            aria-label={`Customer story layout preview ${active + 1}`}
          >
            <div className={styles.storyCopy}>
              <h3 className={styles.previewNotice}>
                Layout preview — customer content pending
              </h3>
              <motion.div
                className={styles.attribution}
                initial={false}
                animate={copyControls}
              >
                <p className={styles.previewQuote}>
                  Space for an approved customer quote. Reference imagery is for
                  layout review only, not an Innflow endorsement.
                </p>
                <p className={styles.name}>Customer name — pending</p>
                <p className={styles.role}>Role and company — pending</p>
              </motion.div>
            </div>
            <div className={styles.storyPhoto} aria-hidden="true" />
          </article>
          {storyLayoutPhotos.map((photo, index) => {
            const offset = ((index - active + 7) % 5) - 2;
            const selected = index === active;
            return (
              <motion.button
                key={photo}
                type="button"
                layout={!reducedMotion}
                transition={transition}
                className={styles.persistentStoryPhoto}
                data-photo-index={index}
                data-position={offset}
                style={{ borderRadius: 48 }}
                tabIndex={selected ? -1 : 0}
                aria-label={`${selected ? "Current" : "Show"} layout preview ${index + 1}`}
                onClick={() => setActive(index)}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="(max-width: 628px) calc(100vw - 80px), (max-width: 800px) 548px, 361px"
                  loading="lazy"
                />
                {selected && (
                  <span className={styles.photoDisclaimer}>
                    {index === 4
                      ? "Photo slot — replace"
                      : "Reference photo — replace"}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </LayoutGroup>
      <fieldset
        className={styles.controls}
        aria-label="Choose a customer story layout preview"
        onKeyDown={(event) => {
          const count = storyLayoutPhotos.length;
          const next =
            event.key === "ArrowRight"
              ? (active + 1) % count
              : event.key === "ArrowLeft"
                ? (active + count - 1) % count
                : event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? count - 1
                    : null;
          if (next === null) return;
          event.preventDefault();
          setActive(next);
          event.currentTarget.querySelectorAll("button")[next]?.focus();
        }}
      >
        {storyLayoutPhotos.map((photo, index) => (
          <button
            key={photo}
            type="button"
            aria-label={`Customer story layout ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <span />
          </button>
        ))}
      </fieldset>
    </section>
  );
}

export function BaselineCustomerStories({
  testimonials,
  heading,
  headingSplitAfter,
  previewFallback = false,
}: {
  testimonials: Testimonial[];
  heading: string;
  headingSplitAfter?: string;
  previewFallback?: boolean;
}) {
  const [active, setActive] = useState(0);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const headingRuns = splitHeading(
    heading,
    headingSplitAfter ??
      (heading === "In their own words."
        ? "In their"
        : heading === "Real customers. Real results."
          ? "Real customers."
          : undefined),
  );
  // One switch hides the whole band, including its padding, so the sections
  // above and below meet with their own spacing and no empty slot remains.
  if (!SHOW_TESTIMONIAL) return null;
  const selected = testimonials[active % Math.max(1, testimonials.length)];
  // Empty CMS selections remain empty: never replace customer evidence with reference endorsements.
  if (!selected) return previewFallback ? <CustomerStoryLayoutPreview /> : null;
  const neighbors = testimonials
    .filter((item) => item.id !== selected.id)
    .slice(0, 4);
  return (
    <section
      className={styles.stories}
      aria-labelledby="baseline-stories-heading"
      data-source-node="350:11559"
    >
      <header data-home-reveal className={styles.heading}>
        <h2
          id="baseline-stories-heading"
          data-mixed-heading={!!headingRuns || undefined}
        >
          {headingRuns ? (
            <MixedHeadingContent
              title={headingRuns.title}
              emphasis={<strong>{headingRuns.emphasis}</strong>}
              breakAt="never"
            />
          ) : (
            heading
          )}
        </h2>
      </header>
      <div data-home-reveal className={styles.storyStage}>
        {neighbors.map((item, i) => (
          <button
            type="button"
            key={item.id}
            className={styles.sideStory}
            data-slot={i}
            aria-label={`Read ${item.name}'s story`}
            onClick={() => setActive(testimonials.indexOf(item))}
          >
            <Image src={item.portrait.url} alt="" fill sizes="105px" />
          </button>
        ))}
        <article
          className={styles.storyCard}
          aria-live="polite"
          onTouchStart={(event) => {
            const touch = event.touches[0];
            swipeStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchCancel={() => { swipeStart.current = null; }}
          onTouchEnd={(event) => {
            const start = swipeStart.current;
            swipeStart.current = null;
            if (!start || event.touches.length) return;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
            setActive((index) => (index + (dx < 0 ? 1 : -1) + testimonials.length) % testimonials.length);
          }}
        >
          <div className={styles.storyCopy}>
            {selected.statistic && (
              <h3>
                {selected.statistic.value}
                <br />
                {selected.statistic.label}
              </h3>
            )}
            <div className={styles.attribution}>
              <blockquote>“{selected.quote}”</blockquote>
              <p className={styles.name}>{selected.name}</p>
              {selected.role && <p className={styles.role}>{selected.role}</p>}
            </div>
          </div>
          <div className={styles.storyPhoto}>
            <Image
              src={selected.portrait.url}
              alt={selected.portrait.alt}
              fill
              sizes="(max-width: 628px) calc(100vw - 80px), (max-width: 800px) 548px, 361px"
            />
          </div>
        </article>
      </div>
      {testimonials.length > 1 && (
        <fieldset
          className={pager.controls}
          aria-label="Choose a customer story"
        >
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.name}'s story`}
              aria-pressed={selected.id === item.id}
              onClick={() => setActive(i)}
            >
              <span />
            </button>
          ))}
        </fieldset>
      )}
    </section>
  );
}

export function BaselineConnectedInfrastructure() {
  return (
    <section
      className={styles.infrastructure}
      aria-labelledby="baseline-infrastructure-heading"
      data-source-node="350:11630"
    >
      <header data-home-reveal className={styles.heading}>
        <SectionHeading
          variant="mixed-italic"
          id="baseline-infrastructure-heading"
          title={<strong>Connect the tools</strong>}
          emphasis="behind your work."
        />
        <AgentCapabilities />
      </header>
      <IntegrationPillars />
    </section>
  );
}
