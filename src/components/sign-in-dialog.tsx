"use client";

import { type Ref, useId } from "react";
import { siteConfig } from "@/config/site";
import { GoogleCtaContent } from "./google-cta-content";
import googleButtonStyles from "./google-cta.module.css";
import { Multiply } from "./icons/mage";
import styles from "./sign-in-dialog.module.css";
import { TrackedLink } from "./tracked-link";

export function SignInDialog({ ref }: { ref: Ref<HTMLDialogElement> }) {
  const titleId = useId();

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: The native dialog handles Escape.
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.currentTarget.close();
        }
      }}
    >
      <div className={styles.panel}>
        <form method="dialog">
          <button
            type="submit"
            className={styles.close}
            aria-label="Close sign-in dialog"
          >
            <Multiply size={20} aria-hidden="true" />
          </button>
        </form>
        <h2 id={titleId} className={styles.title}>
          Get started
        </h2>
        <div className={styles.actions}>
          <TrackedLink
            className={googleButtonStyles.button}
            data-site-cta="primary"
            destination={siteConfig.signupUrl}
            eventLabel="sign_in_dialog_google"
          >
            <GoogleCtaContent />
          </TrackedLink>
          <TrackedLink
            className={googleButtonStyles.button}
            data-site-cta="secondary"
            destination={siteConfig.loginUrl}
            eventLabel="homepage_hero_login"
          >
            Log in
          </TrackedLink>
        </div>
      </div>
    </dialog>
  );
}
