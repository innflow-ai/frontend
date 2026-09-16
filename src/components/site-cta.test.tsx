import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SiteCta } from "./site-cta";

const route = vi.hoisted(() => ({ pathname: "/" }));
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
it("retains the shared CTA on public routes and omits it only on the homepage preview", () => {
  for (const pathname of ["/", "/rent-collection", "/preview/another-study"]) {
    route.pathname = pathname;
    const view = render(<SiteCta />);
    expect(
      screen.getByRole("heading", { name: /A clearer day starts/ }),
    ).toBeVisible();
    view.unmount();
  }
  route.pathname = "/preview/scroll-showcase";
  const { container } = render(<SiteCta />);
  expect(container).toBeEmptyDOMElement();
});
