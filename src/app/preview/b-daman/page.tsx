import { IBM_Plex_Mono, Syne } from "next/font/google";
import { createPageMetadata } from "@/lib/metadata";
import { BDamanGame } from "./b-daman-game";
import styles from "./b-daman-game.module.css";

/**
 * Display + mono pair for the arena HUD.
 * Syne carries the B-Daman title punch; IBM Plex Mono keeps charge/score readable.
 */
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-b-daman-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-b-daman-mono",
  display: "swap",
});

export const metadata = createPageMetadata({
  title: "B-Daman | Innflow preview",
  description:
    "Play B-Daman — aim, charge, and blast marble targets in this arcade preview.",
  path: "/preview/b-daman",
  noIndex: true,
});

export default function BDamanPage() {
  return (
    <main
      id="main-content"
      className={`${styles.page} ${syne.variable} ${plexMono.variable}`}
    >
      <BDamanGame />
    </main>
  );
}
