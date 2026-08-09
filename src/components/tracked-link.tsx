"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";
import { captureMarketingEvent } from "@/lib/analytics";
import { appendAttribution } from "@/lib/attribution";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  destination: string;
  eventLabel: string;
};

export function TrackedLink({
  children,
  destination,
  eventLabel,
  onClick,
  ...props
}: TrackedLinkProps) {
  const [href, setHref] = useState(destination);

  useEffect(() => {
    setHref(
      appendAttribution(
        destination,
        new URLSearchParams(window.location.search),
      ),
    );
  }, [destination]);

  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        captureMarketingEvent("marketing_cta_clicked", {
          label: eventLabel,
          destination,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
