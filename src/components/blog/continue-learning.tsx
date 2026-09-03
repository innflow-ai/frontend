import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import type { BlogPostSummary } from "@/lib/sanity";
import styles from "./article.module.css";

export function BlogContinueLearning({
  nextPost,
}: {
  nextPost: BlogPostSummary | null;
}) {
  return (
    <section className={styles.continue} aria-labelledby="continue-learning">
      <p className={styles.metaLabel}>Continue learning</p>
      <h2 id="continue-learning">
        {nextPost
          ? "Keep going with the next field note."
          : "See how Innflow runs the operation."}
      </h2>
      <p>
        {nextPost
          ? nextPost.title
          : "Bring one workflow and the systems it touches. We’ll show the path from request to done."}
      </p>
      <div className={styles.continueActions}>
        {nextPost ? (
          <a className={styles.ctaButton} href={`/blog/${nextPost.slug}`}>
            Read next: {nextPost.title}
          </a>
        ) : null}
        <TrackedLink
          className={nextPost ? styles.ctaGhost : styles.ctaButton}
          destination={siteConfig.demoUrl}
          eventLabel="blog_continue_learning_demo"
        >
          {siteConfig.primaryCta}
        </TrackedLink>
      </div>
    </section>
  );
}
