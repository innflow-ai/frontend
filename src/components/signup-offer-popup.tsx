"use client";

import { X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import {
  SIGNUP_OFFER_SCROLL_PX,
  SIGNUP_OFFER_STORAGE_KEY,
} from "@/lib/marketing-chrome";
import styles from "./signup-offer-popup.module.css";

export function SignupOfferPopup({
  open,
  onOpen,
  onDismiss,
}: {
  open: boolean;
  onOpen: () => void;
  onDismiss: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const reveal = () => {
      if (window.scrollY < SIGNUP_OFFER_SCROLL_PX) return;
      if (sessionStorage.getItem(SIGNUP_OFFER_STORAGE_KEY)) return;
      onOpen();
    };
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    return () => window.removeEventListener("scroll", reveal);
  }, [onOpen]);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) {
      if (typeof node.show === "function") node.show();
      else node.setAttribute("open", "");
    }
    if (!open && node.open) {
      if (typeof node.close === "function") node.close();
      else node.removeAttribute("open");
    }
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="signup-offer-title"
    >
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss offer"
        onClick={() => {
          sessionStorage.setItem(SIGNUP_OFFER_STORAGE_KEY, "1");
          onDismiss();
        }}
      >
        <X size={16} aria-hidden="true" />
      </button>
      <p className={styles.eyebrow}>Limited-time offer</p>
      <h2 id="signup-offer-title">50% off signup</h2>
      <p>Save 50% on your first three months of Innflow.</p>
      <a className={styles.signup} href={siteConfig.googleAuthUrl}>
        Claim 50% off
      </a>
    </dialog>
  );
}
