import collections
import csv
import json
from pathlib import Path

ROOT = Path(__file__).parent
rows = json.loads((ROOT / 'pipeline-before.json').read_text())

def category(name, key, description, visual, examples, color=None):
    return dict(name=name, key=key, description=description, visual_family=visual,
                evidence=[dict(title=rows[i]['properties']['Title'], url=rows[i]['url'],
                               status=rows[i]['properties'].get('Status')) for i in examples],
                new=color is not None, color=color)

categories = [
    category('Uncatagorized', 'needs-review', 'Unresolved or insufficient source material. Do not generate artwork until a real Split is selected.', 'hold-for-review', [], None),
    category('Property Management', 'property-management', 'Property operations, leasing, maintenance, accounting, housing rules, and landlord guidance when no more specific editorial format applies. Property context alone does not override an integration or comparison.', 'property-photograph-and-one-relevant-ops-card', [40,50,72]),
    category('Integration', 'integration', 'Connecting named apps, APIs, MCP tools, or data between systems. A coding-agent runtime itself belongs in Harness. Mentioning an app incidentally does not make a post an integration.', 'connected-app-tiles-or-one-app-action-card', [137,132,305]),
    category('Harness', 'harness', 'Agent execution environments, coding-agent tools, runtime architecture, memory, planning, and orchestration. Distinct from the underlying model, app connections, and step-by-step business workflow recipes.', 'one-agent-runtime-or-orchestration-component', [107,113,197]),
    category('General', 'general', 'Broad automation explainers, adoption, strategy, and productivity that do not fit a more specific Split. Use only after checking the specific categories.', 'one-focused-explainer-component', [77,115,297]),
    category('Comparison', 'comparison-innflow', 'An actual comparison with Innflow or its operating approach as a central evaluated option. A generic Innflow CTA does not qualify. Quantitative model benchmark analysis belongs in Benchmarks & Evaluations.', 'balanced-comparison-with-innflow', [234,330,352]),
    category('Comparison (w/o innflow)', 'comparison-external', 'Comparing two or more external products, providers, plans, or shortlisted tools, with no substantive Innflow comparison. Use neutral criteria and only evidenced claims.', 'balanced-external-comparison', [127,215,230]),
    category('AI Models', 'ai-models', 'Model releases, capabilities, providers, model selection, and model portability. Score-led testing belongs in Benchmarks & Evaluations; agent execution environments belong in Harness.', 'model-provider-tiles-or-model-router', [88,96,151,304], 'purple'),
    category('Benchmarks & Evaluations', 'benchmarks-evaluations', 'Model or agent benchmarks, leaderboards, test methodology, evals, and observability of quality. Scores and rankings must be sourced; never invent decorative performance numbers.', 'evaluation-table-or-supported-results-card', [4,7,16,28,322], 'blue'),
    category('Security & Governance', 'security-governance', 'AI/app permissions, approval gates, privacy, access control, and auditability. General housing and landlord law stays Property Management unless AI system governance is the main subject.', 'permission-gate-or-audit-card', [11,76,303,320,358], 'red'),
    category('Workflow Guides', 'workflow-guides', 'Actionable business workflow recipes, implementation steps, troubleshooting, and reusable operational patterns. A named app connection, security control, or downloadable template takes its more specific Split.', 'one-workflow-component-with-clear-steps', [242,325,342,393], 'green'),
    category('Software Reviews', 'software-reviews', 'A substantive review of one software product: features, pricing, suitability, and limitations. Multiple evaluated alternatives belong in a Comparison Split; a product launch belongs in News & Updates.', 'single-product-card-with-review-criteria', [416,604,651,1052], 'orange'),
    category('Templates & Calculators', 'templates-calculators', 'An actual reusable template, form, letter, checklist, spreadsheet, or calculator is the main deliverable. A generic guide containing a short checklist is not sufficient.', 'one-document-form-or-calculator-component', [704,749,923,927,1035], 'pink'),
    category('Market Insights', 'market-insights', 'Geographic market reports, housing trends, investment-market data, and economic statistics. AI model testing belongs in Benchmarks & Evaluations; company announcements belong in News & Updates.', 'location-photograph-with-sourced-data-card', [504,507,700,797], 'brown'),
    category('News & Updates', 'news-updates', 'Dated industry developments, company announcements, product releases, funding, and research-report coverage. Model releases and benchmark reports use their dedicated Splits.', 'one-announcement-or-source-summary-card', [0,63,143,309,964], 'yellow'),
]

assignments = [
    (127, 'Comparison (w/o innflow)', 'Head-to-head Zapier and Tray.ai comparison; Innflow is not an evaluated option.'),
    (137, 'Integration', 'The main deliverable is connecting Gmail to Innflow for inbox triage and drafts.'),
    (234, 'Comparison', 'The article explicitly contrasts PMS-native AI with the cross-system operating approach that Innflow represents; its supplied visual brief is a comparison matrix.'),
    (303, 'Security & Governance', 'Permissions, human review gates, prohibited autonomous actions, and auditability are the main subject.'),
    (304, 'AI Models', 'Model portability and changing providers without rebuilding workflows are the main subject.'),
    (305, 'Integration', 'Named MCP-style app actions and reliable access to connected systems are the main subject.'),
]
changes = []
for i, split, reason in assignments:
    row = rows[i]
    assert row['properties']['Status'] == 'Queued'
    changes.append(dict(id=row['id'], title=row['properties']['Title'], url=row['url'],
                        before=row['properties']['Split'], after=split, reason=reason))
assert len(changes) == sum(r['properties'].get('Status') == 'Queued' for r in rows)

rules = [
    'Read the title, description, visual brief, and article where available. Classify the central reader promise, not every noun or an incidental Innflow CTA.',
    'Evidence-led model testing takes Benchmarks & Evaluations even if the title says versus. A buyer comparison takes the appropriate Comparison option.',
    'Use Comparison only when Innflow or its operating approach is a substantive evaluated option. Otherwise use Comparison (w/o innflow).',
    'A primary downloadable artifact takes Templates & Calculators; a geographic market report takes Market Insights; a single-product review takes Software Reviews.',
    'Model capability, provider choice, portability, and release posts take AI Models. A coding-agent execution environment takes Harness, including articles about connecting that harness to Innflow.',
    'For AI implementation articles, choose the dominant mechanism: permissions and gates = Security & Governance; app or protocol access = Integration; agent runtime and orchestration = Harness; operational steps = Workflow Guides.',
    'Property context remains in Audience and Topic. It does not force every AI integration or comparison into Property Management. Use Property Management for property operations without a more specific editorial format.',
    'News & Updates requires a dated development or report. Evergreen strategy and definitions fall back to General.',
    'Blank, test, truncated, or ambiguous records remain Uncatagorized for review. General is not a substitute for missing evidence.',
]
taxonomy = dict(version=1, date='2026-10-04', data_source_id='91d0ac1b-d32e-824a-9362-87c81b3e5a97',
                scope='All records audited by title and metadata; only Queued page values changed.', categories=categories,
                decision_rules=rules, queued_assignments=changes,
                image_routing=dict(status='Taxonomy and visual-family contract only; generator not wired in this task',
                    key='Persisted Notion Split option ID mapped to a stable category key',
                    background='Use a versioned approved asset manifest per category. Choose by stable page ID, never random order or execution time. Persist chosen Figma node IDs before rendering.',
                    property_context='Retain an explicit property/real-estate context when selecting approved photos for property and market visuals. Specialized integration/comparison artwork still uses its Split composition.',
                    source='https://www.figma.com/design/WnHFwxKUKL8UuGwEkpJago/?node-id=1242-103',
                    overrides='An explicitly approved per-blog background wins over the category default.',
                    fallback='Hold unknown Split IDs or missing approved assets for review; never silently swap categories.',
                    foreground='Reuse editable Innflow source components; one focal component unless comparison or integration requires a paired assembly.'))
(ROOT/'taxonomy.json').write_text(json.dumps(taxonomy,indent=2)+'\n')
(ROOT/'queued-changes.json').write_text(json.dumps(changes,indent=2)+'\n')
with (ROOT/'pipeline-inventory.csv').open('w',newline='') as f:
    writer=csv.writer(f);writer.writerow(['id','title','status','split_before','topic','tag','url'])
    for r in rows:
        p=r['properties'];writer.writerow([r['id'],p.get('Title'),p.get('Status'),p.get('Split'),p.get('Topic'),p.get('Tag'),r['url']])

statuses=collections.Counter(r['properties'].get('Status') for r in rows)
splits=collections.Counter(r['properties'].get('Split') or '(empty)' for r in rows)
lines=['# Blog Split taxonomy and pipeline audit','',
       'Audited on 2026-10-04. Read every record title and available classification metadata across 1,146 records, with descriptions, visual briefs, and article openings inspected for the queued assignments. This is a taxonomy audit, not fact-checking or publishing approval.', '',
       'Scope: classify all six Queued posts; add supported category options. Other page assignments are preserved. The pipeline includes 710 Archived records and 436 records in other statuses.', '',
       '## Queued assignments','', '| Blog | Previous Split | Split | Rationale |','| --- | --- | --- | --- |']
for c in changes:lines.append(f"| [{c['title']}]({c['url']}) | {c['before']} | {c['after']} | {c['reason']} |")
lines+=['','## Split definitions and visual families','','Each option has a stable routing key. Existing option names and IDs are retained. The legacy spelling `Uncatagorized` remains to avoid breaking current filters.','','| Split | Routing key | Use when | Visual family |','| --- | --- | --- | --- |']
for c in categories:lines.append(f"| {c['name']}{' (added)' if c['new'] else ''} | `{c['key']}` | {c['description']} | {c['visual_family']} |")
lines+=['','## Evidence for new categories','']
for c in categories:
    if not c['new']:continue
    lines+=['### '+c['name'],'']
    lines += [f"- [{e['title']}]({e['url']}) ({e['status']})" for e in c['evidence']]
    lines.append('')
lines+=['## Tie-break rules','']+[f'{i+1}. {r}' for i,r in enumerate(rules)]
lines+=['','## Image-generation contract','','Split chooses the component family. The image generator should resolve its saved Notion option ID to the stable routing key in `taxonomy.json`. A versioned approved background manifest must then map that key to fixed source node IDs or a stable page-ID selection from an approved pool. No random rotation. Save the selected nodes per blog so reruns reproduce the same composition.', '',
        'Use the supplied [background collection](https://www.figma.com/design/WnHFwxKUKL8UuGwEkpJago/?node-id=1242-103) and the approved property photographs where relevant. Preserve explicit per-blog background choices. Reuse native Innflow foreground components, readable white surfaces, gray headers where appropriate, and editable text/icons. Do not invent comparative claims, benchmark values, ratings, or customer results.', '',
        'This task defines the categories and visual families. It does not wire the renderer, select a final background asset for every category, regenerate existing images, or publish content.', '',
        '## Pipeline findings','',
        '- Before this change, 344 records were Uncatagorized and 26 had no Split. The six Queued records included four Uncatagorized posts.',
        '- Existing Topic values already distinguish 67 Market Updates by City and 26 Market Trends records, supporting a Market Insights image family.',
        '- Existing Tag values label 730 records Case Study, including ordinary guides and reviews. Do not use Tag alone to select case-study imagery or imply verified customer outcomes.',
        '- Test and truncated source titles exist, including Grok Test. Keep these out of automatic generation until editorially resolved.',
        '- Customer Stories could be added later when verified customer narratives exist. A customer story template and generic Case Study tags are insufficient evidence for an automatic customer-results category.',
        '- Avoid industry-specific Splits for every AI use case. Preserve audience context separately and reuse the Integration, Workflow Guides, Harness, and governance families.', '',
        '## Snapshot counts','', '| Status | Records |','| --- | ---: |']
lines += [f'| {k} | {v} |' for k,v in statuses.items()]
lines += ['','| Split before this change | Records |','| --- | ---: |']+[f'| {k} | {v} |' for k,v in splits.items()]
lines += ['', 'Source inventory: `pipeline-inventory.csv`. Machine-readable rules: `taxonomy.json`. Verification results are saved separately after Notion writes.', '',
          'Schema changes preserve existing option IDs and include the complete option list, following [Notion select configuration guidance](https://developers.notion.com/reference/update-data-source-properties#select-configuration-updates).']
(ROOT/'AUDIT.md').write_text('\n'.join(lines)+'\n')
print(json.dumps(dict(records=len(rows),new_categories=[c['name'] for c in categories if c['new']],queued=changes),indent=2))
