// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { POST } from "./route";

const fetchMock = vi.fn();

const request = (
  email = " Person@Example.com ",
  origin = "https://innflow.ai",
) =>
  new Request("https://innflow.ai/api/email-capture", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

afterEach(() => {
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

it("rejects an invalid email and does not store it", async () => {
  vi.stubGlobal("fetch", fetchMock);
  expect((await POST(request("not-an-email"))).status).toBe(400);
  expect(fetchMock).not.toHaveBeenCalled();
});

it("accepts a valid email without calling a destination", async () => {
  vi.stubGlobal("fetch", fetchMock);
  const response = await POST(request());
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ success: true, stored: false });
  expect(fetchMock).not.toHaveBeenCalled();
});
