import type { ReactNode } from "react";
import styles from "./site-shell.module.css";

/** Shared inner-page frame without the legacy homepage demo dependencies. */
export function InnerPageShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <main id="main-content">{children}</main>
    </div>
  );
}
