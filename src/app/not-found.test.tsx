import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import NotFound from "./not-found";

afterEach(cleanup);

it("offers useful recovery destinations without internal release terminology", () => {
  render(<NotFound />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "We couldn’t find that page.",
  );
  expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute(
    "href",
    "/",
  );
  expect(
    screen.getByRole("link", { name: "Explore products" }),
  ).toHaveAttribute("href", "/products");
  expect(screen.queryByText(/focused first release/)).not.toBeInTheDocument();
});
