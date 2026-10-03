import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it } from "vitest";
import { BaselaneLoans } from "./baselane-loans";

afterEach(cleanup);

it("makes the overflow comparison table a named keyboard target", () => {
  render(<BaselaneLoans />);
  const region = screen.getByRole("region", {
    name: "Compare the conversation topics.",
  });
  expect(region).toHaveAttribute("tabindex", "0");
  expect(within(region).getByRole("table")).toBeVisible();
  region.focus();
  expect(region).toHaveFocus();
});

it("keeps loan category focus, selection, and panel content aligned", async () => {
  const user = userEvent.setup();
  render(<BaselaneLoans />);
  const tabs = screen.getAllByRole("tab");
  expect(tabs).toHaveLength(4);
  const check = (index: number) => {
    tabs.forEach((tab, i) => {
      expect(tab).toHaveAttribute("aria-selected", String(i === index));
      expect(tab).toHaveAttribute("tabindex", i === index ? "0" : "-1");
    });
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAccessibleName(tabs[index].textContent ?? "");
    expect(panel.id).toBe(tabs[index].getAttribute("aria-controls"));
    expect(
      within(panel).getByRole("heading", {
        name: tabs[index].textContent ?? "",
      }),
    ).toBeVisible();
  };
  check(0);
  tabs[0].focus();
  for (const [key, index] of [
    ["{ArrowLeft}", 3],
    ["{ArrowRight}", 0],
    ["{End}", 3],
    ["{Home}", 0],
  ] as const) {
    await user.keyboard(key);
    check(index);
    expect(tabs[index]).toHaveFocus();
  }
  for (let index = 0; index < tabs.length; index++) {
    await user.click(tabs[index]);
    check(index);
  }
});
