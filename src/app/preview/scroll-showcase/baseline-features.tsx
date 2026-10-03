"use client";

import { motion } from "motion/react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { ChevronRight } from "@/components/chevron-right";
import {
  Chart,
  ChartUp,
  CheckCircle,
  Inbox,
  Link,
  Minus as MageMinus,
  Plus as MagePlus,
  MessageConversation,
  NoteText,
  Robot,
  Settings,
  Share,
  StarsA,
  Users,
} from "@/components/icons/mage";
import styles from "./baseline-features.module.css";
import storyboards from "./homepage-storyboards.json";
import { StoryboardArtwork } from "./storyboard-artwork";
import { useChannelsScroll } from "./use-channels-scroll";

const featureIcons = {
  channels: Robot,
  agents: Share,
  workflows: StarsA,
  insights: Chart,
};
const itemIcons = {
  channels: [MessageConversation, Users, Settings, Link, Inbox, ChartUp],
  agents: [Share, StarsA, Inbox, CheckCircle],
  workflows: [StarsA, Users, CheckCircle, NoteText],
  insights: [ChartUp, MessageConversation, NoteText, Chart],
};
type Feature = {
  id: keyof typeof featureIcons;
  node: string;
  label: string;
  title: string;
  reverse?: boolean;
  items: typeof storyboards;
};
// Keep the existing section anchors and scroll interaction; the storyboard numbers
// are the source of truth for which file belongs to each accordion item.
export const baselineFeatures: Feature[] = [
  {
    id: "channels",
    node: "350:11199",
    label: "AI agent",
    title: "Get more done\nwith AI agents.",
    items: storyboards.slice(0, 6),
  },
  {
    id: "agents",
    node: "350:11344",
    label: "Workflows",
    title: "Move work forward\nwith less effort.",
    reverse: true,
    items: storyboards.slice(6, 10),
  },
  {
    id: "workflows",
    node: "350:11402",
    label: "Assistant",
    title: "Spend less time\nmanaging requests.",
    items: storyboards.slice(10, 14),
  },
  {
    id: "insights",
    node: "350:11485",
    label: "Insights",
    title: "Know where\nto focus next.",
    reverse: true,
    items: storyboards.slice(14, 18),
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
  const mobileStory = channels && mobile;
  const channelScroll = useChannelsScroll(channels, setSelected);
  useEffect(() => {
    if (!mobileStory) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rows = channelScroll.rowsRef.current?.children;
      if (!rows?.length) return;
      const focus = window.innerHeight * 0.5;
      let nearest = 0;
      let distance = Infinity;
      Array.from(rows).forEach((row, index) => {
        const rect = row.getBoundingClientRect();
        const next = Math.abs(rect.top + rect.height / 2 - focus);
        if (next < distance) {
          nearest = index;
          distance = next;
        }
      });
      setSelected(nearest);
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    const observer = new ResizeObserver(requestUpdate);
    if (channelScroll.rowsRef.current)
      observer.observe(channelScroll.rowsRef.current);
    requestUpdate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [mobileStory, channelScroll.rowsRef]);
  function select(index: number) {
    if (mobileStory) {
      setSelected(index);
      channelScroll.rowsRef.current?.children[index]?.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
    } else if (channels) channelScroll.select(index);
    else setSelected(index);
  }
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
  const FeatureIcon = featureIcons[feature.id as keyof typeof featureIcons];
  const visual = (
    <div
      ref={channelScroll.visualRef}
      className={`${styles.visual} ${feature.id === "agents" ? styles.workflowVisual : ""}`}
      id={`${feature.id}-baseline-visual`}
    >
      <StoryboardArtwork
        key={feature.items[selected].number}
        storyboard={feature.items[selected]}
      />
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
            <div className={styles.sectionTag}>
              <FeatureIcon size={24} />
              <span>{feature.label}</span>
            </div>
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
                        if (channelScroll.enabled || mobileStory) select(index);
                      }}
                      onKeyDown={(event) => navigate(event, index)}
                    >
                      {(() => {
                        const ItemIcon =
                          itemIcons[feature.id as keyof typeof itemIcons][
                            index
                          ];
                        return <ItemIcon size={24} />;
                      })()}
                      <span>{item.title}</span>
                      <span
                        className={styles.mobileIndicator}
                        aria-hidden="true"
                      >
                        {mobileStory || selected === index ? (
                          <MageMinus size="1em" />
                        ) : (
                          <MagePlus size="1em" />
                        )}
                      </span>
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
                          if (channelScroll.enabled || mobileStory)
                            select(index);
                        }}
                        onClick={() => {
                          select(index);
                          buttons.current[index]?.focus({
                            preventScroll: channelScroll.enabled,
                          });
                        }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </section>
                  {mobileStory ? (
                    <div
                      className={styles.visual}
                      id={`${feature.id}-baseline-visual-${index}`}
                    >
                      <StoryboardArtwork storyboard={item} />
                    </div>
                  ) : (
                    mobile && selected === index && visual
                  )}
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
