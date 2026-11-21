import Image from "next/image";
import styles from "./listing-hero-artwork.module.css";

const root = "/brand/feature-pages/listing-and-advertising";

/** Independent layers aligned to Figma 309:9531's 2017 × 940 canvas. */
export function ListingHeroArtwork() {
  return (
    <div className={styles.artwork} aria-hidden="true">
      <div className={styles.canvas}>
        <Image
          className={styles.porch}
          src={`${root}/porch-bordered.png`}
          alt=""
          width={2018}
          height={650}
          sizes="100vw"
          preload
        />
        <Image
          className={styles.channels}
          src={`${root}/listing-channels.svg`}
          alt=""
          width={422}
          height={275}
          unoptimized
        />
        <Image
          className={styles.couple}
          src={`${root}/couple.png`}
          alt=""
          width={811}
          height={859}
          sizes="(max-width: 700px) 400px, 700px"
          preload
        />
        <Image
          className={styles.status}
          src={`${root}/unit-status.svg`}
          alt=""
          width={378}
          height={115}
          unoptimized
        />
      </div>
    </div>
  );
}
