from rpc import rpc,unpack
from pathlib import Path
import json,base64
BASE=Path('/Users/ak/innflow-web/outputs/homepage-animation-fixes-2026-10-03/remaining')
def call(n,a={}):
 r=unpack(rpc(n,a))
 if isinstance(r,dict) and (r.get('errors') or r.get('success') is False):raise RuntimeError(r)
 return r
def save(n,r):
 p=BASE/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(r,indent=2));return r
def export(n,phase):
 p=BASE/n/phase;p.mkdir(parents=True,exist_ok=True)
 for fmt in ['rev','riv']:
  try:r=call('export_file',{'format':fmt,'destination':str(p)})
  except RuntimeError as e:
   if 'Operation not permitted' not in str(e):raise
   r=call('export_file',{'format':fmt,'destination':str(p),'inline_base64':True})
  if 'data' in r:
   f=p/r['filename'];f.write_bytes(base64.b64decode(r['data']))
  else:f=Path(r['path'])
  print(str(f),f.stat().st_size)
def capture(n):
 p=BASE/n;p.parent.mkdir(parents=True,exist_ok=True)
 for c in rpc('capture_artboard',{'longEdge':830})['content']:
  if c['type']=='image':p.write_bytes(base64.b64decode(c['data']))
