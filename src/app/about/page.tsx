import { BaselaneCompany } from "@/components/baselane-company";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "About Innflow | Connected Workflows",
  description:
    "Learn how Innflow connects requests, context, and team handoffs, with clear workflows and people in control of the next step.",
  path: "/about",
});
export default function Page() {
  return <BaselaneCompany />;
}
