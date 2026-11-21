import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  MixedHeadingContent,
  SectionHeading,
  splitHeading,
} from "./section-heading";

describe("SectionHeading", () => {
  it("puts the serif line first and the Archivo emphasis second", () => {
    render(
      <SectionHeading
        variant="default"
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
    render(
      <SectionHeading
        variant="default"
        as="h2"
        title="Frequently asked questions"
      />,
    );
    const title = screen.getByRole("heading", {
      level: 2,
      name: "Frequently asked questions",
    });
    expect(title.querySelector("span")).toBeNull();
    expect(title.parentElement).toHaveAttribute("data-size", "section");
  });
});

describe("homepage mixed headings", () => {
  it("keeps the complete title and section ID in a single semantic heading", () => {
    render(
      <SectionHeading
        variant="mixed-italic"
        as="h2"
        id="mixed-feature"
        title="Get more done"
        emphasis="with AI agents."
      />,
    );
    const heading = screen.getByRole("heading", {
      name: "Get more done with AI agents.",
    });
    expect(heading).toHaveAttribute("id", "mixed-feature");
    expect(heading).toHaveAttribute("data-mixed-heading", "true");
    expect(heading.textContent).toBe("Get more done with AI agents.");
    expect(heading.querySelectorAll("h1,h2,h3")).toHaveLength(0);
  });
  it("supports inline content inside an existing heading without adding a wrapper", () => {
    render(
      <h2>
        <MixedHeadingContent title="Featured" emphasis="on" breakAt="never" />
      </h2>,
    );
    const heading = screen.getByRole("heading", { name: "Featured on" });
    expect(heading.textContent).toBe("Featured on");
    expect(heading.querySelector("br")).toBeNull();
  });
  it("preserves unknown CMS headings and rejects splits within words", () => {
    expect(splitHeading("In their own words.", "In their")).toEqual({
      title: "In their",
      emphasis: "own words.",
    });
    expect(splitHeading("Original customer wording")).toBeNull();
    expect(splitHeading("Original customer wording", "Orig")).toBeNull();
    expect(
      splitHeading("Original customer wording", "Not a prefix"),
    ).toBeNull();
    expect(
      splitHeading("Original customer wording", "Original customer wording"),
    ).toBeNull();
  });
});
