import Link from "next/link";
import { platformPages } from "@/content/platform";
import styles from "./platform-directory.module.css";

export function PlatformDirectory({ currentSlug }: { currentSlug?: string }) {
  return (
    <section
      className="section quiet-section"
      aria-labelledby="platform-pages-title"
    >
      <div className="shell">
        <div className="section-intro compact-intro">
          <span className="section-label">Platform</span>
          <h2 id="platform-pages-title">
            {currentSlug
              ? "Explore more of the platform."
              : "Explore the platform."}
          </h2>
        </div>
        <div className={styles.grid}>
          {platformPages
            .filter((page) => page.slug !== currentSlug)
            .map((page) => (
              <Link
                className={styles.card}
                href={`/platform/${page.slug}`}
                key={page.slug}
              >
                <h3>
                  {page.title}
                  <span aria-hidden="true">↗</span>
                </h3>
                <p>{page.description}</p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
