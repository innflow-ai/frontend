import { BaselineClosing } from "@/app/preview/scroll-showcase/baseline-closing";
import { BaselineFeatures } from "@/app/preview/scroll-showcase/baseline-features";
import {
  BaselineConnectedInfrastructure,
  BaselineCustomerStories,
} from "@/app/preview/scroll-showcase/baseline-lower-sections";
import styles from "@/app/preview/scroll-showcase/homepage.module.css";
import { ScrollShowcase } from "@/app/preview/scroll-showcase/scroll-showcase";
import { SHOW_TESTIMONIAL } from "@/app/preview/scroll-showcase/testimonial-visibility";
import { WorkspaceOverview } from "@/app/preview/scroll-showcase/workspace-overview";
import { HomepageCollaboration } from "@/components/collaboration";
import { HomepageAgentShowcase } from "@/components/homepage-agent-showcase";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { getPageTestimonials } from "@/lib/testimonials";
import typography from "./homepage-typography.module.css";

export async function ShowcaseHomepage({
  previewFallback = false,
}: {
  previewFallback?: boolean;
}) {
  const stories = SHOW_TESTIMONIAL ? await getPageTestimonials("/") : null;
  return (
    <main id="main-content" className={`${styles.page} ${typography.headings}`}>
      <ScrollShowcase />
      <ShowcaseTheme>
        <WorkspaceOverview />
        <HomepageCollaboration />
        <BaselineFeatures />
        {stories && (
          <BaselineCustomerStories
            testimonials={stories.testimonials}
            heading={stories.heading}
            previewFallback={previewFallback}
          />
        )}
        <HomepageAgentShowcase />
        <BaselineConnectedInfrastructure />
        <BaselineClosing />
      </ShowcaseTheme>
    </main>
  );
}
