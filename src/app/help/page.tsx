import type { Metadata } from "next";
import { HelpCenter } from "@/components/help-center";

export const metadata: Metadata = {
  title: "Help Center | Innflow",
  description:
    "Find answers, explore workflow guides, and get help with your Innflow workspace, agents, and integrations.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return <HelpCenter />;
}
