import Link from "next/link";
import { evaluationGuides } from "@/content/evaluation-guides";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../../connections/page.module.css";

export const metadata = createPageMetadata({
  title: "Software evaluation guides | Innflow",
  description:
    "Test team chat, AI agents and workflow tools on a task your team already understands.",
  path: "/resources/guides",
});
export default function Page() {
  return (
    <main className={styles.directory} id="main-content">
      <header className={styles.intro}>
        <Link href="/resources">Resource library</Link>
        <h1>Software evaluation guides</h1>
        <p>
          Choose a question, run a small trial and compare what your team can
          actually use.
        </p>
      </header>
      <div className={styles.groups}>
        {evaluationGuides.map((g) => (
          <section className={styles.group} key={g.slug}>
            <h2>
              <Link href={`/resources/guides/${g.slug}`}>{g.title}</Link>
            </h2>
            <p>{g.question}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
