import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import type { Testimonial } from "@/lib/testimonials";
import {
  BaselineClosing,
  BaselineConnectedInfrastructure,
  BaselineCustomerStories,
} from "./baseline-lower-sections";

const motionPreference = vi.hoisted(() => ({ reduced: false }));
vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useReducedMotion: () => motionPreference.reduced,
}));

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
afterEach(() => {
  cleanup();
  motionPreference.reduced = false;
});
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
it("opts into a clearly marked five-state layout preview without fake testimonials", () => {
  const { container } = render(
    <BaselineCustomerStories
      testimonials={[]}
      heading="CMS heading"
      previewFallback
    />,
  );
  expect(
    screen.getByRole("heading", { name: "Real customers. Real results." }),
  ).toBeVisible();
  expect(
    screen.getByText("Layout preview — customer content pending"),
  ).toBeVisible();
  expect(screen.getByText("Reference photo — replace")).toBeVisible();
  expect(container.querySelector("blockquote")).toBeNull();
  const persistentCopy = screen.getByText(
    "Customer name — pending",
  ).parentElement;
  const persistentPhotos = Array.from(
    container.querySelectorAll("[data-photo-index] img"),
  );
  expect(persistentPhotos).toHaveLength(5);
  expect(
    screen.queryByText(/75 hours|Marques Stewart|Calendly helps/),
  ).toBeNull();
  for (let index = 1; index <= 5; index++) {
    fireEvent.click(
      screen.getByRole("button", { name: `Customer story layout ${index}` }),
    );
    expect(
      screen.getByRole("button", { name: `Customer story layout ${index}` }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("article", {
        name: `Customer story layout preview ${index}`,
      }),
    ).toBeVisible();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByText("Customer name — pending").parentElement).toBe(
      persistentCopy,
    );
    expect(
      Array.from(container.querySelectorAll("[data-photo-index] img")),
    ).toEqual(persistentPhotos);
  }
  expect(screen.getByText("Photo slot — replace")).toBeVisible();
});
it("prefers supplied CMS stories even when layout fallback is enabled", () => {
  render(
    <BaselineCustomerStories
      testimonials={[story]}
      heading="Approved heading"
      previewFallback
    />,
  );
  expect(
    screen.getByRole("heading", { name: "Approved heading" }),
  ).toBeVisible();
  expect(screen.getByText("Approved Person")).toBeVisible();
  expect(
    screen.queryByText("Layout preview — customer content pending"),
  ).toBeNull();
});
it("keeps the five-card deck manual and supports directional and endpoint keys", () => {
  const { container } = render(
    <BaselineCustomerStories
      testimonials={[]}
      heading="Stories"
      previewFallback
    />,
  );
  const controls = screen.getByRole("group", {
    name: "Choose a customer story layout preview",
  });
  expect(
    container.querySelector('[data-motion="shared-layout"]'),
  ).not.toBeNull();
  fireEvent.keyDown(controls, { key: "ArrowLeft" });
  expect(
    screen.getByRole("button", { name: "Customer story layout 5" }),
  ).toHaveFocus();
  fireEvent.keyDown(controls, { key: "ArrowRight" });
  expect(
    screen.getByRole("button", { name: "Customer story layout 1" }),
  ).toHaveFocus();
  fireEvent.keyDown(controls, { key: "End" });
  expect(
    screen.getByRole("button", { name: "Customer story layout 5" }),
  ).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(controls, { key: "Home" });
  expect(
    screen.getByRole("button", { name: "Customer story layout 1" }),
  ).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(
    screen.getByRole("button", { name: "Show layout preview 2" }),
  );
  expect(
    screen.getByRole("button", { name: "Customer story layout 2" }),
  ).toHaveAttribute("aria-pressed", "true");
});
it("disables shared-layout motion while retaining all controls for reduced motion", () => {
  motionPreference.reduced = true;
  const { container } = render(
    <BaselineCustomerStories
      testimonials={[]}
      heading="Stories"
      previewFallback
    />,
  );
  expect(container.querySelector('[data-motion="reduced"]')).not.toBeNull();
  fireEvent.click(
    screen.getByRole("button", { name: "Customer story layout 3" }),
  );
  expect(
    screen.getByRole("article", { name: "Customer story layout preview 3" }),
  ).toBeVisible();
  expect(screen.getByText("Reference photo — replace")).toBeVisible();
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
    "Bring your teamand AI together.",
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
