from rpc import rpc,unpack
from pathlib import Path
import json,collections
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-menu-width-before.json')))['keyframes']['0-6'];tracks=collections.defaultdict(list)
for k in ks:tracks[k['objectId'],k['propertyKey']].append(k)
for t in tracks.values():t.sort(key=lambda x:x['frame'])
def ease(q):
 lo=0.;hi=1.
 for _ in range(22):
  t=(lo+hi)/2;x=3*(1-t)**2*t*.42+3*(1-t)*t*t*.58+t**3
  if x<q:lo=t
  else:hi=t
 t=(lo+hi)/2;return 3*(1-t)*t*t+t**3
def val(o,p,f,d=0):
 a=tracks.get((o,p),[])
 if not a:return d
 if f<=a[0]['frame']:return a[0]['value']
 for x,y in zip(a,a[1:]):
  if f<=y['frame']:
   q=(f-x['frame'])/(y['frame']-x['frame']);q=ease(q) if y.get('interpolationType')=='cubic' else q
   return x['value']+(y['value']-x['value'])*q
 return a[-1]['value']
adds=[];delete=[];changes=[]
def replace(o,p,pts,start=0,end=228,linear=True):
 delete.extend(k['keyframeId'] for k in tracks[o,p] if start<=k['frame']<=end)
 for f,v in pts:adds.append({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'linear' if linear else 'cubic',**({} if linear else {'cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})})
full=2*val('0-10057',13,228);glassfull=2*val('0-10067',13,228);padding=(glassfull-full)/2
frames=sorted(set(range(74,229,2))|{74,86,114,201,209,228})
def width(f):
 if f<=86:return 108
 if f<114:return 108+(480-108)*ease((f-86)/28)
 if f<=201:return 480
 return 480+(full-480)*ease((f-201)/27)
# Original connected node, now 90% of its finished width while holding the context menu.
for o,extra in [('0-10057',0),('0-10067',2*padding)]:
 replace(o,13,[(0,val(o,13,0))]+[(f,(width(f)+extra)/2) for f in frames])
for o,g,extra in [('0-10059','0-10057',0),('0-10063','0-10057',0),('0-10069','0-10067',2*padding),('0-10072','0-10067',2*padding)]:
 ratio=val(o,20,228)/(2*val(g,13,228));replace(o,20,[(0,val(o,20,0))]+[(f,(width(f)+extra)*ratio) for f in frames])
for o in ['0-10056','0-10066']:replace(o,13,[(0,0),(74,0),(228,0)])
for o,extra in [('0-9082',0),('0-10065',2*padding)]:
 replace(o,13,[(0,val(o,13,0))]+[(f,385.5-(width(f)+extra)/2) for f in frames])
# Position directly from the actual Start output port, preserving a constant readable gap.
gap=365.409-(val('0-9068',14,228)+7)
for o,offset in [('0-9082',0),('0-10065',28.235),('0-9075',7)]:
 replace(o,14,[(0,val(o,14,0,358.409 if o=='0-9075' else 365.409 if o=='0-9082' else 337.174))]+[(f,val('0-9068',14,f)+7+gap-offset) for f in frames])
replace('0-10080',25,[(0,49.11000061035156)]+[(f,val('0-9068',14,f)+7+gap-val('0-10074',14,f)-49.1100030518) for f in frames]+[(229,49.11000061035156),(1620,49.11000061035156)],end=1620)
# Text travels with the growing shell; all labels are present together.
replace('0-10082',13,[(0,14),(86,14),(114,0),(228,0),(229,14),(1620,14)],end=1620,linear=False)
# Reveal the node contents during its single expansion after the menu choice.
for o in ['0-9083','0-9121','0-9229','0-9794']:
 for k in tracks[o,18]:
  if k['frame']==234:changes.append({'keyframeId':k['keyframeId'],'frame':209})
  elif k['frame']==262:changes.append({'keyframeId':k['keyframeId'],'frame':228})
# Retarget the context selection cursor vertically to the closer menu.
for o in ['0-12367','0-12393']:
 for k in tracks[o,14]:
  if 129<=k['frame']<=201:changes.append({'keyframeId':k['keyframeId'],'value':k['value']+(val('0-9068',14,k['frame'])+7+gap-365.409)})
for op,items in [('delete',list(set(delete))),('change',changes),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
out={'menuWidth':480,'finishedNodeWidth':full,'widthRatio':480/full,'startToMenuGap':gap,'menuBuildFrames':[86,114],'selectionExpansionFrames':[201,228],'contentsRevealFrames':[209,228],'duration':27}
Path('outputs/homepage-animation-fixes-2026-10-03/03/first-menu-layout.json').write_text(json.dumps(out,indent=2)+'\n');print(out)
