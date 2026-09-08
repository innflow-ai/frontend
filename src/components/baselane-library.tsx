"use client";
import { ArrowLeft, ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-library.module.css";
import data from "./baselane-library-data.json";

type Item = (typeof data.articles)[number];
const articleCategories = [
  "All articles",
  "Baselane News",
  "Bookkeeping",
  "Insurance",
  "Loans",
  "Property Management",
  "Real estate banking",
  "Real Estate Investing",
  "Rental market trends",
  "Rent Collection",
  "Software Comparisons",
  "Taxes & Reporting",
];
const webinarCategories = [
  "All masterclasses",
  "Tax Preparation",
  "Rental Payments",
  "Bookkeeping",
  "Real Estate Investing",
];
const categoryPaths: Record<string, string> = {
  "Baselane News": "baselane-news",
  Bookkeeping: "bookkeeping",
  Insurance: "insurance",
  Loans: "financing",
  "Property Management": "property-management",
  "Real estate banking": "real-estate-banking",
  "Real Estate Investing": "real-estate-investing",
  "Rental market trends": "trends",
  "Rent Collection": "rent-collection",
  "Software Comparisons": "compare",
  "Taxes & Reporting": "taxes",
  "Tax Preparation": "tax-preparation",
  "Rental Payments": "rental-payments",
};
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
                <small>BASELANE RESOURCE</small>
              )}
            </div>
            <div className={styles.cardCopy}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>View on Baselane ↗</span>
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
  const featured = isWebinar
    ? [
        [
          "REAL ESTATE MASTERCLASS",
          data.webinars[0].title,
          data.webinars[0].href,
        ],
        [
          "BOOKKEEPING MASTERCLASS",
          data.webinars[5].title,
          data.webinars[5].href,
        ],
        ["TAX PREP MASTERCLASS", data.webinars[1].title, data.webinars[1].href],
      ]
    : [
        [
          "GUIDE",
          "Airbnb vs. long-term rental investment strategies",
          "https://www.baselane.com/resources/airbnb-vs-renting-out",
        ],
        [
          "ARTICLE",
          "Best banks for real estate investors",
          "https://www.baselane.com/resources/best-banks-for-real-estate-investors",
        ],
        [
          "RESOURCE",
          "Rental property tax write-offs",
          "https://www.baselane.com/resources/rental-property-tax-write-offs",
        ],
      ];
  return (
    <BaselaneHomepage>
      <section className={styles.featured}>
        <h1>Featured {isWebinar ? "masterclasses" : "articles"}</h1>
        <p className={styles.attribution}>
          Selected {isWebinar ? "sessions" : "reading"} from Baselane. Links
          open the original publisher’s pages.
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
                {isWebinar ? "BASELANE TRAINING" : "FEATURED ARTICLE"}
              </small>
              <h2>
                {isWebinar
                  ? "New customer onboarding training"
                  : "U.S. rental market trends and conditions"}
              </h2>
              {!isWebinar && (
                <p>
                  Explore Baselane’s overview of the rental market and the
                  trends affecting property owners.
                </p>
              )}
              <a
                href={
                  isWebinar
                    ? "https://baselane.zoom.us/webinar/register/WN_w0yvoGYeQFqah-HrDmfTuA"
                    : "https://www.baselane.com/resources/rental-market-trends"
                }
              >
                {isWebinar ? "View registration" : "Read now"}{" "}
                <ArrowRight size={16} />
              </a>
            </div>
          </article>
          <div className={styles.featureLinks}>
            {featured.map(([label, title, href]) => (
              <a href={href} key={label}>
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
                aria-label="Search articles"
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
              <a
                className={styles.fullCollection}
                href={`https://www.baselane.com/${isWebinar ? "webinar" : "category"}/${categoryPaths[category]}`}
              >
                Browse this topic on Baselane <ArrowRight size={16} />
              </a>
            )}
          </>
        ) : isWebinar ? (
          <Cards title="Latest masterclasses" items={items} />
        ) : (
          [
            "Rental market trends",
            "Real estate banking",
            "Latest articles",
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
          <p>Connect your property operations with Innflow.</p>
          <div className={styles.actions}>
            <a href="https://app.innflow.ai/login" className={styles.google}>
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
