import { cleanup, render, screen } from "@testing-library/react";
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
