"use client";

import {
  ArrowRight,
  CaretDown,
  List,
  Newspaper,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GoogleCtaContent } from "@/components/google-cta-content";
import {
  portfolioColumns,
  productColumns,
  resourcesColumns,
  solutionsColumns,
} from "@/components/mega-menu";
import { siteConfig } from "@/config/site";
import styles from "./baselane-homepage.module.css";
import { blMenuIcons } from "./bl-menu-icons";
import { MobileNavigation } from "./editorial-header";
import { useNavigationBlogPosts } from "./navigation-blog-posts";
import { TrackedLink } from "./tracked-link";

const menus = [
  { label: "Product", columns: productColumns },
  { label: "Solutions", columns: solutionsColumns },
  { label: "Portfolios", columns: portfolioColumns },
  { label: "Resources", columns: resourcesColumns },
];
export function SiteHeader() {
  const latestBlogPosts = useNavigationBlogPosts();
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const hoverClose = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    <div className={`${styles.page} ${styles.chromeScope}`}>
      <header ref={header} className={styles.header}>
        <a href="/" className={styles.logo} aria-label="innflow home">
          <Image
            src="/brand/innflow-wordmark.svg"
            alt="innflow"
            width={95}
            height={28}
            preload
          />
        </a>
        <nav
          id="baselane-preview-nav"
          aria-label="Primary navigation"
          className={styles.nav}
        >
          {menus.map((group) => (
            // biome-ignore lint/a11y/useSemanticElements: This groups navigation disclosures, not form fields.
            <div
              className={styles.menuGroup}
              key={group.label}
              role="group"
              aria-label={group.label}
              onPointerEnter={(event) => {
                if (
                  event.pointerType !== "mouse" ||
                  !window.matchMedia("(min-width: 1181px) and (hover: hover)")
                    .matches
                )
                  return;
                cancelHoverClose();
                setMenu(group.label);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType !== "mouse" || mobile) return;
                cancelHoverClose();
                hoverClose.current = setTimeout(() => {
                  setMenu((current) =>
                    current === group.label ? null : current,
                  );
                }, 180);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  cancelHoverClose();
                  setMenu((current) =>
                    current === group.label ? null : current,
                  );
                }
              }}
            >
              <button
                type="button"
                aria-expanded={menu === group.label}
                aria-controls={`baselane-${group.label.replaceAll(" ", "-")}`}
                onClick={() => {
                  cancelHoverClose();
                  setMenu(menu === group.label ? null : group.label);
                }}
              >
                {group.label}
                <CaretDown size={13} />
              </button>
              {menu === group.label && (
                <div
                  id={`baselane-${group.label.replaceAll(" ", "-")}`}
                  className={`${styles.dropdown}${group.label === "Portfolios" ? ` ${styles.dropdownWithBanner}` : ""}${group.label === "Resources" && latestBlogPosts.length ? ` ${styles.dropdownWithPosts}` : ""}`}
                >
                  {group.columns.map((column) => (
                    <div className={styles.dropdownColumn} key={column.heading}>
                      <h3>{column.heading}</h3>
                      {column.links.map((link) => (
                        <a
                          key={link.title}
                          href={link.href}
                          onClick={closeMenus}
                        >
                          <Image
                            className={styles.menuItemIcon}
                            src={
                              blMenuIcons[link.title] ??
                              link.iconSrc ??
                              "/brand/navigation/bl-stroke/01-laptop.svg"
                            }
                            alt=""
                            width={28}
                            height={28}
                            unoptimized
                          />
                          <span>{link.title}</span>
                          {link.badge ? <small>{link.badge}</small> : null}
                        </a>
                      ))}
                    </div>
                  ))}
                  {group.label === "Resources" &&
                    latestBlogPosts.length > 0 && (
                      <section
                        className={styles.menuBlogSection}
                        aria-label="Latest from Innflow"
                      >
                        <div className={styles.menuBlogHeading}>
                          <h3>Latest from Innflow</h3>
                          <a href="/blog" onClick={closeMenus}>
                            View all posts{" "}
                            <ArrowRight size={14} aria-hidden="true" />
                          </a>
                        </div>
                        <div className={styles.menuBlogGrid}>
                          {latestBlogPosts.slice(0, 4).map((post) => (
                            <TrackedLink
                              key={post.href}
                              destination={post.href}
                              eventLabel="baselane_menu_latest_blog_post"
                              className={styles.menuBlogCard}
                              onClick={closeMenus}
                            >
                              <span className={styles.menuBlogMedia}>
                                {post.imageUrl ? (
                                  <Image
                                    src={post.imageUrl}
                                    alt={post.imageAlt}
                                    width={720}
                                    height={512}
                                    sizes="(min-width: 1380px) 230px, 250px"
                                  />
                                ) : (
                                  <Newspaper size={32} aria-hidden="true" />
                                )}
                              </span>
                              <span className={styles.menuBlogMeta}>
                                {[post.categoryLabel, post.publishedLabel]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </span>
                              <strong>{post.title}</strong>
                            </TrackedLink>
                          ))}
                        </div>
                      </section>
                    )}
                  {group.label === "Portfolios" && (
                    <TrackedLink
                      className={styles.dropdownBanner}
                      destination="/contact"
                      eventLabel="baselane_menu_portfolio_talk_to_sales"
                      onClick={closeMenus}
                    >
                      <Image
                        src="/brand/navigation/ico-banner-real.png"
                        alt="Interested in our product? Contact us to discuss becoming a customer and finding solutions for your needs. Talk to sales."
                        width={2430}
                        height={776}
                        sizes="(min-width: 1181px) 900px, 1px"
                      />
                    </TrackedLink>
                  )}
                </div>
              )}
            </div>
          ))}
          <a href="/pricing">Pricing</a>
          <a href="/blog">Blog</a>
          <a
            className={styles.mobileLogin}
            href={`${siteConfig.appOrigin}/login`}
          >
            Log in
          </a>
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.login} href={`${siteConfig.appOrigin}/login`}>
            Log in
          </a>
          <TrackedLink
            className={styles.darkButton}
            destination={siteConfig.googleAuthUrl}
            eventLabel="baselane_header_signup"
            aria-label="Continue with Google"
          >
            <GoogleCtaContent mobileLabel="Continue" />
          </TrackedLink>
          <button
            ref={toggle}
            type="button"
            className={styles.menuToggle}
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
            aria-controls="baselane-mobile-overlay"
            onClick={() => {
              setMobile(!mobile);
              setMenu(null);
            }}
          >
            {mobile ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>
      <MobileNavigation
        open={mobile}
        latestBlogPosts={latestBlogPosts}
        onClose={closeMenus}
        iconOverrides={blMenuIcons}
        id="baselane-mobile-overlay"
        className={styles.mobileMenu}
        pricingHref="/pricing"
        loginHref={`${siteConfig.appOrigin}/login`}
      />
    </div>
  );
}
