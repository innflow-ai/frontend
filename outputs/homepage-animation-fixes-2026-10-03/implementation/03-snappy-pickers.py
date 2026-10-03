from rpc import rpc,unpack
from pathlib import Path
import json,collections
P=Path('/tmp/homepage-animation-fixes');B=Path('outputs/homepage-animation-fixes-2026-10-03/03/snappy-pickers');B.mkdir(exist_ok=True)
ks=unpack(json.load(open(P/'03-picker-before-keys.json')))['keyframes']['0-6'];objs=unpack(json.load(open(P/'03-picker-before-tree.json')))['objects'];by={o['id']:o for o in objs};tr=collections.defaultdict(list)
for k in ks:tr[k['objectId'],k['propertyKey']].append(k)
for t in tr.values():t.sort(key=lambda k:k['frame'])
def descendants(o):
 return [o]+[d for c in by[o].get('children',[]) for d in descendants(c)]
def val(o,p,f):
 t=tr[o,p]
 if not t:raise ValueError((o,p))
 if f<=t[0]['frame']:return t[0]['value']
 for a,b in zip(t,t[1:]):
  if f<=b['frame']:
   u=(f-a['frame'])/(b['frame']-a['frame']);return a['value']+(b['value']-a['value'])*u
 return t[-1]['value']
outputs={}
def replace(o,p,pts,lo=0,hi=1656):outputs[o,p]=(lo,hi,pts)
# Keep native user field present and fixed while its panel grows down into the choices.
for o in descendants('0-8279'):
 for p in [13,14,16,17,20,21]:
  if tr[o,p]:replace(o,p,[(688,val(o,p,688)),(822,val(o,p,688)),(838,val(o,p,838))],688,838)
replace('0-8279',18,[(688,100),(838,100)],688,838)
# User stroke/fill originally share the same geometry. Preserve the existing one-pixel inset.
height=327/.565
replace('0-8732',14,[(688,val('0-8732',14,688)),(700,height/2+1.765),(810,height/2+1.765),(822,val('0-8732',14,688)),(838,val('0-8732',14,838))],688,838)
for o in ['0-8734','0-8737']:replace(o,21,[(688,val(o,21,688)),(700,height),(810,height),(822,val(o,21,688)),(838,val(o,21,838))],688,838)
for o in ['0-8290','0-8280']:
 replace(o,18,[(688,val(o,18,688)),(694,0),(816,0),(822,0 if o=='0-8290' else 100),(838,0 if o=='0-8290' else 100)],688,838)
replace('0-8533',18,[(810,0),(822,0),(828,100),(838,100)],810,838)
# Tighten every existing menu-content reveal/exit together, retaining option hover and press timing.
for o in descendants('0-6201'):
 for p in [18]:
  t=tr[o,p]
  if t:
   pts=[]
   for k in t:
    f=k['frame'];nf=round(688+(f-688)*12/27) if 688<=f<=715 else round(810+(f-810)*12/28) if 810<=f<=838 else f
    pts.append((nf,k['value']))
   replace(o,p,list(dict(pts).items()))
replace('0-6201',18,[(0,0),(688,0),(694,0),(700,100),(810,100),(816,0),(1656,0)])
replace('0-8238',18,[(0,0),(1656,0)])
# Reuse the native Agent input panel instead of a detached popup background.
rpc('reparent_objects',{'operations':[{'objectId':'1-15450','newParentId':'0-4728','position':'start'}]})
rpc('set_property_values',{'propertyValues':{'1-15450':{'13':0,'14':0,'16':83,'17':83},'1-18573':{'18':0},'0-8238':{'18':0}}})
replace('1-15450',14,[(0,0),(1656,0)])
replace('1-15450',18,[(0,0),(1101,0),(1107,0),(1113,100),(1187,100),(1193,0),(1656,0)])
replace('1-18573',18,[(0,0),(1656,0)])
replace('0-5098',18,[(0,0),(1656,0)])
for o in ['0-5398','0-5408']:
 replace(o,18,[(1101,100),(1107,0),(1656,0)],1101,1656)
# At 83% the Paper menu is 265.6 x 283.86 units. The field geometry, not text, expands.
fullw=320*.83/.543;fullh=342*.83/.543
for o,p,opened in [('0-5835',13,fullw/2),('0-5835',14,fullh/2),('0-5837',20,fullw-3.5285),('0-5841',20,fullw),('0-5837',21,fullh-3.5285),('0-5841',21,fullh)]:
 normal=val(o,p,1101);replace(o,p,[(1101,normal),(1113,opened),(1187,opened),(1199,normal),(1214,normal)],1101,1214)
# Do not reveal the chosen agent until the field has collapsed.
replace('1-18595',18,[(0,0),(1199,0),(1205,100),(1533,100),(1560,18),(1581,18),(1608,0),(1656,0)])
# Move cursor into the new, attached first row. Remap its menu-selection interval only.
for o in ['0-12367','0-12393']:
 for p,base,target in [(13,588.751,588),(14,650.371,543)]:
  replace(o,p,[(1101,val(o,p,1101)),(1145,target-base),(1187,target-base),(1214,val(o,p,1214))],1101,1214)
# Ensure contents remain in front of the expanding field, and cursor in front of everything.
rpc('reorder_objects',{'operations':[{'objectId':'1-15450','order':'sendToFront'},{'objectId':'0-6201','order':'sendToFront'},{'objectId':'1-18595','order':'sendToFront'},{'objectId':'0-12366','order':'sendToFront'}]})
delete=[];adds=[]
for (o,p),(lo,hi,pts) in outputs.items():
 delete.extend(k['keyframeId'] for k in tr[o,p] if lo<=k['frame']<=hi)
 adds.extend({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.2,'y1':0,'x2':.2,'y2':1}} for f,v in pts)
for op,items in [('delete',delete),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
report={'openDurationMs':200,'closeDurationMs':200,'userOpenFrames':[688,700],'userCloseFrames':[810,822],'agentOpenFrames':[1101,1113],'agentCloseFrames':[1187,1199],'nativeFieldGeometryExpands':True,'textScaledDuringExpansion':False,'agentPickerParent':'0-4728','userOpenBackgroundHidden':'0-8238','agentOpenBackgroundHidden':'1-18573','changedTracks':len(outputs),'keysAdded':len(adds)}
(B/'changes.json').write_text(json.dumps(report,indent=2)+'\n');print(report)
