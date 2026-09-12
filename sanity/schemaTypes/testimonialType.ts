import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal label",
      type: "string",
      description:
        "Internal search label, e.g. Name — recurring workflows. Not shown on the website; use Title / role for their job title.",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description:
        "Their public display name, using their preferred spelling. Do not include their role here.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Title / role",
      type: "string",
      description:
        "Their supplied role, optionally with company name. Keep to one short line. Leave empty if unknown.",
    }),
    defineField({
      name: "propertyCount",
      title: "Number of properties",
      type: "number",
      description:
        "Confirmed properties owned, as a whole number. Do not substitute units or properties managed. Leave unknown counts empty; 0 means a confirmed zero.",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "avatar",
      title: "Profile avatar",
      type: "image",
      options: { hotspot: true },
      description:
        "Square headshot of the same person, ideally 192 × 192 px or larger. Set the hotspot on their face. If empty, we crop the portrait using its hotspot.",
    }),
    defineField({
      name: "frontStyle",
      title: "Card front",
      type: "string",
      initialValue: "quote",
      description:
        "Choose the front of the card. Use Statistic only for a substantiated customer result. Both styles reveal the full quote on hover or tap.",
      options: {
        layout: "radio",
        list: [
          { title: "Short quote", value: "quote" },
          { title: "Statistic", value: "statistic" },
        ],
      },
    }),
    defineField({
      name: "statistic",
      title: "Statistic",
      type: "object",
      hidden: ({ document }) => document?.frontStyle !== "statistic",
      fields: [
        defineField({
          name: "value",
          title: "Value",
          type: "string",
          description:
            "A substantiated value, ideally 2–8 characters, including units if needed. Format examples only: 100+ or 8 hrs.",
        }),
        defineField({
          name: "label",
          title: "Description",
          type: "string",
          description:
            "Explain the value in 2–5 words; include a timeframe when relevant. Must match the customer source.",
        }),
      ],
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.frontStyle !== "statistic" ||
          (value?.value && value?.label)
            ? true
            : "Add both a statistic value and description.",
        ),
    }),
    defineField({
      name: "portrait",
      title: "Portrait photo",
      type: "image",
      description:
        "Sharp photo of this person, ideally vertical 3:4 and at least 720 × 960 px. Set the face hotspot. The website adds the gradient and blur; do not upload a pre-blurred image.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description:
            "Brief factual description, e.g. Portrait of [name]. Do not repeat the quote.",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: "firstQuote",
      title: "Short quote",
      type: "text",
      description:
        "Faithful customer excerpt, ideally 8–16 words (50–100 characters). No surrounding quotation marks. Required even for a statistic card; also used if Full quote is empty.",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondQuote",
      title: "Full quote",
      type: "text",
      rows: 4,
      description:
        "Full customer statement shown over the blurred portrait on hover or tap. Aim for 35–65 words, without surrounding quotation marks. Preserve meaning. If empty, Short quote is used.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "portrait" },
  },
});
