from rpc import rpc,unpack
import json,pathlib,base64,urllib.parse
root=pathlib.Path('/Users/ak/innflow-web/outputs/homepage-animation-fixes-2026-10-03/03')
plan=json.loads((root/'icon-plan.json').read_text())
for item in plan:
 p=pathlib.Path(item['path'])
 r=unpack(rpc('upload_asset',{'file':'data:image/svg+xml;name='+urllib.parse.quote(p.name)+';base64,'+base64.b64encode(p.read_bytes()).decode(),'name':'03 / '+item['label']+' / Updated icon'}))
 print('upload',r,flush=True)
 (root/(item['label'].replace(' ','-')+'-upload.json')).write_text(json.dumps(r))
