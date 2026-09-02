import { describe, expect, it } from "vitest";
import { applyVerifiedProductCopy } from "@/content/product-copy";
import { getFallbackProductPage, productSlugs } from "@/lib/product-pages";

const banned =
  /beam(\s|ai|\.)|SOC\s*2|ISO\s*27001|self-evolv|self-learning|100x|zero delay|learn from every interaction|get better every day|100% in 30 seconds|VW chose us/i;

describe("verified product page copy", () => {
  it.each(productSlugs)(
    "strips Beam-era claims from the %s fallback page",
    (slug) => {
      const page = getFallbackProductPage(slug);
      expect(page).not.toBeNull();
      const blob = JSON.stringify(page);
      expect(blob).not.toMatch(banned);
    },
  );

  it("rewrites Agent OS hero off self-evolving language", () => {
    const page = getFallbackProductPage("agent-os");
    expect(page).not.toBeNull();
    if (!page) return;
    const verified = applyVerifiedProductCopy(page);
    expect(verified.hero.title).toMatch(/graph-based execution/i);
    expect(verified.hero.body).toMatch(/execution layer/i);
    expect(verified.hero.title).not.toMatch(/self-evolv/i);
  });
});
