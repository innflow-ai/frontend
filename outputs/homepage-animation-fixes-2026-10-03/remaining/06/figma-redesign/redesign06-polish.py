from build_scene import *
assert call('session_info')['activeFileId']==2626554
r=json.load(open(BASE/'06/figma-redesign/rebuild.json'));root=r['ids']['06 / Approved Innflow storyboard component']
call('set_property_values',{'propertyValues':{r['ids']['Source conversation arrow']:{'18':0}}})
s=Scene('3-16','3-4423',720)
arrow=s.group('Native right arrow',r['ids']['Quiet conversation action'],605,31)
s.rect(arrow,'Arrow shaft',0,4,17,1.5,'#ff006bff',.75)
for angle,cy in [(45,1),(-45,8)]:
 i=s.rect(arrow,'Arrow head '+str(angle),11,cy,10,1.5,'#ff006bff',.75);s.positions[i]['15']=angle
# Native inset highlights approximate the approved HTML inset light without rasterizing the panel.
for j,(inset,opacity) in enumerate([(1,42),(3,28),(5,18)]):
 x=-11+inset;h0=238-2*inset;h1=646-2*inset
 rim=s.rect(root,'Glass inset highlight '+str(j),x,x,673-2*inset,h0,'#00000000',33-inset,'#%02xffffff'%opacity)
 stroke=next(o['id'] for o in call('query_objects',{'objectIds':[rim],'depth':1})['objects'] if 'Stroke' in o['types'])
 call('set_property_values',{'propertyValues':{stroke:{'47':2}}})
 path=next(o['id'] for o in call('query_objects',{'objectIds':[rim],'depth':1})['objects'] if 'Rectangle' in o['types'])
 s.track(path,21,[(0,h0),(90,h0),(138,h1),(588,h1),(642,h0),(720,h0)])
 s.track(rim,14,[(0,108),(90,108),(138,312),(588,312),(642,108),(720,108)])
 call('reorder_objects',{'operations':[{'objectId':rim,'order':'sendToBack'}]})
call('reorder_objects',{'operations':[{'objectId':'0-1270','order':'sendToBack'}]})
save('06/figma-redesign/polish.json',s.finalize())
export('06/figma-redesign','final')
from pose_capture import pose_capture
pose_capture('3-4423',360,'06/figma-redesign/ready.png')
pose_capture('3-4423',0,'06/figma-redesign/opening.png')
pose_capture('3-4423',720,'06/figma-redesign/closing.png')
print('Endpoint match:',(BASE/'06/figma-redesign/opening.png').read_bytes()==(BASE/'06/figma-redesign/closing.png').read_bytes())
