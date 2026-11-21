export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * One offer announcement for the bar above the header.
 * `message` is the offer headline. `modelName` is optional.
 * A blank name, or the design placeholder "[Model name]", stays hidden.
 * Leave `liveMessage` empty to hide the bar when the countdown ends.
 */
export type AnnouncementBarConfig = {
  enabled: boolean;
  id: string;
  message: string;
  modelName?: string;
  /**
   * ISO-8601 timestamp with an explicit Eastern Time offset.
   * America/New_York and America/Toronto share this offset.
   */
  targetTime: string;
  ctaLabel: string;
  ctaHref: string;
  liveMessage?: string;
};

export const ANNOUNCEMENT_DISMISSED_VALUE = "1";

export const announcementBar: AnnouncementBarConfig = {
  enabled: false,
  id: "discount-63-placeholder",
  message: "Get 63% off now",
  modelName: "",
  // PLACEHOLDER. A few days after 2026-11-11, written in Eastern Time.
  // November is standard time, so New York and Toronto are UTC−05:00.
  // Launch stays off until Julian confirms 63% applies at checkout.
  targetTime: "2026-11-15T09:00:00-05:00",
  ctaLabel: "Claim 63% off",
  ctaHref: "/pricing?ref=announcement-bar",
  // Empty hides the bar at zero. The countdown does not restart.
  liveMessage: "",
};

export function announcementStorageKey(id: string) {
  return `innflow:announcement:dismissed:${id}`;
}

/** Hide the design placeholder and any unset model name. */
export function announcementModelName(name: string | undefined) {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) return null;
  const bare = trimmed.replaceAll("[", "").replaceAll("]", "").trim();
  if (bare.toLowerCase() === "model name") return null;
  return trimmed;
}

export function countdownParts(
  targetMs: number,
  nowMs: number,
): CountdownParts | null {
  if (!Number.isFinite(targetMs) || !Number.isFinite(nowMs)) return null;
  const total = Math.floor((targetMs - nowMs) / 1000);
  if (total <= 0) return null;
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function countdownMinuteLabel(parts: CountdownParts) {
  const days = parts.days === 1 ? "1 day" : `${parts.days} days`;
  const hours = parts.hours === 1 ? "1 hour" : `${parts.hours} hours`;
  const minutes = parts.minutes === 1 ? "1 minute" : `${parts.minutes} minutes`;
  return `Offer ends in ${days} ${hours} ${minutes}`;
}

/** Runs before paint so a dismissed or ended offer does not flash. */
export function offerBarBootScript(config: AnnouncementBarConfig) {
  const key = JSON.stringify(announcementStorageKey(config.id));
  const target = JSON.stringify(config.targetTime);
  const hideWhenEnded = config.liveMessage ? "false" : "true";
  const dismissed = JSON.stringify(ANNOUNCEMENT_DISMISSED_VALUE);
  return `try{var k=${key};var t=Date.parse(${target});var ended=${hideWhenEnded}&&!Number.isNaN(t)&&Date.now()>=t;if(localStorage.getItem(k)===${dismissed}||ended){document.documentElement.setAttribute("data-offer-bar","hidden");}else{document.documentElement.style.setProperty("--announcement-h","44px");}}catch(e){}`;
}
