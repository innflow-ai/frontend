import { BaselaneLegalDirectory } from "@/components/baselane-legal";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Legal Agreements | Innflow",
  description:
    "Find Innflow's legal agreements, terms, privacy policies, and privacy request information in one directory, with links to the relevant documents.",
  path: "/legal-agreements",
});
export default function Page() {
  return <BaselaneLegalDirectory />;
}
