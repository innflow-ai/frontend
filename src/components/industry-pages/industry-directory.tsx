import Link from "next/link";
import { industryHref, industryPages } from "@/content/industries";
import styles from "./industry-pages.module.css";

export function IndustryDirectory({ compact = false }: { compact?: boolean }) {
  const groups = compact ? ["industry"] : ["industry", "solution"];
  const featured = [
    "financial-services-banking",
    "healthcare",
    "property-management",
    "retail-ecommerce",
    "professional-services",
    "technology-software",
  ];
  return (
    <section
      className={styles.directory}
      id="industries"
      aria-labelledby="industry-directory-heading"
    >
      <header className={styles.sectionHeading}>
        <p className={styles.eyebrow}>Built around your work</p>
        <h2 id="industry-directory-heading">
          Different industries.
          <br />
          One connected flow.
        </h2>
        <p>
          Start with the conversations and handoffs your team knows best.
          Explore a workflow for your world.
        </p>
      </header>
      {groups.map((group) => (
        <div key={group} className={styles.directoryGroup}>
          {!compact && (
            <h3>
              {group === "industry"
                ? "Explore by industry"
                : "Explore by team and use case"}
            </h3>
          )}
          <div className={styles.directoryGrid}>
            {industryPages
              .filter((page) =>
                compact ? featured.includes(page.slug) : page.group === group,
              )
              .map((page) => (
                <Link
                  href={industryHref(page.slug)}
                  key={page.slug}
                  className={styles.directoryCard}
                >
                  <span
                    className={styles.cardMark}
                    style={{ background: page.surface }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                  <h3>{page.name}</h3>
                  <p>{page.description}</p>
                  <span className={styles.cardAction}>
                    Explore {page.name}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      ))}
      {compact && (
        <Link className={styles.secondary} href="/solutions">
          Explore all industries and solutions <span aria-hidden="true">↗</span>
        </Link>
      )}
    </section>
  );
}
