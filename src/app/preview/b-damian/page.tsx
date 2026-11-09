import { IBM_Plex_Mono, Syne } from "next/font/google";
import { createPageMetadata } from "@/lib/metadata";
import { BDamianGame } from "./b-damian-game";
import styles from "./b-damian-game.module.css";

/**
 * Display + mono pair for the arcade shell.
 * Syne carries the title presence; IBM Plex Mono keeps the HUD readable under motion.
 */
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-b-damian-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-b-damian-mono",
  display: "swap",
});

export const metadata = createPageMetadata({
  title: "B. Damian | Innflow preview",
  description:
    "Play B. Damian — catch the B's, dodge the drama in this arcade preview.",
  path: "/preview/b-damian",
  noIndex: true,
});

export default function BDamianPage() {
  return (
    <main
      id="main-content"
      className={`${styles.page} ${syne.variable} ${plexMono.variable}`}
    >
      <BDamianGame />
    </main>
  );
}
