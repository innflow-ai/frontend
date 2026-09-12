import { defineArrayMember, defineField, defineType } from "sanity";

export const testimonialPlacementType = defineType({
  name: "testimonialPlacement",
  title: "Page testimonials",
  type: "document",
  fields: [
    defineField({
      name: "pagePath",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Rent collection", value: "/rent-collection" },
          { title: "Landlord banking", value: "/landlord-banking" },
          { title: "Landlord accounting", value: "/landlord-accounting" },
          { title: "Tax preparation", value: "/tax-preparation" },
        ],
      },
      description:
        "Use Product pages → Testimonials for pages under /products/.",
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          if (!value) return true;
          const id = context.document?._id.replace(/^drafts\./, "");
          const count = await context
            .getClient({ apiVersion: "2026-08-22" })
            .fetch<number>(
              'count(*[_type == "testimonialPlacement" && pagePath == $path && !(_id in [$id, $draftId])])',
              { path: value, id, draftId: `drafts.${id}` },
            );
          return (
            count === 0 ||
            "This page already has a testimonial selection. Edit that selection instead."
          );
        }),
    }),
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
      initialValue: "In their own words.",
      description:
        "Public heading above the cards. Leave blank to use In their own words.",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      description:
        "Reference existing testimonials and drag into display order. Four is a useful starting point; up to twelve are supported. Publish both the testimonials and this selection to display them. Empty hides the section.",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] }),
      ],
      validation: (rule) => rule.unique().max(12),
    }),
  ],
  preview: { select: { title: "pagePath", subtitle: "heading" } },
});
