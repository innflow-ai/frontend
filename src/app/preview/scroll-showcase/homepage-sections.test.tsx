import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { features } from "./homepage-content";
import {
  ConnectedInfrastructure,
  CustomerStories,
  FeatureStory,
  PreviewClosing,
} from "./homepage-sections";

const media = { reduced: false };
let visibility: (entries: { isIntersecting: boolean }[]) => void;
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
beforeEach(() => {
  media.reduced = false;
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: media.reduced,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: typeof visibility) {
        visibility = callback;
      }
      observe() {
        visibility([{ isIntersecting: true }]);
      }
      disconnect() {}
    },
  );
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Homepage feature stories", () => {
  it.each(features)(
    "makes every $id panel reachable by keyboard",
    (section) => {
      render(<FeatureStory section={section} />);
      const tabs = within(
        screen.getByRole("tablist", { name: `${section.label} features` }),
      ).getAllByRole("tab");
      tabs[0].focus();
      fireEvent.keyDown(tabs[0], { key: "End" });
      expect(tabs.at(-1)).toHaveFocus();
      expect(tabs.at(-1)).toHaveAttribute("aria-selected", "true");
      fireEvent.keyDown(tabs[tabs.length - 1], { key: "ArrowDown" });
      expect(tabs[0]).toHaveFocus();
      for (const tab of tabs) {
        fireEvent.click(tab);
        const panel = document.getElementById(
          tab.getAttribute("aria-controls") ?? "",
        );
        expect(panel).toBeVisible();
        expect(panel).toHaveAttribute("aria-labelledby", tab.id);
      }
    },
  );
  it("renders all nine Before/After pairs and resets newly selected examples", () => {
    for (const section of features.filter((item) => item.id !== "channels")) {
      const view = render(<FeatureStory section={section} />);
      const tabs = within(
        screen.getByRole("tablist", { name: `${section.label} features` }),
      ).getAllByRole("tab");
      section.states.forEach((state, index) => {
        fireEvent.click(tabs[index]);
        if (!state.pair) return;
        expect(screen.getByRole("button", { name: "After" })).toHaveAttribute(
          "aria-pressed",
          "true",
        );
        fireEvent.click(screen.getByRole("button", { name: "Before" }));
        expect(
          screen.getByRole("heading", { name: state.pair.before[0] }),
        ).toBeVisible();
        fireEvent.click(screen.getByRole("button", { name: "After" }));
        expect(
          screen.getByRole("heading", { name: state.pair.after[0] }),
        ).toBeVisible();
      });
      view.unmount();
    }
  });
  it("exposes all five agent steps", () => {
    render(<FeatureStory section={features[1]} />);
    const tabs = within(
      screen.getByRole("tablist", { name: "Agent assistance sequence" }),
    ).getAllByRole("tab");
    expect(tabs).toHaveLength(5);
    fireEvent.click(tabs[4]);
    expect(screen.getByText("Keep the work moving")).toBeVisible();
  });
});

it("selects integration focus without claiming a new connection", () => {
  render(<ConnectedInfrastructure />);
  fireEvent.click(screen.getByRole("button", { name: "Slack" }));
  expect(
    screen.getByRole("img", { name: "Slack" }).parentElement,
  ).toHaveAttribute("data-focused", "true");
  fireEvent.click(screen.getByRole("button", { name: "OpenAI" }));
  expect(
    screen.getByRole("img", { name: "OpenAI" }).parentElement,
  ).toHaveAttribute("data-focused", "true");
});
it("shows an unattributed placeholder when no stories are selected", () => {
  render(<CustomerStories testimonials={[]} heading="In their own words." />);
  expect(screen.getByText("Preview · Story placement")).toBeVisible();
  expect(document.querySelector("blockquote")).toBeNull();
});
it("pauses closing autoplay offscreen and when the user selects a state", () => {
  vi.useFakeTimers();
  render(<PreviewClosing />);
  act(() => {
    vi.advanceTimersByTime(5000);
  });
  expect(
    screen.getByRole("button", { name: "Track midpoint" }),
  ).toHaveAttribute("aria-pressed", "true");
  act(() => {
    visibility([{ isIntersecting: false }]);
  });
  act(() => {
    vi.advanceTimersByTime(10000);
  });
  expect(
    screen.getByRole("button", { name: "Track midpoint" }),
  ).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "Next highlight" }));
  act(() => {
    visibility([{ isIntersecting: true }]);
  });
  act(() => {
    vi.advanceTimersByTime(10000);
  });
  expect(
    screen.getByRole("button", { name: "Next highlight" }),
  ).toHaveAttribute("aria-pressed", "true");
});
it("keeps closing highlights manually selectable with reduced motion", () => {
  media.reduced = true;
  vi.useFakeTimers();
  render(<PreviewClosing />);
  act(() => {
    vi.advanceTimersByTime(15000);
  });
  expect(
    screen.getByRole("button", { name: "Request resolved" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(screen.queryByRole("button", { name: "Pause highlights" })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Next highlight" }));
  expect(
    screen.getByRole("button", { name: "Next highlight" }),
  ).toHaveAttribute("aria-pressed", "true");
});
