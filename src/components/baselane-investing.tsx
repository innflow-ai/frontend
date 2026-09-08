"use client";
import { ArrowLeft, ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { BaselaneHomepage } from "./baselane-homepage";
import items from "./baselane-investing-data.json";
import styles from "./baselane-library.module.css";

const categories = [
  "Real Estate Investing",
  "Rental market trends",
  "Real estate banking",
  "Property Management",
  "Bookkeeping",
  "Loans",
  "Software Comparisons",
];
export function BaselaneInvesting() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const tabs = useRef<HTMLElement>(null);
  const filtered = items.filter(
    (i) =>
      (category === categories[0] || i.category === category) &&
      `${i.title} ${i.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  return (
    <BaselaneHomepage>
      <div className={styles.categoryTop} />
      <section
        className={styles.filterBar}
        aria-label="Browse investing resources"
      >
        <div className={styles.filters}>
          <nav
            className={styles.tabs}
            ref={tabs}
            aria-label="Investing categories"
          >
            <a className={styles.allLink} href="/BL/BL-resources">
              All articles
            </a>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                aria-pressed={cat === category}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>
          <div className={styles.tabArrows}>
            <button
              type="button"
              aria-label="Previous categories"
              onClick={() =>
                tabs.current?.scrollBy({ left: -300, behavior: "smooth" })
              }
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="More categories"
              onClick={() =>
                tabs.current?.scrollBy({ left: 300, behavior: "smooth" })
              }
            >
              <ArrowRight size={18} />
            </button>
          </div>
          <label className={styles.search}>
            <MagnifyingGlass size={20} />
            <input
              type="search"
              placeholder="Search..."
              aria-label="Search investing articles"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </section>
      <section className={`${styles.collections} ${styles.investing}`}>
        <h1>{category}</h1>
        <p className={styles.attribution}>
          Selected reading from Baselane. Links open the original publisher’s
          pages.
        </p>
        <p className={styles.results} role="status">
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
        </p>
        <div className={styles.cards}>
          {filtered.map((i) => (
            <a href={i.href} key={i.href} className={styles.card}>
              <div className={styles.cardImage}>
                <Image
                  src={i.image}
                  alt=""
                  fill
                  sizes="(max-width:700px) 100vw, 33vw"
                />
                <small>{i.category}</small>
              </div>
              <div className={styles.cardCopy}>
                <h2>{i.title}</h2>
                <p>{i.description}</p>
                <span>View on Baselane ↗</span>
              </div>
            </a>
          ))}
        </div>
        {!filtered.length && (
          <div className={styles.empty}>
            <h2>No matching resources.</h2>
            <p>Try another topic or reset your search.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory(categories[0]);
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
      <section className={styles.closing}>
        <picture>
          <source
            media="(max-width:700px)"
            srcSet="/brand/baselane-inspired/renters/closing-mobile.webp"
          />
          <Image
            src="/brand/baselane-inspired/renters/closing-desktop.webp"
            alt=""
            fill
            sizes="100vw"
          />
        </picture>
        <div>
          <h2>More room for what comes next.</h2>
          <p>Connect your property operations with Innflow.</p>
          <div className={styles.actions}>
            <a className={styles.google} href="https://app.innflow.ai/login">
              <Image src="/brand/google-g.svg" alt="" width={18} height={18} />
              Continue with Google
            </a>
            <a href="/demo">
              See demo <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </BaselaneHomepage>
  );
}
