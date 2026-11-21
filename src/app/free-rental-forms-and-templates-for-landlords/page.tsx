import type { Metadata } from "next";
import { BaselaneForms } from "@/components/baselane-forms";
export const metadata: Metadata = {
  title: "Document preparation worksheets | innflow",
  description:
    "Download innflow preparation worksheets for rental administration, document reviews, and property operations.",
  alternates: {
    canonical: "/free-rental-forms-and-templates-for-landlords",
  },
};
export default function Page() {
  return <BaselaneForms />;
}
