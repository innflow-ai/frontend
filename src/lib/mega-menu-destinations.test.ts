import { describe, expect, it } from "vitest";
import {
  isMegaMenuCatchAll,
  MEGA_MENU_FEATURE_HREFS,
} from "./mega-menu-destinations";

const namedItems = [
  "Delinquency",
  "Owner Portal",
  "Listings",
  "Advertising",
  "Application & eSign",
  "CRM",
  "Move-In",
  "Renewals",
  "Owners",
  "Leasing Teams",
] as const;

describe("mega-menu destinations", () => {
  it("maps named items to distinct real site paths instead of catch-alls", () => {
    const hrefs = namedItems.map((title) => MEGA_MENU_FEATURE_HREFS[title]);
    expect(hrefs.every(Boolean)).toBe(true);
    expect(hrefs.every((href) => href.startsWith("/") && href.length > 1)).toBe(
      true,
    );
    expect(hrefs.some(isMegaMenuCatchAll)).toBe(false);
    expect(new Set(hrefs).size).toBeGreaterThan(1);
    expect(MEGA_MENU_FEATURE_HREFS.Delinquency).toBe("/rapid-rent");
    expect(MEGA_MENU_FEATURE_HREFS.CRM).toBe("/crm");
    expect(MEGA_MENU_FEATURE_HREFS.Listings).toBe("/listing-and-advertising");
    expect(MEGA_MENU_FEATURE_HREFS["Leasing Teams"]).toBe("/leasing");
    expect(MEGA_MENU_FEATURE_HREFS.Owners).toBe("/owners");
  });
});
