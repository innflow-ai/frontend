from build_scene import *
assert call('session_info')['activeFileId']==2626554
anim='3-4423';art='3-16';end=720
ks=json.load(open(BASE/'06/keys-before.json'))['keyframes'][anim]
oldchanges=[{'keyframeId':k['keyframeId'],'value':0} for k in ks if k['objectId']=='3-17' and k['propertyKey']==18]
if oldchanges:call('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':anim,'change':oldchanges}})
call('set_property_values',{'propertyValues':{'3-17':{'18':0},anim:{'57':end,'59':1}}})
s=Scene(art,anim,end);root=s.group('06 / One expanding recurring finding',x=70,y=101)
back=s.rect(root,'Shared glass backing',-12,-12,655,228,'#40ffffff',36)
surface=s.rect(root,'Single growing reading surface',0,0,631,204,'#ffffffff',24)
header=s.group('Persistent gray header',root)
s.rect(header,'Gray header surface',0,0,631,204,'#fff0f3f8',24)
flat=s.rect(header,'Header lower edge',0,180,631,24,'#fff0f3f8',0)
s.positions[flat]['18']=0;s.track(flat,18,[(0,0),(90,0),(110,100),(588,100),(638,0),(720,0)])
s.icon(header,'Message Dots',28,27,32,'#006bff')
texts=[]
def text(parent,name,value,x,y,w,size=22,color='#ff0b3558'):
 g=s.text(parent,name,value,x,y,w,size,color);texts.append((g,w));return g
text(header,'Original reporter','Cedar',76,31,500,20,'#ff476788')
content=s.group('Finding header text',header,0,0,0)
text(content,'Original customer issue','Slack API: thread creation failing',28,79,575,29)
text(content,'Finding context','A customer report becomes a recurring finding.',28,138,575,20,'#ff476788')
s.reveal(content,24,45,648)
skel=s.group('Finding header skeleton',header)
s.rect(skel,'Finding title placeholder',28,90,492,14,'#fff7f7f9',3)
s.rect(skel,'Finding context placeholder',28,148,348,10,'#fff7f7f9',3)
s.track(skel,18,[(0,100),(24,100),(45,0),(648,0),(672,100),(720,100)])
body=s.group('Related report body',root,28,204,0)
s.rect(body,'Header divider',0,0,575,1,'#ffd4e0ed',0)
text(body,'Related reports label','Related reports',0,22,575,19,'#ff476788')
s.reveal(body,138,153,567)
rows=[]
for i,(who,report) in enumerate([('Flowbit','Thread creation only works in UI'),('Ollo','Missing permissions in Slack API'),('Codemesh','Thread creation race condition')]):
 row=s.group(who+' related report',body,0,65+86*i,0)
 shape=s.rect(row,who+' row surface',0,0,575,72,'#fff8f9fb',10)
 text(row,who+' name',who,16,10,543,20)
 text(row,who+' report',report,16,39,543,18,'#ff476788')
 s.reveal(row,162+39*i,183+39*i,558);rows.append(shape)
footer=s.group('Linked conversations footer',root,28,548,0)
text(footer,'Evidence count','4 linked conversations',0,13,285,19,'#ff476788')
button=s.rect(footer,'Review conversations action',309,0,266,49,'#ff006bff',8)
text(footer,'Review action label','Review conversations',327,13,234,19,'#ffffffff')
s.reveal(footer,294,312,558)
for shape,h0,h1,y0,y1 in [(surface,204,628,102,314),(back,228,652,102,314)]:
 path=next(o['id'] for o in call('query_objects',{'objectIds':[shape],'depth':1})['objects'] if 'Rectangle' in o['types'])
 s.track(path,21,[(0,h0),(90,h0),(138,h1),(588,h1),(642,h0),(720,h0)])
 s.track(shape,14,[(0,y0),(90,y0),(138,y1),(588,y1),(642,y0),(720,y0)])
call('reorder_objects',{'operations':[{'objectId':root,'order':'sendToFront'},{'objectId':surface,'order':'sendToBack'},{'objectId':back,'order':'sendToBack'}]})
result=s.finalize();result['textGroups']=texts;save('06/rebuild.json',result)
print('Created',len(s.ids),'groups and',len(s.keys),'keys')
# Enforce native text layout sizing, which otherwise inherits zero-sized participants.
values={}
for g,w in texts:
 objs=call('query_objects',{'objectIds':[g],'depth':5})['objects']
 for o in objs:
  ts=o['types']
  if 'LayoutComponent' in ts:values[o['id']]={'7':w,'8':100}
  if 'LayoutComponentStyle' in ts:values[o['id']]={'597':2,'516':0,'518':0,'655':0,'656':2}
  if 'Text' in ts:values[o['id']]={'655':1,'656':2}
call('set_property_values',{'propertyValues':values})
objs=call('query_objects',{'objectIds':[header],'depth':1})['objects']
headerbg=next(o['id'] for o in objs if o['name']=='Gray header surface')
call('reorder_objects',{'operations':[{'objectId':i,'order':'sendToBack'} for i in rows+[button,flat,headerbg]]})
export('06','after')
