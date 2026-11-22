import Link from "next/link";
import { planningTools } from "@/content/planning-tools";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../connections/page.module.css";

export const metadata = createPageMetadata({
  title: "Planning tools | Innflow",
  description:
    "Calculate a stock threshold, plan campaign spend or draft a sales follow-up.",
  path: "/tools",
});
export default function Page() {
  return (
    <main id="main-content" className={styles.directory}>
      <header className={styles.intro}>
        <h1>Planning tools</h1>
        <p>Work through a decision with your own numbers and notes.</p>
      </header>
      <div className={styles.groups}>
        {planningTools.map((tool) => (
          <section className={styles.group} key={tool.slug}>
            <h2>
              <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
            </h2>
            <p>{tool.description}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
