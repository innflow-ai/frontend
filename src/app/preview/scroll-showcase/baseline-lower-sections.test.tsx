import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import type { Testimonial } from "@/lib/testimonials";
import {
  BaselineClosing,
  BaselineConnectedInfrastructure,
  BaselineCustomerStories,
} from "./baseline-lower-sections";

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    sizes: _sizes,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    // biome-ignore lint/performance/noImgElement: next/image test double.
    <img {...props} alt={props.alt ?? ""} />
  ),
}));
afterEach(cleanup);
const story: Testimonial = {
  id: "cms-1",
  name: "Approved Person",
  quote: "Actual supplied feedback.",
  shortQuote: "Actual feedback.",
  portrait: { url: "https://example.com/person.jpg", alt: "Approved portrait" },
  avatarUrl: "https://example.com/person.jpg",
};
it("hides an empty CMS selection without inventing customer evidence", () => {
  const { container } = render(
    <BaselineCustomerStories testimonials={[]} heading="Stories" />,
  );
  expect(container).toBeEmptyDOMElement();
});
it("uses only supplied CMS attribution and does not fabricate a metric", () => {
  render(
    <BaselineCustomerStories
      testimonials={[story]}
      heading="Approved heading"
    />,
  );
  expect(
    screen.getByRole("heading", { name: "Approved heading" }),
  ).toBeVisible();
  expect(screen.getByText("Approved Person")).toBeVisible();
  expect(screen.queryByText("Customer stories")).toBeNull();
  expect(screen.getByText("“Actual supplied feedback.”")).toBeVisible();
  expect(screen.queryByText(/75 hours/)).toBeNull();
  expect(screen.queryByRole("heading", { level: 3 })).toBeNull();
});
it("uses supplied statistics and keeps alternate stories selectable", () => {
  render(
    <BaselineCustomerStories
      testimonials={[
        { ...story, statistic: { value: "4 hrs", label: "reported weekly" } },
        { ...story, id: "cms-2", name: "Second Person" },
      ]}
      heading="Stories"
    />,
  );
  expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
    "4 hrsreported weekly",
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Show Second Person's story" }),
  );
  expect(screen.getByText("Second Person")).toBeVisible();
});
it("matches the baseline two-card infrastructure without extra focus controls", () => {
  render(<BaselineConnectedInfrastructure />);
  expect(screen.queryByText("Connected infrastructure")).toBeNull();
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Build on the toolsyou already use",
  );
  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
  expect(
    screen.getByRole("heading", { name: "Support channels" }),
  ).toBeVisible();
  expect(
    screen.getAllByRole("img").filter((n) => n.getAttribute("alt")),
  ).toHaveLength(17);
  expect(screen.queryByRole("button")).toBeNull();
});
it("offers all four closing scenes manually, including wraparound navigation", () => {
  render(<BaselineClosing />);
  expect(screen.queryByText("Get started")).toBeNull();
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Start fast.Scale fearlessly.",
  );
  expect(
    screen.getByRole("button", { name: "Request resolved" }),
  ).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "Previous highlight" }));
  expect(
    screen.getByRole("button", { name: "Product highlight 4" }),
  ).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "Next highlight" }));
  expect(
    screen.getByRole("button", { name: "Request resolved" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    screen.getByRole("link", { name: "Book an Innflow demo" }),
  ).toHaveAttribute("href");
});
