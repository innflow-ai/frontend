from rpc import rpc,unpack
from paper_rpc import paper,FILE
from pathlib import Path
import json,re,base64,urllib.parse,collections
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
B=Path('outputs/homepage-animation-fixes-2026-10-03/03/bottom-layout');B.mkdir(exist_ok=True)
# Reference files are backed up before replacing the accent, preserving token names.
src=Path('/Users/ak/Library/CloudStorage/Dropbox/dub.co');copy=Path('outputs/homepage-animation-fixes-2026-10-03/03/dub-restyle')
for n in ['DESIGN (1).md','theme (1).css','tokens (2).json','variables (1).css']:
 s=(src/n).read_text();(B/('before-'+n)).write_text(s)
 s=re.sub(r'#2563eb\b','#00AEFF',s,flags=re.I)
 (src/n).write_text(s);(copy/n).write_text(s)
print('Updated four Dropbox reference files',flush=True)
print(paper('set_tokens',{'fileId':FILE,'tokens':[{'name':'--color-dub-accent','value':'#00AEFF'}]}),flush=True)
# Snapshot current source for reliable updates.
j=unpack(rpc('get_artboard_hierarchy',{'artboardId':'0-2','depth':30}));json.dump(j,open(B/'source-before-menu.json','w'));objs=j['objects'];by={o['id']:o for o in objs};parent={c:o['id'] for o in objs for c in o.get('children',[])}
ks=unpack(rpc('animation_editor',{'command':'queryKeyFrames','data':{'animationIds':['0-6']}}))['keyframes']['0-6'];json.dump(ks,open(B/'keys-before-menu.json','w'))
colors=[o['id'] for o in objs if 'SolidColor' in o['types']];values={}
for i in range(0,len(colors),300):values.update(unpack(rpc('query_property_values',{'propertyKeys':{o:[37] for o in colors[i:i+300]}}))['values'])
changes=[];base={}
for o,p in values.items():
 if str(p.get('37','')).lower() in ['#ff2563eb','#2563eb']:base[o]={'37':'#ff00aeff'}
for k in ks:
 if k['propertyKey']==37 and str(k['value']).lower() in ['#ff2563eb','#2563eb']:changes.append({'keyframeId':k['keyframeId'],'value':'#ff00aeff'})
for o in ['1-13312','1-13318','1-13324']:base[o]={'32':False}
# New supplied outline asset in all next-step menus.
svg=Path('/Users/ak/Library/CloudStorage/Dropbox/Transparent eye cutouts - Outline.svg').read_text();(B/'agent-menu-outline.svg').write_text(svg)
def upload(svg,name):
 r=unpack(rpc('upload_asset',{'file':'data:image/svg+xml;name='+urllib.parse.quote(name+'.svg')+';base64,'+base64.b64encode(svg.encode()).decode(),'name':name}));return r['asset']['id']
def instance(asset,parent,name,x,y,scale=100):
 r=unpack(rpc('assets_tool',{'command':'addSvgInstance','data':{'assetId':asset,'parentId':parent,'name':name,'x':x,'y':y}}));nid=r['nodeId'];base[nid]={'13':x,'14':y,'16':scale,'17':scale};return nid
asset=upload(svg,'Innflow outline agent menu icon');icons=[]
for old in ['1-12773','1-12859','1-12945']:
 pv=unpack(rpc('query_property_values',{'propertyKeys':{old:[13,14,16,17]}}))['values'][old];base[old]={'18':0};icons.append(instance(asset,parent[old],'Select next step / Outline agent',pv['13'],pv['14'],pv['16']))
# Rebuild the Paper picker as editable vector artwork. Text is outlined for portable Rive export.
jsx=json.load(open('/tmp/homepage-animation-fixes/paper-agent-menu.json'))['content'][1]['text'];svgs=re.findall(r'<svg\b[\s\S]*?</svg>',jsx);chars=[s for s in svgs if 'viewBox="0 0 256 256"' in s];assert len(chars)==7
font=TTFont('/Users/ak/Library/Fonts/InterTight-Medium.ttf');glyphs=font.getGlyphSet();cmap=font.getBestCmap();units=font['head'].unitsPerEm
def textpath(text,x,y,size,color='#171717'):
 pen=SVGPathPen(glyphs);sc=size/units
 for ch in text:
  gn=cmap.get(ord(ch),'space');glyphs[gn].draw(TransformPen(pen,(sc,0,0,-sc,x,y)));x+=font['hmtx'][gn][0]*sc
 return '<path fill="'+color+'" d="'+pen.getCommands()+'"/>'
def character(s,x,y,size):
 s=re.sub(r' style=\{\{[\s\S]*?\}\}','',s);s=re.sub(r'<svg[^>]*>','',s, count=1).rsplit('</svg>',1)[0]
 return f'<g transform="translate({x} {y}) scale({size/256})">{s}</g>'
names=['Outreach Owen','Follow-up Fred','Research Riley','Scheduling Sam','Content Cleo','Support Sage','Insights Iris']
parts=['<svg xmlns="http://www.w3.org/2000/svg" width="320" height="342" viewBox="0 0 320 342">','<rect x=".5" y=".5" width="319" height="341" rx="12" fill="white" stroke="#e5e5e5"/>',textpath('Assign to agent',14,28,12,'#525252')]
for i,(name,s) in enumerate(zip(names,chars)):
 y=42+i*42;parts.extend([character(s,14,y+8,24),textpath(name,46,y+26,14)])
parts.append('</svg>');menu=''.join(parts);(B/'paper-agent-picker.svg').write_text(menu)
menuid=instance(upload(menu,'Dub agent picker / seven agents'),'0-20','Dub agent picker / seven agents',449,535,83)
selected='<svg xmlns="http://www.w3.org/2000/svg" width="280" height="36" viewBox="0 0 280 36">'+character(chars[0],0,6,24)+textpath('Outreach Owen',32,25,18)+'</svg>'
(B/'selected-outreach-owen.svg').write_text(selected)
selectedid=instance(upload(selected,'Selected Outreach Owen'),'0-20','Agent selected / Outreach Owen',478,497,78)
# Row highlight stays independent for hover and click, beneath all text and character paths.
r=unpack(rpc('path_editor',{'command':'createParametricShapes','data':{'createParametricShapes':{'shapes':[{'primitive':'rectangle','name':'Agent picker / Outreach hover','parentId':'0-20','x':449+160*.83,'y':535+62*.83,'width':308*.83,'height':40*.83,'cornerRadius':6*.83,'paints':[{'paintType':'fill','color':'#fff5f5f5'}]}]}}}));highlight=r['shapes'][0]['id'];base[highlight]={'13':449+160*.83,'14':535+62*.83,'18':0}
# Import menu background sits beneath highlight. Move only row contents above highlight via menu instance children using hierarchy.
# Easier use a translucent gray/blue overlay: keeps the underlying typography and icons visible.
adds=[];delete=[]
def replace(o,p,pts):
 delete.extend(k['keyframeId'] for k in ks if k['objectId']==o and k['propertyKey']==p)
 adds.extend({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'linear'} for f,v in pts)
for o in ['0-4729','0-5697']:replace(o,18,[(0,0),(1656,0)]);base[o]={'18':0}
# Suppress the old field expansion while the new popover is open.
for o,p in [('0-5835',14),('0-5837',21),('0-5841',21)]:
 tr=sorted([k for k in ks if k['objectId']==o and k['propertyKey']==p],key=lambda k:k['frame']);before=next(k['value'] for k in tr if k['frame']==1101)
 for k in tr:
  if 1101<=k['frame']<=1214:changes.append({'keyframeId':k['keyframeId'],'value':before})
replace(menuid,18,[(0,0),(1101,0),(1128,100),(1187,100),(1214,0),(1656,0)])
replace(menuid,14,[(0,543),(1101,543),(1128,535),(1187,535),(1214,543),(1656,543)])
replace(selectedid,18,[(0,0),(1187,0),(1214,100),(1533,100),(1560,18),(1581,18),(1608,0),(1656,0)])
replace(highlight,18,[(0,0),(1138,0),(1150,45),(1175,45),(1178,65),(1187,65),(1214,0),(1656,0)])
# Color of selection overlay follows existing light-blue press feedback.
hier=unpack(rpc('query_objects',{'objectIds':[highlight],'depth':5}))['objects'];color=next(o['id'] for o in hier if 'SolidColor' in o['types'])
replace(color,37,[(0,'#fff5f5f5'),(1175,'#fff5f5f5'),(1178,'#ffbfeaff'),(1187,'#ffbfeaff'),(1214,'#fff5f5f5'),(1656,'#fff5f5f5')])
for o in ['0-12367','0-12393']:
 for p,target in [(13,572-588.751),(14,588-650.371)]:
  tr=sorted([k for k in ks if k['objectId']==o and k['propertyKey']==p],key=lambda k:k['frame']);prev=max((k for k in tr if k['frame']<=1101),key=lambda k:k['frame']);nxt=min((k for k in tr if k['frame']>=1214),key=lambda k:k['frame'])
  delete.extend(k['keyframeId'] for k in tr if 1101<=k['frame']<=1214)
  adds.extend({'objectId':o,'propertyKey':p,'frame':f,'value':val,'interpolationType':'cubic','cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}} for f,val in [(1101,prev['value']),(1145,target),(1187,target),(1214,nxt['value'])])
for o in [menuid,selectedid]:base[o]['18']=0
rpc('set_property_values',{'propertyValues':base})
changes=[c for c in changes if c['keyframeId'] not in set(delete)]
for op,items in [('delete',list(set(delete))),('change',changes),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
# Cursor is in front of the popover.
rpc('reorder_objects',{'objectIds':['0-12366'],'operation':'sendToFront'})
(B/'agent-picker.json').write_text(json.dumps({'menuId':menuid,'selectedId':selectedid,'highlightId':highlight,'outlineIcons':icons,'blue':'#00AEFF','source':'https://app.paper.design/file/'+FILE+'/p-1-0/8Y-0'},indent=2))
print('Created picker',menuid,'selected',selectedid,'outline',icons,flush=True)
