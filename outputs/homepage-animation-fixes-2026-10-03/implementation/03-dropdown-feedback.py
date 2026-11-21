from rpc import rpc,unpack
from pathlib import Path
import json
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-hover-before-keys.json')))['keyframes']['0-6']
def remap(f):return round(f+36*max(0,min(1,(f-715)/59)))
end=remap(1620)
r=unpack(rpc('set_property_values',{'propertyValues':{'0-6':{'57':end},'0-7041':{'14':38},'0-7265':{'14':86},'0-4030':{'18':0},'0-1451':{'18':0}}}));assert not r.get('errors'),r
# Extend only the user-picker selection interval, retaining all later synchronization.
change=[{'keyframeId':k['keyframeId'],'frame':remap(k['frame'])} for k in sorted(ks,key=lambda x:x['frame'],reverse=True)]
for i in range(0,len(change),350):rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','change':change[i:i+350]}})
change=[];adds=[]
for o,select in [('0-8533',774),('0-5697',1151)]:
 for k in ks:
  if k['objectId']==o and k['propertyKey']==18 and k['frame']<=select:change.append({'keyframeId':k['keyframeId'],'value':0})
curve={'x1':.42,'y1':0,'x2':.58,'y2':1}
def track(o,p,points):
 for f,v in points:adds.append({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':curve})
# Animate a clear first-row Alex hover, then second-row Laura hover and click.
for o in ['0-12367','0-12393']:
 target={p:next(k['value'] for k in ks if k['objectId']==o and k['propertyKey']==p and k['frame']==763) for p in [13,14]}
 for k in ks:
  if k['objectId']==o and k['propertyKey'] in [13,14] and k['frame'] in [736,763,774]:
   v=target[k['propertyKey']]+(48 if k['propertyKey']==14 and k['frame'] in [763,774] else 0)
   change.append({'keyframeId':k['keyframeId'],'value':v})
 for p in [13,14]:track(o,p,[(765,target[p]),(781,target[p]+(48 if p==14 else 0))])
# All illustrated choices share the same neutral hover and light-blue pressed feedback.
items=[('1-10633','1-10636',749,None,765,775),('1-10637','1-10640',781,798,810,838),('1-10641','1-10644',129,189,201,211),('1-10645','1-10648',525,542,554,564),('1-10649','1-10652',remap(930),remap(947),remap(959),remap(969)),('1-10653','1-10656',remap(1130),remap(1139),remap(1151),remap(1178))]
for shape,color,hover,click,hold,hidden in items:
 track(shape,18,[(0,0),(hover-6,0),(hover,100),(hold,100),(hidden,0),(end,0)])
 if click:track(color,37,[(0,'#fff1f3f5'),(click-2,'#fff1f3f5'),(click,'#ffd9efff'),(hidden,'#ffd9efff'),(hidden+1,'#fff1f3f5'),(end,'#fff1f3f5')])
for op,items in [('change',change),('add',adds)]:
 for i in range(0,len(items),300):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+300]}}));assert not r.get('errors'),r
out={'duration':end/60,'userOrder':['Alex Morgan','Laura Kim','Priya Shah','Jordan Brooks','Sophie Bennett'],'alexHoverFrame':749,'lauraHoverFrame':781,'lauraPressFrame':798,'lauraSelectedFrame':838,'preventPrematureSelection':['Laura Kim','AI Agent'],'feedbackMenus':['first context menu','If context menu','Else context menu','user picker','agent picker']}
Path('outputs/homepage-animation-fixes-2026-10-03/03/dropdown-feedback.json').write_text(json.dumps(out,indent=2)+'\n');print(out)
p=Path('outputs/homepage-animation-fixes-2026-10-03/review.html');s=p.read_text().replace('3:27','3:27.6');p.write_text(s)
