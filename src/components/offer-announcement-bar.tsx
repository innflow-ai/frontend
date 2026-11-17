"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useState } from "react";
import { BotIcon } from "@/components/icons/bot-icon";
import {
  ANNOUNCEMENT_DISMISSED_VALUE,
  type AnnouncementBarConfig,
  announcementModelName,
  announcementStorageKey,
  type CountdownParts,
  countdownMinuteLabel,
  countdownParts,
  announcementBar as defaultConfig,
} from "@/config/announcement-bar";
import styles from "./offer-announcement-bar.module.css";

const pendingParts: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function OfferAnnouncementBar({
  config = defaultConfig,
}: {
  config?: AnnouncementBarConfig;
}) {
  const [parts, setParts] = useState<CountdownParts | null | "pending">(
    "pending",
  );
  const [dismissed, setDismissed] = useState(false);
  const [minuteLabel, setMinuteLabel] = useState("");

  useEffect(() => {
    if (!config.enabled) return;
    let stored = false;
    try {
      stored =
        localStorage.getItem(announcementStorageKey(config.id)) ===
        ANNOUNCEMENT_DISMISSED_VALUE;
    } catch {
      stored = false;
    }
    if (stored) {
      hideOfferBar();
      setDismissed(true);
      return;
    }

    const target = Date.parse(config.targetTime);
    let lastMinute = "";
    let stopped = false;
    const tick = () => {
      if (stopped) return;
      const next = countdownParts(target, Date.now());
      if (!next) {
        stopped = true;
        if (!config.liveMessage) hideOfferBar();
        setParts(null);
        return;
      }
      const minute = `${next.days}:${next.hours}:${next.minutes}`;
      if (minute !== lastMinute) {
        lastMinute = minute;
        setMinuteLabel(countdownMinuteLabel(next));
      }
      setParts(next);
    };
    tick();
    if (stopped) return;
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [config]);

  const offerVisible = config.enabled && !dismissed && parts !== null;
  useEffect(() => {
    if (!offerVisible) {
      document.documentElement.style.removeProperty("--announcement-h");
      return;
    }
    const sync = () => {
      const bar = document.querySelector("[data-offer-bar-slot]");
      const height = bar?.getBoundingClientRect().height ?? 44;
      const remaining = Math.max(0, Math.round(height - window.scrollY));
      document.documentElement.style.setProperty(
        "--announcement-h",
        `${remaining}px`,
      );
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.documentElement.style.removeProperty("--announcement-h");
    };
  }, [offerVisible]);

  if (!config.enabled || dismissed) return null;
  const modelName = announcementModelName(config.modelName);
  if (parts === null) {
    if (!config.liveMessage) return null;
    return (
      <OfferShell
        config={config}
        label={config.liveMessage}
        onDismiss={() => dismissOffer(config.id, setDismissed)}
      >
        <p className={styles.message}>{config.liveMessage}</p>
      </OfferShell>
    );
  }

  const ready = parts !== "pending";
  const shown = ready ? parts : pendingParts;
  return (
    <OfferShell
      config={config}
      label={config.message}
      onDismiss={() => dismissOffer(config.id, setDismissed)}
    >
      <div className={styles.offer}>
        <Image
          className={styles.alarm}
          src="/brand/announcement/alarm.svg"
          alt=""
          width={14}
          height={14}
          unoptimized
        />
        <p className={styles.headline}>{config.message}</p>
        <p className={styles.caption}>ends in</p>
        <Countdown parts={shown} ready={ready} />
      </div>
      <a className={styles.cta} href={config.ctaHref}>
        {config.ctaLabel}
        <Image
          src="/brand/announcement/arrow.svg"
          alt=""
          width={12}
          height={12}
          unoptimized
        />
      </a>
      {modelName ? (
        <p className={styles.model}>
          <Image
            src="/brand/announcement/spark.svg"
            alt=""
            width={12}
            height={12}
            unoptimized
          />
          <span className={styles.modelTag}>NEW</span>
          <span className={styles.modelBot}>
            <BotIcon size={11} />
          </span>
          <span>{modelName}</span>
          <Image
            src="/brand/announcement/spark.svg"
            alt=""
            width={12}
            height={12}
            unoptimized
          />
        </p>
      ) : null}
      <p className={styles.live} aria-live="polite">
        {minuteLabel}
      </p>
    </OfferShell>
  );
}

function OfferShell({
  config,
  label,
  onDismiss,
  children,
}: {
  config: AnnouncementBarConfig;
  label: string;
  onDismiss: () => void;
  children: ReactNode;
}) {
  return (
    <aside
      className={styles.bar}
      data-offer-bar-slot=""
      data-announcement-id={config.id}
      aria-label={label}
    >
      {children}
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss announcement"
        onClick={onDismiss}
      >
        <Image
          src="/brand/announcement/close.svg"
          alt=""
          width={12}
          height={12}
          unoptimized
        />
      </button>
    </aside>
  );
}

function Countdown({
  parts,
  ready,
}: {
  parts: CountdownParts;
  ready: boolean;
}) {
  return (
    <p
      className={styles.timer}
      role="timer"
      data-ready={ready ? "true" : "false"}
    >
      <Digit value={parts.days} suffix="d" />
      <span className={styles.colon} aria-hidden="true">
        :
      </span>
      <Digit value={parts.hours} suffix="h" />
      <span className={styles.colon} aria-hidden="true">
        :
      </span>
      <Digit value={parts.minutes} suffix="m" />
      <span className={`${styles.colon} ${styles.seconds}`} aria-hidden="true">
        :
      </span>
      <span className={styles.seconds} aria-hidden="true">
        <Digit value={parts.seconds} />
      </span>
    </p>
  );
}

function Digit({ value, suffix }: { value: number; suffix?: string }) {
  return (
    <>
      <span className={styles.digit}>{String(value).padStart(2, "0")}</span>
      {suffix ? (
        <span className={styles.suffix} aria-hidden="true">
          {suffix}
        </span>
      ) : null}
    </>
  );
}

function hideOfferBar() {
  document.documentElement.setAttribute("data-offer-bar", "hidden");
  document.documentElement.style.removeProperty("--announcement-h");
}

function dismissOffer(id: string, setDismissed: (dismissed: boolean) => void) {
  try {
    localStorage.setItem(
      announcementStorageKey(id),
      ANNOUNCEMENT_DISMISSED_VALUE,
    );
  } catch {
    // Private browsing can block storage. The bar still closes for this view.
  }
  hideOfferBar();
  setDismissed(true);
  document
    .querySelector<HTMLAnchorElement>('a[aria-label="innflow home"]')
    ?.focus();
}
