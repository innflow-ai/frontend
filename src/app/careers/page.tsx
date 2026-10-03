import { BaselaneCompany } from "@/components/baselane-company";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Careers at Innflow",
  description:
    "Get to know Innflow, the way we work, and our focus on connecting people, context, and everyday workflows. Explore working with our team.",
  path: "/careers",
});
export default function Page() {
  return <BaselaneCompany careers />;
}
