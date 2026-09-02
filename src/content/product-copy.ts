import type { ProductPage, ProductPageSection } from "@/lib/product-pages";

/**
 * Verified replacements for Framer/Sanity product-page copy that still
 * carries Beam-era claims (self-evolving, 100x, SOC 2, ISO, zero delay).
 * Applied on both the JSON fallback and Sanity-fetched pages.
 */
const replacements: ReadonlyArray<readonly [string, string]> = [
  [
    "A single, enterprise-grade solution to create and manage your team of AI agents. Our agentic platform offers a wide array of tools designed to seamlessly transition your organization into an AI-native future.",
    "Property operations software with AI agents and visual workflows. One workspace to capture a request, attach context, route the next step, and keep a visible record — without replacing the system of record.",
  ],
  [
    "innflow.ai is hosted in the EU and is GDPR-compliant. With ISO 27001 and SOC Type II certifications, we employ all the guardrails necessary to provide a safe and reliable automation experience. The priorities are simple: protect user data and continuously improve security protocols to remain a trustworthy agentic automation platform.",
    "Access follows workspace permissions, connected-account scopes, and the approval points you place in a workflow. Public certification, hosting region, and compliance claims are confirmed per implementation rather than advertised as blanket coverage.",
  ],
  [
    "The First Self-Evolving Execution Engine for AI agents | Innflow AI Agent Platform",
    "Graph-based execution for innflow agents | innflow",
  ],
  [
    "The First Self-Evolving Execution Engine for AI agents",
    "Graph-based execution for innflow agents",
  ],
  [
    "Agent OS is innflow.ai's proprietary framework for production AI agents. Unlike static automation, innflow.ai agents learn from every interaction. Improving accuracy automatically without manual maintenance. Graph-based execution combines workflow reliability with AI flexibility. Multi-agent orchestration scales to enterprise complexity. The result is agents that get better every day, not agents that stay broken for weeks.",
    "Agent OS is the execution layer behind innflow agents: graph-based workflows, reusable skills, tools, triggers, and review points in one system. Predictable steps stay explicit. Model reasoning is used only where you place it.",
  ],
  [
    'Execute the "Agentic" way, with 100x more speed and efficiency, through an autonomous powerhouse of an agent.',
    "Run the next step through an agent with connected tools, attached context, and the workflow graph you defined — not an unsupervised black box.",
  ],
  [
    "AI-native tools: Your stack, supercharged",
    "Connected tools: your stack, in the flow",
  ],
  ["AI-native tools", "Connected tools"],
  ["Zero delay", "Visible handoffs"],
  ["SOC 2", "Human approval"],
  [
    "Contextual Understanding on an Intuitive AI-native Platform",
    "Context the workflow can retrieve",
  ],
  [
    "What makes AI agents intelligent is their ability to dynamically retrieve context, reach into memory and provide task solutions based on precedence, making AI agents truly human-like.",
    "Agents retrieve the files, tables, and records you store, then use that context on the current task — scoped recall, not a claim that the system thinks like a person.",
  ],
  [
    "innflow.ai allows users to fill their database with any documentation they think will assist with accurate data recall, updating its memory with any developments, providing as human-like an experience as possible.",
    "Store the documents, tables, and notes a workflow should retrieve. Context is what you add and keep current — not an unverified claim of human-like memory.",
  ],
  [
    "Everything you need to build, deploy, and improve AI agents at enterprise scale. From graph-based execution to self-learning, these capabilities make innflow.ai agents production-ready.",
    "Graph-based execution, reusable skills, tools, triggers, and review points — the capabilities that make innflow agents inspectable in production.",
  ],
  [
    "This is what makes innflow.ai different. Agents learn from failures automatically. 5% accuracy to 100% in 30 seconds. No manual prompt engineering. VW chose us for this.",
    "When a run fails, a person can mark what went wrong and update the prompt, skill, or context. innflow does not claim accuracy jumps on its own, and it does not cite unverified customer results.",
  ],
  [
    "The Learning Hub tracks tool performance across all workflow nodes, identifying underperforming tools below accuracy thresholds. When outputs fail, mark what went wrong. AI analyzes failures, identifies patterns, and rewrites prompts with clearer instructions. Validation testing automatically retests against failed cases before deployment. Transform 5% accuracy to 100% in about 30 seconds.",
    "Failed runs can be inspected, annotated, and used to update prompts and skills. Accuracy is what you measure and approve — not an automatic jump advertised in seconds.",
  ],
  [
    "Self-learning for agents that improve automatically",
    "Review and iteration so agents stay under your control",
  ],
  [
    "Agents that learn from every interaction",
    "Agents that use the context you attach",
  ],
  ["Self-learning", "Review and iteration"],
  ["self-learning", "review-and-iteration"],
  [
    "Automatic prompt rewriting from failure patterns",
    "Inspect failed runs and update prompts",
  ],
  [
    "Learns domain expertise automatically (libraries, formulas, industry conventions)",
    "Keep domain knowledge in skills and connected records",
  ],
  [
    "Self-corrects when it learns wrong behaviors",
    "A person decides what to change after a bad run",
  ],
];

export function rewriteVerifiedProductText(value: string): string {
  let next = value;
  for (const [from, to] of replacements) {
    if (next.includes(from)) {
      next = next.split(from).join(to);
    }
  }
  return next;
}

function rewriteSection(section: ProductPageSection): ProductPageSection {
  if (section._type === "productIntroSection") {
    return {
      ...section,
      eyebrow: section.eyebrow
        ? rewriteVerifiedProductText(section.eyebrow)
        : section.eyebrow,
      heading: rewriteVerifiedProductText(section.heading),
      body: rewriteVerifiedProductText(section.body),
    };
  }
  if (section._type === "productCapabilitiesSection") {
    return {
      ...section,
      cards: section.cards.map((card) => ({
        ...card,
        title: rewriteVerifiedProductText(card.title),
        body: rewriteVerifiedProductText(card.body),
        image: {
          ...card.image,
          alt: rewriteVerifiedProductText(card.image.alt),
        },
      })),
    };
  }
  if (section._type === "productDetailSection") {
    return {
      ...section,
      tocLabel: rewriteVerifiedProductText(section.tocLabel),
      title: rewriteVerifiedProductText(section.title),
      body: rewriteVerifiedProductText(section.body),
      anchor: rewriteVerifiedProductText(section.anchor),
      points: section.points.map(rewriteVerifiedProductText),
      image: {
        ...section.image,
        alt: rewriteVerifiedProductText(section.image.alt),
      },
    };
  }
  return {
    ...section,
    eyebrow: section.eyebrow
      ? rewriteVerifiedProductText(section.eyebrow)
      : section.eyebrow,
    heading: rewriteVerifiedProductText(section.heading),
    body: rewriteVerifiedProductText(section.body),
  };
}

export function applyVerifiedProductCopy(page: ProductPage): ProductPage {
  return {
    ...page,
    title: rewriteVerifiedProductText(page.title),
    seo: {
      ...page.seo,
      title: rewriteVerifiedProductText(page.seo.title),
      description: rewriteVerifiedProductText(page.seo.description),
    },
    hero: {
      ...page.hero,
      title: rewriteVerifiedProductText(page.hero.title),
      body: rewriteVerifiedProductText(page.hero.body),
      image: {
        ...page.hero.image,
        alt: rewriteVerifiedProductText(page.hero.image.alt),
      },
    },
    sections: page.sections.map(rewriteSection),
  };
}
