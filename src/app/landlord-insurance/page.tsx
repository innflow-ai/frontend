import { BaselaneInsurance } from "@/components/baselane-insurance";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Property Review Preparation | Innflow",
  description:
    "Organize property details and prepare a clearer brief for an insurance review. Keep the relevant context and next steps together for your team.",
  path: "/landlord-insurance",
});
export default function Page() {
  return <BaselaneInsurance />;
}
