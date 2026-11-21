"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./baseline-lower-sections.module.css";
import { CalendarCheck, Chart, Share, StarsA } from "@/components/icons/mage";

/**
 * Photo-card strip in the closing invite, beside "From the first meeting
 * to the follow-up". The row is Insights Uncovered, Discovery Scheduled,
 * Workflows Connected, and Sidekick Ready (the fourth card sits further
 * along the same strip). Set this to true to show the cards again.
 * Scene markup and image assets stay in place either way.
 */
export const SHOW_PHOTO_CARDS = false;

const closingIcons = [CalendarCheck, Share, StarsA, Chart];
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
        <SectionHeading
          variant="mixed-italic"
          id="baseline-closing-heading"
          eyebrow="Get started"
          title="From the first meeting"
          emphasis={
            <>
              to the <strong>follow-up</strong>
            </>
          }
          subtitle={
            <>
              All of the work around meetings, handled{" "}
              <strong>in one place</strong>. Book time, capture every
              discussion, and keep next steps moving without the manual work.
            </>
          }
        />
        <TrackedLink
          data-site-cta="primary"
          className={styles.cta}
          destination={siteConfig.signupUrl}
          eventLabel="closing_signup"
        >
          Start for free
        </TrackedLink>
      </header>
      {SHOW_PHOTO_CARDS ? (
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
                          {(() => {
                            const SceneIcon = closingIcons[index];
                            return <SceneIcon size={34.2969} />;
                          })()}
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
      ) : null}
    </section>
  );
}
