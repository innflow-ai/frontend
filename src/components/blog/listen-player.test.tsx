import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BlogListenPlayer } from "./listen-player";

describe("BlogListenPlayer", () => {
  afterEach(() => cleanup());

  it("speaks the article text and cycles playback speed", async () => {
    const speak = vi.fn();
    const cancel = vi.fn();
    class FakeUtterance {
      text = "";
      rate = 1;
      onend: (() => void) | null = null;
      onerror: (() => void) | null = null;
      onboundary:
        | ((event: { name: string; charIndex: number }) => void)
        | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    vi.stubGlobal("SpeechSynthesisUtterance", FakeUtterance);
    vi.stubGlobal("speechSynthesis", {
      speak,
      cancel,
      pause: vi.fn(),
      resume: vi.fn(),
      paused: false,
    });

    const user = userEvent.setup();
    render(
      <BlogListenPlayer text="Property operations get quieter with Innflow." />,
    );

    await user.click(
      screen.getByRole("button", { name: "Play article audio" }),
    );
    expect(speak).toHaveBeenCalledOnce();

    await user.click(screen.getByRole("button", { name: "Playback speed 1x" }));
    expect(
      screen.getByRole("button", { name: "Playback speed 1.5x" }),
    ).toBeInTheDocument();
  });
});
