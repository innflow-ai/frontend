import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule.required().max(60).warning("Keep titles under 60 characters"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Product & Platform", value: "product-platform" },
          { title: "Company Updates", value: "company-updates" },
          {
            title: "Automation with Innflow",
            value: "automation-with-innflow",
          },
          { title: "AI Agent", value: "ai-agent" },
          { title: "Automation", value: "automation" },
          { title: "Workflow", value: "workflow" },
          { title: "Integrations", value: "integrations" },
          { title: "Comparison", value: "comparison" },
          { title: "Case Study", value: "case-study" },
          { title: "AI", value: "ai" },
          { title: "Maintenance", value: "maintenance" },
          { title: "Property Management", value: "property-management" },
          { title: "Software", value: "software" },
          { title: "Thought Leadership", value: "thought-leadership" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      initialValue: {
        _ref: "author.ari-khan",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog index and cards",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule
          .min(150)
          .max(160)
          .warning("Aim for 150-160 characters with the target keyword"),
    }),
    defineField({
      name: "targetKeyword",
      title: "Target Keyword",
      type: "string",
    }),
    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      description: "Who this post is for",
    }),
    defineField({
      name: "readTime",
      title: "Read Time (min)",
      type: "number",
      description: "word_count / 200",
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      initialValue: ["General"],
    }),
    defineField({
      name: "audioUrl",
      title: "Audio URL",
      type: "url",
      description:
        "Optional hosted narration. The site falls back to on-device speech for every post.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
            { title: "Featured paragraph", value: "featured" },
            { title: "Pull quote", value: "pullQuote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
              {
                name: "footnote",
                type: "object",
                title: "Footnote",
                fields: [{ name: "text", type: "text", title: "Note" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            {
              name: "presentation",
              title: "Presentation",
              type: "string",
              initialValue: "default",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Diagram (white card)", value: "diagram" },
                  { title: "Asset / CTA card", value: "assetCta" },
                ],
                layout: "radio",
              },
            },
            { name: "ctaTitle", type: "string", title: "CTA title" },
            { name: "ctaLabel", type: "string", title: "CTA label" },
            { name: "ctaHref", type: "url", title: "CTA URL" },
          ],
        },
        {
          type: "object",
          name: "ctaButton",
          title: "In-article CTA",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "url", title: "URL" },
          ],
          preview: {
            select: { title: "label" },
            prepare: ({ title }: { title?: string }) => ({
              title: title || "In-article CTA",
            }),
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "category" },
  },
});
