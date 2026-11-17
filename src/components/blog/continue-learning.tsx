import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./article.module.css";

export function BlogContinueLearning() {
  return (
    <section className={styles.continue} aria-label="Continue">
      <TrackedLink
        data-site-cta="primary"
        className={styles.continueButton}
        destination={siteConfig.signupUrl}
        eventLabel="blog_continue_signup"
      >
        Continue
      </TrackedLink>
    </section>
  );
}
