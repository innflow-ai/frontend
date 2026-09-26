"use client";

import {
  LayoutGroup,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import type { Testimonial } from "@/lib/testimonials";
import styles from "./baseline-lower-sections.module.css";
import { integrationIcons, integrationNames } from "./homepage-content";

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
      <header className={styles.heading}>
        <h2 id="baseline-stories-heading">Real customers. Real results.</h2>
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
                  sizes="(max-width: 700px) 85vw, 361px"
                  loading="eager"
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
  previewFallback = false,
}: {
  testimonials: Testimonial[];
  heading: string;
  previewFallback?: boolean;
}) {
  const [active, setActive] = useState(0);
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
      <header className={styles.heading}>
        <h2 id="baseline-stories-heading">{heading}</h2>
      </header>
      <div className={styles.storyStage}>
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
        <article className={styles.storyCard}>
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
              sizes="(max-width: 700px) 85vw, 361px"
            />
          </div>
        </article>
      </div>
      {testimonials.length > 1 && (
        <fieldset
          className={styles.controls}
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
  const cards = [
    {
      title: "Support channels",
      body: "Bring messages from your connected channels into one place, so your team can follow the conversation and respond with context.",
      icon: "card-google.png",
      href: "/integrations",
    },
    {
      title: "Your tools. Your workflows.",
      body: "Keep conversation details connected to the tools your team uses. Pass context into your CRM, issue tracker or own APIs.",
      icon: "card-microsoft.png",
      href: "/integrations",
    },
  ];
  return (
    <section
      className={styles.infrastructure}
      aria-labelledby="baseline-infrastructure-heading"
      data-source-node="350:11630"
    >
      <header className={styles.heading}>
        <h2 id="baseline-infrastructure-heading">
          Connect the tools
          <br />
          behind your work.
        </h2>
        <p>
          Bring relevant information into the tools your team already uses.
          Explore supported connections to find the right fit for your workflow.
        </p>
        <Link className={styles.directory} href="/integrations">
          View all integrations <span aria-hidden="true">→</span>
        </Link>
      </header>
      <div className={styles.integrations}>
        {[integrationNames.slice(0, 9), integrationNames.slice(9)].map(
          (row) => (
            <div className={styles.integrationRow} key={row[0]}>
              {row.map((name) => (
                <div className={styles.integrationTile} key={name}>
                  <Image
                    src={integrationIcons[name]}
                    alt={name}
                    width={64}
                    height={64}
                  />
                </div>
              ))}
            </div>
          ),
        )}
      </div>
      <div className={styles.infrastructureCards}>
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className={styles.cardTop}>
              <Image
                src={`${lower}/${card.icon}`}
                width={24}
                height={24}
                alt=""
              />
              <span aria-hidden="true">↗</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </Link>
        ))}
      </div>
      <p className={styles.referenceNote}>
        Connection examples from the design. Check the directory for
        availability.
      </p>
    </section>
  );
}

const closingAssets = "/preview/homepage/closing-figma";
const scenes = [
  {
    person: `${closingAssets}/89753.png`,
    background: `${closingAssets}/e9597.png`,
    label: "Discovery scheduled",
    subject: "Discovery",
    outcome: "Scheduled",
    icon: `${closingAssets}/beeac.svg`,
    stripe: "#f2f8de",
  },
  {
    person: `${closingAssets}/efb04.png`,
    background: `${closingAssets}/6ddf2.png`,
    label: "Workflows connected",
    subject: "Workflows",
    outcome: "Connected",
    icon: "/preview/scroll-showcase/callie.svg",
    stripe: "#d4c2ff",
  },
  {
    person: `${closingAssets}/b40da.png`,
    background: `${closingAssets}/7c695.png`,
    label: "Sidekick ready",
    subject: "Sidekick",
    outcome: "Ready",
    icon: "/preview/scroll-showcase/notetaker.svg",
    stripe: "#6bb1ff",
  },
  {
    person: `${closingAssets}/02833.png`,
    background: `${closingAssets}/2841c.png`,
    label: "Insights uncovered",
    subject: "Insights",
    outcome: "Uncovered",
    icon: "/preview/scroll-showcase/payments.svg",
    stripe: "#baf0ec",
  },
];

export function BaselineClosing() {
  const [active, setActive] = useState(1);
  const viewport = useRef<HTMLElement>(null);
  const orderedScenes = [scenes[3], scenes[0], scenes[1], scenes[2]];
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const centerDiscovery = () => {
      const card = element.querySelector<HTMLElement>("[data-scene-index='1']");
      if (card)
        element.scrollLeft =
          card.offsetLeft + card.offsetWidth / 2 - element.clientWidth / 2;
    };
    const frame = requestAnimationFrame(centerDiscovery);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <section
      className={styles.closing}
      aria-labelledby="baseline-closing-heading"
      id="get-started"
      data-source-node="1:991"
    >
      <header className={styles.heading}>
        <span className={styles.closingEyebrow}>Get started</span>
        <h2 id="baseline-closing-heading">
          From the first meeting
          <br />
          to the follow-up
        </h2>
        <p>
          All of the work around meetings, handled in one place. Book time,
          capture every discussion, and keep next steps moving without the
          manual work.
        </p>
        <a className={styles.cta} href={siteConfig.signupUrl}>
          Start for free
        </a>
      </header>
      <section
        ref={viewport}
        className={styles.closingViewport}
        aria-label="Product highlights. Scroll horizontally to explore."
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Allow keyboard scrolling of the horizontal region.
        tabIndex={0}
        data-lenis-prevent
        onScroll={(event) => {
          const element = event.currentTarget;
          const center = element.scrollLeft + element.clientWidth / 2;
          const cards = [
            ...element.querySelectorAll<HTMLElement>("[data-scene-index]"),
          ];
          const closest = cards.reduce(
            (best, card) =>
              Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) <
              Math.abs(best.offsetLeft + best.offsetWidth / 2 - center)
                ? card
                : best,
            cards[0],
          );
          if (closest) setActive(Number(closest.dataset.sceneIndex));
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          const element = event.currentTarget;
          const next = Math.max(
            0,
            Math.min(3, active + (event.key === "ArrowRight" ? 1 : -1)),
          );
          const card = element.querySelector<HTMLElement>(
            `[data-scene-index='${next}']`,
          );
          if (card)
            element.scrollTo({
              left:
                card.offsetLeft +
                card.offsetWidth / 2 -
                element.clientWidth / 2,
              behavior: "instant",
            });
        }}
      >
        <div className={styles.closingTrack}>
          {orderedScenes.map((scene, index) => {
            return (
              <div
                key={scene.label}
                className={styles.scene}
                data-active={active === index}
                data-scene-index={index}
                style={{ "--stripe": scene.stripe } as CSSProperties}
              >
                <div className={styles.sceneBackdrop}>
                  <Image src={scene.background} alt="" fill sizes="656px" />
                  <div />
                </div>
                <Image
                  className={styles.scenePerson}
                  src={scene.person}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 85vw, 593px"
                />
                {
                  <div className={styles.sceneBadge}>
                    <div className={styles.badgeBase} aria-hidden="true">
                      <Image
                        src={`${closingAssets}/fd6d2.svg`}
                        alt=""
                        width={56}
                        height={56}
                      />
                      <Image
                        src={`${closingAssets}/3ebbd.svg`}
                        alt=""
                        width={16}
                        height={28}
                      />
                      <span>{scene.subject}</span>
                      <Image
                        src={`${closingAssets}/3ebbd.svg`}
                        alt=""
                        width={16}
                        height={28}
                      />
                      <strong>{scene.outcome}</strong>
                    </div>
                    <div className={styles.badgeForeground}>
                      <div className={styles.badgeIcon}>
                        <i style={{ background: scene.stripe }} />
                        <Image
                          src={`${closingAssets}/360d7.svg`}
                          alt=""
                          width={47.9844}
                          height={47.9844}
                        />
                        <Image
                          src={scene.icon}
                          alt=""
                          width={34.2969}
                          height={34.2969}
                        />
                      </div>
                      <span>{scene.subject}</span>
                      <strong>{scene.outcome}</strong>
                    </div>
                  </div>
                }
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
