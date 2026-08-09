export type MarketingEvent =
  | "marketing_cta_clicked"
  | "marketing_navigation_clicked"
  | "marketing_vital_observed";

type AnalyticsWindow = Window & {
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void;
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
    (window as AnalyticsWindow).posthog?.capture(event, properties);
  }
}
