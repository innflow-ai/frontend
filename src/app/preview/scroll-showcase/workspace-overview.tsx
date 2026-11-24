"use client";

import dynamic from "next/dynamic";
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
import { SupplierRecording } from "./supplier-recording";
import { WorkspaceCardArtwork } from "./workspace-card-artwork";
import styles from "./workspace-overview.module.css";

const assets = "/preview/homepage/workspace-overview";
const AgentAnimation = dynamic(() => import("./workspace-agent-animation"), {
  ssr: false,
});

function WorkspaceAgent({
  name,
  eyeY,
  face,
  rim,
}: {
  name: string;
  eyeY: number;
  face: number;
  rim: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!host.current || typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => setPlay(inView && !motion.matches && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(host.current);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      setPlay(false);
    };
  }, []);

  const path = `/brand/agents/workspace/${name}`;
  return (
    <div
      ref={host}
      className={styles.agentOverlay}
      aria-hidden="true"
      data-workspace-agent={name}
    >
      <Image src={`${path}.webp`} width={240} height={204} alt="" unoptimized />
      {play && (
        <AgentAnimation src={`${path}.riv`} face={face} rim={rim} eyeY={eyeY} />
      )}
    </div>
  );
}

const mobileQuery = "(max-width: 760px)";
function subscribeMobile(onChange: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getMobileSnapshot() {
  return window.matchMedia(mobileQuery).matches;
}
const getServerMobileSnapshot = () => false;

// Innflow copy paired with the supplied Figma reference artwork.
export const workspaceCards = [
  {
    id: "connect",
    title: "Handle supplier paperwork",
    agent: { name: "head", eyeY: 364, face: 0xff83dfd2, rim: 0xff368fa1 },
    summary: "Gather filings and fill supplier forms.",
    description:
      "Give your agent a supplier name. It finds the company filing and uses it to fill out the onboarding form.",
    steps: [
      "Look up the supplier",
      "Download the annual return",
      "Fill the supplier form",
    ],
    source: "39:3785",
  },
  {
    id: "assist",
    title: "Train",
    agent: { name: "leaf", eyeY: 345, face: 0xffffcf88, rim: 0xffbe813d },
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
    agent: { name: "droplet", eyeY: 395, face: 0xffc9aff4, rim: 0xff8c6ab8 },
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
    agent: { name: "acorn", eyeY: 377, face: 0xffaacdf3, rim: 0xff648ab9 },
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
  const mobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot,
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
                data-active={mobile || active === index}
                data-source-node={card.source}
                onPointerEnter={(event) => {
                  if (
                    !mobile &&
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
                      {mobile ? (
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
                        aria-hidden={mobile || active === index}
                      >
                        {card.summary}
                      </p>
                      <div
                        className={styles.details}
                        id={`workspace-${card.id}-details`}
                        aria-hidden={!mobile && active !== index}
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
                  <div
                    className={
                      index === 0
                        ? `${styles.artwork} ${styles.teachingPanel}`
                        : styles.artwork
                    }
                  >
                    {index === 0 ? (
                      <>
                        <Image
                          src={`${assets}/connect-background.png`}
                          alt=""
                          fill
                          sizes="(max-width: 760px) 90vw, 40vw"
                        />
                        <SupplierRecording
                          expanded={mobile || active === index}
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          className={styles.inactiveArt}
                          src={`${assets}/${card.id}-inactive.png`}
                          alt=""
                          fill
                          sizes="(max-width: 1100px) 90vw, (max-width: 1328px) 40vw, 480px"
                        />
                        <div className={styles.activeArt} aria-hidden="true">
                          <Image
                            src={`${assets}/${card.id}-background.png`}
                            alt=""
                            fill
                            sizes="(max-width: 1100px) 90vw, (max-width: 1328px) 40vw, 480px"
                          />
                          <WorkspaceCardArtwork id={card.id} />
                        </div>
                      </>
                    )}
                    <WorkspaceAgent {...card.agent} />
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
