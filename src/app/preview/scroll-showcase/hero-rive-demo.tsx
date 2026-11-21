"use client";

import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./showcase.module.css";

const Player = dynamic(() => import("./hero-rive-player"), { ssr: false });
const labels = {
  bot: "An agent records a weekly analytics report and exports it.",
  flow: "An influencer outreach workflow progresses from creator research to approval and a CRM update.",
  channels:
    "Fred and Quinn coordinate inbox monitoring and grant Google access in chat.",
  computer: "A cursor enters credentials and selects Continue in Zendesk.",
};

export function HeroRiveDemo({
  demo,
  artboard,
  active,
  play,
}: {
  demo: keyof typeof labels;
  artboard: string;
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
  return (
    <div
      ref={ref}
      className={styles.heroRiveDemo}
      data-demo={demo}
      role="img"
      aria-label={labels[demo]}
    >
      <Image
        src={`/preview/scroll-showcase/hero-rive/${demo}.webp`}
        fill
        alt=""
        sizes="(max-width: 800px) 90vw, 580px"
      />
      {active && play && inView && visible && <Player artboard={artboard} />}
    </div>
  );
}
