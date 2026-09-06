"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import styles from "./article.module.css";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const current = document.documentElement.dataset.theme;
  if (current === "dark" || current === "light") return current;
  // Match the site's actual default; OS preference alone does not change CSS.
  return "light";
}

export function ThemeSwitcher({
  compact = false,
  className,
  showLabel = false,
}: {
  compact?: boolean;
  className?: string;
  showLabel?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={
        className ?? (compact ? styles.themeToggleCompact : styles.themeToggle)
      }
      aria-label={`Switch to ${next} mode`}
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("innflow-theme", next);
        } catch {
          // Ignore private-mode storage failures.
        }
        setTheme(next);
      }}
    >
      {theme === "dark" ? (
        <Sun size={18} weight="bold" aria-hidden="true" />
      ) : (
        <Moon size={18} weight="bold" aria-hidden="true" />
      )}
      {showLabel && <span>{next === "dark" ? "Dark mode" : "Light mode"}</span>}
    </button>
  );
}
