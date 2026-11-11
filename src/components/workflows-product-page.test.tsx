import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { WorkflowsProductPage } from "./workflows-product-page";

it("uses the workflows copy and leaves the field note unlinked", () => {
  render(<WorkflowsProductPage />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Give every outcome a path your team can see.",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: "Start for free" })[0],
  ).toHaveAttribute("href", "https://app.innflow.ai");
  expect(
    screen.getAllByRole("link", { name: "See a launch workflow" })[0],
  ).toHaveAttribute("href", "#launch-workflow");
  expect(screen.getByLabelText("Product launch")).toBeInTheDocument();
  expect(screen.getAllByText("Launch owner").length).toBeGreaterThan(0);
  expect(
    screen.getByRole("heading", {
      name: "A launch needs more than a checklist",
    }),
  ).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /field note/i })).toBeNull();
  expect(screen.queryByText(/Coming soon|Northwind|Offloop/i)).toBeNull();
});
