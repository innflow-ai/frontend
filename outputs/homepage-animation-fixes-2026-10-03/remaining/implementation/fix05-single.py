from build_scene import *
assert call('session_info')['activeFileId']==2626550
export('05','before-single-component')
ks=call('animation_editor',{'command':'queryKeyFrames','data':{'animationIds':['3-5477']}})['keyframes']['3-5477'];changes=[]
for k in ks:
 c={'keyframeId':k['keyframeId']};p=k['propertyKey'];f=k['frame'];oid=k['objectId']
 if oid in ['3-19','3-2252'] and p==18:c['value']=0
 if oid=='3-2302':
  if p in [16,17]:c['value']=110
  if p==13 and 219<=f<=612:c['value']=-115.2000185
  if p==14 and 267<=f<=579:c['value']=-279.649961
 if oid in ['3-5432','3-5466','3-5470'] and 267<=f<=579:
  if p==21:c['value']=600 if oid=='3-5466' else 566
  if p==14:c['value']=130
 if len(c)>1:changes.append(c)
call('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'3-5477','change':changes}})
s=Scene('3-16','3-5477',690)
content=s.group('05 / Context and draft inside Dominic component','3-2302',0,0,0)
s.rect(content,'Response divider',-255,178,510,1,'#ffe5e9ef',0)
s.icon(content,'Calendar',-255,198,22,'#398be8');s.text(content,'Response heading','Draft response',-220,194,460,21)
s.text(content,'Response text','I’ll check Dominic’s availability for next week\nand share meeting options for review.',-255,238,515,21)
s.rect(content,'Ready for review background',-255,334,213,36,'#ffeaf6ff',8)
s.text(content,'Ready for review','Ready for review',-239,339,205,18,'#ff2479b8')
s.reveal(content,302,326,555)
s.track(content,14,[(0,10),(302,10),(326,0),(555,0),(579,0),(690,10)])
call('reorder_objects',{'operations':[{'objectId':content,'order':'sendToFront'}]})
save('05/single-component.json',s.finalize());export('05','single-component')
import shutil
for fmt in ['riv','rev']:shutil.copy2(BASE/'05/single-component'/('05.'+fmt),BASE/'05/after'/('05.'+fmt))
