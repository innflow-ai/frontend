// @vitest-environment node

import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ATTRIBUTION_COOKIE,
  CONSENT_COOKIE,
  EXPERIENCE_COOKIE,
  EXPERIENCE_KEY,
} from "@/lib/marketing-experience";
import {
  readAttribution,
  signExperience,
} from "@/lib/marketing-experience-signing";
import { POST } from "./route";

const secret = "test-secret-for-experience-at-least-32-characters";
afterEach(() => vi.unstubAllEnvs());

describe("consented signup handoff", () => {
  it("issues a signed shared cookie only for a consented real assignment", async () => {
    vi.stubEnv("MARKETING_EXPERIENCE_MODE", "experiment");
    vi.stubEnv("MARKETING_EXPERIENCE_SECRET", secret);
    const assignment = {
      key: EXPERIENCE_KEY as typeof EXPERIENCE_KEY,
      variant: "new" as const,
      issuedAt: Date.now(),
      qa: false,
    };
    const request = new NextRequest(
      "https://innflow.ai/api/marketing-experience",
      {
        method: "POST",
        headers: {
          origin: "https://innflow.ai",
          cookie: `${CONSENT_COOKIE}=granted; ${EXPERIENCE_COOKIE}=${signExperience(assignment, secret)}`,
        },
        body: JSON.stringify({ distinctId: "anonymous-123" }),
      },
    );
    const response = await POST(request);
    const cookie = response.cookies.get(ATTRIBUTION_COOKIE);
    expect(cookie?.domain).toBe(".innflow.ai");
    expect(cookie?.httpOnly).toBe(true);
    expect(readAttribution(cookie?.value, secret)?.distinctId).toBe(
      "anonymous-123",
    );
  });
  it("deletes attribution after withdrawal and rejects cross-origin requests", async () => {
    const request = (origin: string) =>
      new NextRequest("https://innflow.ai/api/marketing-experience", {
        method: "POST",
        headers: { origin },
      });
    expect((await POST(request("https://evil.test"))).status).toBe(403);
    expect(
      (await POST(request("https://innflow.ai"))).cookies.get(
        ATTRIBUTION_COOKIE,
      )?.maxAge,
    ).toBe(0);
  });
});
