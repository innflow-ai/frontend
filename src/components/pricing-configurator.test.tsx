import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { PricingConfigurator } from "./pricing-configurator";

describe("PricingConfigurator", () => {
  afterEach(() => cleanup());

  it("renders the current catalog and switches to month-to-month pricing", async () => {
    const user = userEvent.setup();
    render(<PricingConfigurator />);

    expect(screen.getByRole("heading", { name: "Basic" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pro" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Business" }),
    ).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("10,000")).toBeInTheDocument();
    expect(screen.getByText("140,000")).toBeInTheDocument();
    expect(screen.getByText("$14.99")).toBeInTheDocument();
    expect(screen.getByText("$149.99")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Monthly" }));

    expect(screen.getByText("$19.00")).toBeInTheDocument();
    expect(screen.getByText("$197.00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Monthly" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.queryByText("$14.99")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Annual plan/ }));
    expect(screen.getByText("$14.99")).toBeInTheDocument();
    expect(screen.getByText("$149.99")).toBeInTheDocument();
    expect(
      screen.getAllByText("Annual plan, billed yearly upfront"),
    ).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Continue with Google for Pro" }),
    ).toHaveAttribute("data-marketing-label", "pricing_pro_signup");
  });
});
