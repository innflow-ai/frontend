import fs from 'node:fs/promises';
const base='output/website-ux-audit-2026-10-03/';
const report=JSON.parse(await fs.readFile(base+'route-audit.json','utf8'));
const queue=report.routes.filter(r=>r.route.startsWith('/blog/')&&r.status===200).map(r=>r.route);const findings=[];
await Promise.all(Array.from({length:4},async()=>{while(queue.length){const route=queue.shift();try{const body=await fetch('https://innflow.ai'+route,{signal:AbortSignal.timeout(20000)}).then(r=>r.text());const matches=[...body.matchAll(/<a\b[^>]*href="(?:https:\/\/innflow\.ai)?\/signup(?:[?#][^"]*)?"[^>]*>[\s\S]*?<\/a>/g)].map(m=>m[0]);if(matches.length)findings.push({route,matches});}catch(e){findings.push({route,error:String(e)})}}}));
await fs.writeFile(base+'signup-link-sources.json',JSON.stringify(findings,null,2)+'\n');console.log(JSON.stringify(findings));
