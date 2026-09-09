"use client";

import { ArrowLeft, ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-library.module.css";
import data from "./baselane-library-data.json";

type Item = (typeof data.articles)[number];
const articleCategories = [
  "All resources",
  "Property operations",
  "Records & reviews",
  "Planning tools",
  "Team workflows",
];
const webinarCategories = [
  "All topics",
  "Property operations",
  "Records & reviews",
];
function Cards({ title, items }: { title: string; items: Item[] }) {
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? items : items.slice(page * 3, page * 3 + 3);
  return (
    <section className={styles.collection} aria-label={title}>
      <h2>{title}</h2>
      <div className={styles.cards}>
        {shown.map((item) => (
          <a key={item.href} href={item.href} className={styles.card}>
            <div className={styles.cardImage}>
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width:700px) 100vw, 33vw"
              />
              {!item.href.includes("/webinars/") && (
                <small>INNFLOW RESOURCE</small>
              )}
            </div>
            <div className={styles.cardCopy}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>Explore with innflow →</span>
            </div>
          </a>
        ))}
      </div>
      {items.length > 3 && (
        <div className={styles.rowControls}>
          <button
            type="button"
            onClick={() => {
              setExpanded(!expanded);
              setPage(0);
            }}
          >
            {expanded ? "Show fewer" : "View all"} <ArrowRight size={16} />
          </button>
          {!expanded && (
            <div>
              <button
                type="button"
                aria-label={`Previous ${title}`}
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                <ArrowLeft size={18} />
              </button>
              <span className={styles.srOnly} aria-live="polite">
                Page {page + 1} of {Math.ceil(items.length / 3)}
              </span>
              <button
                type="button"
                aria-label={`Next ${title}`}
                disabled={(page + 1) * 3 >= items.length}
                onClick={() => setPage(page + 1)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
export function BaselaneLibrary({ kind }: { kind: "articles" | "webinars" }) {
  const isWebinar = kind === "webinars";
  const items = isWebinar ? data.webinars : data.articles;
  const categories = isWebinar ? webinarCategories : articleCategories;
  const [category, setCategory] = useState(categories[0]);
  const [search, setSearch] = useState("");
  const tabs = useRef<HTMLElement>(null);
  const all = category === categories[0];
  const filtered = items.filter(
    (item) =>
      (all || item.category === category) &&
      `${item.title} ${item.description} ${item.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const featured = items
    .slice(0, 3)
    .map((item) => [item.category, item.title, item.href]);
  return (
    <BaselaneHomepage>
      <section className={styles.featured}>
        <h1>
          {isWebinar
            ? "Learn how innflow works"
            : "Resources for connected property work"}
        </h1>
        <p className={styles.attribution}>
          Explore{" "}
          {isWebinar
            ? "self-guided workflow topics"
            : "practical tools and workflow guides"}{" "}
          for your property team. Start with the process you want to improve.
        </p>
        <div className={styles.featureGrid}>
          <article
            className={`${styles.heroCard} ${isWebinar ? styles.webinarHero : ""}`}
          >
            <Image
              src={isWebinar ? data.webinarHero : data.articleHero}
              alt=""
              fill
              sizes="(max-width:700px) 100vw, 55vw"
              preload
            />
            <div>
              <small>
                {isWebinar ? "WORKFLOW WALKTHROUGH" : "FEATURED RESOURCE"}
              </small>
              <h2>
                {isWebinar
                  ? "Start with your team’s real work"
                  : "One place for your property operations"}
              </h2>
              {!isWebinar && (
                <p>
                  See how innflow connects recurring tasks, property context,
                  and human review in one workspace.
                </p>
              )}
              <a href={isWebinar ? siteConfig.demoUrl : "/BL/BL-home"}>
                {isWebinar ? "Book a demo" : "Explore innflow"}{" "}
                <ArrowRight size={16} />
              </a>
            </div>
          </article>
          <div className={styles.featureLinks}>
            {featured.map(([label, title, href]) => (
              <a href={href} key={href}>
                <small>{label}</small>
                <h2>{title}</h2>
                <span>
                  <ArrowRight size={20} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.filterBar} aria-label="Browse resources">
        <div className={styles.filters}>
          <nav className={styles.tabs} ref={tabs} aria-label="Categories">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                aria-pressed={category === cat}
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
          {!isWebinar && (
            <label className={styles.search}>
              <MagnifyingGlass size={20} />
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search resources"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          )}
        </div>
      </section>
      <div className={styles.collections}>
        {!all || search.trim() ? (
          <>
            <p className={styles.results} role="status">
              {filtered.length}{" "}
              {filtered.length === 1 ? "resource" : "resources"} found
              {search.trim() ? ` for “${search.trim()}”` : ""}.
            </p>
            {filtered.length > 0 ? (
              <Cards
                key={`${category}-${search}`}
                title={all ? "Search results" : category}
                items={filtered}
              />
            ) : (
              <div className={styles.empty}>
                <h2>No matching resources.</h2>
                <p>
                  Try another category or search, or visit the full collection.
                </p>
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
            {!all && (
              <a className={styles.fullCollection} href="/blog">
                Read the innflow blog <ArrowRight size={16} />
              </a>
            )}
          </>
        ) : isWebinar ? (
          <Cards title="Explore workflow topics" items={items} />
        ) : (
          [
            "Property operations",
            "Records & reviews",
            "Planning tools",
            "Team workflows",
          ].map((title) => (
            <Cards
              key={title}
              title={title}
              items={items.filter((i) => i.category === title)}
            />
          ))
        )}
      </div>
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
          <p>Connect your property operations with innflow.</p>
          <div className={styles.actions}>
            <a href={siteConfig.googleAuthUrl} className={styles.google}>
              <GoogleCtaContent />
            </a>
            <a href={siteConfig.demoUrl}>
              See demo <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </BaselaneHomepage>
  );
}
