from rpc import rpc,unpack
import pathlib,json
p=pathlib.Path('/tmp/homepage-animation-fixes');ks=unpack(json.loads((p/'03-current-keys.json').read_text()))['keyframes']['0-6'];props=unpack(json.loads((p/'03-menu-properties.json').read_text()))['values']
def remap(f):return round(f+sum(36*max(0,min(1,(f-a)/(b-a))) for a,b in [(101,131),(461,482),(830,851)]))
end=remap(1512)
menus=[dict(label='Start',root='0-10082',panel='0-12351',header='0-12016',start=74,full=101,close=165,hidden=192,rows=['0-11747','0-11453','0-11112','0-10609','0-10386','0-10083']),dict(label='If',root='0-2372',panel='0-4638',header='0-4305',start=434,full=461,close=482,hidden=509,rows=['0-4035','0-3737','0-3400','0-2900','0-2676','0-2373']),dict(label='Else',root='0-85',panel='0-2357',header='0-2020',start=803,full=830,close=851,hidden=878,rows=['0-1749','0-1456','0-1113','0-612','0-389','0-86'])]
# Retiming all tracks keeps cursors, connectors, and menus synchronized.
r=unpack(rpc('set_property_values',{'propertyValues':{'0-6':{'57':end}}}));assert not r.get('errors'),r
changes=[{'keyframeId':k['keyframeId'],'frame':remap(k['frame'])} for k in sorted(ks,key=lambda k:k['frame'],reverse=True)]
for i in range(0,len(changes),350):rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','change':changes[i:i+350]}})
rows=[o for m in menus for o in m['rows']];rowvals=unpack(rpc('query_property_values',{'propertyKeys':{oid:[14] for oid in rows}}))['values']
adds=[];changes=[];curve={'x1':.22,'y1':0,'x2':.36,'y2':1}
def track(oid,prop,points):
 for f,v in points:adds.append({'objectId':oid,'propertyKey':prop,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':curve})
for m in menus:
 s=remap(m['start']);close=remap(m['close']);hidden=remap(m['hidden']);grow=s+36;pid=m['panel'];px=props[pid]['13'];py=props[pid]['14']
 # Scale and offset the panel's vector group together to keep its top edge anchored.
 for prop,initial,full in [(16,32,100),(17,8,100),(13,px if m['label']=='Start' else px*.32,px),(14,py*.08,py)]:
  track(pid,prop,[(0,initial),(s,initial),(grow,full),(hidden,full),(hidden+1,initial),(end,initial)])
 for k in ks:
  if k['objectId']==m['root'] and k['propertyKey']==18 and k['frame']==m['full']:changes.append({'keyframeId':k['keyframeId'],'frame':s+8})
 for index,oid in enumerate([m['header']]+m['rows']):
  reveal=s+16 if index==0 else s+26+(index-1)*5
  settle=reveal+10
  for k in ks:
   if k['objectId']==oid and k['propertyKey']==18:
    if k['frame']==m['start']:changes.append({'keyframeId':k['keyframeId'],'frame':reveal})
    if k['frame']==m['full']:changes.append({'keyframeId':k['keyframeId'],'frame':settle})
  if index:
   y=rowvals[oid]['14'];track(oid,14,[(0,y+8),(reveal,y+8),(settle,y),(hidden,y),(hidden+1,y+8),(end,y+8)])
 m.update(newStart=s,newClose=close,newHidden=hidden,buildComplete=s+61)
for i in range(0,len(changes),300):rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','change':changes[i:i+300]}})
for i in range(0,len(adds),300):rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','add':adds[i:i+300]}})
out={'duration':end/60,'newKeyframes':len(adds),'menus':menus};pathlib.Path('outputs/homepage-animation-fixes-2026-10-03/03/menu-build.json').write_text(json.dumps(out,indent=2));print(json.dumps(out))
