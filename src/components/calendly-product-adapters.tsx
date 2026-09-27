import Image from "next/image";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import type { FeaturePageContent } from "@/content/feature-pages";
import type { PlatformDetail } from "@/content/platform-details";
import { getProductFaqs } from "@/content/product-faqs";
import { productStoryCopy } from "@/content/product-story-copy";
import { getPageFaqs, getPageFaqTuples } from "@/lib/faqs";
import type { ProductCta, ProductPage } from "@/lib/product-pages";
import {
  type CalendlyFeature,
  type CalendlyPageContent,
  CalendlyProductPage,
} from "./calendly-product-page";
import styles from "./calendly-product-page.module.css";
import { FeatureTestimonials } from "./page-testimonials";
import { PlatformDirectory } from "./platform-directory";
import { RuneyWorkspace } from "./runey-workspace";
import { WorkflowIllustration } from "./workflow-illustration";

function cta(cta: ProductCta) {
  return {
    label: cta.label,
    href: /\b(?:book|request|see|schedule)\b.*\bdemo\b/i.test(cta.label)
      ? siteConfig.demoUrl
      : cta.destination === "signup"
        ? siteConfig.googleAuthUrl
        : cta.destination === "contact"
          ? siteConfig.contactUrl
          : siteConfig.demoUrl,
  };
}

export function adaptProductContent(product: ProductPage): CalendlyPageContent {
  const features: CalendlyFeature[] = [];
  const cards: CalendlyFeature[] = [];
  const intro: NonNullable<CalendlyPageContent["intro"]> = [];
  const closing: NonNullable<CalendlyPageContent["closing"]> = [];
  for (const section of product.sections) {
    if (section._type === "productIntroSection")
      intro.push({
        eyebrow: section.eyebrow,
        title: section.heading,
        body: section.body,
      });
    if (section._type === "productDetailSection")
      features.push({
        id: section.anchor,
        label: section.tocLabel,
        title: section.title,
        body: section.body,
        points: section.points,
        image: { src: section.image.url, alt: section.image.alt },
        artwork: (
          <div className={styles.nativeIllustration}>
            <WorkflowIllustration
              label={section.tocLabel}
              steps={section.points}
            />
          </div>
        ),
      });
    if (section._type === "productCapabilitiesSection")
      for (const card of section.cards)
        cards.push({
          id: card._key,
          title: card.title,
          body: card.body,
          image: { src: card.image.url, alt: card.image.alt },
          artwork: (
            <div className={styles.nativeIllustration}>
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
          ),
          href: card.anchor ? `#${card.anchor}` : undefined,
        });
    if (section._type === "productFinalCtaSection")
      closing.push({
        title: section.heading,
        body: section.body,
        primaryCta: cta(section.primaryCta),
        secondaryCta: section.secondaryCta
          ? cta(section.secondaryCta)
          : undefined,
      });
  }
  return {
    path: `/products/${product.slug}`,
    name: product.title,
    title: product.hero.title,
    description: product.hero.body,
    features,
    cards,
    intro,
    closing,
    primaryCta: cta(product.hero.primaryCta),
    secondaryCta: product.hero.secondaryCta
      ? cta(product.hero.secondaryCta)
      : undefined,
  };
}

export async function CalendlyCmsProductPage({
  product,
}: {
  product: ProductPage;
}) {
  const content = adaptProductContent(product);
  const faqs = await getPageFaqs(content.path, getProductFaqs(product.slug));
  return (
    <CalendlyProductPage
      content={{
        ...content,
        faqs: faqs.items,
        faqHeading: faqs.heading,
        faqDescription:
          "Direct answers on agents, memory, human review, deployment, and security, and fitting innflow into your operation.",
        heroArtwork: (
          <RuneyWorkspace
            initialView={
              product.slug === "databases"
                ? "Knowledge"
                : product.slug === "ai-agents"
                  ? "Assistant"
                  : "Workflows"
            }
          />
        ),
      }}
      testimonials={<FeatureTestimonials />}
    />
  );
}

/** Keep the original feature artwork layered over its source photo. */
function FeatureScene({
  panel,
}: {
  panel: FeaturePageContent["panels"][number];
}) {
  return (
    <div className={styles.featureScene}>
      <Image
        src={panel.image}
        alt={panel.label}
        fill
        sizes="(max-width: 800px) 92vw, 580px"
        style={{
          objectFit: "cover",
          objectPosition: `${panel.imageFocus}% center`,
        }}
      />
      <div className={styles.featureOverlays}>
        {panel.artwork.map((art) => (
          <Image
            key={art.id}
            src={art.src}
            alt=""
            width={art.width}
            height={art.height}
            unoptimized
          />
        ))}
      </div>
    </div>
  );
}

export async function CalendlyFeaturePage({
  page,
  testimonials,
}: {
  page: FeaturePageContent;
  testimonials?: ReactNode;
}) {
  const faqs = await getPageFaqTuples(page.path, page.faqs);
  const features = page.panels.map((panel) => ({
    id: panel.id,
    label: panel.label,
    title: panel.title,
    body: panel.text,
    artwork: <FeatureScene panel={panel} />,
  }));
  return (
    <CalendlyProductPage
      content={{
        path: page.path,
        signupNotice: true,
        name: page.name,
        title: page.title,
        description: page.description,
        intro: [{ title: page.intro }],
        features,
        cards: page.features.map(([title, body], index) => ({
          id: `supporting-${index}`,
          title,
          body,
        })),
        faqs: faqs.items.map(([question, answer]) => ({ question, answer })),
        faqHeading: faqs.heading,
        primaryCta: {
          label: "Get started with Google",
          href: siteConfig.googleAuthUrl,
        },
        heroArtwork: (
          <Image
            src={page.hero}
            alt={page.name}
            width={2017}
            height={650}
            sizes="(max-width: 800px) 92vw, 960px"
          />
        ),
      }}
      testimonials={testimonials ?? <FeatureTestimonials />}
    />
  );
}

export function CalendlyPlatformPage({ page }: { page: PlatformDetail }) {
  const features = page.capabilities.map((item) => ({
    ...item,
    image: { src: item.image, alt: item.alt },
  }));
  return (
    <CalendlyProductPage
      content={{
        path: `/platform/${page.slug}`,
        name: page.title,
        title: page.headline,
        description: page.description,
        intro: [{ title: page.intro }],
        features,
        cards: features.map((item) => ({
          ...item,
          id: `${item.id}-card`,
          href: `#${item.id}`,
        })),
        primaryCta: { label: "Talk to our team", href: "/contact" },
        secondaryCta: {
          label: "Explore capabilities",
          href: `#${features[0]?.id}`,
        },
      }}
    >
      <PlatformDirectory currentSlug={page.slug} />
    </CalendlyProductPage>
  );
}
