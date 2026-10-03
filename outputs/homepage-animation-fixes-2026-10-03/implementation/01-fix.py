from rpc import rpc,unpack
import pathlib,json
p=pathlib.Path('/tmp/homepage-animation-fixes');ks=unpack(json.loads((p/'01-keys.json').read_text()))['keyframes']['0-6'];changes=[]
for k in ks:
 if k['objectId']!='0-33':continue
 c={'keyframeId':k['keyframeId']}
 if k['propertyKey'] in [16,17]:
  if k['value']==18:c['value']=94
  elif abs(k['value']-102.5)<.01:c['value']=100.5
  if k['frame']==108:c['frame']=116
 if k['propertyKey']==18:
  if k['frame']==108:c['frame']=116
  if k['frame']==133:c['frame']=126
 if len(c)>1:changes.append(c)
r=rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','change':changes}});(p/'01-shadow-fix.json').write_text(json.dumps(r))
r=rpc('set_property_values',{'propertyValues':{'0-33':{'16':94,'17':94,'18':0}}})
print('Second message: hidden until 1.93s, fades in over 0.17s at nearly full size; shadow shares parent reveal.')
