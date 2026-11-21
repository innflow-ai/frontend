import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ListingHeroArtwork } from "./listing-hero-artwork";

afterEach(cleanup);

it("renders all four layers of the dedicated listing hero", () => {
  const { container } = render(<ListingHeroArtwork />);
  const images = [...container.querySelectorAll("img")];
  expect(images).toHaveLength(4);
  for (const asset of [
    "porch-bordered.png",
    "listing-channels.svg",
    "couple.png",
    "unit-status.svg",
  ]) {
    expect(
      images.some((image) =>
        decodeURIComponent(image.getAttribute("src") ?? "").includes(asset),
      ),
    ).toBe(true);
  }
  for (const image of images) expect(image).toHaveAttribute("alt", "");
});
