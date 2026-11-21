import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { BaselaneForms } from "./baselane-forms";
import { formGroups } from "./baselane-forms-data";

afterEach(cleanup);

it("provides a distinct, correctly labeled preparation download for every worksheet", () => {
  render(<BaselaneForms />);
  const filenames = new Set<string>();
  for (const group of formGroups) {
    for (const [title, slug] of group.items) {
      const link = screen.getByRole("link", {
        name: `Download ${title.toLowerCase()} preparation worksheet`,
      });
      const href = link.getAttribute("href") ?? "";
      expect(href).toMatch(/^data:text\/plain;charset=utf-8,/);
      const text = decodeURIComponent(href.slice(href.indexOf(",") + 1));
      expect(text).toContain(title);
      expect(text).toContain(group.description);
      expect(text).toContain("Property:\nPrepared by:\nReview date:");
      expect(text).toContain("Preparation worksheet only.");
      const filename = `innflow-${slug}-preparation.txt`;
      expect(link).toHaveAttribute("download", filename);
      expect(filenames.has(filename)).toBe(false);
      filenames.add(filename);
    }
  }
  expect(screen.getAllByRole("link", { name: /^Download / })).toHaveLength(
    filenames.size,
  );
});

it("connects every category link to its worksheet section", () => {
  const { container } = render(<BaselaneForms />);
  for (const group of formGroups) {
    expect(screen.getByRole("link", { name: group.title })).toHaveAttribute(
      "href",
      `#${group.slug}`,
    );
    expect(container.querySelector(`[id="${group.slug}"]`)).toContainElement(
      screen.getByRole("heading", { name: group.title }),
    );
  }
});
