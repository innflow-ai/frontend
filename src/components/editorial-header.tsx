"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MegaMenu,
  portfolioColumns,
  productColumns,
  resourcesColumns,
  solutionsColumns,
} from "@/components/mega-menu";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./editorial-header.module.css";

const MotionTrackedLink = motion.create(TrackedLink);

// Mobile and desktop intentionally consume the same navigation records so
// labels, destinations, preview badges, and ordering cannot drift apart.
const mobileMenuColumns = [
  ...productColumns,
  ...solutionsColumns,
  ...portfolioColumns,
  ...resourcesColumns,
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 160, damping: 22 },
  },
};

export function EditorialHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHomeHero, setPastHomeHero] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const isHome = pathname === "/";
  const useLightChrome = isHome && !pastHomeHero;

  // Keep the homepage header transparent over the hero, then switch to the
  // solid navigation treatment once the hero has passed beneath it.
  useEffect(() => {
    if (!isHome) {
      setPastHomeHero(false);
      return;
    }

    let frame = 0;
    const syncHeader = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = document.getElementById("home-hero");
        setPastHomeHero(
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
  }, [isHome]);

  // Escape closes the mobile overlay.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile menu when crossing into the desktop layout, so the
  // body scroll lock never leaks out of mobile view on viewport resize.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 981px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`${styles.header}${isHome ? ` ${styles.homeHeader}` : ""}${
          useLightChrome ? ` ${styles.homeTop}` : ""
        }`}
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
                <MegaMenu label="Product" columns={productColumns} />
              </li>
              <li>
                <MegaMenu
                  label="Solutions"
                  columns={solutionsColumns}
                  showAside={false}
                />
              </li>
              <li>
                <MegaMenu label="Portfolios" columns={portfolioColumns} />
              </li>
              <li>
                <MegaMenu label="Resources" columns={resourcesColumns} />
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
            <TrackedLink
              destination={`${siteConfig.appOrigin}/login`}
              eventLabel="header_login"
            >
              Login
            </TrackedLink>
            <TrackedLink
              className={`${styles.button} ${styles.buttonBrand} ${styles.headerCta}`}
              destination={siteConfig.demoUrl}
              eventLabel="header_demo"
            >
              Sign up now
            </TrackedLink>
            <button
              type="button"
              className={styles.hamburger}
              aria-expanded={mobileOpen}
              aria-controls="editorial-mobile-overlay"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileOpen((open) => !open)}
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
              {mobileMenuColumns.map((column) => (
                <motion.section
                  key={column.heading}
                  className={styles.mobileSection}
                  variants={reduce ? undefined : itemVariants}
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
                                className={styles.mobileCustomIcon}
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
                                <span className={styles.mobileBadge}>
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
                </motion.section>
              ))}
              <MotionTrackedLink
                destination={`${siteConfig.appOrigin}/login`}
                eventLabel="mobile_login"
                variants={reduce ? undefined : itemVariants}
                onClick={closeMobile}
              >
                Login
              </MotionTrackedLink>
              <MotionTrackedLink
                className={`${styles.button} ${styles.buttonBrand} ${styles.mobileCta}`}
                destination={siteConfig.demoUrl}
                eventLabel="mobile_demo"
                variants={reduce ? undefined : itemVariants}
                onClick={closeMobile}
              >
                Sign up now
              </MotionTrackedLink>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
