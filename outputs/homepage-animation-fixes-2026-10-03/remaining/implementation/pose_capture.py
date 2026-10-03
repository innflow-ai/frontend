from common import *
def pose_capture(anim,frame,path):
 ks=call('animation_editor',{'command':'queryKeyFrames','data':{'animationIds':[anim]}})['keyframes'][anim];tracks={}
 for k in ks:tracks.setdefault((k['objectId'],k['propertyKey']),[]).append(k)
 keys={}
 for i,p in tracks:keys.setdefault(i,[]).append(p)
 original=call('query_property_values',{'propertyKeys':keys})['values'];values={}
 for (i,p),track in tracks.items():
  track.sort(key=lambda k:k['frame']);prior=[k for k in track if k['frame']<=frame];k=prior[-1] if prior else track[0];values.setdefault(i,{})[str(p)]=k['value']
 try:
  call('set_property_values',{'propertyValues':values});capture(path)
 finally:call('set_property_values',{'propertyValues':original})
