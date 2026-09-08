import type { Metadata } from "next";
import { BaselaneRentCalculator } from "@/components/baselane-rent-calculator";
export const metadata: Metadata = {
  title: "Rent comparison calculator | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-how-much-should-i-charge-for-rent" },
};
export default function Page() {
  return <BaselaneRentCalculator />;
}
