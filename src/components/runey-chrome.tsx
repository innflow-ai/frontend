"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { type ReactNode, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import styles from "./runey-landing.module.css";
import { TrackedLink } from "./tracked-link";

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
}: {
  slot: "header" | "footer";
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  if (pathname !== "/" && pathname !== "/property-management") return children;
  if (slot === "footer")
    return (
      <footer className={styles.footer}>
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
          <div>
            <h2>Product</h2>
            <a href="/#features">Features</a>
            <a href="/platform">Platform</a>
            <a href="/integrations">Integrations</a>
            <a href="/pricing">Pricing</a>
          </div>
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
            <a href="/demo">Request a demo</a>
            <a href={siteConfig.signupUrl}>Get started</a>
            <a href={siteConfig.appOrigin}>Log in</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Innflow</span>
          <div>
            <a href="/legal/privacy-policy">Privacy</a>
            <a href="/legal/terms-of-service">Terms</a>
            <a href="/legal/cookie-policy">Cookies</a>
          </div>
        </div>
        <div className={styles.wordmark} aria-hidden="true">
          innflow
        </div>
      </footer>
    );
  return (
    <header className={styles.header}>
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
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.login} href={siteConfig.appOrigin}>
            Log in
          </a>
          <TrackedLink
            className={styles.primaryButton}
            destination={siteConfig.signupUrl}
            eventLabel="header_get_started"
          >
            Get started
          </TrackedLink>
          <button
            ref={toggle}
            type="button"
            className={styles.menuToggle}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="runey-mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="runey-mobile-menu"
          className={styles.mobileNav}
          aria-label="Mobile navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href={siteConfig.appOrigin}>Log in</a>
        </nav>
      )}
    </header>
  );
}
