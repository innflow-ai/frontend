from rpc import rpc,unpack
from pathlib import Path
import json,re,base64,urllib.parse,collections
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
B=Path('outputs/homepage-animation-fixes-2026-10-03/03/snappy-pickers');ks=json.load(open('/tmp/homepage-animation-fixes/03-picker-header-before.json'));tr=collections.defaultdict(list)
for k in ks:tr[k['objectId'],k['propertyKey']].append(k)
for t in tr.values():t.sort(key=lambda k:k['frame'])
adds=[];delete=[];changes=[];base={}
def replace(o,p,pts,lo=0,hi=1656):
 delete.extend(k['keyframeId'] for k in tr[o,p] if lo<=k['frame']<=hi)
 adds.extend({'objectId':o,'propertyKey':p,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':{'x1':.2,'y1':0,'x2':.2,'y2':1}} for f,v in pts)
def upload(svg,name):return unpack(rpc('upload_asset',{'file':'data:image/svg+xml;name='+urllib.parse.quote(name+'.svg')+';base64,'+base64.b64encode(svg.encode()).decode(),'name':name}))['asset']['id']
def instance(svg,parent,name,x,y,sc=100):
 a=upload(svg,name);r=unpack(rpc('assets_tool',{'command':'addSvgInstance','data':{'assetId':a,'parentId':parent,'name':name,'x':x,'y':y}}));nid=r['nodeId'];base[nid]={'13':x,'14':y,'16':sc,'17':sc};return nid
# Pin the existing input labels and downward chevrons at the top of the growing native field.
replace('0-7786',18,[(0,0),(1656,0)])
replace('0-8290',18,[(688,55),(810,55),(816,0),(838,0)],688,838)
replace('0-8280',18,[(0,0),(611,0),(638,100),(1581,100),(1608,0),(1656,0)])
replace('0-5398',18,[(0,0),(1053,0),(1080,100),(1581,100),(1608,0),(1656,0)])
replace('0-5408',18,[(1101,100),(1187,100),(1193,0),(1656,0)],1101,1656)
replace('0-5398',13,[(1101,205.858),(1113,239.6),(1187,239.6),(1199,205.858),(1656,205.858)],1101,1656)
# Hide the imported Paper header because the persistent native Select agent label is now the header.
base['1-15452']={'18':0}
# Move row feedback from Outreach Owen to Research Riley, the third option.
replace('1-18999',14,[(0,62),(1150,62),(1156,62),(1166,146),(1187,146),(1214,62),(1656,62)])
# Character SVGs are extracted from the supplied Paper reference.
jsx=json.load(open('/tmp/homepage-animation-fixes/paper-agent-menu.json'))['content'][1]['text'];chars=[s for s in re.findall(r'<svg\b[\s\S]*?</svg>',jsx) if 'viewBox="0 0 256 256"' in s]
font=TTFont('/Users/ak/Library/Fonts/InterTight-Medium.ttf');glyphs=font.getGlyphSet();cmap=font.getBestCmap();units=font['head'].unitsPerEm
def textpath(text,x,y,size):
 pen=SVGPathPen(glyphs);sc=size/units
 for ch in text:
  gn=cmap.get(ord(ch),'space');glyphs[gn].draw(TransformPen(pen,(sc,0,0,-sc,x,y)));x+=font['hmtx'][gn][0]*sc
 return '<path fill="#171717" d="'+pen.getCommands()+'"/>'
s=re.sub(r' style=\{\{[\s\S]*?\}\}','',chars[2]);s=re.sub(r'<svg[^>]*>','',s,count=1).rsplit('</svg>',1)[0]
selected='<svg xmlns="http://www.w3.org/2000/svg" width="280" height="36" viewBox="0 0 280 36"><g transform="translate(0 6) scale(0.09375)">'+s+'</g>'+textpath('Research Riley',32,25,18)+'</svg>'
(B/'selected-research-riley.svg').write_text(selected)
selectedid=instance(selected,'0-4728','Agent selected / Research Riley',8,5,78)
replace('1-18595',18,[(0,0),(1656,0)])
replace(selectedid,18,[(0,0),(1199,0),(1205,100),(1533,100),(1560,18),(1581,18),(1608,0),(1656,0)])
base[selectedid]['18']=0
for o in ['0-12367','0-12393']:
 for p,b,first,last in [(13,588.751,588,590),(14,650.371,543,613)]:
  replace(o,p,[(1145,first-b),(1156,first-b),(1166,last-b),(1187,last-b)],1145,1187)
# Add Slack and the same downward chevron to the Start trigger field; its artwork group already shares its scale.
slack=Path('public/integrations/slack.svg').read_text();(B/'slack.svg').write_text(slack)
slackid=instance(slack,'0-12825','Thread created / Slack',18,15,133.3333333333)
chev='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 9L12 15L18 9" fill="none" stroke="#525252" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
chevid=instance(chev,'0-12825','Thread created / Down chevron',525,19,100)
# Shift the text by a 32-unit icon plus a 10-unit gap at the same local scale.
def scale(f):
 t=tr['0-12505',16]
 for a,b in zip(t,t[1:]):
  if a['frame']<=f<=b['frame']:
   u=(f-a['frame'])/(b['frame']-a['frame']);return a['value']+(b['value']-a['value'])*u
 return t[-1]['value']
for k in tr['0-12505',13]:changes.append({'keyframeId':k['keyframeId'],'value':k['value']+42*scale(k['frame'])/100})
rpc('set_property_values',{'propertyValues':base})
for op,items in [('delete',delete),('change',changes),('add',adds)]:
 for i in range(0,len(items),250):
  r=unpack(rpc('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':'0-6',op:items[i:i+250]}}));assert not r.get('errors'),r
rpc('reorder_objects',{'operations':[{'objectId':'0-5398','order':'sendToFront'},{'objectId':'0-5408','order':'sendToFront'},{'objectId':selectedid,'order':'sendToFront'},{'objectId':'0-12366','order':'sendToFront'}]})
(B/'headers-and-slack.json').write_text(json.dumps({'selectedAgent':'Research Riley','selectedAgentNode':selectedid,'slackNode':slackid,'slackSource':'public/integrations/slack.svg','triggerChevronNode':chevid,'headersFixedDuringOpen':True,'downChevronsRetained':True},indent=2))
print('Updated',selectedid,slackid,chevid)
