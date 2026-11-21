import "server-only";
import { defineQuery } from "next-sanity";
import { cache } from "react";
import type { Integration } from "@/lib/integration-model";
import { sanityClient } from "@/lib/sanity";

const fields = /* groq */ `_id, _updatedAt, name, "slug": slug.current, shortDescription, "logoUrl": logo.asset->url, "category": category->{title, "slug": slug.current}, "status": coalesce(status, "planned"), statusNote, overview, websiteUrl, useCases, seoTitle, seoDescription`;
const visible = `_type == "integration" && listed == true && defined(slug.current)`;
const directoryQuery = defineQuery(
  `*[${visible}] | order(name asc) {${fields}}`,
);
const detailQuery = defineQuery(
  `*[${visible} && slug.current == $slug][0] {${fields}}`,
);
// Propagate CMS failures rather than caching a false empty directory or 404.
export const getIntegrations = cache(
  async (): Promise<Integration[]> =>
    sanityClient.fetch(directoryQuery, {}, { next: { revalidate: 60 } }),
);
export const getIntegration = cache(
  async (slug: string): Promise<Integration | null> =>
    sanityClient.fetch(detailQuery, { slug }, { next: { revalidate: 60 } }),
);
