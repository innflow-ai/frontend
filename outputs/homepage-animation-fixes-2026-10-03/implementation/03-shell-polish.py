from rpc import rpc,unpack
import json,collections
from pathlib import Path
P=Path('/tmp/homepage-animation-fixes');ks=unpack(json.loads((P/'03-shell-keys.json').read_text()))['keyframes']['0-6'];t=collections.defaultdict(list)
for k in ks:t[k['objectId'],k['propertyKey']].append(k)
for a in t.values():a.sort(key=lambda k:k['frame'])
def ease(q):
 lo=0.;hi=1.
 for _ in range(24):
  u=(lo+hi)/2;x=3*(1-u)**2*u*.42+3*(1-u)*u*u*.58+u**3
  if x<q:lo=u
  else:hi=u
 u=(lo+hi)/2;return 3*(1-u)*u*u+u**3
def val(o,p,f,d=0):
 a=t.get((o,p),[])
 if not a:return d
 if f<=a[0]['frame']:return a[0]['value']
 for ka,kb in zip(a,a[1:]):
  if f<=kb['frame']:
   q=(f-ka['frame'])/(kb['frame']-ka['frame']);q=ease(q) if kb.get('interpolationType')=='cubic' else q
   return ka['value']+(kb['value']-ka['value'])*q
 return a[-1]['value']
add=[];change=[];delete=[]
def put(o,p,f,v):
 k=next((k for k in t[o,p] if k['frame']==f),None)
 if k:change.append({'keyframeId':k['keyframeId'],'value':v})
 else:add.append({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})
# Increase panel height through its rectangle geometry, preserving its normal rounded corners.
groups=[('0-10056','0-10057',['0-10059','0-10063'],74,201,228),('0-10066','0-10067',['0-10069','0-10072'],74,201,228),('0-9030','0-9031',['0-9033','0-9036'],470,554,581),('0-9039','0-9040',['0-9042','0-9045'],470,554,581),('0-6183','0-6184',['0-6186','0-6189'],875,959,986),('0-6192','0-6193',['0-6195','0-6198'],875,959,986)]
ids=[o for art,g,paths,*_ in groups for o in [g]+paths]
v=unpack(rpc('query_property_values',{'propertyKeys':{o:[14,21] for o in ids}}))['values']
for art,g,paths,s,c,h in groups:
 sx=val(art,16,s+40)/100;sy=val(art,17,s+40)/100;gy=v[g]['14'];delta=2*gy*(sy/sx-1)
 put(art,17,s+40,sx*100);put(art,17,c,sx*100)
 for oid,p,base,expanded in [(g,14,gy,gy+delta/2)]+[(o,21,v[o]['21'],v[o]['21']+delta) for o in paths]:
  for f,n in [(0,base),(s+12,base),(s+40,expanded),(c,expanded),(h,base),(1620,base)]:put(oid,p,f,n)
# The source port follows the actual Start card edge throughout the same transform.
for oid,prop in [('0-10079',24),('0-10079',25),('0-9068',13),('0-9068',14)]:
 delete.extend(k['keyframeId'] for k in t[oid,prop]);t[oid,prop]=[]
 frames=sorted(set(range(0,1621,2))|{k['frame'] for k in ks if k['objectId'] in ['0-12430','0-13135','0-12503','0-10074']})
 for f in frames:
  x=val('0-12430',13,f)+val('0-12503',13,f)+313.0989238891602*val('0-13135',16,f,100)/100
  y=val('0-12430',14,f)+val('0-12503',14,f)+202.5930504150391*val('0-13135',17,f,100)/100
  if oid=='0-9068':value=(x if prop==13 else y)-7
  elif prop==24:value=(x-val('0-10074',13,f))/.01/val('0-10074',16,f,100)-.0004119873
  else:value=(y-val('0-10074',14,f))/.01/val('0-10074',17,f,100)-49.1100030518
  add.append({'objectId':oid,'propertyKey':prop,'frame':f,'value':value,'interpolationType':'linear'})
for oid in ['0-9068','0-12496']:
 for k in t[oid,18]:
  if k['frame']<228:delete.append(k['keyframeId'])
 t[oid,18]=[k for k in t[oid,18] if k['frame']>=228]
 for f,v in [(0,0 if oid=='0-9068' else 100),(74,0 if oid=='0-9068' else 100),(84,100 if oid=='0-9068' else 0),(228,100 if oid=='0-9068' else 0)]:put(oid,18,f,v)
if delete:rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','delete':delete}})
for op,items in [('change',change),('add',add)]:
 for i in range(0,len(items),300):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+300]}}));assert not r.get('errors'),r
print({'changed':len(change),'added':len(add),'deleted':len(delete)})
