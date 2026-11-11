import { siteConfig } from "@/config/site";

type CaptureWindow = Window & {
  dataLayer?: object[];
  gtag?: (
    command: "event",
    eventName: string,
    params?: Record<string, unknown>,
  ) => void;
};

/**
 * One GA4 event after a real signup. Not a key event and not a conversion.
 * The address is not included. Prefer the gtag the container already installed;
 * otherwise queue a single dataLayer event for that same container.
 */
export function trackEmailCaptureSubmitted() {
  if (typeof window === "undefined") return;
  const target = window as CaptureWindow;
  if (typeof target.gtag === "function") {
    target.gtag("event", "email_capture_submitted", {
      send_to: siteConfig.analytics.googleAnalyticsId,
    });
    return;
  }
  target.dataLayer = target.dataLayer ?? [];
  target.dataLayer.push({ event: "email_capture_submitted" });
}
