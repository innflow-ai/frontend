from common import *
icon=call("find_objects",{"name":"Meeting context calendar"})["objects"][0]["id"]
parts=[]
for x,w,label in [(-262,214,'Context linked'),(-34,270,'Ready for review')]:
 g=({'group':{'id':'0-822'}} if x==-262 else call('group_editor',{'name':label,'parentId':'3-19','x':x,'y':72}));gid=g['group']['id']
 if gid is None:raise RuntimeError(g)
 r=call('layout_editor',{'command':'appendLayout','data':{'layoutData':{'parentId':gid,'layouts':[{'componentType':'layout','name':label+' pill','layoutStyle':{'width':w,'height':38,'widthScaleType':'fixed','heightScaleType':'fixed','paddingLeft':14,'paddingTop':6,'backgroundColor':'#fff1f7ff','cornerRadius':8},'children':[{'componentType':'text','value':label,'textStyle':{'fontSize':19,'fillColor':'#ff3972a9'},'layoutStyle':{'widthScaleType':'fill','heightScaleType':'hug'}}]}]}}})
 parts.append(gid)
adds=[]
for oid,start,end in [(icon,291,312),(parts[0],378,399),(parts[1],405,426)]:
 call('set_property_values',{'propertyValues':{oid:{'18':0}}})
 for f,v in [(0,0),(start,0),(end,100),(546,100),(579,0),(690,0)]:adds.append({'objectId':oid,'propertyKey':18,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.42,'y1':0,'x2':.58,'y2':1}})
call('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'3-5477','add':adds}})
save('05/change.json',{'icon':icon,'pills':parts});export('05','after')
