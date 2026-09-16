import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SiteFooterBoundary } from "./site-footer-boundary";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
afterEach(cleanup);

it("uses the template footer only on the homepage preview, including client navigation", () => {
  const footer = (
    <SiteFooterBoundary preview={<footer>Template</footer>}>
      <footer>Site</footer>
    </SiteFooterBoundary>
  );
  const view = render(footer);
  expect(screen.getByRole("contentinfo")).toHaveTextContent("Site");
  route.pathname = "/preview/scroll-showcase";
  view.rerender(
    <SiteFooterBoundary preview={<footer>Template</footer>}>
      <footer>Site</footer>
    </SiteFooterBoundary>,
  );
  expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
  expect(screen.getByRole("contentinfo")).toHaveTextContent("Template");
  for (const pathname of ["/", "/rent-collection", "/preview/another-study"]) {
    route.pathname = pathname;
    view.rerender(
      <SiteFooterBoundary preview={<footer>Template</footer>}>
        <footer>Site</footer>
      </SiteFooterBoundary>,
    );
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Site");
  }
});
