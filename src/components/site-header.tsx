"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import { navigation, siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer after client navigations.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the intentional navigation signal
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="shell header-inner">
        <a className="brand-link" href="/" aria-label="Innflow home">
          <Image
            src="/brand/innflow_logo_set_B.svg"
            alt="Innflow"
            width={139}
            height={28}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <a
                key={item.href}
                href={item.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <TrackedLink
            className="login-link"
            destination={`${siteConfig.appOrigin}/login`}
            eventLabel="header_login"
          >
            Log in
          </TrackedLink>
          <TrackedLink
            className="button button-primary button-small desktop-cta"
            destination={siteConfig.demoUrl}
            eventLabel="header_demo"
          >
            {siteConfig.primaryCta}
          </TrackedLink>
          <div className={`mobile-navigation${menuOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="menu-button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
            {menuOpen ? (
              <div id={menuId} className="mobile-menu">
                <nav aria-label="Mobile navigation">
                  {navigation.map((item) => {
                    const active =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className={active ? "is-active" : undefined}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                        <span aria-hidden="true">↗</span>
                      </a>
                    );
                  })}
                  <TrackedLink
                    destination={`${siteConfig.appOrigin}/login`}
                    eventLabel="mobile_login"
                  >
                    Log in
                  </TrackedLink>
                  <TrackedLink
                    className="button button-primary"
                    destination={siteConfig.demoUrl}
                    eventLabel="mobile_demo"
                  >
                    {siteConfig.primaryCta}
                  </TrackedLink>
                </nav>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
