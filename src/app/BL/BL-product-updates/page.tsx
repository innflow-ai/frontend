import type { Metadata } from "next";
import { BaselaneUpdates } from "@/components/baselane-updates";
export const metadata: Metadata = {
  title: "Design preview updates | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-product-updates" },
};
export default function Page() {
  return <BaselaneUpdates />;
}
