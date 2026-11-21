import Image from "next/image";
import type { AnchorHTMLAttributes } from "react";
import { siteConfig } from "@/config/site";
import { TrackedLink } from "./tracked-link";
import ctaStyles from "./google-cta.module.css";
import styles from "./google-sign-in.module.css";

type GoogleSignInButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  label?: string;
  eventLabel?: string;
  iconSize?: number;
  variant?: "inline" | "brand";
  tone?: "primary" | "secondary";
};

export function GoogleSignInButton({
  label = "Continue with Google",
  eventLabel = "google_sign_in",
  iconSize = 16,
  variant = "inline",
  tone = "primary",
  className,
  ...props
}: GoogleSignInButtonProps) {
  return (
    <TrackedLink
      {...props}
      data-site-cta={tone}
      className={`${styles.signInButton} ${ctaStyles.button}${variant === "brand" ? ` ${styles.brandButton}` : ""}${className ? ` ${className}` : ""}`}
      destination={siteConfig.signupUrl}
      eventLabel={eventLabel}
    >
      <Image
        src="/brand/google-g.svg"
        alt=""
        width={iconSize}
        height={iconSize}
        aria-hidden="true"
      />
      {label}
    </TrackedLink>
  );
}
