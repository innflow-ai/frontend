import type { Metadata } from "next";
import { BaselaneInvesting } from "@/components/baselane-investing";
export const metadata: Metadata = {
  title: "Real estate investing resources | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-real-estate-investing" },
};
export default function Page() {
  return <BaselaneInvesting />;
}
