import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { industryPages } from "@/content/industries";
import { WorkflowDemo } from "./workflow-demo";

afterEach(cleanup);
it("lets visitors explore each review step without hiding the original request", () => {
  const page = industryPages[0];
  render(<WorkflowDemo page={page} />);
  const buttons = screen.getAllByRole("button");
  for (let i = 0; i < buttons.length; i++) {
    fireEvent.click(buttons[i]);
    expect(buttons[i]).toHaveAttribute("aria-pressed", "true");
    expect(
      buttons.filter(
        (button) => button.getAttribute("aria-pressed") === "true",
      ),
    ).toHaveLength(1);
    expect(screen.getAllByText(page.request).length).toBeGreaterThan(0);
  }
  expect(
    screen.getByText(
      "Your team reviews the prepared context and decides what happens next.",
    ),
  ).toBeVisible();
});
