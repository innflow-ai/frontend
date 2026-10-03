import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { BaselaneUpdates } from "./baselane-updates";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("copies the public product updates URL rather than the browser address", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  render(<BaselaneUpdates />);
  fireEvent.click(screen.getByRole("button", { name: "Copy page link" }));
  expect(await screen.findByText("Link copied")).toBeVisible();
  expect(writeText).toHaveBeenCalledWith(
    `${siteConfig.marketingOrigin.replace(/\/$/, "")}/product-updates`,
  );
});

it("explains clipboard failure without claiming success", async () => {
  vi.stubGlobal("navigator", {
    clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
  });
  render(<BaselaneUpdates />);
  fireEvent.click(screen.getByRole("button", { name: "Copy page link" }));
  expect(
    await screen.findByText(
      "Copy the address from your browser to share this page.",
    ),
  ).toBeVisible();
  expect(screen.queryByText("Link copied")).toBeNull();
});
