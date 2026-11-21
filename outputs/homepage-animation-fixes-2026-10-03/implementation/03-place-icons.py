from rpc import rpc,unpack
import pathlib,json
root=pathlib.Path('/Users/ak/innflow-web/outputs/homepage-animation-fixes-2026-10-03/03')
plan=json.loads((root/'icon-plan.json').read_text())
for item in plan:
 asset=json.loads((root/(item['label'].replace(' ','-')+'-upload.json')).read_text())['asset']['id']
 r=unpack(rpc('assets_tool',{'command':'addSvgInstance','data':{'assetId':asset,'parentId':item['parent'],'name':'03 '+item['label']+' updated icon','x':item['x'],'y':item['y']}}))
 print(item['label'],json.dumps(r)[:700],flush=True)
 (root/(item['label'].replace(' ','-')+'-instance.json')).write_text(json.dumps(r))
