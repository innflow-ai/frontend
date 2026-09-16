"use client";

import Image from "next/image";
import { type KeyboardEvent, useState } from "react";
import { siteConfig } from "@/config/site";
import styles from "./workspace-overview.module.css";

const assets = "/preview/homepage/workspace-overview";

// Copy and artwork are the supplied Figma baseline, not new product claims.
export const workspaceCards = [
  {
    id: "connect",
    title: "Connect",
    summary: "Bring every support channel together.",
    description:
      "A customer asks for help. Bring the conversation into one workspace, with the context your team needs to act.",
    steps: [
      "Connect your support channels",
      "Keep customer context together",
      "Respond from one workspace",
    ],
    source: "350:11101",
  },
  {
    id: "assist",
    title: "Assist",
    summary: "Ask anything. Get the full context.",
    description: "Ask anything. Get the full context.",
    steps: [
      "Find the context you need",
      "Draft a helpful response",
      "Review before sending",
    ],
    source: "385:9888",
  },
  {
    id: "automate",
    title: "Automate",
    summary: "Route requests and run your workflows.",
    description: "Route requests and run your workflows.",
    steps: [
      "Identify the request",
      "Run the right workflow",
      "Track the result",
    ],
    source: "385:9992",
  },
  {
    id: "learn",
    title: "Learn",
    summary: "Find patterns in every conversation.",
    description: "Find patterns in every conversation.",
    steps: [
      "Spot recurring questions",
      "Review conversation patterns",
      "Improve your knowledge base",
    ],
    source: "385:10096",
  },
] as const;

export function WorkspaceOverview() {
  const [active, setActive] = useState(0);

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
      data-source-node="350:11085"
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
            <p className={styles.eyebrow}>Support infrastructure</p>
            <h2 id="workspace-heading">
              One workspace.{" "}
              <br />
              Every conversation.
            </h2>
            <p className={styles.introduction}>
              Connect your channels. Orchestrate every conversation. Get smarter
              with each interaction, in one unified workspace built to scale
              with you.
            </p>
            <a className={styles.cta} href={siteConfig.signupUrl}>
              Start for free
            </a>
          </header>

          <div className={styles.cards}>
            {workspaceCards.map((card, index) => (
              <article
                key={card.id}
                className={styles.card}
                data-active={active === index}
                data-source-node={card.source}
                onPointerEnter={(event) => {
                  if (
                    event.pointerType === "mouse" ||
                    event.pointerType === "pen"
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
                    </h3>
                    <div className={styles.description}>
                      <p
                        className={styles.summary}
                        aria-hidden={active === index}
                      >
                        {card.summary}
                      </p>
                      <div
                        className={styles.details}
                        id={`workspace-${card.id}-details`}
                        aria-hidden={active !== index}
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
                      {card.id === "connect" ? (
                        <Image
                          src={`${assets}/connect-foreground.png`}
                          alt=""
                          fill
                          sizes="(max-width: 700px) 90vw, 384px"
                        />
                      ) : (
                        <div className={styles.draftDetail}>
                          {card.steps.map((step) => (
                            <p key={step}>{step}</p>
                          ))}
                        </div>
                      )}
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
