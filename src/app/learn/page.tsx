import Link from "next/link";
import { evaluationGuides } from "@/content/evaluation-guides";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../connections/page.module.css";

export const metadata = createPageMetadata({
  title: "Learn about AI models and team workflows | Innflow",
  description:
    "Compare model outputs, try a coding or research task, and choose how your team works with AI.",
  path: "/learn",
});

const topics = [
  {
    title: "Compare model outputs",
    slugs: [
      "gpt-6-2-sol-vs-astra",
      "qwen4-max-workflow-cost",
      "qwen4-max-preview-comparison",
      "gemini-4-hydrogen-test",
      "seedream-product-edit",
      "seedream-5-5-vs-gpt-image-2-6",
    ],
  },
  {
    title: "Build with DeepSeek",
    slugs: [
      "deepseek-app-capabilities",
      "deepseek-app-api",
      "deepseek-usage-limits",
      "deepseek-for-coding",
      "deepseek-harness-plugins",
      "deepseek-harness-creator-mode",
      "deepseek-super-agent-design",
      "testing-deepseek-super-agent",
    ],
  },
  {
    title: "Work together",
    slugs: [
      "discord-for-teams",
      "discord-nitro",
      "claim-your-business-in-chatgpt",
    ],
  },
];

export default function LearnPage() {
  return (
    <main className={styles.directory} id="main-content">
      <header className={styles.intro}>
        <Link href="/resources">Resource library</Link>
        <h1>Learn</h1>
        <p>
          Pick a question your team is working through. Each guide gives you a
          task to try and a way to judge the result.
        </p>
      </header>
      <div className={styles.groups}>
        {topics.map(({ title, slugs }) => (
          <section key={title} className={styles.group}>
            <h2>{title}</h2>
            <ul>
              {slugs.map((slug) => {
                const guide = evaluationGuides.find(
                  (entry) => entry.slug === slug,
                );
                return (
                  guide && (
                    <li key={slug}>
                      <Link href={`/resources/guides/${slug}`}>
                        {guide.title}
                      </Link>
                    </li>
                  )
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
