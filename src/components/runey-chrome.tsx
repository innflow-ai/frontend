"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { CustomerSupportHours } from "@/components/customer-support-hours";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { footerNavigation } from "@/config/footer-navigation";
import { siteConfig } from "@/config/site";
import { EditorialHeader } from "./editorial-header";
import { FooterLegalLinks } from "./footer-legal-links";
import { GoogleSignInButton } from "./google-sign-in";
import {
  type LatestBlogPostNavItem,
  MegaMenu,
  productColumns,
  resourcesColumns,
  solutionsColumns,
} from "./mega-menu";
import styles from "./runey-landing.module.css";

const homepageGroups = [
  { label: "Product", columns: productColumns.slice(0, 2) },
  { label: "Solutions", columns: solutionsColumns },
  { label: "Platform", columns: productColumns.slice(2) },
  { label: "Resources", columns: resourcesColumns },
];

const links = [
  { label: "Product", href: "/#features" },
  { label: "Solutions", href: "/property-management" },
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/blog" },
];

export function RuneyChrome({
  slot,
  children,
  latestBlogPosts = [],
}: {
  slot: "header" | "footer";
  children: ReactNode;
  latestBlogPosts?: LatestBlogPostNavItem[];
}) {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // biome-ignore lint/correctness/useExhaustiveDependencies: Recheck restored scroll position on navigation.
  useEffect(() => {
    const syncScroll = () => setScrolled(window.scrollY > 0);
    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncScroll);
  }, [pathname]);
  if (
    pathname === "/homepage-baselane" ||
    pathname === "/BL" ||
    pathname.startsWith("/BL/")
  )
    return null;
  if (pathname !== "/" && pathname !== "/property-management") return children;
  if (slot === "footer")
    return (
      <footer
        className={`${styles.footer} ${pathname === "/" ? styles.blueChrome : ""}`}
      >
        <div className={styles.footerGrid}>
          <div>
            <a href="/" aria-label="Innflow home">
              <Image
                src="/brand/innflow_logo_set_B.svg"
                alt="Innflow"
                width={132}
                height={28}
              />
            </a>
            <p>
              Connected workflows. Clearer handoffs.
              <br />
              Property operations in one place.
            </p>
          </div>
          {footerNavigation.map((column) => (
            <div key={column.heading}>
              <h2>{column.heading}</h2>
              {column.heading === "Product" && (
                <a href="/#features">Features</a>
              )}
              {column.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
              {column.heading === "Product" && (
                <>
                  <a href="/integrations">Integrations</a>
                  <a href="/pricing">Pricing</a>
                </>
              )}
            </div>
          ))}
          <div>
            <h2>Explore</h2>
            <a href="/property-management">Property management</a>
            <a href="/skills">Skills library</a>
            <a href="/blog">Blog</a>
            <a href="/faq">FAQ</a>
          </div>
          <div>
            <h2>Get in touch</h2>
            <a href="/contact">Contact us</a>
            <a href={siteConfig.demoUrl}>Request a demo</a>
            <a href={siteConfig.googleAuthUrl}>
              <GoogleCtaContent />
            </a>
            <a href={siteConfig.appOrigin}>Log in</a>
            <CustomerSupportHours />
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>
            © {new Date().getFullYear()} Innflow. All rights reserved.
          </span>
          <nav className={styles.footerLegal} aria-label="Legal">
            <FooterLegalLinks />
          </nav>
        </div>
        <div className={styles.wordmark} aria-hidden="true">
          innflow
        </div>
      </footer>
    );
  return (
    <EditorialHeader
      latestBlogPosts={latestBlogPosts}
      desktopHeader={
        <header
          className={`${styles.header}${pathname === "/" ? ` ${styles.homeHeader}` : ""}${!scrolled ? ` ${styles.headerTop}${pathname === "/" ? ` ${styles.headerLight}` : ""}` : ""}`}
        >
          <div className={styles.headerInner}>
            <a href="/" aria-label="Innflow home">
              <Image
                src="/brand/innflow_logo_set_B.svg"
                alt="Innflow"
                width={122}
                height={26}
                preload
              />
            </a>
            <nav className={styles.desktopNav} aria-label="Primary navigation">
              {links.map((link) => {
                const group =
                  pathname === "/"
                    ? homepageGroups.find((group) => group.label === link.label)
                    : undefined;
                return group ? (
                  <MegaMenu
                    key={link.label}
                    label={link.label}
                    columns={group.columns}
                    compact
                    showAside={false}
                    expanded={activeMenu === link.label}
                    onExpandedChange={(expanded) =>
                      setActiveMenu((current) =>
                        expanded
                          ? link.label
                          : current === link.label
                            ? null
                            : current,
                      )
                    }
                  />
                ) : (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className={styles.headerActions}>
              <a className={styles.login} href={siteConfig.appOrigin}>
                Log in
              </a>
              <GoogleSignInButton
                className={styles.primaryButton}
                label="Continue with Google"
                eventLabel="header_continue_google"
              />
            </div>
          </div>
        </header>
      }
    />
  );
}
