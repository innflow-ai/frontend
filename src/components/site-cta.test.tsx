import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SiteCloseAndFooter } from "./site-close-and-footer";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));

afterEach(cleanup);

it.each(["/", "/blog", "/products/ai-agents", "/legal/privacy-policy"])(
  "renders one shared footer and newsletter form on %s",
  (pathname) => {
    route.pathname = pathname;
    render(<SiteCloseAndFooter />);

    const footer = screen.getByRole("contentinfo");
    const featured = screen.getByRole("heading", { name: "Featured on" });
    expect(featured).toHaveAttribute("data-mixed-heading", "true");
    expect(footer).not.toContainElement(featured);
    expect(screen.getAllByRole("form")).toHaveLength(1);

    const signup = within(footer).getByRole("form", {
      name: "A little more, just for members.",
    });
    const navigation = within(footer).getByRole("navigation", {
      name: "Footer navigation",
    });
    expect(signup.compareDocumentPosition(navigation)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(within(signup).getByLabelText("Email address")).toBeVisible();
    expect(
      within(footer).getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/legal/privacy-policy");
    expect(
      screen.queryByRole("heading", { name: /A clearer day starts/ }),
    ).toBeNull();
  },
);

it("uses the homepage and inner-page navigation in the same layout", () => {
  route.pathname = "/";
  const view = render(<SiteCloseAndFooter />);
  expect(screen.getByRole("heading", { name: "Property teams" })).toBeVisible();
  expect(
    screen.getByRole("link", { name: "Long-term rentals" }),
  ).toHaveAttribute("href", "/long-term-rentals");

  route.pathname = "/blog";
  view.rerender(<SiteCloseAndFooter />);
  expect(screen.getByRole("heading", { name: "Product" })).toBeVisible();
  expect(screen.queryByRole("heading", { name: "Property teams" })).toBeNull();
});

it("leaves the help center's fixed chrome unobstructed", () => {
  route.pathname = "/help";
  const view = render(<SiteCloseAndFooter />);
  expect(view.container).toBeEmptyDOMElement();
});
