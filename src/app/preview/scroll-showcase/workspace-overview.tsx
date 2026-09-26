"use client";

import Image from "next/image";
import { type KeyboardEvent, useState, useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";
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
    title: "Connect",
    summary: "Connect your tools. Add your knowledge.",
    description:
      "Connect the tools you use and add relevant business information, giving your agents the context to get started.",
    steps: [
      "Connect your tools",
      "Add your business information",
      "Give your agents context",
    ],
    source: "53:1025",
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
        <Image
          className={styles.backdrop}
          src={`${assets}/section-background.png`}
          alt=""
          fill
          sizes="100vw"
        />
        <div className={styles.content}>
          <header className={styles.heading}>
            <h2 id="workspace-heading">
              Move everyday <br />
              work forward.
            </h2>
            <p className={styles.introduction}>
              Schedule meetings, prepare follow-ups, review decisions, and
              handle billing questions.
            </p>
            <a className={styles.cta} href={siteConfig.signupUrl}>
              Get started
            </a>
          </header>

          <div className={styles.cards}>
            {workspaceCards.map((card, index) => (
              <article
                key={card.id}
                className={styles.card}
                data-active={tablet || active === index}
                data-source-node={card.source}
                onPointerEnter={(event) => {
                  if (
                    !tablet &&
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
                      {tablet ? (
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
                    <div className={styles.description}>
                      <p
                        className={styles.summary}
                        aria-hidden={tablet || active === index}
                      >
                        {card.summary}
                      </p>
                      <div
                        className={styles.details}
                        id={`workspace-${card.id}-details`}
                        aria-hidden={!tablet && active !== index}
                      >
                        <p>{card.description}</p>
                        <ul>
                          {card.steps.map((step, stepIndex) => (
                            <li key={step}>
                              <span
                                className={styles.stepIcon}
                                aria-hidden="true"
                              >
                                <Image
                                  src={`${assets}/step-${stepIndex + 1}-background.svg`}
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                <Image
                                  className={styles.stepGlyph}
                                  src={`${assets}/step-${stepIndex + 1}-icon.svg`}
                                  alt=""
                                  width={14}
                                  height={14}
                                />
                              </span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={styles.artwork} aria-hidden="true">
                    <Image
                      className={styles.inactiveArt}
                      src={`${assets}/${card.id}-inactive.png`}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 90vw, 384px"
                    />
                    <div className={styles.activeArt}>
                      <Image
                        src={`${assets}/${card.id}-background.png`}
                        alt=""
                        fill
                        sizes="(max-width: 700px) 90vw, 384px"
                      />
                      <WorkspaceCardArtwork id={card.id} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
