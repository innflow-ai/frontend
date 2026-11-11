"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Multiply as X } from "@/components/icons/mage/Multiply";
import {
  type AnnouncementBarConfig,
  announcementStorageKey,
  type CountdownParts,
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

  useEffect(() => {
    if (!config.enabled) return;
    let stored = false;
    try {
      stored =
        localStorage.getItem(announcementStorageKey(config.id)) === "dismissed";
    } catch {
      stored = false;
    }
    if (stored) {
      document.documentElement.setAttribute("data-offer-bar", "hidden");
      setDismissed(true);
      return;
    }

    const target = Date.parse(config.targetTime);
    const tick = () => {
      const next = countdownParts(target, Date.now());
      if (!next && !config.liveMessage) {
        document.documentElement.setAttribute("data-offer-bar", "hidden");
      }
      setParts(next);
    };
    tick();
    if (countdownParts(target, Date.now()) === null) return;
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [config]);

  if (!config.enabled || dismissed) return null;
  if (parts === null) {
    if (!config.liveMessage) return null;
    return (
      <OfferShell
        config={config}
        label={config.liveMessage}
        onDismiss={() => dismissOffer(config.id, setDismissed)}
      >
        <p className={styles.message}>{config.liveMessage}</p>
        <OfferCta config={config} />
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
      <p className={styles.message}>{config.message}</p>
      <Countdown parts={shown} ready={ready} />
      <OfferCta config={config} />
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
        aria-label="Dismiss offer"
        onClick={onDismiss}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </aside>
  );
}

function OfferCta({ config }: { config: AnnouncementBarConfig }) {
  return (
    <a className={styles.cta} href={config.ctaHref}>
      {config.ctaLabel}
    </a>
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
      data-ready={ready ? "true" : "false"}
      aria-hidden="true"
    >
      <Slot value={parts.days} unit="d" />
      <Slot value={parts.hours} unit="h" />
      <Slot value={parts.minutes} unit="m" />
      <Slot value={parts.seconds} unit="s" />
    </p>
  );
}

function Slot({ value, unit }: { value: number; unit: string }) {
  return (
    <span className={styles.slot}>
      <span className={styles.num}>{String(value).padStart(2, "0")}</span>
      <span className={styles.unit}>{unit}</span>
    </span>
  );
}

function dismissOffer(id: string, setDismissed: (dismissed: boolean) => void) {
  try {
    localStorage.setItem(announcementStorageKey(id), "dismissed");
  } catch {
    // Private browsing can block storage. The bar still closes for this view.
  }
  document.documentElement.setAttribute("data-offer-bar", "hidden");
  setDismissed(true);
  document
    .querySelector<HTMLAnchorElement>('a[aria-label="innflow home"]')
    ?.focus();
}
