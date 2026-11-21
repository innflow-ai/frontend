from build_scene import *
assert call('session_info')['activeFileId']==2626589
j=json.load(open(BASE/'13/rebuild.json'));root=j['ids']['13 / Delegation and human review']
objects=call('query_objects',{'objectIds':[root],'depth':8})['objects'];props={}
for o in objects:
 if 'LayoutComponentStyle' in o['types']:props[o['id']]={'597':2,'516':0,'518':0}
 if o['name'] in ['Request surface','Review surface','Draft surface','Approved surface']:props[o['id']]={'18':0}
call('set_property_values',{'propertyValues':props})
s=Scene('0-2','0-4846',840);surface=s.rect(root,'13 / Single expanding component',70,120,631,126,'#ffffffff',18,'#ffe5e5e5')
r=call('query_objects',{'objectIds':[surface],'depth':1});path=next(o['id'] for o in r['objects'] if 'Rectangle' in o['types'])
s.track(path,21,[(0,126),(65,126),(92,574),(753,574),(792,126),(840,126)])
s.track(surface,14,[(0,183),(65,183),(92,407),(753,407),(792,183),(840,183)])
call('reorder_objects',{'operations':[{'objectId':surface,'order':'sendToBack'}]})
save('13/single-component.json',s.finalize());export('13','single-component')
import shutil
for fmt in ['riv','rev']:shutil.copy2(BASE/'13/single-component'/('13.'+fmt),BASE/'13/after'/('13.'+fmt))
