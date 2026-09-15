import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { GoogleCtaContent } from "./google-cta-content";
import styles from "./product-headspace-cta.module.css";

/** Shared post-feature CTA, from CMS Template Figma node 3:273. */
export function ProductHeadspaceCta() {
  return (
    <section className={styles.section} aria-label="Make room for life">
      <Image
        src="/brand/product-headspace.webp"
        alt=""
        fill
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.content}>
        <span className={styles.eyebrow}>A LITTLE MORE HEADSPACE</span>
        <h2>
          Make room for life
          <br />
          around your properties.
        </h2>
        <p>
          Bring your team, your information, and your next steps into one flow.
        </p>
        <div className={styles.actions}>
          <a href={siteConfig.googleAuthUrl}>
            <GoogleCtaContent />
          </a>
          <a href={siteConfig.demoUrl} className={styles.demo}>
            See demo <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
