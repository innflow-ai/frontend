"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { publicExperiencePath } from "@/lib/marketing-experience";
import { waitForExperienceHandoff } from "@/lib/marketing-experience-client";

// Full document navigation guarantees the shell and page observe the same
// assignment and emergency mode, including after a server-side rollback.
export function MarketingExperienceRuntime() {
  useEffect(() => {
    const activate = (event: MouseEvent) => {
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!anchor || anchor.download || anchor.target === "_blank") return;
      if (anchor.getAttribute("href")?.startsWith("#")) return;
      const url = new URL(anchor.href, location.href);
      if (
        url.origin === new URL(siteConfig.appOrigin).origin &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !event.defaultPrevented
      ) {
        event.preventDefault();
        void waitForExperienceHandoff().finally(() =>
          location.assign(anchor.href),
        );
        return;
      }
      if (url.origin !== location.origin) return;
      url.pathname = publicExperiencePath(url.pathname);
      anchor.href = url.href;
      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.defaultPrevented
      )
        return;
      if (
        url.pathname === location.pathname &&
        url.search === location.search &&
        url.hash
      )
        return;
      event.preventDefault();
      location.assign(url.href);
    };
    document.addEventListener("click", activate, true);
    document.addEventListener("auxclick", activate, true);
    return () => {
      document.removeEventListener("click", activate, true);
      document.removeEventListener("auxclick", activate, true);
    };
  }, []);
  return null;
}
