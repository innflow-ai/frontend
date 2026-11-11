/** PLACEHOLDER copy until Julian and Freddy confirm the card.
 * Figma file `1fbFIPN1GfSkioiOSUZMaV`, page `55:7538`
 * (“Email capture and promo modal”).
 */
export const emailCaptureCopy = {
  headline: "A note when it matters.",
  subcopy: "PLACEHOLDER. Product news, nothing extra.",
  emailLabel: "Email address",
  emailPlaceholder: "you@company.com",
  submitLabel: "Get updates",
  pendingLabel: "Sending…",
  success: "You’re on the list.",
} as const;

export const EMAIL_CAPTURE_STORAGE_KEY = "innflow-email-capture";
export const EMAIL_CAPTURE_SCROLL_RATIO = 0.45;
export const EMAIL_CAPTURE_DELAY_MS = 20_000;
export const EMAIL_CAPTURE_DISMISS_MS = 14 * 24 * 60 * 60 * 1000;

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

export function isEmailCaptureSuppressed(
  record: EmailCaptureRecord | null,
  now: number,
) {
  if (!record) return false;
  if (record.status === "submitted") return true;
  return now - record.at < EMAIL_CAPTURE_DISMISS_MS;
}
