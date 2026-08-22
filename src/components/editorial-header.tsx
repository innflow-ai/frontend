"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PortfolioMegaMenu } from "@/components/portfolio-mega-menu";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";

export function EditorialHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`editorial-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="editorial-shell editorial-header-inner">
        <a className="editorial-brand" href="/" aria-label="Innflow home">
          <Image
            src="/brand/innflow-white-full.svg"
            alt="Innflow"
            width={116}
            height={28}
            priority
          />
        </a>

        <nav aria-label="Primary navigation">
          <ul className="editorial-desktop-nav">
            <li>
              <a href="#features">Features</a>
            </li>
            <PortfolioMegaMenu />
            <li>
              <a href="#why-innflow">Why Innflow</a>
            </li>
            <li>
              <a href="#resources">Resources</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
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
          <a href={`mailto:${siteConfig.supportEmail}`}>Contact</a>
          <TrackedLink
            className="editorial-button editorial-button-light editorial-header-cta"
            destination={siteConfig.demoUrl}
            eventLabel="header_demo"
          >
            Book a demo
          </TrackedLink>
          <details className="editorial-mobile-nav">
            <summary aria-label="Open navigation">Menu</summary>
            <nav aria-label="Mobile navigation">
              <a href="#features">Features</a>
              <a href="#portfolios">Portfolios</a>
              <a href="#why-innflow">Why Innflow</a>
              <a href="#resources">Resources</a>
              <a href="/pricing">Pricing</a>
              <TrackedLink
                destination={`${siteConfig.appOrigin}/login`}
                eventLabel="mobile_login"
              >
                Login
              </TrackedLink>
              <a href={`mailto:${siteConfig.supportEmail}`}>Contact</a>
              <TrackedLink
                className="editorial-button editorial-button-light"
                destination={siteConfig.demoUrl}
                eventLabel="mobile_demo"
              >
                Book a demo
              </TrackedLink>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
