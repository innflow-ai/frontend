import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import BlogIndexPage from "./page";

vi.mock("@/lib/sanity", () => ({
  getBlogPosts: async () =>
    Array.from({ length: 14 }, (_, index) => ({
      slug: `automation-${index}`,
      title: `Automation guide ${index}`,
      category: "automation",
      industries: index % 2 ? undefined : [],
      excerpt: "Practical automation guidance.",
      publishedAt: "2026-10-01",
      readTime: 3,
    })),
  formatPostDate: () => "October 1, 2026",
  humanizeCategory: (category: string) => category,
  coverImageUrl: () => "",
}));

describe("blog directory filters", () => {
  afterEach(cleanup);

  it("renders repeated parameters safely, including uncategorized industries", async () => {
    render(
      await BlogIndexPage({
        searchParams: Promise.resolve({
          q: [" automation ", "ignored"],
          category: ["automation", "ignored"],
          industry: ["General", "ignored"],
        }),
      }),
    );
    expect(screen.getByRole("searchbox")).toHaveValue("automation");
    expect(screen.getByRole("combobox")).toHaveValue("General");
    expect(screen.getByText(/14 stories/)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(9);
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/blog?q=automation&category=automation&industry=General&page=2",
    );
    expect(screen.getByRole("link", { name: "Clear filters" })).toHaveAttribute(
      "href",
      "/blog",
    );
  });

  it("keeps filters on the second page without repeating first-page stories", async () => {
    render(
      await BlogIndexPage({
        searchParams: Promise.resolve({ q: "automation", page: ["2", "1"] }),
      }),
    );
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
    expect(
      screen.queryByRole("heading", { name: "Automation guide 0" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/blog?q=automation",
    );
  });

  it("treats whitespace-only search as an unfiltered visit", async () => {
    render(
      await BlogIndexPage({ searchParams: Promise.resolve({ q: "   " }) }),
    );
    expect(
      screen.getByRole("heading", { name: "Fresh perspectives" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Clear filters" }),
    ).not.toBeInTheDocument();
  });
});
