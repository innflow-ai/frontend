import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendlyCmsProductPage } from "@/components/calendly-product-adapters";
import { JsonLd } from "@/components/json-ld";
import { PlatformProductPage } from "@/components/platform-product-page";
import { ProductPage } from "@/components/product-page";
import { siteConfig } from "@/config/site";
import { getProductDesign } from "@/content/product-design-rotation";
import { createPageMetadata } from "@/lib/metadata";
import { getProductPage, getProductSlugs } from "@/lib/product-pages";

type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductPage(slug);

  if (!product) {
    return createPageMetadata({
      title: "Product not found | Innflow",
      description: "The requested Innflow product page could not be found.",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  if (slug === "platform") {
    return createPageMetadata({
      title: "AI Agent Builder and Workflow Automation Platform | Innflow",
      description:
        "Bring your team, tools, and knowledge into one flow. Build agents, connect your tools, and run workflows with room for people to review what matters.",
      path: "/products/platform",
    });
  }

  return createPageMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/products/${product.slug}`,
    noIndex: product.seo.noIndex,
    image: product.seo.image?.url,
    imageAlt: product.seo.image?.alt,
  });
}

export default async function ProductRoute({ params }: ProductRouteProps) {
  const { slug } = await params;
  const product = await getProductPage(slug);

  if (!product) notFound();

  const canonical = new URL(
    `/products/${product.slug}`,
    siteConfig.marketingOrigin,
  ).toString();

  return (
    <>
      <JsonLd
        value={{
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
              name: "Products",
              item: new URL(
                "/products/platform",
                siteConfig.marketingOrigin,
              ).toString(),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: product.title,
              item: canonical,
            },
          ],
        }}
      />
      {product.slug === "platform" ? (
        <PlatformProductPage />
      ) : getProductDesign(`/products/${product.slug}`) ? (
        <CalendlyCmsProductPage product={product} />
      ) : (
        <ProductPage product={product} />
      )}
    </>
  );
}
