import { cleanup, fireEvent, render } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { ConsentManagedTags } from "./consent-managed-tags";

const blockerId = "innflow-termly-resource-blocker";
const trackerIds = ["innflow-google-tag-manager", "innflow-apollo-tracker"];

afterEach(() => {
  cleanup();
  for (const id of [blockerId, ...trackerIds]) {
    document.getElementById(id)?.remove();
  }
});

describe("consent script loading", () => {
  it("waits for the blocker before inserting optional trackers", () => {
    render(<ConsentManagedTags />);
    const blocker = document.getElementById(blockerId);
    expect(blocker).toHaveAttribute(
      "src",
      expect.stringContaining("autoBlock=on"),
    );
    for (const id of trackerIds) expect(document.getElementById(id)).toBeNull();

    fireEvent.load(blocker as HTMLElement);
    for (const id of trackerIds)
      expect(document.getElementById(id)).not.toBeNull();
  });

  it("does not load trackers when the blocker fails", () => {
    render(<ConsentManagedTags />);
    fireEvent.error(document.getElementById(blockerId) as HTMLElement);
    for (const id of trackerIds) expect(document.getElementById(id)).toBeNull();
  });

  it("loads only once during strict replay and remounts", () => {
    const first = render(
      <StrictMode>
        <ConsentManagedTags />
      </StrictMode>,
    );
    const blocker = document.getElementById(blockerId) as HTMLElement;
    fireEvent.load(blocker);
    first.unmount();
    render(<ConsentManagedTags />);
    fireEvent.load(blocker);
    for (const id of [blockerId, ...trackerIds]) {
      expect(document.querySelectorAll(`#${id}`)).toHaveLength(1);
    }
  });
});
