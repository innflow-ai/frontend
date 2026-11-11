import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("matches the pricing title structure", () => {
    render(
      <SectionHeading
        id="pricing-title"
        level={1}
        title="Pick a plan."
        accent="Your AI team is waiting."
        subtitle="Agents, workflows and knowledge. One workspace."
      />,
    );
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveAttribute("id", "pricing-title");
    expect(title).toHaveTextContent("Pick a plan.");
    expect(title.querySelector("span")).toHaveTextContent(
      "Your AI team is waiting.",
    );
    expect(
      screen.getByText("Agents, workflows and knowledge. One workspace."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
  });

  it("uses the requested heading level and keeps a single title", () => {
    render(<SectionHeading level={2} title="Frequently asked questions" />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Frequently asked questions",
      }),
    ).toBeInTheDocument();
  });
});
