import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
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
  afterEach(cleanup);

  it("combines category and availability with trimmed case-insensitive search", () => {
    render(
      <IntegrationDirectory
        items={[
          ...items,
          {
            ...items[25],
            _id: "mail",
            slug: "mail",
            name: "Mail tool",
            category: { title: "Communication", slug: "communication" },
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /^Communication/ }));
    expect(
      screen.getByRole("button", { name: /^Communication/ }),
    ).toHaveAttribute("aria-pressed", "true");
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "available" },
    });
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "  MAIL  " },
    });
    expect(screen.getByRole("status")).toHaveTextContent(
      "1 integration in Communication",
    );
    expect(screen.getByRole("heading", { name: "Mail tool" })).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Tool 25" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Reset all" }));
    expect(
      screen.getByRole("button", { name: /^All integrations/ }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent("27 integrations");
    expect(screen.queryByRole("heading", { name: "Mail tool" })).toBeNull();
  });
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
