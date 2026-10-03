import { BaselaneRenters } from "@/components/baselane-renters";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Connected Resident Experiences | Innflow",
  description:
    "Keep resident conversations, requests, and property details connected. Give your team a clearer path from the first request to its resolution.",
  path: "/renters",
});
export default function Page() {
  return <BaselaneRenters />;
}
