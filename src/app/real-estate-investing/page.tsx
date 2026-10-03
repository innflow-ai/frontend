import { BaselaneInvesting } from "@/components/baselane-investing";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Real Estate Investing Resources | Innflow",
  description:
    "Browse real estate investing resources and practical perspectives for property teams. Find articles by topic and explore related guidance.",
  path: "/real-estate-investing",
});
export default function Page() {
  return <BaselaneInvesting />;
}
