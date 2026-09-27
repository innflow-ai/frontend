import type { Metadata } from "next";
import { CalendlyProductPage } from "@/components/calendly-product-page";
import { SkillsLibrary } from "@/components/skills-library";
import { getProductFaqs } from "@/content/product-faqs";
import { getPageFaqs } from "@/lib/faqs";
import { createPageMetadata } from "@/lib/metadata";
import { getSkillCategories, getSkills } from "@/lib/skills";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata: Metadata = createPageMetadata({
  title: "Agent Skills Library | Innflow",
  description:
    "Browse 300+ ready-made agent skills for property operations, finance, HR, marketing, and more — each one a reusable workflow your AI agents can run.",
  path: "/skills",
});

export default async function SkillsIndexPage() {
  const [skills, categories] = await Promise.all([
    getSkills(),
    getSkillCategories(),
  ]);
  const { items: faqs, heading: faqHeading } = await getPageFaqs(
    "/skills",
    getProductFaqs("skills"),
  );

  return (
    <CalendlyProductPage
      content={{
        path: "/skills",
        name: "Agent Skills",
        title: "Start with a skill. Make it your own.",
        description:
          "Find a starting point for the work your team repeats. Explore skills for communication, finance, marketing, and property operations, then adapt the tools and review steps to your process.",
        faqs,
        faqDescription:
          "What a skill is, how review works, and how skills use the systems you already run.",
        faqHeading: faqHeading || "Questions about agent skills.",
      }}
    >
      <section className={styles.listing}>
        <div className="shell">
          {skills.length === 0 ? (
            <div className={styles.empty}>
              <p>No skills yet. The agent skills library is on the way.</p>
            </div>
          ) : (
            <SkillsLibrary skills={skills} categories={categories} />
          )}
        </div>
      </section>
    </CalendlyProductPage>
  );
}
