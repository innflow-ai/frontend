import type { Metadata } from "next";
import { BaselaneLibrary } from "@/components/baselane-library";
export const metadata: Metadata = {
  title: "Workflow learning | innflow",
  description:
    "Explore self-guided innflow workflow topics and book a demo around your team’s recurring property work.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-webinars" },
};
export default function Page() {
  return <BaselaneLibrary kind="webinars" />;
}
