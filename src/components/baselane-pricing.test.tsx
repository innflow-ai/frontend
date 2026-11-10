import { cleanup, render, screen, within } from "@testing-library/react";
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
    "KNOWLEDGE, AGENTS AND CONNECTED WORK",
    "COMPUTER TOOLS AND COMMUNICATION",
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
  expect(screen.getAllByRole("table")).toHaveLength(5);
});

it("updates both plan cards and comparison prices from the selected billing term", async () => {
  const user = userEvent.setup();
  render(<BaselanePricing />);
  expect(
    screen.getByRole("radio", { name: "Yearly (up to 24% off)" }),
  ).toBeChecked();
  expect(screen.getByRole("article", { name: "Pro plan" })).toHaveTextContent(
    "$14.99",
  );
  expect(
    screen.getByRole("article", { name: "Business plan" }),
  ).toHaveTextContent("$149.99");
  expect(screen.getByText("$14.99/mo.")).toBeInTheDocument();
  await user.click(screen.getByRole("radio", { name: "Monthly" }));
  expect(screen.getByRole("article", { name: "Pro plan" })).toHaveTextContent(
    "$19",
  );
  expect(
    screen.getByRole("article", { name: "Business plan" }),
  ).toHaveTextContent("$197");
  expect(screen.getByText("$19/mo.")).toBeInTheDocument();
  expect(
    screen.getByText("No annual commitment. All prices in USD."),
  ).toBeInTheDocument();
  await user.keyboard("{ArrowRight}");
  expect(
    screen.getByRole("radio", { name: "Yearly (up to 24% off)" }),
  ).toBeChecked();
  expect(screen.getByRole("article", { name: "Pro plan" })).toHaveTextContent(
    "$14.99",
  );
  expect(screen.getByRole("article", { name: "Basic plan" })).toHaveTextContent(
    "$0",
  );
  expect(
    screen.getByRole("article", { name: "Enterprise plan" }),
  ).toHaveTextContent("Custom");
});

it("shows annual discounts only for paid plans and removes them on monthly billing", async () => {
  const user = userEvent.setup();
  render(<BaselanePricing />);
  const pro = screen.getByRole("article", { name: "Pro plan" });
  const business = screen.getByRole("article", { name: "Business plan" });
  expect(within(pro).getByText("21% OFF")).toBeInTheDocument();
  expect(within(business).getByText("24% OFF")).toBeInTheDocument();
  expect(pro.querySelector("del")).toHaveTextContent("$19");
  expect(business.querySelector("del")).toHaveTextContent("$197");
  expect(pro).toHaveTextContent("$179.88 billed yearly");
  expect(business).toHaveTextContent("$1,799.88 billed yearly");
  for (const name of ["Basic plan", "Enterprise plan"]) {
    expect(
      screen.getByRole("article", { name }).querySelector("del"),
    ).toBeNull();
  }
  expect(
    within(screen.getByRole("article", { name: "Basic plan" })).getByRole(
      "link",
      { name: "Get started with Basic" },
    ),
  ).toBeDefined();
  await user.click(screen.getByRole("radio", { name: "Monthly" }));
  expect(pro.querySelector("del")).toBeNull();
  expect(business.querySelector("del")).toBeNull();
  expect(screen.queryByText("21% OFF")).not.toBeInTheDocument();
  expect(screen.queryByText("24% OFF")).not.toBeInTheDocument();
  expect(pro).toHaveTextContent("$19 billed monthly");
  expect(business).toHaveTextContent("$197 billed monthly");
  expect(
    screen.getByRole("radio", { name: "Yearly (up to 24% off)" }),
  ).not.toBeChecked();
});
