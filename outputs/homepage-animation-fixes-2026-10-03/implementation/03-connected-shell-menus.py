from rpc import rpc,unpack
from pathlib import Path
import json,collections
P=Path('/tmp/homepage-animation-fixes'); ks=unpack(json.loads((P/'03-menu-built-keys.json').read_text()))['keyframes']['0-6']
tracks=collections.defaultdict(list)
for k in ks: tracks[k['objectId'],k['propertyKey']].append(k)
for t in tracks.values():t.sort(key=lambda k:k['frame'])
curve={'x1':.42,'y1':0,'x2':.58,'y2':1}
def ease(t):
 lo=0.;hi=1.
 for _ in range(24):
  u=(lo+hi)/2;x=3*(1-u)**2*u*.42+3*(1-u)*u*u*.58+u**3
  if x<t:lo=u
  else:hi=u
 u=(lo+hi)/2;return 3*(1-u)*u*u+u**3
def val(o,p,f,default=0):
 t=tracks.get((o,p),[])
 if not t:return default
 if f<=t[0]['frame']:return t[0]['value']
 for a,b in zip(t,t[1:]):
  if f<=b['frame']:
   q=(f-a['frame'])/(b['frame']-a['frame']);q=ease(q) if b.get('interpolationType')=='cubic' else q
   return a['value']+(b['value']-a['value'])*q
 return t[-1]['value']
changes={};deletes=set();adds={}
def point(o,p,f,v,linear=False):
 old=next((k for k in tracks.get((o,p),[]) if k['frame']==f),None)
 if old:
  changes[old['keyframeId']]={'keyframeId':old['keyframeId'],'value':v}
 else:adds[o,p,f]={'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'linear' if linear else 'cubic',**({} if linear else {'cubicParams':curve})}
def replace_window(o,p,start,end,points):
 kept={f for f,v in points}
 for k in tracks.get((o,p),[]):
  if start<=k['frame']<=end and k['frame'] not in kept:deletes.add(k['keyframeId'])
 for f,v in points:point(o,p,f,v)
menus=[dict(label='Start',menu='0-10082',oldbg='0-12350',node='0-9082',glass='0-10065',panel='0-10056',glassart='0-10066',stub='0-51443',route='0-10074',port='0-9075',s=74,c=201,h=228,scale=320/435,w=320,hmenu=443.542*320/435,bw=319.757758,bh=268.233056,gw=376.229803,gh=324.703086,pad=28.235,content=['0-9083','0-9121','0-9229','0-9794'],oldxy=(161,316)),dict(label='If',menu='0-2372',oldbg='0-4637',node='0-6200',glass='0-9038',panel='0-9030',glassart='0-9039',stub='0-51444',route='0-4682',port='0-4666',s=470,c=554,h=581,scale=262/296.95778,w=262,hmenu=303.042056*262/296.95778,bw=483.525519,bh=201.175042,gw=539.998739,gh=257.64504,pad=15.28,content=['0-8247','0-8279','0-8739'],oldxy=(448.04,328.039)),dict(label='Else',menu='0-85',oldbg='0-2356',node='0-4691',glass='0-6191',panel='0-6183',glassart='0-6192',stub='0-51445',route='0-4673',port='0-4659',s=875,c=959,h=986,scale=262/296.95778,w=262,hmenu=303.042034*262/296.95778,bw=483.525519,bh=201.175075,gw=539.998739,gh=257.645042,pad=15.28,content=['0-4692','0-4728','0-5843'],oldxy=(448.04,397.49))]
# Context options are now children of the real connected nodes. Their own panel is hidden.
print(unpack(rpc('reparent_objects',{'operations':[{'objectId':m['menu'],'newParentId':m['node'],'position':'start'} for m in menus]})))
print(unpack(rpc('set_property_values',{'propertyValues':{**{m['menu']:{'13':0,'14':0,'16':m['scale']*100,'17':m['scale']*100} for m in menus},**{m['oldbg']:{'18':0} for m in menus}}})))
for m in menus:
 s,c,h=m['s'],m['c'],m['h']
 # Reveal the existing shell and connection first, retaining later workflow and loop keys.
 for oid in [m['node'],m['glass'],m['route'],m['port']]:
  replace_window(oid,18,0,h,[(0,0),(s,0),(s+10,100),(h,100)])
 # The plus stub hands off to the real connected input port as the shell arrives.
 replace_window(m['stub'],18,0,h,[(0,100),(s,100),(s+10,0),(h,0)])
 # Keep all future node content hidden while this node contains menu options.
 for oid in m['content']:
  for k in tracks[oid,18]:
   if k['frame']<=h:point(oid,18,k['frame'],0)
 # Fade choices out before the same shell contracts into its existing smallest node state.
 replace_window(m['menu'],18,c,h,[(c,100),(c+10,0),(h,0)])
 for oid,bw,bh,extra in [(m['panel'],m['bw'],m['bh'],0),(m['glassart'],m['gw'],m['gh'],m['pad']*2)]:
  initialw=108 if m['label']=='Start' else 91.29; initialh=82 if m['label']=='Start' else 69.19
  for prop,base,small,full in [(16,bw,initialw+extra,m['w']+extra),(17,bh,initialh+extra,m['hmenu']+extra)]:
   endval=val(oid,prop,h,100)
   replace_window(oid,prop,s,h,[(s,small/base*100),(s+12,small/base*100),(s+40,full/base*100),(c,full/base*100),(h,endval)])
  if m['label']=='Start':
   base=bw; small=(base-(initialw+extra))/2;full=(base-(m['w']+extra))/2
   for f,v in [(0,0),(s,small),(s+12,small),(s+40,full),(c,full),(h,0),(1620,0)]:point(oid,13,f,v)
 # Retarget cursor positions from the old floating menu to the new in-node options.
 for oid in ['0-12367','0-12393']:
  for prop,axis in [(13,0),(14,1)]:
   root=(588.751,650.371)[axis]
   for k in tracks[oid,prop]:
    if s+27<=k['frame']<=c:
     world=root+k['value']; target=val(m['node'],prop,k['frame'])+(world-m['oldxy'][axis])*m['scale'];point(oid,prop,k['frame'],target-root)
     if k['frame']==s+27:changes[k['keyframeId']]['frame']=s+55
# Keep the original start connector attached to its moving source during the context state.
for oid,prop,default in [('0-10079',24,-.0005),('0-10079',25,-49.11)]:
 point(oid,prop,0,default);point(oid,prop,73,default)
 for f in range(74,229):
  if prop==24:v=val('0-12430',13,f)+val('0-12496',13,f)+7-385.5004119873
  else:v=val('0-12430',14,f)+val('0-12496',14,f)+7-316.3000030518
  point(oid,prop,f,v,True)
 point(oid,prop,229,default);point(oid,prop,1620,default)
# Reorder real input ports over the node and its glass surface.
print(unpack(rpc('reorder_objects',{'operations':[{'objectId':m['port'],'order':'sendToFront'} for m in menus]})))
if deletes:print(unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6','delete':list(deletes)}})))
change=[v for k,v in changes.items() if k not in deletes]
for key,items in [('change',change),('add',list(adds.values()))]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',key:items[i:i+250]}}));assert not r.get('errors'),r
out={'duration':27,'architecture':'Existing connected node shell contains context options, then resolves into final node','menus':menus,'changed':len(change),'added':len(adds),'deleted':len(deletes)}
Path('outputs/homepage-animation-fixes-2026-10-03/03/connected-shell-menus.json').write_text(json.dumps(out,indent=2)+'\n');print({k:v for k,v in out.items() if k!='menus'})
