"use client";

import Image from "next/image";
import { Checklist, Share, StarsA } from "@/components/icons/mage";
import { MixedHeadingContent } from "@/components/section-heading";

const stepIcons = [StarsA, Share, Checklist];

import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { siteConfig } from "@/config/site";
import { LottieArtwork } from "./lottie-artwork";
import { WorkspaceCardArtwork } from "./workspace-card-artwork";
import styles from "./workspace-overview.module.css";

const assets = "/preview/homepage/workspace-overview";
const tabletQuery = "(min-width: 761px) and (max-width: 1100px)";
function subscribeTablet(onChange: () => void) {
  const query = window.matchMedia(tabletQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getTabletSnapshot() {
  return window.matchMedia(tabletQuery).matches;
}
const getServerTabletSnapshot = () => false;

// Innflow copy paired with the supplied Figma reference artwork.
export const workspaceCards = [
  {
    id: "connect",
    title: "Teach a task",
    summary: "Record a task for your agent.",
    description:
      "Show your agent how you export the weekly signup report by recording the steps as you work.",
    steps: [
      "Start recording",
      "Choose the last 7 days and export the report",
      "Stop and save the demonstration",
    ],
    source: "393:26359",
  },
  {
    id: "assist",
    title: "Train",
    summary: "Show your agents how you work.",
    description:
      "Share your preferences, processes, and instructions so your agents know how you want the work handled.",
    steps: [
      "Share your preferences",
      "Define your processes",
      "Give clear instructions",
    ],
    source: "53:725",
  },
  {
    id: "automate",
    title: "Assign",
    summary: "Hand off the work.",
    description:
      "Give your agents a focused task, with clear responsibilities and review points for your team.",
    steps: [
      "Assign a focused task",
      "Set clear responsibilities",
      "Choose where approval is needed",
    ],
    source: "53:842",
  },
  {
    id: "learn",
    title: "Deploy",
    summary: "Put your agents to work. Review progress.",
    description:
      "Put your agents to work and follow their progress from one workspace.",
    steps: [
      "Put your agents to work",
      "Follow their progress",
      "Manage work from one workspace",
    ],
    source: "53:959",
  },
] as const;

function TeachingDemo({ expanded }: { expanded: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!expanded || !el || typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => setPlay(visible && !motion.matches);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(el);
    motion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      setPlay(false);
    };
  }, [expanded]);

  return (
    <div
      className={styles.teachingDemo}
      ref={host}
      role="img"
      aria-label="Recording a demonstration of exporting the last seven days of signup data."
    >
      <LottieArtwork
        artwork={`${assets}/teach-weekly-report`}
        width={580}
        height={294}
        play={expanded && play}
      />
    </div>
  );
}

export function WorkspaceOverview() {
  const [active, setActive] = useState(0);
  const tablet = useSyncExternalStore(
    subscribeTablet,
    getTabletSnapshot,
    getServerTabletSnapshot,
  );

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = workspaceCards.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % workspaceCards.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index + last) % workspaceCards.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    document
      .getElementById(`workspace-${workspaceCards[next].id}-button`)
      ?.focus();
  }

  return (
    <section
      className={styles.section}
      id="workspace-overview"
      aria-labelledby="workspace-heading"
      data-source-node="66:380"
    >
      <div className={styles.surface}>
        <div className={styles.content}>
          <header className={styles.heading}>
            <h2 id="workspace-heading" data-mixed-heading>
              <MixedHeadingContent
                title="Move everyday"
                emphasis={<strong>work forward.</strong>}
              />
            </h2>
            <p data-home-copy className={styles.introduction}>
              Schedule meetings, <strong>prepare follow-ups</strong>, review
              decisions, and handle billing questions.
            </p>
            <a
              data-site-cta="primary"
              className={styles.cta}
              href={siteConfig.signupUrl}
            >
              Get started
            </a>
          </header>

          <div className={styles.cards}>
            {workspaceCards.map((card, index) => (
              <article
                key={card.id}
                className={styles.card}
                data-active={!tablet || active === index}
                data-source-node={card.source}
                onPointerEnter={(event) => {
                  if (
                    tablet &&
                    !event.currentTarget.parentElement?.querySelector(
                      ":focus-visible",
                    ) &&
                    (event.pointerType === "mouse" ||
                      event.pointerType === "pen")
                  ) {
                    setActive(index);
                  }
                }}
              >
                {index > 0 && (
                  <Image
                    className={styles.bridge}
                    src={`${assets}/bridge.svg`}
                    alt=""
                    width={24}
                    height={45}
                  />
                )}
                <div className={styles.cardSurface}>
                  <div className={styles.cardCopy}>
                    <h3>
                      {!tablet ? (
                        card.title
                      ) : (
                        <button
                          className={styles.cardButton}
                          id={`workspace-${card.id}-button`}
                          type="button"
                          aria-expanded={active === index}
                          aria-controls={`workspace-${card.id}-details`}
                          onClick={() => setActive(index)}
                          onFocus={() => setActive(index)}
                          onKeyDown={(event) => navigate(event, index)}
                        >
                          {card.title}
                        </button>
                      )}
                    </h3>
                    <div data-home-copy className={styles.description}>
                      <p
                        className={styles.summary}
                        aria-hidden={!tablet || active === index}
                      >
                        {card.summary}
                      </p>
                      <div
                        className={styles.details}
                        id={`workspace-${card.id}-details`}
                        aria-hidden={tablet && active !== index}
                      >
                        <p>{card.description}</p>
                        <ul>
                          {card.steps.map((step, stepIndex) => (
                            <li key={step}>
                              <span
                                className={styles.stepIcon}
                                aria-hidden="true"
                              >
                                {(() => {
                                  const StepIcon = stepIcons[stepIndex];
                                  return <StepIcon size={20} />;
                                })()}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {index === 0 ? (
                    <div
                      className={`${styles.artwork} ${styles.teachingPanel}`}
                    >
                      <div className={styles.activeArt} aria-hidden="true">
                        <Image
                          src={`${assets}/connect-background.png`}
                          alt=""
                          fill
                          sizes="(max-width: 1100px) 90vw, (max-width: 1328px) 40vw, 480px"
                        />
                      </div>
                      {(!tablet || active === index) && <TeachingDemo expanded />}
                    </div>
                  ) : (
                    <div className={styles.artwork} aria-hidden="true">
                      <Image
                        className={styles.inactiveArt}
                        src={`${assets}/${card.id}-inactive.png`}
                        alt=""
                        fill
                        sizes="(max-width: 1100px) 90vw, (max-width: 1328px) 40vw, 480px"
                      />
                      <div className={styles.activeArt}>
                        <Image
                          src={`${assets}/${card.id}-background.png`}
                          alt=""
                          fill
                          sizes="(max-width: 1100px) 90vw, (max-width: 1328px) 40vw, 480px"
                        />
                        <WorkspaceCardArtwork id={card.id} />
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
