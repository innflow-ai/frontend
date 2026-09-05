import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { GoogleSignInButton } from "./google-sign-in";

// jsdom does not implement top-layer focus behavior; that is checked in Chrome.
const originalDialogMethods = Object.getOwnPropertyDescriptors(
  HTMLDialogElement.prototype,
);
beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    },
  });
});

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
  for (const method of ["showModal", "close"]) {
    if (originalDialogMethods[method])
      Object.defineProperty(
        HTMLDialogElement.prototype,
        method,
        originalDialogMethods[method],
      );
    else Reflect.deleteProperty(HTMLDialogElement.prototype, method);
  }
});

describe("Google sign-in dialog", () => {
  it("opens a modal and restores an existing scroll lock on dismissal", async () => {
    document.body.style.overflow = "hidden";
    const user = userEvent.setup();
    render(<GoogleSignInButton label="Log in" />);
    const trigger = screen.getByRole("button", { name: "Log in" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog")).toHaveAttribute("open");
    await user.click(screen.getByRole("button", { name: "Dismiss sign-in" }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("handles native Escape cancellation and unlocks a previously scrolling page", async () => {
    render(<GoogleSignInButton />);
    await userEvent.click(
      screen.getByRole("button", { name: "Sign in with Google" }),
    );
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { cancelable: true }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("restores scroll styles when unmounted while open", async () => {
    document.body.style.overflow = "clip";
    const { unmount } = render(<GoogleSignInButton />);
    await userEvent.click(
      screen.getByRole("button", { name: "Sign in with Google" }),
    );
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("clip");
  });

  it("honors a prevented trigger click", async () => {
    render(<GoogleSignInButton onClick={(event) => event.preventDefault()} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Sign in with Google" }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
