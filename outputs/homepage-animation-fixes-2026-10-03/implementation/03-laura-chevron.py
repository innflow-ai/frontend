from rpc import rpc,unpack
from pathlib import Path
import json,shutil
B=Path('outputs/homepage-animation-fixes-2026-10-03/03/laura-chevron');(B/'before').mkdir(parents=True,exist_ok=True)
for ext in ['riv','rev']:shutil.copyfile('outputs/homepage-animation-fixes-2026-10-03/03/after/03_-_put_ai_to_work_your_way.'+ext,B/'before'/('03.'+ext))
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-chevron-keys.json')))['keyframes']['0-6']
delete=[k['keyframeId'] for k in ks if k['objectId']=='0-8280' and k['propertyKey'] in [13,14] and 878<=k['frame']<1629]
adds=[{'objectId':'0-8280','propertyKey':p,'frame':f,'value':v,'interpolationType':'linear'} for p,rest,reset in [(13,206.858,216.274),(14,13.078,13.934)] for f,v in [(878,rest),(1581,rest),(1608,reset)]]
rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','delete':delete}})
print(unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','add':adds}})))
(B/'changes.json').write_text(json.dumps({'removedDelayedShiftFrames':[878,905],'stableSelectedPosition':[206.858,13.078],'stableUntilFrame':1581,'resetDuringFade':[1581,1608],'duration':27.6},indent=2)+'\n')
