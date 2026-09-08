import type { Metadata } from "next";
import { BaselaneHomepage } from "@/components/baselane-homepage";

export const metadata: Metadata = {
  title: "A clearer day in property operations | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-home" },
};

export default function Page() {
  return <BaselaneHomepage />;
}
