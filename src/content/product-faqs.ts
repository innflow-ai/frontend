export type ProductFaq = {
  question: string;
  answer: string;
};

export const productFaqSlugs = [
  "platform",
  "agent-os",
  "ai-agents",
  "agentic-workflows",
  "databases",
  "skills",
] as const;

export type ProductFaqSlug = (typeof productFaqSlugs)[number];

const sharedFaqs: ProductFaq[] = [
  {
    question: "Does innflow replace our property-management system?",
    answer:
      "No. innflow coordinates work around the systems your team already uses. The PMS remains the system of record for leases, units, and accounting.",
  },
  {
    question: "How do humans stay in the loop?",
    answer:
      "Consequential steps can pause for approval. Agents prepare the next action with the attached context; a person reviews, edits, or rejects it before it continues.",
  },
  {
    question: "How is innflow deployed?",
    answer:
      "Teams start in the innflow workspace, connect the systems involved in one operation, and expand from there. Private or custom deployment is scoped with the innflow team — this site does not promise a specific timeline or hosting model.",
  },
  {
    question: "How does innflow handle security?",
    answer:
      "Access follows workspace permissions, connected-account scopes, and the approval points you place in a workflow. Public certification, VPC, and compliance claims are confirmed per implementation rather than advertised as blanket coverage.",
  },
];

const productFaqMap: Record<ProductFaqSlug, ProductFaq[]> = {
  platform: [
    {
      question: "What is the innflow platform?",
      answer:
        "innflow is property operations software with AI agents and visual workflows. One workspace for capturing a request, attaching context, routing the next step, and keeping a visible record — without replacing the property-management system of record.",
    },
    {
      question: "What can AI agents do here?",
      answer:
        "Agents use connected tools, knowledge, and workflow logic to move a defined task forward. They are not an open-ended chatbot and they are not promised unlimited autonomy.",
    },
    {
      question: "How do agents use memory and context?",
      answer:
        "Agents retrieve the files, tables, knowledge, and records you attach to the workflow. Context is scoped to the task; innflow does not treat every run as unsupervised training.",
    },
    ...sharedFaqs,
  ],
  "agent-os": [
    {
      question: "What is Agent OS?",
      answer:
        "Agent OS is the execution layer behind innflow agents: graph-based workflows, reusable skills, tools, triggers, and review points in one system. It is how work is planned, run, and inspected — not a black box.",
    },
    {
      question: "How does graph-based execution work?",
      answer:
        "A flow is a graph. Nodes call tools, models, or data; branches follow conditions you define; merge points bring paths back together. Predictable steps stay explicit. Model reasoning is used only where you place it.",
    },
    {
      question: "What memory does an agent keep?",
      answer:
        "Agents can use short-lived task context plus the knowledge, files, and records you connect. Persistent memory is the operational data you choose to store — not an unverified claim that accuracy improves automatically.",
    },
    {
      question: "Can we choose the model?",
      answer:
        "Model choice is configured per agent and workflow. Switching models does not remove the need to validate outputs and keep humans on consequential steps.",
    },
    ...sharedFaqs.filter((item) =>
      [
        "How do humans stay in the loop?",
        "How is innflow deployed?",
        "How does innflow handle security?",
      ].includes(item.question),
    ),
  ],
  "ai-agents": [
    {
      question: "What is an innflow AI agent?",
      answer:
        "An innflow agent is a governed worker: it uses tools, follows a workflow, and can pause for a person. It is more than a chatbot, and it is not a promise that any problem is solved in seconds.",
    },
    {
      question: "Do agents learn on their own?",
      answer:
        "No autonomous-learning claim is made. Agents improve when you add better context, skills, and review — not because they quietly rewrite themselves after every run.",
    },
    {
      question: "Can agents act without a person in the loop?",
      answer:
        "Only where you allow it. High-stakes handoffs — messages, money, access, or resident commitments — should keep an approval step. Exact boundaries are set per workflow.",
    },
    {
      question: "How do agents use tools and memory?",
      answer:
        "An agent runs with the integrations, skills, files, and knowledge you attach. Memory is that connected context, retrieved for the current task, not an unbounded personal history.",
    },
    ...sharedFaqs.filter((item) =>
      [
        "How is innflow deployed?",
        "How does innflow handle security?",
      ].includes(item.question),
    ),
  ],
  "agentic-workflows": [
    {
      question: "What is an agentic workflow?",
      answer:
        "A visual, reviewable process: trigger, conditions, connected actions, approvals, and execution history. Agents can plan and use tools inside that process — they do not replace the workflow you can inspect.",
    },
    {
      question: "Are retries and recovery automatic?",
      answer:
        "Recovery has to be designed for each workflow. innflow does not promise a universal retry policy or flawless execution.",
    },
    {
      question: "What should we automate first?",
      answer:
        "Start with one frequent, bounded handoff whose inputs, exceptions, and approval owner are already understood — a leasing follow-up, a maintenance intake, or a vendor request — then expand.",
    },
    ...sharedFaqs,
  ],
  databases: [
    {
      question: "What do innflow databases store?",
      answer:
        "Working tables, files, and knowledge the agents and workflows are allowed to retrieve. They support the operation; they are not a replacement for your PMS, CRM, or data warehouse.",
    },
    {
      question: "How does retrieval work?",
      answer:
        "Agents pull the records and documents you connect when a task needs them. Retrieval quality depends on what you store, how it is scoped, and whether a person reviews the result.",
    },
    {
      question: "Who can see this data?",
      answer:
        "Access follows workspace permissions and the systems you connect. Share only the sources a workflow needs, and keep approval on steps that expose resident or owner information.",
    },
    ...sharedFaqs.filter((item) =>
      [
        "Does innflow replace our property-management system?",
        "How does innflow handle security?",
      ].includes(item.question),
    ),
  ],
  skills: [
    {
      question: "What is an agent skill?",
      answer:
        "A reusable bundle of instructions, tools, and workflow logic an agent can run — a leasing follow-up, an intake classification, a report, or a similar bounded job.",
    },
    {
      question: "Are all skills live for property operations?",
      answer:
        "The library includes skills across operations and other functions. Each skill still needs your systems, permissions, and review points before it is production-ready for a portfolio.",
    },
    {
      question: "How do skills use our existing systems?",
      answer:
        "Point a skill at the connectors and knowledge you already use. Presence in the library does not, by itself, prove a given PMS or inbox integration is ready for your account.",
    },
    ...sharedFaqs.filter((item) =>
      [
        "How do humans stay in the loop?",
        "Does innflow replace our property-management system?",
      ].includes(item.question),
    ),
  ],
};

export function getProductFaqs(slug: string): ProductFaq[] {
  if ((productFaqSlugs as readonly string[]).includes(slug)) {
    return productFaqMap[slug as ProductFaqSlug];
  }
  return [];
}
