"use client";

import { useState } from "react";
import { BLOG_CATEGORIES } from "@/lib/blog";
import { humanizeCategory } from "@/lib/sanity";
import styles from "./article.module.css";

export function BlogTaxonomy({
  category,
  industries,
  tags,
}: {
  category: string;
  industries: string[];
  tags: string[];
}) {
  const [open, setOpen] = useState(false);
  const extraTypes = BLOG_CATEGORIES.filter((item) => item.value !== category);

  return (
    <div className={styles.taxonomy}>
      {industries.length > 0 ? (
        <section className={styles.taxonomyBlock}>
          <p className={styles.metaLabel}>Industries</p>
          <ul className={styles.pills}>
            {industries.map((item) => (
              <li key={item}>
                <a
                  className={styles.pill}
                  href={`/blog?industry=${encodeURIComponent(item)}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tags.length > 0 ? (
        <section className={styles.taxonomyBlock}>
          <p className={styles.metaLabel}>Tags</p>
          <ul className={styles.pills}>
            {tags.map((tag) => (
              <li key={tag}>
                <a
                  className={styles.pill}
                  href={`/blog?q=${encodeURIComponent(tag)}`}
                >
                  {tag}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className={styles.taxonomyBlock}>
        <p className={styles.metaLabel}>Content types</p>
        <ul className={styles.pills}>
          <li>
            <a
              className={`${styles.pill} ${styles.pillActive}`}
              href={`/blog?category=${encodeURIComponent(category)}`}
            >
              {humanizeCategory(category)}
            </a>
          </li>
          {open
            ? extraTypes.map((item) => (
                <li key={item.value}>
                  <a
                    className={styles.pill}
                    href={`/blog?category=${encodeURIComponent(item.value)}`}
                  >
                    {item.title}
                  </a>
                </li>
              ))
            : null}
        </ul>
        {extraTypes.length > 0 ? (
          <button
            type="button"
            className={styles.showMore}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            {open ? "Show less" : "Show more"}
          </button>
        ) : null}
      </section>
    </div>
  );
}
