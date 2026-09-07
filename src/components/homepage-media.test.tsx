import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { GlassMediaFrame, HomepageMedia } from "./homepage-media";

afterEach(cleanup);

describe("homepage media", () => {
  it("shows product previews until recordings are ready and supports keyboard selection", async () => {
    const user = userEvent.setup();
    const { container } = render(<HomepageMedia interactive />);
    expect(
      screen.getByRole("region", {
        name: "Illustrative Innflow workflows preview",
      }),
    ).toBeVisible();
    const assistant = screen.getByRole("button", { name: "Assistant" });
    assistant.focus();
    await user.keyboard("{Enter}");
    expect(assistant).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Workflows" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(container.querySelector("video")).toBeNull();
    expect(
      screen.getByRole("region", {
        name: "Illustrative Innflow assistant preview",
      }),
    ).toBeVisible();
    expect(
      screen.queryByRole("region", {
        name: "Illustrative Innflow workflows preview",
      }),
    ).not.toBeInTheDocument();
  });

  it("adds controlled playback only when a recording is supplied", () => {
    const { container, rerender } = render(
      <GlassMediaFrame
        label="Workflow recording"
        src="/product/example.mp4"
        poster="/product/poster.webp"
        captions="/product/example.vtt"
      />,
    );
    const video = screen.getByLabelText("Workflow recording");
    expect(video).toHaveAttribute("controls");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("poster", "/product/poster.webp");
    expect(container.querySelector("track")).toHaveAttribute(
      "src",
      "/product/example.vtt",
    );
    rerender(<GlassMediaFrame label="Workflow recording" />);
    expect(container.querySelector("video")).toBeNull();
  });
});
