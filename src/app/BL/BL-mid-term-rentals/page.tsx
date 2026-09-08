import type { Metadata } from "next";
import { BaselaneMultiProperty } from "@/components/baselane-multi-property";
export const metadata: Metadata = {
  title: "Mid-term rental operations | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-mid-term-rentals" },
};
export default function Page() {
  return <BaselaneMultiProperty audience="mid-term" />;
}
