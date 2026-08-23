import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { parseBodyMock, revalidatePathMock } = vi.hoisted(() => ({
  parseBodyMock: vi.fn(),
  revalidatePathMock: vi.fn(),
}));

vi.mock("next/cache", () => ({ revalidatePath: revalidatePathMock }));
vi.mock("next-sanity/webhook", () => ({ parseBody: parseBodyMock }));

import { POST } from "./route";

describe("Sanity revalidation webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SANITY_REVALIDATE_SECRET = "test-secret";
  });

  it("rejects requests with invalid signatures", async () => {
    parseBodyMock.mockResolvedValue({
      body: { _type: "post" },
      isValidSignature: false,
    });

    const response = await POST(
      new NextRequest("https://innflow.ai/api/revalidate/sanity", {
        method: "POST",
      }),
    );

    expect(response.status).toBe(401);
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("revalidates the blog index and all post pages", async () => {
    parseBodyMock.mockResolvedValue({
      body: { _type: "post" },
      isValidSignature: true,
    });

    const response = await POST(
      new NextRequest("https://innflow.ai/api/revalidate/sanity", {
        method: "POST",
      }),
    );

    expect(response.status).toBe(200);
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, "/blog");
    expect(revalidatePathMock).toHaveBeenNthCalledWith(
      2,
      "/blog/[slug]",
      "page",
    );
  });

  it("revalidates a product page and discovery routes", async () => {
    parseBodyMock.mockResolvedValue({
      body: { _type: "productPage", slug: { current: "databases" } },
      isValidSignature: true,
    });

    const response = await POST(
      new NextRequest("https://innflow.ai/api/revalidate/sanity", {
        method: "POST",
      }),
    );

    expect(response.status).toBe(200);
    expect(revalidatePathMock).toHaveBeenNthCalledWith(
      1,
      "/products/databases",
    );
    expect(revalidatePathMock).toHaveBeenNthCalledWith(
      2,
      "/products/[slug]",
      "page",
    );
    expect(revalidatePathMock).toHaveBeenNthCalledWith(3, "/sitemap.xml");
  });

  it("rejects unsupported document types", async () => {
    parseBodyMock.mockResolvedValue({
      body: { _type: "author" },
      isValidSignature: true,
    });

    const response = await POST(
      new NextRequest("https://innflow.ai/api/revalidate/sanity", {
        method: "POST",
      }),
    );

    expect(response.status).toBe(400);
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
