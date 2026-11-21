import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import IntegrationsError from "./error";

afterEach(cleanup);

it("requests fresh route data when retrying an integration load failure", async () => {
  const retry = vi.fn();
  render(<IntegrationsError retry={retry} />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "We couldn’t load the integrations",
  );
  await userEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(retry).toHaveBeenCalledExactlyOnceWith();
  expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
});
