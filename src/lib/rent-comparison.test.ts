import { describe, expect, it } from "vitest";
import { summarizeRents } from "./rent-comparison";

describe("comparable rent summaries", () => {
  it("summarizes an unsorted sample and interpolates quartiles", () => {
    expect(summarizeRents("2400, 1200, 1800, 1600")).toEqual({
      count: 4,
      min: 1200,
      max: 2400,
      median: 1700,
      average: 1750,
      lower: 1500,
      upper: 1950,
    });
  });
  it("accepts newline-separated decimal rents and repeated values", () => {
    expect(summarizeRents("1500.50\n1500.50\n1500.50").median).toBe(1500.5);
  });
  it.each([
    "",
    "1000, 2000",
    "1000, 2000, invalid",
    "0, 1000, 2000",
    "-1, 1000, 2000",
    "Infinity, 1000, 2000",
    Array(101).fill("1000").join(","),
  ])("rejects invalid or insufficient samples: %s", (input) => {
    expect(() => summarizeRents(input)).toThrow();
  });
});
