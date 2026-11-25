"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BotInboxChat } from "./bot-inbox-chat";
import chatStyles from "./bot-inbox-chat.module.css";
import { ChannelsHero, ComputerHero, FlowHero } from "./hero-scenes";

const labels = {
  bot: "Fred asks Innflow to monitor the fundraising inbox. After Fred grants Google Workspace access, Innflow confirms it will summarize new investor emails in the channel.",
  flow: "Jessie asks for verified creator emails and an intro to review. The influencer outreach workflow shows who researches, approves, sends, and updates the CRM.",
  channels:
    "In general-chat, Quinn flags an investor reply and Melody takes the follow-up.",
  computer: "A cursor enters credentials and selects Continue in Zendesk.",
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
      role="img"
      aria-label={labels[demo]}
    >
      {demo === "bot" && <BotInboxChat play={playing} />}
      {demo === "flow" && <FlowHero play={playing} />}
      {demo === "channels" && <ChannelsHero play={playing} />}
      {demo === "computer" && <ComputerHero play={playing} />}
    </div>
  );
}
