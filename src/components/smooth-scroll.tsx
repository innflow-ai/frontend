"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SmoothScroll() {
  const pathname = usePathname();

  // Recreate on navigation so momentum cannot carry into the next page.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname intentionally resets the scroll controller.
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;

    const syncScrollLock = () => {
      if (!lenis) return;
      const overflow = getComputedStyle(document.body).overflowY;
      if (overflow === "hidden" || overflow === "clip") {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    const syncMotionPreference = () => {
      lenis?.destroy();
      lenis = undefined;
      if (reducedMotion.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      });
      syncScrollLock();
    };

    // Existing dialogs and the mobile menu lock scrolling on the body.
    const observer = new MutationObserver(syncScrollLock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    reducedMotion.addEventListener("change", syncMotionPreference);
    syncMotionPreference();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncMotionPreference);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
