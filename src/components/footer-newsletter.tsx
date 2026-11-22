"use client";

import { type FormEvent, useState } from "react";
import styles from "./site-footer.module.css";

export function FooterNewsletter() {
  const [signupState, setSignupState] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [signupMessage, setSignupMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (signupState === "pending" || signupState === "success") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setSignupState("pending");
    setSignupMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          website: data.get("website"),
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "Signup failed. Please try again.");
      }
      setSignupState("success");
      setSignupMessage(
        "You’re on the list. Look out for Innflow updates and member offers in your inbox.",
      );
      form.reset();
    } catch (error) {
      setSignupState("error");
      setSignupMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "Signup failed. Please try again.",
      );
    }
  }

  return (
    <form
      className={styles.membershipSignup}
      aria-label="Innflow newsletter"
      aria-describedby="membership-signup-status"
      onSubmit={subscribe}
      aria-busy={signupState === "pending"}
    >
      {signupState !== "success" && (
        <>
          <div hidden aria-hidden="true">
            <label htmlFor="membership-website">Website</label>
            <input
              id="membership-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <fieldset
            disabled={signupState === "pending"}
            className={styles.membershipFields}
          >
            <label htmlFor="membership-email">Email address</label>
            <div className={styles.membershipInputRow}>
              <input
                id="membership-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="Enter your email"
                required
                maxLength={254}
              />
              <button data-site-cta="primary" type="submit">
                {signupState === "pending" ? "Signing up…" : "Sign up"}
              </button>
            </div>
          </fieldset>
        </>
      )}
      <div
        className={
          signupState === "success" ? styles.membershipSuccess : undefined
        }
        id="membership-signup-status"
        role="status"
        aria-live="polite"
      >
        {signupMessage}
      </div>
    </form>
  );
}
