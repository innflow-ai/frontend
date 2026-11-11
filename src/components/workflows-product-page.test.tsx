import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { workflowsPage } from "@/content/workflows-page";
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
  expect(workflowsPage.example.unverified).toBe(true);
  expect(workflowsPage.example.hidden).toBe(false);
  expect(workflowsPage.attention.unverified).toBe(true);
  expect(workflowsPage.attention.hidden).toBe(false);
  expect(
    screen.getByRole("heading", { name: "See what is waiting." }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Show who owns the step" }),
  ).toBeInTheDocument();
  expect(
    workflowsPage.plan.rows
      .filter((row) => row.unverified)
      .map((row) => row.title),
  ).toEqual(["Show who owns the step", "Keep the exception on the path"]);
  expect(
    workflowsPage.loop.steps
      .filter((step) => step.unverified)
      .map((step) => step.title),
  ).toEqual(["Assign the steps", "Review and continue"]);
});
