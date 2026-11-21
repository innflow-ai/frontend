import type { Metadata } from "next";
import { BaselaneUpdates } from "@/components/baselane-updates";
export const metadata: Metadata = {
  title: "Product highlights | innflow",
  description:
    "Explore innflow resources, planning tools, and connected workflows for property operations.",
  alternates: { canonical: "/product-updates" },
};
export default function Page() {
  return <BaselaneUpdates />;
}
