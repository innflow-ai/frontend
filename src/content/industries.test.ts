import { describe, expect, it } from "vitest";
import { solutionsColumns } from "@/components/mega-menu";
import { footerNavigation } from "@/config/footer-navigation";
import { getIndustryPage, industryHref, industryPages } from "./industries";

describe("industry discovery", () => {
  it("gives every category a unique, reachable destination in both menus and footer", () => {
    const routes = industryPages.map((page) => industryHref(page.slug));
    expect(routes).toHaveLength(26);
    expect(new Set(routes).size).toBe(26);
    const navigation = solutionsColumns.flatMap((column) =>
      column.links.map((link) => link.href),
    );
    expect(navigation.sort()).toEqual([...routes].sort());
    const footer = footerNavigation.flatMap((group) =>
      group.links.map((link) => link.href),
    );
    for (const route of routes) expect(footer).toContain(route);
    expect(getIndustryPage("not-an-industry")).toBeUndefined();
  });
});
