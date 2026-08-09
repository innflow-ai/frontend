"use client";

import { useEffect } from "react";
import { captureMarketingEvent } from "@/lib/analytics";

export function PerformanceVitals() {
  useEffect(() => {
    if (!("PerformanceObserver" in window)) return;

    const report = (name: string, value: number) =>
      captureMarketingEvent("marketing_vital_observed", {
        name,
        value: Math.round(value),
        path: window.location.pathname,
      });

    const observers: PerformanceObserver[] = [];

    try {
      const lcp = new PerformanceObserver((list) => {
        const entry = list.getEntries().at(-1);
        if (entry) report("LCP", entry.startTime);
      });
      lcp.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(lcp);
    } catch {}

    try {
      let cls = 0;
      const layoutShift = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            value?: number;
            hadRecentInput?: boolean;
          };
          if (!shift.hadRecentInput) cls += shift.value ?? 0;
        }
        report("CLS", cls * 1000);
      });
      layoutShift.observe({ type: "layout-shift", buffered: true });
      observers.push(layoutShift);
    } catch {}

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, []);

  return null;
}
