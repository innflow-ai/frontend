"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import styles from "./article.module.css";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const current = document.documentElement.dataset.theme;
  if (current === "dark" || current === "light") return current;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={compact ? styles.themeToggleCompact : styles.themeToggle}
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
    </button>
  );
}
