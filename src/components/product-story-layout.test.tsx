import { existsSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import AgentMemory from "@/app/features/agent-memory/page";
import Channels from "@/app/features/communications/page";
import Computer from "@/app/features/computer/page";
import Teammates from "@/app/features/teammates/page";
import Flows from "@/app/features/workflows/page";
import Connections from "@/app/platform/integrations/page";
import BotMode from "@/app/products/ai-agents/page";

const pages = {
  BotMode,
  Flows,
  Channels,
  Connections,
  Teammates,
  AgentMemory,
  Computer,
};

it.each(Object.entries(pages))(
  "%s renders a complete product story and usable media",
  (_, Page) => {
    const doc = new DOMParser().parseFromString(
      renderToStaticMarkup(<Page />),
      "text/html",
    );
    const main = doc.querySelector("main[data-product-layout]")!;
    expect(main.querySelectorAll("h1")).toHaveLength(1);
    expect(
      Array.from(main.querySelectorAll("[data-page-section]"), (el) =>
        el.getAttribute("data-page-section"),
      ),
    ).toEqual([
      "Hero",
      "Feature story",
      "Workspace showcase",
      "Capability grid",
      "Comparison",
      "Closing CTA",
    ]);
    for (const link of main.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]',
    )) {
      expect(doc.getElementById(link.hash.slice(1))).toBeTruthy();
    }
    for (const figure of main.querySelectorAll<HTMLElement>(
      "figure[data-motion-brief], figure[data-motion-src]",
    )) {
      if (figure.dataset.motionBrief) {
        const block = figure.closest("article, section")!;
        expect(block.querySelector("h1,h2,h3")?.textContent).toBe(
          figure.dataset.motionBrief,
        );
        expect(block.querySelector("p")?.textContent?.trim()).toBeTruthy();
        expect(
          figure.querySelector("figcaption")?.textContent?.trim(),
        ).toBeTruthy();
      } else {
        for (const path of [
          figure.dataset.motionSrc,
          figure.dataset.motionPoster,
        ]) {
          expect(path).toBeTruthy();
          expect(existsSync(join(process.cwd(), "public", path!))).toBe(true);
        }
      }
    }
  },
);
