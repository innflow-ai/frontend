from pathlib import Path
from rpc import rpc,unpack
import json,shutil
b=Path('outputs/homepage-animation-fixes-2026-10-03');out=b/'03/dub-restyle';out.mkdir(exist_ok=True);before=out/'before';before.mkdir(exist_ok=True)
for ext in ['riv','rev']:shutil.copy2(b/'03/after'/f'03_-_put_ai_to_work_your_way.{ext}',before/f'03.{ext}')
for f in ['DESIGN (1).md','variables (1).css','tokens (2).json']:shutil.copy2(Path('/Users/ak/Library/CloudStorage/Dropbox/dub.co')/f,out/f)
obs=unpack(json.load(open('/tmp/homepage-animation-fixes/03-dub-tree.json')))['objects'];objects={o['id']:o for o in obs};ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-dub-before-keys.json')))['keyframes']['0-6']
def descendants(root):
 ids={root}
 for c in objects.get(root,{}).get('children',[]):ids|=descendants(c)
 return ids
scope=set().union(*(descendants(i) for i in ['0-9082','0-6200','0-4691','0-12503','0-51443','0-51444','0-51445','0-4659','0-4666','0-9075','0-9047','0-9054','0-9061','0-9068','0-10074','0-4673','0-4682','0-12496']))
palette={'#ff071a31':'#ff171717','#ff566273':'#ff525252','#ff617080':'#ff737373','#ff5f6d77':'#ff737373','#ff00aeff':'#ff2563eb','#ff40a6ff':'#ff2563eb','#ff10aef8':'#ff2563eb','#ff12aef8':'#ff2563eb','#ffececf0':'#ffe5e5e5','#ffc4d1de':'#ffe5e5e5','#fff5f7fa':'#fff5f5f5','#fff4f4f5':'#fff5f5f5','#fff7f7f9':'#fff5f5f5','#ffe6eaef':'#ffe5e5e5','#fff1f3f5':'#fff5f5f5','#ffd9efff':'#ffdbeaff','#ffe98a45':'#ffea580c','#ff9865d9':'#ff7c3aed','#d9bfd6eb':'#ffe5e5e5'}
props={};colormap={}
for o in obs:
 if o['id'] not in scope:continue
 old=o.get('paint',{}).get('color')
 if old in palette:
  for child in o.get('children',[]):
   if objects[child]['types']==['SolidColor']:props.setdefault(child,{})['37']=palette[old];colormap[child]=palette[old]
# Flat Dub surfaces replace broad translucent glass surrounds. Keep the saved original for comparison.
glass=['0-13143','0-10065','0-9038','0-6191']
for i in glass:props.setdefault(i,{})['18']=0
outer=['0-13138','0-13141','0-10059','0-10063','0-9033','0-9036','0-6186','0-6189']
fields=['0-12828','0-12831','0-9788','0-9792','0-9223','0-9227','0-8734','0-8737','0-5837','0-5841','0-9301','0-9304','0-9447','0-9450','0-41215','0-41218']
for i in outer:props.setdefault(i,{}).update({'31':24,'161':24,'162':24,'163':24,'164':True})
for i in fields:props.setdefault(i,{}).update({'31':12,'161':12,'162':12,'163':12,'164':True})
for i in ['0-8241','0-8245']:props.setdefault(i,{}).update({'31':8,'161':8,'162':8,'163':8,'164':True})
for i in ['0-7784','0-5096']:props.setdefault(i,{}).update({'31':4,'161':4,'162':4,'163':4,'164':True})
# All panel/input outlines are neutral hairlines, including the formerly blue agent and user picker borders.
panelroots=['0-13135','0-10056','0-9030','0-6183','0-8238'];inputroots=['0-12825','0-9785','0-9220','0-8731','0-5834','0-9298','0-9444','0-41212']
for root in panelroots+inputroots:
 for i in descendants(root):
  if objects.get(i,{}).get('types')==['Stroke']:
   props.setdefault(i,{})['47']=2 if root in panelroots else 1.75
   for child in objects[i].get('children',[]):
    if objects[child]['types']==['SolidColor']:props.setdefault(child,{})['37']='#ffe5e5e5';colormap[child]='#ffe5e5e5'
changes=[]
for k in ks:
 if k['objectId'] in glass and k['propertyKey']==18:changes.append({'keyframeId':k['keyframeId'],'value':0})
 elif k['objectId'] in scope and k['propertyKey']==37 and k['value'] in palette:changes.append({'keyframeId':k['keyframeId'],'value':palette[k['value']]})
for i in range(0,len(changes),250):
 r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','change':changes[i:i+250]}}));assert not r.get('errors'),r
pairs=list(props.items())
for i in range(0,len(pairs),200):
 r=unpack(rpc('set_property_values',{'propertyValues':dict(pairs[i:i+200])}));assert not r.get('errors'),r
report={'reference':'https://app.paper.design/file/01M41BF5A3NJASJTE85A7634TS/p-1-0/8X-0','style':'Dub white surfaces, ash hairlines, charcoal text, compact corners, electric blue feedback','duration':27.6,'properties':props,'palette':palette,'removedGlassSurrounds':glass,'changedKeyframes':len(changes),'preserved':'Sequence, timing, connectors, menu skeletons, dropdown order, hover and click behavior, artwork background'}
(out/'restyle.json').write_text(json.dumps(report,indent=2)+'\n');print({'objectsRestyled':len(props),'keysUpdated':len(changes)})
