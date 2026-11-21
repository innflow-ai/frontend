"use client";

import { useInView } from "motion/react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { AgentsTogetherGraphic } from "./channel-graphics/AgentsTogetherGraphic";
import { ApiBuildingBlocksGraphic } from "./channel-graphics/ApiBuildingBlocksGraphic";
import { ConnectedChannelsGraphic } from "./channel-graphics/ConnectedChannelsGraphic";
import { InsightsGraphic } from "./channel-graphics/InsightsGraphic";
import { OrchestrateActionsGraphic } from "./channel-graphics/OrchestrateActionsGraphic";
import { TeamAssistantGraphic } from "./channel-graphics/TeamAssistantGraphic";
import { WorkflowsGraphic } from "./channel-graphics/WorkflowsGraphic";
import styles from "./channels-demos.module.css";

export const channelDemoDefinitions = [
  { title: "Orchestrate actions", Graphic: OrchestrateActionsGraphic },
  { title: "All your channels, connected", Graphic: ConnectedChannelsGraphic },
  { title: "An assistant for your team", Graphic: TeamAssistantGraphic },
  { title: "AI agents, working together", Graphic: AgentsTogetherGraphic },
  { title: "Workflows that take action", Graphic: WorkflowsGraphic },
  { title: "Insights from every interaction", Graphic: InsightsGraphic },
  {
    title: "Flexible, API-first building blocks",
    Graphic: ApiBuildingBlocksGraphic,
  },
] as const;

/** Static Figma compositions: only the whole illustration enters on selection. */
export function ChannelsDemos({ selected }: { selected: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.15, once: true });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const resize = () => setScale(element.clientWidth / 580);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={styles.stage}
      data-channel-demos
      data-entered={visible}
      style={{ "--graphic-scale": scale } as CSSProperties}
    >
      {channelDemoDefinitions.map(({ title, Graphic }, index) => (
        <div
          key={title}
          className={styles.layer}
          data-channel-art={index}
          data-selected={selected === index}
          data-demo-title={title}
          aria-hidden={selected !== index}
          inert={selected !== index}
        >
          <div
            className={styles.artwork}
            role="img"
            aria-label={`${title}: example workflow`}
          >
            <div aria-hidden="true">
              <Graphic />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
