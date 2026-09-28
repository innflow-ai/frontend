import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Integration } from "@/lib/integration-model";
import { IntegrationDirectory } from "./integration-directory";

const items = Array.from({ length: 26 }, (_, index) => ({
  _id: `tool-${index}`,
  name: `Tool ${index}`,
  slug: `tool-${index}`,
  shortDescription: `Overview ${index}`,
  status: index === 25 ? "available" : "planned",
  category: { title: "Documents", slug: "documents" },
})) as Integration[];

describe("integration directory", () => {
  it("searches beyond the first page and resets filters and pagination", () => {
    render(<IntegrationDirectory items={items} />);
    expect(screen.queryByRole("heading", { name: "Tool 25" })).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: "Show more integrations" }),
    );
    expect(
      screen.getByRole("heading", { name: "Tool 25" }),
    ).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Tool 25" },
    });
    expect(screen.getByRole("status")).toHaveTextContent("1 integration");
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "planned" },
    });
    expect(
      screen.getByRole("heading", { name: "No integrations found" }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset all" }));
    expect(screen.getByRole("status")).toHaveTextContent("26 integrations");
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.queryByRole("heading", { name: "Tool 25" })).toBeNull();
  });

  it("offers a request when the CMS directory is empty", () => {
    render(<IntegrationDirectory items={[]} />);
    expect(
      screen.getByRole("heading", { name: "More connections are on the way" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Clear filters" })).toBeNull();
  });
});
