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

it("uses the product footer away from the homepage", () => {
  route.pathname = "/blog";
  render(<SiteCloseAndFooter />);
  expect(
    screen.getByRole("heading", { name: /A clearer day starts/ }),
  ).toBeVisible();
  expect(screen.getByRole("heading", { name: "Why innflow" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Product" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Resources" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Get started" })).toBeVisible();
  expect(screen.queryByRole("heading", { name: "Property teams" })).toBeNull();
  expect(screen.queryByRole("heading", { name: "Solutions" })).toBeNull();
  expect(screen.queryByRole("link", { name: "Long-term rentals" })).toBeNull();
  expect(screen.queryByRole("link", { name: "Lease workflows" })).toBeNull();
});

it("keeps the homepage footer", () => {
  route.pathname = "/";
  render(<SiteCloseAndFooter />);
  expect(screen.getByRole("heading", { name: "Property teams" })).toBeVisible();
});

it("leaves the help center's fixed chrome unobstructed", () => {
  route.pathname = "/help";
  const view = render(<SiteCloseAndFooter />);
  expect(view.container).toBeEmptyDOMElement();
});
