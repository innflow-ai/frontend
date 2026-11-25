"use client";

import Image from "next/image";
import { useRef } from "react";
import { BotInboxChat, ChatMessage, HeroChat } from "./bot-inbox-chat";
import { type HeroTimeline, useHeroLoop } from "./use-hero-loop";
import styles from "./hero-scenes.module.css";

const preview = "/preview/scroll-showcase";
const manager = "/brand/agents/circular/leaf-green.svg";

export function FlowHero({ play }: { play: boolean }) {
  return (
    <HeroChat play={play} fadeAt={16700}>
      <ChatMessage
        time={0}
        sender="Jessie"
        avatar={`${preview}/jessie-avatar.webp`}
      >
        <strong>@Influencer Manager</strong> Find a verified email for each
        creator and draft an intro. Let me review it before you send.
      </ChatMessage>
      <ChatMessage
        time={2600}
        sender="Influencer Manager"
        avatar={manager}
        role="Coordinates workflows"
        note="Flow created"
      >
        I’ll find the contacts and send you the drafts for approval.
      </ChatMessage>
      <div className={styles.workflow} data-still="" data-enter={5300}>
        <div className={styles.workflowTitle}>
          <Image
            src={`${preview}/feature-tabs/flow.svg`}
            alt=""
            width={20}
            height={20}
          />
          Creator outreach
        </div>
        <div className={styles.graphWindow}>
          <Image
            data-flow-graph=""
            src={`${preview}/creator-outreach-graph.webp`}
            width={3464}
            height={534}
            unoptimized
            alt=""
          />
        </div>
      </div>
      <div
        data-still=""
        data-enter={13600}
        data-channel-event=""
        className={styles.handoff}
      >
        <Image src={manager} alt="" width={16} height={16} /> Influencer
        Specialist and Rachel Morgan joined the workflow ✓
      </div>
    </HeroChat>
  );
}

export function ChannelsHero({ play }: { play: boolean }) {
  return (
    <div className={styles.channelShell}>
      <div className={styles.channelHeading}>
        <span>#</span> general-chat
      </div>
      <div className={styles.channelBody}>
        <BotInboxChat play={play} channel />
      </div>
    </div>
  );
}

function drawComputer(
  scene: HTMLElement,
  viewport: HTMLElement,
  { at, animate, duration }: HeroTimeline,
) {
  const email = scene.querySelector<HTMLElement>("[data-address]")!;
  const password = scene.querySelector<HTMLElement>("[data-password]")!;
  const button = scene.querySelector<HTMLElement>("[data-continue]")!;
  const cursor = scene.querySelector<HTMLElement>("[data-computer-cursor]")!;
  const form = scene.querySelector<HTMLElement>("[data-form]")!;
  const result = scene.querySelector<HTMLElement>("[data-connected]")!;
  const type = (field: HTMLElement, start: number, end: number) =>
    animate(field, [
      at(0, { clipPath: "inset(0 100% 0 0)" }),
      at(start, {
        clipPath: "inset(0 100% 0 0)",
        easing: `steps(${field.textContent?.length || 1}, end)`,
      }),
      at(end, { clipPath: "inset(0 0% 0 0)" }),
      at(duration, { clipPath: "inset(0 0% 0 0)" }),
    ]);
  type(email, 1250, 3050);
  type(password, 3750, 4880);
  const origin = cursor.getBoundingClientRect();
  const target = (element: HTMLElement, fraction: number) => {
    const bounds = element.getBoundingClientRect();
    return `translate(${bounds.left + bounds.width * fraction - origin.left}px, ${bounds.top + bounds.height / 2 - origin.top}px)`;
  };
  const pointerAt = (ms: number, transform: string, opacity = 1) =>
    at(ms, { transform, opacity });
  const outside = `translateX(${viewport.getBoundingClientRect().right - origin.left + 4}px)`;
  const address = target(email.parentElement!, 0.2);
  const secret = target(password.parentElement!, 0.25);
  const submit = target(button, 0.7);
  animate(cursor, [
    pointerAt(0, outside, 0),
    pointerAt(500, outside),
    pointerAt(1120, address),
    pointerAt(3040, address),
    pointerAt(3590, secret),
    pointerAt(4830, secret),
    pointerAt(5360, submit),
    pointerAt(5550, submit + " scale(.84)"),
    pointerAt(5670, submit),
    pointerAt(6360, outside),
    pointerAt(duration, outside, 0),
  ]);
  animate(button, [
    at(0, { scale: 1 }),
    at(5370, { scale: 1 }),
    at(5550, { scale: 0.96 }),
    at(5680, { scale: 1 }),
    at(duration, { scale: 1 }),
  ]);
  animate(form, [
    at(0, { opacity: 1 }),
    at(5680, { opacity: 1 }),
    at(6000, { opacity: 0 }),
    at(duration, { opacity: 0 }),
  ]);
  animate(result, [
    at(0, { opacity: 0 }),
    at(5860, { opacity: 0 }),
    at(6230, { opacity: 1 }),
    at(duration, { opacity: 1 }),
  ]);
}

export function ComputerHero({ play }: { play: boolean }) {
  const scene = useRef<HTMLDivElement>(null);
  useHeroLoop(scene, play, 8900, drawComputer);
  return (
    <div className={styles.computerViewport}>
      <div ref={scene} className={styles.browser} data-computer-playing={play}>
        <div className={styles.browserBar}>
          <span className={styles.lights}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.domain}>acme.zendesk.com</span>
        </div>
        <div className={styles.browserBody}>
          <div className={styles.form} data-form="">
            <p className={styles.formHeading}>Sign in to Zendesk</p>
            <div className={styles.field}>
              <span>Email</span>
              <b data-address="">alex@example.com</b>
            </div>
            <div className={styles.field}>
              <span>Password</span>
              <b data-password="">••••••••</b>
            </div>
            <div className={styles.continue} data-continue="">
              Continue
            </div>
          </div>
          <div className={styles.connected} data-connected="">
            <span className={styles.success}>✓</span>
            <strong>Signed in to Zendesk</strong>
            <span>Your support workspace is ready.</span>
          </div>
        </div>
        <Image
          data-computer-cursor=""
          className={styles.pointer}
          src="/preview/homepage/workspace-overview/demos/head-cursor.svg"
          width={27}
          height={27}
          alt=""
        />
      </div>
    </div>
  );
}
