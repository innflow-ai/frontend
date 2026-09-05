import { defineQuery } from "next-sanity";
import { cache } from "react";
import { agentStudioPage } from "@/content/agent-studio";
import { applyVerifiedProductCopy } from "@/content/product-copy";
import { sanityClient } from "@/lib/sanity";
import framerProducts from "../../scripts/data/product-pages-framer.json";

export const productSlugs = [
  "platform",
  "agent-os",
  "agent-studio",
  "ai-agents",
  "agentic-workflows",
  "databases",
] as const;

export type ProductSlug = (typeof productSlugs)[number];

export type ProductImage = {
  url: string;
  alt: string;
  lqip?: string;
  width?: number;
  height?: number;
};

export type ProductCta = {
  label: string;
  destination: "demo" | "signup" | "contact";
};

export type ProductFeatureCard = {
  _key: string;
  anchor?: string;
  title: string;
  body: string;
  image: ProductImage;
};

export type ProductIntroSection = {
  _key: string;
  _type: "productIntroSection";
  eyebrow?: string;
  heading: string;
  body: string;
};

export type ProductCapabilitiesSection = {
  _key: string;
  _type: "productCapabilitiesSection";
  presentation: "five-feature" | "supporting-grid";
  cards: ProductFeatureCard[];
};

export type ProductDetailSection = {
  _key: string;
  _type: "productDetailSection";
  anchor: string;
  tocLabel: string;
  title: string;
  body: string;
  points: string[];
  image: ProductImage;
  theme: "light" | "dark";
  mediaPosition: "left" | "right";
};

export type ProductFinalCtaSection = {
  _key: string;
  _type: "productFinalCtaSection";
  eyebrow?: string;
  heading: string;
  body: string;
  primaryCta: ProductCta;
  secondaryCta?: ProductCta;
};

export type ProductPageSection =
  | ProductIntroSection
  | ProductCapabilitiesSection
  | ProductDetailSection
  | ProductFinalCtaSection;

export type ProductPage = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: ProductSlug;
  category: string;
  seo: {
    title: string;
    description: string;
    image?: ProductImage;
    noIndex: boolean;
  };
  hero: {
    title: string;
    body: string;
    image: ProductImage;
    primaryCta: ProductCta;
    secondaryCta?: ProductCta;
  };
  sections: ProductPageSection[];
};

type FramerImage = { src: string; alt: string } | null;
type FramerBlock = { tag: string; text: string };
type FramerCard = {
  slot: string;
  title: string;
  body: string;
  image: FramerImage;
};
type FramerProduct = {
  _id: string;
  title: string;
  slug: ProductSlug;
  category: string;
  seo: { metaTitle: string; metaDescription: string; socialImage: FramerImage };
  hero: {
    title: string;
    body: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    image: FramerImage;
  };
  intro: FramerBlock[];
  spiral: FramerCard[];
  mosaic: FramerCard[];
  details: Array<{
    toc: string;
    content: FramerBlock[];
    points: string[];
    image: FramerImage;
  }>;
};

const imageFragment = /* groq */ `
  "url": asset->url,
  alt,
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
`;

const productPageQuery = defineQuery(/* groq */ `
  *[_type == "productPage" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    category,
    "seo": {
      "title": coalesce(seo.title, hero.title, title),
      "description": coalesce(seo.description, hero.body, ""),
      "image": seo.image { ${imageFragment} },
      "noIndex": seo.noIndex == true
    },
    hero {
      title,
      body,
      "image": image { ${imageFragment} },
      primaryCta,
      secondaryCta
    },
    sections[] {
      _key,
      _type,
      eyebrow,
      heading,
      body,
      presentation,
      cards[] {
        _key,
        title,
        body,
        "image": image { ${imageFragment} }
      },
      "anchor": anchor.current,
      tocLabel,
      title,
      points,
      "image": image { ${imageFragment} },
      theme,
      mediaPosition,
      primaryCta,
      secondaryCta
    }
  }
`);

const productSlugsQuery = defineQuery(/* groq */ `
  *[_type == "productPage" && defined(slug.current)].slug.current
`);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function fallbackImage(image: FramerImage, title: string): ProductImage {
  return {
    url: image?.src ?? "/opengraph-image.png",
    alt: image?.alt || title,
  };
}

function cardSection(
  slug: ProductSlug,
  key: string,
  cards: FramerCard[],
  presentation: ProductCapabilitiesSection["presentation"],
): ProductCapabilitiesSection {
  return {
    _key: `${slug}-${key}`,
    _type: "productCapabilitiesSection",
    presentation,
    cards: cards.map((card) => ({
      _key: `${slug}-${key}-${card.slot}`,
      title: card.title,
      body: card.body,
      image: fallbackImage(card.image, card.title),
    })),
  };
}

function normalizeFallback(product: FramerProduct): ProductPage {
  const introEyebrow = product.intro.find((block) => block.tag === "p")?.text;
  const introHeading = product.intro.find((block) => block.tag === "h2")?.text;
  const introBody = product.intro.findLast((block) => block.tag === "p")?.text;
  const sections: ProductPageSection[] = [];

  if (introHeading && introBody) {
    sections.push({
      _key: `${product.slug}-intro`,
      _type: "productIntroSection",
      eyebrow: introEyebrow,
      heading: introHeading,
      body: introBody,
    });
  }

  if (product.spiral.length) {
    sections.push(
      cardSection(
        product.slug,
        "primary-capabilities",
        product.spiral,
        "five-feature",
      ),
    );
  }

  if (product.mosaic.length) {
    sections.push(
      cardSection(
        product.slug,
        "supporting-capabilities",
        product.mosaic,
        "supporting-grid",
      ),
    );
  }

  product.details.forEach((detail, index) => {
    const title = detail.content.find((block) => block.tag === "h3")?.text;
    const body = detail.content.find((block) => block.tag === "p")?.text;
    if (!title || !body) return;

    sections.push({
      _key: `${product.slug}-detail-${index + 1}`,
      _type: "productDetailSection",
      anchor: slugify(detail.toc || title),
      tocLabel: detail.toc || title,
      title,
      body,
      points: detail.points,
      image: fallbackImage(detail.image, title),
      theme: index % 2 === 1 ? "dark" : "light",
      mediaPosition: index % 2 === 1 ? "left" : "right",
    });
  });

  sections.push({
    _key: `${product.slug}-final-cta`,
    _type: "productFinalCtaSection",
    eyebrow: product.category,
    heading: product.hero.title,
    body: product.hero.body,
    primaryCta: {
      label: product.hero.primaryCtaLabel || "Start today",
      destination: "demo",
    },
  });

  return {
    _id: `fallback-${product.slug}`,
    _updatedAt: "2026-08-22T00:00:00.000Z",
    title: product.title,
    slug: product.slug,
    category: product.category,
    seo: {
      title: product.seo.metaTitle,
      description: product.seo.metaDescription,
      image: fallbackImage(product.seo.socialImage, product.title),
      noIndex: false,
    },
    hero: {
      title: product.hero.title,
      body: product.hero.body,
      image: fallbackImage(product.hero.image, product.hero.title),
      primaryCta: {
        label: product.hero.primaryCtaLabel || "Start today",
        destination: "demo",
      },
      secondaryCta: product.hero.secondaryCtaLabel
        ? { label: product.hero.secondaryCtaLabel, destination: "contact" }
        : undefined,
    },
    sections,
  };
}

const fallbackProducts = new Map(
  (framerProducts as FramerProduct[]).map((product) => [
    product.slug,
    normalizeFallback(product),
  ]),
);

export function getFallbackProductPage(slug: string) {
  if (slug === "agent-studio") return agentStudioPage;
  const page = fallbackProducts.get(slug as ProductSlug) ?? null;
  return page ? applyVerifiedProductCopy(page) : null;
}

export const getProductPage = cache(
  async (slug: string): Promise<ProductPage | null> => {
    try {
      const product = await sanityClient.fetch<ProductPage | null>(
        productPageQuery,
        { slug },
      );
      if (product) return applyVerifiedProductCopy(product);
      return getFallbackProductPage(slug);
    } catch {
      return getFallbackProductPage(slug);
    }
  },
);

export async function getProductSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(productSlugsQuery);
    return Array.from(new Set([...productSlugs, ...slugs]));
  } catch {
    return [...productSlugs];
  }
}
