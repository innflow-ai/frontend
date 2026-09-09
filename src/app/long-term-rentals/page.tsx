import type { Metadata } from "next";
import { BaselaneMultiProperty } from "@/components/baselane-multi-property";
export const metadata: Metadata = {
  title: "Long-term rental operations | innflow",
  alternates: { canonical: "/long-term-rentals" },
};
export default function Page() {
  return <BaselaneMultiProperty audience="long-term" />;
}
