from rpc import rpc,unpack
from pathlib import Path
import json,base64,urllib.parse,collections,shutil
B=Path('outputs/homepage-animation-fixes-2026-10-03/03/agent-svg-fit');S=Path('/Users/ak/Library/CloudStorage/Dropbox/innflow Agents Icons/Colored SVGs');A=B/'assets';A.mkdir(exist_ok=True)
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-svg-fit-before-keys.json')))['keyframes']['0-6'];tr=collections.defaultdict(list)
for k in ks:tr[k['objectId'],k['propertyKey']].append(k)
for t in tr.values():t.sort(key=lambda k:k['frame'])
def value(o,p,f):
 t=tr[o,p]
 if f<=t[0]['frame']:return t[0]['value']
 for a,b in zip(t,t[1:]):
  if f<=b['frame']:
   u=(f-a['frame'])/(b['frame']-a['frame']);return a['value']+(b['value']-a['value'])*u
 return t[-1]['value']
adds=[];delete=[];base={};instances=[]
def replace(o,p,pts,lo=0,hi=1656):
 delete.extend(k['keyframeId'] for k in tr[o,p] if lo<=k['frame']<=hi)
 adds.extend({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.2,'y1':0,'x2':.2,'y2':1}} for f,v in pts)
files=['outreach-owen','follow-up-fred','research-riley','scheduling-sam','content-cleo','support-sage','insights-iris'];old=['1-15703','1-16137','1-16493','1-16950','1-17375','1-17726','1-18119'];assets={}
def inst(asset,parent,name,x,y,sc):
 r=unpack(rpc('assets_tool',{'command':'addSvgInstance','data':{'assetId':asset,'parentId':parent,'name':name,'x':x,'y':y}}));nid=r['nodeId'];base[nid]={'13':x,'14':y,'16':sc,'17':sc,'18':100};return nid
for i,(name,o) in enumerate(zip(files,old)):
 p=S/(name+'.svg');s=p.read_text();shutil.copyfile(p,A/p.name)
 r=unpack(rpc('upload_asset',{'file':'data:image/svg+xml;name='+urllib.parse.quote(p.name)+';base64,'+base64.b64encode(s.encode()).decode(),'name':'Dropbox agent / '+name}));assets[name]=r['asset']['id'];base[o]={'18':0}
 nid=inst(assets[name],'1-15450','Agent option / '+name,14,50+i*42,9.375);instances.append({'name':name,'nodeId':nid,'source':str(p)})
# Replace the selected Research Riley character with the exact same Dropbox file.
q=unpack(rpc('query_objects',{'objectIds':['1-20294'],'depth':1}))['objects'];selectedgroup=next(o['id'] for o in q if o['id']!='1-20294' and 'Node' in o['types']);base[selectedgroup]={'18':0}
selectedicon=inst(assets['research-riley'],'1-20294','Selected Research Riley / Dropbox artwork',0,6,9.375)
base['1-15452']={'18':100}
base['1-18209']={'18':0}
# The menu uses its full 320 x 344 dimensions. Its native input background matches those bounds.
base['1-15450']={'13':0,'14':0,'16':100,'17':100}
fullw=320/.543;fullh=344/.543
for o,p,opened in [('0-5835',13,fullw/2),('0-5835',14,fullh/2),('0-5837',20,fullw-3.5285),('0-5841',20,fullw),('0-5837',21,fullh-3.5285),('0-5841',21,fullh)]:
 normal=value(o,p,1101);replace(o,p,[(1101,normal),(1113,opened),(1187,opened),(1199,normal),(1214,normal)],1101,1214)
replace('0-5398',13,[(1101,205.858),(1113,294),(1187,294),(1199,205.858),(1656,205.858)],1101,1656)
# Make room for the larger menu while keeping the input port and connector attached.
for o,p,shift in [('0-4691',13,-45),('0-4691',14,-16),('0-4659',13,-45),('0-4659',14,-16)]:
 rest=value(o,p,1101);replace(o,p,[(1101,rest),(1113,rest+shift),(1187,rest+shift),(1199,rest),(1214,value(o,p,1214))],1101,1214)
for p,rest,shift in [(24,586,-45),(25,440,-16)]:replace('1-13326',p,[(0,rest),(1101,rest),(1113,rest+shift),(1187,rest+shift),(1199,rest),(1656,rest)])
# Keep the authored cursor aligned with the full-size option rows.
for o in ['0-12367','0-12393']:
 for p,b,first,last in [(13,588.751,550,550),(14,650.371,538,622)]:
  replace(o,p,[(1101,value(o,p,1101)),(1145,first-b),(1156,first-b),(1166,last-b),(1187,last-b),(1214,value(o,p,1214))],1101,1214)
rpc('set_property_values',{'propertyValues':base})
for op,items in [('delete',delete),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
rpc('reorder_objects',{'operations':[{'objectId':x['nodeId'],'order':'sendToFront'} for x in instances]+[{'objectId':selectedicon,'order':'sendToFront'},{'objectId':'0-5398','order':'sendToFront'},{'objectId':'0-5408','order':'sendToFront'},{'objectId':'0-12366','order':'sendToFront'}]})
report={'sourceFolder':str(S),'instances':instances,'selectedResearchIcon':selectedicon,'menuWidth':320,'menuHeight':344,'priorMenuWidth':265.6,'priorMenuHeight':283.86,'alignment':'Menu and native field share their local origin and full dimensions','agentNodeOpenShift':[-45,-16],'transitionMs':200};(B/'changes.json').write_text(json.dumps(report,indent=2)+'\n');print(report)
