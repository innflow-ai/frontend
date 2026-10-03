from pathlib import Path
from rpc import rpc,unpack
import json,zipfile,base64,urllib.parse
base=Path('outputs/homepage-animation-fixes-2026-10-03');out=base/'03/assets/menu-icons';out.mkdir(exist_ok=True)
z=zipfile.ZipFile('/Users/ak/Downloads/mage-icons-svg.zip');names=['Zap','User','Robot','Book Text','Reload','Filter 2'];assets={}
for name in names:
 svg=z.read(f'svg/stroke/{name}.svg').decode().replace('stroke="black"','stroke="#566273"');p=out/(name.lower().replace(' ','-')+'.svg');p.write_text(svg)
 r=unpack(rpc('upload_asset',{'file':'data:image/svg+xml;name='+urllib.parse.quote(p.name)+';base64,'+base64.b64encode(svg.encode()).decode(),'name':'Menu Mage stroke '+name}));assets[name]=r['asset']['id']
ms=json.load(open(base/'03/menu-build.json'))['menus'];j=unpack(json.load(open('/tmp/homepage-animation-fixes/03-skeleton-menus.json')));objects={o['id']:o for o in j['objects']};ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-menu-entry-before-keys.json')))['keyframes']['0-6'];sk=json.load(open(base/'03/menu-entry-skeleton.json'));props=json.load(open('/tmp/homepage-animation-fixes/03-menu-row-props.json'))['values'];change=[];positions={};parts=[];instances=[]
for m,build,full in zip(ms,[86,482,923],[114,510,951]):
 first=m['label']=='Start';size=28 if first else 20;left=20.368 if first else 13.904;dy=8.7 if first else 5.95;offset=40 if first else 30
 for i,(row,name) in enumerate(zip(m['rows'],names)):
  label=objects[row]['children'][0]
  for k in ks:
   if k['objectId']==label and k['propertyKey']==13:change.append({'keyframeId':k['keyframeId'],'value':k['value']+offset})
  positions[label]={'13':left+offset}
  r=unpack(rpc('assets_tool',{'command':'addSvgInstance','data':{'assetId':assets[name],'parentId':row,'name':'Mage '+name+' menu icon','x':left,'y':dy}}));assert r.get('success'),r
  positions[r['nodeId']]={'13':left,'14':dy,'16':size/24*100,'17':size/24*100};instances.append({'nodeId':r['nodeId'],'option':objects[label]['name'],'icon':name,'menu':m['label']})
  # Align option skeleton text to the new text column, plus an icon placeholder.
  old=sk['parts'][ms.index(m)*7+i+1];positions[old['id']]={'13':old['x']+offset}
  parts.append({'primitive':'rectangle','name':m['label']+' skeleton icon '+name,'parentId':m['root'],'x':props[row]['13']+left+size/2,'y':props[row]['14']+dy+size/2,'width':size,'height':size,'cornerRadius':4,'paints':[{'paintType':'fill','color':'#ffe6eaef'}],'build':build,'full':full})
r=unpack(rpc('path_editor',{'command':'createParametricShapes','data':{'createParametricShapes':{'shapes':[{k:v for k,v in a.items() if k not in ['build','full']} for a in parts]}}}));assert r.get('success'),r
adds=[]
for a,s in zip(parts,r['shapes']):
 positions[s['id']]={'13':a['x'],'14':a['y'],'18':0}
 for f,v in [(0,0),(a['build'],0),(a['build']+6,100),(a['full'],100),(a['full']+12,0),(1656,0)]:adds.append({'objectId':s['id'],'propertyKey':18,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})
assert unpack(rpc('set_property_values',{'propertyValues':positions})).get('success')
for op,items in [('change',change),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
(base/'03/menu-icons.json').write_text(json.dumps({'source':'Local Mage UI SVG stroke library','instances':instances,'assets':assets},indent=2)+'\n');print({'menuIcons':len(instances),'skeletonIconPlaceholders':len(parts)})
