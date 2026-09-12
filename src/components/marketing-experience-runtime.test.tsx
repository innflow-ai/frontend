import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MarketingExperienceRuntime } from "./marketing-experience-runtime";

afterEach(() => vi.unstubAllGlobals());
describe("consistent experience navigation", () => {
  it("intercepts navigation before a client router can reuse a prefetched variant", () => {
    const assign = vi.fn();
    const router = vi.fn();
    vi.stubGlobal("location", {
      href: "https://innflow.ai/",
      origin: "https://innflow.ai",
      pathname: "/",
      search: "",
      assign,
    });
    render(
      <>
        <MarketingExperienceRuntime />
        <a
          href="/BL/BL-pricing?utm_source=test"
          onClick={(event) => {
            if (!event.defaultPrevented) router();
          }}
        >
          Pricing
        </a>
      </>,
    );
    fireEvent.click(screen.getByText("Pricing"));
    expect(assign).toHaveBeenCalledWith(
      "https://innflow.ai/pricing?utm_source=test",
    );
    expect(router).not.toHaveBeenCalled();
  });
  it("leaves same-document consent and anchor controls alone", () => {
    const assign = vi.fn();
    const open = vi.fn();
    vi.stubGlobal("location", {
      href: "https://innflow.ai/",
      origin: "https://innflow.ai",
      pathname: "/",
      search: "",
      assign,
    });
    render(
      <>
        <MarketingExperienceRuntime />
        {/* biome-ignore lint/a11y/useValidAnchor: Reproduces the existing third-party consent link. */}
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            open();
          }}
        >
          Consent preferences
        </a>
      </>,
    );
    fireEvent.click(screen.getByText("Consent preferences"));
    expect(open).toHaveBeenCalledOnce();
    expect(assign).not.toHaveBeenCalled();
  });
});
