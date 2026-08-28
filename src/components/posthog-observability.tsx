"use client";

import type { PostHog } from "posthog-js";
import { useEffect } from "react";
import { siteConfig } from "@/config/site";

const consentStorageKey = "innflow-cookie-consent";

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
      if (!posthog.__loaded) {
        posthog.init(posthogKey, {
          api_host: siteConfig.analytics.posthogHost,
          ui_host: "https://us.posthog.com",
          defaults: "2026-05-30",
          capture_exceptions: true,
          capture_performance: {
            web_vitals: true,
          },
          session_recording: {
            maskAllInputs: true,
          },
          person_profiles: "identified_only",
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

function applyAnalyticsConsent(granted: boolean) {
  storeConsent(granted);

  if (granted) {
    void getPostHogClient().then((posthog) => {
      if (posthog.has_opted_out_capturing()) {
        posthog.opt_in_capturing();
        posthog.capture("$pageview");
        posthog.startSessionRecording();
      }
    });
    return;
  }

  if (postHogClientPromise) {
    void postHogClientPromise.then((posthog) => {
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

export function PostHogObservability() {
  useEffect(() => {
    if (!siteConfig.analytics.posthogKey) return;

    let termlyAttached = false;
    let attempts = 0;

    const attachTermly = () => {
      const termly = window.Termly;
      if (!termly || termlyAttached) return false;

      termlyAttached = true;
      termly.on("initialized", () => {
        applyAnalyticsConsent(termlyAnalyticsConsent(termly));
      });
      termly.on("consent", (data) => {
        applyAnalyticsConsent(data.categories?.includes("analytics") === true);
      });
      applyAnalyticsConsent(termlyAnalyticsConsent(termly));
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
  }, []);

  return null;
}
