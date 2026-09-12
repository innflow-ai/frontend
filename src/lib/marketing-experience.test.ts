// @vitest-environment node

import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { proxy } from "@/proxy";
import {
  EXPERIENCE_COOKIE,
  EXPERIENCE_HEADER,
  EXPERIENCE_KEY,
  MAX_AGE,
  MEASURE_HEADER,
  publicExperiencePath,
} from "./marketing-experience";
import { readExperience, signExperience } from "./marketing-experience-signing";

const secret = "test-secret-for-experience-at-least-32-characters";
const assignment = (variant: "control" | "new" = "new") => ({
  key: EXPERIENCE_KEY as typeof EXPERIENCE_KEY,
  variant,
  issuedAt: Date.now(),
  qa: false,
});
function request(
  path = "/",
  cookie?: string,
  headers: Record<string, string | undefined> = {},
) {
  return new NextRequest(`https://innflow.ai${path}`, {
    headers: {
      ...Object.fromEntries(
        Object.entries(headers).filter(
          (entry): entry is [string, string] => entry[1] !== undefined,
        ),
      ),
      ...(cookie ? { cookie: `${EXPERIENCE_COOKIE}=${cookie}` } : {}),
    },
  });
}
function selected(response: ReturnType<typeof proxy>) {
  return response.headers.get(`x-middleware-request-${EXPERIENCE_HEADER}`);
}
afterEach(() => vi.unstubAllEnvs());

describe("signed experience routing", () => {
  it("preserves the current site while off and strips forged headers", () => {
    vi.stubEnv("MARKETING_EXPERIENCE_MODE", "off");
    const result = proxy(
      request("/", undefined, {
        [EXPERIENCE_HEADER]: "new",
        [MEASURE_HEADER]: "1",
      }),
    );
    expect(selected(result)).toBeNull();
    expect(result.cookies.getAll()).toHaveLength(0);
  });
  it("assigns on any first page and keeps that signed assignment across pages", () => {
    vi.stubEnv("MARKETING_EXPERIENCE_MODE", "experiment");
    vi.stubEnv("MARKETING_EXPERIENCE_SECRET", secret);
    const first = proxy(request("/pricing"));
    const cookie = first.cookies.get(EXPERIENCE_COOKIE)?.value;
    expect(cookie).toBeTruthy();
    expect(["control", "new"]).toContain(selected(first));
    expect(selected(proxy(request("/blog", cookie)))).toBe(selected(first));
    expect(first.headers.get("Cache-Control")).toContain("no-store");
  });
  it("forces rollback even for an existing new assignment", () => {
    vi.stubEnv("MARKETING_EXPERIENCE_MODE", "control");
    vi.stubEnv("MARKETING_EXPERIENCE_SECRET", secret);
    const result = proxy(request("/", signExperience(assignment(), secret)));
    expect(selected(result)).toBe("control");
    expect(result.headers.get(`x-middleware-request-${MEASURE_HEADER}`)).toBe(
      "0",
    );
  });
  it("canonicalizes aliases without dropping attribution or anchors", () => {
    vi.stubEnv("MARKETING_EXPERIENCE_MODE", "new");
    expect(
      proxy(request("/BL/BL-pricing?utm_source=test#plans")).headers.get(
        "location",
      ),
    ).toBe("https://innflow.ai/pricing?utm_source=test#plans");
    expect(publicExperiencePath("/BL/BL-privacy-policy")).toBe(
      "/legal/privacy-policy",
    );
    expect(publicExperiencePath("/BL/BL-connections")).toBe(
      "/BL/BL-connections",
    );
  });
  it("does not enroll prefetches, bots, or staff", () => {
    vi.stubEnv("MARKETING_EXPERIENCE_MODE", "experiment");
    vi.stubEnv("MARKETING_EXPERIENCE_SECRET", secret);
    for (const headers of [
      { "next-router-prefetch": "1" },
      { "user-agent": "Googlebot" },
      { cookie: "innflow-experiment-exclude=1" },
    ]) {
      const result = proxy(request("/", undefined, headers));
      expect(result.cookies.getAll()).toHaveLength(0);
      expect(result.headers.get(`x-middleware-request-${MEASURE_HEADER}`)).toBe(
        "0",
      );
    }
  });
  it("rejects changed, expired, future-dated, and wrong-version cookies", () => {
    const value = assignment();
    const signed = signExperience(value, secret);
    expect(readExperience(signed, secret)?.variant).toBe("new");
    expect(readExperience(`${signed}x`, secret)).toBeNull();
    expect(
      readExperience(signed, secret, value.issuedAt + MAX_AGE * 1000 + 1),
    ).toBeNull();
    expect(readExperience(signed, secret, value.issuedAt - 1)).toBeNull();
    expect(readExperience(signed, "wrong")).toBeNull();
  });
  it("fails safely without a secret and ignores production preview parameters", () => {
    vi.stubEnv("MARKETING_EXPERIENCE_MODE", "experiment");
    vi.stubEnv("MARKETING_EXPERIENCE_SECRET", "");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL_ENV", "production");
    const result = proxy(request("/?experience=new"));
    expect(selected(result)).toBe("control");
    expect(result.cookies.getAll()).toHaveLength(0);
    expect(result.headers.get(`x-middleware-request-${MEASURE_HEADER}`)).toBe(
      "0",
    );
  });
});
