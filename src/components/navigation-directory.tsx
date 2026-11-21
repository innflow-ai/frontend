"use client";

import Link from "next/link";
import styles from "@/app/connections/page.module.css";
import { MixedHeadingText } from "@/components/mixed-heading-text";
import { Breadcrumbs } from "./breadcrumbs";
import { InnerPageShell } from "./inner-page-shell";
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
    <InnerPageShell>
      <div className={styles.directory}>
        <header className={styles.intro}>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: title }]}
          />
          <h1 data-mixed-heading>
            <MixedHeadingText>Browse all {kind}</MixedHeadingText>
          </h1>
          <p>
            {kind === "products" ? (
              <>
                Explore the <strong>Innflow platform</strong>, agents, tools,
                and integrations.
              </>
            ) : (
              <>
                Find industry and team solutions for{" "}
                <strong>agentic workflows</strong> across your organization.
              </>
            )}
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
    </InnerPageShell>
  );
}
