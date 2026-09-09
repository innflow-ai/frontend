import type { Metadata } from "next";
import { BaselaneMultiProperty } from "@/components/baselane-multi-property";
export const metadata: Metadata = {
  title: "Mid-term rental operations | innflow",
  alternates: { canonical: "/mid-term-rentals" },
};
export default function Page() {
  return <BaselaneMultiProperty audience="mid-term" />;
}
