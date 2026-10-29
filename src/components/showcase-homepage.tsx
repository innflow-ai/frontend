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

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-homepage-heading",
  display: "swap",
});

export async function ShowcaseHomepage() {
  const stories = await getPageTestimonials("/");
  return (
    <main
      id="main-content"
      className={`${styles.page} ${instrumentSans.variable} ${typography.headings}`}
    >
      <ScrollShowcase />
      <ShowcaseTheme>
        <WorkspaceOverview />
        <HomepageAgentShowcase />
        <HomepageCollaboration />
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

import { Instrument_Sans } from "next/font/google";
