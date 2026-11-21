import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { McpAgentOrbit } from "./mcp-agent-orbit";

const settings = vi.hoisted(() => ({ inView: true, reduced: false }));
vi.mock("motion/react", () => ({
  useInView: () => settings.inView,
  useReducedMotion: () => settings.reduced,
}));
vi.mock("next/font/google", () => ({
  Inter: () => ({ className: "cover-font" }),
}));
vi.mock("./scene", () => ({ FigmaScene: () => null }));
let callbacks: Map<number, FrameRequestCallback>;
let request: number;
let visibility: string;
function tick(time: number) {
  act(() => {
    const current = [...callbacks.values()];
    callbacks.clear();
    for (const callback of current) callback(time);
  });
}
const frame = () =>
  Number(screen.getByRole("img").getAttribute("data-motion-frame"));
beforeEach(() => {
  settings.inView = true;
  settings.reduced = false;
  callbacks = new Map();
  request = 0;
  visibility = "visible";
  vi.spyOn(document, "visibilityState", "get").mockImplementation(
    () => visibility as DocumentVisibilityState,
  );
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    callbacks.set(++request, callback);
    return request;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => callbacks.delete(id));
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
describe("MCP storyboard playback", () => {
  it("pauses in a hidden tab and resumes from its existing phase", () => {
    render(<McpAgentOrbit />);
    tick(0);
    tick(1000);
    expect(frame()).toBe(60);
    visibility = "hidden";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(callbacks.size).toBe(0);
    visibility = "visible";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    tick(9000);
    expect(frame()).toBe(60);
    tick(9500);
    expect(frame()).toBe(90);
  });
  it("pauses off-screen without rewinding, then stops at the supplied final pose", () => {
    const { rerender } = render(<McpAgentOrbit />);
    tick(0);
    tick(1000);
    expect(frame()).toBe(60);
    settings.inView = false;
    rerender(<McpAgentOrbit />);
    expect(callbacks.size).toBe(0);
    settings.inView = true;
    rerender(<McpAgentOrbit />);
    tick(8000);
    expect(frame()).toBe(60);
    tick(13000);
    expect(frame()).toBe(264);
    expect(callbacks.size).toBe(0);
  });
  it("shows the settled pose without scheduling motion when reduced motion is enabled", () => {
    settings.reduced = true;
    render(<McpAgentOrbit />);
    expect(frame()).toBe(75);
    expect(callbacks.size).toBe(0);
  });
});
