"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type CSSProperties,
  memo,
  type PointerEvent,
  type ReactNode,
  startTransition,
  useCallback,
  useState,
} from "react";

interface Reaction {
  emoji: string;
  count: number;
}

interface Message {
  user: string;
  avatarColor: string;
  time: string;
  body: string;
  mentions?: { text: string; color: string }[];
  reactions: Reaction[];
  replies: number;
  replyTime: string;
}

interface Channel {
  id: string;
  name: string;
  type: "hash" | "volume";
  section: string;
  messages: Message[];
}

const channels: Channel[] = [
  {
    id: "data-analysis",
    name: "data-analysis",
    type: "hash",
    section: "GTM",
    messages: [
      {
        user: "Max",
        avatarColor: "#6366F1",
        time: "3:12 PM",
        body: "@FlowBot Compare this month's sales to the same month last year",
        mentions: [{ text: "@FlowBot", color: "#2563EB" }],
        reactions: [
          { emoji: "\ud83d\udc40", count: 2 },
          { emoji: "\ud83d\udc4d", count: 1 },
        ],
        replies: 3,
        replyTime: "4 minutes ago",
      },
      {
        user: "Lizzy",
        avatarColor: "#8B5CF6",
        time: "4:42 PM",
        body: "@FlowBot Who are the top 3 most active users at Mostco?",
        mentions: [{ text: "@FlowBot", color: "#2563EB" }],
        reactions: [
          { emoji: "\ud83d\udc4d", count: 1 },
          { emoji: "\ud83d\udca1", count: 1 },
        ],
        replies: 3,
        replyTime: "2 minutes ago",
      },
      {
        user: "Marcelo",
        avatarColor: "#EC4899",
        time: "6:50 PM",
        body: "@FlowBot Where are we losing people in the onboarding flow?",
        mentions: [{ text: "@FlowBot", color: "#2563EB" }],
        reactions: [
          { emoji: "\ud83d\udc4d", count: 1 },
          { emoji: "\u2764\ufe0f", count: 1 },
        ],
        replies: 3,
        replyTime: "just now",
      },
    ],
  },
  {
    id: "sales-discussion",
    name: "sales-discussion",
    type: "hash",
    section: "GTM",
    messages: [
      {
        user: "Gonzalo",
        avatarColor: "#3B82F6",
        time: "9:36 AM",
        body: "@Innflow What have been the most common objections on our calls this quarter?",
        mentions: [{ text: "@Innflow", color: "#2563EB" }],
        reactions: [
          { emoji: "\ud83d\udc4d", count: 3 },
          { emoji: "\ud83d\udcc8", count: 1 },
        ],
        replies: 3,
        replyTime: "1 hour ago",
      },
      {
        user: "Luis",
        avatarColor: "#10B981",
        time: "11:02 AM",
        body: "@salesloop can you help me respond to Acme's sales security questionnaire in my inbox?",
        mentions: [{ text: "@salesloop", color: "#2563EB" }],
        reactions: [
          { emoji: "\ud83d\udc4d", count: 2 },
          { emoji: "\ud83d\udc4c", count: 1 },
        ],
        replies: 3,
        replyTime: "5 minutes ago",
      },
      {
        user: "Rene",
        avatarColor: "#F59E0B",
        time: "2:12 AM",
        body: "@salesloop can you update the Acme opportunity based on my emails with them this week?",
        mentions: [{ text: "@salesloop", color: "#2563EB" }],
        reactions: [
          { emoji: "\ud83d\udc4d", count: 1 },
          { emoji: "\u2705", count: 1 },
        ],
        replies: 3,
        replyTime: "just now",
      },
    ],
  },
  {
    id: "pipeline-reviews",
    name: "pipeline-reviews",
    type: "hash",
    section: "GTM",
    messages: [
      {
        user: "Sarah",
        avatarColor: "#F43F5E",
        time: "10:15 AM",
        body: "Q2 pipeline review is scheduled for Friday. Please update your deal stages before then.",
        reactions: [{ emoji: "\ud83d\udc4d", count: 4 }],
        replies: 2,
        replyTime: "30 minutes ago",
      },
    ],
  },
  {
    id: "competitive-intel",
    name: "competitive-intel",
    type: "hash",
    section: "GTM",
    messages: [
      {
        user: "Aron",
        avatarColor: "#6366F1",
        time: "1:30 PM",
        body: "Just saw that CompetitorX launched a new pricing tier. Adding notes to the battle card.",
        reactions: [
          { emoji: "\ud83d\udc40", count: 3 },
          { emoji: "\ud83d\udcdd", count: 1 },
        ],
        replies: 5,
        replyTime: "15 minutes ago",
      },
    ],
  },
  {
    id: "forecast",
    name: "forecast",
    type: "volume",
    section: "GTM",
    messages: [
      {
        user: "Katherine",
        avatarColor: "#EC4899",
        time: "9:00 AM",
        body: "Updated the Q2 forecast model. We're tracking 12% above target.",
        reactions: [
          { emoji: "\ud83d\ude80", count: 5 },
          { emoji: "\ud83c\udf89", count: 2 },
        ],
        replies: 4,
        replyTime: "1 hour ago",
      },
    ],
  },
  {
    id: "content",
    name: "content",
    type: "hash",
    section: "Marketing",
    messages: [
      {
        user: "Emma",
        avatarColor: "#8B5CF6",
        time: "11:00 AM",
        body: "Blog post draft is ready for review. Focusing on the new agent capabilities.",
        reactions: [{ emoji: "\u270d\ufe0f", count: 2 }],
        replies: 3,
        replyTime: "20 minutes ago",
      },
    ],
  },
  {
    id: "social",
    name: "social",
    type: "volume",
    section: "Marketing",
    messages: [
      {
        user: "Priya",
        avatarColor: "#F59E0B",
        time: "2:00 PM",
        body: "LinkedIn post went live. Seeing strong early engagement on the demo video.",
        reactions: [
          { emoji: "\ud83d\udcca", count: 1 },
          { emoji: "\ud83d\udd25", count: 3 },
        ],
        replies: 1,
        replyTime: "10 minutes ago",
      },
    ],
  },
  {
    id: "brand",
    name: "brand",
    type: "volume",
    section: "Marketing",
    messages: [
      {
        user: "Tomas",
        avatarColor: "#3B82F6",
        time: "4:30 PM",
        body: "New brand guidelines PDF is uploaded to the shared drive. Please review the color palette updates.",
        reactions: [{ emoji: "\ud83c\udfa8", count: 2 }],
        replies: 2,
        replyTime: "45 minutes ago",
      },
    ],
  },
  {
    id: "customer-feedback",
    name: "customer-feedback",
    type: "hash",
    section: "Support",
    messages: [
      {
        user: "Diana",
        avatarColor: "#10B981",
        time: "8:45 AM",
        body: "Three customers mentioned the same onboarding friction point this week. Creating a ticket.",
        reactions: [{ emoji: "\ud83d\udcdd", count: 2 }],
        replies: 4,
        replyTime: "2 hours ago",
      },
    ],
  },
  {
    id: "escalations",
    name: "escalations",
    type: "hash",
    section: "Support",
    messages: [
      {
        user: "Mike",
        avatarColor: "#EF4444",
        time: "7:20 AM",
        body: "Enterprise account flagged a critical issue with SSO integration. Engineering is investigating.",
        reactions: [{ emoji: "\ud83d\udea8", count: 3 }],
        replies: 6,
        replyTime: "5 minutes ago",
      },
    ],
  },
  {
    id: "bug-reports",
    name: "bug-reports",
    type: "volume",
    section: "Support",
    messages: [
      {
        user: "Alex",
        avatarColor: "#6366F1",
        time: "3:15 PM",
        body: "Reproducing the CSV export bug. Seems related to timezone handling in date columns.",
        reactions: [{ emoji: "\ud83d\udc1b", count: 1 }],
        replies: 3,
        replyTime: "30 minutes ago",
      },
    ],
  },
  {
    id: "recruiting",
    name: "recruiting",
    type: "hash",
    section: "Recruiting",
    messages: [
      {
        user: "Jen",
        avatarColor: "#F43F5E",
        time: "10:00 AM",
        body: "Two new senior engineer candidates in the pipeline. Scheduling technical screens for next week.",
        reactions: [
          { emoji: "\ud83c\udf1f", count: 2 },
          { emoji: "\ud83d\udc4f", count: 1 },
        ],
        replies: 2,
        replyTime: "1 hour ago",
      },
    ],
  },
];

const sections = [
  {
    name: "GTM",
    icon: "G",
    channels: [
      "data-analysis",
      "sales-discussion",
      "pipeline-reviews",
      "competitive-intel",
      "forecast",
    ],
  },
  {
    name: "Marketing",
    icon: "M",
    channels: ["content", "social", "brand"],
  },
  {
    name: "Support",
    icon: "S",
    channels: ["customer-feedback", "escalations", "bug-reports"],
  },
  {
    name: "Recruiting",
    icon: "R",
    channels: ["recruiting"],
  },
];

const fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";
const blue = "#2563EB";
const channelById: Record<string, Channel> = Object.fromEntries(
  channels.map((channel) => [channel.id, channel]),
);
const sectionColors: Record<string, string> = {
  G: "#611F69",
  M: "#2563EB",
  S: "#16A34A",
  R: "#F59E0B",
};
const standardTransition = {
  duration: 0.18,
  ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
};
const reducedTransition = { duration: 0 };

/**
 * All static style objects live at module scope so they are allocated once
 * instead of on every render.
 */
const styles: Record<string, CSSProperties> = {
  sectionIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 800,
    color: "#FFFFFF",
    fontFamily,
    flexShrink: 0,
  },
  hashIcon: {
    width: 14,
    marginRight: 7,
    fontSize: 13,
    lineHeight: 1,
    color: "#8B8D91",
    fontWeight: 650,
    textAlign: "center",
    flexShrink: 0,
  },
  volumeIconWrap: {
    width: 14,
    height: 14,
    marginRight: 7,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: 800,
    color: "#FFFFFF",
    fontFamily,
    flexShrink: 0,
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.22)",
  },
  reactionBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "2px 8px",
    borderRadius: 999,
    border: "1px solid #E5E7EB",
    backgroundColor: "#FAFAFA",
    fontSize: 12,
    fontFamily,
    color: "#525252",
    cursor: "default",
    userSelect: "none",
  },
  reactionEmoji: { fontSize: 13, lineHeight: 1 },
  reactionCount: { fontWeight: 650 },
  mention: {
    backgroundColor: "#EFF6FF",
    borderRadius: 5,
    padding: "1px 4px",
    fontWeight: 650,
  },
  messageRow: { display: "flex", gap: 11, padding: "13px 22px" },
  messageContent: { flex: 1, minWidth: 0 },
  messageMeta: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 3,
  },
  messageUser: {
    fontWeight: 760,
    fontSize: 14,
    color: "#171717",
    fontFamily,
  },
  messageTime: { fontSize: 11, color: "#737373", fontFamily },
  messageBody: {
    fontSize: 14,
    color: "#262626",
    lineHeight: 1.5,
    fontFamily,
    marginBottom: 7,
    overflowWrap: "anywhere",
  },
  reactionList: { display: "flex", gap: 6, marginBottom: 7, flexWrap: "wrap" },
  repliesRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: blue,
    fontFamily,
    flexWrap: "wrap",
  },
  repliesCount: { fontWeight: 700 },
  replyTime: { color: "#737373" },
  messageDivider: {
    height: 1,
    backgroundColor: "rgba(15, 23, 42, 0.06)",
    margin: "0 22px",
  },
  pressableBase: {
    border: 0,
    cursor: "pointer",
    fontFamily,
    transition: `transform 120ms ${easeOut}, background-color 160ms ${easeOut}, border-color 160ms ${easeOut}, color 160ms ${easeOut}`,
  },
  root: {
    position: "relative",
    display: "flex",
    borderRadius: 18,
    border: "1px solid rgba(15, 23, 42, 0.08)",
    overflow: "hidden",
    fontFamily,
    backgroundColor: "#FFFFFF",
    boxShadow:
      "0 20px 60px rgba(15, 23, 42, 0.10), 0 2px 8px rgba(15, 23, 42, 0.06)",
    minWidth: 0,
    minHeight: 0,
    contain: "layout paint style",
    isolation: "isolate",
  },
  aside: {
    width: 236,
    background: "linear-gradient(180deg, #FAFAFB 0%, #F5F6F8 100%)",
    borderRight: "1px solid rgba(15, 23, 42, 0.08)",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overscrollBehavior: "contain",
    flexShrink: 0,
  },
  workspaceHeader: {
    height: 58,
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderBottom: "1px solid rgba(15, 23, 42, 0.07)",
    flexShrink: 0,
  },
  workspaceLogo: {
    width: 30,
    height: 30,
    borderRadius: 9,
    background: "linear-gradient(135deg, #611F69 0%, #7C3AED 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 18px rgba(97, 31, 105, 0.22)",
    flexShrink: 0,
  },
  workspaceName: {
    fontWeight: 820,
    fontSize: 15,
    color: "#171717",
    lineHeight: 1.15,
  },
  workspaceMeta: { fontSize: 11, color: "#737373", marginTop: 2 },
  nav: { padding: "10px 8px 14px" },
  sectionGroup: { marginBottom: 5 },
  sectionToggle: {
    width: "100%",
    minHeight: 36,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "7px 8px",
    userSelect: "none",
    background: "transparent",
    borderRadius: 9,
    textAlign: "left",
  },
  sectionName: {
    fontSize: 13,
    fontWeight: 700,
    color: "#262626",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  channelButton: {
    width: "100%",
    minHeight: 32,
    display: "flex",
    alignItems: "center",
    padding: "5px 10px 5px 34px",
    borderRadius: 9,
    textAlign: "left",
  },
  channelName: {
    minWidth: 0,
    fontSize: 13,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: 0,
    backgroundColor: "#FFFFFF",
  },
  header: {
    minHeight: 72,
    padding: "14px 22px 0",
    borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
    flexShrink: 0,
  },
  headerTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 10,
  },
  channelTitle: {
    minWidth: 0,
    fontSize: 17,
    fontWeight: 800,
    color: "#171717",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  activeBadge: {
    fontSize: 11,
    fontWeight: 700,
    color: "#16A34A",
    backgroundColor: "#F0FDF4",
    border: "1px solid #DCFCE7",
    borderRadius: 999,
    padding: "4px 8px",
    flexShrink: 0,
  },
  tabBar: { display: "flex", gap: 18 },
  tab: {
    height: 33,
    padding: 0,
    background: "transparent",
    fontSize: 13,
  },
  messageScroll: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    overscrollBehavior: "contain",
    WebkitOverflowScrolling: "touch",
    padding: "8px 0",
  },
};

const chatBubblePath =
  "M8 2C4.69 2 2 4.06 2 6.5C2 7.85 2.76 9.05 4 9.86V13L6.4 11.2C6.92 11.33 7.45 11.4 8 11.4C11.31 11.4 14 9.34 14 6.9C14 4.46 11.31 2 8 2Z";

const ChatBubbleIcon = memo(function ChatBubbleIcon({
  color,
  size = 13,
}: {
  color: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d={chatBubblePath} fill={color} />
    </svg>
  );
});

const WorkspaceLogoIcon = memo(function WorkspaceLogoIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle cx="4" cy="4" r="2.5" fill="#fff" />
      <circle cx="12" cy="4" r="2.5" fill="#fff" />
      <circle cx="4" cy="12" r="2.5" fill="#fff" />
      <circle cx="12" cy="12" r="2.5" fill="#fff" />
    </svg>
  );
});

const SectionIcon = memo(function SectionIcon({ letter }: { letter: string }) {
  return (
    <div
      style={{
        ...styles.sectionIcon,
        backgroundColor: sectionColors[letter] ?? sectionColors.R,
      }}
    >
      {letter}
    </div>
  );
});

const ChannelIcon = memo(function ChannelIcon({
  type,
}: {
  type: "hash" | "volume";
}) {
  if (type === "hash") {
    return <span style={styles.hashIcon}>#</span>;
  }

  return (
    <span style={styles.volumeIconWrap}>
      <ChatBubbleIcon color="#8B8D91" />
    </span>
  );
});

const Avatar = memo(function Avatar({
  user,
  color,
}: {
  user: string;
  color: string;
}) {
  return (
    <div style={{ ...styles.avatar, backgroundColor: color }}>
      {user.charAt(0).toUpperCase()}
    </div>
  );
});

const ReactionBadge = memo(function ReactionBadge({ emoji, count }: Reaction) {
  return (
    <div style={styles.reactionBadge}>
      <span style={styles.reactionEmoji}>{emoji}</span>
      <span style={styles.reactionCount}>{count}</span>
    </div>
  );
});

const MessageBody = memo(function MessageBody({
  body,
  mentions,
}: {
  body: string;
  mentions?: { text: string; color: string }[];
}) {
  if (!mentions || mentions.length === 0) {
    return <span>{body}</span>;
  }

  const parts: ReactNode[] = [];
  let remaining = body;
  let key = 0;

  for (const mention of mentions) {
    const idx = remaining.indexOf(mention.text);
    if (idx === -1) continue;

    if (idx > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
    }

    parts.push(
      <span key={key++} style={{ ...styles.mention, color: mention.color }}>
        {mention.text}
      </span>,
    );

    remaining = remaining.slice(idx + mention.text.length);
  }

  if (remaining) {
    parts.push(<span key={key++}>{remaining}</span>);
  }

  return <>{parts}</>;
});

const MessageItem = memo(function MessageItem({
  message,
}: {
  message: Message;
}) {
  return (
    <div style={styles.messageRow}>
      <Avatar user={message.user} color={message.avatarColor} />

      <div style={styles.messageContent}>
        <div style={styles.messageMeta}>
          <span style={styles.messageUser}>{message.user}</span>
          <span style={styles.messageTime}>{message.time}</span>
        </div>

        <div style={styles.messageBody}>
          <MessageBody body={message.body} mentions={message.mentions} />
        </div>

        {message.reactions.length > 0 && (
          <div style={styles.reactionList}>
            {message.reactions.map((reaction) => (
              <ReactionBadge
                key={`${reaction.emoji}-${reaction.count}`}
                emoji={reaction.emoji}
                count={reaction.count}
              />
            ))}
          </div>
        )}

        <div style={styles.repliesRow}>
          <ChatBubbleIcon color={blue} />
          <span style={styles.repliesCount}>{message.replies} Replies</span>
          <span style={styles.replyTime}>{message.replyTime}</span>
        </div>
      </div>
    </div>
  );
});

function scaleDown(event: PointerEvent<HTMLButtonElement>) {
  event.currentTarget.style.transform = "scale(0.985)";
}

function scaleUp(event: PointerEvent<HTMLButtonElement>) {
  event.currentTarget.style.transform = "scale(1)";
}

function PressableButton({
  children,
  onClick,
  style,
  ariaLabel,
  ariaExpanded,
  ariaCurrent,
}: {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaCurrent?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-current={ariaCurrent ? "true" : undefined}
      onClick={onClick}
      style={{ ...styles.pressableBase, ...style }}
      onPointerDown={scaleDown}
      onPointerUp={scaleUp}
      onPointerCancel={scaleUp}
      onPointerLeave={scaleUp}
    >
      {children}
    </button>
  );
}

const ChannelButton = memo(function ChannelButton({
  channel,
  isActive,
  onSelect,
}: {
  channel: Channel;
  isActive: boolean;
  onSelect: (channelId: string) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(channel.id);
  }, [onSelect, channel.id]);

  return (
    <PressableButton
      onClick={handleClick}
      ariaLabel={`Open ${channel.name}`}
      ariaCurrent={isActive}
      style={{
        ...styles.channelButton,
        backgroundColor: isActive ? "#FFFFFF" : "transparent",
        border: isActive
          ? "1px solid rgba(15, 23, 42, 0.08)"
          : "1px solid transparent",
        boxShadow: isActive ? "0 1px 3px rgba(15, 23, 42, 0.06)" : "none",
        color: isActive ? "#171717" : "#666A73",
      }}
    >
      <ChannelIcon type={channel.type} />
      <span
        style={{
          ...styles.channelName,
          fontWeight: isActive ? 680 : 460,
        }}
      >
        {channel.name}
      </span>
    </PressableButton>
  );
});

const SectionGroup = memo(function SectionGroup({
  section,
  isCollapsed,
  activeChannel,
  onToggle,
  onSelect,
  reduceMotion,
}: {
  section: (typeof sections)[number];
  isCollapsed: boolean;
  activeChannel: string;
  onToggle: (section: string) => void;
  onSelect: (channelId: string) => void;
  reduceMotion: boolean;
}) {
  const handleToggle = useCallback(() => {
    onToggle(section.name);
  }, [onToggle, section.name]);

  return (
    <div style={styles.sectionGroup}>
      <PressableButton
        onClick={handleToggle}
        ariaLabel={`Toggle ${section.name}`}
        ariaExpanded={!isCollapsed}
        style={styles.sectionToggle}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          width="9"
          height="9"
          viewBox="0 0 8 8"
          fill="none"
          style={{
            transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
            transition: `transform 160ms ${easeOut}`,
            flexShrink: 0,
          }}
        >
          <path
            d="M1 2.5L4 5.5L7 2.5"
            stroke="#737373"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <SectionIcon letter={section.icon} />

        <span style={styles.sectionName}>{section.name}</span>
      </PressableButton>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={reduceMotion ? reducedTransition : standardTransition}
          >
            {section.channels.map((channelId) => {
              const channel = channelById[channelId];

              if (!channel) return null;

              return (
                <ChannelButton
                  key={channelId}
                  channel={channel}
                  isActive={activeChannel === channelId}
                  onSelect={onSelect}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const Sidebar = memo(function Sidebar({
  activeChannel,
  collapsedSections,
  onToggleSection,
  onSelectChannel,
  reduceMotion,
}: {
  activeChannel: string;
  collapsedSections: Record<string, boolean>;
  onToggleSection: (section: string) => void;
  onSelectChannel: (channelId: string) => void;
  reduceMotion: boolean;
}) {
  return (
    <aside style={styles.aside}>
      <div style={styles.workspaceHeader}>
        <div style={styles.workspaceLogo}>
          <WorkspaceLogoIcon />
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={styles.workspaceName}>GTM</div>
          <div style={styles.workspaceMeta}>{channels.length} channels</div>
        </div>
      </div>

      <nav style={styles.nav} aria-label="Channels">
        {sections.map((section) => (
          <SectionGroup
            key={section.name}
            section={section}
            isCollapsed={!!collapsedSections[section.name]}
            activeChannel={activeChannel}
            onToggle={onToggleSection}
            onSelect={onSelectChannel}
            reduceMotion={reduceMotion}
          />
        ))}
      </nav>
    </aside>
  );
});

const MessagePane = memo(function MessagePane({
  channel,
  reduceMotion,
}: {
  channel: Channel;
  reduceMotion: boolean;
}) {
  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <div style={styles.channelTitle}>#{channel.name}</div>
          <div style={styles.activeBadge}>Active</div>
        </div>

        <div style={styles.tabBar}>
          {["Messages", "Canvas", "Files"].map((tab, index) => (
            <PressableButton
              key={tab}
              ariaLabel={tab}
              ariaCurrent={index === 0}
              style={{
                ...styles.tab,
                color: index === 0 ? "#171717" : "#737373",
                fontWeight: index === 0 ? 720 : 520,
                borderBottom:
                  index === 0 ? `2px solid ${blue}` : "2px solid transparent",
              }}
            >
              {tab}
            </PressableButton>
          ))}
        </div>
      </header>

      <div style={styles.messageScroll}>
        <AnimatePresence initial={false}>
          <motion.div
            key={channel.id}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={reduceMotion ? reducedTransition : standardTransition}
          >
            {channel.messages.map((message, index) => (
              <div key={`${channel.id}-${message.user}-${message.time}`}>
                {index > 0 && <div style={styles.messageDivider} />}
                <MessageItem message={message} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
});

interface SlackUIProps {
  width?: number;
  height?: number;
}

/**
 * SlackUI
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function SlackUI({ width = 900, height = 560 }: SlackUIProps) {
  const [activeChannel, setActiveChannel] = useState("data-analysis");
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});
  const prefersReducedMotion = useReducedMotion();
  const isStatic = false;
  const reduceMotion = isStatic || Boolean(prefersReducedMotion);

  const currentChannel = channelById[activeChannel] ?? channels[0];

  const toggleSection = useCallback((section: string) => {
    startTransition(() => {
      setCollapsedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    });
  }, []);

  const selectChannel = useCallback((channelId: string) => {
    startTransition(() => {
      setActiveChannel(channelId);
    });
  }, []);

  return (
    <div style={{ ...styles.root, width, height }}>
      <Sidebar
        activeChannel={activeChannel}
        collapsedSections={collapsedSections}
        onToggleSection={toggleSection}
        onSelectChannel={selectChannel}
        reduceMotion={reduceMotion}
      />
      <MessagePane channel={currentChannel} reduceMotion={reduceMotion} />
    </div>
  );
}
