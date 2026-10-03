from common import *
import zipfile,urllib.parse
assert call('session_info')['activeFileId']==2626550
ks=json.load(open(BASE/'05/keys-before.json'))['keyframes']['3-5477'];changes=[]
for k in ks:
 if k['objectId']=='3-999' and k['propertyKey']==18:changes.append({'keyframeId':k['keyframeId'],'value':0})
call('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'3-5477','change':changes}})
call('set_property_values',{'propertyValues':{'3-1839':{'13':-83.9435}}})
z=zipfile.ZipFile('/Users/ak/Downloads/mage-icons-svg.zip');svg=z.read('svg/stroke/Calendar.svg').decode().replace('stroke="black"','stroke="#398be8"');p=BASE/'05/calendar.svg';p.write_text(svg)
r=call('upload_asset',{'file':'data:image/svg+xml;name=calendar.svg;base64,'+base64.b64encode(svg.encode()).decode(),'name':'Mage calendar context'})
r=call('assets_tool',{'command':'addSvgInstance','data':{'assetId':r['asset']['id'],'parentId':'3-19','name':'Meeting context calendar','x':-262,'y':-112}});icon=r['nodeId']
call('set_property_values',{'propertyValues':{icon:{'13':-262,'14':-112,'16':110,'17':110,'18':0}}})
parts=[]
for x,w,label in [(-262,214,'Context linked'),(-34,270,'Ready for review')]:
 g=call('group_editor',{'name':label,'parentId':'3-19','x':x,'y':72});print(g);gid=g.get('id',g.get('groupId'))
 if gid is None:raise RuntimeError(g)
 r=call('layout_editor',{'command':'appendLayout','data':{'layoutData':{'parentId':gid,'layouts':[{'componentType':'layout','name':label+' pill','layoutStyle':{'width':w,'height':38,'widthScaleType':'fixed','heightScaleType':'fixed','paddingLeft':14,'paddingTop':6,'backgroundColor':'#fff1f7ff','cornerRadius':8},'children':[{'componentType':'text','value':label,'textStyle':{'fontSize':19,'fillColor':'#ff3972a9'},'layoutStyle':{'widthScaleType':'fill','heightScaleType':'hug'}}]}]}}})
 parts.append(gid)
adds=[]
for oid,start,end in [(icon,291,312),(parts[0],378,399),(parts[1],405,426)]:
 call('set_property_values',{'propertyValues':{oid:{'18':0}}})
 for f,v in [(0,0),(start,0),(end,100),(546,100),(579,0),(690,0)]:adds.append({'objectId':oid,'propertyKey':18,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})
call('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'3-5477','add':adds}})
save('05/change.json',{'icon':icon,'pills':parts});export('05','after')
