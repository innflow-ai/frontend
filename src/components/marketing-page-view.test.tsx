import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MarketingPageView } from "./marketing-page-view";

const navigation = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
}));

afterEach(() => {
  cleanup();
  navigation.pathname = "/";
  Reflect.deleteProperty(window, "gtag");
});

describe("MarketingPageView", () => {
  it("leaves the first document view to GTM and sends one page_view on the next route", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    navigation.pathname = "/";
    const view = render(<MarketingPageView />);
    expect(gtag).not.toHaveBeenCalled();

    navigation.pathname = "/pricing";
    view.rerender(<MarketingPageView />);

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_path: "/pricing",
        send_to: "G-V8ZV0QLZB7",
      }),
    );

    view.rerender(<MarketingPageView />);
    expect(gtag).toHaveBeenCalledTimes(1);
  });
});
