"use client";
import { ArrowRight } from "@phosphor-icons/react";
import { type FormEvent, useState } from "react";
import { siteConfig } from "@/config/site";
import { GoogleCtaContent } from "./google-cta-content";
import styles from "./site-shell.module.css";
import { TrackedLink } from "./tracked-link";
export function SiteCta() {
  const [signupState, setSignupState] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [signupMessage, setSignupMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (signupState === "pending") return;
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
      setSignupMessage("You’re on the list. Thanks for signing up!");
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
    <div className={styles.page}>
      <div className={styles.closingWrap}>
        <section className={styles.closing}>
          <h2>
            A clearer day starts
            <br className={styles.mobileBreak} /> with a connected flow.
          </h2>
          <p>Bring your team, context, and next steps together.</p>
          <div className={styles.actions}>
            <a className={styles.outlineButton} href={siteConfig.demoUrl}>
              See demo <ArrowRight size={18} />
            </a>
            <TrackedLink
              className={styles.darkButton}
              destination={siteConfig.googleAuthUrl}
              eventLabel="baselane_closing_signup"
            >
              <GoogleCtaContent />
            </TrackedLink>
          </div>
          <form
            className={styles.membershipSignup}
            aria-labelledby="membership-signup-heading"
            aria-describedby="membership-signup-status"
            onSubmit={subscribe}
            aria-busy={signupState === "pending"}
          >
            <h3 id="membership-signup-heading">
              A little more, just for members.
            </h3>
            <p>Get Innflow updates and member offers by email.</p>
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
                <button type="submit">
                  {signupState === "pending" ? "Signing up…" : "Sign up now"}{" "}
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </fieldset>
            <small>
              By signing up, you agree to receive marketing emails from Innflow.
              Unsubscribe anytime.{" "}
              <a href="/legal/privacy-policy">Privacy policy</a>
            </small>
            <small
              id="membership-signup-status"
              role="status"
              aria-live="polite"
            >
              {signupMessage}
            </small>
          </form>
        </section>
      </div>
    </div>
  );
}
