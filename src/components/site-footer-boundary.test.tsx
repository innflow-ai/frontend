import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SiteFooterBoundary } from "./site-footer-boundary";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
afterEach(cleanup);

it("uses the hotel footer on the homepage and keeps legacy route footers on client navigation", () => {
  const footer = (
    <SiteFooterBoundary
      preview={<footer>Template</footer>}
      hotel={<footer>Hotel</footer>}
    >
      <footer>Site</footer>
    </SiteFooterBoundary>
  );
  const view = render(footer);
  expect(screen.getByRole("contentinfo")).toHaveTextContent("Hotel");
  route.pathname = "/industries/healthcare";
  view.rerender(
    <SiteFooterBoundary
      preview={<footer>Template</footer>}
      hotel={<footer>Hotel</footer>}
    >
      <footer>Site</footer>
    </SiteFooterBoundary>,
  );
  expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
  expect(screen.getByRole("contentinfo")).toHaveTextContent("Template");
  for (const pathname of ["/rent-collection", "/preview/another-study"]) {
    route.pathname = pathname;
    view.rerender(
      <SiteFooterBoundary
        preview={<footer>Template</footer>}
        hotel={<footer>Hotel</footer>}
      >
        <footer>Site</footer>
      </SiteFooterBoundary>,
    );
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Site");
  }
});

it("keeps the homepage footer stable when Vercel resolves the server root as /index", () => {
  const footer = (
    <SiteFooterBoundary
      preview={<footer>Template</footer>}
      hotel={<footer>Hotel</footer>}
    >
      <footer>Site</footer>
    </SiteFooterBoundary>
  );
  route.pathname = "/index";
  const view = render(footer);
  expect(screen.getByRole("contentinfo")).toHaveTextContent("Hotel");
  route.pathname = "/";
  view.rerender(footer);
  expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
  expect(screen.getByRole("contentinfo")).toHaveTextContent("Hotel");
});

it("uses the hotel footer on the platform and all hotel feature routes", () => {
  for (const pathname of [
    "/hotel-pms",
    "/hotel-pms/procurement",
    "/hotel-pms/front-desk",
  ]) {
    route.pathname = pathname;
    const view = render(
      <SiteFooterBoundary
        preview={<footer>Template</footer>}
        hotel={<footer>Hotel</footer>}
      >
        <footer>Site</footer>
      </SiteFooterBoundary>,
    );
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Hotel");
    view.unmount();
  }
});
