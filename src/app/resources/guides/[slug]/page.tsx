import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluationGuides } from "@/content/evaluation-guides";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../../../connections/page.module.css";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return evaluationGuides.map(({ slug }) => ({ slug }));
}
async function guide(params: Props["params"]) {
  const { slug } = await params;
  return evaluationGuides.find((g) => g.slug === slug) ?? notFound();
}
export async function generateMetadata({ params }: Props) {
  const g = await guide(params);
  return createPageMetadata({
    title: `${g.title} | Innflow`,
    description: g.question,
    path: `/resources/guides/${g.slug}`,
  });
}
export default async function Page({ params }: Props) {
  const g = await guide(params);
  return (
    <main id="main-content" className={styles.directory}>
      <header className={styles.intro}>
        <Link href="/resources/guides">Software evaluation guides</Link>
        <h1>{g.title}</h1>
        <p>{g.question}</p>
      </header>
      <div className={styles.groups}>
        <section className={styles.group}>
          <h2>{g.headings?.[0] ?? "Run the trial"}</h2>
          <p>{g.trial}</p>
        </section>
        <section className={styles.group}>
          <h2>{g.headings?.[1] ?? "Inspect the result"}</h2>
          <p>{g.check}</p>
        </section>
        <section className={styles.group}>
          <h2>{g.headings?.[2] ?? "Make the decision"}</h2>
          <p>{g.tradeoff}</p>
          <Link href={g.next.href}>{g.next.label}</Link>
        </section>
      </div>
    </main>
  );
}
