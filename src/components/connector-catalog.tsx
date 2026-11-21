"use client";

import { useMemo, useState } from "react";
import { showFeatureItem } from "@/config/unbuilt-features";
import type { ConnectorGroup } from "@/content/wired-connectors";
import styles from "./connector-catalog.module.css";

const tilePalette = [
  "#f0e7f6",
  "#d9f3e4",
  "#d7ecff",
  "#ffe7c2",
  "#ffd9e8",
  "#e7e9ff",
];

function tileColor(name: string) {
  const index = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return tilePalette[index % tilePalette.length];
}

export function ConnectorCatalog({ groups }: { groups: ConnectorGroup[] }) {
  const visible = groups
    .map((group) => ({
      ...group,
      items: group.items.filter(showFeatureItem),
    }))
    .filter((group) => group.items.length > 0);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const names = ["All", ...visible.map((group) => group.name)];
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return visible
      .filter((group) => filter === "All" || group.name === filter)
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.name.toLowerCase().includes(needle),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [filter, query, visible]);

  return (
    <div className={styles.catalog}>
      <label className={styles.search}>
        <span>Search connectors</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          placeholder="Search the tools your team already uses"
        />
      </label>
      <fieldset className={styles.filters}>
        <legend className={styles.legend}>Connector groups</legend>
        {names.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </fieldset>
      {shown.map((group) => (
        <section key={group.name} aria-label={group.name}>
          <h3>{group.name}</h3>
          <ul>
            {group.items.map((item) => (
              <li
                key={item.name}
                data-unbuilt={item.unbuilt ? "true" : undefined}
              >
                <span
                  className={styles.tile}
                  style={{ background: tileColor(item.name) }}
                  aria-hidden="true"
                >
                  {item.name.slice(0, 1)}
                </span>
                {item.href ? (
                  <a href={item.href}>{item.name}</a>
                ) : (
                  <span>{item.name}</span>
                )}
                {item.note ? <small>{item.note}</small> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
