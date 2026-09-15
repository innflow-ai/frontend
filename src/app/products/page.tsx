import { NavigationDirectory } from "@/components/navigation-directory";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Browse All Products | Innflow",
  description: "Explore the Innflow platform, agents, tools, and integrations.",
  path: "/products",
});

export default function ProductsPage() {
  return <NavigationDirectory kind="products" />;
}
