import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { launchDirectories } from "@/content/launch-directories";
import { LaunchDirectoryMarquee } from "./launch-directory-marquee";

describe("directory backlinks", () => {
  it("includes official, followable badge links in server HTML even before listing approval", () => {
    const document = new DOMParser().parseFromString(
      renderToStaticMarkup(<LaunchDirectoryMarquee />),
      "text/html",
    );
    const links = [...document.querySelectorAll("a")];
    for (const directory of launchDirectories) {
      const link = links.find(
        (candidate) => candidate.getAttribute("href") === directory.href,
      );
      expect(link, directory.name).toBeDefined();
      expect(link?.rel.split(/\s+/)).not.toContain("nofollow");
      expect(link?.querySelector("img")?.getAttribute("src")).toBe(
        directory.src,
      );
      expect(link?.querySelector("img")?.getAttribute("alt")).toBe(
        directory.alt,
      );
    }
  });
});
