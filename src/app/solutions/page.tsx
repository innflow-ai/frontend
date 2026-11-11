import { BaselineClosing } from "@/app/preview/scroll-showcase/baseline-lower-sections";
import { IndustryDirectory } from "@/components/industry-pages/industry-directory";
import styles from "@/components/industry-pages/industry-pages.module.css";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Industries & Solutions | Innflow",
  description:
    "Explore AI workflow ideas for financial services, healthcare, retail, property management, technology and more. Find a starting point for your team.",
  path: "/solutions",
});
export default function SolutionsPage() {
  return (
    <ShowcaseTheme>
      <main id="main-content" className={styles.page}>
        <header className={styles.directoryHero}>
          <p className={styles.eyebrow}>Industries & solutions</p>
          <h1>
            Your industry.
            <br />
            Your way of working.
          </h1>
          <p>
            Connect the conversations, knowledge and handoffs behind your
            everyday work.
          </p>
        </header>
        <IndustryDirectory />
        <BaselineClosing />
      </main>
    </ShowcaseTheme>
  );
}
