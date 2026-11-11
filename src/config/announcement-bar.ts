export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * One offer announcement for the bar above the header.
 * `message` is the visible sentence. `modelName` is optional and is not shown.
 * Leave `liveMessage` empty to hide the bar when the countdown ends.
 */
export type AnnouncementBarConfig = {
  enabled: boolean;
  id: string;
  message: string;
  modelName?: string;
  /** ISO-8601 timestamp with a timezone offset. */
  targetTime: string;
  ctaLabel: string;
  ctaHref: string;
  liveMessage?: string;
};

export const announcementBar: AnnouncementBarConfig = {
  enabled: true,
  id: "discount-63-placeholder",
  message: "Get 63% off now",
  modelName: "",
  // PLACEHOLDER. A few days after 2026-11-11. Julian replaces the real end time.
  targetTime: "2026-11-15T09:00:00-05:00",
  ctaLabel: "See pricing",
  ctaHref: "/pricing?ref=announcement-bar",
  // Empty hides the bar at zero. A sentence here would replace the countdown.
  liveMessage: "",
};

export function announcementStorageKey(id: string) {
  return `innflow-announcement:${id}`;
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

/** Runs before paint so a dismissed or ended offer does not flash. */
export function offerBarBootScript(config: AnnouncementBarConfig) {
  const key = JSON.stringify(announcementStorageKey(config.id));
  const target = JSON.stringify(config.targetTime);
  const hideWhenEnded = config.liveMessage ? "false" : "true";
  return `try{var k=${key};var t=Date.parse(${target});var ended=${hideWhenEnded}&&!Number.isNaN(t)&&Date.now()>=t;if(localStorage.getItem(k)==="dismissed"||ended)document.documentElement.setAttribute("data-offer-bar","hidden");}catch(e){}`;
}
