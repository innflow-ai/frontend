import { defineField, defineType } from "sanity";

const action = (required = false) =>
  defineField({
    name: "action",
    title: "Action",
    type: "object",
    fields: [
      defineField({
        name: "label",
        type: "string",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "href",
        type: "url",
        validation: (r) =>
          r.required().uri({ allowRelative: true, scheme: ["https"] }),
      }),
    ],
    validation: (r) => (required ? r.required() : r),
  });
export const websiteAnnouncementType = defineType({
  name: "websiteAnnouncement",
  title: "Website announcement",
  type: "document",
  fields: [
    defineField({ name: "enabled", type: "boolean", initialValue: false }),
    defineField({
      name: "campaignId",
      type: "string",
      description:
        "Change for a new campaign so previous dismissals do not hide it.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "supportingCopy", type: "string" }),
    defineField({
      name: "offer",
      type: "object",
      fields: [
        defineField({
          name: "message",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({ name: "mobileMessage", type: "string" }),
        defineField({ name: "startsAt", type: "datetime" }),
        defineField({
          name: "targetTime",
          title: "Offer deadline",
          type: "datetime",
          validation: (r) =>
            r.required().custom((value, context) => {
              const start = (context.parent as { startsAt?: string })?.startsAt;
              return (
                !start ||
                !value ||
                Date.parse(start) < Date.parse(value) ||
                "Deadline must follow start time"
              );
            }),
        }),
        defineField({
          name: "displayTimeZone",
          type: "string",
          initialValue: "America/New_York",
          validation: (r) =>
            r.required().custom((value) => {
              try {
                new Intl.DateTimeFormat("en", { timeZone: value });
                return true;
              } catch {
                return "Enter an IANA timezone such as America/New_York";
              }
            }),
        }),
        action(true),
      ],
    }),
    defineField({
      name: "modelRelease",
      type: "object",
      fields: [
        defineField({
          name: "id",
          title: "Release ID",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "name",
          title: "Model name",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "icon",
          title: "Official model/provider icon",
          type: "image",
          validation: (r) => r.required(),
        }),
        action(),
      ],
    }),
  ],
  validation: (r) =>
    r.custom((v) =>
      !v?.enabled || v.offer || v.modelRelease
        ? true
        : "Add an offer or model release before enabling",
    ),
  preview: { prepare: () => ({ title: "Website announcement" }) },
});
