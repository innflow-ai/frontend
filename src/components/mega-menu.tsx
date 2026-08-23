"use client";

import {
  ArrowRight,
  Buildings,
  CirclesThreePlus,
  Database,
  FlowArrow,
  House,
  type Icon,
  Newspaper,
  PlugsConnected,
  Sparkle,
  Storefront,
  Tag,
  UsersThree,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./mega-menu.module.css";

export type MegaMenuLink = {
  href: string;
  icon: Icon;
  iconSrc?: string;
  title: string;
  body: string;
  badge?: string;
};

export type MegaMenuColumn = {
  heading: string;
  links: MegaMenuLink[];
};

const platformLinks: MegaMenuLink[] = [
  {
    href: "/products/platform",
    icon: CirclesThreePlus,
    title: "Platform",
    body: "The connected foundation for modern property operations.",
  },
  {
    href: "/products/agent-os",
    icon: Sparkle,
    iconSrc: "/brand/navigation/mega-menu/copilot.svg",
    title: "Agent OS",
    body: "Govern, coordinate, and scale operational intelligence.",
  },
  {
    href: "/products/ai-agents",
    icon: Sparkle,
    iconSrc: "/brand/navigation/mega-menu/copilot.svg",
    title: "AI Agents",
    body: "Purpose-built agents that move property work forward.",
  },
  {
    href: "/products/agentic-workflows",
    icon: FlowArrow,
    iconSrc: "/brand/navigation/mega-menu/agentic-workflows.svg",
    title: "Agentic Workflows",
    body: "Recurring work made visible, governed, and repeatable.",
  },
  {
    href: "/products/databases",
    icon: Database,
    title: "Databases",
    body: "Shared operational context your teams and agents can trust.",
  },
];

const resourcesLinks: MegaMenuLink[] = [
  {
    href: "/integrations",
    icon: PlugsConnected,
    title: "Integrations",
    body: "Connect the tools your team already runs on.",
  },
  {
    href: "/pricing",
    icon: Tag,
    title: "Pricing",
    body: "Straightforward packaging for operations teams.",
  },
  {
    href: "/blog",
    icon: Newspaper,
    title: "Blog",
    body: "Ideas for sharper, calmer operations.",
  },
];

export const resourcesColumns: MegaMenuColumn[] = [
  {
    heading: "Resources",
    links: resourcesLinks,
  },
];

export const portfolioColumns: MegaMenuColumn[] = [
  {
    heading: "Portfolios",
    links: [
      {
        href: "/#portfolios",
        icon: House,
        title: "Residential",
        body: "Apartments, condos & mixed-use.",
      },
      {
        href: "/#portfolios",
        icon: Buildings,
        title: "Multifamily",
        body: "Large and mid-sized communities.",
      },
      {
        href: "/#portfolios",
        icon: Storefront,
        title: "Commercial",
        body: "Office, retail & industrial.",
      },
      {
        href: "/#portfolios",
        icon: UsersThree,
        title: "Community Associations",
        body: "HOAs, condos & townhomes.",
      },
    ],
  },
];

export const productColumns: MegaMenuColumn[] = [
  {
    heading: "Product",
    links: platformLinks,
  },
];

type MegaMenuProps = {
  label: string;
  columns: MegaMenuColumn[];
};

export function MegaMenu({ label, columns }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Escape closes the panel.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close when focus leaves the trigger + panel.
  const onBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
      closeMenu();
    }
  };

  const panelMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.18, ease: "easeOut" as const },
      };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover intent only — keyboard access is provided by the trigger button's onFocus/onClick
    <div
      ref={rootRef}
      className={styles.wrap}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={onBlur}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={openMenu}
        onFocus={openMenu}
      >
        {label}
        <span className={styles.caret} aria-hidden="true">
          ⌄
        </span>
      </button>

      {/* Full-viewport-width panel (desktop). Centered via 50%/-50vw so the
          positioning context of either header cannot constrain it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className={styles.panel}
            role="region"
            aria-label={`${label} menu`}
            {...panelMotion}
          >
            <div className={styles.grid}>
              {columns.map((column) => (
                <div key={column.heading} className={styles.column}>
                  <span className={styles.heading}>{column.heading}</span>
                  {column.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.title}
                        href={link.href}
                        className={styles.link}
                        onClick={closeMenu}
                      >
                        <span className={styles.icon}>
                          {link.iconSrc ? (
                            <Image
                              className={styles.customIcon}
                              src={link.iconSrc}
                              alt=""
                              width={24}
                              height={24}
                              unoptimized
                            />
                          ) : (
                            <Icon size={16} weight="fill" />
                          )}
                        </span>
                        <span>
                          <strong>
                            {link.title}
                            {"badge" in link && link.badge ? (
                              <span className={styles.badge}>{link.badge}</span>
                            ) : null}
                          </strong>
                          <small>{link.body}</small>
                        </span>
                      </a>
                    );
                  })}
                </div>
              ))}
              <aside className={styles.aside}>
                <span className={styles.heading}>New</span>
                <p>
                  Innflow Assistant turns operational questions into reviewable
                  next steps — with human control built in.
                </p>
                <TrackedLink
                  destination={siteConfig.demoUrl}
                  eventLabel="mega_menu_demo"
                  onClick={closeMenu}
                >
                  Book a demo <ArrowRight size={13} />
                </TrackedLink>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
