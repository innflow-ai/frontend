import type { PostHog } from "posthog-js";
import {
  CONSENT_COOKIE,
  cookieDomain,
  EXPERIENCE_KEY,
  type ExperienceVariant,
  experienceProperties,
  MAX_AGE,
} from "./marketing-experience";

export function mirrorExperienceConsent(granted: boolean) {
  const domain = cookieDomain(location.hostname);
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store is unavailable in supported browsers; this mirrors consent across subdomains.
  document.cookie = `${CONSENT_COOKIE}=${granted ? "granted" : "denied"}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}${domain ? `; Domain=${domain}` : ""}`;
  if (!granted)
    void fetch("/api/marketing-experience", {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
}

let lastExposure = "";
let handoff: Promise<unknown> = Promise.resolve();
export async function waitForExperienceHandoff() {
  await Promise.race([
    handoff,
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]);
}
export async function captureExperience(
  posthog: PostHog,
  variant: ExperienceVariant,
) {
  if (posthog.has_opted_out_capturing()) return;
  const distinctId = posthog.get_distinct_id();
  const key = `${distinctId}:${variant}:${location.pathname}`;
  handoff = fetch("/api/marketing-experience", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ distinctId }),
    keepalive: true,
  })
    .then((response) => {
      if (
        posthog.has_opted_out_capturing() ||
        !document.cookie.split("; ").includes(`${CONSENT_COOKIE}=granted`)
      ) {
        mirrorExperienceConsent(false);
        return;
      }
      if (response.status !== 200)
        throw new Error("Attribution handoff was not accepted");
      posthog.register(experienceProperties(variant));
      if (lastExposure !== key) {
        posthog.capture(
          "marketing_experience_viewed",
          { ...experienceProperties(variant), path: location.pathname },
          { send_instantly: true },
        );
        lastExposure = key;
      }
    })
    .catch(() => {
      if (
        !posthog.has_opted_out_capturing() &&
        document.cookie.split("; ").includes(`${CONSENT_COOKIE}=granted`)
      ) {
        posthog.capture(
          "marketing_experience_handoff_failed",
          experienceProperties(variant),
        );
      }
    });
  await handoff;
}

export function clearExperience(posthog: PostHog) {
  posthog.unregister(`$feature/${EXPERIENCE_KEY}`);
  posthog.unregister("experiment_version");
  lastExposure = "";
}
