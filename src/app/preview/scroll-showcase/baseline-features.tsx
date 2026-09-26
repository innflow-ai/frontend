"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { ChannelsDemos } from "./agent-demos/channels-demos";
import styles from "./baseline-features.module.css";
import { features as preparedFeatures } from "./homepage-content";
import { useChannelsScroll } from "./use-channels-scroll";

const root = "/preview/homepage/baseline-features";
const AgentStoryboard = dynamic(() =>
  import("./agent-demos/agent-ring").then((mod) => mod.AgentStoryboardPreview),
);
type Item = { title: string; icon: string; body?: string };
type Feature = {
  id: string;
  node: string;
  label: string;
  badge?: string;
  title: string;
  reverse?: boolean;
  glyph: string;
  items: Item[];
};

function preparedBody(featureId: string, title: string): string {
  const state = preparedFeatures
    .find((feature) => feature.id === featureId)
    ?.states.find((item) => item.title === title);
  if (!state)
    throw new Error(`Missing prepared feature copy: ${featureId}/${title}`);
  return state.body;
}

// Preview copy: one clear action per item, matched to the corresponding demo.
export const baselineFeatures: Feature[] = [
  {
    id: "channels",
    node: "350:11199",
    label: "Communication",
    title: "Keep every request\nand handoff together.",
    glyph: "imgVector.svg",
    items: [
      {
        title: "Orchestrate actions",
        icon: "imgTemplate.svg",
        body: "Give each request a clear owner. Route urgent issues to a teammate and delegate routine tasks to an agent, with the conversation attached.",
      },
      {
        title: "All your channels, connected",
        icon: "imgImage.png",
        body: "Bring messages from your connected channels into one workspace, with the customer context your team needs to respond.",
      },
      {
        title: "An assistant for your team",
        icon: "imgTextCaption.svg",
        body: "Find relevant information, draft a response and review the next step without piecing together separate conversations.",
      },
      {
        title: "AI agents, working together",
        icon: "imgWindmill.svg",
        body: "Choose an agent for the task and give it the context to get started. Keep your team involved in the decisions that matter.",
      },
      {
        title: "Workflows that take action",
        icon: "imgTemplate.svg",
        body: "Turn a request into a clear next step: assign an owner, notify the right team or trigger a connected workflow.",
      },
      {
        title: "Insights from every interaction",
        icon: "imgApps.svg",
        body: "Group related feedback, spot recurring questions and see which issues deserve your team's attention.",
      },
      {
        title: "Flexible, API-first building blocks",
        icon: "imgUsersGroup.svg",
        body: "Use APIs and connected tools to shape the workflow around your product, your data and the way your team works.",
      },
    ],
  },
  {
    id: "agents",
    node: "350:11344",
    label: "AI agents",
    badge: "AI",
    title: "Delegate tasks.\nStay involved.",
    reverse: true,
    glyph: "imgContainer.svg",
    items: [
      {
        title: "Bring your agents together",
        icon: "imgIcon1.svg",
        body: "Summarize incoming requests, draft follow-ups, and prepare the next step. Give each agent clear instructions and review its work before moving forward.",
      },
      {
        title: "Delegate a task. Review the result.",
        icon: "imgImage.png",
        body: preparedBody("agents", "Delegate a task. Review the result."),
      },
      {
        title: "Build your own agents",
        icon: "imgMessages.svg",
        body: preparedBody("agents", "Build your own agents"),
      },
    ],
  },
  {
    id: "workflows",
    node: "350:11402",
    label: "Automation",
    badge: "Platform",
    title: "Keep the next\nstep moving.",
    glyph: "imgVector.svg",
    items: [
      {
        title: "Connect external systems",
        icon: "imgList.svg",
        body: "Carry conversation details into your connected tools. Create a task, send a team update or call your own API.",
      },
      {
        title: "Route by context",
        icon: "imgContract.svg",
        body: preparedBody("workflows", "Route by context"),
      },
      {
        title: "Auto-triage requests",
        icon: "imgApps.svg",
        body: preparedBody("workflows", "Auto-triage requests"),
      },
      {
        title: "Keep thread summaries current",
        icon: "imgSparkles.svg",
        body: preparedBody("workflows", "Keep thread summaries current"),
      },
    ],
  },
  {
    id: "insights",
    node: "350:11485",
    label: "Insights",
    badge: "Platform",
    title: "See what needs\nyour attention.",
    reverse: true,
    glyph: "imgVector.svg",
    items: [
      {
        title: "Detect trends",
        icon: "imgImage.png",
        body: "See which questions and issues keep coming up. Review related conversations together to understand the pattern.",
      },
      {
        title: "Catch up instantly",
        icon: "imgCube.svg",
        body: preparedBody("insights", "Catch up instantly"),
      },
      {
        title: "Daily summaries",
        icon: "imgReceipt.svg",
        body: preparedBody("insights", "Daily summaries"),
      },
      {
        title: "Product insights",
        icon: "imgLink.svg",
        body: preparedBody("insights", "Product insights"),
      },
    ],
  },
];

function BaselineFeature({ feature }: { feature: Feature }) {
  const [selected, setSelected] = useState(0);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 800px)");
    const sync = () => setMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const channels = feature.id === "channels";
  const channelScroll = useChannelsScroll(channels, setSelected);
  const select = channels ? channelScroll.select : setSelected;
  const asset = (name: string) => `${root}/${feature.id}-${name}`;
  const agentDetail = feature.id === "agents" && selected > 0;
  const artwork =
    channels && selected > 0
      ? `/preview/homepage/channels-${selected + 1}.png`
      : selected > 0 && !agentDetail
        ? `${root}/${feature.id}-${selected}.png`
        : asset("imgCanvas.png");
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = feature.items.length - 1;
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? last
          : event.key === "ArrowDown" || event.key === "ArrowRight"
            ? (index + 1) % (last + 1)
            : event.key === "ArrowUp" || event.key === "ArrowLeft"
              ? (index + last) % (last + 1)
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    buttons.current[next]?.focus({ preventScroll: channelScroll.enabled });
  }
  const visual = (
    <div
      ref={channelScroll.visualRef}
      className={styles.visual}
      id={`${feature.id}-baseline-visual`}
    >
      <div className={styles.imageFrame} data-pending={false}>
        {channels ? (
          <ChannelsDemos selected={selected} />
        ) : feature.id === "agents" && selected === 0 ? (
          <AgentStoryboard showControls={false} />
        ) : agentDetail ? (
          <div className={styles.agentDetail}>
            <span className={styles.agentDetailLabel}>
              AI agents / Example workflow
            </span>
            <Image
              src="/brand/innflow-wordmark.svg"
              alt="Innflow"
              width={112}
              height={34}
            />
            <h3>{feature.items[selected].title}</h3>
            <ol>
              {(selected === 1
                ? [
                    "Describe the task",
                    "Gather the relevant context",
                    "Prepare the result",
                    "Your team reviews the next step",
                  ]
                : [
                    "Define your agent's purpose",
                    "Add instructions and knowledge",
                    "Choose tools and review points",
                    "Try it with an example request",
                  ]
              ).map((step, i) => (
                <li key={step}>
                  <span>0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <p>Your instructions. Your team in control.</p>
          </div>
        ) : (
          <Image
            key={artwork}
            src={artwork}
            alt={`${feature.label} — reference product illustration`}
            fill
            sizes="(max-width: 800px) calc(100vw - 48px), (max-width: 1280px) 46vw, 580px"
          />
        )}
      </div>
    </div>
  );
  return (
    <section
      id={feature.id}
      className={styles.section}
      data-source-node={feature.node}
      data-channels={channels}
      data-channels-scroll={channelScroll.enabled}
      aria-labelledby={`${feature.id}-baseline-heading`}
    >
      <div
        ref={channelScroll.gridRef}
        className={styles.grid}
        data-reverse={feature.reverse}
      >
        <div className={styles.copy}>
          <header className={styles.heading}>
            <h2 id={`${feature.id}-baseline-heading`}>{feature.title}</h2>
          </header>
          <div ref={channelScroll.windowRef} className={styles.readingWindow}>
            <motion.div
              ref={channelScroll.rowsRef}
              className={styles.rows}
              style={channelScroll.enabled ? { y: channelScroll.y } : undefined}
            >
              {feature.items.map((item, index) => (
                <div
                  key={item.title}
                  className={styles.row}
                  data-active={selected === index}
                >
                  <h3>
                    <button
                      type="button"
                      ref={(node) => {
                        buttons.current[index] = node;
                      }}
                      id={`${feature.id}-baseline-trigger-${index}`}
                      aria-expanded={
                        (!channels || mobile) && item.body
                          ? selected === index
                          : undefined
                      }
                      aria-pressed={
                        (channels && !mobile) || !item.body
                          ? selected === index
                          : undefined
                      }
                      aria-controls={
                        item.body
                          ? `${feature.id}-baseline-panel-${index}`
                          : `${feature.id}-baseline-visual`
                      }
                      onClick={() => select(index)}
                      onFocus={() => {
                        if (channelScroll.enabled) select(index);
                      }}
                      onKeyDown={(event) => navigate(event, index)}
                    >
                      <Image
                        src={asset(item.icon)}
                        alt=""
                        width={24}
                        height={24}
                      />
                      <span>{item.title}</span>
                      <span
                        className={styles.mobileIndicator}
                        aria-hidden="true"
                      >
                        {selected === index ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <section
                    id={`${feature.id}-baseline-panel-${index}`}
                    aria-labelledby={`${feature.id}-baseline-trigger-${index}`}
                    hidden={
                      !item.body ||
                      ((!channels || mobile) && selected !== index)
                    }
                    className={styles.description}
                  >
                    {item.body && <p>{item.body}</p>}
                    {item.body && (
                      <button
                        type="button"
                        className={styles.arrow}
                        aria-label={`Show ${item.title}`}
                        onFocus={() => {
                          if (channelScroll.enabled) select(index);
                        }}
                        onClick={() => {
                          select(index);
                          buttons.current[index]?.focus({
                            preventScroll: channelScroll.enabled,
                          });
                        }}
                      >
                        <Image
                          src={asset("imgArrowUpRight.svg")}
                          alt=""
                          width={16}
                          height={16}
                        />
                      </button>
                    )}
                  </section>
                  {mobile && selected === index && visual}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        {!mobile && visual}
      </div>
    </section>
  );
}

export function BaselineFeatures() {
  return (
    <div className={styles.features}>
      {baselineFeatures.map((feature) => (
        <BaselineFeature key={feature.id} feature={feature} />
      ))}
    </div>
  );
}
