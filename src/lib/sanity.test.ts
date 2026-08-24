import { beforeEach, describe, expect, it, vi } from "vitest";

const { fetchMock, unstableCacheMock } = vi.hoisted(() => ({
  fetchMock: vi.fn(),
  unstableCacheMock: vi.fn((callback: () => Promise<unknown>) => callback),
}));

vi.mock("next/cache", () => ({
  unstable_cache: unstableCacheMock,
}));

vi.mock("next-sanity", () => ({
  createClient: () => ({ fetch: fetchMock }),
}));

vi.mock("@sanity/image-url", () => ({
  createImageUrlBuilder: () => ({ image: vi.fn() }),
}));

import { getLatestBlogPosts } from "./sanity";

const post = {
  title: "Newest post",
  slug: "newest-post",
  excerpt: "Summary",
  category: "automation",
  publishedAt: "2026-08-23T12:00:00.000Z",
  readTime: 4,
  featured: false,
  coverImage: null,
  tags: ["automation"],
};

describe("latest Sanity blog posts", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("requests two newest published posts and excludes future entries", async () => {
    fetchMock.mockResolvedValue([post]);

    await expect(getLatestBlogPosts()).resolves.toEqual([post]);
    expect(fetchMock).toHaveBeenCalledOnce();

    const query = fetchMock.mock.calls[0]?.[0] as string;
    expect(query).toContain("publishedAt <= now()");
    expect(query).toContain("order(publishedAt desc)[0...2]");
    expect(query).toContain("defined(slug.current)");
  });

  it("uses an isolated 60-second tagged cache", () => {
    expect(unstableCacheMock).toHaveBeenCalledWith(
      expect.any(Function),
      ["latest-blog-posts"],
      { revalidate: 60, tags: ["blog-posts"] },
    );
  });

  it("returns an empty list when Sanity is unavailable", async () => {
    fetchMock.mockRejectedValue(new Error("Sanity unavailable"));
    await expect(getLatestBlogPosts()).resolves.toEqual([]);
  });
});
