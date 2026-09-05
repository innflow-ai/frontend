"use client";

import { CaretDown, Newspaper } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { GoogleSignInButton } from "@/components/google-sign-in";
import {
  type LatestBlogPostNavItem,
  MegaMenu,
  type MegaMenuColumn,
  portfolioColumns,
  productColumns,
  resourcesColumns,
  solutionsColumns,
} from "@/components/mega-menu";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./editorial-header.module.css";

const MotionTrackedLink = motion.create(TrackedLink);

type MobileMenuGroup = {
  label: string;
  columns: MegaMenuColumn[];
};

// Mobile and desktop intentionally consume the same navigation records so
// labels, destinations, preview badges, icons, and ordering cannot drift.
const mobileMenuGroups: MobileMenuGroup[] = [
  { label: "Product", columns: productColumns },
  { label: "Solutions", columns: solutionsColumns },
  { label: "Portfolios", columns: portfolioColumns },
  { label: "Resources", columns: resourcesColumns },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 160, damping: 22 },
  },
};

function MobileLatestPosts({
  posts,
  onSelect,
}: {
  posts: LatestBlogPostNavItem[];
  onSelect: () => void;
}) {
  if (posts.length === 0) return null;

  return (
    <section
      className={styles.mobileLatestPosts}
      aria-labelledby="latest-posts-mobile"
    >
      <h3 id="latest-posts-mobile">Latest from Innflow</h3>
      <div className={styles.mobileLatestPostList}>
        {posts.map((post) => (
          <TrackedLink
            key={post.href}
            className={styles.mobileLatestPost}
            destination={post.href}
            eventLabel="mobile_menu_latest_blog_post"
            onClick={onSelect}
          >
            <span className={styles.mobileLatestPostMedia}>
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  width={72}
                  height={46}
                  sizes="72px"
                />
              ) : (
                <Newspaper size={18} weight="fill" aria-hidden="true" />
              )}
            </span>
            <span className={styles.mobileLatestPostCopy}>
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
        className={styles.mobileLatestPostsAll}
        destination="/blog"
        eventLabel="mobile_menu_all_blog_posts"
        onClick={onSelect}
      >
        View all posts
      </TrackedLink>
    </section>
  );
}

export function EditorialHeader({
  latestBlogPosts = [],
}: {
  latestBlogPosts?: LatestBlogPostNavItem[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [showSolidHeader, setShowSolidHeader] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const mobileMenuBaseId = useId();
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const isHome = pathname === "/";
  const isBlogArticle = /^\/blog\/.+/.test(pathname);
  // Articles start with white chrome over their dark canvas. Once scrolled,
  // all subpages use the selected theme's opaque surface and matching chrome.
  const useLightChrome =
    (isHome || isBlogArticle) && !showSolidHeader && !mobileOpen;
  const useDarkTransparentChrome =
    !isHome && !isBlogArticle && !showSolidHeader && !mobileOpen;

  // Preserve the homepage's hero threshold. Subpages become opaque on the
  // first scroll pixel, independently of the direction-based hide animation.
  // Do not defer that fallback to a cancellable animation frame.
  useEffect(() => {
    let frame = 0;
    const syncHeader = () => {
      if (pathname !== "/") {
        setShowSolidHeader(window.scrollY > 0);
        return;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = document.getElementById("home-hero");
        setShowSolidHeader(
          hero ? hero.getBoundingClientRect().bottom <= 70 : window.scrollY > 0,
        );
      });
    };

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
    window.addEventListener("resize", syncHeader);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncHeader);
      window.removeEventListener("resize", syncHeader);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isBlogArticle || reduce) {
      setHeaderHidden(false);
      return;
    }

    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (mobileOpen || y < 72) {
        setHeaderHidden(false);
        last = y;
        return;
      }
      if (y > last + 6) setHeaderHidden(true);
      else if (y < last - 6) setHeaderHidden(false);
      last = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isBlogArticle, mobileOpen, reduce]);

  // Escape closes the mobile overlay.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("dialog[open]")) {
        setMobileOpen(false);
        setOpenMobileGroup(null);
        if (mobileOpen) mobileToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    const previousInert = background.map((element) => element.inert);
    for (const element of background) element.inert = true;

    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || document.querySelector("dialog[open]")) return;
      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          "header a[href], header button, #editorial-mobile-overlay a[href], #editorial-mobile-overlay button",
        ),
      ).filter(
        (element) =>
          element.getClientRects().length > 0 &&
          !element.hasAttribute("disabled"),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", containFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      document.removeEventListener("keydown", containFocus);
    };
  }, [mobileOpen]);

  // Close the mobile menu when crossing into the desktop layout, so the
  // body scroll lock never leaks out of mobile view on viewport resize.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 981px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false);
        setOpenMobileGroup(null);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobileGroup(null);
  };

  const toggleMobile = () => {
    if (!mobileOpen) setOpenMobileGroup(null);
    setMobileOpen((open) => !open);
  };

  return (
    <>
      <header
        className={`${styles.header}${isHome ? ` ${styles.homeHeader}` : ""}${
          useLightChrome ? ` ${styles.homeTop}` : ""
        }${useDarkTransparentChrome ? ` ${styles.pageTop}` : ""}${
          mobileOpen ? ` ${styles.menuOpen}` : ""
        }${headerHidden ? ` ${styles.headerHidden}` : ""}`}
      >
        <div className={styles.inner}>
          <a className={styles.brand} href="/" aria-label="Innflow home">
            <Image
              src={
                useLightChrome
                  ? "/brand/innflow_white_logo_set_bold.svg"
                  : "/brand/innflow_logo_set_B.svg"
              }
              alt="Innflow"
              width={139}
              height={useLightChrome ? 29 : 28}
              priority
            />
          </a>

          <nav aria-label="Primary navigation">
            <ul className={styles.desktopNav}>
              <li>
                <MegaMenu
                  label="Product"
                  columns={productColumns}
                  showAside={false}
                />
              </li>
              <li>
                <MegaMenu
                  label="Solutions"
                  columns={solutionsColumns}
                  showAside={false}
                />
              </li>
              <li>
                <MegaMenu
                  label="Portfolios"
                  columns={portfolioColumns}
                  promotionalBanner={{
                    alt: "Interested in our product? Contact us to discuss becoming a customer and finding solutions for your needs. Talk to sales.",
                    eventLabel: "mega_menu_portfolio_talk_to_sales",
                    href: "/contact",
                    src: "/brand/navigation/ico-banner-real.png",
                  }}
                />
              </li>
              <li>
                <MegaMenu
                  label="Resources"
                  columns={resourcesColumns}
                  latestBlogPosts={latestBlogPosts}
                />
              </li>
              <li>
                <a href="/pricing">Pricing</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <GoogleSignInButton
              className={`${styles.button} ${styles.headerCta}`}
              eventLabel="header_continue_google"
              label="Continue with Google"
              variant="brand"
            />
            <button
              ref={mobileToggleRef}
              type="button"
              className={styles.hamburger}
              aria-expanded={mobileOpen}
              aria-controls="editorial-mobile-overlay"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              onClick={toggleMobile}
            >
              <Image
                className={styles.menuIcon}
                src={
                  mobileOpen
                    ? `/brand/navigation/Close_X_${
                        useLightChrome ? "white" : "black"
                      }.svg`
                    : `/brand/navigation/HamburgerMenu_${
                        useLightChrome ? "white" : "black"
                      }.svg`
                }
                alt=""
                width={mobileOpen ? 25 : 27}
                height={mobileOpen ? 25 : 27}
                unoptimized
              />
            </button>
          </div>
        </div>
      </header>
      {isBlogArticle ? (
        <>
          <div
            className={`${styles.articleFade}${
              headerHidden ? ` ${styles.articleFadePinned}` : ""
            }`}
            data-article-fade=""
            aria-hidden="true"
          />
          <div className={styles.articleBottomFade} aria-hidden="true" />
        </>
      ) : null}

      {/* Rendered outside the header so the fixed panel can cover the viewport
          below the header without its backdrop-filter changing the containing
          block. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="editorial-mobile-overlay"
            className={styles.mobileOverlay}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
          >
            <motion.nav
              aria-label="Mobile navigation"
              className={styles.mobileLinks}
              initial={reduce ? undefined : "hidden"}
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                },
              }}
            >
              {mobileMenuGroups.map((group) => {
                const expanded = openMobileGroup === group.label;
                const panelId = `${mobileMenuBaseId}-${group.label.toLowerCase()}`;

                return (
                  <motion.section
                    key={group.label}
                    className={styles.mobileGroup}
                    variants={reduce ? undefined : itemVariants}
                  >
                    <button
                      type="button"
                      className={styles.mobileGroupTrigger}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenMobileGroup(expanded ? null : group.label)
                      }
                    >
                      {group.label}
                      <CaretDown size={18} weight="bold" aria-hidden="true" />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded ? (
                        <motion.div
                          id={panelId}
                          className={styles.mobileGroupPanel}
                          role="region"
                          aria-label={`${group.label} mobile menu`}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.2 }}
                        >
                          <div className={styles.mobileGroupContent}>
                            {group.columns.map((column) => (
                              <section
                                key={column.heading}
                                className={styles.mobileSection}
                              >
                                <h2>{column.heading}</h2>
                                <div className={styles.mobileSectionLinks}>
                                  {column.links.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                      <a
                                        key={link.title}
                                        href={link.href}
                                        onClick={closeMobile}
                                      >
                                        <span className={styles.mobileLinkIcon}>
                                          {link.iconSrc ? (
                                            <Image
                                              className={
                                                styles.mobileCustomIcon
                                              }
                                              src={link.iconSrc}
                                              alt=""
                                              width={25}
                                              height={25}
                                              unoptimized
                                            />
                                          ) : (
                                            <Icon size={17} weight="fill" />
                                          )}
                                        </span>
                                        <span className={styles.mobileLinkCopy}>
                                          <strong>
                                            {link.title}
                                            {link.badge ? (
                                              <span
                                                className={styles.mobileBadge}
                                              >
                                                {link.badge}
                                              </span>
                                            ) : null}
                                          </strong>
                                          <small>{link.body}</small>
                                        </span>
                                      </a>
                                    );
                                  })}
                                </div>
                              </section>
                            ))}
                            {group.label === "Resources" ? (
                              <MobileLatestPosts
                                posts={latestBlogPosts}
                                onSelect={closeMobile}
                              />
                            ) : null}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.section>
                );
              })}
              <motion.a
                href="/pricing"
                className={styles.mobilePrimaryLink}
                variants={reduce ? undefined : itemVariants}
                onClick={closeMobile}
              >
                Pricing
              </motion.a>
              <motion.a
                href="/blog"
                className={styles.mobilePrimaryLink}
                variants={reduce ? undefined : itemVariants}
                onClick={closeMobile}
              >
                Blog
              </motion.a>
              <div className={styles.mobileCtaRow}>
                <GoogleSignInButton
                  className={`${styles.button} ${styles.mobileCta}`}
                  eventLabel="mobile_continue_google"
                  label="Continue with Google"
                  variant="brand"
                  iconSize={20}
                />
                <MotionTrackedLink
                  className={`${styles.button} ${styles.mobileCta} ${styles.mobileDemoCta}`}
                  destination={siteConfig.demoUrl}
                  eventLabel="mobile_demo"
                  variants={reduce ? undefined : itemVariants}
                  onClick={closeMobile}
                >
                  Book a Demo
                </MotionTrackedLink>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
