import { cleanup, render, screen } from "@testing-library/react";
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
      screen.getByRole("button", { name: /Send message/ }),
    ).toBeInTheDocument();
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
