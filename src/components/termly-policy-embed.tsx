"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const TERMLY_EMBED_SCRIPT = "https://app.termly.io/embed-policy.min.js";

export function TermlyPolicyEmbed({ policyId }: { policyId: string }) {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setting the attribute after mount handles both cases: the Termly script
    // can discover it during its initial scan, or its MutationObserver can
    // re-render it after client-side navigation between policy pages.
    embedRef.current?.setAttribute("name", "termly-embed");
    embedRef.current?.setAttribute("data-id", policyId);
  }, [policyId]);

  return (
    <>
      <div ref={embedRef} className="legal-policy-embed" />
      <Script
        id="termly-policy-embed-script"
        src={TERMLY_EMBED_SCRIPT}
        strategy="afterInteractive"
      />
    </>
  );
}
