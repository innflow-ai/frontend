import { beforeEach, describe, expect, it, vi } from "vitest";

const { fetchMock } = vi.hoisted(() => ({ fetchMock: vi.fn() }));
vi.mock("./sanity", () => ({ sanityClient: { fetch: fetchMock } }));
vi.mock("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));

import { getPageFaqs } from "./faqs";

describe("page FAQ loading", () => {
  beforeEach(() => vi.clearAllMocks());
  it("requests only published content for the exact normalized page path", async () => {
    fetchMock.mockResolvedValue({
      faqSets: [{ faqs: [{ _id: "a", question: "Shared?", answer: "Yes" }] }],
    });
    expect((await getPageFaqs("/rapid-rent/")).items).toEqual([
      { id: "a", question: "Shared?", answer: "Yes" },
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      { path: "/rapid-rent" },
      { perspective: "published", useCdn: false },
    );
  });
  it("uses fallback during a CMS outage", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockRejectedValue(new Error("offline"));
    const fallback = [{ question: "Existing?", answer: "Still here" }];
    expect((await getPageFaqs("/faq", fallback)).items).toEqual(fallback);
    log.mockRestore();
  });
});
