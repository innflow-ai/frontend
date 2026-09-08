import type { Metadata } from "next";
import { BaselaneMultiProperty } from "@/components/baselane-multi-property";
export const metadata: Metadata = {
  title: "Multi-property operations | Innflow",
  description: "Connected workflows and knowledge for multi-property teams.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-multi-property-investors" },
};
export default function Page() {
  return <BaselaneMultiProperty />;
}
