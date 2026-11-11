import { WorkflowsProductPage } from "@/components/workflows-product-page";
import { workflowsPage } from "@/content/workflows-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: workflowsPage.title,
  description: workflowsPage.description,
  path: workflowsPage.path,
});

export default function Page() {
  return <WorkflowsProductPage />;
}
