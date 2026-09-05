import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { buildContactMailto, ContactForm } from "./contact-form";

describe("ContactForm", () => {
  afterEach(() => cleanup());

  it("renders the required inquiry fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("What is your message about?")).toBeRequired();
    expect(screen.getByLabelText("Message")).toBeRequired();
    expect(
      screen.getByRole("button", { name: /Review in email/ }),
    ).toBeInTheDocument();
  });

  it("explains message requirements and rejects whitespace-only values", () => {
    render(<ContactForm />);
    const name = screen.getByLabelText("Name") as HTMLInputElement;
    const message = screen.getByLabelText("Message") as HTMLTextAreaElement;
    expect(message).toHaveAccessibleDescription(/20–3,000 characters/);
    fireEvent.input(name, { target: { value: "   " } });
    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "qa@example.com" },
    });
    fireEvent.change(screen.getByLabelText("What is your message about?"), {
      target: { value: "Product support" },
    });
    fireEvent.input(message, {
      target: { value: "                         " },
    });
    fireEvent.submit(name.form as HTMLFormElement);
    expect(name.validity.customError).toBe(true);
    expect(message.validity.customError).toBe(true);
    fireEvent.input(name, { target: { value: "QA" } });
    fireEvent.input(message, {
      target: { value: "A valid message about a workflow handoff." },
    });
    expect(name.validity.customError).toBe(false);
    expect(message.validity.customError).toBe(false);
  });

  it("builds an encoded support email with the submitted context", () => {
    const url = buildContactMailto({
      name: "Alex Rivera",
      email: "alex@example.com",
      topic: "Product support",
      message: "I need help reviewing a workflow handoff.",
    });

    expect(url).toContain("mailto:support@innflow.ai");
    expect(url).toContain("innflow%20inquiry%3A%20Product%20support");
    expect(url).toContain("Alex%20Rivera");
    expect(url).toContain("alex%40example.com");
  });
});
