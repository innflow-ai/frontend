"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/tracked-link";
import { navigation, siteConfig } from "@/config/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand-link" href="#top" aria-label="Innflow home">
          <Image
            src="/brand/innflow-black-full.svg"
            alt="Innflow"
            width={116}
            height={28}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
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
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
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
    </header>
  );
}
