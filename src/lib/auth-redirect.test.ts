import { describe, expect, it } from "vitest";
import {
  isMarketingHostname,
  resolveAuthenticatedRedirect,
} from "@/lib/auth-redirect";

const appOrigin = "https://app.innflow.ai";

describe("isMarketingHostname", () => {
  it("allows the canonical and www marketing hosts", () => {
    expect(isMarketingHostname("innflow.ai", "https://innflow.ai")).toBe(true);
    expect(isMarketingHostname("www.innflow.ai", "https://innflow.ai")).toBe(
      true,
    );
  });

  it("does not run on local or preview hosts", () => {
    expect(isMarketingHostname("localhost", "https://innflow.ai")).toBe(false);
    expect(
      isMarketingHostname("innflow-preview.vercel.app", "https://innflow.ai"),
    ).toBe(false);
  });
});

describe("resolveAuthenticatedRedirect", () => {
  it("accepts authenticated redirects within the Innflow app", () => {
    expect(
      resolveAuthenticatedRedirect(
        { authenticated: true, redirectTo: "/dashboard" },
        appOrigin,
      ),
    ).toBe("https://app.innflow.ai/dashboard");
  });

  it("rejects unauthenticated, malformed, and external redirects", () => {
    expect(
      resolveAuthenticatedRedirect(
        { authenticated: false, redirectTo: "/dashboard" },
        appOrigin,
      ),
    ).toBeNull();
    expect(
      resolveAuthenticatedRedirect(
        { authenticated: true, redirectTo: null },
        appOrigin,
      ),
    ).toBeNull();
    expect(
      resolveAuthenticatedRedirect(
        { authenticated: true, redirectTo: "https://example.com/phishing" },
        appOrigin,
      ),
    ).toBeNull();
  });
});
