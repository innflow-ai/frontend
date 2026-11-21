from common import *
import zipfile,urllib.parse
EASE={'x1':.42,'y1':0,'x2':.58,'y2':1}
class Scene:
 def __init__(self,art,anim,end):self.art=art;self.anim=anim;self.end=end;self.positions={};self.keys=[];self.ids={}
 def group(self,name,parent=None,x=0,y=0,opacity=100):
  i=call('group_editor',{'name':name,'parentId':parent or self.art})['group']['id'];self.positions[i]={'13':x,'14':y,'18':opacity};self.ids[name]=i;return i
 def rect(self,parent,name,x,y,w,h,color='#ffffffff',radius=12,stroke=None):
  paints=[{'paintType':'fill','color':color}]
  if stroke:paints.append({'paintType':'stroke','color':stroke,'width':1})
  r=call('path_editor',{'command':'createParametricShapes','data':{'shapes':[{'primitive':'rectangle','name':name,'parentId':parent,'x':x+w/2,'y':y+h/2,'width':w,'height':h,'cornerRadius':radius,'paints':paints}]}})['shapes'][0]['id'];self.positions[r]={'13':x+w/2,'14':y+h/2};return r
 def text(self,parent,name,value,x,y,w,size=22,color='#ff213547'):
  g=self.group(name,parent,x,y)
  call('layout_editor',{'command':'appendLayout','data':{'layoutData':{'parentId':g,'layouts':[{'componentType':'layout','name':name+' text layout','layoutStyle':{'width':w,'height':size*3.5,'widthScaleType':'fixed','heightScaleType':'hug','backgroundColor':'#00000000','alignment':'top-left','positionType':'absolute','positionLeft':0,'positionTop':0},'children':[{'componentType':'text','value':value,'textStyle':{'fontSize':size,'fillColor':color},'layoutStyle':{'widthScaleType':'fill','heightScaleType':'hug'}}]}]}}})
  return g
 def icon(self,parent,name,x,y,size=24,color='#566273'):
  z=zipfile.ZipFile('/Users/ak/Downloads/mage-icons-svg.zip');svg=z.read('svg/stroke/'+name+'.svg').decode().replace('stroke="black"','stroke="'+color+'"')
  asset=call('upload_asset',{'file':'data:image/svg+xml;name='+urllib.parse.quote(name+'.svg')+';base64,'+base64.b64encode(svg.encode()).decode(),'name':'Mage stroke '+name})['asset']['id']
  i=call('assets_tool',{'command':'addSvgInstance','data':{'assetId':asset,'parentId':parent,'name':'Mage '+name}})['nodeId'];self.positions[i]={'13':x,'14':y,'16':size/24*100,'17':size/24*100};return i
 def track(self,i,prop,values):
  for f,v in values:self.keys.append({'objectId':i,'propertyKey':prop,'frame':f,'value':v,'interpolationType':'cubic','cubicParams':EASE})
 def reveal(self,i,start,end,off=10000):
  v=[(0,0),(start,0),(end,100)]
  if off<self.end:v.extend([(off,100),(off+18,0)])
  v.append((self.end,0));self.track(i,18,v);self.positions[i]['18']=0
 def finalize(self):
  call('set_property_values',{'propertyValues':self.positions})
  for p in range(0,len(self.keys),200):call('animation_editor',{'command':'modifyKeyFrames','data':{'animationId':self.anim,'add':self.keys[p:p+200]}})
  return {'ids':self.ids,'positions':self.positions,'keyCount':len(self.keys)}
