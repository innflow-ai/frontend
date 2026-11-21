from pathlib import Path
from rpc import rpc,unpack
import json
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-skeleton-before-keys.json')))['keyframes']['0-6']
change=[{'keyframeId':k['keyframeId'],'value':100} for k in ks if k['objectId']=='0-10084' and k['propertyKey'] in [16,17]]
# Preserve the label proportions; selection feedback belongs to the row fill.
for k in ks:
 if k['objectId'] in ['0-9083','0-9121','0-9229','0-9794'] and k['propertyKey']==18:
  if k['frame']==209:change.append({'keyframeId':k['keyframeId'],'frame':250})
  elif k['frame']==228:change.append({'keyframeId':k['keyframeId'],'frame':268})
# Shape placeholders belong to the existing connected node, without a second panel or resize.
items=[]
for name,node,start,full,hold,end,parts in [
 ('Condition','0-9082',215,228,248,268,[(44,48,32,32),(165,48,180,16),(153,105,250,13),(98,156,140,25),(252,156,140,25),(406,156,140,25),(178,230,300,13)]),
 ('User','0-6200',564,581,605,631,[(25,27,18,18),(100,27,110,9),(131,71,220,26)]),
 ('Agent','0-4691',1005,1022,1047,1073,[(25,27,18,18),(100,27,110,9),(131,71,220,26)])]:
 for i,(x,y,w,h) in enumerate(parts):items.append({'name':f'{name} loading skeleton {i+1}','node':node,'start':start,'full':full,'hold':hold,'end':end,'x':x,'y':y,'w':w,'h':h})
r=unpack(rpc('path_editor',{'command':'createParametricShapes','data':{'createParametricShapes':{'shapes':[{'primitive':'rectangle','name':a['name'],'parentId':a['node'],'x':a['x'],'y':a['y'],'width':a['w'],'height':a['h'],'cornerRadius':4,'paints':[{'paintType':'fill','color':'#ffe6eaef'}]} for a in items]}}}));assert r.get('success'),r
adds=[];positions={}
for a,s in zip(items,r['shapes']):
 a['id']=s['id'];positions[s['id']]={'13':a['x'],'14':a['y'],'18':0}
 for f,v in [(0,0),(a['start'],0),(a['full'],100),(a['hold'],82),(a['end'],0),(1656,0)]:adds.append({'objectId':s['id'],'propertyKey':18,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})
assert unpack(rpc('set_property_values',{'propertyValues':positions})).get('success')
for op,data in [('change',change),('add',adds)]:
 rr=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:data}}));assert not rr.get('errors'),rr
Path('outputs/homepage-animation-fixes-2026-10-03/03/menu-skeleton.json').write_text(json.dumps({'textScale':100,'duration':27.6,'skeletons':items},indent=2)+'\n')
print({'fixedScaleKeys':14,'skeletonShapes':len(items),'duration':27.6})
