"use client";

import { featureIconSrc } from "@/config/feature-identity";
import featureIcon from "@/components/feature-icon.module.css";

import { motion } from "motion/react";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronRight } from "@/components/chevron-right";
import Image from "next/image";
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
  Settings,
  Share,
  StarsA,
  Users,
} from "@/components/icons/mage";
import { MixedHeadingContent } from "@/components/section-heading";
import styles from "./baseline-features.module.css";
import storyboards from "./homepage-storyboards.json";
import { StoryboardArtwork } from "./storyboard-artwork";
import { useChannelsScroll } from "./use-channels-scroll";

const featureIcons = {
  channels: "bot",
  agents: "flow",
  workflows: "channels",
  insights: "computer",
} as const;
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
  heading: { title: ReactNode; emphasis: ReactNode };
  reverse?: boolean;
  items: typeof storyboards;
};
// Keep the existing section anchors and scroll interaction; the storyboard numbers
// are the source of truth for which file belongs to each accordion item.
export const baselineFeatures: Feature[] = [
  {
    id: "channels",
    node: "350:11199",
    label: "Bot mode",
    title: "Give your bot\na job to finish.",
    heading: {
      title: "Give your bot",
      emphasis: <strong>a job to finish.</strong>,
    },
    items: storyboards.slice(0, 6),
  },
  {
    id: "agents",
    node: "350:11344",
    label: "Flows",
    title: "Give every step\na clear owner.",
    heading: {
      title: "Give every step",
      emphasis: <strong>a clear owner.</strong>,
    },
    reverse: true,
    items: storyboards.slice(6, 10),
  },
  {
    id: "workflows",
    node: "350:11402",
    label: "Channels",
    title: "Work with agents\nin one conversation.",
    heading: {
      title: "Work with agents",
      emphasis: <strong>in one conversation.</strong>,
    },
    items: storyboards.slice(10, 14),
  },
  {
    id: "insights",
    node: "350:11485",
    label: "Computer",
    title: "Put your agent\nto work in the browser.",
    heading: {
      title: "Put your agent",
      emphasis: <strong>to work in the browser.</strong>,
    },
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
  const channelScroll = useChannelsScroll(channels, setSelected);
  const naturalScroll = channels && !channelScroll.enabled;
  useEffect(() => {
    if (!naturalScroll) return;
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
  }, [naturalScroll, channelScroll.rowsRef]);
  function select(index: number) {
    if (naturalScroll) {
      setSelected(index);
      channelScroll.rowsRef.current?.children[index]?.scrollIntoView?.({
        block: "center",
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
  const artwork = feature.items[selected];
  const visual = (
    <div
      ref={channelScroll.visualRef}
      data-home-reveal className={styles.visual}
      data-feature={featureIcons[feature.id]}
      id={`${feature.id}-baseline-visual`}
    >
      <StoryboardArtwork key={artwork.number} storyboard={artwork} />
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
          <header data-home-reveal className={styles.heading}>
            <div className={styles.sectionTag}>
              <Image className={featureIcon.face} src={featureIconSrc(featureIcons[feature.id])} width={24} height={24} alt="" />
              <span>{feature.label}</span>
            </div>
            <h2 id={`${feature.id}-baseline-heading`} data-mixed-heading>
              <MixedHeadingContent {...feature.heading} />
            </h2>
          </header>
          <div ref={channelScroll.windowRef} data-home-reveal className={styles.readingWindow}>
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
                        item.body ? selected === index : undefined
                      }
                      aria-pressed={
                        !item.body ? selected === index : undefined
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
                        {selected === index ? (
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
                    hidden={!item.body || selected !== index}
                    className={styles.description}
                  >
                    {item.body && <p data-home-copy>{item.body}</p>}
                    {item.body && (
                      <button
                        type="button"
                        className={styles.arrow}
                        aria-label={`Show ${item.title}`}
                        onFocus={() => {
                          if (channelScroll.enabled)
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
