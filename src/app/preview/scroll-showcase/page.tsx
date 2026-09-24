import { ShowcaseHomepage } from "@/components/showcase-homepage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Homepage preview | Innflow",
  description:
    "Explore the Innflow homepage design, feature stories and interactive states.",
  path: "/preview/scroll-showcase",
  noIndex: true,
});

export default function ScrollShowcasePage() {
  return <ShowcaseHomepage />;
}
