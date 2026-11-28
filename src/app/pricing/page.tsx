import { connection } from "next/server";
import { BaselanePricing } from "@/components/baselane-pricing";
import { ShowcaseTheme } from "@/components/showcase-theme";
import { announcementState, blackFridayCampaign } from "@/config/website-announcement";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Innflow Pricing | Basic, Pro, Business & Enterprise Plans",
  description:
    "Compare Innflow Basic, Pro, Business, and Enterprise plans and find the right workflow automation capacity for your team.",
  path: "/pricing",
});

export default async function PricingPage() {
  await connection();
  const { offer } = announcementState(blackFridayCampaign, Date.now());
  return (
    <ShowcaseTheme>
      <BaselanePricing offer={offer} />
    </ShowcaseTheme>
  );
}
