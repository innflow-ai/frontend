import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MarketingPage } from "@/components/page-primitives";
import { PlatformDirectory } from "@/components/platform-directory";
import { TrackedLink } from "@/components/tracked-link";
import type { PlatformDetail } from "@/content/platform-details";
import styles from "./platform-feature-page.module.css";

export function PlatformFeaturePage({ page }: { page: PlatformDetail }) {
  return (
    <MarketingPage>
      <section className={styles.hero}>
        <div className="shell">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Platform", href: "/platform" },
              { label: page.title },
            ]}
          />
          <div className={styles.heroGrid}>
            <div>
              <span className="section-label">{page.title}</span>
              <h1>{page.headline}</h1>
              <p>{page.description}</p>
              <div className={styles.actions}>
                <TrackedLink
                  className="button button-primary"
                  destination="/contact"
                  eventLabel={`${page.slug}_contact`}
                >
                  Talk to our team <span aria-hidden="true">↗</span>
                </TrackedLink>
                <a className="button button-secondary" href="#capabilities">
                  Explore capabilities <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <div className={styles.heroArt}>
              <Image
                src={page.hero}
                alt={
                  page.heroAlt ??
                  (page.slug === "self-learning"
                    ? "Blue circular arrows representing a learning cycle"
                    : "Blue modular blocks representing connected automation")
                }
                width={1152}
                height={1152}
                sizes="(max-width: 760px) 80vw, 40vw"
                preload
              />
            </div>
          </div>
        </div>
      </section>
      <section id="capabilities" className={styles.capabilities}>
        <div className="shell">
          <div className={styles.intro}>
            <span className="section-label">{page.title}</span>
            <h2>{page.intro}</h2>
          </div>
          <div className={styles.cards}>
            {page.capabilities.map((capability, index) => (
              <a
                className={styles.card}
                href={`#${capability.id}`}
                key={capability.id}
              >
                <div className={styles.cardCopy}>
                  <span className={styles.number}>
                    {String(index + 1).padStart(2, "0")} / {capability.label}
                  </span>
                  <h3>{capability.title}</h3>
                  <span className={styles.explore}>
                    Explore <span aria-hidden="true">↗</span>
                  </span>
                </div>
                <Image
                  src={capability.image}
                  alt={capability.alt}
                  width={1600}
                  height={600}
                  sizes="(max-width: 760px) 92vw, 46vw"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
      <div className={`shell ${styles.details}`}>
        <nav
          className={styles.sectionNav}
          aria-label={`${page.title} sections`}
        >
          <span className="section-label">On this page</span>
          {page.capabilities.map((capability) => (
            <a key={capability.id} href={`#${capability.id}`}>
              {capability.label}
            </a>
          ))}
        </nav>
        <div className={styles.sections}>
          {page.capabilities.map((capability, index) => (
            <section
              className={styles.detail}
              id={capability.id}
              key={capability.id}
            >
              <span className="section-label">
                {String(index + 1).padStart(2, "0")} / {capability.label}
              </span>
              <h2>{capability.title}</h2>
              <p>{capability.body}</p>
              <ul>
                {capability.points.map((point) => (
                  <li key={point}>
                    <span aria-hidden="true">↗</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Image
                src={capability.image}
                alt={capability.alt}
                width={1600}
                height={600}
                sizes="(max-width: 760px) 92vw, 65vw"
              />
            </section>
          ))}
        </div>
      </div>
      <section className={styles.cta}>
        <div className="shell">
          <span className="section-label">Your next workflow</span>
          <h2>
            {page.slug === "self-learning"
              ? "Make the next task better than the last."
              : "Start with one operation worth improving."}
          </h2>
          <p>
            Bring your process, your tools, and the people who know the work.
            Let’s explore what comes next.
          </p>
          <Link className="button button-primary" href="/contact">
            Talk to our team <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <PlatformDirectory currentSlug={page.slug} />
    </MarketingPage>
  );
}
