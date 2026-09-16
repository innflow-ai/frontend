import { Geist, Manrope, Source_Serif_4 } from "next/font/google";
import { createPageMetadata } from "@/lib/metadata";
import { getPageTestimonials } from "@/lib/testimonials";
import { BaselineFeatures } from "./baseline-features";
import {
  BaselineClosing,
  BaselineConnectedInfrastructure,
  BaselineCustomerStories,
} from "./baseline-lower-sections";
import baselineStyles from "./baseline-shell.module.css";
import styles from "./homepage.module.css";
import { ScrollShowcase } from "./scroll-showcase";
import { WorkspaceOverview } from "./workspace-overview";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
});

export const metadata = createPageMetadata({
  title: "Homepage preview | Innflow",
  description:
    "Explore the Innflow homepage design, feature stories and interactive states.",
  path: "/preview/scroll-showcase",
  noIndex: true,
});

export default async function ScrollShowcasePage() {
  const stories = await getPageTestimonials("/");
  return (
    <main id="main-content" className={styles.page}>
      <ScrollShowcase />
      <div
        className={`${geist.variable} ${manrope.variable} ${sourceSerif.variable} ${baselineStyles.shell}`}
        data-homepage-baseline="350:10858"
      >
        <WorkspaceOverview />
        <BaselineFeatures />
        <BaselineCustomerStories
          testimonials={stories.testimonials}
          heading={stories.heading}
        />
        <BaselineConnectedInfrastructure />
        <BaselineClosing />
      </div>
    </main>
  );
}
