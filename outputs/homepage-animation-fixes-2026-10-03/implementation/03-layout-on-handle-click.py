from rpc import rpc,unpack
from pathlib import Path
import json,collections,shutil
B=Path('outputs/homepage-animation-fixes-2026-10-03/03/layout-on-handle-click');(B/'before').mkdir(parents=True,exist_ok=True)
for e in ['riv','rev']:shutil.copyfile('outputs/homepage-animation-fixes-2026-10-03/03/after/03_-_put_ai_to_work_your_way.'+e,B/'before'/('03.'+e))
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-layout-trigger-keys.json')))['keyframes']['0-6'];tr=collections.defaultdict(list)
for k in ks:tr[k['objectId'],k['propertyKey']].append(k)
for t in tr.values():t.sort(key=lambda k:k['frame'])
def v(o,p,f):
 t=tr[o,p]
 if f<=t[0]['frame']:return t[0]['value']
 for a,b in zip(t,t[1:]):
  if f<=b['frame']:
   u=(f-a['frame'])/(b['frame']-a['frame']);return a['value']+(b['value']-a['value'])*u
 return t[-1]['value']
delete=[];adds=[]
# Move the existing hover and press onto the large condition's bottom stub.
for o,p in [('0-51468',16),('0-51468',17),('0-51483',37),('0-51487',37)]:
 for k in tr[o,p]:
  if 452<=k['frame']<=481:
   delete.append(k['keyframeId']);a={z:k[z] for z in ['objectId','propertyKey','value','interpolationType']};a['frame']=k['frame']-44
   if a['interpolationType']=='cubic':a['cubicParams']={'x1':.2,'y1':0,'x2':.2,'y2':1}
   adds.append(a)
for o in ['0-12367','0-12393']:
 for p,base,offset in [(13,588.751,7),(14,650.371,61)]:
  delete.extend(k['keyframeId'] for k in tr[o,p] if 390<=k['frame']<=480)
  pts=[(390,v(o,p,390)),(408,v('0-9054',p,408)+offset-base),(426,v('0-9054',p,426)+offset-base)]
  pts += [(f,v('0-9054',p,f)+offset-base) for f in list(range(428,463,2))+[463,480]]
  for f,val in pts:adds.append({'objectId':o,'propertyKey':p,'frame':f,'value':val,'interpolationType':'linear' if f>=426 else 'cubic',**({'cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}} if f<426 else {})})
for op,items in [('delete',delete),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
report={'handleHoverFrames':[408,419],'handlePressFrame':426,'layoutStartsFrame':426,'layoutSettlesFrame':463,'nextStepMenuRevealFrames':[470,480],'cursorFollowsPressedHandleThroughLayout':True,'duration':27.6};(B/'changes.json').write_text(json.dumps(report,indent=2)+'\n');print(report)
