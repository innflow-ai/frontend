import Image from "next/image";
import { FeatureCard, FeatureCardGrid } from "@/components/feature-card";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import type {
  ProductCapabilitiesSection,
  ProductCta,
  ProductDetailSection,
  ProductPage as ProductPageData,
} from "@/lib/product-pages";
import styles from "./product-page.module.css";

function ctaDestination(cta: ProductCta) {
  if (cta.destination === "signup") return siteConfig.signupUrl;
  if (cta.destination === "contact") return siteConfig.contactUrl;
  return siteConfig.demoUrl;
}

function CtaLink({
  cta,
  tone = "primary",
}: {
  cta: ProductCta;
  tone?: "primary" | "secondary";
}) {
  const destination = ctaDestination(cta);

  return (
    <TrackedLink
      className={`${styles.cta} ${tone === "primary" ? styles.ctaPrimary : styles.ctaSecondary}`}
      destination={destination}
      eventLabel={`product_${cta.destination}`}
    >
      {cta.label}
    </TrackedLink>
  );
}

function Capabilities({ section }: { section: ProductCapabilitiesSection }) {
  return (
    <section
      className={`${styles.capabilities} ${
        section.presentation === "five-feature"
          ? styles.capabilitiesPrimary
          : styles.capabilitiesSupporting
      }`}
      aria-label="Product capabilities"
    >
      <div className={styles.shell}>
        <FeatureCardGrid className={styles.capabilityGrid}>
          {section.cards.map((card) => (
            <FeatureCard
              key={card._key}
              image={card.image.url}
              imageAlt={card.image.alt}
              title={card.title}
              body={card.body}
            />
          ))}
        </FeatureCardGrid>
      </div>
    </section>
  );
}

function ProductDetail({ section }: { section: ProductDetailSection }) {
  return (
    <article
      id={section.anchor}
      className={`${styles.detail} ${section.theme === "dark" ? styles.detailDark : styles.detailLight}`}
    >
      <div
        className={`${styles.detailInner} ${
          section.mediaPosition === "left"
            ? styles.mediaLeft
            : styles.mediaRight
        }`}
      >
        <div className={styles.detailCopy}>
          <span className={styles.detailEyebrow}>{section.tocLabel}</span>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
          {section.points.length ? (
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className={styles.detailMedia}>
          <Image
            src={section.image.url}
            alt={section.image.alt}
            fill
            sizes="(max-width: 900px) calc(100vw - 48px), 50vw"
            placeholder={section.image.lqip ? "blur" : "empty"}
            blurDataURL={section.image.lqip}
          />
        </div>
      </div>
    </article>
  );
}

export function ProductPage({ product }: { product: ProductPageData }) {
  const details = product.sections.filter(
    (section): section is ProductDetailSection =>
      section._type === "productDetailSection",
  );

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{product.category}</span>
            <h1>{product.hero.title}</h1>
            <p>{product.hero.body}</p>
            <div className={styles.ctaRow}>
              <CtaLink cta={product.hero.primaryCta} />
              {product.hero.secondaryCta ? (
                <CtaLink cta={product.hero.secondaryCta} tone="secondary" />
              ) : null}
            </div>
          </div>
          <div className={styles.heroMedia}>
            <Image
              src={product.hero.image.url}
              alt={product.hero.image.alt}
              fill
              priority
              sizes="(max-width: 900px) calc(100vw - 48px), 50vw"
              placeholder={product.hero.image.lqip ? "blur" : "empty"}
              blurDataURL={product.hero.image.lqip}
            />
          </div>
        </div>
      </section>

      {product.sections.map((section) => {
        if (section._type === "productIntroSection") {
          return (
            <section className={styles.intro} key={section._key}>
              <div className={styles.introInner}>
                {section.eyebrow ? (
                  <span className={styles.eyebrow}>{section.eyebrow}</span>
                ) : null}
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          );
        }

        if (section._type === "productCapabilitiesSection") {
          return <Capabilities key={section._key} section={section} />;
        }

        return null;
      })}

      {details.length ? (
        <section className={styles.detailsSection} aria-label="Product details">
          <div className={styles.mobileToc}>
            <details>
              <summary>On this page</summary>
              <nav aria-label="Product page sections">
                {details.map((detail) => (
                  <a key={detail._key} href={`#${detail.anchor}`}>
                    {detail.tocLabel}
                  </a>
                ))}
              </nav>
            </details>
          </div>
          <div className={styles.detailsLayout}>
            <aside className={styles.toc}>
              <span>On this page</span>
              <nav aria-label="Product page sections">
                {details.map((detail) => (
                  <a key={detail._key} href={`#${detail.anchor}`}>
                    {detail.tocLabel}
                  </a>
                ))}
              </nav>
            </aside>
            <div className={styles.detailList}>
              {details.map((detail) => (
                <ProductDetail key={detail._key} section={detail} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {product.sections.map((section) => {
        if (section._type !== "productFinalCtaSection") return null;
        return (
          <section className={styles.finalCta} key={section._key}>
            <div className={styles.finalCtaInner}>
              {section.eyebrow ? <span>{section.eyebrow}</span> : null}
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
              <div className={styles.ctaRow}>
                <CtaLink cta={section.primaryCta} />
                {section.secondaryCta ? (
                  <CtaLink cta={section.secondaryCta} tone="secondary" />
                ) : null}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
