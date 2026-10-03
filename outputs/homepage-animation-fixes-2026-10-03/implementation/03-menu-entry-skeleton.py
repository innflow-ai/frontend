from pathlib import Path
import sys,json,shutil
from rpc import rpc,unpack
base=Path('outputs/homepage-animation-fixes-2026-10-03');before=base/'03/menu-entry-before';before.mkdir(exist_ok=True)
for ext in ['riv','rev']:shutil.copy2(base/'03/after'/f'03_-_put_ai_to_work_your_way.{ext}',before/f'03.{ext}')
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-menu-entry-before-keys.json')))['keyframes']['0-6'];old=json.load(open(base/'03/menu-skeleton.json'))['skeletons'];oldids={o['id'] for o in old}
change=[{'keyframeId':k['keyframeId'],'value':0} for k in ks if k['objectId'] in oldids and k['propertyKey']==18]
for k in ks:
 if k['objectId'] in ['0-9083','0-9121','0-9229','0-9794'] and k['propertyKey']==18 and k['frame'] in [250,268]:change.append({'keyframeId':k['keyframeId'],'frame':209 if k['frame']==250 else 228})
menus=json.load(open(base/'03/menu-build.json'))['menus'];props=json.load(open('/tmp/homepage-animation-fixes/03-menu-row-props.json'))['values'];parts=[];delete=[];adds=[]
curve={'x1':.42,'y1':0,'x2':.58,'y2':1}
def track(o,pts):
 for f,v in pts:adds.append({'objectId':o,'propertyKey':18,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':curve})
for m,build,full in zip(menus,[86,482,923],[114,510,951]):
 for i,o in enumerate([m['header']]+m['rows']):
  delete.extend(k['keyframeId'] for k in ks if k['objectId']==o and k['propertyKey']==18)
  track(o,[(0,0),(full,0),(full+12,100),(1656,100)])
  first=m['label']=='Start';w=([142,190,185,200,280,160,200] if first else [97,130,126,136,191,109,136])[i];h=13 if first else 9
  x=props[o]['13']+(20 if first and i else 10 if i else 0)+w/2;y=props[o]['14']+(21 if first and i else 15 if i else 9)
  parts.append({'primitive':'rectangle','name':f"{m['label']} menu loading option {i}",'parentId':m['root'],'x':x,'y':y,'width':w,'height':h,'cornerRadius':3,'paints':[{'paintType':'fill','color':'#ffe6eaef'}],'build':build,'full':full})
r=unpack(rpc('path_editor',{'command':'createParametricShapes','data':{'createParametricShapes':{'shapes':[{k:v for k,v in a.items() if k not in ['build','full']} for a in parts]}}}));assert r.get('success'),r
positions={}
for a,s in zip(parts,r['shapes']):
 a['id']=s['id'];positions[s['id']]={'13':a['x'],'14':a['y'],'18':0}
 track(s['id'],[(0,0),(a['build'],0),(a['build']+6,100),(a['full'],100),(a['full']+12,0),(1656,0)])
assert unpack(rpc('set_property_values',{'propertyValues':positions})).get('success')
for op,items in [('delete',delete),('change',change),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
(base/'03/menu-entry-skeleton.json').write_text(json.dumps({'duration':27.6,'skeletonLocation':'Select next step menu options after stub click','replacesPostSelectionSkeleton':True,'parts':parts},indent=2)+'\n')
print({'menuSkeletonShapes':len(parts),'disabledPostSelectionShapes':len(oldids)})
