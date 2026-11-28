import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { blackFridayCampaign } from "@/config/website-announcement";
import { afterEach, expect, it, vi } from "vitest";
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
    "$36.08",
  );
  expect(
    screen.getByRole("article", { name: "Business plan" }),
  ).toHaveTextContent("$149.99");
  expect(screen.getByText("$36.08/mo.")).toBeInTheDocument();
  await user.click(screen.getByRole("radio", { name: "Monthly" }));
  expect(screen.getByRole("article", { name: "Pro plan" })).toHaveTextContent(
    "$41.64",
  );
  expect(
    screen.getByRole("article", { name: "Business plan" }),
  ).toHaveTextContent("$197.99");
  expect(screen.getByText("$41.64/mo.")).toBeInTheDocument();
  expect(
    screen.getByText("No annual commitment. All prices in USD."),
  ).toBeInTheDocument();
  await user.keyboard("{ArrowRight}");
  expect(
    screen.getByRole("radio", { name: "Yearly (up to 24% off)" }),
  ).toBeChecked();
  expect(screen.getByRole("article", { name: "Pro plan" })).toHaveTextContent(
    "$36.08",
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
  expect(within(pro).getByText("13% OFF")).toBeInTheDocument();
  expect(within(business).getByText("24% OFF")).toBeInTheDocument();
  expect(pro.querySelector("del")).toHaveTextContent("$41.64");
  expect(business.querySelector("del")).toHaveTextContent("$197.99");
  expect(pro).toHaveTextContent("$433 billed yearly");
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
  expect(screen.queryByText("13% OFF")).not.toBeInTheDocument();
  expect(screen.queryByText("24% OFF")).not.toBeInTheDocument();
  expect(pro).toHaveTextContent("$41.64 billed monthly");
  expect(business).toHaveTextContent("$197.99 billed monthly");
  expect(
    screen.getByRole("radio", { name: "Yearly (up to 24% off)" }),
  ).not.toBeChecked();
});

it("shows both Black Friday Pro rates until the campaign expires", async () => {
  const offer = blackFridayCampaign.offer!;
  vi.useFakeTimers();
  try {
    vi.setSystemTime(new Date(Date.parse(offer.targetTime) - 1000));
    render(<BaselanePricing offer={offer} />);
    const card = screen.getByRole("article", { name: "Pro plan" });
    expect(card).toHaveTextContent("$155.88 billed yearly");
    expect(card).toHaveTextContent("BLACKFRIDAY");
    expect(card.querySelector("del")).toHaveTextContent("$36.08");
    expect(screen.getByText("$12.99/mo.")).toBeInTheDocument();
    expect(screen.getByText(/Pay once upfront/)).toHaveTextContent("$155.88 for Pro");
    act(() => screen.getByRole("radio", { name: "Monthly" }).click());
    expect(card).toHaveTextContent("64% OFF");
    expect(card.querySelector("del")).toHaveTextContent("$41.64");
    expect(screen.getByText("$14.99/mo.")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    expect(card).toHaveTextContent("$41.64 billed monthly");
    expect(card).not.toHaveTextContent("BLACKFRIDAY");
    expect(screen.getByText("$41.64/mo.")).toBeInTheDocument();
  } finally {
    vi.useRealTimers();
  }
});
