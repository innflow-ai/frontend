import Image from "next/image";
import Link from "next/link";
import { type Integration, integrationStatus } from "@/lib/integration-model";
import styles from "./integrations.module.css";
export function IntegrationLogo({ item }: { item: Integration }) {
  return (
    <span className={styles.logo}>
      {item.logoUrl ? (
        <Image
          src={item.logoUrl}
          data-categories="essential"
          alt=""
          width={44}
          height={44}
          unoptimized
        />
      ) : (
        <span aria-hidden="true">{item.name.slice(0, 2)}</span>
      )}
    </span>
  );
}
export function IntegrationCard({ item }: { item: Integration }) {
  return (
    <Link className={styles.card} href={`/integrations/${item.slug}`}>
      <div className={styles.cardTop}>
        <IntegrationLogo item={item} />
        <span className={styles.badge} data-status={item.status}>
          {integrationStatus(item.status).label}
        </span>
      </div>
      <h3>
        {item.name}
        <span aria-hidden="true">↗</span>
      </h3>
      <p>{item.shortDescription}</p>
      <span className={styles.categoryLabel}>
        {item.category?.title ?? "Other"}
      </span>
    </Link>
  );
}
