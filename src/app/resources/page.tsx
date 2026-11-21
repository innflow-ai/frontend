import { BaselaneLibrary } from "@/components/baselane-library";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Resource Library | Innflow",
  description:
    "Explore Innflow resources for property operations, records and reviews, planning tools, and connected team workflows.",
  path: "/resources",
});
export default function Page() {
  return <BaselaneLibrary kind="articles" />;
}
