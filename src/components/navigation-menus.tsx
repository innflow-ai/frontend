import { FeaturesMenu } from "./features-menu";
import styles from "./navigation-menus.module.css";
import type { NavigationLabel } from "./navigation-labels";

type Item = { name: string; href?: string };

const resources = [
  {
    name: "Learn",
    more: "/resources",
    items: [
      { name: "Docs", href: "https://docs.innflow.ai" },
      { name: "Blog", href: "/blog" },
      { name: "Resource Library", href: "/resources" },
    ],
  },
  {
    name: "Explore",
    more: "/resources",
    items: [
      { name: "Customer Stories", href: "/our-customers" },
      { name: "Product Updates", href: "/product-updates" },
      { name: "Webinars", href: "/webinars" },
    ],
  },
  {
    name: "Get help",
    more: "/help",
    items: [
      { name: "Help Center", href: "/help" },
      { name: "Contact", href: "/contact" },
      { name: "Partnerships", href: "/partner-with-us" },
    ],
  },
];

const departments: Item[][] = [
  [
    { name: "Marketing" },
    { name: "IT & Engineering" },
    { name: "Customer Service", href: "/industries/customer-service" },
  ],
  [
    { name: "Sales" },
    { name: "Operations", href: "/operations" },
    { name: "Finance", href: "/industries/finance" },
  ],
  [
    { name: "HR & Recruitment", href: "/industries/hr-recruitment" },
    { name: "Productivity" },
  ],
];

const integrations: Item[] = [
  { name: "Salesforce", href: "/integrations/salesforce" },
  { name: "HubSpot", href: "/integrations/hubspot" },
  { name: "Slack", href: "/integrations/slack" },
  { name: "Google Calendar", href: "/integrations/google-calendar" },
  { name: "OpenAI", href: "/integrations/openai" },
];

const providers = [
  {
    name: "OpenAI",
    models: [
      "GPT-6.2 Astra",
      "GPT-6.2 Sol",
      "GPT-6 Astra",
      "GPT-6.1 Sol",
      "GPT-6 Sol",
    ],
  },
  {
    name: "Google",
    models: [
      "Gemini 4 Neon",
      "Gemini Omni 1.2 Flash",
      "Gemini 4 Carbon",
      "Gemini 4 Argon",
    ],
  },
  { name: "xAI", models: ["Grok 4.7", "Grok 4.6"] },
  {
    name: "Anthropic",
    models: ["Claude Fable 5.2", "Claude Opus 5.5", "Claude Sonnet 5.5", "Claude Haiku 5.5"],
  },
  { name: "Moonshot AI", models: ["Kimi K3.1 Pro"] },
  { name: "DeepSeek", models: ["DeepSeek V4.1 Flash 1017", "DeepSeek V4 Pro 0813"] },
  { name: "Z.ai", models: ["GLM-5.3", "GLM-5.3-Flash", "GLM-5.3-FlashX"] },
  { name: "Tencent", models: ["Hunyuan 4"] },
  { name: "Alibaba Cloud", models: ["Qwen4-Max"] },
];

function iconPath(section: string, name: string) {
  return (
    "/brand/navigation/menu/" +
    section +
    "-" +
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
    ".png"
  );
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
    return (
      <>
        <FeaturesMenu closeMenu={close} />
        <div className={styles.productFoot}>
          <a className={styles.action} href="/products" onClick={close}>
            Browse all products →
          </a>
        </div>
      </>
    );
  if (label === "Models")
    return (
      <div className={styles.directory}>
        <div className={styles.providers}>
          {providers.map((provider, index) => (
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
                  <li className={styles.model} key={name}>{name}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className={styles.modelFoot}>
          Let Innflow route your work. Explore Fusion
        </p>
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
                View more →
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
            View all solutions →
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
              section="solutions"
              key={item.name}
              item={item}
              close={close}
            />
          ))}
          <a className={styles.all} href="/integrations" onClick={close}>
            View all integrations →
          </a>
        </div>
      </section>
    </div>
  );
}
