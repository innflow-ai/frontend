import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "innflow",

  projectId: "hnjg8vum",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Website announcement")
              .child(
                S.document()
                  .schemaType("websiteAnnouncement")
                  .documentId("website-announcement"),
              ),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "websiteAnnouncement",
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((t) => t.schemaType !== "websiteAnnouncement"),
  },
});
