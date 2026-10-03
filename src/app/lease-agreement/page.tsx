import { BaselaneLease } from "@/components/baselane-lease";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Lease Document Workflows | Innflow",
  description:
    "Keep lease paperwork, requests, and review context organized. Explore connected document workflows that help your team prepare for the next review.",
  path: "/lease-agreement",
});
export default function Page() {
  return <BaselaneLease />;
}
