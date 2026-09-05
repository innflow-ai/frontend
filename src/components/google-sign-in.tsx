"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
import {
  type ButtonHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropPress = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        {...props}
        type="button"
        className={`${styles.signInButton}${variant === "brand" ? ` ${styles.brandButton}` : ""}${className ? ` ${className}` : ""}`}
        data-marketing-event="marketing_cta_clicked"
        data-marketing-label={eventLabel}
        data-marketing-destination={siteConfig.googleAuthUrl}
        aria-haspopup="dialog"
        aria-expanded={open}
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
      <dialog
        ref={dialogRef}
        className={styles.sheetPositioner}
        aria-label="Sign in to innflow with Google"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls =
            event.currentTarget.querySelectorAll<HTMLElement>(
              "button, a[href]",
            );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onPointerDown={(event) => {
          backdropPress.current = event.target === event.currentTarget;
        }}
        onPointerUp={(event) => {
          if (backdropPress.current && event.target === event.currentTarget)
            close();
          backdropPress.current = false;
        }}
      >
        <div className={styles.sheet}>
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
          <h2 className={styles.sheetTitle}>Sign in to innflow with Google</h2>
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
        </div>
      </dialog>
    </>
  );
}
