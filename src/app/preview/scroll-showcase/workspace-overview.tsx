"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import featureIcon from "@/components/feature-icon.module.css";
import { featureIconSrc } from "@/config/feature-identity";
import { MixedHeadingContent } from "@/components/section-heading";

import {
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { siteConfig } from "@/config/site";
import styles from "./workspace-overview.module.css";

const assets = "/preview/homepage/workspace-overview";
const AgentAnimation = dynamic(() => import("./workspace-agent-animation"), {
  ssr: false,
});

const WorkspaceDemo = dynamic(
  () => import("./workspace-demos").then((module) => module.WorkspaceDemo),
  { ssr: false },
);
const RecordingPlayer = dynamic(
  () => import("./storyboard-rive").then((module) => module.StoryboardRive),
  { ssr: false },
);
const recordings = {
  connect: {
    className: styles.supplierRecording,
    poster: `${assets}/supplier-recording.webp`,
    description:
      "Supplier paperwork recording. The agent finds the company, downloads its annual return, and fills the supplier form.",
  },
  assist: {
    className: styles.contactsScene,
    src: `${assets}/contacts.riv`,
    artboard: "02 / Let AI manage your contacts / Final cut",
    animation: "02 / Contacts and activity filter / 7.6s loop",
    poster: `${assets}/contacts-rive-preview.webp`,
    description: "The Leaf agent filters contacts by last activity to find people who need a follow-up.",
  },
  learn: {
    className: styles.managementRecording,
    src: `${assets}/management-toggle.riv`,
    artboard: "Management toggle",
    animation: "Switch on",
    poster: `${assets}/weekly-report-delivered.webp`,
    description: "Acorn turns on Management, prepares the weekly report, and delivers it to the team. A checkmark confirms delivery and the switch turns off automatically.",
  },
  automate: {
    className: styles.salesRecording,
    src: `${assets}/sales-scheduling.riv`,
    artboard: "Sales scheduling email",
    animation: "Compose scheduling request",
    poster: `${assets}/sales-email-selected.webp`,
    description: "An email to luke@acme.com copies sales@innflow.ai to schedule a meeting next week. Gmail and Outlook stay highlighted after the cursor selects each one.",
  },
} as const;

function useVisibleMotion() {
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

  return { host, play };
}

function WorkspaceRecording({
  id,
  expanded,
}: {
  id: keyof typeof recordings;
  expanded: boolean;
}) {
  const scene = recordings[id];
  const { host, play } = useVisibleMotion();
  return (
    <div
      ref={host}
      className={scene.className}
      data-workspace-artwork={id}
      role="img"
      aria-label={scene.description}
    >
      <Image
        src={scene.poster}
        alt=""
        fill
        sizes="(max-width: 760px) 90vw, 400px"
      />
      {expanded && play && (
        "src" in scene
          ? <RecordingPlayer storyboard={scene} playing />
          : <WorkspaceDemo id="connect" />
      )}
    </div>
  );
}

function WorkspaceAgent({
  expanded,
  pointer,
  name,
  eyeY,
  face,
  rim,
}: {
  expanded: boolean;
  pointer: RefObject<{ x: number; y: number } | null>;
  name: string;
  eyeY: number;
  face: number;
  rim: number;
}) {
  const { host, play } = useVisibleMotion();
  const path = `/brand/agents/workspace/${name}`;
  return (
    <div
      ref={host}
      className={styles.agentOverlay}
      aria-hidden="true"
      data-workspace-agent={name}
    >
      <Image src={`${path}.webp`} width={240} height={204} alt="" unoptimized />
      {expanded && play && (
        <AgentAnimation
          pointer={pointer}
          src={`${path}.riv`}
          face={face}
          rim={rim}
          eyeY={eyeY}
        />
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
    title: "Admin",
    agent: { name: "head", eyeY: 364, face: 0xff83dfd2, rim: 0xff368fa1 },
    summary: "Gather filings and fill supplier forms.",
    description:
      "Give your agent a supplier name. It finds the company filing and uses it to fill out the onboarding form.",
    useCases: [
      {
        label: "Route purchase requests",
        icon: "flow",
        product: "Flows",
      },
      {
        label: "Download supplier invoices",
        icon: "computer",
        product: "Computer",
      },
      {
        label: "Request missing paperwork",
        icon: "bot",
        product: "Bot Mode",
      },
    ],
    source: "39:3785",
  },
  {
    id: "assist",
    title: "Ops",
    agent: { name: "leaf", eyeY: 345, face: 0xffffcf88, rim: 0xffbe813d },
    summary: "Find contacts due for a follow-up.",
    description:
      "Filter contacts by their last activity to see who you haven’t heard from in a while.",
    useCases: [
      { label: "Find inactive contacts", icon: "computer", product: "Computer" },
      { label: "Assign overdue follow-ups", icon: "flow", product: "Flows" },
      { label: "Flag incomplete records", icon: "bot", product: "Bot Mode" },
    ],
    source: "53:725",
  },
  {
    id: "automate",
    title: "Sales",
    agent: { name: "droplet", eyeY: 395, face: 0xffc9aff4, rim: 0xff8c6ab8 },
    summary: "Turn prospect lists into meetings.",
    description:
      "Build a prospect list from a trade show directory. Your agent drafts outreach and helps book a meeting when someone replies.",
    useCases: [
      { label: "Outbound sales agent", icon: "bot", product: "Bot Mode" },
      { label: "Build prospect lists", icon: "computer", product: "Computer" },
      { label: "Lead nurture and follow-up", icon: "channels", product: "Channels" },
    ],
    source: "53:842",
  },
  {
    id: "learn",
    title: "Mgmt",
    agent: { name: "acorn", eyeY: 377, face: 0xffaacdf3, rim: 0xff648ab9 },
    summary: "Deliver the weekly report.",
    description:
      "Acorn gathers the week’s project updates and sends a report to your team. Once it’s delivered, Acorn switches off.",
    useCases: [
      { label: "Draft weekly reports", icon: "bot", product: "Bot Mode" },
      { label: "Escalate overdue approvals", icon: "flow", product: "Flows" },
      { label: "Share project blockers", icon: "channels", product: "Channels" },
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

  const pointer = useRef<{ x: number; y: number } | null>(null);
  function rememberPointer(event: PointerEvent<HTMLDivElement>) {
    pointer.current =
      event.pointerType === "touch" ? null : { x: event.clientX, y: event.clientY };
  }

  function clearPointer() {
    pointer.current = null;
  }

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
          <header data-home-reveal className={styles.heading}>
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

          <div
            data-home-reveal className={styles.cards}
            onPointerOverCapture={rememberPointer}
            onPointerMoveCapture={rememberPointer}
            onPointerLeave={clearPointer}
            onPointerCancel={clearPointer}
          >
            {workspaceCards.map((card, index) => (
              <article
                key={card.id}
                className={styles.card}
                data-workspace-card={card.id}
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
                    <div className={styles.cardHeader}>
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
                      <WorkspaceAgent
                        {...card.agent}
                        expanded={mobile || active === index}
                        pointer={pointer}
                      />
                    </div>
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
                          {card.useCases.map(({ label, icon, product }) => (
                            <li key={label}>
                              <span className={styles.stepIcon}>
                                <Image
                                  className={featureIcon.face}
                                  src={featureIconSrc(icon)}
                                  width={20}
                                  height={20}
                                  alt={product}
                                />
                              </span>
                              {label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={styles.artwork}>
                    <Image
                      className={styles.inactiveArt}
                      src={`${assets}/${card.id}-inactive.png`}
                      alt=""
                      fill
                      sizes="(max-width: 1100px) 90vw, (max-width: 1328px) 40vw, 480px"
                    />
                    <div
                      className={
                        card.id === "connect"
                          ? `${styles.activeArt} ${styles.teachingPanel}`
                          : styles.activeArt
                      }
                      aria-hidden={!mobile && active !== index}
                    >
                      <Image
                        src={`${assets}/${card.id}-background.png`}
                        alt=""
                        fill
                        sizes="(max-width: 1100px) 90vw, (max-width: 1328px) 40vw, 480px"
                      />
                      <WorkspaceRecording
                        id={card.id}
                        expanded={mobile || active === index}
                      />
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
