import { BaselaneDemo } from "@/components/baselane-demo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Book an Innflow Demo | See Connected Workflows",
  description:
    "Explore Innflow with your team. Book a demo to discuss your workflows, connected tools, and the next steps for getting started.",
  path: "/demo",
});

export default function DemoPage() {
  return <BaselaneDemo />;
}
