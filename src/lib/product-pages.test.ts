import { describe, expect, it } from "vitest";
import {
  getFallbackProductPage,
  type ProductDetailSection,
  productSlugs,
} from "./product-pages";

describe("product page migration fallback", () => {
  it("contains the five migrated products and the new Agent Studio page", () => {
    expect(productSlugs).toEqual([
      "platform",
      "agent-os",
      "agent-studio",
      "ai-agents",
      "agentic-workflows",
      "databases",
    ]);
    expect(productSlugs.every((slug) => getFallbackProductPage(slug))).toBe(
      true,
    );
  });

  it("uses the current product copy over the Framer fallback", () => {
    expect(getFallbackProductPage("databases")?.hero.title).toBe(
      "Automate Accurately with State of the Art Retrieval",
    );
    expect(getFallbackProductPage("agent-os")?.hero.title).toBe(
      "Graph-based execution for innflow agents",
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
      slug === "agent-studio"
        ? /^\/brand\/agent-studio\//
        : /^https:\/\/framerusercontent\.com\/images\//,
    );
  });

  it("maps every Studio capability to the correct detail and uses local assets", () => {
    const product = getFallbackProductPage("agent-studio");
    const details =
      product?.sections.filter(
        (section) => section._type === "productDetailSection",
      ) ?? [];
    const cards =
      product?.sections.flatMap((section) =>
        section._type === "productCapabilitiesSection" ? section.cards : [],
      ) ?? [];
    expect(details).toHaveLength(8);
    expect(cards).toHaveLength(8);
    for (const card of cards) {
      expect(details.some((detail) => detail.anchor === card.anchor)).toBe(
        true,
      );
      expect(card.image.url).toMatch(/^\/brand\/agent-studio\//);
    }
    expect(cards[1].anchor).toBe("connectors");
    expect(cards[2].anchor).toBe("visual-builder");
  });

  it("returns null for non-product routes", () => {
    expect(getFallbackProductPage("not-a-product")).toBeNull();
  });
});
