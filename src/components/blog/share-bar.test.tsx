import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BlogShareBar } from "./share-bar";

describe("BlogShareBar", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("confirms clipboard success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(
      <BlogShareBar url="https://innflow.ai/blog/example" title="Example" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Share this post" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Link copied.");
    expect(writeText).toHaveBeenCalledWith("https://innflow.ai/blog/example");
  });

  it("offers a manual link when both sharing and copying fail", async () => {
    vi.stubGlobal("navigator", {
      share: vi.fn().mockRejectedValue(new Error("Unavailable")),
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
    });
    render(
      <BlogShareBar url="https://innflow.ai/blog/example" title="Example" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Share this post" }));
    expect(
      await screen.findByRole("textbox", { name: "Post link" }),
    ).toHaveValue("https://innflow.ai/blog/example");
  });

  it("does not copy after the user cancels native sharing", async () => {
    const writeText = vi.fn();
    const canceled = new DOMException("Canceled", "AbortError");
    const share = vi.fn().mockRejectedValue(canceled);
    vi.stubGlobal("navigator", { share, clipboard: { writeText } });
    render(
      <BlogShareBar url="https://innflow.ai/blog/example" title="Example" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Share this post" }));
    await Promise.resolve();
    expect(writeText).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).toBeNull();
  });

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
