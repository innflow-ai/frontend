"use client";

import type { BeforeSendFn, CaptureResult, PostHog } from "posthog-js";
import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import {
  EXPERIENCE_KEY,
  type ExperienceVariant,
  experienceProperties,
  isVariant,
} from "@/lib/marketing-experience";
import {
  captureExperience,
  clearExperience,
  mirrorExperienceConsent,
} from "@/lib/marketing-experience-client";

const consentStorageKey = "innflow-cookie-consent";

function isSiteOwnedScript(filename: unknown): boolean {
  if (typeof filename !== "string" || filename.length === 0) {
    return false;
  }
  // The site serves its own scripts from this origin, so a site-owned frame is
  // either an absolute URL on this origin or a root-relative path.
  return (
    filename.startsWith(`${window.location.origin}/`) ||
    (filename.startsWith("/") && !filename.startsWith("//"))
  );
}

function hasSiteOwnedFrame(event: CaptureResult): boolean {
  const exceptions = event.properties?.$exception_list;
  if (!Array.isArray(exceptions)) {
    return false;
  }

  return exceptions.some((exception) => {
    const frames = (exception as { stacktrace?: { frames?: unknown } })
      ?.stacktrace?.frames;
    return (
      Array.isArray(frames) &&
      frames.some((frame) =>
        isSiteOwnedScript((frame as { filename?: unknown })?.filename),
      )
    );
  });
}

// Drops exceptions that no site-owned script raised. Third-party scripts, such
// as the in-app browser bridge that Facebook injects, throw errors on our pages
// that are not our bug, so we do not capture them.
export const dropThirdPartyExceptions: BeforeSendFn = (event) => {
  if (event?.event === "$exception" && !hasSiteOwnedFrame(event)) {
    return null;
  }
  return event;
};

type TermlyConsentState = {
  analytics?: boolean;
};

type TermlyConsentEvent = {
  categories?: string[];
};

type TermlyClient = {
  getConsentState: () => TermlyConsentState;
  on: (
    event: "initialized" | "consent",
    callback: (data: TermlyConsentEvent) => void,
  ) => void;
};

declare global {
  interface Window {
    posthog?: PostHog;
    Termly?: TermlyClient;
  }
}

let postHogClientPromise: Promise<typeof import("posthog-js").default> | null =
  null;

async function getPostHogClient() {
  const posthogKey = siteConfig.analytics.posthogKey;
  if (!posthogKey) {
    throw new Error("PostHog project key is not configured");
  }

  if (!postHogClientPromise) {
    postHogClientPromise = import("posthog-js").then(({ default: posthog }) => {
      if (!analyticsGranted) {
        postHogClientPromise = null;
        return posthog;
      }
      if (!posthog.__loaded) {
        posthog.init(posthogKey, {
          api_host: siteConfig.analytics.posthogHost,
          ui_host: "https://us.posthog.com",
          defaults: "2026-05-30",
          capture_exceptions: true,
          before_send: dropThirdPartyExceptions,
          capture_performance: {
            web_vitals: true,
          },
          session_recording: {
            maskAllInputs: true,
          },
          person_profiles: "identified_only",
          before_send: (event) => {
            // PostHog's separately evaluated flag must not overwrite our rendered assignment.
            const variant = posthog.get_property(`$feature/${EXPERIENCE_KEY}`);
            if (
              event &&
              posthog.get_property("experiment_version") === EXPERIENCE_KEY &&
              isVariant(variant)
            )
              Object.assign(event.properties, experienceProperties(variant));
            return event;
          },
        });
      }

      window.posthog = posthog;
      return posthog;
    });
  }

  return postHogClientPromise;
}

function storeConsent(granted: boolean) {
  try {
    window.localStorage.setItem(
      consentStorageKey,
      granted ? "analytics" : "denied",
    );
  } catch {
    // Analytics remains disabled when browser storage is unavailable.
  }
}

let analyticsGranted = false;
let consentRevision = 0;
function applyAnalyticsConsent(
  granted: boolean,
  experience?: { variant: ExperienceVariant | null; measure: boolean },
) {
  analyticsGranted = granted;
  const revision = ++consentRevision;
  if (experience?.variant) mirrorExperienceConsent(granted);
  storeConsent(granted);

  if (granted) {
    void getPostHogClient()
      .then(async (posthog) => {
        if (revision !== consentRevision) return;
        if (posthog.has_opted_out_capturing()) {
          posthog.opt_in_capturing();
          posthog.capture("$pageview");
          posthog.startSessionRecording();
        }
        if (experience?.measure && experience.variant)
          await captureExperience(posthog, experience.variant);
        else if (experience) clearExperience(posthog);
      })
      .catch(() => {});
    return;
  }

  if (postHogClientPromise) {
    void postHogClientPromise.then((posthog) => {
      if (experience) clearExperience(posthog);
      posthog.stopSessionRecording();
      posthog.opt_out_capturing();
    });
  }
}

function termlyAnalyticsConsent(termly: TermlyClient) {
  try {
    return termly.getConsentState().analytics === true;
  } catch {
    return false;
  }
}

export function PostHogObservability({
  experience,
}: {
  experience?: { variant: ExperienceVariant | null; measure: boolean };
} = {}) {
  useEffect(() => {
    if (!siteConfig.analytics.posthogKey) return;

    let termlyAttached = false;
    let attempts = 0;

    const attachTermly = () => {
      const termly = window.Termly;
      if (!termly || termlyAttached) return false;

      termlyAttached = true;
      termly.on("initialized", () => {
        applyAnalyticsConsent(termlyAnalyticsConsent(termly), experience);
      });
      termly.on("consent", (data) => {
        applyAnalyticsConsent(
          data.categories?.includes("analytics") === true,
          experience,
        );
      });
      applyAnalyticsConsent(termlyAnalyticsConsent(termly), experience);
      return true;
    };

    if (attachTermly()) return;

    const interval = window.setInterval(() => {
      attempts += 1;
      if (attachTermly() || attempts >= 100) {
        window.clearInterval(interval);
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [experience]);

  return null;
}
