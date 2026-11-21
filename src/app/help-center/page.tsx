import { BaselaneHelp } from "@/components/baselane-help";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Help Center | Innflow",
  description:
    "Get help with Innflow, from getting started and connecting tools to managing property operations, resident requests, and security.",
  path: "/help-center",
});
export default function Page() {
  return <BaselaneHelp />;
}
