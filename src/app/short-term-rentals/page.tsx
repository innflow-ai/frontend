import type { Metadata } from "next";
import { BaselaneMultiProperty } from "@/components/baselane-multi-property";
export const metadata: Metadata = {
  title: "Short-term rental operations | innflow",
  alternates: { canonical: "/short-term-rentals" },
};
export default function Page() {
  return <BaselaneMultiProperty audience="short-term" />;
}
