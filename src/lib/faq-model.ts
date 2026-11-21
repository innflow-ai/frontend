export type FaqItem = { id?: string; question: string; answer: string };
export type FaqSelection = {
  heading?: string | null;
  faqSets?:
    | ({
        faqs?:
          | ({ _id: string; question?: string; answer?: string } | null)[]
          | null;
      } | null)[]
    | null;
};

/** Array order is editorial order. Deduplicate shared documents, not similar wording. */
export function resolveFaqSelection(
  selection: FaqSelection | null,
  fallback: readonly FaqItem[] = [],
) {
  if (!selection) return { heading: undefined, items: [...fallback] };
  const seen = new Set<string>();
  const items: FaqItem[] = [];
  for (const set of selection.faqSets ?? []) {
    for (const faq of set?.faqs ?? []) {
      if (!faq?._id || !faq.question?.trim() || !faq.answer?.trim()) continue;
      const id = faq._id.replace(/^drafts\./, "");
      if (seen.has(id)) continue;
      seen.add(id);
      items.push({ id, question: faq.question, answer: faq.answer });
    }
  }
  return { heading: selection.heading?.trim() || undefined, items };
}
