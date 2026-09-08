import type { Metadata } from "next";
import { BaselaneDemo } from "@/components/baselane-demo";
export const metadata: Metadata = {
  title: "See how innflow works",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-demo" },
};
export default function Page() {
  return <BaselaneDemo />;
}
