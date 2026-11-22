import { notFound } from "next/navigation";
import { FeatureStoryPage } from "@/components/feature-story-page";
import { modelBriefs } from "@/content/model-briefs";
import { modelDirectory } from "@/content/model-directory";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return modelDirectory.map(({ slug }) => ({ slug }));
}
function profile(slug: string) {
  return modelDirectory.find((entry) => entry.slug === slug) ?? notFound();
}
export async function generateMetadata({ params }: Props) {
  const model = profile((await params).slug);
  return createPageMetadata({
    title: `${model.name} workflow guide | Innflow`,
    description: `${modelBriefs[model.name][0]} with a sample brief and review criteria for evaluating ${model.name} on your team's work.`,
    path: `/models/${model.slug}`,
  });
}
export default async function Page({ params }: Props) {
  const model = profile((await params).slug);
  const [task, brief, check] = modelBriefs[model.name];
  return (
    <FeatureStoryPage
      sections={[
        {
          id: "model",
          type: "hero",
          eyebrow: model.provider,
          title: model.name,
          subtitle: `Try this workflow when evaluating ${model.name} for your team. Check model access in your workspace before you start.`,
          primary: { label: "Explore bot mode", href: "/products/ai-agents" },
          secondary: { label: "Browse models", href: "/models" },
          lines: [
            { role: "Task brief", text: brief },
            { role: "Reviewer", text: check },
          ],
        },
        {
          id: "workflow",
          type: "steps",
          title: task,
          steps: [
            {
              title: "Choose a finished example",
              body: "Use a small set of records your team can share and a result someone has already reviewed.",
            },
            { title: "Give the agent the brief", body: brief },
            { title: "Check the result", body: check },
          ],
        },
      ]}
    />
  );
}
