/**
 * Figma `1fbFIPN1GfSkioiOSUZMaV`: desktop `74:48960`, mobile `74:48980`.
 * Subscribe fill is the `--email-subscribe` token, pending Julian.
 */
export const emailCaptureCopy = {
  headline: "Get the weekly agent playbook.",
  subcopy: "Workflows and templates, weekly.",
  emailLabel: "Email address",
  emailPlaceholder: "What’s your work email?",
  submitLabel: "Subscribe",
  pendingLabel: "Sending…",
  success: "You’re on the list.",
  playbookTitle: "The Agent Playbook",
  playbookCaption: "Workflows, templates & launches · weekly",
} as const;

export const emailCapture = {
  /** Bottom-left newsletter card. The only popup. */
  enabled: true,
};

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
