export type AnnouncementAction = { label: string; href: string };
export type WebsiteAnnouncement = {
  enabled: boolean;
  id: string;
  supportingCopy?: string;
  offer?: {
    message: string;
    mobileMessage?: string;
    startsAt?: string;
    targetTime: string;
    displayTimeZone: string;
    action: AnnouncementAction;
  };
  modelRelease?: {
    id: string;
    name: string;
    iconSrc: string;
    action?: AnnouncementAction;
  };
};
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
export function safeAnnouncementHref(v: unknown) {
  const s = text(v);
  return (/^\/(?!\/)/.test(s) && !/[\\\s]/.test(s)) ||
    /^https:\/\/[^\s\\]+$/i.test(s)
    ? s
    : undefined;
}
function action(v: unknown): AnnouncementAction | undefined {
  if (!v || typeof v !== "object") return;
  const a = v as Record<string, unknown>;
  const href = safeAnnouncementHref(a.href);
  if (text(a.label) && href) return { label: text(a.label), href };
}
export function normalizeAnnouncement(
  value: unknown,
): WebsiteAnnouncement | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (v.enabled !== true || !text(v.id)) return null;
  const result: WebsiteAnnouncement = {
    enabled: true,
    id: text(v.id),
    supportingCopy: text(v.supportingCopy),
  };
  if (v.offer && typeof v.offer === "object") {
    const o = v.offer as Record<string, unknown>;
    const cta = action(o.action);
    const end = Date.parse(text(o.targetTime));
    const start = text(o.startsAt);
    const zone = text(o.displayTimeZone) || "America/New_York";
    let validZone = true;
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: zone });
    } catch {
      validZone = false;
    }
    if (
      text(o.message) &&
      cta &&
      Number.isFinite(end) &&
      /(?:Z|[+-]\d{2}:\d{2})$/.test(text(o.targetTime)) &&
      (!start ||
        (Number.isFinite(Date.parse(start)) && Date.parse(start) < end)) &&
      validZone
    ) {
      result.offer = {
        message: text(o.message),
        mobileMessage: text(o.mobileMessage),
        targetTime: text(o.targetTime),
        startsAt: start || undefined,
        displayTimeZone: zone,
        action: cta,
      };
    }
  }
  if (v.modelRelease && typeof v.modelRelease === "object") {
    const m = v.modelRelease as Record<string, unknown>;
    const icon = safeAnnouncementHref(m.iconSrc);
    if (text(m.id) && text(m.name) && icon)
      result.modelRelease = {
        id: text(m.id),
        name: text(m.name),
        iconSrc: icon,
        action: action(m.action),
      };
  }
  return result.offer || result.modelRelease ? result : null;
}
export function announcementIdentity(config: WebsiteAnnouncement) {
  return JSON.stringify([config.id, config.modelRelease?.id ?? ""]);
}
export function announcementState(config: WebsiteAnnouncement, now: number) {
  const offer =
    config.enabled &&
    config.offer &&
    (!config.offer.startsAt || Date.parse(config.offer.startsAt) <= now) &&
    Date.parse(config.offer.targetTime) > now
      ? config.offer
      : undefined;
  const model = config.enabled ? config.modelRelease : undefined;
  return { offer, model, visible: Boolean(offer || model) };
}
export function remainingSeconds(deadline: string, now: number) {
  return Math.max(0, Math.ceil((Date.parse(deadline) - now) / 1000));
}

/** Serialized data is escaped for an inline script, including CMS-authored IDs. */
export function websiteAnnouncementBootScript(config: WebsiteAnnouncement) {
  const payload = JSON.stringify({
    key: `innflow:announcement:dismissed:${announcementIdentity(config)}`,
    enabled: config.enabled,
    model: Boolean(config.modelRelease),
    start: config.offer?.startsAt ? Date.parse(config.offer.startsAt) : 0,
    end: config.offer ? Date.parse(config.offer.targetTime) : 0,
  }).replaceAll("<", "\\u003c");
  return `(()=>{var c=${payload},n=Date.now(),d=false;try{d=localStorage.getItem(c.key)==="1"}catch(e){}var o=c.enabled&&n>=c.start&&n<c.end;document.documentElement.dataset.websiteOffer=o?"active":"inactive";document.documentElement.dataset.websiteAnnouncement=c.enabled&&!d&&(o||c.model)?"visible":"hidden"})()`;
}
