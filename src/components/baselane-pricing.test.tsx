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

it("updates both plan cards and comparison prices from the selected billing term", async () => {
  const user = userEvent.setup();
  render(<BaselanePricing />);
  expect(
    screen.getByRole("radio", { name: "Annual commitment" }),
  ).toBeChecked();
  expect(screen.getByRole("article", { name: "Pro plan" })).toHaveTextContent(
    "$16.99",
  );
  expect(
    screen.getByRole("article", { name: "Business plan" }),
  ).toHaveTextContent("$169.99");
  expect(screen.getByText("$16.99/mo.")).toBeInTheDocument();
  await user.click(screen.getByRole("radio", { name: "Monthly" }));
  expect(screen.getByRole("article", { name: "Pro plan" })).toHaveTextContent(
    "$19.99",
  );
  expect(
    screen.getByRole("article", { name: "Business plan" }),
  ).toHaveTextContent("$199.99");
  expect(screen.getByText("$19.99/mo.")).toBeInTheDocument();
  expect(
    screen.getByText("No annual commitment. All prices in USD."),
  ).toBeInTheDocument();
  await user.keyboard("{ArrowRight}");
  expect(
    screen.getByRole("radio", { name: "Annual commitment" }),
  ).toBeChecked();
  expect(screen.getByRole("article", { name: "Pro plan" })).toHaveTextContent(
    "$16.99",
  );
  expect(screen.getByRole("article", { name: "Free plan" })).toHaveTextContent(
    "Always free",
  );
  expect(
    screen.getByRole("article", { name: "Enterprise plan" }),
  ).toHaveTextContent("Custom");
});
