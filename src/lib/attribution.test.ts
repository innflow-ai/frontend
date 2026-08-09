import { describe, expect, it } from "vitest";
import { appendAttribution, collectAttribution } from "@/lib/attribution";

describe("appendAttribution", () => {
  it("carries supported campaign parameters to an outbound link", () => {
    const result = appendAttribution(
      "https://app.innflow.ai/signup",
      new URLSearchParams(
        "utm_source=search&utm_campaign=property-ops&gclid=abc123",
      ),
    );

    expect(result).toBe(
      "https://app.innflow.ai/signup?utm_source=search&utm_campaign=property-ops&gclid=abc123",
    );
  });

  it("preserves destination attribution instead of overwriting it", () => {
    const result = appendAttribution(
      "https://app.innflow.ai/signup?utm_source=partner",
      new URLSearchParams("utm_source=search&utm_medium=paid"),
    );

    expect(result).toBe(
      "https://app.innflow.ai/signup?utm_source=partner&utm_medium=paid",
    );
  });

  it("supports the provisional mailto demo destination", () => {
    const result = appendAttribution(
      "mailto:support@innflow.ai?subject=Property%20operations%20demo",
      new URLSearchParams("utm_source=homepage"),
    );

    expect(result).toContain("mailto:support@innflow.ai");
    expect(result).toContain("utm_source=homepage");
  });

  it("keeps relative destinations relative", () => {
    expect(
      appendAttribution(
        "/demo#scope",
        new URLSearchParams("utm_source=homepage"),
      ),
    ).toBe("/demo?utm_source=homepage#scope");
  });

  it("reuses the original landing page and referrer across navigation", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    };

    collectAttribution(
      new URLSearchParams("utm_source=search"),
      "/?utm_source=search",
      "https://example.com/",
      storage,
    );
    const secondPage = collectAttribution(
      new URLSearchParams(),
      "/features/workflows",
      "",
      storage,
    );

    expect(secondPage.get("landing_page")).toBe("/?utm_source=search");
    expect(secondPage.get("referrer")).toBe("https://example.com/");
    expect(secondPage.get("utm_source")).toBe("search");
  });
});
