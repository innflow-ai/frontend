import { describe, expect, it } from "vitest";
import { getProductFaqs, productFaqSlugs } from "@/content/product-faqs";

describe("product page FAQs", () => {
  it.each(productFaqSlugs)(
    "ships expandable, innflow-branded answers for %s",
    (slug) => {
      const faqs = getProductFaqs(slug);
      const blob = faqs
        .map((item) => `${item.question} ${item.answer}`)
        .join("\n");

      expect(faqs.length).toBeGreaterThanOrEqual(4);
      expect(faqs.every((item) => item.answer.length > 40)).toBe(true);
      expect(blob).not.toMatch(/beam(\s|ai|\.)/i);
      expect(blob).not.toMatch(/SOC\s*2|ISO\s*27001|self-evolving|zero delay/i);
      expect(blob).not.toMatch(/learn autonomously|100% in 30 seconds/i);
      expect(blob.toLowerCase()).toMatch(/innflow/);
    },
  );

  it("covers agents, memory, HITL, deployment, and security on AI Agents", () => {
    const blob = getProductFaqs("ai-agents")
      .map((item) => `${item.question} ${item.answer}`)
      .join("\n");

    expect(blob).toMatch(/agent/i);
    expect(blob).toMatch(/memory|context/i);
    expect(blob).toMatch(/person|approval|review/i);
    expect(blob).toMatch(/deploy/i);
    expect(blob).toMatch(/security/i);
  });

  it("returns nothing for unknown slugs", () => {
    expect(getProductFaqs("not-a-product")).toEqual([]);
  });
});
