import type { Metadata } from "next";
import { BaselaneLibrary } from "@/components/baselane-library";
export const metadata: Metadata = {
  title: "Resource library | innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-resources" },
};
export default function Page() {
  return <BaselaneLibrary kind="articles" />;
}
