import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "A clearer day in property operations | Innflow",
  description: "Connect workflows, knowledge, and approvals with Innflow.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-home" },
};

export default function Page() {
  redirect("/BL/BL-home");
}
