from rpc import rpc,unpack
import json,pathlib
p=pathlib.Path('/tmp/homepage-animation-fixes')
ks=unpack(json.loads((p/'03-keys.json').read_text()))['keyframes']['0-6']
def remap(f):
 return round(f*1.6+sum(24*max(0,min(1,(f-a)/(b-a))) for a,b in [(141,145),(303,307),(519,523)]))
# Work backwards so keyframes never collide with keys awaiting retiming.
changes=[]
for k in sorted(ks,key=lambda k:k['frame'],reverse=True):
 c={'keyframeId':k['keyframeId'],'frame':remap(k['frame'])}
 # Preserve densely sampled transform tracks and their matching curves.
 changes.append(c)
r=unpack(rpc('set_property_values',{'propertyValues':{'0-6':{'57':remap(900)}}}));print(r)
for start in range(0,len(changes),350):
 r=rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','change':changes[start:start+350]}})
 (p/f'03-retime-{start}.json').write_text(json.dumps(r))
 print('Retimed',min(start+350,len(changes)),flush=True)
(p/'03-timing-map.json').write_text(json.dumps({str(f):remap(f) for f in range(901)}))
