import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Testimonial } from "@/lib/testimonials";
import { TestimonialCards } from "./testimonial-cards";

const item: Testimonial = {
  id: "test-only",
  name: "Preview Person",
  role: "Property owner",
  propertyCount: 1,
  portrait: {
    url: "/brand/contact/new-to-innflow.png",
    alt: "Preview portrait",
  },
  avatarUrl: "/brand/contact/new-to-innflow.png",
  shortQuote: "Short preview quote",
  quote: "Full preview quote for interaction testing.",
};
afterEach(cleanup);
describe("testimonial cards", () => {
  it("exposes and closes the full story through the touch and keyboard button", () => {
    render(<TestimonialCards testimonials={[item]} />);
    const button = screen.getByRole("button", {
      name: "Read Preview Person’s testimonial",
    });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("blockquote")).toBeNull();
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("blockquote")).toHaveTextContent(item.quote);
    expect(screen.getByText("1 property")).toBeVisible();
    fireEvent.keyDown(button, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
  it("renders nothing when no testimonials are selected", () => {
    const { container } = render(<TestimonialCards testimonials={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
  it("keeps the complete quote accessible when a statistic is on the front", () => {
    render(
      <TestimonialCards
        testimonials={[
          {
            ...item,
            statistic: { value: "8 hrs", label: "Preview statistic" },
          },
        ]}
      />,
    );
    expect(screen.getByText("8 hrs")).toBeVisible();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("blockquote")).toHaveTextContent(item.quote);
  });
});
