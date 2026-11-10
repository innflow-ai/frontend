import { Geist, Roboto } from "next/font/google";
import type { ReactNode } from "react";
import styles from "@/app/preview/scroll-showcase/baseline-shell.module.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const contactFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-workspace-contacts",
  display: "swap",
});

export function ShowcaseTheme({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${geist.variable} ${contactFont.variable} ${styles.shell}`}
    >
      {children}
    </div>
  );
}
