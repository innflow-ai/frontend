import Link from "next/link";
import { notFound } from "next/navigation";
import {
  templateCollections,
  workflowTemplates,
} from "@/content/workflow-templates";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../../connections/page.module.css";

type Props = { params: Promise<{ collection: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return templateCollections.map((c) => ({ collection: c.slug }));
}
async function collection(params: Props["params"]) {
  const { collection: slug } = await params;
  return templateCollections.find((c) => c.slug === slug) ?? notFound();
}
export async function generateMetadata({ params }: Props) {
  const c = await collection(params);
  return createPageMetadata({
    title: `${c.name} templates | Innflow`,
    description: c.description,
    path: `/templates/${c.slug}`,
  });
}
export default async function Page({ params }: Props) {
  const c = await collection(params);
  return (
    <main id="main-content" className={styles.directory}>
      <header className={styles.intro}>
        <h1>{c.name} templates</h1>
        <p>{c.description}</p>
      </header>
      <div className={styles.group}>
        <ul>
          {workflowTemplates
            .filter((t) => t.collection === c.slug)
            .map((t) => (
              <li key={t.slug}>
                <Link href={`/templates/${c.slug}/${t.slug}`}>{t.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
