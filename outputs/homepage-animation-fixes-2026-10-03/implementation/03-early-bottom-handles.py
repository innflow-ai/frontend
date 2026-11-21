from pathlib import Path
from rpc import rpc,unpack
import json,collections,shutil
B=Path('outputs/homepage-animation-fixes-2026-10-03/03/early-bottom-handles');(B/'before').mkdir(parents=True,exist_ok=True)
for ext in ['riv','rev']:
 shutil.copyfile(Path('outputs/homepage-animation-fixes-2026-10-03/03/after/03_-_put_ai_to_work_your_way.'+ext),B/'before'/('03.'+ext))
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-handles-keys.json')))['keyframes']['0-6'];tr=collections.defaultdict(list)
for k in ks:tr[k['objectId'],k['propertyKey']].append(k)
for t in tr.values():t.sort(key=lambda k:k['frame'])
def val(o,p,f):
 t=tr[o,p]
 if f<=t[0]['frame']:return t[0]['value']
 for a,b in zip(t,t[1:]):
  if f<=b['frame']:
   u=(f-a['frame'])/(b['frame']-a['frame'])
   if a.get('interpolationType')=='hold':u=0
   # Root transforms are already sampled linear tracks. Existing component scale is constant through most of this interval.
   return a['value']+(b['value']-a['value'])*u
 return t[-1]['value']
delete=[];adds=[]
def add(o,p,f,v):adds.append({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'linear'})
frames=sorted(set(range(0,464,2))|{0,209,228,426,436,463})
for o,xlocal in [('0-9054',70/.75),('0-9047',330/.75)]:
 for p,local in [(13,xlocal),(14,254/.75)]:
  delete.extend(k['keyframeId'] for k in tr[o,p] if k['frame']<=463)
  for f in frames:
   sc=val('0-9082',16,f)*val('0-9083',16,f)/10000
   add(o,p,f,val('0-9082',p,f)+local*sc-7)
 delete.extend(k['keyframeId'] for k in tr[o,18] if k['frame']<=367)
 for f,v in [(0,0),(209,0),(228,100),(367,100)]:add(o,18,f,v)
for o in ['0-51444','0-51445']:
 delete.extend(k['keyframeId'] for k in tr[o,15]);add(o,15,0,90);add(o,15,1656,90)
for op,items in [('delete',delete),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
report={'fileId':2626295,'handles':['0-9054','0-9047'],'revealFrames':[209,228],'previousRevealFrames':[340,367],'orientationDegrees':90,'bottomHandlesVisibleBeforeReorder':True,'reorderFrames':[426,463],'duration':27.6,'keyframesAdded':len(adds),'keyframesDeleted':len(delete)}
(B/'changes.json').write_text(json.dumps(report,indent=2)+'\n');print(report)
