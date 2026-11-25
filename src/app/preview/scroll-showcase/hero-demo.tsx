"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BotInboxChat } from "./bot-inbox-chat";
import chatStyles from "./bot-inbox-chat.module.css";
import { ComputerHero } from "./computer-hero";
import { FlowHero } from "./flow-hero";
import { ChannelsHero } from "./hero-scenes";

const labels = {
  bot: "Fred asks Innflow to monitor the fundraising inbox. After Fred grants Google Workspace access, Innflow confirms it will summarize new investor emails in the channel.",
  flow: "Jessie asks Influencer Manager for verified emails and intro drafts. The creator outreach workflow expands from the conversation to show each step and its owner.",
  channels:
    "Channel workspace previews",
  computer:
    "Innflow, Claude Code, and Codex share a Mac desktop as pricing files are updated and the mobile layout is checked.",
};

export function HeroDemo({
  demo,
  active,
  play,
}: {
  demo: keyof typeof labels;
  active: boolean;
  play: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  const playing = active && play && inView && visible;
  return (
    <div
      ref={ref}
      className={chatStyles.slot}
      data-demo={demo}
      role={demo === "channels" ? "group" : "img"}
      aria-label={labels[demo]}
    >
      {demo === "bot" && <BotInboxChat play={playing} />}
      {demo === "flow" && <FlowHero play={playing} />}
      {demo === "channels" && <ChannelsHero play={playing} />}
      {demo === "computer" && <ComputerHero play={playing} />}
    </div>
  );
}
