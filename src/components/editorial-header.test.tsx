import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import { EditorialHeader } from "./editorial-header";
import styles from "./editorial-header.module.css";
import { SiteHeader } from "./site-header";

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

describe("EditorialHeader navigation", () => {
  it("orders the menus before Pricing and groups resource links by purpose", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const nav = within(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    );
    expect(
      nav.getAllByRole("button").map((button) => button.textContent),
    ).toEqual(["Product", "Models", "Solutions", "Resources"]);
    await user.click(nav.getByRole("button", { name: "Resources" }));
    for (const name of ["Learn", "Explore", "Get help"])
      expect(await nav.findByRole("heading", { name })).toBeVisible();
    expect(nav.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
    expect(nav.getAllByRole("link", { name: /View more/ })).toHaveLength(3);
  });

  it("shares the homepage accordion with BL and restores scrolling on Escape", async () => {
    const user = userEvent.setup();
    render(
      <>
        <SiteHeader />
        <BaselaneHomepage>
          <p>BL page content</p>
        </BaselaneHomepage>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const navigation = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });
    expect(document.body.style.overflow).toBe("hidden");
    expect(
      within(navigation).getByRole("link", { name: "Pricing" }),
    ).toHaveAttribute("href", "/pricing");
    expect(
      within(navigation).getByRole("link", { name: "Sign in" }),
    ).toHaveAttribute("href", siteConfig.loginUrl);
    expect(
      screen.queryByRole("link", { name: "Book a demo" }),
    ).not.toBeInTheDocument();
    expect(
      within(navigation).queryByText("Landlord login"),
    ).not.toBeInTheDocument();
    expect(
      within(navigation).queryByText("Tenant login"),
    ).not.toBeInTheDocument();
    await user.click(
      within(navigation).getByRole("button", { name: "Product" }),
    );
    expect(
      within(navigation).getByRole("region", { name: "Product mobile menu" }),
    ).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(
      within(
        screen.getByRole("navigation", { name: "Mobile navigation" }),
      ).getByRole("button", { name: "Product" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

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

  it("opens the seven feature previews under Product and preserves the product directory", async () => {
    const user = userEvent.setup();
    render(<EditorialHeader />);
    await user.click(screen.getByRole("button", { name: "Product" }));
    expect(screen.getAllByRole("tab")).toHaveLength(7);
    expect(
      screen.getByRole("link", { name: /Browse all products/ }),
    ).toHaveAttribute("href", "/products");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("region", { name: "Product menu" })).toBeNull();
  });

  it("shows the Figma model directory and preserves the header controls", async () => {
    const user = userEvent.setup();
    render(<EditorialHeader />);

    expect(
      screen.getByRole("link", { name: "Continue with Google" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Log in" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Get started" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Sign Up Now" }),
    ).not.toBeInTheDocument();
    expect(document.querySelector(`.${styles.articleFade}`)).toBeNull();
    expect(document.querySelector(`.${styles.articleBottomFade}`)).toBeNull();
    await user.click(screen.getByRole("button", { name: "Models" }));
    const directory = within(
      screen.getByRole("region", { name: "Models menu" }),
    );
    expect(directory.getAllByRole("heading")).toHaveLength(9);
    expect(directory.queryByRole("heading", { name: "ByteDance" })).toBeNull();
    for (const model of [
      "Grok 4.7", "Grok 4.6",
      "Claude Fable 5.2", "Claude Opus 5.5", "Claude Sonnet 5.5", "Claude Haiku 5.5",
      "DeepSeek V4.1 Flash 1017", "DeepSeek V4 Pro 0813",
      "GLM-5.3", "GLM-5.3-Flash", "GLM-5.3-FlashX",
    ]) {
      expect(directory.getByText(model)).toBeVisible();
    }
  });

  it("replaces the property portfolio menu with industry solutions", async () => {
    const user = userEvent.setup();
    render(<EditorialHeader />);
    expect(
      screen.queryByRole("button", { name: "Portfolios" }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Solutions" }));
    expect(screen.getByRole("link", { name: /^Finance/ })).toHaveAttribute(
      "href",
      "/industries/finance",
    );
    expect(
      screen.queryByRole("link", { name: /^Rent Collection/ }),
    ).not.toBeInTheDocument();
  });

  it("uses single-open mobile accordions and closes after navigation", async () => {
    const user = userEvent.setup();
    render(<EditorialHeader />);

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const overlay = document.getElementById("editorial-mobile-overlay");
    expect(overlay).not.toBeNull();
    expect(document.querySelector("header")).not.toHaveClass(styles.homeTop);
    expect(document.querySelector("header")).toHaveClass(styles.menuOpen);
    expect(screen.getByRole("img", { name: "Innflow" })).toHaveAttribute(
      "src",
      expect.stringContaining("innflow-nav-wordmark.svg"),
    );
    const mobile = within(overlay as HTMLElement);
    const product = mobile.getByRole("button", { name: "Product" });
    const resources = mobile.getByRole("button", { name: "Resources" });

    expect(product).toHaveAttribute("aria-expanded", "false");
    expect(resources).toHaveAttribute("aria-expanded", "false");
    expect(mobile.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(mobile.queryByRole("link", { name: "Blog" })).toBeNull();
    expect(
      mobile.getByRole("link", { name: "Continue with Google" }),
    ).toHaveClass(styles.mobileCta);
    expect(
      mobile.queryByRole("link", { name: "Sign Up" }),
    ).not.toBeInTheDocument();
    expect(
      mobile.queryByRole("button", { name: "Sign in with Google" }),
    ).not.toBeInTheDocument();
    expect(
      mobile.queryByRole("link", { name: "Book a Demo" }),
    ).not.toBeInTheDocument();

    await user.click(resources);
    expect(resources).toHaveAttribute("aria-expanded", "true");
    expect(mobile.getByRole("link", { name: "Blog" })).toBeInTheDocument();

    await user.click(product);
    expect(product).toHaveAttribute("aria-expanded", "true");
    expect(resources).toHaveAttribute("aria-expanded", "false");

    await user.click(product);
    expect(product).toHaveAttribute("aria-expanded", "false");
    await user.click(resources);
    await user.click(mobile.getByRole("link", { name: "Blog" }));
    expect(
      document.getElementById("editorial-mobile-overlay"),
    ).not.toBeInTheDocument();
  });

  it("keeps article chrome light before hiding and when revealed", () => {
    motionFlags.reduce = false;
    mockPathname.current = "/blog/ai-needs-humanity";
    render(<EditorialHeader />);

    const header = document.querySelector("header");
    expect(screen.getByRole("img", { name: "Innflow" })).toHaveAttribute(
      "src",
      expect.stringContaining("innflow-nav-wordmark.svg"),
    );
    expect(header).not.toHaveClass(styles.homeTop);
    expect(header).not.toHaveClass(styles.pageTop);
    expect(header).toHaveClass(styles.articleHeader);
    expect(
      document.querySelector(`.${styles.articleFade}`),
    ).not.toBeInTheDocument();
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 240,
    });
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(header).toHaveClass(styles.headerHidden);
    expect(header).not.toHaveClass(styles.homeTop);

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 180,
    });
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(header).not.toHaveClass(styles.headerHidden);
    expect(header).not.toHaveClass(styles.homeTop);

    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(header).not.toHaveClass(styles.homeTop);
    expect(header).not.toHaveClass(styles.headerHidden);
  });

  it("keeps articles light even when animation frames are delayed", () => {
    mockPathname.current = "/blog/ai-needs-humanity";
    // Reduced motion disables hiding, but must not disable the solid fallback.
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn(() => 1),
    );
    render(<EditorialHeader />);
    const header = document.querySelector("header");
    expect(header).not.toHaveClass(styles.homeTop);
    Object.defineProperty(window, "scrollY", { configurable: true, value: 1 });
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(header).not.toHaveClass(styles.homeTop);
    expect(header).not.toHaveClass(styles.headerHidden);
  });

  it("initializes the solid surface on a restored subpage scroll position", () => {
    mockPathname.current = "/blog/ai-needs-humanity";
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 240,
    });
    render(<EditorialHeader />);
    expect(document.querySelector("header")).not.toHaveClass(styles.homeTop);
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

  it("uses an opaque light bar and dark chrome when the mobile menu opens on a blog article", async () => {
    const user = userEvent.setup();
    mockPathname.current = "/blog/ai-needs-humanity";
    render(<EditorialHeader />);

    expect(screen.getByRole("img", { name: "Innflow" })).toHaveAttribute(
      "src",
      expect.stringContaining("innflow-nav-wordmark.svg"),
    );

    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const header = document.querySelector("header");
    expect(header).toHaveClass(styles.menuOpen);
    expect(header).not.toHaveClass(styles.homeTop);
    expect(screen.getByRole("img", { name: "Innflow" })).toHaveAttribute(
      "src",
      expect.stringContaining("innflow-nav-wordmark.svg"),
    );
    expect(
      screen
        .getByRole("button", { name: "Close navigation" })
        .querySelector("svg path"),
    ).toHaveAttribute("stroke", "currentColor");
  });

  it("keeps the blog index on the transparent dark-chrome default", () => {
    mockPathname.current = "/blog";
    render(<EditorialHeader />);

    const header = document.querySelector("header");
    expect(header).toHaveClass(styles.pageTop);
    expect(header).not.toHaveClass(styles.homeTop);
    expect(screen.getByRole("img", { name: "Innflow" })).toHaveAttribute(
      "src",
      expect.stringContaining("innflow-nav-wordmark.svg"),
    );
  });
});

describe("SiteHeader mega-menu destinations", () => {
  beforeEach(() => {
    mockPathname.current = "/";
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  const namedItems: Array<[string, string]> = [
    ["Customer Service", "/industries/customer-service"],
    ["Finance", "/industries/finance"],
    ["Operations", "/operations"],
    ["Slack", "/integrations/slack"],
  ];

  afterEach(() => cleanup());

  it("uses specific routes for named items on desktop and mobile", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Solutions" }));
    const desktop = screen.getByRole("group", { name: "Solutions" });
    for (const [title, href] of namedItems) {
      expect(
        await within(desktop).findByRole("link", {
          name: new RegExp(`^${title}`),
        }),
      ).toHaveAttribute("href", href);
      expect(href).not.toBe("/property-management");
      expect(href).not.toBe("/products/agent-os");
    }
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const mobile = within(
      await screen.findByRole("navigation", { name: "Mobile navigation" }),
    );
    await user.click(mobile.getByRole("button", { name: "Solutions" }));
    for (const [title, href] of namedItems) {
      expect(
        mobile.getByRole("link", { name: new RegExp(`^${title}`) }),
      ).toHaveAttribute("href", href);
    }
  });
});
