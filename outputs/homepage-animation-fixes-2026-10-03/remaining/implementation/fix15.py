from build_scene import *
assert call('session_info')['activeFileId']==2628054
ks=json.load(open(BASE/'15/keys-before.json'))['keyframes']['3-20837']
old=['3-21176','3-21177','3-21178']
call('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'3-20837','change':[{'keyframeId':k['keyframeId'],'value':0} for k in ks if k['objectId'] in old and k['propertyKey']==18]}})
call('set_property_values',{'propertyValues':{**{i:{'18':0} for i in old},'3-14120':{'18':0},'3-20837':{'57':720}}})
s=Scene('3-14119','3-20837',720);root=s.group('15 / One evolving insight',x=70,y=290)
back=s.rect(root,'Native glass backing',-12,-12,655,170,'#40ffffff',36)
surface=s.rect(root,'Insight reading surface',0,0,631,146,'#ffffffff',24,'#ffd4e0ed')
header=s.group('Insight heading',root,0,0,0);s.icon(header,'Message Dots',24,28,30,'#006bff');s.text(header,'Issue title','Slack API thread management',72,25,520,29,'#ff0b3558');s.text(header,'Issue context','Recurring customer feedback',72,76,520,19,'#ff476788')
skel=s.group('Heading skeleton',root,24,32)
s.rect(skel,'Heading skeleton icon',0,0,30,30,'#fff7f7f9',4);s.rect(skel,'Heading skeleton title',48,2,388,12,'#fff7f7f9',3);s.rect(skel,'Heading skeleton supporting',48,45,296,8,'#fff7f7f9',2)
s.track(skel,18,[(0,100),(24,100),(42,0),(648,0),(672,100),(720,100)])
s.reveal(header,30,50,625)
body=s.group('Insight summary',root,24,143,0)
s.rect(body,'Summary divider',0,0,583,1,'#ffd4e0ed',0)
s.text(body,'Issue summary','Customers report failed thread creation\nand inconsistent replies.',0,28,580,24,'#ff0b3558');s.reveal(body,126,148,600)
rows=[]
for ix,(title,sub) in enumerate([('Failed thread creation','Review the linked reports and affected steps.'),('Inconsistent replies','Compare the conversation context and response.')]):
 g=s.group(title,root,24,260+ix*85,0);s.rect(g,'Evidence row '+str(ix),0,0,583,72,'#fff8f9fb',12);s.icon(g,'Message Dots',16,22,27,'#476788');s.text(g,title+' label',title,58,10,480,22,'#ff0b3558');s.text(g,title+' detail',sub,58,40,490,17,'#ff476788');s.reveal(g,170+ix*34,194+ix*34,600);rows.append(g)
footer=s.group('Linked evidence action',root,24,454,0)
s.text(footer,'Evidence count','3 linked conversations',0,9,300,20,'#ff476788');s.rect(footer,'Evidence action',317,0,266,46,'#ff006bff',8);s.text(footer,'Evidence action label','Review conversations',337,10,240,20,'#ffffffff');s.reveal(footer,250,274,600)
for shape,h0,h1,y0,y1 in [(surface,146,548,73,274),(back,170,572,73,274)]:
 path=next(o['id'] for o in call('query_objects',{'objectIds':[shape],'depth':1})['objects'] if 'Rectangle' in o['types'])
 s.track(path,21,[(0,h0),(84,h0),(126,h1),(600,h1),(648,h0),(720,h0)])
 s.track(shape,14,[(0,y0),(84,y0),(126,y1),(600,y1),(648,y0),(720,y0)])
s.track(root,14,[(0,290),(84,290),(126,141),(600,141),(648,290),(720,290)])
call('reorder_objects',{'operations':[{'objectId':root,'order':'sendToFront'},{'objectId':surface,'order':'sendToBack'},{'objectId':back,'order':'sendToBack'}]})
save('15/rebuild.json',s.finalize())
objs=call('query_objects',{'objectIds':[root],'depth':8})['objects']
call('reorder_objects',{'operations':[{'objectId':o['id'],'order':'sendToBack'} for o in objs if o['name'] in ['Evidence row 0','Evidence row 1','Evidence action'] and 'Shape' in o['types']]})
export('15','after')
import shutil
for fmt in ['riv','rev']:shutil.copy2(BASE/'15/after'/('innflow-15-centered-cards.'+fmt),BASE/'15/after'/('15.'+fmt))
