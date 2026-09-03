import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LatestBlogPostNavItem } from "@/components/mega-menu";
import { EditorialHeader } from "./editorial-header";
import styles from "./editorial-header.module.css";

const { mockPathname, motionFlags } = vi.hoisted(() => ({
  mockPathname: { current: "/" },
  motionFlags: { reduce: true },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname.current,
}));

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return { ...actual, useReducedMotion: () => motionFlags.reduce };
});

const latestBlogPosts: LatestBlogPostNavItem[] = [
  {
    title: "Newest operations guide",
    href: "/blog/newest-operations-guide",
    categoryLabel: "Automation",
    publishedLabel: "August 23, 2026",
    imageUrl: "https://cdn.sanity.io/images/hnjg8vum/production/example.jpg",
    imageAlt: "Automation dashboard",
  },
  {
    title: "A calmer approach to property work",
    href: "/blog/calmer-property-work",
    categoryLabel: "Property Management",
    publishedLabel: "August 22, 2026",
    imageUrl: null,
    imageAlt: "A calmer approach to property work",
  },
];

describe("EditorialHeader navigation", () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    mockPathname.current = "/";
    motionFlags.reduce = true;
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  it("renders the two latest posts in the desktop Resources menu", async () => {
    const user = userEvent.setup();
    render(<EditorialHeader latestBlogPosts={latestBlogPosts} />);

    expect(
      screen.getByRole("link", { name: "Sign Up Now" }),
    ).toBeInTheDocument();
    expect(document.querySelector(`.${styles.articleFade}`)).toBeNull();
    await user.click(screen.getByRole("button", { name: "Resources" }));

    expect(
      screen.getByRole("link", { name: /Newest operations guide/ }),
    ).toHaveAttribute("href", "/blog/newest-operations-guide");
    expect(
      screen.getByRole("link", { name: /A calmer approach to property work/ }),
    ).toHaveAttribute("href", "/blog/calmer-property-work");
    expect(
      screen.getByRole("img", { name: "Automation dashboard" }),
    ).toHaveAttribute("width", "720");
    expect(
      screen.getByRole("img", { name: "Automation dashboard" }),
    ).toHaveAttribute("height", "512");
    expect(
      screen.getByRole("link", { name: /View all posts/ }),
    ).toHaveAttribute("href", "/blog");
  });

  it("shows the sales banner in the desktop Portfolios menu", async () => {
    const user = userEvent.setup();
    render(<EditorialHeader />);

    await user.click(screen.getByRole("button", { name: "Portfolios" }));

    const banner = screen.getByRole("link", {
      name: /Interested in our product.*Talk to sales/i,
    });
    expect(banner).toHaveAttribute("href", "/contact");
    expect(within(banner).getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("ico-banner-real.png"),
    );
  });

  it("uses single-open mobile accordions and closes after navigation", async () => {
    const user = userEvent.setup();
    render(<EditorialHeader latestBlogPosts={latestBlogPosts} />);

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const overlay = document.getElementById("editorial-mobile-overlay");
    expect(overlay).not.toBeNull();
    expect(document.querySelector("header")).not.toHaveClass(styles.homeTop);
    expect(screen.getByRole("img", { name: "Innflow" })).toHaveAttribute(
      "src",
      expect.stringContaining("innflow_logo_set_B.svg"),
    );
    const mobile = within(overlay as HTMLElement);
    const product = mobile.getByRole("button", { name: "Product" });
    const resources = mobile.getByRole("button", { name: "Resources" });

    expect(product).toHaveAttribute("aria-expanded", "false");
    expect(resources).toHaveAttribute("aria-expanded", "false");
    expect(mobile.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(mobile.getByRole("link", { name: "Blog" })).toBeInTheDocument();
    expect(mobile.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
    expect(mobile.getByRole("link", { name: "Book a Demo" })).toHaveClass(
      styles.mobileDemoCta,
    );

    await user.click(resources);
    expect(resources).toHaveAttribute("aria-expanded", "true");
    expect(
      mobile.getByRole("link", { name: /Newest operations guide/ }),
    ).toBeInTheDocument();

    await user.click(product);
    expect(product).toHaveAttribute("aria-expanded", "true");
    expect(resources).toHaveAttribute("aria-expanded", "false");

    await user.click(product);
    expect(product).toHaveAttribute("aria-expanded", "false");
    await user.click(resources);
    await user.click(
      mobile.getByRole("link", { name: /Newest operations guide/ }),
    );
    expect(
      document.getElementById("editorial-mobile-overlay"),
    ).not.toBeInTheDocument();
  });

  it("uses the white logo on blog articles and hides the nav after scrolling down", () => {
    motionFlags.reduce = false;
    mockPathname.current = "/blog/ai-needs-humanity";
    render(<EditorialHeader />);

    const header = document.querySelector("header");
    expect(screen.getByRole("img", { name: "Innflow" })).toHaveAttribute(
      "src",
      expect.stringContaining("innflow_white_logo_set_bold.svg"),
    );
    expect(header).toHaveClass(styles.blogArticle);
    const fade = document.querySelector(`.${styles.articleFade}`);
    expect(fade).toBeInTheDocument();
    expect(fade).not.toHaveClass(styles.articleFadePinned);

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 240,
    });
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(header).toHaveClass(styles.headerHidden);
    expect(fade).toHaveClass(styles.articleFadePinned);
  });

  it("adds the solid surface after scrolling on non-home pages", () => {
    mockPathname.current = "/pricing";
    render(<EditorialHeader />);

    const header = document.querySelector("header");
    expect(header).toHaveClass(styles.pageTop);

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 1,
    });
    act(() => window.dispatchEvent(new Event("scroll")));

    expect(header).not.toHaveClass(styles.pageTop);
  });
});
