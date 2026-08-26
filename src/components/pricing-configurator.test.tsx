import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { PricingConfigurator } from "./pricing-configurator";

describe("PricingConfigurator", () => {
  afterEach(() => cleanup());

  it("renders the current catalog and switches to month-to-month pricing", async () => {
    const user = userEvent.setup();
    render(<PricingConfigurator />);

    expect(screen.getByRole("heading", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pro" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Business" }),
    ).toBeInTheDocument();
    expect(screen.getByText("1,200")).toBeInTheDocument();
    expect(screen.getByText("10,000")).toBeInTheDocument();
    expect(screen.getByText("140,000")).toBeInTheDocument();
    expect(screen.getByText("$16.99")).toBeInTheDocument();
    expect(screen.getByText("$169.99")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Monthly" }));

    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$199.99")).toBeInTheDocument();
  });
});
