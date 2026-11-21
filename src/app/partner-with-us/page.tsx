import { BaselanePartners } from "@/components/baselane-partners";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Partner with Innflow",
  description:
    "Bring your experience, community, or idea to Innflow. Explore ways to work together and start a conversation about the workflows people need.",
  path: "/partner-with-us",
});
export default function Page() {
  return <BaselanePartners />;
}
