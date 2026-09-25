import { BaselineFeatures } from "@/app/preview/scroll-showcase/baseline-features";
import {
  BaselineClosing,
  BaselineConnectedInfrastructure,
} from "@/app/preview/scroll-showcase/baseline-lower-sections";
import styles from "@/app/preview/scroll-showcase/homepage.module.css";
import { ScrollShowcase } from "@/app/preview/scroll-showcase/scroll-showcase";
import { WorkspaceOverview } from "@/app/preview/scroll-showcase/workspace-overview";
import { ShowcaseTheme } from "@/components/showcase-theme";
// Temporarily disabled while Sanity billing is resolved. Restore these imports,
// the async data fetch, and the section below to re-enable homepage testimonials.
// import { BaselineCustomerStories } from "@/app/preview/scroll-showcase/baseline-lower-sections";
// import { getPageTestimonials } from "@/lib/testimonials";

export function ShowcaseHomepage() {
  // const stories = await getPageTestimonials("/");
  return (
    <main id="main-content" className={styles.page}>
      <ScrollShowcase />
      <ShowcaseTheme>
        <WorkspaceOverview />
        <BaselineFeatures />
        {/* <BaselineCustomerStories
          testimonials={stories.testimonials}
          heading={stories.heading}
          previewFallback
        /> */}
        <BaselineConnectedInfrastructure />
        <BaselineClosing />
      </ShowcaseTheme>
    </main>
  );
}
