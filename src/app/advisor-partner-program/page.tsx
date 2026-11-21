import { BaselaneAdvisors } from "@/components/baselane-advisors";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Advisor Partnerships | Innflow",
  description:
    "Keep client records, document requests, and review steps connected. Explore how Innflow supports clearer conversations and handoffs for advisors.",
  path: "/advisor-partner-program",
});
export default function Page() {
  return <BaselaneAdvisors />;
}
