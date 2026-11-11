import { announcementBar } from "@/config/announcement-bar";

/**
 * PLACEHOLDER copy until the designer sends exact specs.
 * Paper file `01M64EXWWY8RJHT2PWPEWV4ZFR`:
 * `PR-0` is the bottom-left email card. `R5-0` is the offer promo.
 * Figma `1fbFIPN1GfSkioiOSUZMaV`: newsletter `55:7853` / `55:8186`,
 * upsell `55:8045` / `55:8299`.
 */
export const emailCaptureCopy = {
  headline: "A note when it matters.",
  subcopy: "PLACEHOLDER. Product news, nothing extra.",
  emailLabel: "Email address",
  emailPlaceholder: "you@company.com",
  submitLabel: "Get updates",
  pendingLabel: "Sending…",
  success: "You’re on the list.",
  upsellSubcopy: "PLACEHOLDER. The offer details go here.",
} as const;

export type EmailCaptureVariant = "newsletter" | "upsell";

export const emailCapture = {
  /** PR-0, the bottom-left email card. This is the one that shows. */
  newsletterEnabled: true,
  /** R5-0, the offer promo. Off until Julian turns it on. */
  upsellEnabled: false,
  upsellHref: "/pricing?ref=email-capture",
};

/** Newsletter wins when both switches are on, so the two popups never share the screen. */
export function activeEmailCaptureVariant(
  config: { newsletterEnabled: boolean; upsellEnabled: boolean } = emailCapture,
): EmailCaptureVariant | null {
  if (config.newsletterEnabled) return "newsletter";
  if (config.upsellEnabled) return "upsell";
  return null;
}

export const EMAIL_CAPTURE_STORAGE_KEY = "innflow-email-capture";
export const EMAIL_CAPTURE_SESSION_KEY = "innflow-email-capture-session";
export const EMAIL_CAPTURE_SCROLL_RATIO = 0.4;
export const EMAIL_CAPTURE_DELAY_MS = 20_000;
export const EMAIL_CAPTURE_SUPPRESS_MS = 30 * 24 * 60 * 60 * 1000;

export type EmailCaptureRecord = {
  status: "dismissed" | "submitted";
  at: number;
};

export function isEmailCaptureExcluded(pathname: string) {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  return (
    path === "/pricing" ||
    path.startsWith("/pricing/") ||
    path === "/login" ||
    path.startsWith("/login/") ||
    path === "/signup" ||
    path.startsWith("/signup/") ||
    path === "/legal" ||
    path.startsWith("/legal/") ||
    path.includes("/checkout")
  );
}

export function emailCaptureScrollRatio(
  scrollY: number,
  innerHeight: number,
  scrollHeight: number,
) {
  const scrollable = scrollHeight - innerHeight;
  if (scrollable <= 0) return 0;
  return scrollY / scrollable;
}

export function readEmailCapture(
  raw: string | null,
): EmailCaptureRecord | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<EmailCaptureRecord>;
    if (
      (parsed.status !== "dismissed" && parsed.status !== "submitted") ||
      typeof parsed.at !== "number"
    ) {
      return null;
    }
    return { status: parsed.status, at: parsed.at };
  } catch {
    return null;
  }
}

/** Dismiss and submit both hide the card for 30 days. */
export function isEmailCaptureSuppressed(
  record: EmailCaptureRecord | null,
  now: number,
) {
  if (!record) return false;
  return now - record.at < EMAIL_CAPTURE_SUPPRESS_MS;
}

export function emailCaptureSeenThisSession(raw: string | null) {
  return raw === "1";
}

export function upsellOffer() {
  return {
    headline: announcementBar.message,
    subcopy: emailCaptureCopy.upsellSubcopy,
    ctaLabel: announcementBar.ctaLabel,
    ctaHref: emailCapture.upsellHref,
  };
}
