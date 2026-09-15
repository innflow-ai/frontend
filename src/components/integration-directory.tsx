"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  filterIntegrations,
  type Integration,
  integrationStatuses,
} from "@/lib/integration-model";
import { IntegrationCard } from "./integration-card";
import styles from "./integrations.module.css";
export function IntegrationDirectory({ items }: { items: Integration[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(24);
  const categories = useMemo(
    () =>
      Array.from(
        new Map(
          items.flatMap((item) =>
            item.category ? [[item.category.slug, item.category] as const] : [],
          ),
        ).values(),
      ).sort((a, b) => a.title.localeCompare(b.title)),
    [items],
  );
  const results = filterIntegrations(items, search, category, status);
  function reset() {
    setSearch("");
    setCategory("");
    setStatus("");
    setLimit(24);
  }
  return (
    <section
      className={`shell ${styles.directory}`}
      aria-label="Integration directory"
    >
      <aside className={styles.sidebar}>
        <h2>Categories</h2>
        <div className={styles.categories}>
          <button
            type="button"
            aria-pressed={category === ""}
            onClick={() => {
              setCategory("");
              setLimit(24);
            }}
          >
            All integrations <span>{items.length}</span>
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={category === item.slug}
              onClick={() => {
                setCategory(item.slug);
                setLimit(24);
              }}
            >
              {item.title}
              <span>
                {items.filter((i) => i.category?.slug === item.slug).length}
              </span>
            </button>
          ))}
        </div>
        <div className={styles.request}>
          <h3>Missing a connection?</h3>
          <p>Tell us which tool belongs in your workflow.</p>
          <Link href="/contact">Request an integration ↗</Link>
        </div>
      </aside>
      <div className={styles.results}>
        <div className={styles.toolbar}>
          <label className={styles.search}>
            <span className={styles.srOnly}>Search integrations</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              placeholder="Search your tools…"
              onChange={(e) => {
                setSearch(e.target.value);
                setLimit(24);
              }}
            />
          </label>
          <label className={styles.statusFilter}>
            <span className={styles.srOnly}>Availability</span>
            <select
              aria-label="Availability"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setLimit(24);
              }}
            >
              <option value="">All statuses</option>
              {Object.entries(integrationStatuses).map(([value, item]) => (
                <option key={value} value={value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className={styles.count} role="status">
          {results.length}{" "}
          {results.length === 1 ? "integration" : "integrations"}
          {category
            ? ` in ${categories.find((c) => c.slug === category)?.title}`
            : " to explore"}
        </p>
        <div className={styles.grid}>
          {results.slice(0, limit).map((item) => (
            <IntegrationCard key={item._id} item={item} />
          ))}
        </div>
        {results.length === 0 && (
          <div className={styles.empty}>
            <h2>No integrations found</h2>
            <p>Try another search or browse all categories.</p>
            <button type="button" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
        {results.length > limit && (
          <button
            className={styles.loadMore}
            type="button"
            onClick={() => setLimit(limit + 24)}
          >
            Show more integrations
          </button>
        )}
      </div>
    </section>
  );
}
