import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { BaselanePartners } from "./baselane-partners";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("provides responsive image candidates for the partner page photos", () => {
  const { container } = render(<BaselanePartners />);
  const photos = [...container.querySelectorAll("img")].filter((image) =>
    image.getAttribute("src")?.includes("partners"),
  );
  expect(photos).toHaveLength(5);
  for (const image of photos) {
    expect(image.sizes).toContain("(max-width: 700px)");
    expect(image.srcset).toMatch(/\d+w/);
  }
});

it("copies the public URL from the referral action", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  render(<BaselanePartners referral />);
  const buttons = screen.getAllByRole("button", { name: "Copy link to share" });
  expect(buttons).toHaveLength(1);
  for (const button of buttons) fireEvent.click(button);
  await waitFor(() =>
    expect(screen.getByRole("status")).toHaveTextContent("Link copied."),
  );
  expect(writeText).toHaveBeenCalledTimes(1);
  expect(writeText).toHaveBeenCalledWith(
    `${siteConfig.marketingOrigin.replace(/\/$/, "")}/`,
  );
});

it.each(["denied", "unavailable"])(
  "selects the fallback URL when clipboard access is %s",
  async (state) => {
    vi.stubGlobal(
      "navigator",
      state === "denied"
        ? {
            clipboard: {
              writeText: vi.fn().mockRejectedValue(new Error("Denied")),
            },
          }
        : {},
    );
    render(<BaselanePartners referral />);
    const buttons = screen.getAllByRole("button", {
      name: "Copy link to share",
    });
    fireEvent.click(buttons[buttons.length - 1]);
    const input = screen.getByRole("textbox", {
      name: "Public page link",
    }) as HTMLInputElement;
    await waitFor(() => expect(input).toHaveFocus());
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Copy the selected public page link",
    );
    expect(input).toHaveAttribute("readonly");
  },
);
