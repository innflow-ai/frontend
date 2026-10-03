from rpc import rpc,unpack
from pathlib import Path
import json,collections
P=Path('/tmp/homepage-animation-fixes');ks=unpack(json.loads((P/'03-rounding-before-keys.json').read_text()))['keyframes']['0-6'];tracks=collections.defaultdict(list)
for k in ks:tracks[k['objectId'],k['propertyKey']].append(dict(k))
for tr in tracks.values():tr.sort(key=lambda k:k['frame'])
changed={};add=[];delete=[]
def change_at(o,p,f,v):
 k=next((k for k in tracks[o,p] if k['frame']==f),None)
 if k:k['value']=v;changed[k['keyframeId']]={'keyframeId':k['keyframeId'],'value':v}
 else:
  k={'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'cubic'};tracks[o,p].append(k);tracks[o,p].sort(key=lambda x:x['frame']);add.append({**k,'cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})
# Resolve each menu directly to the finished shell size. Content can load without a second resize.
for o,p,f,target in [('0-10056',16,228,262),('0-10056',17,228,262),('0-10066',16,228,262),('0-10066',17,228,262),('0-9082',13,228,262),('0-10065',13,228,262)]:
 v=next(k['value'] for k in tracks[o,p] if k['frame']==target)
 for frame in [f,234]:change_at(o,p,frame,v)
for art,ga,h,hold,final in [('0-9030','0-9039',581,611,802),('0-6183','0-6192',986,1017,1044)]:
 for o in [art,ga]:
  for p in [16,17]:
   v=next(k['value'] for k in tracks[o,p] if k['frame']==final)
   for f in [h,hold]:change_at(o,p,f,v)
# Normalize both dimensions of every native panel; grow rectangle geometry instead of stretching corners.
specs=[
 ('0-9785','0-9786',['0-9788','0-9792'],'0-9083','if'),
 ('0-9220','0-9221',['0-9223','0-9227'],'0-9083','else'),
 ('0-8731','0-8732',['0-8734','0-8737'],'0-8247','user'),
 ('0-5834','0-5835',['0-5837','0-5841'],'0-4692','agent'),
 ('0-10056','0-10057',['0-10059','0-10063'],'0-9083','panel'),
 ('0-10066','0-10067',['0-10069','0-10072'],'0-9083','glass'),
 ('0-9030','0-9031',['0-9033','0-9036'],'0-8247','panel'),
 ('0-9039','0-9040',['0-9042','0-9045'],'0-8247','glass'),
 ('0-6183','0-6184',['0-6186','0-6189'],'0-4692','panel'),
 ('0-6192','0-6193',['0-6195','0-6198'],'0-4692','glass')]
ids=set(o for a,g,rs,sc,typ in specs for o in [a,g,sc]+rs)|{'0-9229','0-9121'}
props=unpack(rpc('query_property_values',{'propertyKeys':{o:[13,14,16,17,20,21] for o in ids}}))['values']
# Read each actual cubic interpolator rather than assuming the curve when resampling.
ints={k['interpolatorId'] for k in ks if 'interpolatorId' in k and k['objectId'] in ids}
curves={}
for batch in [list(ints)[i:i+300] for i in range(0,len(ints),300)]:curves.update(unpack(rpc('query_property_values',{'propertyKeys':{o:[63,64,65,66] for o in batch}}))['values'])
def cubic(q,c):
 x1,y1,x2,y2=c;lo=0.;hi=1.
 for _ in range(20):
  u=(lo+hi)/2;x=3*(1-u)**2*u*x1+3*(1-u)*u*u*x2+u**3
  if x<q:lo=u
  else:hi=u
 u=(lo+hi)/2;return 3*(1-u)**2*u*y1+3*(1-u)*u*u*y2+u**3
def val(o,p,f):
 tr=tracks.get((o,p),[])
 if not tr:return props[o].get(str(p),100 if p in [16,17] else 0)
 if f<=tr[0]['frame']:return tr[0]['value']
 for a,b in zip(tr,tr[1:]):
  if f<=b['frame']:
   q=(f-a['frame'])/(b['frame']-a['frame'])
   if b.get('interpolationType')=='cubic':
    c=curves.get(b.get('interpolatorId'),{'63':.42,'64':0,'65':.58,'66':1});q=cubic(q,[c[str(i)] for i in [63,64,65,66]])
   return a['value']+(b['value']-a['value'])*q
 return tr[-1]['value']
frames=sorted(set(range(0,1621,2))|{k['frame'] for k in ks if k['objectId'] in ids}|{228,234})
output={}
for art,group,rects,scene,typ in specs:
 for p in [16,17]:output[art,p]=[]
 for p in [13,14]:output[group,p]=[]
 for r in rects:
  for p in [20,21]:output[r,p]=[]
 for f in frames:
  sx=val(art,16,f);sy=val(art,17,f);uniform=val(scene,16,f)
  if typ in ['if','else']:
   # Equal If/Else widths are tied to the current node panel and padding.
   bodywidth=319.7577580566406*val('0-10056',16,f)/100
   padding=val('0-9229',13,f)
   sx=(bodywidth-2*padding)/270.3500061035156*100
  for p in [16,17]:output[art,p].append((f,uniform))
  output[group,13].append((f,val(group,13,f)*sx/uniform));output[group,14].append((f,val(group,14,f)*sy/uniform))
  for r in rects:
   output[r,20].append((f,val(r,20,f)*sx/uniform));output[r,21].append((f,val(r,21,f)*sy/uniform))
# Keep samples only where they define a curve or a change, with a 0.01-unit tolerance.
def simplify(points,tol=.01):
 if len(points)<=2:return points
 a,b=points[0],points[-1];largest=0;index=0
 for i,(f,v) in enumerate(points[1:-1],1):
  error=abs(v-(a[1]+(b[1]-a[1])*(f-a[0])/(b[0]-a[0])))
  if error>largest:largest,index=error,i
 if largest<=tol:return [a,b]
 return simplify(points[:index+1],tol)[:-1]+simplify(points[index:],tol)
for (o,p),pts in output.items():
 delete.extend(k['keyframeId'] for k in ks if k['objectId']==o and k['propertyKey']==p)
 add=[a for a in add if not(a['objectId']==o and a['propertyKey']==p)]
 for f,v in simplify(pts):add.append({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'linear'})
change=[v for k,v in changed.items() if k not in set(delete)]
for op,items in [('delete',delete),('change',change),('add',add)]:
 for i in range(0,len(items),300):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+300]}}));assert not r.get('errors'),r
report={'changes':'Stable If and Else widths; menu resolves once to final node size; geometry-based panel resizing preserves corners','changed':len(change),'deleted':len(delete),'added':len(add),'normalizedPanels':len(specs),'duration':27}
Path('outputs/homepage-animation-fixes-2026-10-03/03/input-stability.json').write_text(json.dumps(report,indent=2)+'\n');print(report)
