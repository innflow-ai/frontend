import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { headingSplitIndex, MixedHeadingText } from "./mixed-heading-text";
import { SectionHeading } from "./section-heading";

afterEach(cleanup);

describe("mixed Web headings", () => {
  it("splits dynamic titles at complete words without changing their text", () => {
    const title = "Keep conversations connected with your team's work.";
    render(
      <h1>
        <MixedHeadingText>{title}</MixedHeadingText>
      </h1>,
    );
    const heading = screen.getByRole("heading", { level: 1, name: title });
    expect(heading.textContent).toBe(title);
    const runs = heading.querySelectorAll("span span");
    expect(runs).toHaveLength(2);
    expect(runs[0].textContent).toBe("Keep conversations connected");
    expect(runs[1].textContent).toBe("with your team's work.");
  });

  it("preserves one link, its interaction, inline markup, and authored line breaks", () => {
    const onClick = vi.fn();
    render(
      <h2 id="feature-title">
        <MixedHeadingText>
          <a href="/features/ai-agents" onClick={onClick}>
            Keep work
            <br />
            <em>moving forward.</em>
          </a>
        </MixedHeadingText>
      </h2>,
    );
    const heading = screen.getByRole("heading");
    expect(heading).toHaveAttribute("id", "feature-title");
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(heading.querySelectorAll("br")).toHaveLength(1);
    expect(heading.querySelector("em")).toHaveTextContent("moving forward.");
    fireEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledOnce();
    expect(heading.querySelectorAll("h1,h2,h3")).toHaveLength(0);
  });

  it("keeps short labels intact and handles empty or changing CMS titles", () => {
    expect(headingSplitIndex("Pricing")).toBe(7);
    expect(headingSplitIndex("")).toBe(0);
    const view = render(<SectionHeading title="Pricing" />);
    expect(screen.getByRole("heading").textContent).toBe("Pricing");
    view.rerender(<SectionHeading title="A new CMS title" />);
    expect(screen.getByRole("heading").textContent).toBe("A new CMS title");
    expect(screen.getByRole("heading")).toHaveAttribute(
      "data-mixed-heading",
      "true",
    );
  });
});
