import type { ReactNode } from "react";
import { StoryboardArtwork } from "@/app/preview/scroll-showcase/storyboard-artwork";
import numberedDemos from "../../public/brand/homepage/manifest.json";
import type { StoryLink, StorySection } from "@/content/feature-story";
import {
  getProductLayout,
  type ProductLayoutKey,
  type ProductMotion,
} from "@/content/product-story-layouts";
import { FeaturePageInk } from "./feature-page-ink";
import { TrackedLink } from "./tracked-link";
import styles from "./product-story-layout.module.css";

function Actions({ links, label }: { links: StoryLink[]; label: string }) {
  return (
    <div className={styles.actions}>
      {links.map((link, index) => (
        <TrackedLink
          key={link.label}
          destination={link.href}
          eventLabel={label}
          data-site-cta={index === 0 ? "primary" : "secondary"}
        >
          {link.label}
        </TrackedLink>
      ))}
    </div>
  );
}

function Media({ motion, title }: { motion: ProductMotion; title: string }) {
  if (typeof motion === "object") {
    return (
      <figure className={styles.brief} data-motion-brief={title}>
        <figcaption>{motion.brief}</figcaption>
      </figure>
    );
  }
  const base = "/brand/homepage/feature-lotties/";
  const demo =
    typeof motion === "number"
      ? numberedDemos.find((entry) => entry.number === motion)
      : {
          number: 0,
          title,
          src: base + motion + ".json",
          poster: base + motion + ".png",
        };
  if (!demo) throw new Error("Missing product storyboard: " + motion);
  return (
    <figure
      className={styles.art}
      aria-label={title}
      data-motion-src={demo.src}
      data-motion-poster={demo.poster}
    >
      <StoryboardArtwork storyboard={demo} />
    </figure>
  );
}

export function ProductStoryLayout({
  product,
  hero,
  close,
  renderSupporting,
}: {
  product: ProductLayoutKey;
  hero: StorySection;
  close: StorySection;
  renderSupporting: (id: string) => ReactNode;
}) {
  const {
    spotlight,
    showcase,
    grid,
    comparison,
    comparisonId,
    supporting,
    ...layout
  } = getProductLayout(product);
  const heroTitle = [hero.title, hero.emphasis].filter(Boolean).join(" ");
  return (
    <main
      id="main-content"
      className={styles.page}
      data-product-layout={product}
    >
      <FeaturePageInk />
      <section
        className={styles.hero}
        data-page-section="Hero"
        aria-labelledby={hero.id}
      >
        <h1 id={hero.id}>{heroTitle}</h1>
        <p>{hero.subtitle}</p>
        <Actions
          links={[hero.primary, hero.secondary].filter(
            (link): link is StoryLink => !!link,
          )}
          label={hero.id}
        />
        <div className={styles.heroMedia}>
          <Media motion={layout.hero} title={heroTitle} />
        </div>
      </section>
      <section
        id={spotlight.id}
        className={styles.spotlight}
        data-page-section="Feature story"
      >
        <div>
          <h2>{spotlight.title}</h2>
          <p>{spotlight.body}</p>
        </div>
        <Media motion={spotlight.motion} title={spotlight.title} />
      </section>
      <section
        id={showcase.id}
        className={styles.showcase}
        data-page-section="Workspace showcase"
      >
        <div className={styles.showcaseCopy}>
          <h2>{showcase.title}</h2>
          <p>{showcase.body}</p>
        </div>
        <Media motion={showcase.motion} title={showcase.title} />
      </section>
      <section
        id={grid.id}
        className={styles.capabilities}
        data-page-section="Capability grid"
      >
        <header>
          <h2>{grid.title}</h2>
          <p>{grid.body}</p>
        </header>
        <div className={styles.cards}>
          {grid.cards.map((card) => (
            <article id={card.id} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <Media motion={card.motion} title={card.title} />
            </article>
          ))}
        </div>
      </section>
      <section
        id={comparisonId}
        className={styles.comparison}
        data-page-section="Comparison"
      >
        <div>
          <h2>{comparison.title}</h2>
          {comparison.columns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      {supporting.map(renderSupporting)}
      <section
        className={styles.close}
        data-page-section="Closing CTA"
        aria-labelledby={close.id}
      >
        <h2 id={close.id}>{close.title}</h2>
        {close.subtitle && <p>{close.subtitle}</p>}
        <Actions links={close.links ?? []} label={close.id} />
      </section>
    </main>
  );
}
