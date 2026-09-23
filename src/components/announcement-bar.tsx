"use client";

import { ArrowRight, X } from "@phosphor-icons/react";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import {
  ANNOUNCEMENT_RIBBON_SRC,
  ANNOUNCEMENT_STORAGE_KEY,
} from "@/lib/marketing-chrome";
import styles from "./announcement-bar.module.css";

export function AnnouncementBar({ onDismiss }: { onDismiss: () => void }) {
  return (
    <aside
      className={styles.bar}
      aria-label="Innflow announcement"
      style={
        {
          "--announcement-ribbon": `url("${ANNOUNCEMENT_RIBBON_SRC}")`,
        } as CSSProperties
      }
    >
      <span className={styles.ribbon} aria-hidden="true" />
      <p className={styles.copy}>Innflow is live for property operations</p>
      <a href={siteConfig.googleAuthUrl}>
        Get started <ArrowRight size={12} aria-hidden="true" />
      </a>
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss announcement"
        onClick={() => {
          sessionStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, "1");
          onDismiss();
        }}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </aside>
  );
}
