"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import {
  chapterScrollProgress,
  hideShowcaseNavigation,
  showcaseMotion,
} from "./scroll-showcase-motion";
import styles from "./showcase.module.css";

const assets = "/preview/scroll-showcase";
const states = [
  {
    id: "scheduling",
    label: "Scheduling",
    badge: "",
    title: "Book meetings with the world’s #1 scheduling tool",
    body: "Giving you complete control and total customization, Calendly is the easiest and most powerful way to find time to connect.",
    accent: "#6bb0ff",
    surface: "#d3e5ff",
  },
  {
    id: "callie",
    label: "Callie",
    badge: "Beta",
    title: "Introducing your 24/7 AI scheduling assistant",
    body: "Add Callie to any email thread to coordinate scheduling on your behalf without switching tools or sacrificing control.",
    accent: "#daf098",
    surface: "#f1f8dc",
  },
  {
    id: "notetaker",
    label: "Notetaker",
    badge: "New",
    title: "Actionable, shareable recaps for every meeting",
    body: "Finish the day knowing every meeting was captured, next steps were tracked, and follow-ups were handled.",
    accent: "#ba9dff",
    surface: "#eae3f9",
  },
  {
    id: "payments",
    label: "Payments",
    badge: "New",
    title: "Flexible, built-in payment tools",
    body: "Charge upfront for meetings, sell packages, and send invoices with payment features that make it easy to get paid.",
    accent: "#5aded7",
    surface: "#e5f9f9",
  },
] as const;
const days = Array.from({ length: 35 }, (_, i) => i - 2);
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

function Illustration({ index }: { index: number }) {
  return (
    <div className={styles.demo} aria-hidden="true">
      <div className={styles.wave}>
        {waveBars.map((bar) => (
          <i key={bar.id} style={{ height: bar.height }} />
        ))}
      </div>
      {index === 0 && (
        <div className={styles.calendar}>
          <div className={styles.month}>
            <span>‹</span>
            <strong>July 2026</strong>
            <span>›</span>
          </div>
          <div className={styles.week}>
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className={styles.dates}>
            {days.map((day, cell) => (
              <span
                key={day}
                data-weekend={cell % 7 === 0 || cell % 7 === 6}
                data-selected={day === 15}
              >
                {day > 0 && day <= 31 ? day : ""}
              </span>
            ))}
          </div>
          <div className={styles.booked}>✓ Meeting confirmed</div>
        </div>
      )}
      {index === 1 && (
        <div className={styles.email}>
          <div className={styles.sender}>
            <Portrait name="dominic" />
            <div>
              <strong>Dominic Mills</strong>
              <small>To Callie, Tori Mathers ▾</small>
            </div>
          </div>
          <p className={styles.typing}>
            Hi Callie, find a time for us to connect next week.
          </p>
          <div className={styles.reply}>
            <Image src={`${assets}/callie.svg`} width={18} height={18} alt="" />{" "}
            I’ll take care of the scheduling.
          </div>
        </div>
      )}
      {index === 2 && (
        <div className={styles.recap}>
          <div className={styles.participants}>
            <Portrait name="participant-one" size={100} />
            <Portrait name="participant-two" size={100} />
          </div>
          <div className={styles.notes}>
            <strong>Q2 Hiring Review ♧</strong>
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
            ◷ 45 min <span>▰ Zoom</span>
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

export function ScrollShowcase() {
  const section = useRef<HTMLElement>(null);
  const exit = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);
  const motion = showcaseMotion(progress);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia(
      "(max-width: 800px), (max-height: 650px)",
    );
    const header = document
      .getElementById("baselane-preview-nav")
      ?.closest("header");
    const previousInert = header?.inert ?? false;
    const previousHidden = header?.getAttribute("aria-hidden");
    const restoreHeader = () => {
      header?.removeAttribute("data-showcase-hidden");
      if (header) {
        header.inert = previousInert;
        if (previousHidden === null || previousHidden === undefined)
          header.removeAttribute("aria-hidden");
        else header.setAttribute("aria-hidden", previousHidden);
      }
    };
    const syncPreference = () => {
      setReduced(media.matches || compact.matches);
      requestUpdate();
    };
    media.addEventListener("change", syncPreference);
    compact.addEventListener("change", syncPreference);
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = section.current;
      if (!element || media.matches || compact.matches) {
        restoreHeader();
        return;
      }
      const top = element.getBoundingClientRect().top;
      const range = element.offsetHeight - window.innerHeight;
      const next = Math.max(0, Math.min(1, -top / Math.max(1, range)));
      setProgress(next);
      const state = showcaseMotion(next);
      setActive(state.chapter);
      if (
        header &&
        hideShowcaseNavigation(
          next,
          (
            document.getElementById("workspace-overview") ?? exit.current
          )?.getBoundingClientRect().top ??
            element.getBoundingClientRect().bottom,
          window.innerHeight,
        ) &&
        !header.contains(document.activeElement)
      ) {
        header.setAttribute("data-showcase-hidden", "true");
        header.inert = true;
        header.setAttribute("aria-hidden", "true");
      } else restoreHeader();
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    syncPreference();
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    document.addEventListener("focusin", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", syncPreference);
      compact.removeEventListener("change", syncPreference);
      document.removeEventListener("focusin", requestUpdate);
      restoreHeader();
    };
  }, []);

  function select(index: number) {
    setActive(index);
    if (!section.current || reduced) return;
    const start = section.current.getBoundingClientRect().top + window.scrollY;
    const range = section.current.offsetHeight - window.innerHeight;
    // Instant native jump avoids racing the site's Lenis wheel controller.
    window.scrollTo({
      top: start + range * chapterScrollProgress(index),
      behavior: "instant",
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1>
          One flow.
          <br />
          Four possibilities.
        </h1>
        <p className={styles.subheadline}>
          Bring conversations, AI agents, and workflows together—so your team
          can get more done with less coordination.
        </p>
        <div className={styles.oauthActions}>
          <a href={siteConfig.googleAuthUrl}>
            <Image
              src="/preview/homepage/baseline-lower/card-google.png"
              alt=""
              width={24}
              height={24}
            />
            Continue with Google
          </a>
          <button
            type="button"
            disabled
            aria-describedby="hero-microsoft-pending"
            title="Microsoft sign-in link pending"
          >
            <Image
              src="/preview/homepage/baseline-lower/card-microsoft.png"
              alt=""
              width={24}
              height={24}
            />
            Continue with Microsoft
          </button>
        </div>
        <small className={styles.signupNote}>
          <a href={siteConfig.signupUrl}>Sign up with email</a>
          {" · "}No credit card required
        </small>
        <span id="hero-microsoft-pending" className={styles.srOnly}>
          Microsoft sign-in link pending
        </span>
      </header>
      <section
        ref={section}
        className={styles.scrollTrack}
        data-reduced={reduced}
        aria-label="Interactive feature showcase"
      >
        <div className={styles.sticky}>
          <div
            className={styles.stage}
            style={
              {
                "--gradient-progress": reduced ? 0 : motion.chapterProgress,
                "--expansion": reduced ? 1 : motion.expansion,
              } as CSSProperties
            }
          >
            <div className={styles.gradient} aria-hidden="true" />
            <button
              type="button"
              className={styles.close}
              aria-label="Skip showcase"
              onClick={() =>
                exit.current?.scrollIntoView({
                  behavior: "instant",
                  block: "start",
                })
              }
            >
              ×
            </button>
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
                    <Image
                      src={`${assets}/${state.id}.svg`}
                      width={28}
                      height={28}
                      alt=""
                    />
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
                        <Image
                          src={`${assets}/${state.id}.svg`}
                          width={24}
                          height={24}
                          alt=""
                        />
                        <span>{state.label}</span>
                        {state.badge && <small>{state.badge}</small>}
                      </div>
                      <h2>{state.title}</h2>
                      <p>{state.body}</p>
                      <a
                        href="https://calendly.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Learn more <span aria-hidden="true">→</span>
                        <span className={styles.srOnly}>
                          {" "}
                          about {state.label} on Calendly (opens a new tab)
                        </span>
                      </a>
                    </div>
                    <Illustration
                      key={active === index ? "active" : "idle"}
                      index={index}
                    />
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div ref={exit} className={styles.exitAnchor} />
    </div>
  );
}
