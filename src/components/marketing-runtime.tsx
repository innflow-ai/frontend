import { attributionKeys, siteConfig } from "@/config/site";

/**
 * Inline, before-hydration attribution. Keys come from attributionKeys so
 * gclid, gbraid, and wbraid cannot drift from the server helper.
 * Signup clicks are not sign_up: that event belongs after account creation.
 */
export function marketingRuntimeSource() {
  const keys = JSON.stringify(attributionKeys);
  const appOrigin = JSON.stringify(siteConfig.appOrigin);
  return `(() => {
  const keys = ${keys};
  const appOrigin = ${appOrigin};
  const prefix = "innflow-attribution:";
  const values = new URLSearchParams(location.search);
  let storage;
  try { storage = window.sessionStorage; } catch {}
  const read = (key) => { try { return storage?.getItem(prefix + key) || ""; } catch { return ""; } };
  const write = (key, value) => { try { if (value) storage?.setItem(prefix + key, value); } catch {} };
  if (!values.has("landing_page")) values.set("landing_page", read("landing_page") || location.pathname + location.search);
  if (!values.has("referrer") && (read("referrer") || document.referrer)) values.set("referrer", read("referrer") || document.referrer);
  for (const key of keys) {
    if (!values.has(key) && read(key)) values.set(key, read(key));
    write(key, values.get(key));
  }

  const isAppDestination = (destination) => {
    try {
      return new URL(destination, location.origin).origin === new URL(appOrigin).origin;
    } catch { return false; }
  };

  // Decorate just-in-time on click instead of at parse time: rewriting hrefs
  // before React hydrates causes hydration mismatch warnings.
  const decorate = (anchor) => {
    const destination = anchor.dataset.marketingDestination || anchor.getAttribute("href");
    if (!destination) return;
    try {
      const relative = destination.startsWith("/");
      const url = new URL(destination, location.origin);
      for (const key of keys) {
        const value = values.get(key);
        if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
      }
      anchor.href = relative ? url.pathname + url.search + url.hash : url.toString();
    } catch {}
  };

  const shouldDecorate = (anchor) => {
    if (anchor.dataset.marketingEvent) return true;
    const destination = anchor.dataset.marketingDestination || anchor.getAttribute("href");
    return Boolean(destination) && isAppDestination(destination);
  };

  const emit = (event, properties = {}) => {
    window.dispatchEvent(new CustomEvent("innflow:analytics", { detail: { event, properties } }));
    try {
      if (localStorage.getItem("innflow-cookie-consent") === "analytics") {
        window.gtag?.("event", event, properties);
        window.posthog?.capture?.(event, properties);
      }
    } catch {}
  };
  const anchorFrom = (event) => event.target instanceof Element ? event.target.closest("a[href]") : null;
  // pointerdown rewrites the href before a new-tab or modified click reads it.
  const onPointerDown = (event) => {
    const anchor = anchorFrom(event);
    if (!anchor || !shouldDecorate(anchor)) return;
    decorate(anchor);
  };
  const onActivate = (event) => {
    const anchor = anchorFrom(event);
    if (!anchor || !shouldDecorate(anchor)) return;
    decorate(anchor);
    if (!anchor.dataset.marketingEvent) return;
    emit(anchor.dataset.marketingEvent, { label: anchor.dataset.marketingLabel, destination: anchor.dataset.marketingDestination || anchor.href });
  };
  document.addEventListener("pointerdown", onPointerDown, true);
  document.addEventListener("click", onActivate);
  document.addEventListener("auxclick", onActivate);

  let cls = 0;
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) emit("marketing_vital_observed", { metric: "LCP", value: last.startTime, path: location.pathname });
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) cls += entry.value;
      emit("marketing_vital_observed", { metric: "CLS", value: cls, path: location.pathname });
    }).observe({ type: "layout-shift", buffered: true });
  } catch {}
})();`;
}

export function MarketingRuntime() {
  return (
    <script
      id="innflow-marketing-runtime"
      dangerouslySetInnerHTML={{ __html: marketingRuntimeSource() }}
    />
  );
}
