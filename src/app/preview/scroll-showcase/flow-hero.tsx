"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChatMessage, drawChat } from "./bot-inbox-chat";
import chatStyles from "./bot-inbox-chat.module.css";
import { featureIconSrc } from "@/config/feature-identity";
import { type HeroTimeline, useHeroLoop } from "./use-hero-loop";
import styles from "./flow-hero.module.css";

const steps = [
  ["Find creators", "Research Agent", "leaf-green"],
  ["Verify emails", "Influencer Specialist", "cloud-teal"],
  ["Draft intros", "Influencer Manager", "droplet-indigo"],
  ["Review drafts", "Jessie", "head-sky"],
] as const;

function expandFlow(
  scene: HTMLElement,
  viewport: HTMLElement,
  timeline: HeroTimeline,
) {
  const { at, animate, duration } = timeline;
  const thread = scene.querySelector<HTMLElement>("[data-thread]")!;
  const attachment = scene.querySelector<HTMLElement>("[data-attachment]")!;
  const shift = drawChat(thread, scene, timeline);
  const clickTime = 8400;
  const compactTop = attachment.offsetTop - shift;
  const compactLeft = attachment.offsetLeft;
  const card = scene.querySelector<HTMLElement>("[data-flow-card]")!;
  const control = scene.querySelector<HTMLElement>("[data-expand]")!;
  const cursor = scene.querySelector<HTMLElement>("[data-pointer]")!;
  const change = (node: Element, before: Keyframe, after: Keyframe) =>
    animate(node, [
      at(0, before),
      at(clickTime, before),
      at(clickTime + 850, after),
      at(duration, after),
    ]);

  change(
    card,
    {
      top: compactTop + "px",
      left: compactLeft + "px",
      width: attachment.offsetWidth + "px",
      height: attachment.offsetHeight + "px",
    },
    { top: "0px", left: "0px", width: "100%", height: "100%" },
  );
  animate(card, [
    at(0, { opacity: 0 }),
    at(6200, { opacity: 0 }),
    at(6550, { opacity: 1 }),
    at(duration, { opacity: 1 }),
  ]);
  change(thread, { opacity: 1 }, { opacity: 0 });
  const nodes = scene.querySelectorAll<HTMLElement>("[data-step]");
  nodes.forEach((node, i) => {
    change(
      node,
      { left: 4 + i * 53 + "%", top: "23%", width: "49%" },
      {
        left: i % 2 ? "52%" : "4%",
        top: i < 2 ? "10%" : "56%",
        width: "44%",
      },
    );
  });
  const tip = control.getBoundingClientRect();
  const origin = scene.getBoundingClientRect();
  const click =
    "translate(" +
    (tip.left - origin.left + tip.width / 2) +
    "px," +
    (tip.top - origin.top + tip.height / 2) +
    "px)";
  const entryX = viewport.getBoundingClientRect().right - origin.left + 2;
  const outside = `translate(${entryX}px, ${tip.top - origin.top + 24}px)`;
  animate(cursor, [
    at(0, { transform: outside, opacity: 0 }),
    at(7050, { transform: outside, opacity: 1 }),
    at(8100, { transform: click, opacity: 1 }),
    at(clickTime, { transform: click + " scale(.82)", opacity: 1 }),
    at(8510, { transform: click, opacity: 1 }),
    at(8750, { transform: click, opacity: 0 }),
    at(duration, { opacity: 0 }),
  ]);
  animate(control, [
    at(0, { opacity: 1 }),
    at(clickTime, { opacity: 1 }),
    at(8700, { opacity: 0 }),
    at(duration, { opacity: 0 }),
  ]);
}

export function FlowHero({ play }: { play: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useHeroLoop(ref, play, 13800, expandFlow, 1.5);
  return (
    <div className={styles.viewport}>
      <div ref={ref} className={styles.stage} aria-hidden="true">
        <div
          data-thread=""
          data-playing={play}
          className={chatStyles.transcript}
        >
          <ChatMessage
            time={0}
            sender="Jessie"
            avatar="/preview/scroll-showcase/jessie-avatar.webp"
          >
            <strong>@Influencer Manager</strong> Find a verified email for each
            creator and draft an intro. Let me review it before you send.
          </ChatMessage>
          <ChatMessage
            time={2600}
            sender="Influencer Manager"
            avatar="/brand/agents/circular/leaf-green.svg"
            role="Coordinates workflows"
            note="Flow created"
          >
            I’ll find the contacts and send you the drafts for approval.
          </ChatMessage>
          <div
            data-attachment=""
            data-enter={5300}
            className={styles.attachment}
          />
        </div>
        <div data-flow-card="" className={styles.card}>
          <header>
            <Image src={featureIconSrc("flow")} width={24} height={24} alt="" />
            <strong>Creator outreach</strong>
            <Image
              src="/brand/agents/circular/head-sky.svg"
              width={18}
              height={18}
              alt=""
            />
          </header>
          <div className={styles.map}>
            {steps.map(([title, owner, agent], i) => (
              <div
                key={title}
                data-step=""
                className={styles.node}
                style={{
                  left: i % 2 ? "52%" : "4%",
                  top: i < 2 ? "10%" : "56%",
                }}
              >
                <div className={styles.label}>
                  <b>✓</b>
                  {title}
                </div>
                <div className={styles.owner}>
                  <Image
                    src={"/brand/agents/circular/" + agent + ".svg"}
                    width={14}
                    height={14}
                    alt=""
                  />
                  {owner}
                </div>
              </div>
            ))}
            <span data-expand="" className={styles.expand}>
              <Image
                src="/preview/scroll-showcase/expand-flow.svg"
                width={14}
                height={14}
                alt=""
              />
              Expand flow
            </span>
          </div>
          <footer>
            Progress <span>● ● ● ●</span>
            <b>4 / 4</b>
          </footer>
        </div>
        <Image
          className={styles.pointer}
          data-pointer=""
          src="/preview/homepage/workspace-overview/demos/leaf-cursor.svg"
          width={32}
          height={32}
          alt=""
        />
      </div>
    </div>
  );
}
