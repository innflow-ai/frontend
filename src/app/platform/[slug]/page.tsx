import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingPage, PageHero } from "@/components/page-primitives";
import { PlatformDirectory } from "@/components/platform-directory";
import { PlatformFeaturePage } from "@/components/platform-feature-page";
import { getPlatformPage, platformPages } from "@/content/platform";
import { getPlatformDetail } from "@/content/platform-details";
import { createPageMetadata } from "@/lib/metadata";

type PlatformRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return platformPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PlatformRouteProps) {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) notFound();
  return createPageMetadata({
    title: `${page.title} | Innflow`,
    description: getPlatformDetail(slug)?.description ?? page.description,
    path: `/platform/${page.slug}`,
  });
}

export default async function PlatformDetailPage({
  params,
}: PlatformRouteProps) {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) notFound();

  const detail = getPlatformDetail(slug);
  if (detail) return <PlatformFeaturePage page={detail} />;

  return (
    <MarketingPage>
      <PageHero
        eyebrow="Platform"
        title={page.title}
        description={page.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform" },
          { label: page.title },
        ]}
      />
      {page.slug === "integrations" && (
        <section className="section">
          <div className="shell">
            <Link className="button button-secondary" href="/integrations">
              Browse the integration directory <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      )}
      <PlatformDirectory currentSlug={page.slug} />
    </MarketingPage>
  );
}
