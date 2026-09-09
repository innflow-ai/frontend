import type { Metadata } from "next";
import { BaselanePricing } from "@/components/baselane-pricing";
export const metadata: Metadata = {
  title: "Plans and pricing | innflow",
  alternates: { canonical: "/pricing" },
};
export default function Page() {
  return <BaselanePricing />;
}
