"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { siteConfig } from "@/config/site";
import type { Testimonial } from "@/lib/testimonials";
import styles from "./homepage.module.css";
import {
  agentSteps,
  assetRoot,
  type FeatureSection,
  type FeatureState,
  features,
  infrastructureCards,
  integrationIcons,
  integrationNames,
} from "./homepage-content";

function useVisible() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function tabKey(
  event: KeyboardEvent<HTMLButtonElement>,
  index: number,
  count: number,
  select: (index: number) => void,
) {
  let next = index;
  if (event.key === "ArrowDown" || event.key === "ArrowRight")
    next = (index + 1) % count;
  else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
    next = (index + count - 1) % count;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = count - 1;
  else return;
  event.preventDefault();
  select(next);
  const buttons =
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
  buttons?.[next]?.focus();
}

function StateArtwork({
  state,
  id,
  channels,
}: {
  state: FeatureState;
  id: string;
  channels: boolean;
}) {
  const [after, setAfter] = useState(true);
  const content = state.pair && (after ? state.pair.after : state.pair.before);
  return (
    <div className={styles.artwork} data-channels={channels}>
      <div className={styles.artImage} data-paired={Boolean(content)}>
        <Image
          src={`${assetRoot}/${state.artwork}.png`}
          alt={`${state.title} — illustrative interface`}
          fill
          sizes="(max-width: 800px) 90vw, 580px"
        />
      </div>
      {content && (
        <div className={styles.stateCard} data-source-node={state.pair?.source}>
          <div className={styles.cardTop}>
            <Image
              src={`${assetRoot}/innflow-mark.png`}
              alt=""
              width={32}
              height={32}
            />
            <span>Illustrative example</span>
            <fieldset
              className={styles.segmented}
              aria-label={`${state.title} comparison`}
            >
              <button
                type="button"
                aria-pressed={!after}
                onClick={() => setAfter(false)}
              >
                Before
              </button>
              <button
                type="button"
                aria-pressed={after}
                onClick={() => setAfter(true)}
              >
                After
              </button>
            </fieldset>
          </div>
          <div
            key={String(after)}
            className={styles.cardContent}
            id={`${id}-comparison`}
            aria-live="polite"
          >
            <h3>{content[0]}</h3>
            <p>{content[1]}</p>
            <ul>
              {content.slice(2).map((line) => (
                <li key={line}>
                  <span aria-hidden="true">{after ? "✓" : "·"}</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function AgentSequence() {
  const [step, setStep] = useState(0);
  return (
    <div className={styles.agentSequence}>
      <div
        className={styles.stepTabs}
        role="tablist"
        aria-label="Agent assistance sequence"
      >
        {agentSteps.map((item, index) => (
          <button
            type="button"
            role="tab"
            key={item.source}
            id={`agent-step-${index}`}
            aria-selected={step === index}
            aria-controls="agent-step-panel"
            tabIndex={step === index ? 0 : -1}
            onClick={() => setStep(index)}
            onKeyDown={(event) =>
              tabKey(event, index, agentSteps.length, setStep)
            }
          >
            <span>{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div
        id="agent-step-panel"
        role="tabpanel"
        aria-labelledby={`agent-step-${step}`}
        className={styles.stepPanel}
        data-source-node={agentSteps[step].source}
      >
        <span className={styles.statusDot} />
        <div>
          <strong>{agentSteps[step].title}</strong>
          <p>{agentSteps[step].detail}</p>
        </div>
        <small>Illustrative sequence</small>
      </div>
    </div>
  );
}

export function FeatureStory({ section }: { section: FeatureSection }) {
  const [active, setActive] = useState(0);
  const { ref, visible } = useVisible();
  return (
    <section
      ref={ref}
      id={section.id}
      className={styles.feature}
      data-visible={visible}
      data-image-first={section.imageFirst}
      data-source-node={section.source}
      style={{ "--feature-accent": section.accent } as CSSProperties}
      aria-labelledby={`${section.id}-heading`}
    >
      <div className={styles.featureGrid}>
        <div className={styles.featureCopy}>
          <p className={styles.eyebrow}>
            <span style={{ background: section.accent }} />
            {section.label}
          </p>
          <h2 id={`${section.id}-heading`}>{section.title}</h2>
          <div
            className={styles.featureTabs}
            role="tablist"
            aria-label={`${section.label} features`}
            aria-orientation="vertical"
          >
            {section.states.map((state, index) => (
              <button
                type="button"
                key={state.source}
                id={`${section.id}-tab-${index}`}
                role="tab"
                aria-selected={active === index}
                aria-controls={`${section.id}-panel-${index}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) =>
                  tabKey(event, index, section.states.length, setActive)
                }
              >
                <span className={styles.featureTitle}>
                  <span className={styles.featureNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {state.title}
                  <span className={styles.rowArrow} aria-hidden="true">
                    {active === index ? "−" : "+"}
                  </span>
                </span>
                {(active === index || section.id === "channels") && (
                  <span className={styles.featureDescription}>
                    {state.body}
                  </span>
                )}
              </button>
            ))}
          </div>
          <Link className={styles.textLink} href={section.href}>
            Explore {section.label.toLowerCase()}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.featureVisual}>
          {section.states.map((state, index) => (
            <div
              key={state.source}
              id={`${section.id}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${section.id}-tab-${index}`}
              hidden={active !== index}
            >
              {active === index && (
                <StateArtwork
                  key={state.source}
                  state={state}
                  id={section.id}
                  channels={section.id === "channels"}
                />
              )}
            </div>
          ))}
          <p className={styles.artCaption}>
            Illustrative product preview{" "}
            <span>
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(section.states.length).padStart(2, "0")}
            </span>
          </p>
        </div>
      </div>
      {section.id === "agents" && <AgentSequence />}
    </section>
  );
}

export function CustomerStories({
  testimonials,
  heading,
}: {
  testimonials: Testimonial[];
  heading: string;
}) {
  const [active, setActive] = useState(0);
  const { ref, visible } = useVisible();
  const selected = testimonials[active];
  return (
    <section
      ref={ref}
      id="customer-stories"
      className={styles.stories}
      data-visible={visible}
      data-source-node="350:11559"
      aria-labelledby="customer-heading"
    >
      <div className={styles.centerHeading}>
        <p className={styles.eyebrow}>Customer stories</p>
        <h2 id="customer-heading">{heading}</h2>
      </div>
      {selected ? (
        <>
          <div className={styles.quoteCard}>
            <div className={styles.quotePhoto}>
              <Image
                src={selected.portrait.url}
                alt={selected.portrait.alt}
                fill
                sizes="(max-width: 800px) 90vw, 400px"
              />
            </div>
            <div>
              <blockquote>“{selected.quote}”</blockquote>
              <strong>{selected.name}</strong>
              {selected.role && <p>{selected.role}</p>}
            </div>
          </div>
          {testimonials.length > 1 && (
            <fieldset
              className={styles.storyChoices}
              aria-label="Choose a customer story"
            >
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  <Image src={item.avatarUrl} alt="" width={48} height={48} />
                  {item.name}
                </button>
              ))}
            </fieldset>
          )}
        </>
      ) : (
        <div className={styles.placeholderStory}>
          <div className={styles.placeholderPortrait} aria-hidden="true">
            <Image
              src={`${assetRoot}/innflow-mark.png`}
              alt=""
              width={100}
              height={100}
            />
            <span>INNFLOW</span>
          </div>
          <div>
            <span className={styles.placeholderLabel}>
              Preview · Story placement
            </span>
            <h3>A place for your customers’ stories.</h3>
            <p>
              This layout is ready for an approved Innflow story. Customer
              names, portraits and quotes will come from the homepage’s CMS
              selection.
            </p>
            <span className={styles.placeholderLine} />
            <span className={styles.placeholderLine} />
          </div>
        </div>
      )}
    </section>
  );
}

const focusStates = ["All connections", "Slack", "OpenAI"] as const;
export function ConnectedInfrastructure() {
  const [focus, setFocus] = useState(0);
  return (
    <section
      id="connected-infrastructure"
      className={styles.infrastructure}
      aria-labelledby="infrastructure-heading"
      data-source-node={["397:9936", "397:10126", "397:10316"][focus]}
    >
      <div className={styles.centerHeading}>
        <p className={styles.eyebrow}>Connected infrastructure</p>
        <h2 id="infrastructure-heading">
          Build on the tools
          <br />
          you already use.
        </h2>
        <p>Connect your channels, internal data and external systems.</p>
        <Link className={styles.textLink} href="/integrations">
          View all integrations <span aria-hidden="true">→</span>
        </Link>
      </div>
      <fieldset className={styles.focusControls} aria-label="Integration focus">
        {focusStates.map((label, i) => (
          <button
            type="button"
            key={label}
            aria-pressed={focus === i}
            onClick={() => setFocus(i)}
          >
            {label}
          </button>
        ))}
      </fieldset>
      <div className={styles.integrationGrid}>
        {integrationNames.map((name) => (
          <div
            key={name}
            className={styles.integrationTile}
            data-focused={focus > 0 && name === focusStates[focus]}
            data-muted={focus > 0 && name !== focusStates[focus]}
          >
            <Image
              src={integrationIcons[name]}
              alt={name}
              width={56}
              height={56}
            />
            <span>{name}</span>
          </div>
        ))}
      </div>
      <p className={styles.referenceNote}>
        Connection examples from the design. Explore the directory for
        availability.
      </p>
      <div className={styles.infrastructureCards}>
        {infrastructureCards.map((card, index) => (
          <Link
            key={card.source}
            href={card.href}
            data-source-node={card.source}
          >
            <div className={styles.infrastructureArt}>
              <Image
                src={`${assetRoot}/infrastructure-${index + 1}.png`}
                alt=""
                fill
                sizes="(max-width: 800px) 80vw, 330px"
              />
            </div>
            <p className={styles.cardCategory}>
              {card.label}
              <span aria-hidden="true">↗</span>
            </p>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

const closingScenes = [
  {
    label: "Request resolved",
    image: "closing-imgImage",
    background: "closing-imgContainer",
    from: "Request",
    to: "Resolved",
    source: "397:10568",
  },
  {
    label: "Track midpoint",
    image: "closing-imgImage2",
    background: "closing-imgContainer1",
    from: "Context",
    to: "Connected",
    source: "397:10735",
  },
  {
    label: "Next highlight",
    image: "closing-imgImage3",
    background: "closing-imgContainer2",
    from: "Next step",
    to: "Prepared",
    source: "397:10902",
  },
];
export function PreviewClosing() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(true);
  const { ref, visible } = useVisible();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!playing || reduced || !visible) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % closingScenes.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [playing, reduced, visible]);
  return (
    <section
      ref={ref}
      id="preview-closing"
      className={styles.closing}
      data-visible={visible}
      aria-labelledby="closing-heading"
    >
      <div className={styles.centerHeading}>
        <p className={styles.eyebrow}>Get started</p>
        <h2 id="closing-heading">
          Start fast.
          <br />
          Scale fearlessly.
        </h2>
        <p>
          Connect your channels, bring in your context, and build the workflows
          your team needs.
        </p>
        <a className={styles.primaryButton} href={siteConfig.demoUrl}>
          Book an Innflow demo <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={styles.closingViewport}>
        <div
          className={styles.closingTrack}
          style={{ "--closing-index": active } as CSSProperties}
        >
          {closingScenes.map((scene, i) => (
            <div
              key={scene.source}
              className={styles.closingScene}
              data-active={active === i}
              data-source-node={scene.source}
              aria-hidden={active !== i}
            >
              <Image
                className={styles.sceneBackground}
                src={`${assetRoot}/${scene.background}.png`}
                alt=""
                fill
                sizes="(max-width: 800px) 85vw, 656px"
              />
              <Image
                className={styles.scenePortrait}
                src={`${assetRoot}/${scene.image}.png`}
                alt=""
                fill
                sizes="(max-width: 800px) 85vw, 656px"
              />
              <div className={styles.sceneBadge}>
                <Image
                  src={`${assetRoot}/innflow-mark.png`}
                  alt=""
                  width={42}
                  height={42}
                />
                <span>{scene.from}</span>
                <span aria-hidden="true">→</span>
                <strong>{scene.to}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
      <fieldset
        className={styles.closingControls}
        aria-label="Closing highlights"
      >
        {closingScenes.map((scene, i) => (
          <button
            type="button"
            key={scene.source}
            aria-label={scene.label}
            aria-pressed={active === i}
            onClick={() => {
              setActive(i);
              setPlaying(false);
            }}
          >
            <span />
          </button>
        ))}
        {!reduced && (
          <button
            className={styles.pause}
            type="button"
            aria-label={playing ? "Pause highlights" : "Play highlights"}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? "Pause" : "Play"}
          </button>
        )}
      </fieldset>
    </section>
  );
}

export function HomepageFeatures() {
  return (
    <>
      {features.map((section) => (
        <FeatureStory key={section.id} section={section} />
      ))}
    </>
  );
}
