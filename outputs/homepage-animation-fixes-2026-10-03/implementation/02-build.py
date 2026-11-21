from rpc import rpc,unpack
import pathlib,json
p=pathlib.Path('/tmp/homepage-animation-fixes');tree=unpack(json.loads((p/'02-table.json').read_text()))['objects'];objects={o['id']:o for o in tree};ks=unpack(json.loads((p/'02-keys.json').read_text()))['keyframes']['0-20']
rows=['0-7282','0-6038','0-4974','0-3710','0-2441'];v=unpack(rpc('query_property_values',{'propertyKeys':{o:[14] for o in rows}}))['values'];adds=[];changes=[]
def descendants(oid):
 ids={oid}
 for child in objects.get(oid,{}).get('children',[]):ids|=descendants(child)
 return ids
for i,oid in enumerate(rows):
 start=8+i*8;end=start+22;y=v[oid]['14']
 for prop,values in [(18,[(0,0),(start,0),(end,100),(420+i*3,100),(446+i*2,0),(456,0)]),(14,[(0,y+10),(start,y+10),(end,y),(420+i*3,y),(446+i*2,y+10),(456,y+10)])]:
  for f,val in values:adds.append({'objectId':oid,'propertyKey':prop,'frame':f,'value':val,'interpolationType':'cubic','cubicParams':{'x1':.22,'y1':0,'x2':.36,'y2':1}})
 descendants_ids=descendants(oid)
 for k in ks:
  if k['objectId'] in descendants_ids and k['frame'] in [59,72]:changes.append({'keyframeId':k['keyframeId'],'frame':(26 if k['frame']==59 else 48)+8*i})
r=rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-20','add':adds,'change':changes}});(p/'02-build-result.json').write_text(json.dumps(r))
print('Added',len(adds),'row build/return keys; staggered',len(changes),'content keys')
