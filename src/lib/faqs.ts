import { unstable_cache } from "next/cache";
import {
  type FaqItem,
  type FaqSelection,
  resolveFaqSelection,
} from "./faq-model";
import { sanityClient } from "./sanity";

const fetchSelection = unstable_cache(
  (path: string) =>
    sanityClient.fetch<FaqSelection | null>(
      `*[_type == "faqPlacement" && pagePath == $path] | order(_updatedAt desc)[0]{
      heading, faqSets[]->{faqs[]->{_id, question, answer}}
    }`,
      { path },
      { perspective: "published", useCdn: false },
    ),
  ["page-faq-selection"],
  { revalidate: 60, tags: ["faqs"] },
);

export async function getPageFaqs(
  path: string,
  fallback: readonly FaqItem[] = [],
) {
  try {
    return resolveFaqSelection(
      await fetchSelection(path.replace(/\/$/, "") || "/"),
      fallback,
    );
  } catch {
    // Preserve the current page during a CMS outage; do not cache the failure.
    console.error("Unable to load page FAQs", path);
    return resolveFaqSelection(null, fallback);
  }
}

export async function getPageFaqTuples(
  path: string,
  fallback: readonly (readonly string[])[],
) {
  const result = await getPageFaqs(
    path,
    fallback.map(([question, answer]) => ({ question, answer })),
  );
  return {
    heading: result.heading,
    items: result.items.map(
      ({ id, question, answer }): [string, string, string] => [
        question,
        answer,
        id || question,
      ],
    ),
  };
}
