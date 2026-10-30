(() => {
  // Resolve assets relative to this script, so the host page can live anywhere.
  const base = new URL(".", document.currentScript.src);
  const asset = (name) => new URL(`assets/${name}.svg`, base).href;
  const portrait = (name) => new URL(`assets/portraits/${name}.png`, base).href;
  const escapeHtml = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  // All conversations and outcomes below are illustrative demo content.
  const agents = [
    {
      id: "research",
      label: "Research",
      title: "Research Agent",
      hue: "0deg",
      accent: "#2463dc",
      description:
        "Turns scattered information into a clear brief, with the sources close at hand.",
      model: "OpenAI",
      modelIcon: "openai",
      apps: [
        ["google-drive", "Google Drive"],
        ["notion", "Notion"],
        ["slack", "Slack"],
      ],
      person: "Maya Chen",
      portrait: "maya-chen",
      prompt:
        "We're meeting Northstar tomorrow. Pull together what we know about them, their recent news, and where we could help.",
      steps: [
        "Finding the company and recent announcements",
        "Reading the notes from your last conversation",
        "Connecting the research to your offering",
        "Putting together a brief with sources",
      ],
      result: "Your meeting brief is ready.",
      detail:
        "Three useful talking points, two open questions, and the context from your last call. All in one place.",
      file: "Northstar · Meeting brief",
      fileType: "Research brief · 3 sections",
      fileIcon: "google-docs",
      rows: [
        ["Company context", "Team, product, priorities"],
        ["Recent developments", "Expansion into Europe"],
        ["Suggested talking point", "Scaling customer onboarding"],
      ],
    },
    {
      id: "content",
      label: "Content",
      title: "Content Agent",
      hue: "85deg",
      accent: "#a34083",
      description:
        "Finds the content that needs attention and helps turn your ideas into the next draft.",
      model: "Anthropic",
      modelIcon: "anthropic",
      apps: [
        ["notion", "Notion"],
        ["google-docs", "Google Docs"],
        ["slack", "Slack"],
      ],
      person: "Alex Morgan",
      portrait: "alex-morgan",
      prompt:
        "Which of our articles need a refresh? Start with the ones losing traffic and draft the changes for review.",
      steps: [
        "Comparing article performance with last month",
        "Checking the pages with the largest declines",
        "Finding outdated sections and missing examples",
        "Drafting updates for your review",
      ],
      result: "Three articles would benefit from a refresh.",
      detail:
        "The first draft updates the onboarding guide with clearer examples and a shorter path to getting started.",
      file: "Onboarding guide · Refresh draft",
      fileType: "Draft document · Ready for review",
      fileIcon: "google-docs",
      rows: [
        ["Getting started", "Simplified introduction"],
        ["Workflow examples", "2 examples added"],
        ["Next step", "Review before publishing"],
      ],
    },
    {
      id: "spend",
      label: "Ad spend",
      title: "Ad Spend Agent",
      hue: "330deg",
      accent: "#087b91",
      description:
        "Connects campaign spend to outcomes so you can see where the budget is going.",
      model: "OpenAI",
      modelIcon: "openai",
      apps: [
        ["meta", "Meta"],
        ["hubspot", "HubSpot"],
        ["google-sheets", "Google Sheets"],
      ],
      person: "Priya Shah",
      portrait: "priya-shah",
      prompt:
        "Our prospecting campaign is spending more this week. Is it bringing in qualified leads, or should we move the budget?",
      steps: [
        "Comparing spend and conversions by campaign",
        "Matching new leads to CRM records",
        "Checking the cost per qualified lead",
        "Preparing a budget recommendation",
      ],
      result: "Spend is up, but qualified leads haven't followed.",
      detail:
        "The comparison points to the retargeting campaign as the stronger performer. A proposed budget change is ready for your approval.",
      file: "Campaign spend · Weekly comparison",
      fileType: "Example report · 3 campaigns",
      fileIcon: "google-sheets",
      rows: [
        ["Prospecting", "$148 / qualified lead"],
        ["Retargeting", "$62 / qualified lead"],
        ["Brand search", "$45 / qualified lead"],
      ],
    },
    {
      id: "pipeline",
      label: "Pipeline",
      title: "Pipeline Agent",
      hue: "180deg",
      accent: "#a46428",
      description:
        "Keeps the next step visible, from a first conversation to a deal ready to move.",
      model: "Anthropic",
      modelIcon: "anthropic",
      apps: [
        ["hubspot", "HubSpot"],
        ["google-gmail", "Gmail"],
        ["slack", "Slack"],
      ],
      person: "Jordan Brooks",
      portrait: "jordan-brooks",
      prompt:
        "Look through the open deals. Who hasn't heard from us in a while? Draft a useful follow-up for each one.",
      steps: [
        "Reviewing open deals and recent activity",
        "Finding conversations without a next step",
        "Reading the last email in each thread",
        "Drafting a follow-up with relevant context",
      ],
      result: "Four conversations are ready for a follow-up.",
      detail:
        "Each draft picks up where you left off. The Northstar email includes the implementation timeline they asked for.",
      file: "Pipeline follow-ups",
      fileType: "Email drafts · Awaiting review",
      fileIcon: "google-gmail",
      rows: [
        ["Northstar", "Send implementation timeline"],
        ["Canopy", "Check in after the demo"],
        ["Fieldwork", "Answer integration questions"],
      ],
    },
    {
      id: "support",
      label: "Support",
      title: "Support Agent",
      hue: "155deg",
      accent: "#8b6d17",
      description:
        "Brings related customer questions together and helps the team respond with context.",
      model: "OpenAI",
      modelIcon: "openai",
      apps: [
        ["slack", "Slack"],
        ["notion", "Notion"],
        ["google-gmail", "Gmail"],
      ],
      person: "Daniel Park",
      portrait: "daniel-park",
      prompt:
        "We've had a few questions about CSV imports today. Are they connected? Find the issue and draft a reply for the team.",
      steps: [
        "Collecting the recent import conversations",
        "Comparing the examples customers shared",
        "Checking the import troubleshooting guide",
        "Drafting a response with a next step",
      ],
      result: "The reports point to the same date-format mismatch.",
      detail:
        "The response explains the supported format and includes an example file. It's ready for the support team to check and send.",
      file: "CSV import · Suggested response",
      fileType: "Support draft · Shared issue",
      fileIcon: "notion",
      rows: [
        ["What happened", "Mixed date formats"],
        ["Suggested fix", "Use YYYY-MM-DD"],
        ["Include in reply", "Example import template"],
      ],
    },
    {
      id: "finance",
      label: "Finance",
      title: "Finance Agent",
      hue: "45deg",
      accent: "#7650b7",
      description:
        "Reconciles the details across invoices and payments, and flags what needs a closer look.",
      model: "Anthropic",
      modelIcon: "anthropic",
      apps: [
        ["stripe", "Stripe"],
        ["google-sheets", "Google Sheets"],
        ["google-drive", "Google Drive"],
      ],
      person: "Amara Davis",
      portrait: "amara-davis",
      prompt:
        "Compare this month's invoices with the payment export. Flag anything that doesn't match and put the summary in a sheet.",
      steps: [
        "Reading the invoice and payment exports",
        "Matching records by invoice reference",
        "Checking amounts, dates, and currencies",
        "Preparing the reconciliation summary",
      ],
      result: "Most records match. Three need a closer look.",
      detail:
        "Two payments have different reference numbers, and one invoice is still outstanding. The exceptions are separated for review.",
      file: "October · Reconciliation summary",
      fileType: "Example spreadsheet · 3 exceptions",
      fileIcon: "google-sheets",
      rows: [
        ["INV-2041", "Reference mismatch"],
        ["INV-2057", "Reference mismatch"],
        ["INV-2063", "Payment outstanding"],
      ],
    },
  ];

  class AgentShowcase extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.animations = [];
    }
    connectedCallback() {
      if (this.shadowRoot.childElementCount) return;
      this.shadowRoot.innerHTML = `<link rel="stylesheet" href="${new URL("agent-showcase.css", base).href}"><section class="showcase" aria-label="Explore Innflow agent examples"><nav class="rail" aria-label="Agents"><div class="tabs" role="tablist" aria-label="Agent examples" aria-orientation="vertical">${agents.map((agent) => `<button class="tab" type="button" role="tab" id="tab-${agent.id}" aria-controls="agent-panel" aria-selected="false" tabindex="-1" data-agent="${agent.id}" style="--hue:${agent.hue};--accent:${agent.accent}"><img class="avatar" src="${asset("agent")}" alt="" width="27" height="27"><span class="tab-label">${agent.label}</span></button>`).join("")}</div></nav><div class="panel" id="agent-panel" role="tabpanel" tabindex="0"></div><span class="visually-hidden" role="status" aria-live="polite"></span></section>`;
      this.shadowRoot
        .querySelector(".tabs")
        .addEventListener("click", (event) => {
          const tab = event.target.closest("[data-agent]");
          if (tab) this.selectAgent(tab.dataset.agent);
        });
      this.shadowRoot
        .querySelector(".tabs")
        .addEventListener("keydown", (event) => {
          const tabs = [...this.shadowRoot.querySelectorAll("[role=tab]")];
          const index = tabs.indexOf(event.target);
          if (index < 0) return;
          let next;
          if (event.key === "ArrowDown") next = (index + 1) % tabs.length;
          if (event.key === "ArrowUp")
            next = (index - 1 + tabs.length) % tabs.length;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = tabs.length - 1;
          if (next === undefined) return;
          event.preventDefault();
          tabs[next].focus();
          this.selectAgent(tabs[next].dataset.agent);
        });
      this.selectAgent(this.getAttribute("agent") || agents[0].id, false);
    }
    disconnectedCallback() {
      for (const animation of this.animations) animation.cancel();
    }
    selectAgent(id, animate = true) {
      const agent = agents.find((item) => item.id === id) || agents[0];
      if (this.selectedAgent === agent.id) return;
      for (const animation of this.animations) animation.cancel();
      this.animations = [];
      this.selectedAgent = agent.id;
      for (const tab of this.shadowRoot.querySelectorAll("[role=tab]")) {
        const selected = tab.dataset.agent === agent.id;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      }
      const panel = this.shadowRoot.querySelector(".panel");
      panel.setAttribute("aria-labelledby", `tab-${agent.id}`);
      panel.style.setProperty("--accent", agent.accent);
      panel.style.setProperty("--hue", agent.hue);
      panel.innerHTML = `<header class="reveal"><div class="agent-heading"><img class="avatar" src="${asset("agent")}" alt="" width="36" height="36"><h2>${escapeHtml(agent.title)}</h2></div><p class="description">${escapeHtml(agent.description)}</p><div class="connections"><span class="model"><img src="${asset(agent.modelIcon)}" alt="" width="13" height="13">${escapeHtml(agent.model)}</span><span class="connection-list" aria-label="Example connected apps">${agent.apps.map(([icon, name]) => `<img src="${asset(icon)}" alt="${escapeHtml(name)}" title="${escapeHtml(name)}" width="15" height="15">`).join("")}</span></div></header><div class="conversation"><div class="reveal"><p class="speaker"><img class="person" src="${portrait(agent.portrait)}" alt="" width="28" height="28">${escapeHtml(agent.person)}</p><p class="prompt">${escapeHtml(agent.prompt)}</p></div><p class="agent-name reveal">${escapeHtml(agent.title)}</p><ul class="steps">${agent.steps.map((step) => `<li class="reveal"><span class="step-mark" aria-hidden="true">✓</span><span>${escapeHtml(step)}</span></li>`).join("")}</ul><div class="reveal"><p class="result"><strong>${escapeHtml(agent.result)}</strong></p><p class="detail">${escapeHtml(agent.detail)}</p></div><details class="artifact reveal"><summary><img src="${asset(agent.fileIcon)}" alt="" width="22" height="22"><span class="artifact-label">${escapeHtml(agent.file)}<span>${escapeHtml(agent.fileType)}</span></span><span class="chevron" aria-hidden="true"></span></summary><div class="artifact-body">${agent.rows.map(([label, value]) => `<div class="artifact-row"><span>${escapeHtml(label)}</span><span>${escapeHtml(value)}</span></div>`).join("")}</div></details><p class="demo-note reveal">Example conversation · Illustrative data</p></div>`;
      if (animate && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        this.animations = [...panel.querySelectorAll(".reveal")].map(
          (element, index) =>
            element.animate(
              [
                {
                  opacity: 0,
                  transform: "translateY(7px)",
                  filter: "blur(2px)",
                },
                { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
              ],
              {
                duration: 300,
                delay: Math.min(index * 28, 220),
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "backwards",
              },
            ),
        );
      }
      this.shadowRoot.querySelector("[role=status]").textContent = animate
        ? `${agent.title} example selected`
        : "";
      this.dispatchEvent(
        new CustomEvent("agent-change", {
          detail: { id: agent.id },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }
  if (!customElements.get("innflow-agent-showcase"))
    customElements.define("innflow-agent-showcase", AgentShowcase);
})();
