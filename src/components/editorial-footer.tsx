import Image from "next/image";
import { ThemeSwitcher } from "@/components/blog/theme-switcher";
import { CustomerSupportHours } from "@/components/customer-support-hours";
import { GoogleSignInButton } from "@/components/google-sign-in";
import { TrackedLink } from "@/components/tracked-link";
import { footerNavigation } from "@/config/footer-navigation";
import { siteConfig } from "@/config/site";
import styles from "./editorial-footer.module.css";
import { FooterLegalLinks } from "./footer-legal-links";

export function EditorialFooter() {
  return (
    <>
      <section
        className={styles.signupSection}
        aria-labelledby="footer-signup-heading"
      >
        <div className={`${styles.shell} ${styles.signupPanel}`}>
          <Image
            src="/brand/property-operations-one-flow.webp"
            alt=""
            fill
            quality={100}
            sizes="(max-width: 720px) calc(100vw - 32px), min(calc(100vw - 48px), 1200px)"
            className={styles.signupImage}
          />
          <div className={styles.signupOverlay} aria-hidden="true" />
          <div className={styles.signupContent}>
            <p className={styles.signupEyebrow}>One suite. Every operation.</p>
            <h2 id="footer-signup-heading">
              Bring your property operations into one flow.
            </h2>
            <p className={styles.signupCopy}>
              Continue with your Google account to get started with Innflow.
            </p>
            <div className={styles.signupForm}>
              <GoogleSignInButton
                label="Continue with Google"
                eventLabel="footer_signup_google"
              />
            </div>
            <p className={styles.signupNote}>No credit card required.</p>
          </div>
        </div>
      </section>
      <footer className={styles.footer} id="resources">
        <div className={`${styles.shell} ${styles.grid}`}>
          <div className={styles.brand}>
            <Image
              src="/brand/innflow_white_logo_set_bold.svg"
              alt="Innflow"
              width={135}
              height={28}
            />
            <p>
              The all-in-one property operations layer for connected workflows,
              visible decisions, and human control.
            </p>
            <div className={styles.brandLinks}>
              <TrackedLink
                destination={siteConfig.demoUrl}
                eventLabel="footer_demo"
              >
                Book a demo
              </TrackedLink>
              <GoogleSignInButton eventLabel="footer_login" label="Log in" />
            </div>
            <ThemeSwitcher className={styles.themeToggle} showLabel />
            <CustomerSupportHours />
          </div>
          {footerNavigation.map((column) => (
            <div key={column.heading}>
              <strong>{column.heading}</strong>
              {column.links.map((link) => (
                <a key={`${link.label}-${link.href}`} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className={`${styles.shell} ${styles.bottom}`}>
          <span>
            © {new Date().getFullYear()} Innflow. All rights reserved.
          </span>
          <nav className={styles.legalLinks} aria-label="Legal">
            <FooterLegalLinks />
          </nav>
          <span className={styles.tagline}>
            Property operations, connected.
          </span>
        </div>
      </footer>
    </>
  );
}
