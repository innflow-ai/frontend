import { HelpCenter } from "@/components/help-center";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Help Center | Innflow",
  description:
    "Find answers, explore workflow guides, and get help with your Innflow workspace, agents, and integrations.",
  path: "/help",
});

export default function HelpPage() {
  return <HelpCenter />;
}
