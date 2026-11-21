"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { siteConfig } from "@/config/site";

type PageViewGtag = (
  command: "event",
  eventName: "page_view",
  properties?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: PageViewGtag;
  }
}

// The document's first view is sent by the GTM Google tag on gtm.init.
// Remembering it here stops a second page_view for that same load.
let trackedPath: string | null = null;

function sendPageView(pathname: string) {
  const gtag = window.gtag;
  if (typeof gtag !== "function") return false;
  gtag("event", "page_view", {
    page_location: `${window.location.origin}${pathname}${window.location.search}`,
    page_path: pathname,
    page_title: document.title,
    // Same measurement ID the container's Google tag uses. Not a second tag.
    send_to: siteConfig.analytics.googleAnalyticsId,
  });
  return true;
}

/**
 * One GA4 page_view per client navigation. The initial document is left to
 * GTM so a full load is not counted twice. This does not emit sign_up or the
 * container's "Analytics" event, and it does not change consent gating:
 * the call goes through the gtag the container installed.
 */
export function MarketingPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (trackedPath === null) {
      trackedPath = pathname;
      return;
    }
    if (trackedPath === pathname) return;
    trackedPath = pathname;

    if (sendPageView(pathname)) return;

    // A click can happen before the Google tag finishes loading.
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (
        trackedPath !== pathname ||
        sendPageView(pathname) ||
        attempts >= 10
      ) {
        window.clearInterval(timer);
      }
    }, 200);
    return () => window.clearInterval(timer);
  }, [pathname]);

  return null;
}
