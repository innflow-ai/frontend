from build_scene import *
assert call('session_info')['activeFileId']==2626554
asset=json.load(open(BASE/'06/figma-redesign/asset-ids.json'))
anim='3-4423';art='3-16';end=720
# Preserve prior geometry in the document and in the before export.
call('set_property_values',{'propertyValues':{'0-792':{'18':0},'3-17':{'18':0}}})
s=Scene(art,anim,end);root=s.group('06 / Approved Innflow storyboard component',x=60,y=105)
rim=s.rect(root,'Storyboard glass rim',-11,-11,673,238,'#26ffffff',33,'#e6ffffff')
surface=s.rect(root,'Continuous reading panel',0,0,651,216,'#fffcfeff',22,'#ffd4e5f5')
header=s.group('Persistent neutral gray header',root)
hbg=s.rect(header,'Header gray surface',1,1,649,80,'#fff1f1f2',21)
hflat=s.rect(header,'Header square lower edge',1,22,649,59,'#fff1f1f2',0)
s.rect(header,'Header separator',1,80,649,1,'#ffd6e0eb',0)
texts=[]
def txt(parent,name,value,x,y,w,size=21,color='#ff071a31',weight=400,line=None):
 g=s.text(parent,name,value,x,y,w,size,color);texts.append({'group':g,'width':w,'weight':weight,'line':line or size*1.3});return g
htext=txt(header,'Panel title','Recurring issues',30,25,530,26,weight=600,line=32)
for angle in [45,-45]:
 x=s.rect(header,'Close X '+str(angle),603,38,16,1.8,'#ff8a8a8f',.9);s.positions[x]['15']=angle
summary=s.group('Recurring finding summary',root,30,113,0)
txt(summary,'Finding title','Slack thread creation failures',0,0,591,30,weight=600,line=38)
txt(summary,'Customer count from Figma','11 customers reported this issue',0,51,591,21,'#ff476788',line=28)
s.reveal(summary,24,45,648)
skel=s.group('Summary skeleton',root)
s.rect(skel,'Title skeleton',30,125,490,12,'#fff7f7f9',3)
s.rect(skel,'Supporting skeleton',30,174,355,9,'#fff7f7f9',3)
s.track(skel,18,[(0,100),(24,100),(45,0),(648,0),(672,100),(720,100)])
body=s.group('Flat evidence table',root,0,218,0)
s.rect(body,'Evidence top separator',1,0,649,1,'#ffd6e0eb',0)
txt(body,'Customer column','Customer',30,19,180,17,'#ff8a8a8f',line=23)
txt(body,'Report column','Reported issue',210,19,411,17,'#ff8a8a8f',line=23)
s.reveal(body,138,153,567)
images=[]
for i,(who,report,logo) in enumerate([('Cedar','Slack API: thread creation failing','cedar.png'),('Flowbit','Thread creation only works in UI','flowbit.png'),('Ollo','Missing permissions in Slack API','ollo.png'),('Codemesh','Thread creation race condition',None)]):
 row=s.group(who+' evidence row',body,0,56+68*i,0)
 s.rect(row,who+' row separator',1,0,649,1,'#ffececf0',0)
 if logo:
  r=call('assets_tool',{'command':'addImageInstance','data':{'assetId':asset[logo],'parentId':row,'name':who+' original Figma logo','x':46,'y':34}})
  save('06/figma-redesign/'+who+'-instance.json',r)
  # Image result fields are checked before assigning the final transform.
  iid=r.get('imageId') or r.get('objectId') or r.get('nodeId') or (r.get('image')or{}).get('id')
  if not iid:raise RuntimeError(r)
  s.positions[iid]={'13':46,'14':34,'16':32/54*100,'17':32/54*100};images.append(iid)
 txt(row,who+' name',who,76 if logo else 30,21,130 if logo else 176,21,line=28)
 txt(row,who+' report',report,210,21,411,21,line=28)
 s.reveal(row,162+30*i,180+30*i,558)
footer=s.group('Quiet conversation action',root,0,550,0)
s.rect(footer,'Footer separator',1,0,649,1,'#ffd6e0eb',0)
txt(footer,'Source conversation link','View 4 source conversations',30,24,530,21,'#ff006bff',line=28)
txt(footer,'Source conversation arrow','→',605,21,28,25,'#ff006bff',line=28)
s.reveal(footer,294,312,558)
for shape,h0,h1,y0,y1 in [(surface,216,624,108,312),(rim,238,646,108,312)]:
 path=next(o['id'] for o in call('query_objects',{'objectIds':[shape],'depth':1})['objects'] if 'Rectangle' in o['types'])
 s.track(path,21,[(0,h0),(90,h0),(138,h1),(588,h1),(642,h0),(720,h0)])
 s.track(shape,14,[(0,y0),(90,y0),(138,y1),(588,y1),(642,y0),(720,y0)])
call('reorder_objects',{'operations':[{'objectId':root,'order':'sendToFront'},{'objectId':surface,'order':'sendToBack'},{'objectId':rim,'order':'sendToBack'},{'objectId':hflat,'order':'sendToBack'},{'objectId':hbg,'order':'sendToBack'}]})
r=s.finalize();r['textGroups']=texts;r['images']=images;save('06/figma-redesign/rebuild.json',r)
values={}
for item in texts:
 for o in call('query_objects',{'objectIds':[item['group']],'depth':5})['objects']:
  if 'LayoutComponent' in o['types']:values[o['id']]={'7':item['width'],'8':100}
  if 'LayoutComponentStyle' in o['types']:values[o['id']]={'597':2,'516':0,'518':0,'655':0,'656':2}
  if 'LayoutParticipant' in o['types']:values[o['id']]={'655':1,'656':2}
  if 'TextStylePaint' in o['types']:values[o['id']]={'279':asset[f"Geist-{item['weight']}.ttf"],'341':'Geist','342':'Regular','353':True,'370':item['line']}
call('set_property_values',{'propertyValues':values})
export('06/figma-redesign','after')
print('Completed approved native design',root)
