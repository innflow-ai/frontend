from pathlib import Path
from rpc import rpc,unpack
import json,base64,urllib.parse,shutil
base=Path('outputs/homepage-animation-fixes-2026-10-03');p=Path('/Users/ak/Library/CloudStorage/Dropbox/Transparent eye cutouts.svg');dest=base/'03/assets/menu-icons/innflow-transparent-eye-cutouts.svg';shutil.copy2(p,dest)
r=unpack(rpc('upload_asset',{'file':'data:image/svg+xml;name='+urllib.parse.quote(dest.name)+';base64,'+base64.b64encode(dest.read_bytes()).decode(),'name':'Menu Innflow agent transparent eye cutouts'}));aid=r['asset']['id']
j=json.load(open(base/'03/menu-icons.json'));positions={};new=[]
for old,row in zip([x for x in j['instances'] if x['icon']=='Robot'],['0-11112','0-3400','0-1113']):
 first=old['menu']=='Start';size=28 if first else 20;x=20.368 if first else 13.904;y=8.7 if first else 5.95
 r=unpack(rpc('assets_tool',{'command':'addSvgInstance','data':{'assetId':aid,'parentId':row,'name':'Innflow agent transparent eye cutouts menu icon','x':x,'y':y}}));assert r.get('success'),r
 positions[old['nodeId']]={'18':0};positions[r['nodeId']]={'13':x,'14':y,'16':size/256*100,'17':size/256*100};old.update(nodeId=r['nodeId'],icon='Innflow transparent eye cutouts');new.append(old)
assert unpack(rpc('set_property_values',{'propertyValues':positions})).get('success');j['agentIconSource']=str(p);j['agentAssetId']=aid;(base/'03/menu-icons.json').write_text(json.dumps(j,indent=2)+'\n');print(new)
