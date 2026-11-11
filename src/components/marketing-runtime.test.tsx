import { describe, expect, it } from "vitest";
import { marketingRuntimeSource } from "./marketing-runtime";

describe("marketing runtime attribution", () => {
  it("passes Google click ids through and does not define a sign_up event", () => {
    const source = marketingRuntimeSource();
    expect(source).toContain("gclid");
    expect(source).toContain("gbraid");
    expect(source).toContain("wbraid");
    expect(source).toContain("https://app.innflow.ai");
    expect(source).not.toContain("sign_up");
  });
});
