import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { FaqList, MarketingPage } from "@/components/page-primitives";
import { SkillsLibrary } from "@/components/skills-library";
import { getProductFaqs } from "@/content/product-faqs";
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
  const faqs = getProductFaqs("skills");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <MarketingPage>
      <section className={styles.hero}>
        <div className="shell">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Skills" }]}
          />
          <span className="section-label">Agent skills library</span>
          <h1>Ready-made skills your agents can run today.</h1>
          <p className={styles.heroSubline}>
            A library of reusable agent skills across communication, finance,
            HR, marketing, operations, and more. Pick a skill, point it at your
            systems, and let your agents do the repetitive work.
          </p>
        </div>
      </section>
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
      <section className={`section faq-section ${styles.faq}`} id="faq">
        <div className="shell faq-layout">
          <div className="faq-intro">
            <span className="section-label">FAQ</span>
            <h2>Questions about agent skills.</h2>
            <p>
              What a skill is, how review works, and how skills use the systems
              you already run.
            </p>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
      <JsonLd value={faqSchema} />
    </MarketingPage>
  );
}
