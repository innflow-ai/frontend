from rpc import rpc,unpack
from paper_rpc import paper,FILE
from pathlib import Path
import json,collections
P=Path('/tmp/homepage-animation-fixes');B=Path('outputs/homepage-animation-fixes-2026-10-03/03/bottom-layout')
ks=unpack(rpc('animation_editor',{'command':'queryKeyFrames','data':{'animationIds':['0-6']}}))['keyframes']['0-6'];tracks=collections.defaultdict(list)
for k in ks:tracks[k['objectId'],k['propertyKey']].append(k)
# Put hover fill between white panel and row artwork.
rpc('reparent_objects',{'operations':[{'objectId':'1-18999','newParentId':'1-15450'}]})
rpc('set_property_values',{'propertyValues':{'1-18999':{'13':160,'14':62,'16':100,'17':100},'1-19000':{'20':308,'21':40,'31':6}}})
rpc('reorder_objects',{'operations':[{'objectId':'1-18999','order':'sendToBack'},{'objectId':'1-18573','order':'sendToBack'},{'objectId':'0-12366','order':'sendToFront'}]})
change=[{'keyframeId':k['keyframeId'],'value':100} for k in tracks['1-18999',18] if k['value']>0]
# Restore source artwork stroke weight at small menu-icon sizes.
q=unpack(rpc('find_objects',{'name':'Select next step / Outline agent'}));print('outline',q)
objects=q.get('objects',q.get('matches',[]));ids=[o['id'] for o in objects]
if ids:
 tree=unpack(rpc('query_objects',{'objectIds':ids,'depth':8}))['objects'];vals={o['id']:{'47':18} for o in tree if 'Stroke' in o['types']};vals.update({o['id']:{'37':'#ff525252'} for o in tree if 'SolidColor' in o['types']});rpc('set_property_values',{'propertyValues':vals})
# Center growing menu shells underneath fixed incoming ports.
oldks=unpack(json.load(open(P/'03-bottom-layout-before-keys.json')))['keyframes']['0-6'];old=collections.defaultdict(list)
for k in oldks:old[k['objectId'],k['propertyKey']].append(k)
for t in old.values():t.sort(key=lambda k:k['frame'])
def val(o,p,f):
 t=old[o,p]
 if not t:return 100 if p in [16,17] else 0
 if f<=t[0]['frame']:return t[0]['value']
 for a,b in zip(t,t[1:]):
  if f<=b['frame']:
   u=(f-a['frame'])/(b['frame']-a['frame']);u=u*u*(3-2*u) if b.get('interpolationType')=='cubic' else u
   return a['value']+(b['value']-a['value'])*u
 return t[-1]['value']
adds=[];delete=[]
for root,group,art,start,end,center in [('0-6200','0-9031','0-9030',470,581,266),('0-4691','0-6184','0-6183',911,1022,586)]:
 delete.extend(k['keyframeId'] for k in tracks[root,13] if start<=k['frame']<=end)
 for f in sorted(set(range(start,end+1,2))|{start,end}):
  x=center-val(group,13,f)*val(art,16,f)/100
  adds.append({'objectId':root,'propertyKey':13,'frame':f,'value':x,'interpolationType':'linear'})
for op,items in [('delete',delete),('change',change),('add',adds)]:
 for i in range(0,len(items),250):rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}})
print(paper('set_text_content',{'fileId':FILE,'updates':[{'nodeId':'1V-0','textContent':'#00AEFF'}]}))
(B/'agent-picker.json').write_text(json.dumps({'menuId':'1-15450','selectedId':'1-18595','highlightId':'1-18999','outlineIcons':ids,'blue':'#00AEFF','source':'https://app.paper.design/file/'+FILE+'/p-1-0/8Y-0','typography':'Outlined Inter Tight Medium for portable Rive export'},indent=2))
print('Polished')
