import type { Metadata } from "next";
import { WebsiteAnnouncementBar } from "@/components/website-announcement";
export const metadata: Metadata = {
  title: "Announcement preview",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function AnnouncementPreview({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const now = Date.now();
  return (
    <main id="main-content">
      <WebsiteAnnouncementBar
        initialNow={now}
        config={{
          enabled: true,
          id: `preview-${mode ?? "combined"}`,
          offer:
            mode === "model"
              ? undefined
              : {
                  message: "LIMITED OFFER",
                  targetTime: new Date(
                    now + (mode === "expiry" ? 10000 : 172800000),
                  ).toISOString(),
                  displayTimeZone: "America/New_York",
                  action: { label: "View offer", href: "/pricing" },
                },
          modelRelease:
            mode === "offer"
              ? undefined
              : {
                  id: "preview",
                  name: "Opus 5 (preview)",
                  iconSrc: "/brand/announcement/anthropic.svg",
                  action: { label: "Explore", href: "/" },
                },
        }}
      />
      <div style={{ padding: 40 }}>
        <h1>Announcement preview</h1>
        <p>
          Fixture data only. Modes: combined, model, offer, expiry (10 seconds).
          This preview deadline resets on refresh; published campaigns use a
          fixed CMS deadline.
        </p>
      </div>
    </main>
  );
}
