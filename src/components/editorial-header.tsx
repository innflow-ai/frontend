"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MegaMenu, productColumns, resourcesColumns } from "@/components/mega-menu";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";

const MotionTrackedLink = motion.create(TrackedLink);

const mobileLinks = [
  { href: "#features", label: "Product" },
  { href: "#portfolios", label: "Portfolios" },
  { href: "#resources", label: "Resources" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
] as const;

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
  const reduce = useReducedMotion();

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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="editorial-header">
        <div className="editorial-header-inner">
          <a className="editorial-brand" href="/" aria-label="Innflow home">
            <Image
              src="/brand/innflow_logo_set_B.svg"
              alt="Innflow"
              width={139}
              height={28}
              priority
            />
          </a>

          <nav aria-label="Primary navigation">
            <ul className="editorial-desktop-nav">
              <li>
                <MegaMenu label="Product" columns={productColumns} />
              </li>
              <li>
                <MegaMenu label="Portfolios" />
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

          <div className="editorial-header-actions">
            <TrackedLink
              destination={`${siteConfig.appOrigin}/login`}
              eventLabel="header_login"
            >
              Login
            </TrackedLink>
            <TrackedLink
              className="editorial-button editorial-button-brand editorial-header-cta"
              destination={siteConfig.demoUrl}
              eventLabel="header_demo"
            >
              Sign up now
            </TrackedLink>
            <button
              type="button"
              className={`editorial-hamburger${
                mobileOpen ? " editorial-hamburger-open" : ""
              }`}
              aria-expanded={mobileOpen}
              aria-controls="editorial-mobile-overlay"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside the header so its backdrop-filter cannot become the
          fixed overlay's containing block. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="editorial-mobile-overlay"
            className="editorial-mobile-overlay"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
          >
            <motion.nav
              aria-label="Mobile navigation"
              className="editorial-mobile-links"
              initial={reduce ? undefined : "hidden"}
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                },
              }}
            >
              {mobileLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={reduce ? undefined : itemVariants}
                  onClick={closeMobile}
                >
                  {link.label}
                </motion.a>
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
                className="editorial-button editorial-button-brand editorial-mobile-cta"
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
