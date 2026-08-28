export type MarketingEvent =
  | "marketing_cta_clicked"
  | "marketing_navigation_clicked"
  | "marketing_vital_observed";

type AnalyticsWindow = Window & {
  gtag?: (
    command: "event",
    event: string,
    properties?: Record<string, unknown>,
  ) => void;
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void;
    has_opted_out_capturing?: () => boolean;
    opt_in_capturing?: () => void;
    opt_out_capturing?: () => void;
    startSessionRecording?: () => void;
    stopSessionRecording?: () => void;
  };
};

export function captureMarketingEvent(
  event: MarketingEvent,
  properties: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("innflow:analytics", { detail: { event, properties } }),
  );

  const consent = window.localStorage.getItem("innflow-cookie-consent");
  if (consent === "analytics") {
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.gtag?.("event", event, properties);
    analyticsWindow.posthog?.capture(event, properties);
  }
}
