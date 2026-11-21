import Image from "next/image";
import { launchDirectories } from "@/content/launch-directories";
import styles from "./launch-directory-marquee.module.css";
import { type HeadingVariant, MixedHeadingContent } from "./section-heading";

const orderedDirectories = [...launchDirectories].sort(
  (a, b) => Number(a.status === "pending") - Number(b.status === "pending"),
);

export function LaunchDirectoryMarquee({
  headingVariant = "mixed-italic",
}: {
  headingVariant?: HeadingVariant;
}) {
  return (
    <section
      id="featured-on"
      className={styles.section}
      aria-labelledby="directory-heading"
    >
      <div className={styles.heading}>
        <h2
          id="directory-heading"
          className={styles.title}
          data-mixed-heading={headingVariant === "mixed-italic" || undefined}
        >
          {headingVariant === "mixed-italic" ? (
            <MixedHeadingContent
              title="Featured"
              emphasis="on"
              breakAt="never"
            />
          ) : (
            "Featured on"
          )}
        </h2>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div
              className={styles.group}
              key={copy}
              aria-hidden={copy === 1 || undefined}
            >
              {orderedDirectories.map((directory) => {
                const artwork = (
                  <span key={directory.name} className={styles.artwork}>
                    <Image
                      src={directory.src}
                      alt={directory.alt}
                      width={directory.width}
                      height={directory.height}
                      loading="eager"
                      unoptimized
                    />
                  </span>
                );
                return (
                  <a
                    key={directory.name}
                    className={styles.badge}
                    href={directory.href}
                    target="_blank"
                    rel={directory.rel}
                    tabIndex={copy === 1 ? -1 : undefined}
                    aria-label={`Visit ${directory.name} (opens in a new tab)`}
                  >
                    {artwork}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
