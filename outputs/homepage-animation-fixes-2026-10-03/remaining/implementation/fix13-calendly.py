from build_scene import *
from pose_capture import pose_capture
j=json.load(open(BASE/'13/rebuild.json'));root=j['ids']['13 / Delegation and human review'];objs=json.load(open(BASE/'13/full-hierarchy.json'))['objects'];ids=[o['id'] for o in objs if 'SolidColor' in o['types']];v=call('query_property_values',{'propertyKeys':{i:[37] for i in ids}})['values']
colors={'#ff213547':'#ff0b3558','#ff67788a':'#ff476788','#ff63788f':'#ff476788','#ff00aeff':'#ff006bff','#ffe5e5e5':'#ffd4e0ed','#fff6f8fa':'#fff8f9fb','#ffeaf6ff':'#ffe6f0ff'}
props={i:{'37':colors[x['37'].lower()]} for i,x in v.items() if x['37'].lower() in colors};call('set_property_values',{'propertyValues':props})
s=Scene('0-2','0-4846',840)
back=s.rect(root,'13 / Glass backing',58,108,655,150,'#40ffffff',30)
path=next(o['id'] for o in call('query_objects',{'objectIds':[back],'depth':1})['objects'] if 'Rectangle' in o['types'])
s.track(path,21,[(0,150),(65,150),(92,598),(753,598),(792,150),(840,150)]);s.track(back,14,[(0,183),(65,183),(92,407),(753,407),(792,183),(840,183)])
for ix,(title,sub) in enumerate([('Draft follow-ups','Personalized replies from each conversation'),('Summarize context','Key decisions and the next step'),('Prepare CRM updates','Contact details and activity, ready to review')]):
 row=j['ids']['Task '+title];sk=s.group(title+' text skeleton',row,58,17)
 s.rect(sk,'Title placeholder',0,0,268,8,'#fff7f7f9',2);s.rect(sk,'Detail placeholder',0,29,378,6,'#fff7f7f9',2)
 start=154+ix*30
 s.track(sk,18,[(0,100),(start,100),(start+12,0),(840,100)])
 for name in [title,sub]:
  i=j['ids'][name];s.track(i,18,[(0,0),(start,0),(start+12,100),(400,100),(420,0),(840,0)]);s.positions[i]={'18':0}
 call('reorder_objects',{'operations':[{'objectId':sk,'order':'sendToFront'}]})
call('reorder_objects',{'operations':[{'objectId':back,'order':'sendToBack'}]})
save('13/calendly.json',s.finalize());export('13','calendly')
import shutil
for fmt in ['riv','rev']:shutil.copy2(BASE/'13/calendly'/('13.'+fmt),BASE/'13/after'/('13.'+fmt))
pose_capture('0-4846',330,'13/ready.png')
