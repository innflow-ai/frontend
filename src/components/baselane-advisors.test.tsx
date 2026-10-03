import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { BaselaneAdvisors } from "./baselane-advisors";

afterEach(cleanup);

it("rejects blank inquiry details and clears errors when corrected", () => {
  render(<BaselaneAdvisors />);
  const name = screen.getByLabelText("First name") as HTMLInputElement;
  fireEvent.input(name, { target: { value: "   " } });
  fireEvent.submit(name.form as HTMLFormElement);
  expect(name.validity.customError).toBe(true);
  expect(screen.queryByText("Review your inquiry")).not.toBeInTheDocument();
  fireEvent.input(name, { target: { value: "Alex" } });
  expect(name.validity.customError).toBe(false);
});

it("prepares trimmed local drafts and removes stale drafts after editing", () => {
  render(<BaselaneAdvisors />);
  for (const [label, value] of [
    ["First name", " Alex "],
    ["Last name", " Rivera "],
    ["Work email", "alex@example.com"],
    ["What workflow would you like to connect?", " Document review "],
  ])
    fireEvent.input(screen.getByLabelText(label), { target: { value } });
  fireEvent.change(screen.getByLabelText("Advisor type"), {
    target: { value: "Bookkeeper" },
  });
  fireEvent.change(screen.getByLabelText("Real estate clients"), {
    target: { value: "1–10" },
  });
  const name = screen.getByLabelText("First name") as HTMLInputElement;
  fireEvent.submit(name.form as HTMLFormElement);
  const href =
    screen
      .getByRole("link", { name: "Open email draft" })
      .getAttribute("href") ?? "";
  expect(decodeURIComponent(href)).toContain("Name: Alex Rivera\n");
  expect(decodeURIComponent(href)).toContain("Workflow: Document review");
  fireEvent.input(name, { target: { value: "Sam" } });
  expect(
    screen.queryByRole("link", { name: "Open email draft" }),
  ).not.toBeInTheDocument();
});
