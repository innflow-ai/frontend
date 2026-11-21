import { describe, expect, it } from "vitest";
import {
  filterIntegrations,
  type Integration,
  integrationStatus,
} from "./integration-model";

const items = [
  {
    name: "Gmail",
    shortDescription: "Email conversations",
    category: { title: "Communication", slug: "communication" },
    status: "planned",
  },
  {
    name: "Slack",
    shortDescription: "Team messaging",
    category: { title: "Communication", slug: "communication" },
    status: "available",
  },
  {
    name: "Notion",
    shortDescription: "Operating knowledge",
    category: { title: "Documents", slug: "documents" },
    status: "in-development",
  },
] as Integration[];
describe("integration discovery", () => {
  it("combines normalized search, category, and availability", () => {
    expect(
      filterIntegrations(items, "  EMAIL  ", "communication", "planned").map(
        (i) => i.name,
      ),
    ).toEqual(["Gmail"]);
    expect(
      filterIntegrations(items, "Slack", "communication", "planned"),
    ).toEqual([]);
    expect(
      filterIntegrations(items, "", "documents", "").map((i) => i.name),
    ).toEqual(["Notion"]);
  });
  it("restores every entry with cleared filters", () => {
    expect(filterIntegrations(items, "", "", "")).toEqual(items);
  });
  it("never presents an unrecognized availability as connectable", () => {
    expect(integrationStatus("unknown").label).toBe("Planned");
    expect(integrationStatus("in-development").description).toContain(
      "not available",
    );
    expect(integrationStatus("available").cta).toBe("Discuss setup");
  });
});
