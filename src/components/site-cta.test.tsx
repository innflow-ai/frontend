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
it("retains the shared CTA on inner pages without a dedicated closing section", () => {
  for (const pathname of ["/pricing", "/rent-collection", "/contact"]) {
    route.pathname = pathname;
    const view = render(<SiteCta />);
    expect(
      screen.getByRole("heading", { name: /A clearer day starts/ }),
    ).toBeVisible();
    view.unmount();
  }
});
it("avoids duplicate closing sections on product and industry designs", () => {
  for (const pathname of [
    "/help",
    "/platform",
    "/skills",
    "/products/ai-agents",
    "/integrations",
    "/industries/healthcare",
  ]) {
    route.pathname = pathname;
    const view = render(<SiteCta />);
    expect(view.container).toBeEmptyDOMElement();
    view.unmount();
  }
});
