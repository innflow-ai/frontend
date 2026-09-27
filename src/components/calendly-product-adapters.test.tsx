import { describe, expect, it, vi } from "vitest";
import { getFallbackProductPage } from "@/lib/product-pages";

vi.mock("./calendly-product-page", () => ({ CalendlyProductPage: () => null }));

import { adaptProductContent } from "./calendly-product-adapters";

describe("Calendly layout content preservation", () => {
  for (const slug of ["agent-os", "ai-agents", "agent-studio", "databases"]) {
    it(`retains the existing ${slug} content, anchors, and CTA intent`, () => {
      const source = getFallbackProductPage(slug);
      expect(source).not.toBeNull();
      if (!source) return;
      const result = adaptProductContent(source);
      expect(result.title).toBe(source.hero.title);
      expect(result.description).toBe(source.hero.body);
      expect(result.primaryCta?.label).toBe(source.hero.primaryCta.label);
      const details = source.sections.filter(
        (item) => item._type === "productDetailSection",
      );
      expect(result.features).toHaveLength(details.length);
      for (const detail of details) {
        expect(result.features).toContainEqual(
          expect.objectContaining({
            id: detail.anchor,
            title: detail.title,
            body: detail.body,
            points: detail.points,
          }),
        );
      }
      const cards = source.sections.flatMap((item) =>
        item._type === "productCapabilitiesSection" ? item.cards : [],
      );
      expect(result.cards).toHaveLength(cards.length);
      for (const card of cards)
        expect(result.cards).toContainEqual(
          expect.objectContaining({ title: card.title, body: card.body }),
        );
      for (const intro of source.sections.filter(
        (item) => item._type === "productIntroSection",
      ))
        expect(result.intro).toContainEqual(
          expect.objectContaining({ title: intro.heading, body: intro.body }),
        );
    });
  }
});
