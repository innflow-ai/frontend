"use client";

import { usePathname } from "next/navigation";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BotIcon } from "@/components/icons/bot-icon";
import { Multiply as X } from "@/components/icons/mage/Multiply";
import {
  activeEmailCaptureVariant,
  EMAIL_CAPTURE_DELAY_MS,
  EMAIL_CAPTURE_SCROLL_RATIO,
  EMAIL_CAPTURE_SESSION_KEY,
  EMAIL_CAPTURE_STORAGE_KEY,
  type EmailCaptureRecord,
  type EmailCaptureVariant,
  emailCaptureCopy,
  emailCaptureScrollRatio,
  emailCaptureSeenThisSession,
  isEmailCaptureExcluded,
  isEmailCaptureSuppressed,
  readEmailCapture,
  upsellOffer,
} from "@/config/email-capture";
import { trackEmailCaptureSubmitted } from "@/lib/email-capture-analytics";
import { fixedBottomBannerHeight } from "@/lib/email-capture-placement";
import styles from "./email-capture-popup.module.css";

export function EmailCapturePopup({
  variant = activeEmailCaptureVariant() ?? "newsletter",
}: {
  variant?: EmailCaptureVariant;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const cardRef = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const reported = useRef(false);
  const stored = useRef<EmailCaptureRecord | null>(null);

  useEffect(() => {
    if (isEmailCaptureExcluded(pathname)) return;
    if (seenThisSession()) return;
    stored.current = readStored();
    if (isEmailCaptureSuppressed(stored.current, Date.now())) return;

    let opened = false;
    const show = () => {
      if (
        opened ||
        seenThisSession() ||
        isEmailCaptureSuppressed(readStored(), Date.now())
      ) {
        return;
      }
      opened = true;
      markSeenThisSession();
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
    const onScroll = () => {
      if (
        emailCaptureScrollRatio(
          window.scrollY,
          window.innerHeight,
          document.documentElement.scrollHeight,
        ) >= EMAIL_CAPTURE_SCROLL_RATIO
      ) {
        show();
      }
    };
    const timer = window.setTimeout(show, EMAIL_CAPTURE_DELAY_MS);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  const dismiss = useCallback(() => {
    if (stored.current?.status !== "submitted") {
      stored.current = writeRecord("dismissed");
    }
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      const card = cardRef.current;
      if (!card || event.key !== "Escape") return;
      if (!card.contains(document.activeElement)) return;
      event.preventDefault();
      dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dismiss, open]);

  useEffect(() => {
    if (!open) return;
    const place = () => {
      const card = cardRef.current;
      if (!card) return;
      const base = window.innerWidth <= 700 ? 12 : 20;
      card.style.bottom = `${base + fixedBottomBannerHeight()}px`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  if (!open || isEmailCaptureExcluded(pathname)) return null;

  const offer = upsellOffer();

  return (
    <aside
      ref={cardRef}
      className={styles.card}
      data-email-capture=""
      data-variant={variant}
      role="dialog"
      aria-modal="false"
      aria-labelledby="email-capture-title"
      aria-describedby="email-capture-copy"
      onFocus={(event) => {
        const previous = event.relatedTarget;
        if (
          !returnFocus.current &&
          previous instanceof HTMLElement &&
          !event.currentTarget.contains(previous)
        ) {
          returnFocus.current = previous;
        }
      }}
    >
      <button
        type="button"
        className={styles.close}
        aria-label="Dismiss email signup"
        onClick={dismiss}
      >
        <X size={16} aria-hidden="true" />
      </button>
      {variant === "newsletter" ? (
        <div className={styles.titleRow}>
          <BotIcon size={18} />
          <h2 id="email-capture-title" className={styles.headline}>
            {emailCaptureCopy.headline}
          </h2>
        </div>
      ) : (
        <h2 id="email-capture-title" className={styles.headline}>
          {offer.headline}
        </h2>
      )}
      <p id="email-capture-copy" className={styles.subcopy}>
        {variant === "upsell" ? offer.subcopy : emailCaptureCopy.subcopy}
      </p>
      {variant === "upsell" ? (
        <a
          className={styles.submit}
          href={offer.ctaHref}
          onClick={() => {
            stored.current = writeRecord("submitted");
          }}
        >
          {offer.ctaLabel}
        </a>
      ) : phase === "success" ? (
        <p className={styles.success} role="status">
          {emailCaptureCopy.success}
        </p>
      ) : (
        <form
          className={styles.form}
          onSubmit={(event) => {
            void submit(event, {
              reported,
              setPhase,
              setStatusMessage,
              onStored: (record) => {
                stored.current = record;
              },
            });
          }}
        >
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="email-capture-website">Website</label>
            <input
              id="email-capture-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label className={styles.label} htmlFor="email-capture-email">
            {emailCaptureCopy.emailLabel}
          </label>
          <input
            id="email-capture-email"
            className={styles.input}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={emailCaptureCopy.emailPlaceholder}
            required
            maxLength={254}
            aria-invalid={phase === "error"}
            aria-describedby={
              phase === "error" ? "email-capture-status" : undefined
            }
          />
          <button
            className={styles.submit}
            type="submit"
            disabled={phase === "pending"}
          >
            {phase === "pending"
              ? emailCaptureCopy.pendingLabel
              : emailCaptureCopy.submitLabel}
          </button>
          <p
            id="email-capture-status"
            className={styles.status}
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        </form>
      )}
    </aside>
  );
}

function readStored() {
  try {
    return readEmailCapture(localStorage.getItem(EMAIL_CAPTURE_STORAGE_KEY));
  } catch {
    return null;
  }
}

function seenThisSession() {
  try {
    return emailCaptureSeenThisSession(
      sessionStorage.getItem(EMAIL_CAPTURE_SESSION_KEY),
    );
  } catch {
    return false;
  }
}

function markSeenThisSession() {
  try {
    sessionStorage.setItem(EMAIL_CAPTURE_SESSION_KEY, "1");
  } catch {
    // The 30-day record still applies after dismiss or submit.
  }
}

function writeRecord(status: EmailCaptureRecord["status"]) {
  const record: EmailCaptureRecord = { status, at: Date.now() };
  try {
    localStorage.setItem(EMAIL_CAPTURE_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private browsing can block storage. The card still closes for this view.
  }
  return record;
}

async function submit(
  event: FormEvent<HTMLFormElement>,
  handlers: {
    reported: { current: boolean };
    setPhase: (phase: "pending" | "success" | "error") => void;
    setStatusMessage: (message: string) => void;
    onStored: (record: EmailCaptureRecord) => void;
  },
) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  handlers.setPhase("pending");
  handlers.setStatusMessage("");
  try {
    const response = await fetch("/api/email-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        website: data.get("website"),
        variant: "newsletter",
      }),
      signal: AbortSignal.timeout(25000),
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) {
      throw new Error(result.error || "Signup failed. Please try again.");
    }
    handlers.onStored(writeRecord("submitted"));
    handlers.setPhase("success");
    if (!handlers.reported.current) {
      handlers.reported.current = true;
      trackEmailCaptureSubmitted();
    }
  } catch (error) {
    handlers.setPhase("error");
    handlers.setStatusMessage(
      error instanceof Error && error.name !== "TimeoutError"
        ? error.message
        : "Signup failed. Please try again.",
    );
  }
}
