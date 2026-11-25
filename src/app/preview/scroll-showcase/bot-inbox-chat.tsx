"use client";

import Image from "next/image";
import { type ReactNode, useRef } from "react";
import { type HeroTimeline, useHeroLoop } from "./use-hero-loop";
import styles from "./bot-inbox-chat.module.css";

const fred = "/preview/scroll-showcase/fred-avatar.webp";
const innflow = "/brand/agents/circular/head-sky.svg";
const google = "/brand/google-g.svg";
const fadeStart = 19900;
const grantClick = 9200;

function Avatar({ src, size = 14 }: { src: string; size?: number }) {
  return <Image src={src} width={size} height={size} alt="" />;
}

export function ChatMessage({
  children,
  time,
  sender = "Innflow",
  avatar = sender === "Fred" ? fred : innflow,
  role = sender === "Innflow" ? "🔑 Your workspace coordinator" : undefined,
  note,
  reaction,
  still,
}: {
  children: ReactNode;
  time: number;
  sender?: string;
  avatar?: string;
  role?: string;
  note?: string;
  reaction?: ReactNode;
  still?: boolean;
}) {
  return (
    <div
      className={styles.row}
      data-enter={time}
      data-sender={sender}
      data-still={still || undefined}
    >
      <Avatar src={avatar} size={27} />
      <div className={styles.message}>
        <div className={styles.sender}>
          <strong>{sender}</strong>
          {role && <span>{role}</span>}
        </div>
        <div className={styles.stack}>
          <span data-dots="" className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <div data-reply="" className={styles.bubble}>
            <p>{children}</p>
            {note && <small>{note}</small>}
            {reaction}
          </div>
        </div>
      </div>
    </div>
  );
}

export function drawChat(
  chat: HTMLElement,
  pane: HTMLElement,
  { animate, at, duration }: HeroTimeline,
) {
  const appear = (element: Element, start: number) =>
    animate(element, [
      at(0, { opacity: 0 }),
      at(start, { opacity: 0, transform: "translateY(3px)" }),
      at(start + 420, { opacity: 1, transform: "translateY(0)" }),
      at(duration, { opacity: 1, transform: "translateY(0)" }),
    ]);
  const showInstantly = (element: Element, start: number) =>
    animate(element, [
      at(0, { opacity: 0, easing: "steps(1, end)" }),
      at(start, { opacity: 1 }),
      at(duration, { opacity: 1 }),
    ]);

  // Reserve each message's final footprint. The camera follows its visible
  // content without reflowing the thread when the dots turn into a reply.
  let shift = 0;
  const position = (ms: number) =>
    at(ms, { transform: `translateY(-${shift}px)` });
  const pan = [position(0)];
  const follow = (ms: number, bottom: number) => {
    pan.push(position(ms));
    shift = Math.max(
      shift,
      Math.min(
        chat.offsetHeight - pane.clientHeight,
        bottom + 18 - pane.clientHeight,
      ),
    );
    pan.push(position(ms + 900));
  };
  for (const row of chat.querySelectorAll<HTMLElement>("[data-enter]")) {
    const start = Number(row.dataset.enter);
    if (row.hasAttribute("data-channel-event")) {
      showInstantly(row, start);
    } else if (start > 0) {
      appear(row, start);
    }
    const dots = row.querySelector("[data-dots]");
    const reply = row.querySelector("[data-reply]");
    const arrived = start + 1250;
    if (dots && reply) {
      animate(dots, [
        ...(start === 0
          ? [
              at(0, { opacity: 0 }),
              at(280, { opacity: 0 }),
              at(420, { opacity: 1 }),
            ]
          : [at(0, { opacity: 1 })]),
        at(arrived - 140, { opacity: 1 }),
        at(arrived + 90, { opacity: 0 }),
        at(duration, { opacity: 0 }),
      ]);
      appear(reply, arrived);
      follow(start, row.offsetTop + 44);
      follow(arrived, row.offsetTop + row.offsetHeight);
    } else {
      follow(start, row.offsetTop + row.offsetHeight);
    }
  }
  const reaction = chat.querySelector("[data-reaction]");
  if (reaction) {
    animate(reaction, [
      at(0, { opacity: 0, scale: 0.88 }),
      at(2850, { opacity: 0, scale: 0.88 }),
      at(3010, { opacity: 1, scale: 1.04 }),
      at(3120, { opacity: 1, scale: 1 }),
      at(duration, { opacity: 1, scale: 1 }),
    ]);
  }
  const granted = chat.querySelector("[data-granted]");
  if (granted) showInstantly(granted, grantClick);
  const cursor = chat.querySelector("[data-fred-cursor]");
  if (cursor) {
    const frame = pane.getBoundingClientRect();
    const pointer = cursor.getBoundingClientRect();
    const pastRight = `translate(${frame.right - pointer.left + 4}px, -8px)`;
    animate(cursor, [
      at(0, { opacity: 0, transform: pastRight, easing: "steps(1, end)" }),
      at(7800, { opacity: 1, transform: pastRight }),
      at(8900, { opacity: 1, transform: "scale(1)" }),
      at(grantClick, { opacity: 1, transform: "scale(.86)" }),
      at(grantClick + 140, { opacity: 1, transform: "scale(1)" }),
      at(9630, { opacity: 1, transform: "scale(1)" }),
      at(10300, { opacity: 1, transform: pastRight }),
      at(duration, { opacity: 0, transform: pastRight }),
    ]);
  }
  // The pan resets at the loop boundary, while the transcript is invisible.
  pan.push(position(duration));
  animate(chat, pan);
  const graph = chat.querySelector<HTMLElement>("[data-flow-graph]");
  if (graph && graph.parentElement) {
    const travel = Math.max(
      0,
      graph.offsetWidth - graph.parentElement.clientWidth,
    );
    const graphAt = (time: number, fraction: number) =>
      at(time, { transform: `translateX(-${travel * fraction}px)` });
    animate(graph, [
      graphAt(0, 0),
      graphAt(6900, 0),
      graphAt(8100, 0.3),
      graphAt(9300, 0.3),
      graphAt(10500, 0.65),
      graphAt(11700, 0.65),
      graphAt(12900, 1),
      graphAt(duration, 1),
    ]);
  }
  return shift;
}

export function HeroChat({
  play,
  children,
  fadeAt = fadeStart,
}: {
  play: boolean;
  children: ReactNode;
  fadeAt?: number;
}) {
  const transcript = useRef<HTMLDivElement>(null);
  useHeroLoop(transcript, play, fadeAt, drawChat);
  return (
    <div className={styles.viewport} data-playing={play} aria-hidden="true">
      <div className={styles.transcript} ref={transcript}>
        {children}
      </div>
    </div>
  );
}

export function BotInboxChat({
  play,
  channel = false,
}: {
  play: boolean;
  channel?: boolean;
}) {
  const agent = channel ? "Quinn" : "Innflow";
  const agentAvatar = channel
    ? "/brand/agents/circular/droplet-indigo.svg"
    : innflow;
  const speaker = {
    sender: agent,
    avatar: agentAvatar,
    role: channel ? "Channel assistant" : "🔑 Your workspace coordinator",
  };
  return (
    <HeroChat play={play} fadeAt={channel ? 22400 : fadeStart}>
      <ChatMessage
        sender="Fred"
        time={0}
        reaction={
          <span
            data-reaction=""
            className={styles.reaction}
            title={`${agent} reacted with a thumbs up`}
          >
            <Avatar src={agentAvatar} /> {agent} 👍
          </span>
        }
      >
        <span className={styles.mention}>@{agent}</span> Can you monitor new
        emails sent to fundraising@acme.com?
      </ChatMessage>
      <div className={styles.members} data-enter={2200} data-channel-event="">
        <Avatar src={agentAvatar} />
        <b>{agent}</b> added
        <Avatar src="/preview/scroll-showcase/neil-avatar.webp" />
        <b>Neil,</b>
        <Avatar src="/preview/scroll-showcase/melody-avatar.webp" />
        <b>Melody</b>
        <span className={styles.confirmed}>
          to the channel <span aria-hidden="true">✓</span>
        </span>
      </div>
      <ChatMessage {...speaker} time={3200} note="Waiting for access">
        Give me access to{" "}
        <span className={styles.email}>fundraising@acme.com</span> so I can
        monitor new investor emails. Select Grant access below to connect the
        inbox.
      </ChatMessage>
      <div className={styles.grant} data-enter={6800}>
        <div className={styles.grantTitle}>
          Grant <Avatar src={agentAvatar} size={17} /> {agent} access to
          <b className={styles.google}>
            <Avatar src={google} size={15} /> Google
          </b>
        </div>
        <p>
          Access stays active until you revoke it or the connection expires.
        </p>
        <div className={styles.account}>
          <Avatar src={google} size={15} /> fundraising@acme.com
          <span className={styles.action}>
            Grant access<span data-granted="">Granted ✓</span>
            <span className={styles.fredCursor} data-fred-cursor="">
              <Image
                src="/preview/scroll-showcase/fred-cursor.svg"
                width={17}
                height={17}
                alt=""
              />
              <span className={styles.cursorLabel}>Fred</span>
            </span>
          </span>
        </div>
      </div>
      <ChatMessage {...speaker} time={10300} note="Inbox monitor active">
        The monitor is ready. I’ll post a summary here whenever a new email
        arrives in the fundraising inbox.
      </ChatMessage>
      <ChatMessage
        {...speaker}
        time={14400}
        still={channel}
        note="From the fundraising inbox"
      >
        {channel
          ? "Cedar Ventures asked for our deck. Melody, can you take the reply?"
          : "Neil at Cedar Ventures asked for the latest deck before Thursday’s partner meeting. He’d also like two times to meet next week."}
      </ChatMessage>
      {channel && (
        <ChatMessage
          time={17300}
          sender="Melody"
          avatar="/preview/scroll-showcase/melody-avatar.webp"
          still
        >
          I’ll send the deck and offer two times for Thursday.
        </ChatMessage>
      )}
    </HeroChat>
  );
}
