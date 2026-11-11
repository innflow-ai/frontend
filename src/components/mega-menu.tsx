"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons/mage/ArrowRight";
import { ChevronDown as CaretDown } from "@/components/icons/mage/ChevronDown";
import { NoteText as Newspaper } from "@/components/icons/mage/NoteText";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./mega-menu.module.css";
import {
  type LatestBlogPostNavItem,
  type MegaMenuColumn,
  menuBrowseLinks,
} from "./mega-menu-content";

export type {
  LatestBlogPostNavItem,
  MegaMenuColumn,
  MegaMenuLink,
} from "./mega-menu-content";
export {
  allProductColumns,
  allSolutionsColumns,
  directorySectionId,
  menuBrowseLinks,
  portfolioColumns,
  productColumns,
  resourcesColumns,
  solutionsColumns,
} from "./mega-menu-content";

type MegaMenuProps = {
  compact?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  label: string;
  columns: MegaMenuColumn[];
  showAside?: boolean;
  latestBlogPosts?: LatestBlogPostNavItem[];
  promotionalBanner?: {
    alt: string;
    eventLabel: string;
    href: string;
    src: string;
  };
};

const MEGA_MENU_LATEST_POST_COUNT = 2;
const MEGA_MENU_COVER_WIDTH = 720;
const MEGA_MENU_COVER_HEIGHT = 512;

function LatestPostsAside({
  posts,
  onSelect,
}: {
  posts: LatestBlogPostNavItem[];
  onSelect: () => void;
}) {
  const visiblePosts = posts.slice(0, MEGA_MENU_LATEST_POST_COUNT);

  return (
    <aside className={`${styles.aside} ${styles.latestAside}`}>
      <span className={styles.heading}>Latest</span>
      <div className={styles.latestPostList}>
        {visiblePosts.map((post) => (
          <TrackedLink
            key={post.href}
            className={styles.latestPostCard}
            destination={post.href}
            eventLabel="mega_menu_latest_blog_post"
            onClick={onSelect}
          >
            <span className={styles.latestPostMedia}>
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  width={MEGA_MENU_COVER_WIDTH}
                  height={MEGA_MENU_COVER_HEIGHT}
                  quality={100}
                  sizes="(max-width: 1100px) 42vw, 360px"
                />
              ) : (
                <Newspaper size={28} weight="fill" aria-hidden="true" />
              )}
            </span>
            <span className={styles.latestPostCopy}>
              <small>
                {[post.categoryLabel, post.publishedLabel]
                  .filter(Boolean)
                  .join(" · ")}
              </small>
              <strong>{post.title}</strong>
            </span>
          </TrackedLink>
        ))}
      </div>
      <TrackedLink
        className={styles.latestPostsAll}
        destination="/blog"
        eventLabel="mega_menu_all_blog_posts"
        onClick={onSelect}
      >
        View all posts <ArrowRight size={13} aria-hidden="true" />
      </TrackedLink>
    </aside>
  );
}

function PromotionalAside({ onSelect }: { onSelect: () => void }) {
  return (
    <aside className={styles.aside}>
      <span className={styles.heading}>New</span>
      <p>
        Innflow Assistant turns operational questions into reviewable next steps
        — with human control built in.
      </p>
      <TrackedLink
        destination={siteConfig.signupUrl}
        eventLabel="mega_menu_signup"
        onClick={onSelect}
      >
        Get started now <ArrowRight size={13} />
      </TrackedLink>
    </aside>
  );
}

export function MegaMenu({
  compact = false,
  expanded,
  onExpandedChange,
  label,
  columns,
  showAside = true,
  latestBlogPosts,
  promotionalBanner,
}: MegaMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = expanded ?? internalOpen;
  const setOpen = useCallback(
    (value: boolean) => {
      setInternalOpen(value);
      onExpandedChange?.(value);
    },
    [onExpandedChange],
  );
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
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
      if (event.key === "Escape" && open) {
        if (rootRef.current?.contains(document.activeElement)) {
          triggerRef.current?.focus();
        }
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!compact || !open) return;
    const dismiss = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  });

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
      className={`${styles.wrap} ${compact ? styles.compact : ""}`}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={(event) =>
          event.detail === 0 && open ? closeMenu() : openMenu()
        }
      >
        {label}
        <CaretDown
          className={styles.caret}
          size={14}
          weight="bold"
          aria-hidden="true"
        />
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
            <div
              className={`${styles.grid}${
                promotionalBanner
                  ? ` ${styles.gridWithBanner}`
                  : showAside
                    ? columns.length === 1
                      ? ` ${styles.gridSingleWithAside}`
                      : ""
                    : ` ${styles.gridWithoutAside}`
              }`}
            >
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
                        data-hide-icon={link.hideIcon || undefined}
                        data-browse-all={link.browseAll || undefined}
                        onClick={closeMenu}
                      >
                        {!link.hideIcon && (
                          <span className={styles.icon}>
                            <Icon size={24} />
                          </span>
                        )}
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
              {menuBrowseLinks[label] && (
                <a
                  className={styles.browseAll}
                  data-browse-all
                  href={menuBrowseLinks[label].href}
                  onClick={closeMenu}
                >
                  <span>{menuBrowseLinks[label].title}</span>
                </a>
              )}
              {promotionalBanner ? (
                <TrackedLink
                  className={styles.promotionalBanner}
                  destination={promotionalBanner.href}
                  eventLabel={promotionalBanner.eventLabel}
                  onClick={closeMenu}
                >
                  <Image
                    alt={promotionalBanner.alt}
                    className={styles.promotionalBannerImage}
                    height={776}
                    sizes="(max-width: 1100px) calc(100vw - 340px), 900px"
                    src={promotionalBanner.src}
                    width={2430}
                  />
                </TrackedLink>
              ) : showAside ? (
                latestBlogPosts?.length ? (
                  <LatestPostsAside
                    posts={latestBlogPosts}
                    onSelect={closeMenu}
                  />
                ) : (
                  <PromotionalAside onSelect={closeMenu} />
                )
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
