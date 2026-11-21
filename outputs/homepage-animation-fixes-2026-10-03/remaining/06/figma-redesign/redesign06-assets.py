from common import *
import urllib.parse
assert call('session_info')['activeFileId']==2626554
ids={}
for name in ['Geist-400.ttf','Geist-600.ttf','cedar.png','flowbit.png','ollo.png']:
 p=BASE/'06/figma-redesign/assets'/name
 r=call('upload_asset',{'file':'data:application/octet-stream;name='+urllib.parse.quote(name)+';base64,'+base64.b64encode(p.read_bytes()).decode(),'name':name.rsplit('.',1)[0]+' / storyboard reference'})
 if 'asset' not in r:raise RuntimeError(str(r)[:500])
 ids[name]=r['asset']['id'];print(name,ids[name])
save('06/figma-redesign/asset-ids.json',ids)
print(call('assets_tool',{'command':'queryAsset','data':{'assetId':ids['cedar.png']}}))
