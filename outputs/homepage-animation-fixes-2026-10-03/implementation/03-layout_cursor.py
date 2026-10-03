from rpc import rpc,unpack
import json,collections
ks=unpack(rpc('animation_editor',{'command':'queryKeyFrames','data':{'animationIds':['0-6']}}))['keyframes']['0-6'];tr=collections.defaultdict(list)
for k in ks:tr[k['objectId'],k['propertyKey']].append(k)
for t in tr.values():t.sort(key=lambda k:k['frame'])
def value(o,p,f):
 t=tr[o,p]
 for a,b in zip(t,t[1:]):
  if a['frame']<=f<=b['frame']:
   q=(f-a['frame'])/(b['frame']-a['frame']);return a['value']+(b['value']-a['value'])*q
 return t[-1]['value']
delete=[];adds=[]
for o in ['0-12367','0-12393']:
 for p,base in [(13,588.751),(14,650.371)]:
  for start,end,first,last in [(420,452,None,(350,418)),(480,525,(350,418),None),(838,893,None,(610,418)),(921,966,(610,418),None)]:
   i=p-13;a=value(o,p,start) if first is None else first[i]-base;b=value(o,p,end) if last is None else last[i]-base
   delete.extend(k['keyframeId'] for k in tr[o,p] if start<=k['frame']<=end)
   for f,v in [(start,a),(end,b)]:adds.append({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})
for op,items in [('delete',delete),('add',adds)]:
 for i in range(0,len(items),250):rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}})
print('Cursor transitions smoothed')
