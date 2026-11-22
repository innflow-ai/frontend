import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../connections/page.module.css";

const releaseRepository = "https://github.com/innflow-ai/desktop-releases";
const releaseList = releaseRepository + "/releases";

export const metadata = createPageMetadata({
  title: "Download Innflow Desktop for macOS | Innflow",
  description:
    "Find public macOS installers for Innflow Desktop or open Innflow in your browser.",
  path: "/download",
});

async function latestInstallerRelease() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/innflow-ai/desktop-releases/releases/latest",
      {
        next: { revalidate: 900 },
        signal: AbortSignal.timeout(3500),
      },
    );
    if (response.status === 404) return { available: false } as const;
    if (!response.ok) return;
    const release = await response.json();
    if (typeof release.tag_name !== "string" || !Array.isArray(release.assets))
      return;
    const available = release.assets.some(
      (asset: { name?: string; state?: string }) =>
        asset.state === "uploaded" &&
        asset.name?.toLowerCase().endsWith(".dmg"),
    );
    if (available)
      return {
        available: true,
        href: releaseList + "/tag/" + encodeURIComponent(release.tag_name),
      } as const;
  } catch {
    // Visitors can still check the official release list when GitHub is unavailable.
  }
}

export default async function DownloadPage() {
  const release = await latestInstallerRelease();
  return (
    <main id="main-content" className={styles.directory}>
      <header className={styles.intro}>
        <h1>Innflow for macOS</h1>
        <p>
          {release?.available
            ? "Open the latest release and choose the disk image for your Mac."
            : release?.available === false
              ? "The first public macOS installer is pending. You can use Innflow in your browser today."
              : "Check the public releases for macOS installers, or open Innflow in your browser."}
        </p>
      </header>
      <a
        data-site-cta="primary"
        href={release?.available ? release.href : siteConfig.appOrigin}
      >
        {release?.available ? "Get the macOS installer" : "Open Innflow"}
      </a>{" "}
      <a
        data-site-cta="secondary"
        href={release?.available ? siteConfig.appOrigin : releaseList}
      >
        {release?.available
          ? "Open Innflow in your browser"
          : "Check desktop releases"}
      </a>
    </main>
  );
}
