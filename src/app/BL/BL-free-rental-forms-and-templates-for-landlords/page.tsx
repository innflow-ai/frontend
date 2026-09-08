import type { Metadata } from "next";
import { BaselaneForms } from "@/components/baselane-forms";
export const metadata: Metadata = {
  title: "Rental forms and resources | Innflow",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/BL/BL-free-rental-forms-and-templates-for-landlords",
  },
};
export default function Page() {
  return <BaselaneForms />;
}
