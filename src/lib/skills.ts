import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { defineQuery } from "next-sanity";
import { cache } from "react";
import { sanityClient } from "@/lib/sanity";

export type SkillCategory = {
  title: string;
  slug: string;
};

export type SkillSummary = {
  name: string;
  slug: string;
  shortDescription: string | null;
  builtBy: string | null;
  color: string | null;
  cardColor: string | null;
  icon: (SanityImageSource & { alt?: string }) | null;
  category: SkillCategory | null;
};

export type Skill = SkillSummary & {
  longDescription: PortableTextBlock[] | null;
};

const skillFields = /* groq */ `
  name,
  "slug": slug.current,
  shortDescription,
  builtBy,
  color,
  cardColor,
  icon,
  "category": category->{title, "slug": slug.current}
`;

const skillsQuery = defineQuery(/* groq */ `
  *[_type == "skill" && defined(slug.current)] | order(name asc) {
    ${skillFields}
  }
`);

const skillSlugsQuery = defineQuery(/* groq */ `
  *[_type == "skill" && defined(slug.current)].slug.current
`);

const skillBySlugQuery = defineQuery(/* groq */ `
  *[_type == "skill" && slug.current == $slug][0] {
    ${skillFields},
    longDescription
  }
`);

const skillCategoriesQuery = defineQuery(/* groq */ `
  *[_type == "skillCategory" && defined(slug.current)] | order(title asc) {
    title,
    "slug": slug.current
  }
`);

export async function getSkills(): Promise<SkillSummary[]> {
  try {
    return await sanityClient.fetch<SkillSummary[]>(skillsQuery);
  } catch {
    return [];
  }
}

export async function getSkillSlugs(): Promise<string[]> {
  try {
    return await sanityClient.fetch<string[]>(skillSlugsQuery);
  } catch {
    return [];
  }
}

export const getSkillBySlug = cache(
  async (slug: string): Promise<Skill | null> => {
    try {
      return await sanityClient.fetch<Skill | null>(skillBySlugQuery, { slug });
    } catch {
      return null;
    }
  },
);

export async function getSkillCategories(): Promise<SkillCategory[]> {
  try {
    return await sanityClient.fetch<SkillCategory[]>(skillCategoriesQuery);
  } catch {
    return [];
  }
}

export { skillColorFallback, skillColorValue } from "./skill-colors";
