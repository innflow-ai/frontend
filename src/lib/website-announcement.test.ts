import { beforeEach, expect, it, vi } from "vitest";

const { fetchMock } = vi.hoisted(() => ({ fetchMock: vi.fn() }));
vi.mock("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));
vi.mock("./sanity", () => ({ sanityClient: { fetch: fetchMock } }));

import { getWebsiteAnnouncement } from "./website-announcement";

beforeEach(() => vi.clearAllMocks());
it("reads and normalizes the singleton", async () => {
  fetchMock.mockResolvedValue({
    enabled: true,
    id: "release",
    modelRelease: {
      id: "v1",
      name: "Model",
      iconSrc: "https://cdn.sanity.io/images/icon.png",
    },
  });
  expect((await getWebsiteAnnouncement())?.modelRelease?.name).toBe("Model");
  expect(fetchMock.mock.calls[0][0]).toContain('_id == "website-announcement"');
});
it("fails closed when Sanity is unavailable", async () => {
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  fetchMock.mockRejectedValue(new Error("offline"));
  expect(await getWebsiteAnnouncement()).toBeNull();
  log.mockRestore();
});
it("does not display disabled content", async () => {
  fetchMock.mockResolvedValue({ enabled: false, id: "release" });
  expect(await getWebsiteAnnouncement()).toBeNull();
});
