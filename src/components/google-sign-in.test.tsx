import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { appendAttribution } from "@/lib/attribution";
import { GoogleSignInButton } from "./google-sign-in";

afterEach(cleanup);

it.each(["Continue with Google", "Log in", "Get started"])(
  "routes %s directly to signup with the workflow callback",
  (label) => {
    render(<GoogleSignInButton label={label} />);
    const link = screen.getByRole("link", { name: label });
    const signup = "https://app.innflow.ai/signup?callbackURL=%2Fworkflows";
    expect(link).toHaveAttribute("href", signup);
    expect(link).toHaveAttribute("data-marketing-destination", signup);
    expect(
      appendAttribution(
        link.getAttribute("href")!,
        new URLSearchParams({ landing_page: "/" }),
      ),
    ).toBe(signup + "&landing_page=%2F");
  },
);
