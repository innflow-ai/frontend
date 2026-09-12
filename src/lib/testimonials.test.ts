import { afterEach, describe, expect, it, vi } from "vitest";

const { fetch } = vi.hoisted(() => ({ fetch: vi.fn() }));
vi.mock("@/lib/sanity", () => ({
  sanityClient: { fetch },
  coverImageUrl: vi.fn(),
}));
vi.mock("react", () => ({ cache: (fn: unknown) => fn }));

import { getPageTestimonials } from "./testimonials";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});
describe("testimonial draft preview", () => {
  it("always reads published content in production, even with the preview flag", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SANITY_TESTIMONIAL_PREVIEW", "true");
    fetch.mockResolvedValue(null);
    await getPageTestimonials("/rent-collection");
    expect(fetch.mock.calls[0][2].perspective).toBe("published");
  });
  it("requires an explicit opt-in for development drafts", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("SANITY_TESTIMONIAL_PREVIEW", "false");
    fetch.mockResolvedValue(null);
    await getPageTestimonials("/rent-collection");
    expect(fetch.mock.calls[0][2].perspective).toBe("published");
  });
  it("reads draft selections when the development preview is opted in", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("SANITY_TESTIMONIAL_PREVIEW", "true");
    fetch.mockResolvedValue({
      heading: "In their own words.",
      testimonials: [],
    });
    const selection = await getPageTestimonials("/rent-collection");
    expect(fetch.mock.calls[0][2].perspective).toBe("drafts");
    expect(selection.heading).toBe("In their own words.");
    expect(selection).not.toHaveProperty("previewNote");
  });
});
