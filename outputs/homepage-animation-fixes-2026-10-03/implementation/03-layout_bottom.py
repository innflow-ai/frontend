from rpc import rpc,unpack
from pathlib import Path
import json,collections,math
P=Path('/tmp/homepage-animation-fixes');ks=unpack(json.load(open(P/'03-bottom-layout-before-keys.json')))['keyframes']['0-6'];tracks=collections.defaultdict(list)
for k in ks: tracks[k['objectId'],k['propertyKey']].append(k)
for v in tracks.values():v.sort(key=lambda k:k['frame'])
props=json.load(open(P/'03-layout-props.json'))['values']
def ease(t):return t*t*(3-2*t)
def v(o,p,f):
 a=tracks.get((o,p),[])
 if not a:return props.get(o,{}).get(str(p),100 if p in [16,17,18] else 0)
 if f<=a[0]['frame']:return a[0]['value']
 for x,y in zip(a,a[1:]):
  if f<=y['frame']:
   q=(f-x['frame'])/(y['frame']-x['frame'])
   if y.get('interpolationType')=='cubic':q=ease(q)
   elif y.get('interpolationType')=='hold':q=0
   return x['value']+(y['value']-x['value'])*q
 return a[-1]['value']
def blend(f):return ease(max(0,min(1,(f-426)/37)))*(1-ease(max(0,min(1,(f-1581)/27))))
def mix(a,b,t):return a+(b-a)*t
frames=sorted(set(range(0,1657,2))|{k['frame'] for k in ks}|{426,463,470,480,1581,1608,1656})
# Finished condition stays at 75%; Start resolves to 32% of its original artwork.
def root(o,f):
 b=blend(f);x,y=v(o,13,f),v(o,14,f);sc=1
 if o=='0-9082':tx,ty=280,110;sc=.75/(v('0-9083',16,f)/100)
 elif o=='0-12430':tx,ty=32,150;sc=.32/(v('0-13135',16,f)/100)
 elif o=='0-6200':tx,ty=135,440
 elif o=='0-4691':tx,ty=455,440
 return mix(x,tx,b),mix(y,ty,b),mix(1,sc,b)
def nodepoint(o,f,x,y):
 nx,ny,s=root(o,f);return nx+(x-v(o,13,f))*s,ny+(y-v(o,14,f))*s
out={}
def track(o,p,fn):out[o,p]=[(f,fn(f)) for f in frames]
for o in ['0-9082','0-12430','0-6200','0-4691']:
 for p,i in [(13,0),(14,1)]:track(o,p,lambda f,o=o,i=i:root(o,f)[i])
 if o in ['0-9082','0-12430']:
  for p in [16,17]:track(o,p,lambda f,o=o:root(o,f)[2]*100)
# Keep native menu build, moving its top anchor so the shell resolves below the output.
# Ports are centered on their new edges. Small artwork offset is seven units.
target={'0-9054':(343,357),'0-9047':(603,357),'0-9075':(273,150),'0-9061':(273,150),'0-9068':(235,150),'0-4666':(259,433),'0-4659':(579,433)}
for o,(x,y) in target.items():
 for p,t in [(13,x),(14,y)]:track(o,p,lambda f,o=o,p=p,t=t:mix(v(o,p,f),t,blend(f)))
for o in ['0-51444','0-51445']:track(o,15,lambda f:90*blend(f))
# Existing connections remain for the opening and fade as the board rearranges.
for o in ['0-10074','0-4682','0-4673']:track(o,18,lambda f,o=o:v(o,18,f)*(1-blend(f)))
# Author three clean, editable routes in final board coordinates.
paths=[('Start to condition',[(242,157),(280,157)],'0-10074'),('If down to user',[(350,364),(350,390),(266,410),(266,440)],'0-4682'),('Else down to agent',[(610,364),(610,390),(586,410),(586,440)],'0-4673')]
new=[]
for name,points,old in paths:
 commands=[{'commandType':'moveTo','x':points[0][0],'y':points[0][1]}]
 if len(points)==2:commands.append({'commandType':'lineTo','x':points[1][0],'y':points[1][1]})
 else:commands.append({'commandType':'cubicTo','control1X':points[1][0],'control1Y':points[1][1],'control2X':points[2][0],'control2Y':points[2][1],'endX':points[3][0],'endY':points[3][1]})
 r=unpack(rpc('path_editor',{'command':'createShapes','data':{'createShapes':{'shapes':[{'parentId':'0-20','name':'Bottom layout / '+name,'x':0,'y':0,'paints':[{'paintType':'stroke','color':'#ff00aeff','width':2}],'paths':[{'commands':commands}]}]}}}))
 q=unpack(rpc('query_objects',{'objectIds':['0-20'],'depth':1}));nid=next(o['id'] for o in q['objects'] if o.get('name')=='Bottom layout / '+name);new.append(nid)
 rpc('set_property_values',{'propertyValues':{nid:{'13':0,'14':0,'18':0}}});track(nid,18,lambda f,old=old:v(old,18,f)*blend(f))
# Cursor follows the displayed target, retaining the original pauses and click cadence.
def cp(f):
 x=v('0-12366',13,f)+v('0-12367',13,f);y=v('0-12366',14,f)+v('0-12367',14,f);b=blend(f)
 if f<436:tx,ty=nodepoint('0-9082',f,x,y);return tx,ty
 if f<=480:tx,ty=351,419
 elif f<=838:tx,ty=nodepoint('0-6200',f,x,y)
 elif f<=921:tx,ty=611,419
 else:tx,ty=nodepoint('0-4691',f,x,y)
 # nodepoint already blended; direct handle targets need the reflow blend.
 return (mix(x,tx,b),mix(y,ty,b)) if f<=480 or 838<f<=921 else (tx,ty)
for o in ['0-12367','0-12393']:
 for p,i in [(13,0),(14,1)]:track(o,p,lambda f,p=p,i=i:cp(f)[i]-v('0-12366',p,f))
def simplify(pts,tol=.07):
 if len(pts)<3:return pts
 a,b=pts[0],pts[-1];err,ix=max((abs(y-(a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]))),i) for i,(x,y) in enumerate(pts[1:-1],1))
 if err<=tol:return[a,b]
 return simplify(pts[:ix+1],tol)[:-1]+simplify(pts[ix:],tol)
delete=[k['keyframeId'] for k in ks if (k['objectId'],k['propertyKey']) in out];adds=[{'objectId':o,'propertyKey':p,'frame':f,'value':val,'interpolationType':'linear'} for (o,p),pts in out.items() for f,val in simplify(pts)]
for op,items in [('delete',delete),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
print({'tracks':len(out),'added':len(adds),'deleted':len(delete),'routes':new})
Path('outputs/homepage-animation-fixes-2026-10-03/03/bottom-layout/layout.json').write_text(json.dumps({'conditionScale':.75,'startScale':.32,'conditionPosition':[280,110],'userPosition':[135,440],'agentPosition':[455,440],'routes':new},indent=2))
