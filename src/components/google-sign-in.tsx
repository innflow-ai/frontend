"use client";

import { X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import {
  type ButtonHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { siteConfig } from "@/config/site";
import styles from "./google-sign-in.module.css";

type GoogleSignInButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  eventLabel?: string;
  iconSize?: number;
  variant?: "inline" | "brand";
};

export function GoogleSignInButton({
  label = "Sign in with Google",
  eventLabel = "google_sign_in",
  iconSize = 16,
  variant = "inline",
  className,
  onClick,
  ...props
}: GoogleSignInButtonProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <button
        {...props}
        type="button"
        className={`${styles.signInButton}${variant === "brand" ? ` ${styles.brandButton}` : ""}${className ? ` ${className}` : ""}`}
        data-marketing-event="marketing_cta_clicked"
        data-marketing-label={eventLabel}
        data-marketing-destination={siteConfig.googleAuthUrl}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(true);
        }}
      >
        <Image
          src="/brand/google-g.svg"
          alt=""
          width={iconSize}
          height={iconSize}
          aria-hidden="true"
        />
        {label}
      </button>
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={close}
            />
            <div className={styles.sheetPositioner}>
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Sign in to innflow with Google"
                className={styles.sheet}
                initial={{ opacity: 0, y: 64 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 64 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              >
                <div className={styles.handle} aria-hidden="true" />
                <button
                  type="button"
                  className={styles.dismiss}
                  aria-label="Dismiss sign-in"
                  onClick={close}
                >
                  <X size={18} weight="bold" aria-hidden="true" />
                </button>
                <div className={styles.sheetLogo}>
                  <Image
                    src="/brand/google-g.svg"
                    alt=""
                    width={36}
                    height={36}
                    aria-hidden="true"
                  />
                </div>
                <h2 className={styles.sheetTitle}>
                  Sign in to innflow with Google
                </h2>
                <p className={styles.sheetSubtitle}>
                  One tap with your Google account. No password needed.
                </p>
                <a
                  className={styles.continueButton}
                  href={siteConfig.googleAuthUrl}
                  data-marketing-event="marketing_cta_clicked"
                  data-marketing-label={`${eventLabel}_continue`}
                  data-marketing-destination={siteConfig.googleAuthUrl}
                >
                  <Image
                    src="/brand/google-g.svg"
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                  Continue with Google
                </a>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
