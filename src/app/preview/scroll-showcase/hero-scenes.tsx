"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import styles from "./hero-scenes.module.css";

const workspaces = [
  { name: "Hospitality", channels: ["front-desk", "arrivals", "housekeeping"], request: "Which rooms need early check-in?", reply: "Two early arrivals today. I shared the room list with housekeeping.", agent: "cloud-amber-flat", surface: "#ffe8bb" },
  { name: "Retail", channels: ["stockroom", "store-orders", "returns"], request: "What needs a restock before Friday?", reply: "The navy totes are running low. I drafted a reorder for review.", agent: "leaf-green-fill-only", surface: "#cce9d9" },
  { name: "Healthcare", channels: ["front-office", "scheduling", "intake"], request: "Any openings at the clinic tomorrow?", reply: "Two afternoon slots opened up. The scheduling team has the list.", agent: "head-sky", surface: "#cae5ff" },
  { name: "Finance", channels: ["invoices", "month-end", "vendors"], request: "Which invoices are waiting on receipts?", reply: "Three are missing receipts. I drafted a reminder for each owner.", agent: "droplet-indigo", surface: "#e3d8ff" },
  { name: "Construction", channels: ["site-updates", "deliveries", "permits"], request: "When is the framing delivery due?", reply: "The supplier confirmed Thursday at 8. I updated the site schedule.", agent: "acorn-sky", surface: "#ffd7bd" },
  { name: "Logistics", channels: ["dispatch", "shipments", "exceptions"], request: "Did the pickup time change for load 42?", reply: "Pickup moved to 3 PM. Dispatch and the warehouse have the update.", agent: "cloud-teal-no-shadow", surface: "#c1e8eb" },
] as const;

export function ChannelsHero({ play }: { play: boolean }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.viewport} data-open={play}>
      {workspaces.map(({ name, channels, request, reply, agent, surface }, index) => {
        const depth = index === selected ? 0 : index < selected ? index + 1 : index;
        return (
          <button
            key={name}
            type="button"
            aria-label={name + " workspace"}
            aria-pressed={index === selected}
            aria-description={selected === index ? request + " " + reply : undefined}
            className={styles.card}
            style={{
              "--depth": depth,
              "--tab-position": index / (workspaces.length - 1),
              "--surface-color": surface,
              zIndex: workspaces.length - depth,
            } as CSSProperties}
            onClick={() => setSelected(index)}
          >
            <span className={styles.title}>{name}</span>
            <span className={styles.art} aria-hidden="true">
              <span className={styles.sidebar}>
                <b>Channels</b>
                {channels.map((channel) => <span key={channel}># {channel}</span>)}
              </span>
              <span className={styles.thread}>
                <b># {channels[0]}</b>
                <span className={styles.request}>{request}</span>
                <span className={styles.response}>
                  <Image src={`/brand/agents/circular/${agent}.svg`} alt="" width={20} height={20} unoptimized />
                  <span>{reply}</span>
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
