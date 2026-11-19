"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import googleButtonStyles from "@/components/google-cta.module.css";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { BotIcon } from "@/components/icons/bot-icon";
import {
  Chart,
  Clock as MageClock,
  Users as MageUsers,
  Video as MageVideo,
  Share,
  StarsA,
} from "@/components/icons/mage";
import { MixedHeadingContent } from "@/components/section-heading";
import { SignInDialog } from "@/components/sign-in-dialog";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import { BookingCalendar } from "./booking-calendar";
import { SchedulingAssistant } from "./scheduling-assistant";
import styles from "./showcase.module.css";

const showcaseIcons = [BotIcon, Share, StarsA, Chart];
const assets = "/preview/scroll-showcase";
const states = [
  {
    id: "scheduling",
    label: "AI agent",
    href: "/products/ai-agents",
    badge: "",
    title: "Delegate tasks to your AI agent",
    heading: { title: "Delegate tasks", emphasis: "to your AI agent" },
    body: "Give your agent a focused task and the context it needs. Let it prepare the next step while your team stays in control.",
    accent: "#6bb0ff",
    surface: "#d3e5ff",
  },
  {
    id: "callie",
    label: "Workflows",
    href: "/features/workflows",
    badge: "",
    title: "Keep work moving across your tools",
    heading: { title: "Keep work moving", emphasis: "across your tools" },
    body: "Connect the steps behind everyday work. Route requests, coordinate handoffs, and keep your team involved where review is needed.",
    accent: "#daf098",
    surface: "#f1f8dc",
  },
  {
    id: "notetaker",
    label: "Sidekick",
    href: "#workflows",
    badge: "New",
    title: "Get the help you need in the moment",
    heading: { title: "Get the help you need", emphasis: "in the moment" },
    body: "Find relevant information, draft a response, and clarify next steps with assistance grounded in your team’s context.",
    accent: "#ba9dff",
    surface: "#eae3f9",
  },
  {
    id: "payments",
    label: "Insights",
    href: "#insights",
    badge: "New",
    title: "See what needs your attention",
    heading: { title: "See what needs", emphasis: "your attention" },
    body: "Turn conversations and activity into clear summaries. Spot recurring questions, review open work, and decide where to focus next.",
    accent: "#5aded7",
    surface: "#e5f9f9",
  },
] as const;
const waveBars = Array.from({ length: 24 }, (_, i) => ({
  id: `bar-${i}`,
  height: 50 + ((i * 37) % 64),
}));
const recapLines = [92, 81, 96, 88, 84];

function Portrait({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <Image
      src={`${assets}/${name}.png`}
      width={size}
      height={size}
      alt=""
      className={styles.portrait}
      unoptimized
    />
  );
}

function Illustration({ index, active }: { index: number; active: boolean }) {
  if (index === 0)
    return (
      <div className={styles.demo}>
        <BookingCalendar active={active} showControls={false} />
      </div>
    );
  if (index === 1)
    return (
      <div className={styles.demo}>
        <SchedulingAssistant active={active} />
      </div>
    );
  return (
    <div className={styles.demo} aria-hidden="true">
      <div className={styles.wave}>
        {waveBars.map((bar) => (
          <i key={bar.id} style={{ height: bar.height }} />
        ))}
      </div>
      {index === 2 && (
        <div className={styles.recap}>
          <div className={styles.participants}>
            <Portrait name="participant-one" size={100} />
            <Portrait name="participant-two" size={100} />
          </div>
          <div className={styles.notes}>
            <strong>
              Q2 Hiring Review <MageUsers size="1em" />
            </strong>
            <p>Recap</p>
            <div className={styles.lines}>
              {recapLines.map((width, i) => (
                <i
                  key={width}
                  style={{
                    width: `${width}%`,
                    animationDelay: `${0.2 + i * 0.18}s`,
                  }}
                />
              ))}
            </div>
            <p>
              Action Items <b>4</b>
            </p>
            <div className={styles.lines}>
              {recapLines.map((width, i) => (
                <i
                  key={width}
                  style={{
                    width: `${width - 4}%`,
                    animationDelay: `${1.3 + i * 0.18}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {index === 3 && (
        <div className={styles.payment}>
          <Portrait name="dominic" size={54} />
          <strong>Consultation</strong>
          <b>$100</b>
          <span>
            Powered by <strong>stripe</strong>
          </span>
          <p>
            <MageClock size="1em" /> 45 min{" "}
            <span>
              <MageVideo size="1em" /> Zoom
            </span>
          </p>
          <div className={styles.paymentSettings}>
            <div>
              Require payment{" "}
              <span className={styles.toggle}>
                <i />
              </span>
            </div>
            <small>Amount</small>
            <div className={styles.amount}>
              $ <span>100</span>
              <small>USD</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Feature introduction on the homepage.
 * Chapters change from the tabs. The section stays in normal document flow
 * so scrolling the page does not pin the card or hide the navigation.
 * On a phone or short screen, scrolling through the hero shifts its backdrop.
 */
export function ScrollShowcase() {
  const section = useRef<HTMLElement>(null);
  const signInDialog = useRef<HTMLDialogElement>(null);
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
            data-site-cta="primary"
            className={`${googleButtonStyles.button} ${googleButtonStyles.raisedSignIn}`}
            destination={siteConfig.signupUrl}
            eventLabel="homepage_hero_google"
          >
            <GoogleCtaContent />
          </TrackedLink>
          <button
            type="button"
            aria-haspopup="dialog"
            data-site-cta="secondary"
            className={`${googleButtonStyles.button} ${googleButtonStyles.raisedSignIn}`}
            onClick={(event) => {
              event.currentTarget.focus({ preventScroll: true });
              signInDialog.current?.showModal();
            }}
          >
            <span className={googleButtonStyles.content}>More options</span>
          </button>
        </div>
      </header>
      <SignInDialog ref={signInDialog} />
      <section
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
                    style={{ "--accent": state.accent } as CSSProperties}
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
                    {(() => {
                      const StateIcon = showcaseIcons[index];
                      return <StateIcon size={28} />;
                    })()}
                    <span className={styles.tooltip}>{state.label}</span>
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
                      <div className={styles.label}>
                        {(() => {
                          const StateIcon = showcaseIcons[index];
                          return <StateIcon size={24} />;
                        })()}
                        <span>{state.label}</span>
                        {state.badge && <small>{state.badge}</small>}
                      </div>
                      <h2 data-reference-heading data-mixed-heading>
                        <MixedHeadingContent
                          {...state.heading}
                          breakAt="never"
                        />
                      </h2>
                      <p data-home-copy>{state.body}</p>
                      <a
                        href={state.href}
                        data-site-cta="secondary"
                        aria-label={`Learn more about ${state.label}`}
                      >
                        Learn more
                      </a>
                    </div>
                    <Illustration
                      key={
                        index === 0
                          ? "calendar"
                          : active === index
                            ? "active"
                            : "idle"
                      }
                      index={index}
                      active={active === index}
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
