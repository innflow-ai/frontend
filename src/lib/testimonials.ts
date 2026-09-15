import type { SanityImageSource } from "@sanity/image-url";
import { cache } from "react";
import { coverImageUrl, sanityClient } from "@/lib/sanity";

export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  propertyCount?: number;
  portrait: { url: string; alt: string };
  avatarUrl: string;
  shortQuote: string;
  quote: string;
  statistic?: { value: string; label: string };
};

type RawTestimonial = {
  _id: string;
  name?: string;
  role?: string;
  propertyCount?: number;
  portrait?: SanityImageSource & { alt?: string; asset?: { _ref?: string } };
  avatar?: SanityImageSource & { asset?: { _ref?: string } };
  firstQuote?: string;
  secondQuote?: string;
  frontStyle?: string;
  statistic?: { value?: string; label?: string };
};

export function normalizeTestimonial(
  item: RawTestimonial | null,
): Testimonial | null {
  if (!item?.name || !item.portrait?.asset?._ref || !item.firstQuote)
    return null;
  return {
    id: item._id,
    name: item.name,
    role: item.role,
    propertyCount: item.propertyCount,
    portrait: {
      url: coverImageUrl(item.portrait, 720, 960),
      alt: item.portrait.alt || item.name,
    },
    avatarUrl: coverImageUrl(
      item.avatar?.asset?._ref ? item.avatar : item.portrait,
      96,
      96,
    ),
    shortQuote: item.firstQuote,
    quote: item.secondQuote || item.firstQuote,
    statistic:
      item.frontStyle === "statistic" &&
      item.statistic?.value &&
      item.statistic.label
        ? { value: item.statistic.value, label: item.statistic.label }
        : undefined,
  };
}

export const getPageTestimonials = cache(async (pagePath: string) => {
  try {
    const previewDrafts =
      process.env.NODE_ENV === "development" &&
      process.env.SANITY_TESTIMONIAL_PREVIEW === "true";
    const selection = await sanityClient.fetch<{
      heading?: string;
      testimonials?: (RawTestimonial | null)[];
    } | null>(
      `select($path match "/products/*" => *[_type == "productPage" && slug.current == $slug][0],
        *[_type == "testimonialPlacement" && pagePath == $path] | order(_updatedAt desc)[0]) {
        heading, testimonials[]->{_id, name, role, propertyCount, portrait, avatar, firstQuote, secondQuote, frontStyle, statistic}
      }`,
      { path: pagePath, slug: pagePath.replace(/^\/products\//, "") },
      { perspective: previewDrafts ? "drafts" : "published", useCdn: false },
    );
    return {
      heading: selection?.heading || "In their own words.",
      previewNote: previewDrafts ? "In their own words." : undefined,
      testimonials: (selection?.testimonials || [])
        .map(normalizeTestimonial)
        .filter((item): item is Testimonial => item !== null),
    };
  } catch (error) {
    console.error(
      "Unable to load page testimonials",
      pagePath,
      error instanceof Error ? error.message : "Unknown error",
    );
    return { heading: "In their own words.", testimonials: [] };
  }
});

// Reuse the selected published record; its portrait and quotes remain CMS-owned.
export const getNavigationTestimonial = cache(async () => {
  try {
    const item = await sanityClient.fetch<RawTestimonial | null>(
      `*[_type == "testimonial" && _id == $id][0]{
        _id, name, role, propertyCount, portrait, avatar,
        firstQuote, secondQuote, frontStyle, statistic
      }`,
      { id: "testimonial-meera-shah" },
      { perspective: "published" },
    );
    return normalizeTestimonial(item);
  } catch {
    return null;
  }
});
