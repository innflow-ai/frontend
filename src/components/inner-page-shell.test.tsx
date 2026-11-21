import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { InnerPageShell } from "./inner-page-shell";
import styles from "./site-shell.module.css";

afterEach(cleanup);

it("preserves the existing page styling and skip-link destination", () => {
  const { container } = render(
    <InnerPageShell>
      <h1>Inner page</h1>
    </InnerPageShell>,
  );
  expect(container.firstElementChild).toHaveClass(styles.page);
  expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  expect(screen.getByRole("main")).toContainElement(
    screen.getByRole("heading", { name: "Inner page" }),
  );
  expect(screen.getAllByRole("main")).toHaveLength(1);
});
