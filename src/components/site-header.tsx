"use client";

import {
  ArrowRight,
  CaretDown,
  List,
  Megaphone,
  Newspaper,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { GoogleCtaContent } from "@/components/google-cta-content";
import {
  menuBrowseLinks,
  productColumns,
  resourcesColumns,
  solutionsColumns,
} from "@/components/mega-menu";
import { SignupOfferPopup } from "@/components/signup-offer-popup";
import { siteConfig } from "@/config/site";
import { INNER_PAGE_ANNOUNCEMENTS_ENABLED } from "@/lib/marketing-chrome";
import { isShowcaseHome, usesShowcaseDesign } from "@/lib/showcase-routes";
import { blMenuIcons } from "./bl-menu-icons";
import { MobileNavigation } from "./editorial-header";
import {
  useNavigationAppUpdate,
  useNavigationBlogPosts,
  useNavigationTestimonial,
} from "./navigation-blog-posts";
import previewStyles from "./site-header-preview.module.css";
import styles from "./site-shell.module.css";
import { TestimonialCard } from "./testimonial-cards";
import { TrackedLink } from "./tracked-link";

const menus = [
  { label: "Product", columns: productColumns },
  { label: "Solutions", columns: solutionsColumns },
  { label: "Resources", columns: resourcesColumns },
];
export function SiteHeader() {
  const latestBlogPosts = useNavigationBlogPosts();
  const latestUpdate = useNavigationAppUpdate();
  const testimonial = useNavigationTestimonial();
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const isShowcasePreview = usesShowcaseDesign(pathname);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const announcementHidden =
    announcementDismissed ||
    (!INNER_PAGE_ANNOUNCEMENTS_ENABLED && !isShowcaseHome(pathname));
  const [signupOfferOpen, setSignupOfferOpen] = useState(false);
  const [previewShowcasePassed, setPreviewShowcasePassed] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const hoverClose = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!isShowcasePreview) return;
    const update = () => {
      const followingSection = document.getElementById("workspace-overview");
      // Keep the initial flat header in the document until the showcase passes.
      // The floating version returns as the next section enters the lower quarter.
      setPreviewShowcasePassed(
        window.scrollY > 16 &&
          (!isShowcaseHome(pathname) ||
            (followingSection !== null &&
              followingSection.getBoundingClientRect().top <=
                window.innerHeight * 0.75)),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isShowcasePreview, pathname]);
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
      className={`${styles.page} ${styles.chromeScope}${isShowcasePreview ? ` ${previewStyles.previewScope}` : ""}`}
      data-preview-chrome={isShowcasePreview || undefined}
      data-announcement-dismissed={
        isShowcasePreview ? announcementHidden : undefined
      }
    >
      {!isShowcasePreview && !announcementHidden && (
        <AnnouncementBar
          onDismiss={() => {
            setAnnouncementDismissed(true);
            header.current
              ?.querySelector<HTMLAnchorElement>('a[aria-label="innflow home"]')
              ?.focus();
          }}
        />
      )}
      {!isShowcasePreview && (
        <SignupOfferPopup
          open={signupOfferOpen}
          onOpen={() => setSignupOfferOpen(true)}
          onDismiss={() => setSignupOfferOpen(false)}
        />
      )}
      {isShowcasePreview && !announcementHidden && (
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
            aria-label="Learn more about the new Innflow experience"
          >
            Learn more <ArrowRight size={12} aria-hidden="true" />
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
      {isShowcasePreview && (
        <div className={previewStyles.navSpace} aria-hidden="true" />
      )}
      <header
        ref={header}
        data-preview-navigation={
          isShowcasePreview
            ? previewShowcasePassed || mobile
              ? "floating"
              : "flat"
            : undefined
        }
        className={`${styles.header}${mobile ? ` ${styles.mobileOpen}` : ""}${isShowcasePreview && !previewShowcasePassed && !mobile ? ` ${previewStyles.flatHeader}` : ""}`}
      >
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
                  className={`${styles.dropdown}${group.label === "Portfolios" ? ` ${styles.dropdownWithBanner}` : ""}${group.label === "Resources" && latestBlogPosts.length ? ` ${styles.dropdownWithPosts}` : ""}${(group.label === "Product" && latestUpdate) || (group.label === "Solutions" && testimonial) ? ` ${styles.dropdownWithUpdate}` : ""}`}
                >
                  {group.columns.map((column) => (
                    <div className={styles.dropdownColumn} key={column.heading}>
                      <h3>{column.heading}</h3>
                      {column.links.map((link) => (
                        <a
                          key={link.title}
                          href={link.href}
                          onClick={closeMenus}
                          data-browse-all={link.browseAll || undefined}
                        >
                          {!link.hideIcon && (
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
                          )}
                          <span>{link.title}</span>
                          {link.badge ? <small>{link.badge}</small> : null}
                        </a>
                      ))}
                    </div>
                  ))}
                  {group.label === "Solutions" && testimonial && (
                    <section
                      className={styles.menuUpdateSection}
                      aria-label="Customer testimonial"
                    >
                      <h3>In their own words</h3>
                      <TestimonialCard item={testimonial} />
                    </section>
                  )}
                  {group.label === "Product" && latestUpdate && (
                    <section
                      className={styles.menuUpdateSection}
                      aria-label="Company updates"
                    >
                      <h3>Company updates</h3>
                      <TrackedLink
                        destination={latestUpdate.href}
                        eventLabel="product_menu_latest_update"
                        className={styles.menuBlogCard}
                        onClick={closeMenus}
                      >
                        <span className={styles.menuBlogMedia}>
                          {latestUpdate.imageUrl ? (
                            <Image
                              src={latestUpdate.imageUrl}
                              alt={latestUpdate.imageAlt}
                              width={720}
                              height={389}
                              sizes="300px"
                            />
                          ) : (
                            <Newspaper size={28} aria-hidden="true" />
                          )}
                        </span>
                        <span className={styles.menuBlogMeta}>
                          {latestUpdate.publishedLabel}
                        </span>
                        <strong>{latestUpdate.title}</strong>
                        <span>
                          {latestUpdate.actionLabel}{" "}
                          <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </TrackedLink>
                    </section>
                  )}
                  {menuBrowseLinks[group.label] && (
                    <a
                      className={styles.browseAll}
                      data-browse-all
                      href={menuBrowseLinks[group.label]?.href}
                      onClick={closeMenus}
                    >
                      <span>{menuBrowseLinks[group.label]?.title}</span>
                    </a>
                  )}
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
                                    quality={100}
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
            className={styles.mobileGetStarted}
            destination={siteConfig.signupUrl}
            eventLabel="mobile_header_signup"
          >
            Get started
          </TrackedLink>
          <TrackedLink
            className={`${styles.darkButton} ${styles.desktopGoogle}`}
            destination={siteConfig.googleAuthUrl}
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
