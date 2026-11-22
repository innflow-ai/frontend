import Link from "next/link";
import { directoryProviders, modelSlug } from "@/content/model-directory";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../connections/page.module.css";

export const metadata = createPageMetadata({
  title: "Model workflow guides | Innflow",
  description:
    "Explore models by provider, try a task from your team's work and check the result against a concrete review criterion.",
  path: "/models",
});
export default function ModelsPage() {
  return (
    <main id="main-content" className={styles.directory}>
      <header className={styles.intro}>
        <h1>Model workflow guides</h1>
        <p>
          Choose a model to see a sample task, a brief and a way to check its
          work.
        </p>
        <Link href="/features/multi-model-agents">How multi-model workflows work</Link>
      </header>
      <div className={styles.groups}>
        {directoryProviders.map((provider) => (
          <section key={provider.name} className={styles.group}>
            <h2>{provider.name}</h2>
            <ul>
              {provider.models.map((name) => (
                <li key={name}>
                  <Link href={`/models/${modelSlug(name)}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
