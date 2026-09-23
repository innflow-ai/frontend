import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { ProductHeadspaceCta } from "./product-headspace-cta";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

afterEach(cleanup);

it("keeps signup and demo destinations distinct in header, homepage, and footer", () => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  render(
    <>
      <SiteHeader />
      <ProductHeadspaceCta />
      <SiteFooter />
    </>,
  );

  const signup = screen.getAllByRole("link", { name: /Continue with Google/ });
  const demo = [
    ...screen.getAllByRole("link", { name: "Book a demo" }),
    ...screen.getAllByRole("link", { name: /See demo/ }),
  ];
  expect(signup.length).toBeGreaterThan(0);
  expect(demo.length).toBeGreaterThan(0);
  for (const link of signup) {
    expect(link).toHaveAttribute("href", siteConfig.googleAuthUrl);
    expect(link.getAttribute("href")).not.toBe(siteConfig.demoUrl);
  }
  for (const link of demo) {
    expect(link).toHaveAttribute("href", siteConfig.demoUrl);
    expect(link.getAttribute("href")).not.toBe(siteConfig.googleAuthUrl);
    expect(link.getAttribute("href")).not.toBe(siteConfig.signupUrl);
  }
  vi.unstubAllGlobals();
});
