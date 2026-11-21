import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BlogListenPlayer } from "./listen-player";

describe("BlogListenPlayer", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("pauses the recorded audio element when leaving the article", () => {
    const pause = vi
      .spyOn(HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => {});
    const { unmount } = render(
      <BlogListenPlayer text="Article transcript" audioUrl="/example.mp3" />,
    );
    unmount();
    expect(pause).toHaveBeenCalledOnce();
  });

  it("recovers from rejected playback and preserves recorded duration at different speeds", async () => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValue(
      new Error("Blocked"),
    );
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    const user = userEvent.setup();
    const { container } = render(
      <BlogListenPlayer text="Short transcript" audioUrl="/example.mp3" />,
    );
    const audio = container.querySelector("audio");
    if (!audio) throw new Error("Expected recorded article audio element");
    Object.defineProperty(audio, "duration", {
      configurable: true,
      value: 120,
    });
    fireEvent.loadedMetadata(audio);
    expect(screen.getByText("0:00 / 2:00")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Playback speed 1x" }));
    expect(screen.getByText("0:00 / 2:00")).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Play article audio" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Audio could not play",
    );
    expect(
      screen.getByRole("button", { name: "Play article audio" }),
    ).toBeVisible();
    fireEvent.play(audio);
    expect(screen.queryByRole("status")).toBeNull();
    expect(
      screen.getByRole("button", { name: "Pause article audio" }),
    ).toBeVisible();
    fireEvent.error(audio);
    expect(
      screen.getByRole("button", { name: "Play article audio" }),
    ).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Audio could not load",
    );
    fireEvent.play(audio);
    expect(screen.queryByRole("status")).toBeNull();
    fireEvent.pause(audio);
    expect(
      screen.getByRole("button", { name: "Play article audio" }),
    ).toBeVisible();
  });

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

  it("explains when browser narration is unavailable", async () => {
    vi.stubGlobal("speechSynthesis", undefined);
    vi.stubGlobal("SpeechSynthesisUtterance", undefined);
    const user = userEvent.setup();
    render(<BlogListenPlayer text="An article to read." />);
    await user.click(
      screen.getByRole("button", { name: "Play article audio" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Narration is unavailable in this browser",
    );
    expect(
      screen.getByRole("button", { name: "Play article audio" }),
    ).toBeEnabled();
  });
});
