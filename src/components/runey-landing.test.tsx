import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { footerNavigation, legalLinks } from "@/config/footer-navigation";
import { RuneyChrome } from "./runey-chrome";
import { RuneyWorkspace } from "./runey-workspace";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return { ...actual, useReducedMotion: () => true };
});
beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
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
    expect(document.body.style.overflow).toBe("hidden");
    for (const name of ["Product", "Solutions", "Portfolios", "Resources"]) {
      expect(within(navigation).getByRole("button", { name })).toBeVisible();
    }
    await user.click(
      within(navigation).getByRole("button", { name: "Product" }),
    );
    expect(
      within(navigation).getByRole("link", { name: /Agent OS/ }),
    ).toBeVisible();
    const link = navigation.querySelector("a");
    expect(link).not.toBeNull();
    if (link) {
      link.addEventListener("click", (event) => event.preventDefault());
      await user.click(link);
    }
    await waitFor(() =>
      expect(
        screen.queryByRole("navigation", { name: "Mobile navigation" }),
      ).not.toBeInTheDocument(),
    );
    expect(document.body.style.overflow).toBe("");
  });

  it.each(["/", "/property-management"])(
    "preserves previous and current footer links on %s",
    (pathname) => {
      route.pathname = pathname;
      render(
        <RuneyChrome slot="footer">
          <div>Existing footer</div>
        </RuneyChrome>,
      );
      const footer = screen.getByRole("contentinfo");
      for (const column of footerNavigation) {
        for (const link of column.links) {
          expect(
            within(footer)
              .getAllByRole("link", { name: link.label })
              .some((a) => a.getAttribute("href") === link.href),
          ).toBe(true);
        }
      }
      for (const label of [
        "Features",
        "Skills library",
        "FAQ",
        "Request a demo",
        "Continue with Google",
      ]) {
        expect(within(footer).getByRole("link", { name: label })).toBeVisible();
      }
      const legal = within(footer).getByRole("navigation", { name: "Legal" });
      for (const link of legalLinks) {
        expect(
          within(legal).getByRole("link", { name: link.label }),
        ).toHaveAttribute("href", link.href);
      }
      expect(
        within(legal).getByRole("link", { name: "Consent Preferences" }),
      ).toHaveClass("termly-display-preferences");
      expect(
        within(legal).getByRole("link", {
          name: "Do Not Sell or Share My Personal Information",
        }),
      ).toBeVisible();
      expect(
        within(legal).getByRole("link", {
          name: "Limit the Use of My Sensitive Personal Information",
        }),
      ).toBeVisible();
      expect(
        within(footer).getByText(
          `© ${new Date().getFullYear()} Innflow. All rights reserved.`,
        ),
      ).toBeVisible();
    },
  );

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
