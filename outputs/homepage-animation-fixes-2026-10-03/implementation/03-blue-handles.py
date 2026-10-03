from pathlib import Path
from rpc import rpc,unpack
import json,shutil
b=Path('outputs/homepage-animation-fixes-2026-10-03');before=b/'03/blue-handles-before';before.mkdir(exist_ok=True)
for ext in ['riv','rev']:shutil.copy2(b/'03/after'/f'03_-_put_ai_to_work_your_way.{ext}',before/f'03.{ext}')
ks=unpack(json.load(open('/tmp/homepage-animation-fixes/03-blue-handles-before-keys.json')))['keyframes']['0-6'];changes=[];adds=[]
for fill,plus in [('0-51465','0-51461'),('0-51487','0-51483'),('0-51509','0-51505')]:
 for k in ks:
  if k['objectId']==fill and k['propertyKey']==37:
   rest=k['value']=='#00ffffff'
   changes.append({'keyframeId':k['keyframeId'],'value':'#ff00aeff' if rest else '#ffffffff'})
   adds.append({'objectId':plus,'propertyKey':37,'frame':k['frame'],'value':'#ffffffff' if rest else '#ff00aeff','interpolationType':'cubic','cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})
for op,items in [('change',changes),('add',adds)]:
 r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items}}));assert not r.get('errors'),r
r=unpack(rpc('set_property_values',{'propertyValues':{**{x:{'37':'#ff00aeff'} for x in ['0-51465','0-51487','0-51509']},**{x:{'37':'#ffffffff'} for x in ['0-51461','0-51483','0-51505']}}}));assert r.get('success'),r
(b/'03/blue-handles.json').write_text(json.dumps({'handles':['Start','If','Else'],'rest':{'fill':'#00aeff','plus':'#ffffff','scale':80},'hover':{'fill':'#ffffff','plus':'#00aeff','scale':110},'clickScale':100,'duration':27.6},indent=2)+'\n');print({'changedColorKeys':len(changes),'addedPlusColorKeys':len(adds)})
