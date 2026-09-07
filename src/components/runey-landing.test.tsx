import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RuneyChrome } from "./runey-chrome";
import { RuneyWorkspace } from "./runey-workspace";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
afterEach(() => {
  cleanup();
  route.pathname = "/";
});

describe("Runey landing interactions", () => {
  it("switches the hero preview with keyboard activation", async () => {
    const user = userEvent.setup();
    render(<RuneyWorkspace interactive />);
    const assistant = screen.getByRole("button", {
      name: "Assistant",
    });
    assistant.focus();
    await user.keyboard("{Enter}");
    expect(assistant).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("region", {
        name: "Illustrative Innflow assistant preview",
      }),
    ).toBeVisible();
    expect(
      screen.queryByText("Resident request received"),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Approvals" }));
    expect(screen.getByText("Awaiting review")).toBeVisible();
  });

  it("opens compact homepage menus and dismisses with Escape and outside click", async () => {
    const user = userEvent.setup();
    render(
      <RuneyChrome slot="header">
        <div>Existing header</div>
      </RuneyChrome>,
    );
    const product = screen.getByRole("button", { name: "Product" });
    product.focus();
    await user.keyboard("{Enter}");
    expect(product).toHaveAttribute("aria-expanded", "true");
    await waitFor(() =>
      expect(
        screen.getByRole("region", { name: "Product menu" }),
      ).toBeVisible(),
    );
    await user.keyboard("{Escape}");
    expect(product).toHaveAttribute("aria-expanded", "false");
    expect(product).toHaveFocus();
    await user.click(screen.getByRole("button", { name: "Platform" }));
    expect(screen.getByRole("button", { name: "Platform" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await user.click(document.body);
    expect(screen.getByRole("button", { name: "Platform" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("keeps the property page navigation as direct links", () => {
    route.pathname = "/property-management";
    render(
      <RuneyChrome slot="header">
        <div>Existing header</div>
      </RuneyChrome>,
    );
    expect(screen.getByRole("link", { name: "Product" })).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Product" }),
    ).not.toBeInTheDocument();
  });

  it("opens mobile navigation and closes it after selecting a destination", async () => {
    const user = userEvent.setup();
    render(
      <RuneyChrome slot="header">
        <div>Existing header</div>
      </RuneyChrome>,
    );
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const navigation = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });
    expect(navigation).toBeVisible();
    const link = navigation.querySelector("a");
    expect(link).not.toBeNull();
    if (link) {
      link.addEventListener("click", (event) => event.preventDefault());
      await user.click(link);
    }
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });

  it("retains the existing chrome on other routes", () => {
    route.pathname = "/pricing";
    render(
      <RuneyChrome slot="header">
        <div>Existing header</div>
      </RuneyChrome>,
    );
    expect(screen.getByText("Existing header")).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Open navigation" }),
    ).not.toBeInTheDocument();
  });
});
