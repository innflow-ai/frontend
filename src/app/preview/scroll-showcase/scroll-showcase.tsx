"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import googleButtonStyles from "@/components/google-cta.module.css";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { MixedHeadingContent } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import { HeroRiveDemo } from "./hero-rive-demo";
import styles from "./showcase.module.css";

const assets = "/preview/scroll-showcase";
const states = [
  {
    demo: "bot",
    id: "scheduling",
    label: "Bot mode",
    heading: "Teach your bot a task.",
    href: "/products/ai-agents",
    badge: "",
    body: (
      <>
        Give your agent a focused task and the context it needs. Let it prepare
        the next step while <strong>your team stays in control</strong>.
      </>
    ),
    accent: "#cc9435",
    surface: "#d3e5ff",
  },
  {
    demo: "flow",
    id: "callie",
    label: "Flows",
    heading: "Track every handoff.",
    href: "/features/workflows",
    badge: "",
    body: (
      <>
        Follow each handoff, see <strong>who owns the next step</strong>, and
        spot work waiting for approval.
      </>
    ),
    accent: "#a173a0",
    surface: "#f1f8dc",
  },
  {
    demo: "channels",
    id: "notetaker",
    label: "Channels",
    heading: "Bring your bot into the conversation.",
    href: "/features/communications",
    badge: "New",
    body: (
      <>
        Keep <strong>files and decisions</strong> in the conversation so
        teammates and agents can pick up where you left off.
      </>
    ),
    accent: "#c68150",
    surface: "#eae3f9",
  },
  {
    demo: "computer",
    id: "payments",
    label: "Computer",
    heading: "Let your bot handle the clicks.",
    href: "/features/computer",
    badge: "New",
    body: (
      <>
        Let your bot use <strong>the sites you authorize</strong> to look things
        up and fill out forms.
      </>
    ),
    accent: "#688c9b",
    surface: "#e5f9f9",
  },
] as const;
/**
 * Feature introduction on the homepage.
 * Chapters change from the tabs. The section stays in normal document flow
 * so scrolling the page does not pin the card or hide the navigation.
 * On a phone or short screen, scrolling through the hero shifts its backdrop.
 */
export function ScrollShowcase() {
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia(
      "(max-width: 800px), (max-height: 650px)",
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = section.current;
      if (!element || media.matches || !compact.matches) {
        setProgress(0);
        return;
      }
      const top = element.getBoundingClientRect().top;
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
  }

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
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
            destination="#feature-showcase"
            eventLabel="homepage_hero_learn_more"
          >
            <span className={googleButtonStyles.content}>Learn more</span>
          </TrackedLink>
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
                    : (active + 0.5) / states.length,
                "--expansion": 1,
              } as CSSProperties
            }
          >
            <div className={styles.gradient} aria-hidden="true" />
            <div className={styles.showcase}>
              <div className={styles.tabs} role="tablist" aria-label="Features">
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
                    style={{ "--accent": state.accent, "--hover-face": `url("${assets}/${state.demo}-squircle-hover.svg")` } as CSSProperties}
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
                      src={`${assets}/${state.demo}-squircle${active === index ? "-pressed" : "-rest"}.svg`}
                      alt=""
                      width={28}
                      height={28}
                    />
                  </button>
                ))}
              </div>
              <div className={styles.card}>
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
                        "--accent": state.accent,
                        "--surface": state.surface,
                      } as CSSProperties
                    }
                  >
                    <div className={styles.copy}>
                      <div className={styles.label} data-demo-label={state.demo}>
                        <Image
                          src={`${assets}/${state.demo}-button.svg`}
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
                        href={state.href}
                        data-site-cta="secondary"
                        data-cta-compact
                        aria-label={`Learn more about ${state.label}`}
                      >
                        Learn more
                      </a>
                    </div>
                    <HeroRiveDemo
                      demo={state.demo}
                      artboard={state.label}
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
