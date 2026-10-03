import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BaselaneRentCalculator } from "./baselane-rent-calculator";

describe("rent calculator interactions", () => {
  const originalScrollIntoView = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "scrollIntoView",
  );
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    if (originalScrollIntoView) {
      Object.defineProperty(
        HTMLElement.prototype,
        "scrollIntoView",
        originalScrollIntoView,
      );
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
    }
  });

  function fillSample() {
    fireEvent.change(screen.getByLabelText("Property address"), {
      target: { value: "123 Example Street" },
    });
    fireEvent.change(screen.getByLabelText("Bedrooms"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Property type"), {
      target: { value: "House/Duplex" },
    });
    fireEvent.change(screen.getByLabelText("Comparable monthly rents (USD)"), {
      target: { value: "2400, 1200, 1800, 1600" },
    });
  }

  it("calculates the supplied sample and moves focus to the report", async () => {
    render(<BaselaneRentCalculator />);
    fillSample();
    fireEvent.click(
      screen.getByRole("button", { name: "Analyze comparable rents" }),
    );
    const report = screen.getByRole("region", {
      name: "Your comparable rent report",
    });
    expect(report).toHaveTextContent("$1,700");
    expect(report).toHaveTextContent("$1,750");
    expect(report).toHaveTextContent("Based on 4 values you supplied");
    await waitFor(() => expect(report).toHaveFocus());
  });

  it("discards stale results when inputs change and focuses invalid rents", () => {
    render(<BaselaneRentCalculator />);
    fillSample();
    fireEvent.click(
      screen.getByRole("button", { name: "Analyze comparable rents" }),
    );
    const rents = screen.getByLabelText("Comparable monthly rents (USD)");
    fireEvent.change(rents, { target: { value: "not valid" } });
    expect(
      screen.queryByRole("region", { name: "Your comparable rent report" }),
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Analyze comparable rents" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter 3–100 positive monthly rents",
    );
    expect(rents).toHaveAttribute("aria-invalid", "true");
    expect(rents).toHaveFocus();
    fireEvent.change(rents, { target: { value: "1800, 1900, 2000" } });
    expect(rents).toHaveAttribute("aria-invalid", "false");
    fireEvent.click(
      screen.getByRole("button", { name: "Analyze comparable rents" }),
    );
    expect(
      screen.getByRole("region", { name: "Your comparable rent report" }),
    ).toHaveTextContent("$1,900");
  });

  it("rejects a whitespace-only address and retains fields when editing", () => {
    render(<BaselaneRentCalculator />);
    fillSample();
    const address = screen.getByLabelText(
      "Property address",
    ) as HTMLInputElement;
    fireEvent.change(address, { target: { value: "   " } });
    fireEvent.click(
      screen.getByRole("button", { name: "Analyze comparable rents" }),
    );
    expect(address.validity.patternMismatch).toBe(true);
    expect(
      screen.queryByRole("region", { name: "Your comparable rent report" }),
    ).not.toBeInTheDocument();
    fireEvent.change(address, { target: { value: "123 Example Street" } });
    fireEvent.click(
      screen.getByRole("button", { name: "Analyze comparable rents" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Edit this comparison" }),
    );
    expect(address).toHaveValue("123 Example Street");
    expect(address).toHaveFocus();
    expect(
      screen.queryByRole("region", { name: "Your comparable rent report" }),
    ).not.toBeInTheDocument();
  });
});
