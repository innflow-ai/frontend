import { beforeEach, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";

const data = vi.hoisted(() => ({ skills: [] as string[] }));
vi.mock("@/lib/sanity", () => ({ getBlogPosts: async () => [] }));
vi.mock("@/lib/integrations", () => ({ getIntegrations: async () => [] }));
vi.mock("@/lib/skills", () => ({ getSkillSlugs: async () => data.skills }));

import sitemap from "./sitemap";

beforeEach(() => {
  data.skills = [];
});

it("includes the public skills and help pages and published skill details", async () => {
  data.skills = ["summarize-conversations", "route-requests"];
  const urls = (await sitemap()).map((entry) => entry.url);
  for (const path of [
    "/skills",
    "/help",
    "/skills/summarize-conversations",
    "/skills/route-requests",
  ]) {
    expect(urls).toContain(`${siteConfig.marketingOrigin}${path}`);
  }
  expect(new Set(urls).size).toBe(urls.length);
});

it("keeps static pages when the skills library is empty and excludes private previews", async () => {
  const urls = (await sitemap()).map((entry) => entry.url);
  expect(urls).toContain(`${siteConfig.marketingOrigin}/skills`);
  expect(
    urls.some(
      (url) => url.includes("/preview/") || url.endsWith("/legal/dsar"),
    ),
  ).toBe(false);
});
