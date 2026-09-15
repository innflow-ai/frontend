import { NavigationDirectory } from "@/components/navigation-directory";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Browse All Solutions | Innflow",
  description:
    "Find solutions for property operations, leasing, teams, and finance.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return <NavigationDirectory kind="solutions" />;
}
