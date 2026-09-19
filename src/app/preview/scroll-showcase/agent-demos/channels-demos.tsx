"use client";

import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./channels-demos.module.css";

const loading = () => <span className={styles.loading}>Loading demo…</span>;
const ConnectedChannels = dynamic(
  () => import("./connected-channels").then((mod) => mod.ConnectedChannelsDemo),
  { loading },
);
const TeamAssistant = dynamic(
  () => import("./team-assistant").then((mod) => mod.TeamAssistantDemo),
  { loading },
);
const AgentsHero = dynamic(
  () => import("./agent-ring").then((mod) => mod.AgentRingDemo),
  { loading },
);
const OrchestrateActions = dynamic(
  () =>
    import("./orchestrate-actions").then((mod) => mod.OrchestrateActionsDemo),
  { loading },
);
const Insights = dynamic(
  () => import("./insights").then((mod) => mod.InsightsDemo),
  { loading },
);
const ApiBuildingBlocks = dynamic(
  () =>
    import("./api-building-blocks").then((mod) => mod.ApiBuildingBlocksDemo),
  { loading },
);

export const channelDemoDefinitions = [
  { title: "Orchestrate actions", Demo: OrchestrateActions },
  { title: "All your channels, connected", Demo: ConnectedChannels },
  { title: "An assistant for your team", Demo: TeamAssistant },
  { title: "AI agents, working together", Demo: AgentsHero },
  { title: "Workflows that take action", Demo: OrchestrateActions },
  { title: "Insights from every interaction", Demo: Insights },
  { title: "Flexible, API-first building blocks", Demo: ApiBuildingBlocks },
] as const;

/** Keep viewed demos mounted so changing menu items pauses rather than resets.
 * Unvisited demos do not load until selected near the viewport.
 */
export function ChannelsDemos({ selected }: { selected: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const nearViewport = useInView(ref, { margin: "120px 0px", once: true });
  const [visited, setVisited] = useState(0);
  const [paused, setPaused] = useState(false);
  const [replays, setReplays] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (nearViewport) setVisited((value) => value | (1 << selected));
  }, [nearViewport, selected]);

  return (
    <div ref={ref} className={styles.stage} data-channel-demos>
      <Image
        className={styles.background}
        src="/preview/homepage/agent-demos/channels-background.png"
        alt=""
        fill
        sizes="(max-width: 800px) calc(100vw - 48px), (max-width: 1280px) 46vw, 580px"
      />
      {channelDemoDefinitions.map(({ title, Demo }, index) => (
        <div
          key={title}
          className={styles.layer}
          data-channel-art={index}
          data-selected={selected === index}
          data-demo-title={title}
          aria-hidden={selected !== index}
          inert={selected !== index}
        >
          {(visited & (1 << index)) !== 0 && (
            <Demo
              active={selected === index && !paused}
              replayKey={replays[index]}
            />
          )}
        </div>
      ))}
      <fieldset className={styles.controls} aria-label="Demo playback">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? "Resume animation" : "Pause animation"}
        </button>
        <button
          type="button"
          aria-label={`Replay ${channelDemoDefinitions[selected].title}`}
          onClick={() => {
            setVisited((value) => value | (1 << selected));
            setReplays((values) =>
              values.map((value, index) =>
                index === selected ? value + 1 : value,
              ),
            );
            setPaused(false);
          }}
        >
          Replay
        </button>
      </fieldset>
    </div>
  );
}
