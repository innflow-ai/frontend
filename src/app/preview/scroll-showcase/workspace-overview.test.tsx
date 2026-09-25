import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WorkspaceOverview, workspaceCards } from "./workspace-overview";

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    sizes: _sizes,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    // biome-ignore lint/performance/noImgElement: Test double for next/image.
    <img {...props} alt={props.alt ?? ""} />
  ),
}));

let tablet = false;
let mediaListeners: Set<() => void>;
beforeEach(() => {
  tablet = false;
  mediaListeners = new Set();
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: tablet,
      addEventListener: (_event: string, listener: () => void) =>
        mediaListeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) =>
        mediaListeners.delete(listener),
    })),
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Workspace overview", () => {
  it("shows static headings and every detail on tablet, then restores the active card on exit", () => {
    render(<WorkspaceOverview />);
    fireEvent.click(screen.getByRole("button", { name: "Train" }));
    act(() => {
      tablet = true;
      for (const notify of mediaListeners) notify();
    });
    for (const card of workspaceCards) {
      expect(screen.getByRole("heading", { name: card.title })).toBeVisible();
      expect(
        screen.queryByRole("button", { name: card.title }),
      ).not.toBeInTheDocument();
      expect(
        document.getElementById(`workspace-${card.id}-details`),
      ).toHaveAttribute("aria-hidden", "false");
    }
    act(() => {
      tablet = false;
      for (const notify of mediaListeners) notify();
    });
    expect(screen.getByRole("button", { name: "Train" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: "Connect" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("starts with Connect expanded and exposes all four cards", () => {
    render(<WorkspaceOverview />);
    expect(
      screen.queryByText("Support infrastructure"),
    ).not.toBeInTheDocument();
    for (const [index, card] of workspaceCards.entries()) {
      expect(screen.getByRole("button", { name: card.title })).toHaveAttribute(
        "aria-expanded",
        String(index === 0),
      );
    }
    expect(
      screen.getByRole("heading", {
        name: "One workspace. Every conversation.",
      }),
    ).toBeVisible();
  });

  it("makes every state reachable by touch/click without relying on hover", () => {
    render(<WorkspaceOverview />);
    for (const card of workspaceCards) {
      const button = screen.getByRole("button", { name: card.title });
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(
        document.getElementById(button.getAttribute("aria-controls") ?? ""),
      ).toHaveAttribute("aria-hidden", "false");
      expect(
        document.querySelectorAll('button[aria-expanded="true"]'),
      ).toHaveLength(1);
    }
  });

  it("supports arrow, Home and End navigation without losing focus", () => {
    render(<WorkspaceOverview />);
    const connect = screen.getByRole("button", { name: "Connect" });
    const deploy = screen.getByRole("button", { name: "Deploy" });
    fireEvent.keyDown(connect, { key: "End" });
    expect(deploy).toHaveFocus();
    expect(deploy).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(deploy, { key: "ArrowRight" });
    expect(connect).toHaveFocus();
    fireEvent.keyDown(connect, { key: "ArrowLeft" });
    expect(deploy).toHaveFocus();
    fireEvent.keyDown(deploy, { key: "Home" });
    expect(connect).toHaveFocus();
  });
});
