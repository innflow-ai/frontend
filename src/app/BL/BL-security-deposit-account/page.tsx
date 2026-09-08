import type { Metadata } from "next";
import { BaselaneDeposits } from "@/components/baselane-deposits";
export const metadata: Metadata = {
  title: "Deposit workflows | Innflow",
  robots: { index: false, follow: false },
  alternates: { canonical: "/BL/BL-security-deposit-account" },
};
export default function Page() {
  return <BaselaneDeposits />;
}
