import { describe, expect, it } from "vitest";
import { featureStories } from "@/content/home";

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
});
