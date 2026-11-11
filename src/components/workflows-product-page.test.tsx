import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { WorkflowsProductPage } from "./workflows-product-page";

it("follows the workflow page structure without borrowed names", () => {
  render(<WorkflowsProductPage />);
  expect(
    screen.getByRole("heading", { level: 1, name: /Every handoff/ }),
  ).toBeInTheDocument();
  expect(screen.getByText("Maintenance intake")).toBeInTheDocument();
  expect(screen.getByText(/TODO: Julian/)).toBeInTheDocument();
  expect(screen.queryByText(/Offloop|off-loop|Botmode/i)).toBeNull();
  expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(5);
});
