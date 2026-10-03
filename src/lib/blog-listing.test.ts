import { describe, expect, it } from "vitest";
import {
  BLOG_PAGE_SIZE,
  blogFilterValue,
  blogListingHref,
  paginateItems,
  parseBlogPage,
} from "./blog-listing";

describe("blog listing pagination", () => {
  it("normalizes repeated, empty, and whitespace-only filters", () => {
    expect(blogFilterValue([" automation ", "agents"])).toBe("automation");
    expect(blogFilterValue([])).toBe("");
    expect(blogFilterValue(undefined)).toBe("");
    expect(blogFilterValue("   ")).toBe("");
  });
  it.each(["2junk", "2.5", "-2", "Infinity", "9007199254740992"])(
    "rejects a malformed page: %s",
    (value) => {
      expect(parseBlogPage(value)).toBe(1);
    },
  );
  it("uses the first repeated page value", () => {
    expect(parseBlogPage([" 2 ", "3"])).toBe(2);
  });
  const posts = Array.from({ length: 23 }, (_, index) => `post-${index + 1}`);

  it("bounds the first page and keeps filters on next/previous links", () => {
    const page1 = paginateItems(posts, 1);
    expect(page1.items).toHaveLength(BLOG_PAGE_SIZE);
    expect(page1.items[0]).toBe("post-1");
    expect(page1.hasPrev).toBe(false);
    expect(page1.hasNext).toBe(true);
    expect(page1.totalPages).toBe(3);

    const page2 = paginateItems(posts, 2);
    expect(page2.items).toEqual(
      posts.slice(BLOG_PAGE_SIZE, BLOG_PAGE_SIZE * 2),
    );
    expect(page2.hasPrev).toBe(true);
    expect(page2.hasNext).toBe(true);

    const filters = {
      q: "rent",
      category: "automation",
      industry: "Multifamily",
    };
    expect(blogListingHref({ ...filters, page: 1 })).toBe(
      "/blog?q=rent&category=automation&industry=Multifamily",
    );
    expect(blogListingHref({ ...filters, page: 2 })).toBe(
      "/blog?q=rent&category=automation&industry=Multifamily&page=2",
    );
  });

  it("clamps invalid pages and omits page=1 from the href", () => {
    expect(parseBlogPage("0")).toBe(1);
    expect(parseBlogPage("abc")).toBe(1);
    expect(paginateItems(posts, 99).page).toBe(3);
    expect(blogListingHref({ page: 1 })).toBe("/blog");
  });
});
