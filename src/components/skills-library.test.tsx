import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import type { SkillSummary } from "@/lib/skills";
import { SkillsLibrary } from "./skills-library";

afterEach(cleanup);

it("combines category and normalized search and recovers from no results", () => {
  const category = { title: "Finance", slug: "finance" };
  const base = { builtBy: null, color: null, cardColor: null, icon: null };
  const skills: SkillSummary[] = [
    {
      ...base,
      name: "Invoice review",
      slug: "invoice-review",
      shortDescription: "Check payment details",
      category,
    },
    {
      ...base,
      name: "Meeting recap",
      slug: "meeting-recap",
      shortDescription: "Summarize a discussion",
      category: null,
    },
  ];
  render(<SkillsLibrary skills={skills} categories={[category]} />);
  expect(screen.getByText("2 skills")).toBeVisible();
  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "  PAYMENT  " },
  });
  expect(screen.getByText("1 skill")).toBeVisible();
  expect(screen.getByRole("link", { name: /Invoice review/ })).toHaveAttribute(
    "href",
    "/skills/invoice-review",
  );
  fireEvent.click(screen.getByRole("button", { name: "Finance" }));
  expect(screen.getByRole("button", { name: "Finance" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "Meeting" },
  });
  expect(screen.getByText("0 skills")).toBeVisible();
  expect(screen.queryByRole("link")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: /^All$/ }));
  expect(screen.getByRole("link", { name: /Meeting recap/ })).toBeVisible();
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "" } });
  expect(screen.getAllByRole("link")).toHaveLength(2);
});
