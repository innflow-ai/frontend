import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { solutionsColumns } from "@/components/mega-menu";
import { featurePageRoutes } from "./feature-page-routes";
import { featurePageDesigns } from "./feature-pages";

describe("Figma feature page handoff", () => {
  it("keeps property feature routes available outside the industry navigation", () => {
    for (const page of featurePageDesigns) {
      expect(existsSync(`src/app${page.path}/page.tsx`), page.path).toBe(true);
    }
    expect(
      solutionsColumns
        .flatMap((column) => column.links)
        .every((link) => link.href.startsWith("/industries/")),
    ).toBe(true);
  });

  it("provides a unique route and assigned hero for each design", () => {
    expect(featurePageDesigns).toHaveLength(33);
    expect(new Set(featurePageDesigns.map((page) => page.path)).size).toBe(33);
    expect(new Set(featurePageDesigns.map((page) => page.hero)).size).toBe(33);
  });

  for (const page of featurePageDesigns) {
    it(`${page.path} has complete sections, local artwork and CMS placement wiring`, () => {
      expect(existsSync(`src/app${page.path}/page.tsx`)).toBe(true);
      expect(page.panels).toHaveLength(4);
      expect(new Set(page.panels.map((panel) => panel.id)).size).toBe(4);
      expect(page.features.length).toBeGreaterThanOrEqual(3);
      expect(page.faqs).toHaveLength(4);
      expect(page.heroArtwork.length).toBeGreaterThan(0);
      const images = [page.hero, ...page.heroArtwork.map((art) => art.src)];
      for (const panel of page.panels) {
        expect(panel.artwork.length).toBeGreaterThan(0);
        images.push(panel.image, ...panel.artwork.map((art) => art.src));
      }
      for (const src of images) {
        expect(existsSync(`public${src}`), src).toBe(true);
        if (src.endsWith(".svg")) {
          expect(readFileSync(`public${src}`, "utf8")).not.toContain(
            "figma.com/api/mcp/asset",
          );
        }
      }
      if (!page.path.startsWith("/products/")) {
        expect(
          featurePageRoutes.some((route) => route.value === page.path),
        ).toBe(true);
      }
    });
  }
});
