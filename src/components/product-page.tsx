import { FeatureCardGrid } from "@/components/feature-card";
import { GoogleCtaContent } from "@/components/google-cta-content";
import { JsonLd } from "@/components/json-ld";
import { FaqList } from "@/components/page-primitives";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import { getProductFaqs } from "@/content/product-faqs";
import { productStoryCopy } from "@/content/product-story-copy";
import type {
  ProductCapabilitiesSection,
  ProductCta,
  ProductDetailSection,
  ProductPage as ProductPageData,
} from "@/lib/product-pages";
import styles from "./product-page.module.css";
import { RuneyWorkspace } from "./runey-workspace";
import { WorkflowIllustration } from "./workflow-illustration";

function ctaDestination(cta: ProductCta) {
  if (/\b(?:book|request|see|schedule)\b.*\bdemo\b/i.test(cta.label))
    return siteConfig.demoUrl;
  if (cta.destination === "signup") return siteConfig.googleAuthUrl;
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
      {cta.destination === "signup" ? <GoogleCtaContent /> : cta.label}
    </TrackedLink>
  );
}

function Capabilities({
  section,
  anchors,
}: {
  section: ProductCapabilitiesSection;
  anchors?: string[];
}) {
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
        {anchors ? (
          <div
            className={`${styles.agentCapabilityGrid} ${section.presentation === "five-feature" ? styles.agentPrimaryGrid : styles.agentSupportingGrid}`}
          >
            {section.cards.map((card, index) => (
              <a
                key={card._key}
                className={styles.agentCapability}
                href={`#${card.anchor ?? anchors[index] ?? "product-details"}`}
              >
                <div className={styles.agentCapabilityCopy}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <span className={styles.agentCapabilityLink}>
                    Explore capability <span aria-hidden="true">↗</span>
                  </span>
                </div>
                <div className={styles.agentCapabilityMedia}>
                  <WorkflowIllustration
                    label={card.title}
                    steps={
                      Object.values(productStoryCopy).find(
                        (story) => story.title === card.title,
                      )?.points
                    }
                    compact
                  />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <FeatureCardGrid className={styles.capabilityGrid}>
            {section.cards.map((card) => (
              <article key={card._key} className={styles.storyCard}>
                <WorkflowIllustration
                  label={card.title}
                  steps={
                    Object.values(productStoryCopy).find(
                      (story) => story.title === card.title,
                    )?.points
                  }
                  compact
                />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </article>
            ))}
          </FeatureCardGrid>
        )}
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
          <WorkflowIllustration
            label={section.tocLabel}
            steps={section.points}
          />
        </div>
      </div>
    </article>
  );
}

import experience from "./product-experience.module.css";

export function ProductPage({ product }: { product: ProductPageData }) {
  const isAgentOs =
    product.slug === "agent-os" || product.slug === "agent-studio";
  const details = product.sections.filter(
    (section): section is ProductDetailSection =>
      section._type === "productDetailSection",
  );
  const faqs = getProductFaqs(product.slug);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main
      id="main-content"
      className={`${experience.page} ${styles.page}${isAgentOs ? ` ${styles.agentOs}` : ""}${product.slug === "agent-studio" ? ` ${styles.agentStudio}` : ""}`}
    >
      <section className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
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
            <RuneyWorkspace
              initialView={
                product.slug === "databases"
                  ? "Knowledge"
                  : product.slug === "ai-agents"
                    ? "Assistant"
                    : "Workflows"
              }
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
          return (
            <Capabilities
              key={section._key}
              section={section}
              anchors={
                isAgentOs
                  ? details
                      .slice(section.presentation === "five-feature" ? 0 : 5)
                      .map((detail) => detail.anchor)
                  : undefined
              }
            />
          );
        }

        return null;
      })}

      {details.length ? (
        <section
          id="product-details"
          className={styles.detailsSection}
          aria-label="Product details"
        >
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

      {faqs.length ? (
        <section
          className={styles.faq}
          id="faq"
          aria-label="Frequently asked questions"
        >
          <div className={`${styles.shell} ${styles.faqInner}`}>
            <div className={styles.faqIntro}>
              <span className={styles.eyebrow}>FAQ</span>
              <h2>Questions about {product.title}.</h2>
              <p>
                Direct answers on agents, memory, human review, deployment, and
                security, and fitting innflow into your operation.
              </p>
            </div>
            <FaqList items={faqs} />
          </div>
        </section>
      ) : null}

      {faqs.length ? <JsonLd value={faqSchema} /> : null}
    </main>
  );
}
