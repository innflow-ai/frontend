import Image from "next/image";
import marquee from "./launch-directory-marquee.module.css";
import styles from "./trusted-by-marquee.module.css";

const companies = [
  { name: "Shopify", slug: "shopify", width: 134, height: 38 },
  { name: "Rootly AI", slug: "rootly-ai", width: 155, height: 31 },
  { name: "Intuit", slug: "intuit", width: 155, height: 32 },
  { name: "Harbor Freight", slug: "harbor-freight", width: 155, height: 24 },
  {
    name: "Global Industrial",
    slug: "global-industrial",
    width: 145,
    height: 38,
  },
  { name: "E2B", slug: "e2b", width: 128, height: 38 },
  { name: "Mailchimp", slug: "mailchimp", width: 195, height: 35 },
];

export function TrustedByMarquee() {
  return (
    <section className={styles.section} aria-labelledby="trusted-by-heading">
      <h2 id="trusted-by-heading" className={styles.title}>
        Trusted by
      </h2>
      <div className={marquee.viewport}>
        <div className={`${marquee.track} ${styles.track}`}>
          {[0, 1, 2, 3].map((copy) => (
            <div
              key={copy}
              className={`${marquee.group} ${styles.group}`}
              aria-hidden={copy > 0 || undefined}
            >
              {companies.map(({ name, slug, width, height }) => (
                <Image
                  key={slug}
                  src={`/brand/trusted-by/${slug}.svg`}
                  alt={copy === 0 ? name : ""}
                  width={Math.round(Math.min(181, (40 * width) / height))}
                  height={Math.round(Math.min(40, (181 * height) / width))}
                  className={styles.logo}
                  loading="eager"
                  unoptimized
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
