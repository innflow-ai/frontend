"use client";

import Link from "next/link";
import styles from "@/app/connections/page.module.css";
import { BaselaneHomepage } from "./baselane-homepage";
import { Breadcrumbs } from "./breadcrumbs";
import {
  allProductColumns,
  allSolutionsColumns,
  directorySectionId,
} from "./mega-menu";

export function NavigationDirectory({
  kind,
}: {
  kind: "products" | "solutions";
}) {
  const title = kind === "products" ? "Products" : "Solutions";
  const columns = kind === "products" ? allProductColumns : allSolutionsColumns;
  return (
    <BaselaneHomepage>
      <div className={styles.directory}>
        <header className={styles.intro}>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: title }]}
          />
          <h1>Browse all {kind}</h1>
          <p>
            {kind === "products"
              ? "Explore the Innflow platform, agents, tools, and integrations."
              : "Find solutions for property operations, leasing, teams, and finance."}
          </p>
        </header>
        <nav className={styles.groups} aria-label={`${title} directory`}>
          {columns.map((column) => (
            <section
              key={column.heading}
              id={directorySectionId(column.heading)}
              className={styles.group}
            >
              <h2>{column.heading}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
    </BaselaneHomepage>
  );
}
