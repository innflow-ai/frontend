import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/industry-pages/industry-page";
import {
  getIndustryPage,
  industryHref,
  industryPages,
} from "@/content/industries";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return industryPages.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const page = getIndustryPage((await params).slug);
  if (!page) notFound();
  return createPageMetadata({
    title: `${page.name} AI Workflows | Innflow`,
    description: page.description,
    path: industryHref(page.slug),
  });
}
export default async function Page({ params }: Props) {
  const page = getIndustryPage((await params).slug);
  if (!page) notFound();
  return <IndustryPage page={page} />;
}
