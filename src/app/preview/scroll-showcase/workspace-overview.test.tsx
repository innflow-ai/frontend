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

let viewportWidth = 900;
let mediaListeners: Set<() => void>;
beforeEach(() => {
  viewportWidth = 900;
  mediaListeners = new Set();
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches:
        query === "(max-width: 760px)" && viewportWidth <= 760,
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
  it("starts with only Handle supplier paperwork expanded", () => {
    render(<WorkspaceOverview />);
    for (const [index, card] of workspaceCards.entries()) {
      expect(screen.getByRole("button", { name: card.title })).toHaveAttribute(
        "aria-expanded",
        String(index === 0),
      );
    }
    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      "https://app.innflow.ai/signup?callbackURL=%2Fworkflows",
    );
  });

  it("expands the hovered panel and collapses the previous one", () => {
    render(<WorkspaceOverview />);
    for (const panel of screen.getAllByRole("article").reverse()) {
      const event = new MouseEvent("pointerover", { bubbles: true });
      Object.defineProperty(event, "pointerType", { value: "mouse" });
      fireEvent(panel, event);
      expect(panel).toHaveAttribute("data-active", "true");
      expect(screen.getAllByRole("button", { expanded: true })).toHaveLength(1);
    }
  });

  it("shows all four complete cards on phones and restores selection when resized", () => {
    render(<WorkspaceOverview />);
    fireEvent.click(screen.getByRole("button", { name: "Train" }));
    act(() => {
      viewportWidth = 390;
      for (const notify of mediaListeners) notify();
    });
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(document.querySelectorAll('[data-active="true"]')).toHaveLength(4);
    act(() => {
      viewportWidth = 1440;
      for (const notify of mediaListeners) notify();
    });
    expect(screen.getByRole("button", { name: "Train" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
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
    const connect = screen.getByRole("button", { name: "Handle supplier paperwork" });
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
