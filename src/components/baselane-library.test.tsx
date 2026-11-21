import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { BaselaneLibrary } from "./baselane-library";

afterEach(cleanup);

describe("resource library controls", () => {
  it("combines category and search, then recovers from an empty result", async () => {
    const user = userEvent.setup();
    render(<BaselaneLibrary kind="articles" />);
    await user.click(screen.getByRole("button", { name: "Planning tools" }));
    await user.type(screen.getByRole("searchbox"), "brief");
    expect(screen.getByRole("status")).toHaveTextContent("1 resource found");
    const results = screen.getByRole("region", { name: "Planning tools" });
    expect(within(results).getAllByRole("heading", { level: 3 })).toHaveLength(
      1,
    );
    expect(
      within(results).getByRole("heading", {
        name: "Prepare a property review brief",
      }),
    ).toBeInTheDocument();
    await user.type(screen.getByRole("searchbox"), " no-match");
    expect(
      screen.getByRole("heading", { name: "No matching resources." }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(
      screen.getByRole("button", { name: "All resources" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("region", { name: "Team workflows" }),
    ).toBeInTheDocument();
  });

  it("pages through workflow topics and resets pagination when filters change", async () => {
    const user = userEvent.setup();
    render(<BaselaneLibrary kind="webinars" />);
    const region = () =>
      screen.getByRole("region", { name: "Explore workflow topics" });
    expect(
      within(region()).getByRole("button", {
        name: "Previous Explore workflow topics",
      }),
    ).toBeDisabled();
    await user.click(
      within(region()).getByRole("button", {
        name: "Next Explore workflow topics",
      }),
    );
    expect(
      within(region()).getByRole("heading", {
        name: "Prepare a document handoff",
      }),
    ).toBeInTheDocument();
    expect(
      within(region()).queryByRole("heading", {
        name: "Start with one portfolio workflow",
      }),
    ).not.toBeInTheDocument();
    expect(
      within(region()).getByRole("button", {
        name: "Next Explore workflow topics",
      }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("button", { name: "Property operations" }),
    );
    expect(
      within(
        screen.getByRole("region", { name: "Property operations" }),
      ).getAllByRole("heading", { level: 3 }),
    ).toHaveLength(3);
    await user.click(screen.getByRole("button", { name: "All topics" }));
    expect(
      within(region()).getByRole("heading", {
        name: "Start with one portfolio workflow",
      }),
    ).toBeInTheDocument();
    await user.click(
      within(region()).getByRole("button", { name: "View all" }),
    );
    expect(within(region()).getAllByRole("heading", { level: 3 })).toHaveLength(
      6,
    );
    await user.click(
      within(region()).getByRole("button", { name: "Show fewer" }),
    );
    expect(within(region()).getAllByRole("heading", { level: 3 })).toHaveLength(
      3,
    );
    expect(
      within(region()).getByRole("button", {
        name: "Previous Explore workflow topics",
      }),
    ).toBeDisabled();
  });
});
