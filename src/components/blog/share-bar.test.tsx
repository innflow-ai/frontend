import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BlogShareBar } from "./share-bar";

describe("BlogShareBar", () => {
  afterEach(() => cleanup());

  it("renders native, Facebook, X, and LinkedIn share actions", () => {
    render(
      <BlogShareBar
        url="https://innflow.ai/blog/example"
        title="Example post"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Share this post" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Share on Facebook" }),
    ).toHaveAttribute("href", expect.stringContaining("facebook.com/sharer"));
    expect(screen.getByRole("link", { name: "Share on X" })).toHaveAttribute(
      "href",
      expect.stringContaining("twitter.com/intent/tweet"),
    );
    expect(
      screen.getByRole("link", { name: "Share on LinkedIn" }),
    ).toHaveAttribute("href", expect.stringContaining("linkedin.com/sharing"));
  });
});
