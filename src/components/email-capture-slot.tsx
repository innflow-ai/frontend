"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  EMAIL_CAPTURE_SESSION_KEY,
  EMAIL_CAPTURE_STORAGE_KEY,
  emailCapture,
  emailCaptureSeenThisSession,
  isEmailCaptureExcluded,
  isEmailCaptureSuppressed,
  readEmailCapture,
} from "@/config/email-capture";

type PopupComponent = typeof import("./email-capture-popup").EmailCapturePopup;

/**
 * Loads the card after first paint, and only when this page is allowed to
 * show it. The form itself stays out of the first-load bundle.
 */
export function EmailCaptureSlot() {
  const pathname = usePathname();
  const [Popup, setPopup] = useState<PopupComponent | null>(null);

  useEffect(() => {
    if (!emailCapture.enabled || isEmailCaptureExcluded(pathname)) return;
    try {
      if (
        emailCaptureSeenThisSession(
          sessionStorage.getItem(EMAIL_CAPTURE_SESSION_KEY),
        )
      ) {
        return;
      }
    } catch {
      // Session storage can be blocked. The popup still checks before it opens.
    }
    let record = null;
    try {
      record = readEmailCapture(
        localStorage.getItem(EMAIL_CAPTURE_STORAGE_KEY),
      );
    } catch {
      record = null;
    }
    if (isEmailCaptureSuppressed(record, Date.now())) return;

    let cancelled = false;
    const load = () => {
      if (cancelled) return;
      void import("./email-capture-popup").then((mod) => {
        if (!cancelled) setPopup(() => mod.EmailCapturePopup);
      });
    };
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const idle = idleWindow.requestIdleCallback?.(load, { timeout: 1500 });
    const timer = idle === undefined ? window.setTimeout(load, 1) : undefined;
    return () => {
      cancelled = true;
      if (idle !== undefined) idleWindow.cancelIdleCallback?.(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [pathname]);

  if (!Popup || !emailCapture.enabled || isEmailCaptureExcluded(pathname)) {
    return null;
  }
  return <Popup />;
}
