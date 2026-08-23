import { describe, expect, it } from "vitest";
import {
  getFallbackProductPage,
  type ProductDetailSection,
  productSlugs,
} from "./product-pages";

describe("product page migration fallback", () => {
  it("contains exactly the five approved Framer products", () => {
    expect(productSlugs).toEqual([
      "platform",
      "agent-os",
      "ai-agents",
      "agentic-workflows",
      "databases",
    ]);
    expect(productSlugs.every((slug) => getFallbackProductPage(slug))).toBe(
      true,
    );
  });

  it("preserves exact Framer hero copy", () => {
    expect(getFallbackProductPage("databases")?.hero.title).toBe(
      "Automate Accurately with State of the Art Retrieval",
    );
    expect(getFallbackProductPage("agent-os")?.hero.title).toBe(
      "The First Self-Evolving Execution Engine for AI agents",
    );
  });

  it.each(productSlugs)("builds valid constrained sections for %s", (slug) => {
    const product = getFallbackProductPage(slug);
    expect(product).not.toBeNull();

    const details = product?.sections.filter(
      (section): section is ProductDetailSection =>
        section._type === "productDetailSection",
    );
    const anchors = details?.map((detail) => detail.anchor) ?? [];

    expect(new Set(anchors).size).toBe(anchors.length);
    expect(product?.sections.at(-1)?._type).toBe("productFinalCtaSection");
    expect(product?.hero.image.url).toMatch(
      /^https:\/\/framerusercontent\.com\/images\//,
    );
  });

  it("returns null for non-product routes", () => {
    expect(getFallbackProductPage("not-a-product")).toBeNull();
  });
});
