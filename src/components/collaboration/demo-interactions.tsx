"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import styles from "./demo-interactions.module.css";

type Channel = "data-analysis" | "sales-discussion";
const ChatContext = createContext({
  channel: "data-analysis" as Channel,
  select: (_channel: Channel) => {},
});
type LayerProps = {
  children?: ReactNode;
  className?: string;
  "data-node-id"?: string;
  "data-name"?: string;
};

export function ChatDemo({ children }: { children: ReactNode }) {
  const [channel, select] = useState<Channel>("data-analysis");
  return (
    <ChatContext.Provider value={{ channel, select }}>
      {children}
    </ChatContext.Provider>
  );
}

export function ChannelButton({
  channel,
  children,
  className,
  ...props
}: LayerProps & { channel: Channel }) {
  const chat = useContext(ChatContext);
  return (
    <button
      {...props}
      type="button"
      className={`${className} ${styles.control} ${styles.channelButton}`}
      aria-label={`Open ${channel} channel`}
      aria-pressed={chat.channel === channel}
      onClick={() => chat.select(channel)}
    >
      {children}
    </button>
  );
}

export function ChannelHeading({ prefix = "" }: { prefix?: string }) {
  return (
    <>
      {prefix}
      {useContext(ChatContext).channel}
    </>
  );
}

export function ChannelMessages({ children }: { children: ReactNode }) {
  const { channel } = useContext(ChatContext);
  if (channel === "data-analysis") return children;
  return (
    <div className={styles.salesConversation}>
      <div className={styles.sampleMessage}>
        <strong>
          Max <small>3:12 PM</small>
        </strong>
        <p>
          <span>@Databot</span> Which opportunities need a follow-up this week?
        </p>
      </div>
      <div className={styles.sampleMessage}>
        <strong>
          Databot <small>3:13 PM</small>
        </strong>
        <p>
          Three opportunities have no next step. Start with the two proposals
          awaiting feedback, then follow up on the new demo request.
        </p>
      </div>
      <DemoThread
        label="Open sales follow-up thread"
        reply="A useful follow-up includes the last conversation, the decision needed, and a suggested next meeting."
      >
        <span>View follow-up thread</span>
      </DemoThread>
    </div>
  );
}

export function DemoThread({
  children,
  className,
  label,
  reply,
  ...props
}: LayerProps & { label: string; reply: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={styles.thread}>
      <button
        {...props}
        type="button"
        className={`${className ?? ""} ${styles.control} ${styles.threadButton}`}
        aria-label={label}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {children}
      </button>
      {open && (
        <section
          id={id}
          className={styles.threadPanel}
          aria-label="Example conversation thread"
        >
          <strong>Databot</strong>
          <p>{reply}</p>
          <DemoComposer label="Thread reply" />
        </section>
      )}
    </div>
  );
}

export function EmailPreview({
  children,
  className,
  label,
  body,
  ...props
}: LayerProps & { label: string; body: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div {...props} className={`${className} ${styles.emailRow}`}>
      <button
        type="button"
        className={styles.emailSummary}
        aria-label={label}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {children}
      </button>
      {open && (
        <p id={id} className={styles.emailBody}>
          {body}
        </p>
      )}
    </div>
  );
}

export function EmailAction({
  children,
  className,
  action,
  ...props
}: LayerProps & { action: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <button
        {...props}
        type="button"
        className={`${className} ${styles.control}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {children}
      </button>
      {open && (
        <section
          id={id}
          className={styles.emailReply}
          aria-label={`${action} draft`}
        >
          <div className={styles.replyHeading}>
            <strong>{action}</strong>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={`Close ${action.toLowerCase()} draft`}
            >
              ×
            </button>
          </div>
          <DemoComposer label={`Email ${action.toLowerCase()}`} draft />
        </section>
      )}
    </>
  );
}

/** Local demo state only. No network requests, accounts, or external delivery. */
export function DemoComposer({
  label,
  draft = false,
  imessage = false,
}: {
  label: string;
  draft?: boolean;
  imessage?: boolean;
}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);
  const nextMessageId = useRef(0);
  const id = useId();
  return (
    <div className={styles.composer} data-imessage={imessage}>
      {messages.length > 0 && (
        <div
          className={styles.localMessages}
          role="log"
          aria-label={`${label} demo messages`}
          aria-live="polite"
        >
          {messages.map((message) => (
            <p key={message.id}>
              <small>{draft ? "Draft saved in this demo" : "You · Demo"}</small>
              {message.text}
            </p>
          ))}
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const message = text.trim();
          if (!message) return;
          const entry = { id: nextMessageId.current++, text: message };
          setMessages((current) => [...current.slice(-3), entry]);
          setText("");
        }}
      >
        <label className={styles.srOnly} htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={draft ? "Write a demo reply…" : "Try a demo message…"}
          maxLength={500}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          aria-label={
            draft
              ? `Save ${label.toLowerCase()} draft`
              : `Add message to ${label} demo`
          }
        >
          {draft ? "Save draft" : "↑"}
        </button>
      </form>
    </div>
  );
}
