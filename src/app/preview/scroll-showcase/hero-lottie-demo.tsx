"use client";

import { LottieArtwork } from "./lottie-artwork";
import styles from "./showcase.module.css";

const demos = {
  bot: {
    file: "bot-inbox-monitor",
    label:
      "Fred asks Loopie to monitor a fundraising inbox. Loopie requests Google access, then confirms the inbox monitor is ready.",
  },
  flow: {
    file: "flow-outreach",
    label:
      "An influencer outreach workflow moves from creator selection and contact research through approval, sending an introduction, and logging it in the CRM.",
  },
  channels: {
    file: "channels-launch",
    label:
      "A teammate shares a creator launch brief in a channel. Loopie replies with a campaign plan and spending limits.",
  },
  computer: {
    file: "computer-sign-in",
    label:
      "A cursor enters a work email and masked password, then presses Continue in the Zendesk sign-in window.",
  },
};

export function HeroLottieDemo({
  demo,
  play,
}: {
  demo: keyof typeof demos;
  play: boolean;
}) {
  const artwork = `/preview/scroll-showcase/${demos[demo].file}`;
  return (
    <div
      className={styles.heroLottieDemo}
      data-demo={demo}
      role="img"
      aria-label={demos[demo].label}
    >
      <LottieArtwork
        artwork={artwork}
        play={play}
        width={532}
        height={294}
        crop={demo === "channels"}
      />
    </div>
  );
}
