# Blog Split taxonomy and pipeline audit

Audited on 2026-10-04. Read every record title and available classification metadata across 1,146 records, with descriptions, visual briefs, and article openings inspected for the queued assignments. This is a taxonomy audit, not fact-checking or publishing approval.

Scope: classify all six Queued posts; add supported category options. Other page assignments are preserved. The pipeline includes 710 Archived records and 436 records in other statuses.

## Queued assignments

| Blog | Previous Split | Split | Rationale |
| --- | --- | --- | --- |
| [Zapier Vs. Tray.AI Comparison: Enterprise Automation](https://app.notion.com/p/Zapier-Vs-Tray-AI-Comparison-Enterprise-Automation-3ea0ac1bd32e81179c5ec988dea246d7) | Comparison (w/o innflow) | Comparison (w/o innflow) | Head-to-head Zapier and Tray.ai comparison; Innflow is not an evaluated option. |
| [Innflow + Gmail: 7 Tips for Inbox Triage and Better Reply Drafts](https://app.notion.com/p/Innflow-Gmail-7-Tips-for-Inbox-Triage-and-Better-Reply-Drafts-3e90ac1bd32e8188ac9dcbb3ac7f6cff) | Integration | Integration | The main deliverable is connecting Gmail to Innflow for inbox triage and drafts. |
| [AI Features vs AI Operations for Property Managers](https://app.notion.com/p/AI-Features-vs-AI-Operations-for-Property-Managers-3d40ac1bd32e81f0996fd6ec9bb6fbd4) | Uncatagorized | Comparison | The article explicitly contrasts PMS-native AI with the cross-system operating approach that Innflow represents; its supplied visual brief is a comparison matrix. |
| [Governed AI tools for property ops: what Innflow agents can and cannot do](https://app.notion.com/p/Governed-AI-tools-for-property-ops-what-Innflow-agents-can-and-cannot-do-3d10ac1bd32e810dad2df0bd0e8365d5) | Uncatagorized | Security & Governance | Permissions, human review gates, prohibited autonomous actions, and auditability are the main subject. |
| [Model flexibility without lock-in for property automation stacks](https://app.notion.com/p/Model-flexibility-without-lock-in-for-property-automation-stacks-3d10ac1bd32e816fb99ae56752a173ee) | Uncatagorized | AI Models | Model portability and changing providers without rebuilding workflows are the main subject. |
| [Giving AI agents reliable app access (MCP-style) for property workflows](https://app.notion.com/p/Giving-AI-agents-reliable-app-access-MCP-style-for-property-workflows-3d10ac1bd32e817f8ecee6b9280af50e) | Uncatagorized | Integration | Named MCP-style app actions and reliable access to connected systems are the main subject. |

## Split definitions and visual families

Each option has a stable routing key. Existing option names and IDs are retained. The legacy spelling `Uncatagorized` remains to avoid breaking current filters.

| Split | Routing key | Use when | Visual family |
| --- | --- | --- | --- |
| Uncatagorized | `needs-review` | Unresolved or insufficient source material. Do not generate artwork until a real Split is selected. | hold-for-review |
| Property Management | `property-management` | Property operations, leasing, maintenance, accounting, housing rules, and landlord guidance when no more specific editorial format applies. Property context alone does not override an integration or comparison. | property-photograph-and-one-relevant-ops-card |
| Integration | `integration` | Connecting named apps, APIs, MCP tools, or data between systems. A coding-agent runtime itself belongs in Harness. Mentioning an app incidentally does not make a post an integration. | connected-app-tiles-or-one-app-action-card |
| Harness | `harness` | Agent execution environments, coding-agent tools, runtime architecture, memory, planning, and orchestration. Distinct from the underlying model, app connections, and step-by-step business workflow recipes. | one-agent-runtime-or-orchestration-component |
| General | `general` | Broad automation explainers, adoption, strategy, and productivity that do not fit a more specific Split. Use only after checking the specific categories. | one-focused-explainer-component |
| Comparison | `comparison-innflow` | An actual comparison with Innflow or its operating approach as a central evaluated option. A generic Innflow CTA does not qualify. Quantitative model benchmark analysis belongs in Benchmarks & Evaluations. | balanced-comparison-with-innflow |
| Comparison (w/o innflow) | `comparison-external` | Comparing two or more external products, providers, plans, or shortlisted tools, with no substantive Innflow comparison. Use neutral criteria and only evidenced claims. | balanced-external-comparison |
| AI Models (added) | `ai-models` | Evergreen model capabilities, providers, model selection, and model portability. Dated model launches belong in Model Releases; score-led testing belongs in Benchmarks & Evaluations; execution environments belong in Harness. | model-provider-tiles-or-model-router |
| Benchmarks & Evaluations (added) | `benchmarks-evaluations` | Model or agent benchmarks, leaderboards, test methodology, evals, and observability of quality. Scores and rankings must be sourced; never invent decorative performance numbers. | evaluation-table-or-supported-results-card |
| Security & Governance (added) | `security-governance` | AI/app permissions, approval gates, privacy, access control, and auditability. General housing and landlord law stays Property Management unless AI system governance is the main subject. | permission-gate-or-audit-card |
| Workflow Guides (added) | `workflow-guides` | Actionable business workflow recipes, implementation steps, troubleshooting, and reusable operational patterns. A named app connection, security control, or downloadable template takes its more specific Split. | one-workflow-component-with-clear-steps |
| Software Reviews (added) | `software-reviews` | A substantive review of one software product: features, pricing, suitability, and limitations. Multiple evaluated alternatives belong in a Comparison Split; a product launch belongs in News & Updates. | single-product-card-with-review-criteria |
| Templates & Calculators (added) | `templates-calculators` | An actual reusable template, form, letter, checklist, spreadsheet, or calculator is the main deliverable. A generic guide containing a short checklist is not sufficient. | one-document-form-or-calculator-component |
| Market Insights (added) | `market-insights` | Geographic market reports, housing trends, investment-market data, and economic statistics. AI model testing belongs in Benchmarks & Evaluations; company announcements belong in News & Updates. | location-photograph-with-sourced-data-card |
| News & Updates (added) | `news-updates` | Dated industry developments, company announcements, product releases, funding, and research-report coverage. Model releases and benchmark reports use their dedicated Splits. | one-announcement-or-source-summary-card |

## Evidence for new categories

### AI Models

- [SWE-2 Pushes Cognition's Coding Model Forward](https://app.notion.com/p/SWE-2-Pushes-Cognition-s-Coding-Model-Forward-3ea0ac1bd32e81b59ab2ffa4637bc45d) (Pending)
- [GPT-Live-1 Brings Full-Duplex Voice to the API](https://app.notion.com/p/GPT-Live-1-Brings-Full-Duplex-Voice-to-the-API-3ea0ac1bd32e819f881ae41fac2bc6b5) (Pending)
- [Claude Opus 5.5: What’s New for AI Agents](https://app.notion.com/p/Claude-Opus-5-5-What-s-New-for-AI-Agents-3e90ac1bd32e81e09b62f6419a8dec1a) (Draft)
- [Model flexibility without lock-in for property automation stacks](https://app.notion.com/p/Model-flexibility-without-lock-in-for-property-automation-stacks-3d10ac1bd32e816fb99ae56752a173ee) (Queued)

### Benchmarks & Evaluations

- [Scale's Seal Leaderboards](https://app.notion.com/p/Scale-s-Seal-Leaderboards-3ef0ac1bd32e8151b1d7e8e25f534ebe) (Pending)
- [Evaluating Models On Adaptive Reasoning, Sat Questions & Real-World Classification Tasks](https://app.notion.com/p/Evaluating-Models-On-Adaptive-Reasoning-Sat-Questions-Real-World-Classification-Tasks-3ef0ac1bd32e81f1bf05f95a5df5a418) (Pending)
- [AI Observability 2026: Tracing And Measuring Quality](https://app.notion.com/p/AI-Observability-2026-Tracing-And-Measuring-Quality-3ee0ac1bd32e812b8aede2ff038d8169) (Pending)
- [Aa-Briefcase: Agentic Knowledge Work Benchmark](https://app.notion.com/p/Aa-Briefcase-Agentic-Knowledge-Work-Benchmark-3ee0ac1bd32e81838fc9f0f96cd5c2b6) (Pending)
- [Why Public AI Coding Benchmarks Mislead: A Structured Analysis of Contamination, Verifiers, and DeepSWE](https://app.notion.com/p/Why-Public-AI-Coding-Benchmarks-Mislead-A-Structured-Analysis-of-Contamination-Verifiers-and-Deep-3c20ac1bd32e815ea823d06b2b21d347) (Draft)

### Security & Governance

- [What Is Security Automation? A Complete Guide For 2026](https://app.notion.com/p/What-Is-Security-Automation-A-Complete-Guide-For-2026-3ef0ac1bd32e81c38e2cfba44653a210) (Pending)
- [How to Add a Human Approval Step to a Workflow](https://app.notion.com/p/How-to-Add-a-Human-Approval-Step-to-a-Workflow-3eb0ac1bd32e810fb070d48a1b0ff7a7) (Draft)
- [Governed AI tools for property ops: what Innflow agents can and cannot do](https://app.notion.com/p/Governed-AI-tools-for-property-ops-what-Innflow-agents-can-and-cannot-do-3d10ac1bd32e810dad2df0bd0e8365d5) (Queued)
- [4 AI Security Mistakes and How to Avoid Them](https://app.notion.com/p/4-AI-Security-Mistakes-and-How-to-Avoid-Them-3c20ac1bd32e815892d9c189582d2352) (Draft)
- [10 Best Practices for AI Workflow Security](https://app.notion.com/p/10-Best-Practices-for-AI-Workflow-Security-3c20ac1bd32e8174a33cf7eb73d0cb9c) (Draft)

### Workflow Guides

- [The 9 Best Agentic Workflow Patterns In 2026](https://app.notion.com/p/The-9-Best-Agentic-Workflow-Patterns-In-2026-3d30ac1bd32e813c8fb5edcab6e27beb) (Draft)
- [5 AI Workflows to Reclaim Time Each Week](https://app.notion.com/p/5-AI-Workflows-to-Reclaim-Time-Each-Week-3c20ac1bd32e81a1bdacc140ae6bc41c) (Draft)
- [AI Workflow Troubleshooting Guide](https://app.notion.com/p/AI-Workflow-Troubleshooting-Guide-3c20ac1bd32e812ebdbffb33d9d610c9) (Draft)
- [Build Your First AI Workflow in Under 30 Minutes (No Code Required)](https://app.notion.com/p/Build-Your-First-AI-Workflow-in-Under-30-Minutes-No-Code-Required-3c20ac1bd32e8172885df4572b60319b) (Draft)

### Software Reviews

- [Zillow Rental Manager Review: User Feedback, Features & Pricing](https://app.notion.com/p/Zillow-Rental-Manager-Review-User-Feedback-Features-Pricing-3b90ac1bd32e817d9de4c38a099593a1) (Archived)
- [The Complete Yardi Breeze Property Management Software Review (2026 Edition)](https://app.notion.com/p/The-Complete-Yardi-Breeze-Property-Management-Software-Review-2026-Edition-3b90ac1bd32e811d9783f5669eddbec0) (Archived)
- [TenantCloud Reviews: Pricing, Features, and Alternatives](https://app.notion.com/p/TenantCloud-Reviews-Pricing-Features-and-Alternatives-3b90ac1bd32e8143af99e839a6bcdaa5) (Archived)
- [Buildium Property Management Software Review](https://app.notion.com/p/Buildium-Property-Management-Software-Review-3b90ac1bd32e81a59500ead737d860fb) (Archived)

### Templates & Calculators

- [Rental Property Calculators for Real Estate Investment](https://app.notion.com/p/Rental-Property-Calculators-for-Real-Estate-Investment-3b90ac1bd32e818ca436dabc2bbd41a5) (Archived)
- [Property Management Chart of Accounts (Free Sample Template)](https://app.notion.com/p/Property-Management-Chart-of-Accounts-Free-Sample-Template-3b90ac1bd32e815ea528c4b04b8e7675) (Archived)
- [Free Tenant Move-Out Checklist For Property Managers (Word/PDF)](https://app.notion.com/p/Free-Tenant-Move-Out-Checklist-For-Property-Managers-Word-PDF-3b90ac1bd32e814fbdd4f03a412f5ecb) (Archived)
- [Free Rent Receipt Template (Print, PDF, Excel, & Word)](https://app.notion.com/p/Free-Rent-Receipt-Template-Print-PDF-Excel-Word-3b90ac1bd32e81e287b5e5d219339919) (Archived)
- [Complete Guide to Using a Cap Rate Calculator](https://app.notion.com/p/Complete-Guide-to-Using-a-Cap-Rate-Calculator-3b90ac1bd32e812a99fcf9d9d13d93e4) (Archived)

### Market Insights

- [The Washington D.C Real Estate Market: Everything You Need to Know](https://app.notion.com/p/The-Washington-D-C-Real-Estate-Market-Everything-You-Need-to-Know-3b90ac1bd32e811da52cef60d8c34213) (Archived)
- [The U.S. Housing Market Predictions and Forecast for 2026](https://app.notion.com/p/The-U-S-Housing-Market-Predictions-and-Forecast-for-2026-3b90ac1bd32e811aa1d2d33b5805e180) (Archived)
- [Rental Vacancy Rates by City and State: Current Data & Historical Trends (1965-2026)](https://app.notion.com/p/Rental-Vacancy-Rates-by-City-and-State-Current-Data-Historical-Trends-1965-2026-3b90ac1bd32e818599a5e3dea9b4f2b9) (Archived)
- [Landlord Stats & Trends: Rent, Costs & Investment Outlook](https://app.notion.com/p/Landlord-Stats-Trends-Rent-Costs-Investment-Outlook-3b90ac1bd32e8140b6c1ee2cdec12189) (Archived)

### News & Updates

- [Langchain 2026 State Of Agent Engineering Report ...](https://app.notion.com/p/Langchain-2026-State-Of-Agent-Engineering-Report-3ef0ac1bd32e817687bfc8a7cefcd097) (Pending)
- [Startups Weekly: Mercury More Than Doubled Its Valuation ...](https://app.notion.com/p/Startups-Weekly-Mercury-More-Than-Doubled-Its-Valuation-3eb0ac1bd32e8135a318e57ed877e6f5) (Pending)
- [Introducing Branches: Build On The Side, Merge When You Are Ready](https://app.notion.com/p/Introducing-Branches-Build-On-The-Side-Merge-When-You-Are-Ready-3e90ac1bd32e81dcb1fbe283477801c7) (Pending)
- [Introducing Innflow v0.69: OpenClaw, Shopify, LinkedIn, Instagram & ElevenLabs](https://app.notion.com/p/Introducing-Innflow-v0-69-OpenClaw-Shopify-LinkedIn-Instagram-ElevenLabs-3c20ac1bd32e811aaeb6dd0b49aa8d39) (Archived)
- [Property Ops raises $10M on the runaway success of its property management software](https://app.notion.com/p/Property-Ops-raises-10M-on-the-runaway-success-of-its-property-management-software-3b90ac1bd32e810da47cefb72c10b930) (Archived)

## Tie-break rules

1. Read the title, description, visual brief, and article where available. Classify the central reader promise, not every noun or an incidental Innflow CTA.
2. Evidence-led model testing takes Benchmarks & Evaluations even if the title says versus. A buyer comparison takes the appropriate Comparison option.
3. Use Comparison only when Innflow or its operating approach is a substantive evaluated option. Otherwise use Comparison (w/o innflow).
4. A primary downloadable artifact takes Templates & Calculators; a geographic market report takes Market Insights; a single-product review takes Software Reviews.
5. Model capability, provider choice, and portability take AI Models. Dated model launches, previews, and version changes take Model Releases. A coding-agent execution environment takes Harness, including articles about connecting that harness to Innflow.
6. For AI implementation articles, choose the dominant mechanism: permissions and gates = Security & Governance; app or protocol access = Integration; agent runtime and orchestration = Harness; operational steps = Workflow Guides.
7. Property context remains in Audience and Topic. It does not force every AI integration or comparison into Property Management. Use Property Management for property operations without a more specific editorial format.
8. News & Updates requires a dated development or report. Evergreen strategy and definitions fall back to General.
9. Blank, test, truncated, or ambiguous records remain Uncatagorized for review. General is not a substitute for missing evidence.

## Image-generation contract

Split chooses the component family. The image generator should resolve its saved Notion option ID to the stable routing key in `taxonomy.json`. A versioned approved background manifest must then map that key to fixed source node IDs or a stable page-ID selection from an approved pool. No random rotation. Save the selected nodes per blog so reruns reproduce the same composition.

Use the supplied [background collection](https://www.figma.com/design/WnHFwxKUKL8UuGwEkpJago/?node-id=1242-103) and the approved property photographs where relevant. Preserve explicit per-blog background choices. Reuse native Innflow foreground components, readable white surfaces, gray headers where appropriate, and editable text/icons. Do not invent comparative claims, benchmark values, ratings, or customer results.

This task defines the categories and visual families. It does not wire the renderer, select a final background asset for every category, regenerate existing images, or publish content.

## Pipeline findings

- Before this change, 344 records were Uncatagorized and 26 had no Split. The six Queued records included four Uncatagorized posts.
- Existing Topic values already distinguish 67 Market Updates by City and 26 Market Trends records, supporting a Market Insights image family.
- Existing Tag values label 730 records Case Study, including ordinary guides and reviews. Do not use Tag alone to select case-study imagery or imply verified customer outcomes.
- Test and truncated source titles exist, including Grok Test. Keep these out of automatic generation until editorially resolved.
- Customer Stories could be added later when verified customer narratives exist. A customer story template and generic Case Study tags are insufficient evidence for an automatic customer-results category.
- Avoid industry-specific Splits for every AI use case. Preserve audience context separately and reuse the Integration, Workflow Guides, Harness, and governance families.

## Snapshot counts

| Status | Records |
| --- | ---: |
| Pending | 146 |
| Not started | 15 |
| Draft | 188 |
| Queued | 6 |
| Archived | 710 |
| Posted | 78 |
| In-Prog | 3 |

| Split before this change | Records |
| --- | ---: |
| Uncatagorized | 344 |
| Property Management | 774 |
| (empty) | 26 |
| Comparison (w/o innflow) | 1 |
| Integration | 1 |

Source inventory: `pipeline-inventory.csv`. Machine-readable rules: `taxonomy.json`. Verification results are saved separately after Notion writes.

Schema changes preserve existing option IDs and include the complete option list, following [Notion select configuration guidance](https://developers.notion.com/reference/update-data-source-properties#select-configuration-updates).


## Verified Notion result

All six Queued records were re-fetched and verified. Four Split values were updated and two existing assignments retained. Eight options were added, producing 15 total options; all seven existing option IDs and names were preserved. Definitions were saved and verified on every option. Other page properties were checked after each assignment.

Verified at 2026-10-04T18:12:07.901Z. No remaining Queued record is blank or Uncatagorized. Non-Queued assignments were not changed.


## Follow-up: separate Model Releases

At the user's request, AI Models remains unchanged in name and option ID. A separate Model Releases option was added and verified. No blog assignments were changed. There are now 16 Split options.

- **AI Models:** Evergreen model capabilities, providers, model selection, and model portability. Dated model launches belong in Model Releases; score-led testing belongs in Benchmarks & Evaluations; execution environments belong in Harness.
- **Model Releases:** Dated launches, previews, version updates, and availability changes for AI models. Use a model/provider announcement component. Evergreen model strategy stays AI Models; benchmark-led analysis stays Benchmarks & Evaluations.
- **Visual family:** model/provider announcement card.
- **Stable routing key:** `model-releases`.
