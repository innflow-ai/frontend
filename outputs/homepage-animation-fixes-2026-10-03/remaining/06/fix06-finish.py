from common import *
assert call('session_info')['activeFileId']==2626554
r=json.load(open(BASE/'06/rebuild.json'));root=r['ids']['06 / One expanding recurring finding']
objs=call('query_objects',{'objectIds':[root],'depth':10})['objects']
values={o['id']:{'655':1,'656':2} for o in objs if 'LayoutParticipant' in o['types']}
call('set_property_values',{'propertyValues':values})
names=['Flowbit row surface','Ollo row surface','Codemesh row surface','Review conversations action','Header lower edge','Gray header surface']
call('reorder_objects',{'operations':[{'objectId':o['id'],'order':'sendToBack'} for name in names for o in objs if o['name']==name]})
export('06','after')
from pose_capture import pose_capture
pose_capture('3-4423',360,'06/ready.png')
pose_capture('3-4423',0,'06/opening.png')
pose_capture('3-4423',720,'06/closing.png')
print('Endpoint PNG match:',(BASE/'06/opening.png').read_bytes()==(BASE/'06/closing.png').read_bytes())
