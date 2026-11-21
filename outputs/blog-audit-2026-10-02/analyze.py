import json, re, csv, collections
from pathlib import Path

root = Path(__file__).parent
rows = json.loads((root / 'inventory.json').read_text())
active = [r for r in rows if r.get('Status') != 'Archived']
descs = collections.Counter(r.get('description') for r in active if r.get('description'))
def clean(s):
    s = (s or '').replace('\\<', '<').replace('\\>', '>').replace('<br>', '\n')
    return re.sub(r'<[^>]+>', ' ', re.sub(r'<!--.*?-->', '', s, flags=re.S))
def has_file(v):
    return bool(v and v not in ('[]', 'null'))
out = []
for r in rows:
    body = r.get('draft_blog', '')
    flags, actions = [], []
    def flag(condition, label, action):
        if condition:
            flags.append(label); actions.append(action)
    archived = r.get('Status') == 'Archived'
    flag(not body.strip(), 'Empty draft_blog field', 'Inspect page brief/body and finish or map the publishable article')
    flag(bool(re.search(r'Angle for an innflow post|operator playbook, metrics, and AI agent workflows', r.get('description',''))), 'Templated or planning description', 'Write a unique reader-facing summary; reconcile with HTML metadata and CMS')
    flag(bool(re.search(r'\.\.\.|…', r.get('Title',''))), 'Title contains ellipsis', 'Recover complete source topic and write an original complete title')
    flag(not r.get('Slug'), 'No slug', 'Assign a stable descriptive slug before publishing')
    flag(not (r.get('Author') or r.get('Writer name')), 'No author in either author field', 'Assign the actual writer or accountable reviewer')
    flag(not (has_file(r.get('Desktop_img')) or has_file(r.get('Desktop_file'))), 'No desktop attachment', 'Attach and inspect relevant desktop artwork; verify CMS independently')
    flag(not has_file(r.get('story_IMG')), 'No story attachment', 'Create portrait artwork if a story channel is planned')
    flag(bool(re.search('AES-256|zero data retention|private deployment', body, re.I)), 'Security/deployment wording needs evidence', 'Verify each claim against current product documentation and scope')
    flag(bool(re.search('property|multifamily',r.get('Audience',''),re.I)) and r.get('Topic') in ('AI','',None), 'Broad topic has property audience', 'Review broad automation positioning; preserve intentional property-specific content')
    flag(not archived and descs.get(r.get('description'),0)>1, 'Description reused across active records', 'Differentiate the reader problem and article promise')
    flag(r.get('SEO_Target_Keywords') in ('AI agents for business automation','AI model benchmarks','AI workflow automation','AI workflow orchestration'), 'Broad repeated target keyword', 'Assign a distinct intent and cluster owner before drafting')
    flag(bool(re.search('How the Latest AI Model Rankings Change|How AI Agents Change Everyday Business Operations',r.get('Title',''))), 'Repeated topic template', 'Compare sibling briefs and combine sources where the reader question is the same')
    priority = 'P3 archive review only' if archived else ('P1 live editorial review' if r.get('CMS-Status')=='Live' else ('P1 finish tutorial' if r['Title'].startswith('Innflow +') else 'P2 queue refinement'))
    if not actions: actions=['Editorial read-through and evidence check; metadata screening found no listed flags']
    out.append({'Title':r.get('Title'), 'Notion URL':r['url'], 'Status':r.get('Status'), 'CMS status':r.get('CMS-Status',''), 'Priority':priority, 'Topic':r.get('Topic',''), 'Slug':r.get('Slug',''), 'Draft words approximate':len(clean(body).split()), 'Findings':'; '.join(flags), 'Recommended actions':'; '.join(actions), 'Coverage':'All properties and automated draft-field screening; selected records received deeper editorial review'})
with (root/'blog-by-blog-audit.csv').open('w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(out[0]));w.writeheader();w.writerows(out)
counts=collections.Counter(f for r in out if r['Status']!='Archived' for f in r['Findings'].split('; ') if f)
(root/'screening-counts.json').write_text(json.dumps(dict(counts),indent=2))
print(json.dumps({'records':len(out),'unique_urls':len(set(x['Notion URL'] for x in out)),'active_flags':counts},indent=2))
