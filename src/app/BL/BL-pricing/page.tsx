import type { Metadata } from "next";
import { BaselanePricing } from "@/components/baselane-pricing";
export const metadata: Metadata = {
  title: "Plans and pricing | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-pricing" },
};
export default function Page() {
  return <BaselanePricing />;
}
