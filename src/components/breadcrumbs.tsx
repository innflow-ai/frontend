import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";
import styles from "./breadcrumbs.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/**
 * Breadcrumb trail with BreadcrumbList JSON-LD built in.
 * The last item is treated as the current page (rendered as plain text).
 * Use on any CMS-driven page: <Breadcrumbs items={[{ label: "Home", href: "/" }, ...]} />
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: new URL(item.href, siteConfig.marketingOrigin).toString() }
        : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <JsonLd value={schema} />
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: breadcrumb order is stable
            <li key={index} className={styles.item}>
              {item.href && !isCurrent ? (
                <a className={styles.link} href={item.href}>
                  {item.label}
                </a>
              ) : (
                <span
                  className={styles.current}
                  aria-current={isCurrent ? "page" : undefined}
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
              {!isCurrent ? (
                <span aria-hidden="true" className={styles.separator}>
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
