"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { type KeyboardEvent, useRef, useState } from "react";
import { ChannelsDemos } from "./agent-demos/channels-demos";
import styles from "./baseline-features.module.css";
import { features as preparedFeatures } from "./homepage-content";
import { useChannelsScroll } from "./use-channels-scroll";

const root = "/preview/homepage/baseline-features";
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

export const baselineFeatures: Feature[] = [
  {
    id: "channels",
    node: "350:11199",
    label: "Channels",
    title: "10x with agent",
    glyph: "imgVector.svg",
    items: [
      {
        title: "Orchestrate actions",
        icon: "imgTemplate.svg",
        body: "Give every handoff a clear owner. Route Priority IS Urgent to a teammate and everything else to an agent.",
      },
      {
        title: "All your channels, connected",
        icon: "imgImage.png",
        body: "Connect and scale Slack, Microsoft Teams, Discord, email, chat, your portal and more.",
      },
      {
        title: "An assistant for your team",
        icon: "imgTextCaption.svg",
        body: "Research, triage and resolve requests with an AI assistant that works across your systems.",
      },
      {
        title: "AI agents, working together",
        icon: "imgWindmill.svg",
        body: "Run multiple AI agents alongside human teammates. Keep people in control of complex conversations.",
      },
      {
        title: "Workflows that take action",
        icon: "imgTemplate.svg",
        body: "Route requests, trigger investigations, notify teams and take action in your own systems.",
      },
      {
        title: "Insights from every interaction",
        icon: "imgApps.svg",
        body: "Spot recurring issues, understand customer themes and turn support into product insight.",
      },
      {
        title: "Flexible, API-first building blocks",
        icon: "imgUsersGroup.svg",
        body: "Extend, customize or embed your support infrastructure into your product and existing tools.",
      },
    ],
  },
  {
    id: "agents",
    node: "350:11344",
    label: "Agents",
    badge: "AI",
    title: "Orchestrate your AI agents",
    reverse: true,
    glyph: "imgContainer.svg",
    items: [
      {
        title: "Orchestrate actions",
        icon: "imgIcon1.svg",
        body: "Run multiple AI agents alongside human teammates. Coordinate their work while keeping people in control.",
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
    label: "Workflows",
    badge: "Platform",
    title: "Automate the work\nbetween conversations",
    glyph: "imgVector.svg",
    items: [
      {
        title: "Connect external systems",
        icon: "imgList.svg",
        body: "Create a Linear issue, notify engineers or call your own API. Put your support context to work.",
      },
      {
        title: "Build with AI",
        icon: "imgContract.svg",
        body: preparedBody("workflows", "Build with AI"),
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
    title: "Learn from your customers",
    reverse: true,
    glyph: "imgVector.svg",
    items: [
      {
        title: "Detect trends",
        icon: "imgImage.png",
        body: "Spot recurring issues, trends and opportunities across every conversation, without manual analysis.",
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
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const channels = feature.id === "channels";
  const channelScroll = useChannelsScroll(channels, setSelected);
  const select = channels ? channelScroll.select : setSelected;
  const asset = (name: string) => `${root}/${feature.id}-${name}`;
  const pending = feature.id === "agents" && selected > 0;
  const artwork =
    channels && selected > 0
      ? `/preview/homepage/channels-${selected + 1}.png`
      : selected > 0 && !pending
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
                        !channels && item.body ? selected === index : undefined
                      }
                      aria-pressed={
                        channels || !item.body ? selected === index : undefined
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
                    </button>
                  </h3>
                  <section
                    id={`${feature.id}-baseline-panel-${index}`}
                    aria-labelledby={`${feature.id}-baseline-trigger-${index}`}
                    hidden={!item.body || (!channels && selected !== index)}
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
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div
          ref={channelScroll.visualRef}
          className={styles.visual}
          id={`${feature.id}-baseline-visual`}
        >
          <div className={styles.imageFrame} data-pending={pending}>
            {channels ? (
              <ChannelsDemos selected={selected} />
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
          {pending && (
            <div className={styles.pending} role="status">
              <span>Reference pending</span>
              <h3>{feature.items[selected].title}</h3>
              <p>
                Expanded artwork for this state is not supplied in the baseline
                yet.
              </p>
            </div>
          )}
        </div>
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
