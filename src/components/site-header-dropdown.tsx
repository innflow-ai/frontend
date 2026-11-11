"use client";

import Image from "next/image";
import { ArrowRight } from "@/components/icons/mage/ArrowRight";
import { NoteText as Newspaper } from "@/components/icons/mage/NoteText";
import type { Testimonial } from "@/lib/testimonials";
import {
  type LatestBlogPostNavItem,
  menuBrowseLinks,
  productColumns,
  resourcesColumns,
  solutionsColumns,
} from "./mega-menu-content";
import styles from "./site-shell.module.css";
import { TestimonialCard } from "./testimonial-cards";
import { TrackedLink } from "./tracked-link";

const columnsByLabel = {
  Product: productColumns,
  Solutions: solutionsColumns,
  Resources: resourcesColumns,
} as const;

/**
 * Desktop menu panel. Loaded on hover or click so its icon set stays out of
 * the first paint. Markup matches the previous inline panel.
 */
export function HeaderDropdown({
  label,
  closeMenus,
  latestBlogPosts,
  latestUpdate,
  testimonial,
}: {
  label: string;
  closeMenus: () => void;
  latestBlogPosts: LatestBlogPostNavItem[];
  latestUpdate: LatestBlogPostNavItem | null;
  testimonial: Testimonial | null;
}) {
  const columns = columnsByLabel[label as keyof typeof columnsByLabel];
  if (!columns) return null;
  const browse = menuBrowseLinks[label];

  return (
    <div
      id={`baselane-${label.replaceAll(" ", "-")}`}
      className={`${styles.dropdown}${label === "Portfolios" ? ` ${styles.dropdownWithBanner}` : ""}${label === "Resources" && latestBlogPosts.length ? ` ${styles.dropdownWithPosts}` : ""}${(label === "Product" && latestUpdate) || (label === "Solutions" && testimonial) ? ` ${styles.dropdownWithUpdate}` : ""}`}
    >
      {columns.map((column) => (
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
                <link.icon className={styles.menuItemIcon} size={28} />
              )}
              <span>{link.title}</span>
              {link.badge ? <small>{link.badge}</small> : null}
            </a>
          ))}
        </div>
      ))}
      {label === "Solutions" && testimonial && (
        <section
          className={styles.menuUpdateSection}
          aria-label="Customer testimonial"
        >
          <h3>In their own words</h3>
          <TestimonialCard item={testimonial} />
        </section>
      )}
      {label === "Product" && latestUpdate && (
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
      {browse && (
        <a
          className={styles.browseAll}
          data-browse-all
          href={browse.href}
          onClick={closeMenus}
        >
          <span>{browse.title}</span>
        </a>
      )}
      {label === "Resources" && latestBlogPosts.length > 0 && (
        <section
          className={styles.menuBlogSection}
          aria-label="Latest from Innflow"
        >
          <div className={styles.menuBlogHeading}>
            <h3>Latest from Innflow</h3>
            <a href="/blog" onClick={closeMenus}>
              View all posts <ArrowRight size={14} aria-hidden="true" />
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
      {label === "Portfolios" && (
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
  );
}
