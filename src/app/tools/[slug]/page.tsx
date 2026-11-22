import { DeepSeekPrompt } from "../deepseek-prompt";
import { MarkdownDocument } from "../markdown-document";
import Link from "next/link";
import { notFound } from "next/navigation";
import { planningTools } from "@/content/planning-tools";
import { createPageMetadata } from "@/lib/metadata";
import directory from "../../connections/page.module.css";
import {
  CampaignCalculator,
  ReorderCalculator,
  FollowUpDraft,
} from "../tool-inputs";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return planningTools.map(({ slug }) => ({ slug }));
}
async function toolFor(params: Props["params"]) {
  const { slug } = await params;
  return planningTools.find((tool) => tool.slug === slug) ?? notFound();
}
export async function generateMetadata({ params }: Props) {
  const tool = await toolFor(params);
  return createPageMetadata({
    title: `${tool.name} | Innflow`,
    description: tool.description,
    path: `/tools/${tool.slug}`,
  });
}
export default async function Page({ params }: Props) {
  const tool = await toolFor(params);
  return (
    <main id="main-content" className={directory.directory}>
      <header className={directory.intro}>
        <Link href="/tools">Planning tools</Link>
        <h1>{tool.name}</h1>
        <p>{tool.description}</p>
      </header>
      {tool.slug === "deepseek-prompt-playground" ? (
        <DeepSeekPrompt />
      ) : tool.slug === "cpm-calculator" ? (
        <CampaignCalculator />
      ) : tool.slug === "reorder-point-calculator" ? (
        <ReorderCalculator />
      ) : tool.slug === "markdown-to-pdf" ? (
        <MarkdownDocument />
      ) : (
        <FollowUpDraft />
      )}
    </main>
  );
}
