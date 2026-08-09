import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import {
  ControlsGrid,
  EvidenceBlock,
  FaqList,
  FinalCta,
  MarketingPage,
  OperatingSteps,
  PageHero,
} from "@/components/page-primitives";
import { FeatureMedia } from "@/components/product-media";
import { siteConfig } from "@/config/site";
import { allFeatureSlugs, featurePages } from "@/content/marketing";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return allFeatureSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = featurePages[slug as keyof typeof featurePages];
  if (!content) return {};

  return createPageMetadata({
    title: `${content.eyebrow} for property operations | Innflow`,
    description: content.description,
    path: `/features/${content.slug}`,
  });
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = featurePages[slug as keyof typeof featurePages];
  if (!content) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.marketingOrigin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: `${siteConfig.marketingOrigin}/features/workflows`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.eyebrow,
        item: `${siteConfig.marketingOrigin}/features/${content.slug}`,
      },
    ],
  };

  return (
    <MarketingPage>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        status={content.status}
      >
        <FeatureMedia type={content.media} />
      </PageHero>
      <EvidenceBlock items={content.evidence} />
      <section className="section">
        <div className="shell statement-grid">
          <span className="section-label">The operational problem</span>
          <h2>{content.problem}</h2>
        </div>
      </section>
      <OperatingSteps
        title="A bounded path from input to visible work."
        intro="The exact systems, permissions, exceptions, and recovery behavior are confirmed during workflow discovery."
        steps={content.operatingModel}
      />
      <ControlsGrid
        title="Keep scope, review, and evidence visible."
        items={content.controls}
      />
      <section className="section faq-section">
        <div className="shell faq-layout">
          <div className="faq-intro">
            <span className="section-label">Feature boundaries</span>
            <h2>What this page does—and does not—promise.</h2>
          </div>
          <FaqList items={content.faq} />
        </div>
      </section>
      <FinalCta />
      <JsonLd value={breadcrumbSchema} />
    </MarketingPage>
  );
}
