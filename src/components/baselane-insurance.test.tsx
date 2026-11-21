import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BaselaneInsurance } from "./baselane-insurance";

describe("property review brief", () => {
  afterEach(cleanup);

  function fillBrief() {
    fireEvent.change(screen.getByLabelText("Property address"), {
      target: { value: "123 Example Street" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "qa@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone number"), {
      target: { value: "202-555-0100" },
    });
  }

  it("prepares a local brief and focuses the result", async () => {
    render(<BaselaneInsurance />);
    fillBrief();
    fireEvent.click(
      screen.getByRole("button", { name: "Prepare property brief" }),
    );
    const result = screen.getByRole("status");
    expect(result).toHaveTextContent("123 Example Street");
    expect(result).toHaveTextContent("qa@example.com");
    expect(
      screen.getByRole("button", { name: "Download brief" }),
    ).toBeInTheDocument();
    await waitFor(() => expect(result).toHaveFocus());
  });

  it("removes the outdated download after edits until the brief is prepared again", () => {
    render(<BaselaneInsurance />);
    fillBrief();
    fireEvent.click(
      screen.getByRole("button", { name: "Prepare property brief" }),
    );
    fireEvent.change(screen.getByLabelText("Property address"), {
      target: { value: "456 Changed Street" },
    });
    expect(
      screen.queryByRole("button", { name: "Download brief" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Prepare property brief" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("456 Changed Street");
    expect(screen.getByRole("status")).not.toHaveTextContent(
      "123 Example Street",
    );
  });

  it("does not prepare a brief when native validation fails", () => {
    render(<BaselaneInsurance />);
    fillBrief();
    const address = screen.getByLabelText(
      "Property address",
    ) as HTMLInputElement;
    fireEvent.change(address, { target: { value: "   " } });
    fireEvent.submit(address.form as HTMLFormElement);
    expect(address.validity.patternMismatch).toBe(true);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
