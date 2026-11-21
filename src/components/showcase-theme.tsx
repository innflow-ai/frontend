import type { ReactNode } from "react";
import styles from "@/app/preview/scroll-showcase/baseline-shell.module.css";

export function ShowcaseTheme({ children }: { children: ReactNode }) {
  return <div className={styles.shell}>{children}</div>;
}
