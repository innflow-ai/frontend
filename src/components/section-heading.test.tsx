import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("puts the serif line first and the Archivo emphasis second", () => {
    render(
      <SectionHeading
        id="pricing-title"
        as="h1"
        size="hero"
        title="Pick a plan."
        emphasis="Your AI team is waiting."
        subtitle="Agents, workflows and knowledge. One workspace."
      />,
    );
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveAttribute("id", "pricing-title");
    expect(title.childNodes[0]).toHaveTextContent("Pick a plan.");
    const emphasis = title.querySelector("span");
    expect(emphasis).toHaveTextContent("Your AI team is waiting.");
    expect(title.textContent?.indexOf("Pick a plan.")).toBeLessThan(
      title.textContent?.indexOf("Your AI team is waiting.") ?? -1,
    );
    expect(title.parentElement).toHaveAttribute("data-size", "hero");
    expect(title.parentElement).toHaveAttribute("data-align", "center");
    expect(title.parentElement).toHaveAttribute("data-tone", "default");
    expect(
      screen.getByText("Agents, workflows and knowledge. One workspace."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
  });

  it("renders a title with no emphasis split as one serif heading", () => {
    render(<SectionHeading as="h2" title="Frequently asked questions" />);
    const title = screen.getByRole("heading", {
      level: 2,
      name: "Frequently asked questions",
    });
    expect(title.querySelector("span")).toBeNull();
    expect(title.parentElement).toHaveAttribute("data-size", "section");
  });
});
