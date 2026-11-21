import concurrent.futures, hashlib, html, json, re, subprocess
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode
from PIL import Image

ROOT = Path(__file__).resolve().parent
SOURCES = [
 ('neighborhoods', 'a-dense-suburban-neighborhood-with-many-houses--YE6uPZ32J4'),
 ('neighborhoods', 'an-aerial-view-of-a-suburban-neighborhood-wuWncGzZm2c'),
 ('neighborhoods', 'an-aerial-view-of-a-neighborhood-with-many-houses-fqB1WnaWo5s'),
 ('neighborhoods', 'a-birds-eye-view-of-a-city-with-lots-of-houses-SeSuXYtCtyQ'),
 ('neighborhoods', 'an-aerial-view-of-a-neighborhood-in-the-fall-8R2JZPBt45o'),
 ('neighborhoods', 'an-aerial-view-of-a-city-with-lots-of-houses-5SmY8fZFVFY'),
 ('properties', 'a-blue-two-story-house-with-black-shutters-PN3017vLx64'),
 ('properties', 'a-suburban-house-with-a-blue-door-and-trees-P1C50ZwvZCg'),
 ('properties', 'a-suburban-house-with-a-garage-and-manicured-bushes-lTRA6eHdHd4'),
 ('properties', 'white-house-facade-with-a-bright-blue-sky-dfme33ka2WA'),
 ('properties', 'a-white-house-surrounded-by-trees-and-bushes-t3Z1a4A5DZ0'),
 ('residential-streets', 'row-of-houses-on-a-foggy-morning-EmTHXFPQ1yM'),
 ('residential-streets', 'row-of-houses-on-a-street-WbBHgiKFWCw'),
 ('residential-streets', 'a-row-of-houses-AAKYQDsXVYg'),
 ('residential-streets', 'a-row-of-houses-in-a-residential-area-83w1pQgZ5bs'),
]

def curl(url, dest):
 subprocess.run(['curl','--fail','-L','--retry','2','--max-time','45','-sS',url,'-o',str(dest)],check=True)

def collect(item):
 category, slug = item
 source = 'https://unsplash.com/photos/' + slug
 evidence = ROOT / 'source-metadata' / (slug + '.html')
 evidence.parent.mkdir(exist_ok=True)
 try:
  curl(source,evidence)
  raw = evidence.read_text()
  objects = [json.loads(html.unescape(x)) for x in re.findall(r'<script type="application/ld\+json">(.*?)</script>',raw,re.S)]
  obj = next(x for x in objects if x.get('@type') == 'ImageObject')
  if obj.get('license') != 'https://unsplash.com/license' or obj.get('isAccessibleForFree') is not True:
   raise ValueError('Not confirmed free Unsplash license')
  parts = urlsplit(obj['contentUrl'])
  params = dict(parse_qsl(parts.query))
  params.update({'w':'2400','q':'90','fm':'jpg','fit':'max'})
  params.pop('crop',None)
  download = urlunsplit((parts.scheme,parts.netloc,parts.path,urlencode(params),''))
  dest = ROOT / category / (slug + '.jpg')
  dest.parent.mkdir(exist_ok=True)
  curl(download,dest)
  with Image.open(dest) as im:
   im.load()
   width,height=im.size
  result = {'title':obj.get('name',slug),'category':category,'photographer':obj.get('creditText'), 'source_url':source,'license':obj['license'],'download_url':download,'file':str(dest.relative_to(ROOT)),'width':width,'height':height,'orientation':'landscape' if width>height else 'portrait','bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'retrieved':'2026-09-06'}
  evidence.with_suffix('.json').write_text(json.dumps(obj,indent=2))
  return result
 except Exception as exc:
  return {'source_url':source,'error':str(exc)}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 results = list(pool.map(collect,SOURCES))
(ROOT/'manifest.json').write_text(json.dumps(results,indent=2))
print(json.dumps(results,indent=2))
