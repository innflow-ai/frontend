import { defineArrayMember, defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "FAQ library",
  type: "document",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      type: "text",
      rows: 8,
      description: "Plain text; paragraph breaks are preserved on the website.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description:
        "For organizing the library. Page selection uses FAQ sets, not tags.",
    }),
    defineField({ name: "sourceUrl", title: "Source", type: "url" }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const faqSetType = defineType({
  name: "faqSet",
  title: "FAQ sets",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "faqs",
      title: "Questions in display order",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
      validation: (r) => r.required().min(1).unique(),
      description:
        "Drag to reorder. Reference the same FAQ in other sets to share its answer.",
    }),
    defineField({ name: "sourceUrl", title: "Source", type: "url" }),
  ],
  preview: { select: { title: "title" } },
});

export const faqPlacementType = defineType({
  name: "faqPlacement",
  title: "Page FAQs",
  type: "document",
  fields: [
    defineField({
      name: "pagePath",
      title: "Page path",
      type: "string",
      description:
        "Exact website path, such as /products/ai-agents or /rapid-rent. One selection per page; see FAQS.md for supported templates.",
      validation: (r) =>
        r.required().custom(async (value, context) => {
          if (!value) return true;
          if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(value))
            return "Use a lowercase page path without query strings or a trailing slash.";
          const id = context.document?._id.replace(/^drafts\./, "");
          const count = await context
            .getClient({ apiVersion: "2026-08-22" })
            .fetch<number>(
              'count(*[_type == "faqPlacement" && pagePath == $path && !(_id in [$id, $draftId])])',
              { path: value, id, draftId: `drafts.${id}` },
            );
          return (
            count === 0 ||
            "This page already has an FAQ selection. Edit that document instead."
          );
        }),
    }),
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
      description: "Leave empty to retain the page's existing heading.",
    }),
    defineField({
      name: "faqSets",
      title: "FAQ sets in display order",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faqSet" }] })],
      validation: (r) => r.unique(),
      description:
        "First set first, then the next. Shared questions appear once at their first occurrence. Empty replaces the page's questions with an empty list. Publish questions and sets before this selection.",
    }),
  ],
  preview: { select: { title: "pagePath", subtitle: "heading" } },
});
