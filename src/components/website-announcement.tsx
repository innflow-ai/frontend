"use client";
import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  announcementIdentity,
  announcementState,
  remainingSeconds,
  type WebsiteAnnouncement,
} from "@/config/website-announcement";
import { captureMarketingEvent } from "@/lib/analytics";
import { ChevronRight } from "./icons/mage/ChevronRight";
import { PromoCodeButton } from "./promo-code-button";
import { SaleBadge } from "./sale-badge";
import styles from "./website-announcement.module.css";

function PromotionMarquee({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const row = rowRef.current;
    if (!viewport || !row || typeof ResizeObserver === "undefined") return;

    const measure = () => {
      const available = viewport.clientWidth;
      const width = row.getBoundingClientRect().width;
      const pixelsPerSecond = 42;
      row.style.setProperty("--travel-time", `${(available + width) / pixelsPerSecond}s`);
      // Start with the offer visible on the first pass.
      row.style.setProperty("--start-offset", `${-available / pixelsPerSecond}s`);
      viewport.toggleAttribute("data-overflow", width > available + 1);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(row);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={viewportRef} className={styles.promoViewport}>
      <div ref={rowRef} className={styles.promotion}>{children}</div>
    </div>
  );
}

export function WebsiteAnnouncementBar({
  config,
  initialNow,
}: {
  config: WebsiteAnnouncement;
  initialNow: number;
}) {
  const [now, setNow] = useState(initialNow);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [failedIcon, setFailedIcon] = useState("");
  const bar = useRef<HTMLElement>(null);
  const key = `innflow:announcement:dismissed:${announcementIdentity(config)}`;
  const state = announcementState(config, now);
  const visible = state.visible && !dismissed;
  useEffect(() => {
    let closed = false;
    try {
      closed = !config.pinned && localStorage.getItem(key) === "1";
    } catch {}
    setDismissed(closed);
    setReady(true);
    let timer: ReturnType<typeof setInterval> | undefined;
    const tick = () => {
      const time = Date.now();
      setNow(time);
      if (!config.offer || time >= Date.parse(config.offer.targetTime))
        clearInterval(timer);
    };
    if (config.offer && Date.now() < Date.parse(config.offer.targetTime))
      timer = setInterval(tick, 1000);
    tick();
    const resume = () => {
      if (document.visibilityState === "visible") tick();
    };
    window.addEventListener("focus", tick);
    document.addEventListener("visibilitychange", resume);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", tick);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [config, key]);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.websiteAnnouncement = visible ? "visible" : "hidden";
    root.dataset.websiteOffer = state.offer ? "active" : "inactive";
    const sync = () =>
      root.style.setProperty(
        "--announcement-h",
        `${visible ? Math.max(0, bar.current?.getBoundingClientRect().bottom ?? 0) : 0}px`,
      );
    sync();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(sync)
        : undefined;
    if (bar.current) observer?.observe(bar.current);
    if (!config.pinned) window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      root.style.removeProperty("--announcement-h");
      delete root.dataset.websiteAnnouncement;
      delete root.dataset.websiteOffer;
    };
  }, [visible, state.offer, config.pinned]);
  const previouslyFocused = useRef(false);
  useEffect(() => {
    if (!visible && previouslyFocused.current)
      document
        .querySelector<HTMLAnchorElement>('a[aria-label="innflow home"]')
        ?.focus();
  }, [visible]);
  if (!visible) return null;
  const { offer, model } = state;
  const seconds = offer ? remainingSeconds(offer.targetTime, now) : 0;
  const units = [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
  const deadline = offer
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "long",
        timeZone: offer.displayTimeZone,
      }).format(new Date(offer.targetTime))
    : "";
  const trackAction = (destination: string) => {
    try {
      captureMarketingEvent("marketing_cta_clicked", {
        placement: "announcement_bar",
        campaign_id: config.id,
        destination,
        route: window.location.pathname,
      });
    } catch {}
  };
  return (
    <aside
      ref={bar}
      className={styles.bar}
      data-pinned={config.pinned || undefined}
      data-promo={offer?.promoCode ? "" : undefined}
      data-pink-promo={offer?.badgeLabel ? "" : undefined}
      aria-label="Innflow announcement"
      data-website-announcement-slot=""
      onFocusCapture={() => {
        previouslyFocused.current = true;
      }}
      onBlurCapture={(event) => {
        previouslyFocused.current =
          !!event.relatedTarget &&
          event.currentTarget.contains(event.relatedTarget as Node);
      }}
    >
      {offer?.promoCode && (
        <PromotionMarquee>
          <a href={offer.action.href} onClick={() => trackAction(offer.action.href)}>
            {offer.badgeLabel ? <SaleBadge label={offer.badgeLabel} /> : (
              <Image src="/brand/announcement/tag.svg" width={13} height={13} alt="" />
            )}
            <strong>{offer.qualifier && <><small>{offer.qualifier}</small>{" "}</>}{offer.message}</strong>
          </a>
          <span className={styles.codeGroup}>
            <small>{offer.planScope && `${offer.planScope} `}with code</small>{" "}
            <PromoCodeButton code={offer.promoCode} />
          </span>
          <span className={styles.ends} role="timer" aria-label={`Offer ends ${deadline}`}>
            <small>expires:</small>
            <strong className={styles.countdownValue}>
              {ready
                ? ["d", "h", "m", "s"].map((suffix, i) => (
                    <span key={suffix}>
                      {i > 0 && " "}{String(units[i]).padStart(i === 0 ? 1 : 2, "0")}
                      <span className={styles.countdownUnit}>{suffix}</span>
                    </span>
                  ))
                : "…"}
            </strong>
          </span>
          <a href={offer.action.href} aria-label={offer.action.label} onClick={() => trackAction(offer.action.href)}>
            <ChevronRight size={16} />
          </a>
        </PromotionMarquee>
      )}
      {offer && !offer.promoCode && (
        <div className={styles.offer}>
          <a
            href={offer.action.href}
            aria-label={`${offer.action.label}: ${offer.message}`}
            className={styles.offerMessage}
            onClick={() => trackAction(offer.action.href)}
          >
            {offer.message.toUpperCase() === "LIMITED OFFER" ? (
              <>
                <strong>LIMITED</strong>
                <Image
                  src="/brand/announcement/alarm-clock.svg"
                  alt=""
                  width={22}
                  height={22}
                />
                <strong>OFFER</strong>
              </>
            ) : (
              <>
                <Image
                  src="/brand/announcement/alarm-clock.svg"
                  alt=""
                  width={22}
                  height={22}
                />
                <strong
                  className={
                    offer.mobileMessage ? styles.desktopMessage : undefined
                  }
                >
                  {offer.message}
                </strong>
                {offer.mobileMessage && (
                  <strong className={styles.mobileMessage}>
                    {offer.mobileMessage}
                  </strong>
                )}
              </>
            )}
          </a>
          <span className={styles.expires}>expires:</span>
          <button
            className={styles.toggle}
            type="button"
            aria-label={fixed ? "Show countdown" : "Show deadline"}
            title={
              fixed
                ? "Show countdown"
                : `Offer ends ${deadline}. Click to show deadline.`
            }
            onClick={() => setFixed(!fixed)}
          >
            {fixed ? (
              <time dateTime={offer.targetTime}>{deadline}</time>
            ) : (
              <span
                role="timer"
                aria-label={`Offer ends ${deadline}`}
                aria-live="off"
                className={styles.timer}
              >
                <span aria-hidden="true">
                  {ready
                    ? units
                        .map((unit) => String(unit).padStart(2, "0"))
                        .join(":")
                    : "--:--:--:--"}
                </span>
              </span>
            )}
          </button>
        </div>
      )}
      {model && (
        <div className={styles.model}>
          <Image
            src="/brand/announcement/sparkle.svg"
            alt=""
            width={14}
            height={14}
          />
          <span className={styles.new}>NEW</span>
          {failedIcon !== model.iconSrc && (
            /* biome-ignore lint/performance/noImgElement: Dynamic CMS provider icon has an error fallback. */
            <img
              src={model.iconSrc}
              alt=""
              width={18}
              height={18}
              onError={() => setFailedIcon(model.iconSrc)}
            />
          )}
          {model.action ? (
            <a
              href={model.action.href}
              aria-label={`${model.action.label}: ${model.name}`}
              onClick={(event) => trackAction(event.currentTarget.href)}
            >
              <strong>{model.name}</strong>
            </a>
          ) : (
            <strong>{model.name}</strong>
          )}
          <span className={styles.exclusive}>
            - Exclusive on <b>innflow</b>
          </span>
          <Image
            src="/brand/announcement/sparkle-end.svg"
            alt=""
            width={15}
            height={15}
          />
        </div>
      )}
      {config.supportingCopy && (
        <span className={styles.supporting}>{config.supportingCopy}</span>
      )}
      {!config.pinned && (
        <button
          className={styles.dismiss}
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            try {
              localStorage.setItem(key, "1");
            } catch {}
            setDismissed(true);
          }}
        >
          ×
        </button>
      )}
    </aside>
  );
}
