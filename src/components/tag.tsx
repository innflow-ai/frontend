import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import styles from "./tag.module.css";

type TagProps = {
  children: ReactNode;
  /** Override the leading icon. Defaults to the sparkle. */
  icon?: ReactNode;
  /**
   * "gradient" — innflow button-gradient fill, white label.
   * "outline" — white fill, primary-blue border, black label.
   */
  variant?: "gradient" | "outline";
  className?: string;
};

/**
 * Reusable pill tag with a sparkle icon and uppercase label.
 */
export function Tag({
  children,
  icon,
  variant = "gradient",
  className,
}: TagProps) {
  return (
    <p
      className={`${styles.tag} ${styles[variant]}${className ? ` ${className}` : ""}`}
    >
      <span className={styles.icon}>
        {icon ?? <Sparkle size={16} weight="fill" />}
      </span>
      {children}
    </p>
  );
}
