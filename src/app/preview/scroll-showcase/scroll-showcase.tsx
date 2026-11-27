"use client";

import featureIcon from "@/components/feature-icon.module.css";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import googleButtonStyles from "@/components/google-cta.module.css";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { MixedHeadingContent } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import badgeStyles from "@/components/promo-badge.module.css";
import { SaleBadge } from "@/components/sale-badge";
import { blackFridayCampaign } from "@/config/website-announcement";
import { HeroDemo } from "./hero-demo";
import { chapterScrollProgress, showcaseMotion } from "./scroll-showcase-motion";
import styles from "./showcase.module.css";

import { featureAccents, featureIconSrc } from "@/config/feature-identity";

const states = [
  {
    demo: "bot",
    id: "scheduling",
    label: "Bot mode",
    heading: <><strong>AI Agents</strong> are now part of your team.</>,
    badge: "",
    body: "Mention an agent to delegate work and get updates in the same chat.",
  },
  {
    demo: "flow",
    id: "callie",
    label: "Flows",
    heading: "AI Agents that keep work moving.",
    badge: "",
    body: "AI Agents take on work, follow up, and ask the team when a decision is needed. Results come back ready to review and use.",
  },
  {
    demo: "channels",
    id: "notetaker",
    label: "Channels",
    heading: "A channel for every team.",
    badge: "New",
    body: "Give people and AI agents a shared place to work.",
  },
  {
    demo: "computer",
    id: "payments",
    label: "Computer",
    heading: "Let your bot handle the clicks.",
    badge: "New",
    body: (
      <>
        Let your bot use <strong>the sites you authorize</strong> to look things
        up and fill out forms.
      </>
    ),
  },
] as const;
export function ScrollShowcase() {
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expansion, setExpansion] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia(
      "(max-width: 800px), (max-height: 650px)",
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = section.current;
      if (!element || media.matches) {
        setProgress(0);
        return;
      }
      const top = element.getBoundingClientRect().top;
      if (!compact.matches) {
        const range = element.offsetHeight - window.innerHeight;
        const motion = showcaseMotion(-top / Math.max(1, range));
        setActive(motion.chapter);
        setProgress(motion.chapterProgress);
        setExpansion(motion.expansion);
        return;
      }
      // The unpinned hero travels through the viewport. Scroll shifts its
      // backdrop only; it does not pin the page or change the chapter.
      setProgress(
        Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - top) /
              (element.offsetHeight + window.innerHeight),
          ),
        ),
      );
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const syncPreference = () => {
      setReduced(media.matches);
      setIsCompact(compact.matches);
      requestUpdate();
    };
    media.addEventListener("change", syncPreference);
    compact.addEventListener("change", syncPreference);
    syncPreference();
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", syncPreference);
      compact.removeEventListener("change", syncPreference);
    };
  }, []);

  function select(index: number) {
    setActive(index);
    const element = section.current;
    if (!element || reduced || isCompact) return;
    const start = window.scrollY + element.getBoundingClientRect().top;
    const range = element.offsetHeight - window.innerHeight;
    if (range > 0) {
      window.scrollTo({
        top: start + range * chapterScrollProgress(index),
        behavior: "instant",
      });
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.intro} data-home-intro>
        <p className={styles.heroTagline}>
          <span className={`${styles.tagBadge} ${badgeStyles.lime}`}>New</span>
          <span className={styles.tagDetail}>Cloud computers for your agents</span>
        </p>
        {blackFridayCampaign.offer && (
          <a className={`${styles.heroTagline} ${styles.holidayTag}`} href={blackFridayCampaign.offer.action.href}>
            {blackFridayCampaign.offer.badgeLabel && <SaleBadge label={blackFridayCampaign.offer.badgeLabel} />}
            <span className={styles.tagDetail}>
              <small>{blackFridayCampaign.offer.qualifier}</small>{" "}
              {blackFridayCampaign.offer.message}{" "}
              <small>{blackFridayCampaign.offer.planScope} with code</small>{" "}
              {blackFridayCampaign.offer.promoCode}
            </span>
          </a>
        )}
        <h1 data-reference-heading data-mixed-heading>
          <MixedHeadingContent
            title="Turn conversations"
            emphasis="into completed work."
          />
        </h1>
        <p className={styles.subheadline}>
          {process.env.NEXT_PUBLIC_HOMEPAGE_COPY === "meeting"
            ? "Turn a meeting request into a scheduled call and a follow-up draft your team can review."
            : "Connect conversations, delegate tasks, and keep work moving."}
        </p>
        <div className={styles.oauthActions}>
          <TrackedLink
            data-site-cta="secondary"
            className={`${googleButtonStyles.button} ${googleButtonStyles.raisedSignIn}`}
            destination={siteConfig.signupUrl}
            eventLabel="homepage_hero_google"
          >
            <GoogleCtaContent />
          </TrackedLink>
          <TrackedLink
            data-site-cta="primary"
            className={`${googleButtonStyles.button} ${googleButtonStyles.raisedSignIn}`}
            destination={siteConfig.loginUrl}
            eventLabel="homepage_hero_learn_more"
          >
            <span className={googleButtonStyles.content}>Learn more</span>
          </TrackedLink>
        </div>
        <div className={styles.operatorTrust}>
          <div className={styles.operatorAvatars} aria-hidden="true">
            {[1, 2, 3, 4].map((id) => (
              <Image key={id} src={`/aeline/avatars/user-${id}.avif`} width={28} height={28} alt="" unoptimized />
            ))}
          </div>
          <span>Trusted by <strong>14,353+</strong> operators</span>
        </div>
      </header>
      <section
        id="feature-showcase"
        ref={section}
        className={styles.scrollTrack}
        data-reduced={reduced}
        data-compact={isCompact}
        aria-label="Interactive feature showcase"
      >
        <div className={styles.sticky}>
          <div
            className={styles.stage}
            style={
              {
                "--gradient-progress": reduced
                  ? 0
                  : isCompact
                    ? (active + progress) / states.length
                    : progress,
                "--expansion": reduced || isCompact ? 1 : expansion,
              } as CSSProperties
            }
          >
            <div className={styles.gradient} aria-hidden="true" />
            <div className={styles.showcase}>
              <div className={styles.tabs} data-home-reveal role="tablist" aria-label="Features">
                {states.map((state, index) => (
                  <button
                    key={state.id}
                    type="button"
                    ref={(node) => {
                      tabs.current[index] = node;
                    }}
                    role="tab"
                    id={`tab-${state.id}`}
                    aria-selected={active === index}
                    aria-controls={`panel-${state.id}`}
                    aria-label={state.label}
                    tabIndex={active === index ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={(event) => {
                      let next = index;
                      if (event.key === "ArrowRight") next = (index + 1) % 4;
                      else if (event.key === "ArrowLeft")
                        next = (index + 3) % 4;
                      else if (event.key === "Home") next = 0;
                      else if (event.key === "End") next = 3;
                      else return;
                      event.preventDefault();
                      select(next);
                      tabs.current[next]?.focus({ preventScroll: true });
                    }}
                  >
                    <Image
                      className={featureIcon.face}
                      src={featureIconSrc(state.demo)}
                      alt=""
                      width={28}
                      height={28}
                    />
                  </button>
                ))}
              </div>
              <div className={styles.card} data-home-reveal>
                {states.map((state, index) => (
                  <section
                    key={state.id}
                    id={`panel-${state.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${state.id}`}
                    aria-hidden={active !== index}
                    inert={active !== index}
                    className={styles.panel}
                    data-active={active === index}
                    style={
                      {
                        "--accent": featureAccents[state.demo],
                        "--surface": "color-mix(in srgb, var(--accent) 25%, white)",
                      } as CSSProperties
                    }
                  >
                    <div className={styles.copy}>
                      <div className={styles.label} data-demo-label={state.demo}>
                        <Image
                          className={featureIcon.face}
                          src={featureIconSrc(state.demo)}
                          alt=""
                          width={24}
                          height={24}
                        />
                        <span>{state.label}</span>
                        {state.badge && <small>{state.badge}</small>}
                      </div>
                      <h2 data-reference-heading>{state.heading}</h2>
                      <p data-home-copy>{state.body}</p>
                      <a
                        href={siteConfig.loginUrl}
                        data-site-cta="secondary"
                        data-cta-compact
                        aria-label={`Learn more about ${state.label}`}
                      >
                        Learn more
                      </a>
                    </div>
                    <HeroDemo
                      demo={state.demo}
                      active={active === index}
                      play={active === index && !reduced}
                    />
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
