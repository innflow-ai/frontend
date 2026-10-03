from rpc import rpc,unpack
import pathlib,json,base64,urllib.parse,xml.etree.ElementTree as ET
root=pathlib.Path('/Users/ak/innflow-web/outputs/homepage-animation-fixes-2026-10-03/03');dst=root/'assets';dst.mkdir(exist_ok=True)
src=pathlib.Path('/Users/ak/Library/CloudStorage/Dropbox/innflow_web_plan/mage_ui_stroke_icons')
items=[('Condition','Filter 2.svg','#9865D9','0-9083','0-52961',0,0,176.47083333333),('User','User.svg','#E98A45','0-8247','0-53054',0,0,176.47083333333),('Start','Play.svg','#12AEF8','0-13123','0-51875',1.223241,11.143871,143.49126)]
manifest=[]
for label,file,color,parent,old,x,y,scale in items:
 s=(src/file).read_text();inner=s[s.index('>')+1:s.rindex('</svg>')].replace('stroke="black"','stroke="#FFFFFF"')
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="{color}"/><g transform="translate(4 4) scale(0.6666667)">{inner}</g></svg>'
 path=dst/(label.lower()+'-mage-stroke.svg');path.write_text(svg)
 manifest.append({'label':label,'path':str(path),'parent':parent,'old':old,'x':x,'y':y,'scale':scale})
agent=dst/'innflow_agent_idle_blue.svg';agent.write_bytes(pathlib.Path('/Users/ak/Downloads/innflow_agent_idle_blue.svg').read_bytes())
manifest.append({'label':'Innflow agent','path':str(agent),'parent':'0-4692','old':'0-53109','x':-1.086,'y':0,'scale':42.353/217*100})
(root/'icon-plan.json').write_text(json.dumps(manifest,indent=2));print('Prepared',len(manifest),'SVGs')
