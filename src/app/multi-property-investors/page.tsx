import type { Metadata } from "next";
import { BaselaneMultiProperty } from "@/components/baselane-multi-property";
export const metadata: Metadata = {
  title: "Multi-property operations | innflow",
  description: "Connected workflows and knowledge for multi-property teams.",
  alternates: { canonical: "/multi-property-investors" },
};
export default function Page() {
  return <BaselaneMultiProperty />;
}
