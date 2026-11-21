import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { BlogTaxonomy } from "./taxonomy";

afterEach(cleanup);

it("preserves encoded filter links and expands extra content types", () => {
  render(
    <BlogTaxonomy
      category="ai-agent"
      industries={["Sales & Support"]}
      tags={["R&D / teams"]}
    />,
  );
  expect(screen.getByRole("link", { name: "AI Agent" })).toHaveAttribute(
    "href",
    "/blog?category=ai-agent",
  );
  expect(screen.getByRole("link", { name: "Sales & Support" })).toHaveAttribute(
    "href",
    "/blog?industry=Sales%20%26%20Support",
  );
  expect(screen.getByRole("link", { name: "R&D / teams" })).toHaveAttribute(
    "href",
    "/blog?q=R%26D%20%2F%20teams",
  );
  expect(screen.queryByRole("link", { name: "Comparison" })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Show more" }));
  expect(screen.getByRole("button", { name: "Show less" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  expect(screen.getByRole("link", { name: "Comparison" })).toHaveAttribute(
    "href",
    "/blog?category=comparison",
  );
  expect(screen.getAllByRole("link", { name: "AI Agent" })).toHaveLength(1);
  fireEvent.click(screen.getByRole("button", { name: "Show less" }));
  expect(screen.getByRole("button", { name: "Show more" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  expect(screen.queryByRole("link", { name: "Comparison" })).toBeNull();
});
