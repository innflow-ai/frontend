import { beforeEach, describe, expect, it, vi } from "vitest";
import { sanityClient } from "@/lib/sanity";
import {
  getSkillBySlug,
  getSkillCategories,
  getSkillSlugs,
  getSkills,
  skillColorFallback,
  skillColorValue,
} from "./skills";

vi.mock("@/lib/sanity", () => ({
  sanityClient: { fetch: vi.fn() },
}));

const fetchMock = vi.mocked(sanityClient.fetch) as unknown as {
  mockReset: () => void;
  mockResolvedValue: (value: unknown) => void;
  mockRejectedValue: (error: unknown) => void;
} & ReturnType<typeof vi.fn>;

const sampleSummary = {
  name: "1-1 Conversation Planner",
  slug: "1-1-conversation-planner",
  shortDescription: "Crafts structured 1-on-1 conversation guides.",
  builtBy: "innflow.ai",
  color: "Hot Pink",
  cardColor: "Hot Pink",
  icon: null,
  category: { title: "Human resources", slug: "human-resources" },
};

beforeEach(() => {
  fetchMock.mockReset();
});

describe("skills data layer", () => {
  it("getSkills returns mapped summaries", async () => {
    fetchMock.mockResolvedValue([sampleSummary]);
    const skills = await getSkills();
    expect(skills).toEqual([sampleSummary]);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("skill"));
  });

  it("getSkills swallows errors to an empty array", async () => {
    fetchMock.mockRejectedValue(new Error("boom"));
    await expect(getSkills()).resolves.toEqual([]);
  });

  it("getSkillSlugs returns slugs and swallows errors", async () => {
    fetchMock.mockResolvedValue(["a", "b"]);
    await expect(getSkillSlugs()).resolves.toEqual(["a", "b"]);
    fetchMock.mockRejectedValue(new Error("boom"));
    await expect(getSkillSlugs()).resolves.toEqual([]);
  });

  it("getSkillBySlug fetches a full skill with params", async () => {
    const skill = { ...sampleSummary, longDescription: [] };
    fetchMock.mockResolvedValue(skill);
    await expect(getSkillBySlug("1-1-conversation-planner")).resolves.toEqual(
      skill,
    );
    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
      slug: "1-1-conversation-planner",
    });
  });

  it("getSkillBySlug swallows errors to null", async () => {
    fetchMock.mockRejectedValue(new Error("boom"));
    await expect(getSkillBySlug("x")).resolves.toBeNull();
  });

  it("getSkillCategories returns categories and swallows errors", async () => {
    const categories = [{ title: "Marketing", slug: "marketing" }];
    fetchMock.mockResolvedValue(categories);
    await expect(getSkillCategories()).resolves.toEqual(categories);
    fetchMock.mockRejectedValue(new Error("boom"));
    await expect(getSkillCategories()).resolves.toEqual([]);
  });
});

describe("skillColorValue", () => {
  it("maps every migrated Framer color enum to a CSS color", () => {
    const enums = [
      "Sky Blue",
      "Soft Indigo",
      "Violet Blue",
      "Magenta",
      "Hot Pink",
      "Coral Orange",
      "Gold Amber",
      "Fresh Green",
      "Teal",
    ];
    for (const value of enums) {
      expect(skillColorValue(value)).toMatch(/^#[0-9a-f]{6}$/i);
      expect(skillColorValue(value)).not.toBe(skillColorFallback);
    }
  });

  it("prefers color, then cardColor, then the brand fallback", () => {
    expect(skillColorValue("Teal", "Hot Pink")).toBe("#2bb5a0");
    expect(skillColorValue(null, "Hot Pink")).toBe("#ec4899");
    expect(skillColorValue("Unknown", "Also unknown")).toBe(skillColorFallback);
    expect(skillColorValue(null, null)).toBe(skillColorFallback);
  });
});
