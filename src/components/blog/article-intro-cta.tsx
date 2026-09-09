import { GoogleCtaContent } from "@/components/google-cta-content";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./article-intro-cta.module.css";

export function BlogArticleIntroCta() {
  return (
    <section className={styles.banner} aria-label="Explore Innflow">
      <h2>
        More time for your team.
        <br />
        Less time chasing tasks.
      </h2>
      <p>Bring your property operations into one connected flow.</p>
      <div className={styles.actions}>
        <TrackedLink
          className={styles.demo}
          destination={siteConfig.demoUrl}
          eventLabel="blog_intro_demo"
        >
          See demo <span aria-hidden="true">→</span>
        </TrackedLink>
        <TrackedLink
          destination={siteConfig.googleAuthUrl}
          eventLabel="blog_intro_google_signup"
        >
          <GoogleCtaContent />
        </TrackedLink>
      </div>
    </section>
  );
}
