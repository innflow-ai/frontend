import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../connections/page.module.css";

export const metadata = createPageMetadata({
  title: "Product comparisons | Innflow",
  description:
    "Compare how teams coordinate conversations, automate handoffs and review agent work.",
  path: "/compare",
});

export default function ComparisonsPage() {
  return (
    <main className={styles.directory} id="main-content">
      <header className={styles.intro}>
        <h1>Product comparisons</h1>
        <p>
          Follow one task through the tools your team is considering. See where
          the conversation happens, who owns the work and how the result gets
          reviewed.
        </p>
      </header>
      <section className={styles.group}>
        <h2>Team communication</h2>
        <ul>
          <li>
            <Link href="/compare/innflow-vs-slack">Innflow vs Slack</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
