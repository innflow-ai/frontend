import { modelProviders, modelSlug } from "@/content/model-directory";
import { FeaturesMenu } from "./features-menu";
import styles from "./navigation-menus.module.css";
import type { NavigationLabel } from "./navigation-labels";

import { departments, integrations, resources, type Item } from "@/config/menu-links";

function iconPath(section: string, name: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (section === "models" || section === "integrations") {
    const prefix = section === "models" ? "models" : "solutions";
    return `/brand/navigation/menu/${prefix}-${slug}.png`;
  }
  return `/brand/navigation/outline-buttons/${slug}.svg`;
}

function MenuItem({
  item,
  section,
  close,
}: {
  item: Item;
  section: string;
  close: () => void;
}) {
  const content = (
    <>
      <img alt="" width="26" height="26" src={iconPath(section, item.name)} />
      {item.name}
    </>
  );
  return item.href ? (
    <a className={styles.item} href={item.href} onClick={close}>
      {content}
    </a>
  ) : (
    <span className={styles.item}>{content}</span>
  );
}

export function NavigationMenu({
  label,
  close,
}: {
  label: NavigationLabel;
  close: () => void;
}) {
  if (label === "Product")
    return <FeaturesMenu closeMenu={close} />;
  if (label === "Models")
    return (
      <div className={styles.directory}>
        <div className={styles.providers}>
          {modelProviders.map((provider, index) => (
            <section
              className={styles.provider}
              key={provider.name}
              style={{ gridArea: "p" + index }}
            >
              <h3>
                {provider.name !== "Alibaba Cloud" && (
                  <img
                    alt=""
                    width="16"
                    height="16"
                    src={iconPath("models", provider.name)}
                  />
                )}{" "}
                {provider.name}
              </h3>
              <ul>
                {provider.models.map((name) => (
                  <li key={name}>
                    <a className={styles.model} href={`/models/${modelSlug(name)}`} onClick={close}>{name}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  if (label === "Resources")
    return (
      <div className={styles.directory}>
        <div className={styles.columns}>
          {resources.map((group) => (
            <section key={group.name}>
              <h3>{group.name}</h3>
              {group.items.map((item) => (
                <MenuItem
                  section="resources"
                  key={item.name}
                  item={item}
                  close={close}
                />
              ))}
              <a
                className={styles.more}
                href={group.more}
                aria-label={"View more: " + group.name}
                onClick={close}
              >
                View more
              </a>
            </section>
          ))}
        </div>
      </div>
    );
  return (
    <div className={styles.directory}>
      <div className={styles.departments}>
        <div className={styles.heading}>
          <h3>By department</h3>
          <a className={styles.action} href="/solutions" onClick={close}>
            View all solutions
          </a>
        </div>
        <div className={styles.columns}>
          {departments.map((column) => (
            <div key={column[0].name}>
              {column.map((item) => (
                <MenuItem
                  section="solutions"
                  key={item.name}
                  item={item}
                  close={close}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <section className={styles.strip}>
        <h3>Integrations</h3>
        <div className={styles.chips}>
          {integrations.map((item) => (
            <MenuItem
              section="integrations"
              key={item.name}
              item={item}
              close={close}
            />
          ))}
          <a className={styles.all} href="/integrations" onClick={close}>
            View all integrations
          </a>
        </div>
      </section>
    </div>
  );
}
