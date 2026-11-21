import { expect, it } from "vitest";
import { metadata as about } from "./about/page";
import { metadata as advisors } from "./advisor-partner-program/page";
import { metadata as careers } from "./careers/page";
import { metadata as connections } from "./connections/page";
import { metadata as demo } from "./demo/page";
import { metadata as helpHome } from "./help/page";
import { metadata as help } from "./help-center/page";
import { metadata as calculator } from "./how-much-should-i-charge-for-rent/page";
import { metadata as news } from "./in-the-news/page";
import { metadata as insurance } from "./landlord-insurance/page";
import { metadata as referral } from "./landlord-referral/page";
import { metadata as lease } from "./lease-agreement/page";
import { metadata as legal } from "./legal-agreements/page";
import { metadata as longTerm } from "./long-term-rentals/page";
import { metadata as midTerm } from "./mid-term-rentals/page";
import { metadata as partners } from "./partner-with-us/page";
import { metadata as investing } from "./real-estate-investing/page";
import { metadata as rent } from "./rent-collection/page";
import { metadata as rentAlternate } from "./rent-collection-2/page";
import { metadata as renters } from "./renters/page";
import { metadata as resources } from "./resources/page";
import { metadata as security } from "./security/page";
import { metadata as deposits } from "./security-deposit-account/page";
import { metadata as shortTerm } from "./short-term-rentals/page";
import { metadata as tax } from "./tax-preparation/page";

it("gives inner pages their own search and share metadata instead of the homepage defaults", () => {
  for (const [path, metadata] of [
    ["/about", about],
    ["/advisor-partner-program", advisors],
    ["/careers", careers],
    ["/connections", connections],
    ["/demo", demo],
    ["/help", helpHome],
    ["/help-center", help],
    ["/how-much-should-i-charge-for-rent", calculator],
    ["/in-the-news", news],
    ["/landlord-insurance", insurance],
    ["/landlord-referral", referral],
    ["/lease-agreement", lease],
    ["/legal-agreements", legal],
    ["/long-term-rentals", longTerm],
    ["/mid-term-rentals", midTerm],
    ["/partner-with-us", partners],
    ["/real-estate-investing", investing],
    ["/rent-collection", rent],
    ["/rent-collection-2", rentAlternate],
    ["/renters", renters],
    ["/resources", resources],
    ["/security", security],
    ["/security-deposit-account", deposits],
    ["/short-term-rentals", shortTerm],
    ["/tax-preparation", tax],
  ] as const) {
    expect(metadata.description?.length).toBeGreaterThan(50);
    expect(metadata.alternates?.canonical).toMatch(new RegExp(`${path}$`));
    expect(metadata.openGraph).toMatchObject({
      title: metadata.title,
      description: metadata.description,
      url: metadata.alternates?.canonical,
    });
    expect(metadata.twitter).toMatchObject({
      title: metadata.title,
      description: metadata.description,
    });
  }
});
