from pathlib import Path
import json,hashlib,shutil
r=Path('/Users/ak/innflow-web'); b=r/'outputs/homepage-animation-fixes-2026-10-03/remaining/06'; d=Path('/Users/ak/Library/CloudStorage/Dropbox/finished_rive_homepage/2026-10-03-remaining-revisions'); collection=r/'outputs/riv-animations/Rive animations/Numbered current exports'
for ext in ['riv','rev']:
 src=b/'final'/f'06.{ext}'
 for out in [collection,d]:shutil.copy2(src,out/src.name)
shutil.copy2(b/'final/06.riv',r/'public/brand/homepage/06.riv')
shutil.copy2(b/'ready.png',d/'06-preview.png')
shutil.copy2(b/'motion-preview.html',d/'06-motion-preview.html')
data=(b/'final/06.riv').read_bytes();meta={'duration':12.0,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
for p in [r/'src/app/preview/scroll-showcase/homepage-storyboards.json',collection/'manifest.json']:
 a=json.loads(p.read_text());next(x for x in a if x['number']==6).update(meta);p.write_text(json.dumps(a,indent=2)+'\n')
(b/'export-metadata.json').write_text(json.dumps(meta,indent=2)+'\n')
for name in ['fix06.py','fix06-finish.py','install06.py']:
 shutil.copy2(Path('/tmp/homepage-remaining-rive')/name,b/name)
p=r/'docs/HOMEPAGE_ANIMATION_FIXES.md';s=p.read_text()
s=s.replace("06 and 17 are checked off at the user's request; the user is handling 06.","06 was subsequently reassigned to the assistant and rebuilt with a fixed gray header and one downward-expanding body. 17 remains checked off at the user's request.")
start=s.index('### 06. Learn what keeps coming up');end=s.index('\n## Assistant',start)
s=s[:start]+'''### 06. Learn what keeps coming up

**Direction: One focused component, with a gray header and a body that extends downward.**

The user reassigned 06 to the assistant after it would not load. The source opened successfully and its original export played in WebGL2; the exact earlier failure was not reproduced. An empty first artboard was present and could show a blank scene in a default-artboard viewer. It is removed from the revised export, with the original preserved in the before backup.

- [x] Create and browser-check a standalone HTML motion preview before Rive composition.
- [x] Rebuild as one component with a persistent gray header, fixed position and width, and a white body that extends downward without scaling text.
- [x] Retain the original Cedar issue and related reports from Flowbit, Ollo, and Codemesh; reveal them with consistent spacing, smaller corner radii, and a linked-conversation review action.
- [x] Preserve the existing gradient and runtime names. The actual loop is now 12 seconds; the legacy animation name still contains “8s.”
- [x] Save editable/runtime exports and install the revised runtime and readable fallback image locally.

HTML preview, before/final exports, and rendered endpoint captures are in `outputs/homepage-animation-fixes-2026-10-03/remaining/06/`. The opening/closing editor poses match byte-for-byte. See the verification file for final runtime playback and test evidence.
''' +s[end:]
p.write_text(s)
p=r/'docs/HOMEPAGE_RIVE_ANIMATIONS.md';s=p.read_text().replace('exports 05, 06, and 08 also contain','exports 05 and 08 also contain')
s+='''\n## 06 single-component revision\n\n06 was subsequently reassigned to the assistant. A simple HTML motion preview was created and checked before rebuilding the scene in Rive. One fixed gray header retains the Cedar issue; the white body grows only in height to reveal three related reports and four linked conversations. Position, width, and text proportions remain constant. The loop is now 12 seconds, while the existing timeline name containing “8s” is retained.\n\nThe source and original runtime loaded during diagnosis, so the earlier failure was not reproduced. An empty starter artboard was removed from the revised export to prevent default-artboard viewers from showing a blank scene. The original document is backed up. The updated runtime and poster are installed locally; editable/runtime copies and preview are in the Dropbox remaining-revisions folder. Artifacts are under `outputs/homepage-animation-fixes-2026-10-03/remaining/06/`.\n'''
p.write_text(s)
print(meta)
