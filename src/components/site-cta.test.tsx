import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SiteCloseAndFooter } from "./site-close-and-footer";
import { SiteCta } from "./site-cta";

const route = vi.hoisted(() => ({ pathname: "/blog" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));

vi.mock("./tracked-link", () => ({
  TrackedLink: ({
    destination,
    children,
  }: {
    destination: string;
    children: React.ReactNode;
  }) => <a href={destination}>{children}</a>,
}));
afterEach(cleanup);

it("renders the shared sky close and directory badges", () => {
  render(<SiteCta />);
  expect(
    screen.getByRole("heading", { name: /A clearer day starts/ }),
  ).toBeVisible();
  expect(screen.getByRole("heading", { name: "Featured on" })).toBeVisible();
  expect(
    screen.getByRole("heading", { name: "A little more, just for members." }),
  ).toBeVisible();
});

it("keeps the sky close, members signup, and Property teams column in one footer", () => {
  route.pathname = "/blog";
  render(<SiteCloseAndFooter />);
  expect(
    screen.getByRole("heading", { name: /A clearer day starts/ }),
  ).toBeVisible();
  expect(screen.getByRole("heading", { name: "Property teams" })).toBeVisible();
  expect(screen.getByText(/Your AI agent workspace\./)).toBeVisible();
  expect(screen.getByText(/Connected in one place\./)).toBeVisible();
  expect(screen.queryByText(/Property operations\./)).toBeNull();
  expect(
    screen.getByRole("link", { name: "Long-term rentals" }),
  ).toHaveAttribute("href", "/long-term-rentals");
  expect(screen.queryByText("Bring your work together.")).toBeNull();
});

it("leaves the help center's fixed chrome unobstructed", () => {
  route.pathname = "/help";
  const view = render(<SiteCloseAndFooter />);
  expect(view.container).toBeEmptyDOMElement();
});
