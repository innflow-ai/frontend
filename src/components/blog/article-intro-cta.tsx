import { GoogleCtaContent } from "@/components/google-cta-content";
import { ArrowRight as MageArrowRight } from "@/components/icons/mage";
import { MixedHeadingText } from "@/components/mixed-heading-text";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/config/site";
import styles from "./article-intro-cta.module.css";

export function BlogArticleIntroCta({
  category,
}: {
  category?: string | null;
}) {
  const property = category === "property-management";
  const agents = category === "ai-agent";
  const integrations = category === "integrations";
  const resource = property
    ? { label: "Explore property management", href: "/property-management" }
    : agents
      ? { label: "Explore AI agents", href: "/products/ai-agents" }
      : integrations
        ? { label: "Browse integrations", href: "/integrations" }
        : { label: "Explore workflows", href: "/features/workflows" };
  return (
    <section className={styles.banner} aria-label="Explore Innflow">
      <h2 data-mixed-heading>
        <MixedHeadingText>
          More time for your team.
          <br />
          Less time chasing tasks.
        </MixedHeadingText>
      </h2>
      <p>
        {property
          ? "Bring your property operations into one connected flow."
          : "Connect the tools, tasks, and people behind your team’s daily work."}
      </p>
      <div className={styles.actions}>
        <TrackedLink
          data-site-cta="secondary"
          className={styles.demo}
          destination={resource.href}
          eventLabel="blog_intro_product"
        >
          {resource.label}{" "}
          <span aria-hidden="true">
            <MageArrowRight size="1em" />
          </span>
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
