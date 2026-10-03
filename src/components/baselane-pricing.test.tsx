import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it } from "vitest";
import { BaselanePricing } from "./baselane-pricing";

afterEach(cleanup);

it("keeps comparison disclosure state and keyboard activation synchronized", async () => {
  const user = userEvent.setup();
  render(<BaselanePricing />);
  const headings = [
    "WORKFLOW CAPACITY",
    "DATA AND HISTORY",
    "ADVANCED CAPABILITIES",
  ];
  const assertState = (title: string, expanded: boolean) => {
    const button = screen.getByRole("button", { name: title });
    expect(button).toHaveAttribute("aria-expanded", String(expanded));
    const panel = document.getElementById(
      button.getAttribute("aria-controls") ?? "",
    );
    expect(panel).not.toBeNull();
    expect(panel?.hidden).toBe(!expanded);
  };
  for (const title of headings) assertState(title, true);
  await user.click(
    screen.getByRole("button", { name: "Collapse all features" }),
  );
  for (const title of headings) assertState(title, false);
  expect(screen.queryAllByRole("table")).toHaveLength(0);
  screen.getByRole("button", { name: headings[0] }).focus();
  await user.keyboard("{Enter}");
  assertState(headings[0], true);
  assertState(headings[1], false);
  expect(screen.getAllByRole("table")).toHaveLength(1);
  await user.click(screen.getByRole("button", { name: "Expand all features" }));
  for (const title of headings) assertState(title, true);
  expect(screen.getAllByRole("table")).toHaveLength(3);
});
