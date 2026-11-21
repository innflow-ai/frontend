"use client";

import { NavigationMenu } from "./navigation-menus";
import type { NavigationLabel } from "./navigation-labels";
import styles from "./features-menu.module.css";

export function HeaderDropdown({
  label,
  closeMenus,
}: {
  label: NavigationLabel;
  closeMenus: () => void;
}) {
  return (
    <div
      id={"baselane-" + label}
      className={styles.panel}
      data-wide={label === "Solutions" || label === "Resources" || undefined}
    >
      <NavigationMenu label={label} close={closeMenus} />
    </div>
  );
}
