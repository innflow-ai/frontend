import { BaselanePartners } from "@/components/baselane-partners";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Share Innflow",
  description:
    "Know someone who could use a more connected workflow? Learn how to introduce them to Innflow and start a conversation about their team's needs.",
  path: "/landlord-referral",
});
export default function Page() {
  return <BaselanePartners referral />;
}
