from rpc import rpc,unpack
import json
from pathlib import Path
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-stable-keys.json')))['keyframes']['0-6'];menus=json.load(open('outputs/homepage-animation-fixes-2026-10-03/03/menu-build.json'))['menus'];shells=json.load(open('outputs/homepage-animation-fixes-2026-10-03/03/connected-shell-menus.json'))['menus']
adds=[];deletes=[];changes=[];props={}
def replace(o,p,points):
 deletes.extend(k['keyframeId'] for k in ks if k['objectId']==o and k['propertyKey']==p)
 for f,v in points:adds.append({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})
for m,sh in zip(menus,shells):
 s,c,h=m['newStart'],m['newClose'],m['newHidden'];base=sh['scale'];small=min((108 if m['label']=='Start' else 91.29)/sh['w'],(82 if m['label']=='Start' else 69.19)/sh['hmenu'])
 for oid in [m['header']]+m['rows']:replace(oid,18,[(0,100),(1620,100)])
 for oid in m['rows']:
  y=next(k['value'] for k in ks if k['objectId']==oid and k['propertyKey']==14 and k['frame']==h)
  replace(oid,14,[(0,y),(1620,y)])
 replace(m['root'],18,[(0,0),(s+12,0),(s+18,100),(c,100),(c+10,0),(1620,0)])
 for p in [16,17]:replace(m['root'],p,[(0,base*small*100),(s+12,base*small*100),(s+40,base*100),(h,base*100),(h+1,base*small*100),(1620,base*small*100)])
 left=(sh['w']-sh['w']*small)/2 if m['label']=='Start' else (91.29-sh['w']*small)/2
 replace(m['root'],13,[(0,left),(s+12,left),(s+40,0),(h,0),(h+1,left),(1620,left)])
for button,stem,color,axis,s in [('0-51446','0-51447','0-51465',14,74),('0-51468','0-51469','0-51487',13,470),('0-51490','0-51491','0-51509',13,875)]:
 props[button]={str(axis):52};props[stem]={str(17 if axis==14 else 16):40/26*100}
 for p in [16,17]:replace(button,p,[(0,80),(s-18,80),(s-7,110),(s,100),(s+10,110),(s+11,80),(1620,80)])
 replace(color,37,[(0,'#00ffffff'),(s-18,'#00ffffff'),(s-7,'#ffffffff'),(s+10,'#ffffffff'),(s+11,'#00ffffff'),(1620,'#00ffffff')])
 for cursor in ['0-12367','0-12393']:
  for k in ks:
   if k['objectId']==cursor and k['propertyKey']==axis and k['frame'] in [s-7,s]:changes.append({'keyframeId':k['keyframeId'],'value':k['value']-19})
print(unpack(rpc('set_property_values',{'propertyValues':props})))
for op,items in [('delete',deletes),('change',changes),('add',adds)]:
 for i in range(0,len(items),300):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+300]}}));assert not r.get('errors'),r
print({'deleted':len(deletes),'changed':len(changes),'added':len(adds),'stubLength':52})
