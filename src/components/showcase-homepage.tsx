import { Source_Serif_4 } from "next/font/google";
import { BaselineFeatures } from "@/app/preview/scroll-showcase/baseline-features";
import {
  BaselineClosing,
  BaselineConnectedInfrastructure,
  BaselineCustomerStories,
} from "@/app/preview/scroll-showcase/baseline-lower-sections";
import styles from "@/app/preview/scroll-showcase/homepage.module.css";
import { ScrollShowcase } from "@/app/preview/scroll-showcase/scroll-showcase";
import { WorkspaceOverview } from "@/app/preview/scroll-showcase/workspace-overview";
import { HomepageCollaboration } from "@/components/collaboration";
import { HomepageAgentShowcase } from "@/components/homepage-agent-showcase";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { getPageTestimonials } from "@/lib/testimonials";
import typography from "./homepage-typography.module.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-homepage-heading",
  display: "swap",
});

export async function ShowcaseHomepage() {
  const stories = await getPageTestimonials("/");
  return (
    <main
      id="main-content"
      className={`${styles.page} ${sourceSerif.variable} ${typography.headings}`}
    >
      <ScrollShowcase />
      <ShowcaseTheme>
        <WorkspaceOverview />
        <HomepageAgentShowcase />
        <BaselineFeatures />
        <BaselineCustomerStories
          testimonials={stories.testimonials}
          heading={stories.heading}
          previewFallback
        />
        <HomepageCollaboration />
        <BaselineConnectedInfrastructure />
        <BaselineClosing />
      </ShowcaseTheme>
    </main>
  );
}
