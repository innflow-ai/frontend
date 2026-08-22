import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import styles from "./tag.module.css";

const GRADIENT_ID = "innflow-tag-icon-gradient";

type TagProps = {
  children: ReactNode;
  /** Override the leading icon. Defaults to the gradient sparkle. */
  icon?: ReactNode;
  className?: string;
};

/**
 * Reusable pill tag (Framer "Tag 2" / Secondary): white pill, brand-purple
 * border, gradient sparkle icon, uppercase label.
 */
export function Tag({ children, icon, className }: TagProps) {
  return (
    <p className={`${styles.tag}${className ? ` ${className}` : ""}`}>
      <svg aria-hidden="true" width="0" height="0" className={styles.gradientDefs}>
        <defs>
          <linearGradient
            id={GRADIENT_ID}
            x1="0"
            y1="1"
            x2="1"
            y2="0"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#6b90ff" />
            <stop offset="100%" stopColor="#2702f7" />
          </linearGradient>
        </defs>
      </svg>
      <span className={styles.icon}>
        {icon ?? <Sparkle size={16} weight="fill" />}
      </span>
      {children}
    </p>
  );
}
