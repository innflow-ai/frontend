from rpc import rpc,unpack
import json,pathlib,collections,math
p=pathlib.Path('/tmp/homepage-animation-fixes');ks=unpack(json.loads((p/'03-keys.json').read_text()))['keyframes']['0-6'];curves=json.loads((p/'03-easing.json').read_text())['values']
items=list(curves)
for n in range(0,len(items),400):
 r=unpack(rpc('set_property_values',{'propertyValues':{i:{'63':0.42,'64':0,'65':0.58,'66':1} for i in items[n:n+400]}}));assert not r.get('errors'),r
print('Softened',len(items),'easing curves')
def bez(t,a,b):return 3*(1-t)**2*t*a+3*(1-t)*t*t*b+t**3
def solve(v,a,b):
 lo,hi=0.,1.
 for _ in range(32):
  m=(lo+hi)/2
  if bez(m,a,b)<v:lo=m
  else:hi=m
 return (lo+hi)/2
def old_time_for_new(t):
 eased=bez(solve(t,.42,.58),0,1)
 return bez(solve(eased,0,1),0,.58)
tracks=collections.defaultdict(list)
for k in ks:tracks[k['objectId'],k['propertyKey']].append(k)
changes=[]
for key,arr in tracks.items():
 runs=[];r=[]
 for k in arr:
  if r and k['frame']!=r[-1]['frame']+1:
   if len(r)>3:runs.append(r)
   r=[]
  r.append(k)
 if len(r)>3:runs.append(r)
 for run in runs:
  for j,k in enumerate(run[1:-1],1):
   index=old_time_for_new(j/(len(run)-1))*(len(run)-1);i=int(index);f=index-i
   v=run[i]['value']*(1-f)+run[min(i+1,len(run)-1)]['value']*f
   changes.append({'keyframeId':k['keyframeId'],'value':v})
if changes:rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','change':changes}})
print('Matched',len(changes),'sampled handle transforms to easing')
