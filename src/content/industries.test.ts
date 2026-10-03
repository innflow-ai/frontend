import { describe, expect, it } from "vitest";
import { solutionsColumns } from "@/components/mega-menu";
import { footerNavigation } from "@/config/footer-navigation";
import { getIndustryPage, industryHref, industryPages } from "./industries";
import { industryNavigation } from "./industry-navigation";

describe("industry discovery", () => {
  it("keeps lightweight navigation identities aligned with full page content", () => {
    expect(industryNavigation).toEqual(
      industryPages.map(({ slug, name }) => ({ slug, name })),
    );
    const menuLinks = solutionsColumns.flatMap((column) => column.links);
    for (const { slug, name } of industryNavigation) {
      expect(
        menuLinks.find((link) => link.href === industryHref(slug))?.title,
      ).toBe(name);
    }
  });
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
