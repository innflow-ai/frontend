import { BaselineFeatures } from "@/app/preview/scroll-showcase/baseline-features";
import {
  BaselineClosing,
  BaselineConnectedInfrastructure,
  BaselineCustomerStories,
} from "@/app/preview/scroll-showcase/baseline-lower-sections";
import styles from "@/app/preview/scroll-showcase/homepage.module.css";
import { ScrollShowcase } from "@/app/preview/scroll-showcase/scroll-showcase";
import { WorkspaceOverview } from "@/app/preview/scroll-showcase/workspace-overview";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { getPageTestimonials } from "@/lib/testimonials";

export async function ShowcaseHomepage() {
  const stories = await getPageTestimonials("/");
  return (
    <main id="main-content" className={styles.page}>
      <ScrollShowcase />
      <ShowcaseTheme>
        <WorkspaceOverview />
        <BaselineFeatures />
        <BaselineCustomerStories
          testimonials={stories.testimonials}
          heading={stories.heading}
          previewFallback
        />
        <BaselineConnectedInfrastructure />
        <BaselineClosing />
      </ShowcaseTheme>
    </main>
  );
}
