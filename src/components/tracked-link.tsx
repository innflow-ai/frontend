import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  destination: string;
  eventLabel: string;
};

export function TrackedLink({
  children,
  destination,
  eventLabel,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      href={destination}
      data-marketing-event="marketing_cta_clicked"
      data-marketing-label={eventLabel}
      data-marketing-destination={destination}
    >
      {children}
    </a>
  );
}
