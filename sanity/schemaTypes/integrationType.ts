import { defineArrayMember, defineField, defineType } from "sanity";
export const integrationCategoryType = defineType({
  name: "integrationCategory",
  title: "Integration category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
  ],
});
export const integrationType = defineType({
  name: "integration",
  title: "Integration",
  type: "document",
  initialValue: { status: "planned", listed: true },
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "integrationCategory" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "overview",
      type: "text",
      rows: 5,
      description:
        "Describe future capabilities as planned, not currently available.",
    }),
    defineField({
      name: "useCases",
      title: "Use cases",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "In development", value: "in-development" },
          { title: "Planned", value: "planned" },
        ],
      },
      description:
        "Use Available only for a verified working Innflow integration.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "statusNote",
      type: "text",
      rows: 3,
      description: "Public setup requirements or roadmap context.",
    }),
    defineField({
      name: "listed",
      title: "Show in directory",
      type: "boolean",
      description: "When off, hides both the card and public detail page.",
    }),
    defineField({
      name: "websiteUrl",
      title: "Vendor website",
      type: "url",
      validation: (r) => r.uri({ scheme: ["https", "http"] }),
    }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text", rows: 3 }),
    defineField({
      name: "sourceId",
      title: "Import source ID",
      type: "string",
      description: "Stable source identity used to prevent duplicate imports.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "status", media: "logo" } },
});
