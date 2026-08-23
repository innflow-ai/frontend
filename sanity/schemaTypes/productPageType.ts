import { defineArrayMember, defineField, defineType } from "sanity";

const requiredImageAlt = defineField({
  name: "alt",
  title: "Alternative text",
  type: "string",
  validation: (rule) => rule.required(),
});

export const productImageType = defineType({
  name: "productImage",
  title: "Product image",
  type: "image",
  options: { hotspot: true },
  fields: [requiredImageAlt],
});

export const productCtaType = defineType({
  name: "productCta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      initialValue: "demo",
      options: {
        layout: "radio",
        list: [
          { title: "Demo / app", value: "demo" },
          { title: "Create account", value: "signup" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "destination" } },
});

export const productFeatureCardType = defineType({
  name: "productFeatureCard",
  title: "Feature card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "productImage",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", media: "image" } },
});

export const productIntroSectionType = defineType({
  name: "productIntroSection",
  title: "Introduction",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
  },
});

export const productCapabilitiesSectionType = defineType({
  name: "productCapabilitiesSection",
  title: "Capabilities",
  type: "object",
  fields: [
    defineField({
      name: "presentation",
      title: "Presentation",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Five-feature mosaic", value: "five-feature" },
          { title: "Supporting feature grid", value: "supporting-grid" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cards",
      type: "array",
      of: [defineArrayMember({ type: "productFeatureCard" })],
      validation: (rule) => rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: { subtitle: "presentation" },
    prepare({ subtitle }) {
      return { title: "Capabilities", subtitle };
    },
  },
});

export const productDetailSectionType = defineType({
  name: "productDetailSection",
  title: "Product detail",
  type: "object",
  fields: [
    defineField({
      name: "anchor",
      title: "Section anchor",
      type: "slug",
      options: { source: "tocLabel" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tocLabel",
      title: "Table of contents label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: "image",
      type: "productImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "theme",
      type: "string",
      initialValue: "light",
      options: {
        layout: "radio",
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mediaPosition",
      title: "Media position",
      type: "string",
      initialValue: "right",
      options: {
        layout: "radio",
        list: [
          { title: "Right", value: "right" },
          { title: "Left", value: "left" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tocLabel", media: "image" },
  },
});

export const productFinalCtaSectionType = defineType({
  name: "productFinalCtaSection",
  title: "Final call to action",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "productCta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "productCta",
    }),
  ],
  preview: { select: { title: "heading", subtitle: "eyebrow" } },
});

export const productSeoType = defineType({
  name: "productSeo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "image", type: "productImage" }),
    defineField({
      name: "noIndex",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const productPageType = defineType({
  name: "productPage",
  title: "Product Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", type: "productSeo" }),
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({
          name: "title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "body",
          type: "text",
          rows: 5,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "image",
          type: "productImage",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "productCta",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "productCta",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        defineArrayMember({ type: "productIntroSection" }),
        defineArrayMember({ type: "productCapabilitiesSection" }),
        defineArrayMember({ type: "productDetailSection" }),
        defineArrayMember({ type: "productFinalCtaSection" }),
      ],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "hero.image" },
  },
});
