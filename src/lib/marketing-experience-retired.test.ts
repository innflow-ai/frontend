// @vitest-environment node

import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/marketing-experience/route";
import { proxy } from "@/proxy";
import {
  ATTRIBUTION_COOKIE,
  CONSENT_COOKIE,
  EXPERIENCE_COOKIE,
  EXPERIENCE_HEADER,
  EXPERIENCE_KEY,
  MEASURE_HEADER,
} from "./marketing-experience";
import { signExperience } from "./marketing-experience-signing";

const secret = "test-secret-for-experience-at-least-32-characters";
afterEach(() => vi.unstubAllEnvs());

describe("retired layout experiment", () => {
  it.each(["off", "experiment", "control", "new"])(
    "ignores old cookies, preview URLs and forged headers in mode %s",
    (mode) => {
      vi.stubEnv("MARKETING_EXPERIENCE_MODE", mode);
      vi.stubEnv("MARKETING_EXPERIENCE_SECRET", secret);
      vi.stubEnv("NODE_ENV", "development");
      const cookie = signExperience(
        {
          key: EXPERIENCE_KEY,
          variant: "control",
          issuedAt: Date.now(),
          qa: true,
        },
        secret,
      );
      const response = proxy(
        new NextRequest("https://innflow.ai/?experience=control", {
          headers: {
            cookie: `${EXPERIENCE_COOKIE}=${cookie}`,
            [EXPERIENCE_HEADER]: "control",
            [MEASURE_HEADER]: "1",
          },
        }),
      );
      expect(
        response.headers.get(`x-middleware-request-${EXPERIENCE_HEADER}`),
      ).toBeNull();
      expect(
        response.headers.get(`x-middleware-request-${MEASURE_HEADER}`),
      ).toBeNull();
      expect(response.cookies.getAll()).toHaveLength(0);
      expect(response.headers.get("Cache-Control")).toBeNull();
    },
  );

  it("keeps legacy aliases canonical while disabled", () => {
    const response = proxy(
      new NextRequest("https://innflow.ai/BL/BL-pricing?utm_source=test"),
    );
    expect(response.headers.get("location")).toBe(
      "https://innflow.ai/pricing?utm_source=test",
    );
  });

  it("clears old attribution instead of issuing a new handoff", async () => {
    vi.stubEnv("MARKETING_EXPERIENCE_MODE", "experiment");
    const response = await POST(
      new NextRequest("https://innflow.ai/api/marketing-experience", {
        method: "POST",
        headers: {
          origin: "https://innflow.ai",
          cookie: `${CONSENT_COOKIE}=granted; ${ATTRIBUTION_COOKIE}=old-attribution`,
        },
        body: JSON.stringify({ distinctId: "anonymous-123" }),
      }),
    );
    expect(response.cookies.get(ATTRIBUTION_COOKIE)?.maxAge).toBe(0);
  });
});
