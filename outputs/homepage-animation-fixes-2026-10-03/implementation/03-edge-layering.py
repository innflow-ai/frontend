from rpc import rpc,unpack
from pathlib import Path
import json,collections,shutil
B=Path('outputs/homepage-animation-fixes-2026-10-03/03/edge-layering');(B/'before').mkdir(parents=True,exist_ok=True)
for e in []:shutil.copyfile('outputs/homepage-animation-fixes-2026-10-03/03/after/03_-_put_ai_to_work_your_way.'+e,B/'before'/('03.'+e))
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-edges-keys.json')))['keyframes']['0-6'];tr=collections.defaultdict(list)
for k in ks:tr[k['objectId'],k['propertyKey']].append(k)
for t in tr.values():t.sort(key=lambda k:k['frame'])
def v(o,p,f):
 t=tr[o,p]
 if f<=t[0]['frame']:return t[0]['value']
 for a,b in zip(t,t[1:]):
  if f<=b['frame']:
   u=(f-a['frame'])/(b['frame']-a['frame']);return a['value']+(b['value']-a['value'])*u
 return t[-1]['value']
lines=['1-13323','1-13317','1-13311','1-870','1-864','1-858','0-2364','0-4645','0-4673','0-4682','0-10074','0-12358']
rpc('reorder_objects',{'operations':[{'objectId':o,'order':'sendToBack'} for o in lines]})
# Slide around the card edge just before the reflow, then stay at its right midpoint.
def port(f):
 sx=v('0-12430',16,f)*v('0-13135',16,f)/10000;sy=v('0-12430',17,f)*v('0-13135',17,f)/10000
 x=v('0-12430',13,f)+v('0-12503',13,f)*v('0-12430',16,f)/100;y=v('0-12430',14,f)+v('0-12503',14,f)*v('0-12430',17,f)/100;w=626.1959838867188*sx;h=202.59300231933594*sy
 t=max(0,min(1,(f-400)/26));t=t*t*(3-2*t)
 return (x+w*(.5+.5*min(1,t*2))-7,y+h*(1-.5*max(0,t*2-1))-7)
frames=sorted(set(range(400,1582,2))|{400,413,426,463,470,497,581,638,822,838,905,911,938,995,1022,1581})
def simplify(pts,tol=.04):
 if len(pts)<3:return pts
 a,b=pts[0],pts[-1];err,ix=max((abs(y-(a[1]+(b[1]-a[1])*(f-a[0])/(b[0]-a[0]))),i) for i,(f,y) in enumerate(pts[1:-1],1))
 if err<=tol:return [a,b]
 return simplify(pts[:ix+1],tol)[:-1]+simplify(pts[ix:],tol)
out={}
for p,i in [(13,0),(14,1)]:out['0-9068',p]=simplify([(f,port(f)[i]) for f in frames])
# Start route follows both actual ports instead of holding a detached horizontal segment.
for o,p,i in [('1-13313',24,0),('1-13313',25,1)]:out[o,p]=simplify([(f,port(f)[i]+7) for f in frames])
for p in [24,25]:out['1-13314',p]=simplify([(f,v('0-9075',13 if p==24 else 14,f)+7) for f in frames])
current=unpack(rpc('animation_editor',{'command':'queryKeyFrames','data':{'animationIds':['0-6']}}))['keyframes']['0-6'];delete=[k['keyframeId'] for k in current if (k['objectId'],k['propertyKey']) in out and (400<=k['frame']<=1581 or k['objectId'].startswith('1-1331'))];adds=[]
for (o,p),pts in out.items():
 if o.startswith('1-1331'):
  # Invisible before the layout handoff and after final fade.
  pts=[(0,pts[0][1])]+pts+[(1656,pts[0][1])]
 for f,val in pts:adds.append({'objectId':o,'propertyKey':p,'frame':f,'value':val,'interpolationType':'linear'})
for op,items in [('delete',delete),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
(B/'changes.json').write_text(json.dumps({'connectorLayersBehindCards':lines,'startHandlePreparationFrames':[400,426],'rightMidpointAnchorFrames':[426,1581],'startPortAtReorderEnd':port(463),'duration':27.6},indent=2)+'\n');print('Updated line order and anchored Start handle.')
