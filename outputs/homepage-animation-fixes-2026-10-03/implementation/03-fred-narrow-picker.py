from rpc import rpc,unpack
from pathlib import Path
import json,collections,shutil
B=Path('outputs/homepage-animation-fixes-2026-10-03/03/fred-narrow-picker');(B/'before').mkdir(parents=True,exist_ok=True)
for ext in ['riv','rev']:shutil.copyfile(Path('outputs/homepage-animation-fixes-2026-10-03/03/after/03_-_put_ai_to_work_your_way.'+ext),B/'before'/('03.'+ext))
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-fred-width-keys.json')))['keyframes']['0-6'];tr=collections.defaultdict(list)
for k in ks:tr[k['objectId'],k['propertyKey']].append(k)
for t in tr.values():t.sort(key=lambda k:k['frame'])
def val(o,p,f):
 t=tr[o,p]
 if f<=t[0]['frame']:return t[0]['value']
 for a,b in zip(t,t[1:]):
  if f<=b['frame']:
   u=(f-a['frame'])/(b['frame']-a['frame']);return a['value']+(b['value']-a['value'])*u
 return t[-1]['value']
adds=[];delete=[]
def replace(o,p,pts,lo=0,hi=1656):
 delete.extend(k['keyframeId'] for k in tr[o,p] if lo<=k['frame']<=hi)
 adds.extend({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.2,'y1':0,'x2':.2,'y2':1}} for f,v in pts)
# Match the native field width throughout; only its height grows into the menu.
width=val('0-5841',20,1101)*.543;height=332
for o,p in [('0-5835',13),('0-5837',20),('0-5841',20)]:
 normal=val(o,p,1101);replace(o,p,[(1101,normal),(1214,normal)],1101,1214)
fullh=height/.543
for o,p,opened in [('0-5835',14,fullh/2),('0-5837',21,fullh-3.5285),('0-5841',21,fullh)]:
 normal=val(o,p,1101);replace(o,p,[(1101,normal),(1113,opened),(1187,opened),(1199,normal),(1214,normal)],1101,1214)
replace('0-5398',13,[(1101,205.858),(1656,205.858)],1101,1656)
# Like Laura's picker, the node stays in place while the field opens downwards.
for o,p in [('0-4691',13),('0-4691',14),('0-4659',13),('0-4659',14)]:replace(o,p,[(1101,val(o,p,1101)),(1214,val(o,p,1214))],1101,1214)
for p,rest in [(24,586),(25,440)]:replace('1-13326',p,[(0,rest),(1656,rest)])
# Compact seven rows vertically without scaling their text or SVG artwork.
icons=['1-21164','1-21257','1-21347','1-21456','1-21549','1-21627','1-21717'];labels=['1-17813','1-17481','1-17040','1-16568','1-16224','1-15778','1-15452']
props=unpack(rpc('query_property_values',{'propertyKeys':{o:[14] for o in labels}}))['values']
base={o:{'14':float(props[o]['14'])-2*i} for i,o in enumerate(labels)};base.update({o:{'14':50+40*i} for i,o in enumerate(icons)})
base['1-18999']={'13':width/2};base['1-19000']={'20':width-12,'21':40}
replace('1-18999',14,[(0,62),(1150,62),(1156,62),(1166,102),(1187,102),(1214,62),(1656,62)])
for o in ['0-12367','0-12393']:
 for p,b,first,last in [(13,588.751,590,590),(14,650.371,554,594)]:
  replace(o,p,[(1101,val(o,p,1101)),(1145,first-b),(1156,first-b),(1166,last-b),(1187,last-b),(1214,val(o,p,1214))],1101,1214)
# Reuse the menu's outlined Fred label and the canonical Dropbox Fred icon.
rpc('reparent_objects',{'operations':[{'objectId':'1-23206','newParentId':'1-20294','position':'start'}]})
r=unpack(rpc('assets_tool',{'command':'addSvgInstance','data':{'assetId':'1-21256','parentId':'1-20294','name':'Selected Follow-up Fred / Dropbox artwork','x':0,'y':6}}));fred=r['nodeId']
base.update({'1-20296':{'18':0},'1-21794':{'18':0},'1-23206':{'13':76.484375,'14':20.3359375,'16':100,'17':100,'18':100},fred:{'13':0,'14':6,'16':9.375,'17':9.375,'18':100}})
rpc('set_property_values',{'propertyValues':base})
for op,items in [('delete',delete),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
rpc('reorder_objects',{'operations':[{'objectId':o,'order':'sendToFront'} for o in ['1-23206',fred,'0-5398','0-5408','0-12366']]})
report={'fileId':2626295,'menuWidth':width,'menuHeight':height,'rowHeight':40,'fieldAndMenuWidthsMatch':True,'nativeFieldExpandsDownwardOnly':True,'nodeStationaryWhilePickerOpen':True,'selectedAgent':'Follow-up Fred','selectedIcon':fred,'selectedLabel':'1-23206','selectionRow':2,'openDurationMs':200,'closeDurationMs':200,'duration':27.6,'canonicalIcons':7};(B/'changes.json').write_text(json.dumps(report,indent=2)+'\n');print(report)
