import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CollaborationSection } from "./collaboration-section";

let intersection: IntersectionObserverCallback;
const scrollIntoView = vi.fn();
const disconnect = vi.fn();

beforeEach(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect = disconnect;
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersection = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  Element.prototype.scrollIntoView = scrollIntoView;
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("collaboration platform navigation", () => {
  it("moves to the requested platform without smooth motion when reduced motion is enabled", () => {
    render(
      <CollaborationSection
        demos={["Slack demo", "Teams demo", "Email demo", "Messages demo"]}
      />,
    );
    const globalAnchorScroll = vi.fn();
    document.addEventListener("click", globalAnchorScroll);
    fireEvent.click(screen.getByRole("link", { name: "Email" }));
    document.removeEventListener("click", globalAnchorScroll);
    expect(globalAnchorScroll).not.toHaveBeenCalled();
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "instant",
      block: "start",
    });
    expect(scrollIntoView.mock.instances[0]).toBe(
      document.getElementById("collaboration-email"),
    );
    expect(screen.getByRole("link", { name: /^Email/ })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("keeps the active platform in sync with reading position and disconnects observers on unmount", () => {
    const { unmount } = render(
      <CollaborationSection demos={["Slack", "Teams", "Email", "Messages"]} />,
    );
    const target = document.getElementById("collaboration-messages");
    if (!target) throw new Error("Messages demo is missing");
    act(() =>
      intersection(
        [
          {
            isIntersecting: true,
            target,
            boundingClientRect: target.getBoundingClientRect(),
            intersectionRatio: 1,
            intersectionRect: target.getBoundingClientRect(),
            rootBounds: null,
            time: 0,
          },
        ],
        {} as IntersectionObserver,
      ),
    );
    expect(screen.getByRole("link", { name: "iMessage" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Slack" })).not.toHaveAttribute(
      "aria-current",
    );
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(2);
  });
});
