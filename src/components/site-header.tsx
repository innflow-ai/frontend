"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import googleButtonStyles from "./google-cta.module.css";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { ArrowRight } from "@/components/icons/mage/ArrowRight";
import { DashMenu as List } from "@/components/icons/mage/DashMenu";
import { MegaphoneA as Megaphone } from "@/components/icons/mage/MegaphoneA";
import { Multiply as X } from "@/components/icons/mage/Multiply";
import { siteConfig } from "@/config/site";
import {
  EXPERIENCE_ANNOUNCEMENT_ENABLED,
  INNER_PAGE_ANNOUNCEMENTS_ENABLED,
} from "@/lib/marketing-chrome";
import { isShowcaseHome } from "@/lib/showcase-routes";
import { navigationLabels, type NavigationLabel } from "./navigation-labels";
import previewStyles from "./site-header-preview.module.css";
import styles from "./site-shell.module.css";
import { TrackedLink } from "./tracked-link";



// Loaded on open so motion and the menu icon set are not in the first paint.
type DropdownComponent = typeof import("./site-header-dropdown").HeaderDropdown;
type MobileNavigationComponent =
  typeof import("./editorial-header").MobileNavigation;
export function SiteHeader() {
  const [menu, setMenu] = useState<NavigationLabel | null>(null);
  const [mobile, setMobile] = useState(false);
  const [Dropdown, setDropdown] = useState<DropdownComponent | null>(null);
  const [MobileNav, setMobileNav] = useState<MobileNavigationComponent | null>(
    null,
  );
  const loadDropdown = () => {
    if (Dropdown) return;
    void import("./site-header-dropdown").then((mod) => {
      setDropdown(() => mod.HeaderDropdown);
    });
  };
  const loadMobileNav = () => {
    if (MobileNav) return;
    void import("./editorial-header").then((mod) => {
      setMobileNav(() => mod.MobileNavigation);
    });
  };
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
      delete document.documentElement.dataset.logoInk;
      return;
    }
    document.documentElement.dataset.logoInk = "feature";
  }, [pathname]);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const announcementHidden =
    !EXPERIENCE_ANNOUNCEMENT_ENABLED ||
    announcementDismissed ||
    (!INNER_PAGE_ANNOUNCEMENTS_ENABLED && !isShowcaseHome(pathname));
  const [previewShowcasePassed, setPreviewShowcasePassed] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const hoverClose = useRef<ReturnType<typeof setTimeout> | null>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: Recheck a restored scroll offset after navigation.
  useEffect(() => {
    const bar = header.current;
    if (!bar) return;
    let hidden = false;
    let anchor = Math.max(0, window.scrollY);
    let hideDistance = bar.offsetHeight || 54;
    const reveal = () => {
      hidden = false;
      anchor = Math.max(0, window.scrollY);
      setScrollHidden(false);
    };
    const resize = () => {
      hideDistance = bar.offsetHeight || 54;
      setPreviewShowcasePassed(window.scrollY > 16);
    };
    const update = () => {
      const y = Math.max(0, window.scrollY);
      setPreviewShowcasePassed(y > 16);
      if (y <= 16 || menu || mobile || bar.contains(document.activeElement)) {
        reveal();
        return;
      }

      // Measure from the most recent high or low point so tiny reversals
      // don't toggle the bar, even during a long trackpad gesture.
      if (hidden) {
        anchor = Math.max(anchor, y);
        if (anchor - y >= 12) reveal();
      } else {
        anchor = Math.min(anchor, y);
        if (y - anchor >= hideDistance) {
          hidden = true;
          anchor = y;
          setScrollHidden(true);
        }
      }
    };
    reveal();
    resize();
    bar.addEventListener("focusin", reveal);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      bar.removeEventListener("focusin", reveal);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", resize);
    };
  }, [pathname, menu, mobile]);
  const cancelHoverClose = () => {
    if (hoverClose.current) clearTimeout(hoverClose.current);
    hoverClose.current = null;
  };
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (
        !header.current?.contains(event.target as Node) &&
        !document
          .getElementById("baselane-mobile-overlay")
          ?.contains(event.target as Node)
      ) {
        setMenu(null);
        setMobile(false);
      }
    };
    document.addEventListener("pointerdown", close);
    const handleEscape = (event: KeyboardEvent) => {
      if (
        event.key !== "Escape" ||
        (!header.current?.contains(event.target as Node) &&
          !document
            .getElementById("baselane-mobile-overlay")
            ?.contains(event.target as Node))
      )
        return;
      const trigger = header.current?.querySelector<HTMLButtonElement>(
        'button[aria-expanded="true"]',
      );
      if (toggle.current?.getAttribute("aria-expanded") === "true")
        toggle.current.focus();
      else trigger?.focus();
      setMenu(null);
      setMobile(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      if (hoverClose.current) clearTimeout(hoverClose.current);
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  // biome-ignore lint/correctness/useExhaustiveDependencies: Close disclosures when the route changes.
  useEffect(() => {
    setMobile(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1181px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobile(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!mobile) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || document.querySelector("dialog[open]")) return;
      const elements = [
        ...Array.from(
          header.current?.querySelectorAll<HTMLElement>("a[href], button") ??
            [],
        ),
        ...Array.from(
          document.querySelectorAll<HTMLElement>(
            "#baselane-mobile-overlay a[href], #baselane-mobile-overlay button",
          ),
        ),
      ].filter(
        (element) =>
          element.getClientRects().length > 0 &&
          !element.hasAttribute("disabled"),
      );
      const first = elements[0];
      const last = elements.at(-1);
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
  }, [mobile]);

  const closeMenus = () => {
    cancelHoverClose();
    setMenu(null);
    setMobile(false);
  };

  return (
    <div
      className={`${styles.page} ${styles.chromeScope} ${previewStyles.previewScope}`}
      data-preview-chrome
      data-homepage={isShowcaseHome(pathname)}
      data-announcement-dismissed={announcementHidden}
    >
      {!announcementHidden && (
        <aside
          className={previewStyles.announcement}
          aria-label="Innflow announcement"
        >
          <Megaphone size={16} aria-hidden="true" />
          <span>Explore the new Innflow experience</span>
          <a
            href={
              isShowcaseHome(pathname)
                ? "#workspace-overview"
                : "/#workspace-overview"
            }
            className={
              isShowcaseHome(pathname) ? previewStyles.homeLearnMore : undefined
            }
            aria-label="Learn more about the new Innflow experience"
          >
            Learn more
            {!isShowcaseHome(pathname) && (
              <ArrowRight size={12} aria-hidden="true" />
            )}
          </a>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => {
              setAnnouncementDismissed(true);
              header.current
                ?.querySelector<HTMLAnchorElement>(
                  'a[aria-label="innflow home"]',
                )
                ?.focus();
            }}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </aside>
      )}
      <div className={previewStyles.navSpace} aria-hidden="true" />
      <header
        ref={header}
        data-home-navigation
        data-scroll-hidden={scrollHidden && !menu && !mobile}
        data-preview-navigation={
          previewShowcasePassed || mobile ? "floating" : "flat"
        }
        className={`${styles.header}${mobile ? ` ${styles.mobileOpen}` : ""}${!previewShowcasePassed && !mobile ? ` ${previewStyles.flatHeader}` : ""}`}
      >
        <a href="/" className={styles.logo} aria-label="innflow home">
          <Image
            src="/brand/navigation/innflow-nav-wordmark.svg"
            alt="innflow"
            width={299}
            height={80}
            preload
          />
        </a>
        <nav
          id="baselane-preview-nav"
          aria-label="Primary navigation"
          className={styles.nav}
        >
          {navigationLabels.map((label) => (
            // biome-ignore lint/a11y/useSemanticElements: This groups navigation disclosures, not form fields.
            <div
              className={styles.menuGroup}
              key={label}
              role="group"
              aria-label={label}
              onPointerEnter={(event) => {
                if (
                  event.pointerType !== "mouse" ||
                  !window.matchMedia("(min-width: 1181px) and (hover: hover)")
                    .matches
                )
                  return;
                cancelHoverClose();
                loadDropdown();
                setMenu(label);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType !== "mouse" || mobile) return;
                cancelHoverClose();
                hoverClose.current = setTimeout(() => {
                  setMenu((current) => (current === label ? null : current));
                }, 180);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  cancelHoverClose();
                  setMenu((current) => (current === label ? null : current));
                }
              }}
            >
              <button
                type="button"
                aria-expanded={menu === label}
                aria-controls={`baselane-${label.replaceAll(" ", "-")}`}
                onClick={() => {
                  cancelHoverClose();
                  loadDropdown();
                  setMenu(menu === label ? null : label);
                }}
              >
                {label}
              </button>
              {menu === label && Dropdown ? (
                <Dropdown
                  label={label}
                  closeMenus={closeMenus}
                />
              ) : null}
            </div>
          ))}
          <a href="/pricing">Pricing</a>
          <a className={styles.mobileLogin} href={siteConfig.loginUrl}>
            Log in
          </a>
        </nav>
        <div className={styles.headerActions}>
          <a
            className={styles.login}
            data-site-cta="secondary"
            data-cta-tone="white"
            href={siteConfig.loginUrl}
          >
            Log in
          </a>
          <TrackedLink
            data-site-cta="secondary"
            className={`${styles.darkButton} ${googleButtonStyles.raisedSignIn}`}
            destination={siteConfig.signupUrl}
            eventLabel="baselane_header_signup"
            aria-label="Continue with Google"
          >
            <GoogleCtaContent />
          </TrackedLink>
          <button
            ref={toggle}
            type="button"
            className={styles.menuToggle}
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
            aria-controls="baselane-mobile-overlay"
            onClick={() => {
              const next = !mobile;
              if (next) loadMobileNav();
              setMobile(next);
              setMenu(null);
            }}
          >
            {mobile ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>
      {mobile && MobileNav ? (
        <MobileNav
          open={mobile}
          onClose={closeMenus}
          id="baselane-mobile-overlay"
          className={styles.mobileMenu}
          pricingHref="/pricing"
          loginHref={siteConfig.loginUrl}
        />
      ) : null}
    </div>
  );
}
