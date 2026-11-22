import { notFound } from "next/navigation";
import { FeatureStoryPage } from "@/components/feature-story-page";
import { departmentSolutions } from "@/content/department-solutions";
import { appSignup } from "@/content/feature-story";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ department: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return departmentSolutions.map(({ slug }) => ({ department: slug }));
}

function solution(slug: string) {
  return departmentSolutions.find((item) => item.slug === slug) ?? notFound();
}

export async function generateMetadata({ params }: Props) {
  const page = solution((await params).department);
  return createPageMetadata({
    title: `${page.name} workflows | Innflow`,
    description: page.description,
    path: `/solutions/${page.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const page = solution((await params).department);
  return (
    <FeatureStoryPage
      sections={[
        {
          id: "overview",
          type: "hero",
          eyebrow: page.name,
          title: page.title,
          subtitle: page.description,
          primary: { label: "Get started", href: appSignup },
          secondary:
            page.slug === "marketing"
              ? {
                  label: "Schedule social posts",
                  href: "/solutions/social-media-scheduling",
                }
              : { label: "Explore flows", href: "/features/workflows" },
          lines: [
            { role: "Teammate", text: page.request },
            { role: "Agent", text: page.reply },
          ],
        },
        {
          id: "workflow",
          type: "steps",
          title: page.workflow,
          steps: page.steps,
        },
      ]}
    />
  );
}
