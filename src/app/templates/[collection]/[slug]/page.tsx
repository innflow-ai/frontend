import { notFound } from "next/navigation";
import { FeatureStoryPage } from "@/components/feature-story-page";
import { workflowTemplates } from "@/content/workflow-templates";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ collection: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return workflowTemplates.map(({ collection, slug }) => ({
    collection,
    slug,
  }));
}
async function template(params: Props["params"]) {
  const { collection, slug } = await params;
  return (
    workflowTemplates.find(
      (t) => t.collection === collection && t.slug === slug,
    ) ?? notFound()
  );
}
export async function generateMetadata({ params }: Props) {
  const t = await template(params);
  return createPageMetadata({
    title: `${t.title} template | Innflow`,
    description: t.brief,
    path: `/templates/${t.collection}/${t.slug}`,
  });
}
export default async function Page({ params }: Props) {
  const t = await template(params);
  return (
    <FeatureStoryPage
      sections={[
        {
          type: "hero",
          id: "template",
          title: t.title,
          eyebrow: "Workflow template",
          subtitle: t.brief,
          lines: [
            { role: "Source material", text: t.inputs },
            { role: "Review checkpoint", text: t.checkpoint },
          ],
          primary: {
            label:
              t.collection === "flows" ? "Explore flows" : "Explore teammates",
            href:
              t.collection === "flows"
                ? "/features/workflows"
                : "/features/teammates",
          },
          secondary: {
            label: "Browse templates",
            href: `/templates/${t.collection}`,
          },
        },
      ]}
    />
  );
}
