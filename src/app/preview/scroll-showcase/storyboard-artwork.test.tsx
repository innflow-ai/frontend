import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { StoryboardArtwork } from "./storyboard-artwork";

const controls = vi.hoisted(() => ({ inView: false, reduced: false }));
vi.mock("motion/react", () => ({
  useInView: () => controls.inView,
  useReducedMotion: () => controls.reduced,
}));
vi.mock("next/dynamic", () => ({
  default:
    () =>
    ({ playing }: { playing: boolean }) => (
      <div data-testid="runtime" data-playing={playing} />
    ),
}));
vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    sizes: _sizes,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    sizes?: string;
  }) => (
    // biome-ignore lint/performance/noImgElement: Image test double.
    <img {...props} alt="" />
  ),
}));
const scene = {
  number: 12,
  title: "Get requests to the right team",
  src: "/brand/homepage/12.riv",
  poster: "/brand/homepage/12.webp",
};
beforeEach(() => {
  controls.inView = false;
  controls.reduced = false;
});
afterEach(cleanup);
it("defers the runtime until visible and pauses it offscreen or in a hidden tab", () => {
  const view = render(<StoryboardArtwork storyboard={scene} />);
  expect(screen.queryByTestId("runtime")).not.toBeInTheDocument();
  controls.inView = true;
  view.rerender(<StoryboardArtwork storyboard={scene} />);
  expect(screen.getByTestId("runtime")).toHaveAttribute("data-playing", "true");
  controls.inView = false;
  view.rerender(<StoryboardArtwork storyboard={scene} />);
  expect(screen.getByTestId("runtime")).toHaveAttribute(
    "data-playing",
    "false",
  );
  controls.inView = true;
  view.rerender(<StoryboardArtwork storyboard={scene} />);
  const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
  act(() => document.dispatchEvent(new Event("visibilitychange")));
  expect(screen.getByTestId("runtime")).toHaveAttribute(
    "data-playing",
    "false",
  );
  hidden.mockRestore();
});
it("uses still artwork for reduced motion and missing exports", () => {
  controls.inView = true;
  controls.reduced = true;
  const view = render(<StoryboardArtwork storyboard={scene} />);
  expect(screen.queryByTestId("runtime")).not.toBeInTheDocument();
  expect(view.container.querySelector("img")).toHaveAttribute(
    "src",
    scene.poster,
  );
  controls.reduced = false;
  view.rerender(
    <StoryboardArtwork storyboard={{ ...scene, src: undefined }} />,
  );
  expect(screen.queryByTestId("runtime")).not.toBeInTheDocument();
});
