"use client";

import {
  Buildings,
  ChartLineUp,
  Code,
  HandHeart,
  Handshake,
  House,
  HouseLine,
  type Icon,
  Sparkle,
  Storefront,
  UsersThree,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./portfolio-mega-menu.module.css";

type Badge = "Popular" | "New";
type Tint = "blue" | "green" | "violet" | "orange" | "plum" | "teal";

type Item = {
  title: string;
  body: string;
  icon: Icon;
  tint: Tint;
  badge?: Badge;
};

const items: Item[] = [
  {
    title: "Residential",
    body: "Apartments, condos & mixed-use",
    icon: House,
    tint: "blue",
    badge: "Popular",
  },
  {
    title: "Single-Family",
    body: "Build-to-rent & single-family",
    icon: HouseLine,
    tint: "green",
  },
  {
    title: "Multifamily",
    body: "Large and mid-sized communities",
    icon: Buildings,
    tint: "violet",
    badge: "Popular",
  },
  {
    title: "Commercial",
    body: "Office, retail & industrial",
    icon: Storefront,
    tint: "orange",
  },
  {
    title: "Community Associations",
    body: "HOAs, condos & townhomes",
    icon: UsersThree,
    tint: "plum",
  },
  {
    title: "Affordable Housing",
    body: "Public, LIHTC & subsidized",
    icon: HandHeart,
    tint: "teal",
  },
  {
    title: "AI Expense Assistant",
    body: "Recurring work, handled for you",
    icon: Sparkle,
    tint: "violet",
    badge: "New",
  },
  {
    title: "Revenue Intelligence",
    body: "See performance across assets",
    icon: ChartLineUp,
    tint: "blue",
  },
  {
    title: "Vendor Marketplace",
    body: "Trusted vendors on tap",
    icon: Handshake,
    tint: "orange",
  },
  {
    title: "Open API",
    body: "Connect your existing stack",
    icon: Code,
    tint: "green",
    badge: "New",
  },
];

const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 140;

export function PortfolioMegaMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openNow = () => {
    clearTimers();
    setOpen(true);
  };

  const scheduleOpen = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current === null) {
      openTimer.current = window.setTimeout(() => {
        openTimer.current = null;
        setOpen(true);
      }, OPEN_DELAY_MS);
    }
  };

  const scheduleClose = () => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current === null) {
      closeTimer.current = window.setTimeout(() => {
        closeTimer.current = null;
        setOpen(false);
      }, CLOSE_DELAY_MS);
    }
  };

  useEffect(
    () => () => {
      if (openTimer.current !== null) window.clearTimeout(openTimer.current);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        clearTimers();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, clearTimers]);

  return (
    <li
      ref={rootRef}
      className={`${styles.menu}${open ? ` ${styles.open}` : ""}`}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          clearTimers();
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? setOpen(false) : openNow())}
        onFocus={openNow}
      >
        Portfolios
      </button>

      <div className={styles.panel}>
        <div className={styles.grid}>
          {items.map(({ title, body, icon: ItemIcon, tint, badge }) => (
            <a href="#portfolios" className={styles.item} key={title}>
              <span className={`${styles.icon} ${styles[`tint_${tint}`]}`}>
                <ItemIcon size={20} weight="fill" aria-hidden="true" />
              </span>
              <span className={styles.itemText}>
                <span className={styles.itemTitle}>
                  {title}
                  {badge ? (
                    <span
                      className={`${styles.badge} ${
                        badge === "Popular"
                          ? styles.badgePopular
                          : styles.badgeNew
                      }`}
                    >
                      {badge}
                    </span>
                  ) : null}
                </span>
                <span className={styles.itemBody}>{body}</span>
              </span>
            </a>
          ))}
        </div>
        <div className={styles.footer}>
          <span>
            Built for every portfolio — one platform, total visibility.
          </span>
          <TrackedLink
            className={styles.footerLink}
            destination={siteConfig.demoUrl}
            eventLabel="mega_menu_demo"
          >
            Book a demo →
          </TrackedLink>
        </div>
      </div>
    </li>
  );
}
