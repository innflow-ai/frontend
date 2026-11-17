type CaptureWindow = Window & {
  dataLayer?: Array<{ event: string }>;
};

/**
 * One dataLayer event after a real signup. Not a key event and not a conversion.
 * The address is not included.
 */
export function trackEmailSignup() {
  if (typeof window === "undefined") return;
  const target = window as CaptureWindow;
  target.dataLayer = target.dataLayer ?? [];
  target.dataLayer.push({ event: "email_signup" });
}
