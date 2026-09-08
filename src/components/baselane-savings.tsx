import Image from "next/image";
import { siteConfig } from "@/config/site";
import { BaselaneHomepage } from "./baselane-homepage";
import styles from "./baselane-savings.module.css";

const source = "https://www.baselane.com/landlord-banking-apy";
const steps = [
  {
    image: "account",
    card: "account-card",
    title: "Explore the account",
    text: "Start with the provider’s account information and requirements.",
  },
  {
    image: "balances",
    card: "balances-card",
    title: "Review the balance tiers",
    text: "Compare the balance bands with the amount you plan to keep available.",
  },
  {
    image: "rent",
    card: "rent-card",
    title: "Check bonus conditions",
    text: "Read the qualification rules before including a bonus in your plans.",
  },
];
const features = [
  {
    title: "Banking",
    items: [
      "Account opening",
      "Business entities",
      "Deposit requirements",
      "Monthly fees",
      "Property accounts",
      "Virtual accounts",
      "Savings interest",
      "Digital wallets",
      "Mobile access",
    ],
  },
  {
    title: "Rent collection",
    items: [
      "Recurring payments",
      "Deposits",
      "Payment timing",
      "Late fees",
      "Payment history",
      "Invoices",
      "Reminders",
      "Payment limits",
      "Resident access",
      "Payment methods",
      "Autopay",
    ],
  },
  {
    title: "Accounting",
    items: [
      "Bank connections",
      "Transaction imports",
      "Property records",
      "Categories",
      "Statements",
      "Cash flow",
      "Data updates",
      "Search",
      "Reports",
      "CSV exports",
      "Tax preparation",
    ],
  },
];
const fees = [
  {
    title: "Banking",
    items: [
      "Opening",
      "Maintenance",
      "Minimums",
      "Inactivity",
      "ATMs",
      "Overdrafts",
    ],
  },
  { title: "Sending", items: ["ACH", "Wires", "Checks", "Checkbooks"] },
  {
    title: "Receiving",
    items: ["Wires", "Mobile deposits", "Debit", "Credit"],
  },
  {
    title: "Resident payments",
    items: [
      "ACH",
      "Debit",
      "Credit",
      "Split payments",
      "Rent reporting",
      "Screening",
    ],
  },
];

export function BaselaneSavings() {
  return (
    <BaselaneHomepage>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <h1>A clearer view of your property savings.</h1>
            <p>
              Explore Baselane’s savings resources, then keep the decisions and
              documents connected with Innflow.
            </p>
            <a className={styles.button} href={source}>
              Explore savings resources ↗
            </a>
          </div>
          <Image
            src="/brand/baselane-inspired/savings/hero.webp"
            width={1164}
            height={596}
            alt="An investor working on a laptop at home"
            priority
          />
        </section>
        <div className={styles.band}>
          <span>✓ Review the terms</span>
          <span>✓ Understand the conditions</span>
          <span>✓ Keep a record</span>
        </div>
        <section className={styles.section}>
          <h2>Start with the details.</h2>
          <div className={styles.steps}>
            {steps.map((step) => (
              <article key={step.image}>
                <div className={styles.scene}>
                  <Image
                    src={`/brand/baselane-inspired/savings/${step.image}.webp`}
                    fill
                    sizes="(max-width: 700px) 90vw, 30vw"
                    alt=""
                  />
                  <Image
                    className={styles.overlay}
                    src={`/brand/baselane-inspired/savings/${step.card}.webp`}
                    width={840}
                    height={566}
                    alt={`Baselane ${step.title.toLowerCase()} illustration`}
                  />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <p className={styles.note}>
            Product illustrations supplied by Baselane.
          </p>
        </section>
        <section className={styles.section} id="balance-tiers">
          <h2>See where your balance fits.</h2>
          <p>
            Use the original provider’s terms to check the rate and conditions
            for each band.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <caption>
                Baselane balance bands — current rates available from the
                provider
              </caption>
              <thead>
                <tr>
                  <th scope="col">Balance</th>
                  <th scope="col">Savings rate</th>
                  <th scope="col">Bonus eligibility</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Below $10,000",
                  "$10,000–$24,999",
                  "$25,000–$49,999",
                  "$50,000 and above",
                ].map((band) => (
                  <tr key={band}>
                    <th scope="row">{band}</th>
                    <td>
                      <a href={source}>View current APY ↗</a>
                    </td>
                    <td>
                      <a href={source}>Check conditions ↗</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>
            This resource does not offer an Innflow savings account or quote a
            rate. Review the provider’s current disclosures before opening an
            account.
          </p>
        </section>
        <section className={styles.features}>
          <div className={styles.featureInner}>
            <h2>Look at the whole picture.</h2>
            <p>Topics to review in Baselane’s product information.</p>
            <div className={styles.featureGrid}>
              {features.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <a className={styles.button} href={source}>
              Read the provider’s details ↗
            </a>
          </div>
        </section>
        <section className={styles.section} id="fee-review">
          <h2>Make room for every cost.</h2>
          <p>
            A fee review is part of the decision. Confirm amounts, exceptions,
            and conditions directly with the provider.
          </p>
          <div className={styles.fees}>
            {fees.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <a href={source}>{item} ↗</a>
                    </li>
                  ))}
                </ul>
                <a href={source}>Review {group.title.toLowerCase()} fees ↗</a>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.support}>
          <h2>Keep the next step clear.</h2>
          <div>
            {[
              [
                "Ask",
                "Bring unresolved questions to the account provider. Keep their response alongside the information you reviewed.",
              ],
              [
                "Document",
                "Record the decision, its date, and the documents that informed it, so your team can follow the context.",
              ],
              [
                "Coordinate",
                "Connect the follow-up work in Innflow, with an owner and a clear next action.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.closing}>
          <h2>Bring the work together.</h2>
          <p>
            Keep property decisions connected to the people carrying them out.
          </p>
          <div className={styles.actions}>
            <a className={styles.outline} href="/BL/BL-demo">
              See Innflow →
            </a>
            <a className={styles.button} href={`${siteConfig.appOrigin}/login`}>
              Continue with Google
            </a>
          </div>
        </section>
      </div>
    </BaselaneHomepage>
  );
}
