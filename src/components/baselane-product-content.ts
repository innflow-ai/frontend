export const productContent = {
  "tax-preparation": {
    title: "Bring a little order to tax season.",
    description:
      "Keep property documents, outstanding questions, and review steps connected so your team can prepare a clearer handoff to your tax professional.",
    intro: "Get the supporting details together.",
    band: false,
    panels: [
      {
        id: "review-packages",
        label: "Review packages",
        image: "packages",
        title: "Give every property a clear starting point.",
        text: "Organize the supporting records around each property and keep the review checklist alongside them.",
        preview: "Property review package",
        rows: [
          "Property records gathered",
          "Supporting files organized",
          "Open questions identified",
        ],
      },
      {
        id: "supporting-documents",
        label: "Supporting documents",
        image: "documents",
        title: "Keep the paperwork within reach.",
        text: "Bring useful documents and team notes into the same process, so the next person can follow the context behind each detail.",
        preview: "Document checklist",
        rows: ["Property information", "Supporting receipts", "Review notes"],
      },
      {
        id: "review-workflows",
        label: "Review workflows",
        image: "automation",
        title: "Make the next handoff easier.",
        text: "Assign the outstanding questions and include a human review before sharing your prepared information with an adviser.",
        preview: "Preparation workflow",
        rows: [
          "Gather information",
          "Resolve open questions",
          "Review with your team",
        ],
      },
    ],
    features: [
      ["Property context", "Keep the details organized around each property."],
      ["Shared checklists", "Give your team a consistent preparation process."],
      [
        "Clear review steps",
        "Keep professional review connected to the supporting information.",
      ],
    ],
    faqs: [
      [
        "How can Innflow help with tax preparation?",
        "Use connected knowledge and workflows to coordinate document gathering, team questions, and review steps before handing information to your tax professional.",
      ],
      [
        "Does this page provide tax filing or tax advice?",
        "This page describes document and workflow coordination. Your tax professional remains responsible for tax advice, returns, and filing requirements.",
      ],
      [
        "Can I keep property documents together?",
        "Organize preparation around property context so supporting records and open questions stay connected to the work.",
      ],
      [
        "Where can I see the available workflows?",
        "Book a demo to explore the workspace and discuss the preparation processes your team wants to connect.",
      ],
    ],
  },
  "rent-collection": {
    title: "Keep rental work moving, every month.",
    description:
      "Bring recurring requests, resident context, and team follow-ups into one connected flow, with a clear next step for every property.",
    intro: "A clearer rhythm for recurring work.",
    band: true,
    panels: [
      {
        id: "recurring-work",
        label: "Recurring workflows",
        image: "automation",
        title: "Spend less time chasing the next step.",
        text: "Connect recurring tasks with property context and clear ownership. Keep your team involved when a request needs a decision.",
        preview: "Monthly property workflow",
        rows: [
          "Review open requests",
          "Confirm property details",
          "Assign the next action",
        ],
      },
      {
        id: "property-activity",
        label: "Property activity",
        image: "deposits",
        title: "See where things stand.",
        text: "Keep a shared view of incoming requests, progress, and handoffs so the details stay connected to the property they belong to.",
        preview: "Property activity",
        rows: [
          "Oak Street · In progress",
          "Riverside · Ready for review",
          "Maple Avenue · Assigned",
        ],
      },
      {
        id: "resident-context",
        label: "Resident context",
        image: "tenant",
        title: "Make every conversation easier to follow.",
        text: "Bring resident questions and supporting information together. Give your team the context to respond with a clear, useful next step.",
        preview: "Resident request",
        rows: [
          "Property details attached",
          "Request owner assigned",
          "Response ready for review",
        ],
      },
    ],
    features: [
      [
        "Clear ownership",
        "Give every request a person responsible for the next step.",
      ],
      [
        "Connected records",
        "Keep property information beside the work it supports.",
      ],
      [
        "Repeatable handoffs",
        "Build a consistent path for recurring team processes.",
      ],
    ],
    faqs: [
      [
        "How does Innflow help with recurring property work?",
        "Innflow connects workflows, knowledge, and approval steps so your team can coordinate repeatable tasks with the information they need.",
      ],
      [
        "Can I organize work across several properties?",
        "Property context helps your team keep requests and supporting information connected as it moves between properties and processes.",
      ],
      [
        "Can people review the next step?",
        "Approval steps let your team review consequential actions and keep decisions connected to their supporting context.",
      ],
      [
        "Where can I explore the product?",
        "Book a demo to see the workspace and discuss which workflows fit your operation.",
      ],
    ],
  },
  accounting: {
    title: "Keep the details behind every decision together.",
    description:
      "Connect property records, supporting documents, and review steps in a workspace that helps your team stay organized as the work moves forward.",
    intro: "Less searching. More useful context.",
    band: false,
    panels: [
      {
        id: "connected-records",
        label: "Connected records",
        image: "automation",
        title: "Put each detail in the right context.",
        text: "Keep records and supporting information connected to their property and process, so your team can follow the work without starting over.",
        preview: "Property record",
        rows: [
          "52 Beachfront",
          "Maintenance documentation",
          "Supporting details attached",
        ],
      },
      {
        id: "shared-visibility",
        label: "Shared visibility",
        image: "reporting",
        title: "Turn scattered updates into a clearer view.",
        text: "Bring ownership, progress, and review points together so your team knows where to focus and what needs attention next.",
        preview: "Work overview",
        rows: ["Requests organized", "Owners assigned", "Reviews in progress"],
      },
      {
        id: "document-workflows",
        label: "Document workflows",
        image: "tax",
        title: "Keep the supporting documents close.",
        text: "Connect procedures and property documents to the work they support, with a clear review path before the next handoff.",
        preview: "Review checklist",
        rows: ["Property records", "Supporting documents", "Team review notes"],
      },
    ],
    features: [
      [
        "Shared knowledge",
        "Keep useful procedures and documents within reach.",
      ],
      [
        "Property context",
        "Organize information around the property it belongs to.",
      ],
      [
        "Repeatable workflows",
        "Give routine processes a consistent path forward.",
      ],
      ["Supporting documents", "Connect the details behind each request."],
      ["Human approvals", "Keep people involved in consequential decisions."],
      [
        "Clear handoffs",
        "Make the next action and its owner easier to follow.",
      ],
    ],
    faqs: [
      [
        "How can Innflow help organize property records?",
        "Innflow connects knowledge and workflows so your team can keep supporting information close to the questions, requests, and decisions it belongs to.",
      ],
      [
        "Can a team share context across properties?",
        "A connected workspace helps your team follow property-specific records and recurring processes without losing the wider context.",
      ],
      [
        "How can I review the available workflows?",
        "Book a demo to explore the product and discuss the document and review processes your team wants to connect.",
      ],
    ],
  },
};
export type ProductPageKind = keyof typeof productContent;
