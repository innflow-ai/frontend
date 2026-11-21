import { BaselaneNews } from "@/components/baselane-news";
import { createPageMetadata } from "@/lib/metadata";
export const metadata = createPageMetadata({
  title: "Industry Coverage and Perspectives | Innflow",
  description:
    "Explore independent coverage and perspectives on property technology, connected operations, and the changing work of property teams.",
  path: "/in-the-news",
});
export default function Page() {
  return <BaselaneNews />;
}
