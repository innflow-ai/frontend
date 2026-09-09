"use client";
import { ArrowRight } from "@phosphor-icons/react";
import { siteConfig } from "@/config/site";
import styles from "./baselane-homepage.module.css";
import { GoogleCtaContent } from "./google-cta-content";
import { TrackedLink } from "./tracked-link";
export function SiteCta() {
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
            onSubmit={(event) => event.preventDefault()}
          >
            <h3 id="membership-signup-heading">
              A little more, just for members.
            </h3>
            <p>Sign up for exclusive membership rewards.</p>
            <fieldset disabled className={styles.membershipFields}>
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
                />
                <button type="submit">
                  Sign up now <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </fieldset>
            <small id="membership-signup-status">
              Email signup is coming soon.{" "}
              <a href="/BL/BL-privacy-policy">Privacy policy</a>
            </small>
          </form>
        </section>
      </div>
    </div>
  );
}
