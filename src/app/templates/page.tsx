import Link from "next/link";
import { templateCollections } from "@/content/workflow-templates";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../connections/page.module.css";

export const metadata = createPageMetadata({
  title: "Workflow templates | Innflow",
  description:
    "Browse reusable task briefs for agents and flows, with inputs and review checkpoints.",
  path: "/templates",
});
export default function Page() {
  return (
    <main id="main-content" className={styles.directory}>
      <header className={styles.intro}>
        <h1>Workflow templates</h1>
        <p>Start with a brief you can adapt to the way your team works.</p>
      </header>
      <div className={styles.groups}>
        {templateCollections.map((c) => (
          <section className={styles.group} key={c.slug}>
            <h2>
              <Link href={`/templates/${c.slug}`}>{c.name}</Link>
            </h2>
            <p>{c.description}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
