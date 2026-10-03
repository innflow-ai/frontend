from common import *
assert call('session_info')['activeFileId']==2626580
s=call('path_editor',{'command':'createParametricShapes','data':{'shapes':[{'primitive':'rectangle','name':'Close icon diagonal '+str(i),'parentId':'0-4583','x':0,'y':0,'width':19,'height':1.8,'cornerRadius':.9,'paints':[{'paintType':'fill','color':'#ff9392a3'}]} for i in range(2)]}})
props={'0-4584':{'18':0}}
for o,angle in zip(s['shapes'],[45,-45]):props[o['id']]={'13':0,'14':0,'15':angle}
call('set_property_values',{'propertyValues':props})
save('11/change.json',s);capture('11/after.png');export('11','after')
