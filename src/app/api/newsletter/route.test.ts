// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const fetchMock = vi.fn();
const request = (
  email = " Person@Example.com ",
  origin = "https://innflow.ai",
) =>
  new Request("https://innflow.ai/api/newsletter", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-only-key");
  vi.stubEnv("RESEND_NEWSLETTER_SEGMENT_ID", "newsletter-segment");
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe("footer subscription", () => {
  it("rejects invalid email and foreign origins before contacting Resend", async () => {
    expect((await POST(request("invalid"))).status).toBe(400);
    expect(
      (await POST(request("a@example.com", "https://other.example"))).status,
    ).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not claim success when configuration is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect((await POST(request())).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("creates normalized contacts in the configured segment", async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 404 }));
    fetchMock.mockResolvedValueOnce(Response.json({ id: "contact" }));
    expect((await POST(request())).status).toBe(200);
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({
      email: "person@example.com",
      unsubscribed: false,
      segments: [{ id: "newsletter-segment" }],
    });
  });

  it("adds existing subscribers without creating duplicate contacts", async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json({ id: "contact", unsubscribed: false }),
    );
    fetchMock.mockResolvedValueOnce(
      Response.json({ id: "newsletter-segment" }),
    );
    expect((await POST(request())).status).toBe(200);
    expect(fetchMock.mock.calls[1][0]).toBe(
      "https://api.resend.com/contacts/person%40example.com/segments/newsletter-segment",
    );
  });

  it("preserves an existing global unsubscribe", async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ unsubscribed: true }));
    expect((await POST(request())).status).toBe(409);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("does not return success or leak provider details on failure", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response("provider-private-error", { status: 401 }),
    );
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("provider-private-error");
  });
});
