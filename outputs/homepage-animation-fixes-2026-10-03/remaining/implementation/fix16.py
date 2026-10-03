from common import *
import zipfile,urllib.parse
assert call('session_info')['activeFileId']==2626595
z=zipfile.ZipFile('/Users/ak/Downloads/mage-icons-svg.zip');j=json.loads((BASE/'16/hierarchy.json').read_text());objs={o['id']:o for o in j['objects']};changes=[]
for parent,name,color in [('0-2712','Stars A','#8073e5'),('0-2789','Chevron Down','#939dad'),('0-2910','Search','#67788a'),('0-2811','Chip','#67788a')]:
 svg=z.read('svg/stroke/'+name+'.svg').decode().replace('stroke="black"','stroke="'+color+'"')
 p=BASE/'16/assets'/(name+'.svg');p.parent.mkdir(exist_ok=True);p.write_text(svg)
 r=call('upload_asset',{'file':'data:image/svg+xml;name='+urllib.parse.quote(p.name)+';base64,'+base64.b64encode(svg.encode()).decode(),'name':'Mage stroke '+name})
 r=call('assets_tool',{'command':'addSvgInstance','data':{'assetId':r['asset']['id'],'parentId':parent,'name':'Mage stroke '+name,'x':0,'y':0}})
 props={i:{'18':0} for i in objs[parent]['children']};props[r['nodeId']]={'13':0,'14':0,'16':100,'17':100}
 call('set_property_values',{'propertyValues':props});changes.append({'parent':parent,'new':r['nodeId'],'icon':name})
call('rename_objects',{'objects':[{'id':c['parent'],'name':'16 / Mage stroke '+c['icon']} for c in changes]})
save('16/change.json',changes);capture('16/after.png');export('16','after')
