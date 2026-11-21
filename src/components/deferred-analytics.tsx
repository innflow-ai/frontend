"use client";

import { useEffect, useState } from "react";

type AnalyticsComponent = typeof import("@vercel/analytics/next").Analytics;

/**
 * Vercel Analytics is invisible. Load it after hydration so its script is not
 * part of the first-load graph. Consent gating is unchanged: this widget was
 * never behind the Termly gate.
 */
export function DeferredAnalytics() {
  const [Analytics, setAnalytics] = useState<AnalyticsComponent | null>(null);

  useEffect(() => {
    void import("@vercel/analytics/next").then((mod) => {
      setAnalytics(() => mod.Analytics);
    });
  }, []);

  return Analytics ? <Analytics /> : null;
}
