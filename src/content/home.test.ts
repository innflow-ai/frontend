import { describe, expect, it } from "vitest";
import { faqs, featureStories } from "@/content/home";

describe("homepage claim guardrails", () => {
  it.each(["Communications", "Website"])(
    "keeps %s explicitly preview-only",
    (eyebrow) => {
      expect(
        featureStories.find((story) => story.eyebrow === eyebrow)?.status,
      ).toBe("Preview");
    },
  );

  it("does not list Chat as an available homepage capability", () => {
    expect(featureStories.some((story) => story.eyebrow === "Chat")).toBe(
      false,
    );
  });

  it("keeps FAQ answers expandable and free of unverified claims", () => {
    const blob = faqs
      .map((item) => `${item.question} ${item.answer}`)
      .join("\n");

    expect(faqs.length).toBeGreaterThanOrEqual(8);
    expect(faqs.every((item) => item.answer.length > 40)).toBe(true);
    expect(blob).not.toMatch(/beam(\s|ai|\.)/i);
    expect(blob).not.toMatch(/SOC\s*2|ISO\s*27001/i);
    expect(blob).not.toMatch(/\bomnichannel\b|web chat|24\/7/i);
    expect(faqs.some((item) => /human/i.test(item.question))).toBe(true);
    expect(faqs.some((item) => /memory|context/i.test(item.question))).toBe(
      true,
    );
    expect(faqs.some((item) => /deploy/i.test(item.question))).toBe(true);
    expect(faqs.some((item) => /security/i.test(item.question))).toBe(true);
  });
});
