figma.skipInvisibleInstanceChildren=false;
const sourcePage = await figma.getNodeByIdAsync('1234:3465');
const iconSources = await Promise.all(['1608:1415','1608:1407','1608:1483'].map(id=>figma.getNodeByIdAsync(id)));
const gradientSource = await figma.getNodeByIdAsync('1345:14299');
const gradientPaints = JSON.parse(JSON.stringify(gradientSource.fills));
const fonts = [{family:'Host Grotesk',style:'Bold'},{family:'Host Grotesk',style:'Medium'},{family:'Host Grotesk',style:'Regular'},{family:'Geist',style:'SemiBold'},{family:'Geist',style:'Regular'}];
await Promise.all(fonts.map(f=>figma.loadFontAsync(f)));
const vars = {};
for(const [k,id] of Object.entries({ink:'VariableID:345:9477',blue:'VariableID:345:9478',muted:'VariableID:345:9479',paper:'VariableID:345:9482',cloud:'VariableID:345:9481',pebble:'VariableID:345:9483',line:'VariableID:345:9484',space24:'VariableID:345:9496',space32:'VariableID:345:9497',space48:'VariableID:345:9499',space96:'VariableID:345:9503',radius24:'VariableID:345:9509'}))vars[k]=await figma.variables.getVariableByIdAsync(id);
const page=figma.createPage();page.name='LAUNCH / From request to done';await figma.setCurrentPageAsync(page);
function paint(k){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',vars[k]);}
function color(hex){return {type:'SOLID',color:{r:parseInt(hex.slice(1,3),16)/255,g:parseInt(hex.slice(3,5),16)/255,b:parseInt(hex.slice(5,7),16)/255}};}
const styles={};
for(const [key,family,weight,size] of [['display','Host Grotesk','Bold',136],['heading','Host Grotesk','Bold',82],['body','Host Grotesk','Regular',36],['note','Host Grotesk','Regular',32],['label','Host Grotesk','Medium',28],['ui-title','Geist','SemiBold',42],['ui-body','Geist','Regular',32],['ui-label','Geist','Regular',26]]){const s=figma.createTextStyle();s.name='Launch / From request to done / '+key;s.fontName={family,style:weight};s.fontSize=size;s.lineHeight={unit:'PERCENT',value:120};styles[key]=s;}
function txt(parent,name,copy,style,width,fill='ink') {const n=figma.createText();parent.appendChild(n);n.name=name;n.fontName=styles[style].fontName;n.textStyleId=styles[style].id;n.characters=copy;n.fills=[paint(fill)];n.textAutoResize='HEIGHT';n.resize(width,n.height);return n;}
function frame(parent,name,w,h,fill){const n=figma.createFrame();parent.appendChild(n);n.name=name;n.resize(w,h);n.fills=fill?[paint(fill)]:[];n.clipsContent=false;return n;}
function auto(parent,name,dir,w,gap){const n=figma.createAutoLayout(dir);parent.appendChild(n);n.name=name;n.fills=[];n.resize(w,1);n.primaryAxisSizingMode=dir==='VERTICAL'?'AUTO':'FIXED';n.counterAxisSizingMode=dir==='VERTICAL'?'FIXED':'AUTO';n.itemSpacing=gap;return n;}
function rect(parent,name,x,y,w,h,fill,r=0){const n=figma.createRectangle();parent.appendChild(n);n.name=name;n.x=x;n.y=y;n.resize(w,h);n.fills=[paint(fill)];n.cornerRadius=r;return n;}

const masters=auto(page,'Launch / Reusable artwork / Native components','VERTICAL',10000,80);masters.x=6600;masters.y=120;
txt(masters,'Library label','Reusable launch artwork','heading',3800);
const logoRaw=figma.createNodeFromSvg(LOGO_SVG);masters.appendChild(logoRaw);logoRaw.name='Innflow / Supplied wordmark';
const logo=figma.createComponentFromNode(logoRaw);logo.name='Launch / Innflow wordmark';logo.description='Original Innflow vector wordmark from public/brand/innflow-wordmark.svg. Color follows the scene.';
const icons=[];
for(let i=0;i<iconSources.length;i++){const clone=iconSources[i].clone();masters.appendChild(clone);clone.opacity=1;clone.name=['Gmail','HubSpot','Slack'][i];const comp=figma.createComponentFromNode(clone);comp.description='Native artwork copied from the approved Innflow foreground library. Source '+iconSources[i].id;icons.push(comp);}
const rowMaster=figma.createComponent();masters.appendChild(rowMaster);rowMaster.name='Launch / Flat action row';rowMaster.resize(1128,82);rowMaster.fills=[];
rowMaster.layoutMode='HORIZONTAL';rowMaster.primaryAxisSizingMode='FIXED';rowMaster.counterAxisSizingMode='FIXED';rowMaster.counterAxisAlignItems='CENTER';rowMaster.itemSpacing=24;rowMaster.setBoundVariable('itemSpacing',vars.space24);
const rleft=txt(rowMaster,'Row / label','Customer','ui-label',285,'muted');const rright=txt(rowMaster,'Row / value','Cedar','ui-body',805);
const labelProp=rowMaster.addComponentProperty('Label','TEXT','Customer');const valueProp=rowMaster.addComponentProperty('Value','TEXT','Cedar');rleft.componentPropertyReferences={characters:labelProp};rright.componentPropertyReferences={characters:valueProp};
for(let i=0;i<icons.length;i++){const icon=icons[i].createInstance();rowMaster.appendChild(icon);icon.name='Row / App '+i;icon.layoutPositioning='ABSOLUTE';icon.rescale(40/icon.width);icon.x=0;icon.y=21;icon.visible=false;}
const skeletonValue=rect(rowMaster,'Skeleton / reserved content',0,0,670,14,'pebble',4);skeletonValue.layoutPositioning='ABSOLUTE';skeletonValue.x=310;skeletonValue.y=34;skeletonValue.visible=false;
const skeletonLabel=rect(rowMaster,'Skeleton / reserved label',0,0,180,12,'pebble',4);skeletonLabel.layoutPositioning='ABSOLUTE';skeletonLabel.x=0;skeletonLabel.y=35;skeletonLabel.visible=false;
rowMaster.description='Flat two-column report row. Shared across every state; no inset card treatment.';

function panel(state,rows,{height=648,skeleton=false,footer='View the workflow',status='In progress'}={}){
 const c=figma.createComponent();masters.appendChild(c);c.name='State='+state;c.resize(1240,height+24);c.fills=[];
 const rim=rect(c,'Panel / Glass rim',0,0,1240,height+24,'paper',52);rim.opacity=.35;rim.strokes=[paint('paper')];rim.strokeWeight=2;
 const body=auto(c,'Panel / Reading surface','VERTICAL',1216,0);body.x=12;body.y=12;body.primaryAxisSizingMode='FIXED';body.resize(1216,height);body.fills=[color('#FCFEFF')];body.strokes=[color('#D4E5F5')];body.strokeWeight=2;body.cornerRadius=40;body.clipsContent=true;
 body.effectStyleId='S:d01207b8ea21b4161801c7057caaabaf92688a0a,';
 const head=auto(body,'Panel / Fixed gray header','HORIZONTAL',1216,32);head.primaryAxisSizingMode='FIXED';head.counterAxisSizingMode='FIXED';head.resize(1216,108);head.counterAxisAlignItems='CENTER';head.paddingLeft=44;head.paddingRight=44;head.fills=[color('#F1F1F2')];
 txt(head,'Panel / identity','Customer onboarding','ui-title',772);txt(head,'Panel / state',status,'ui-label',300,'muted');
 const summary=auto(body,'Panel / Request identity','VERTICAL',1216,12);summary.paddingLeft=44;summary.paddingTop=30;summary.paddingBottom=26;
 txt(summary,'Request / title','Onboard Cedar by Friday.','ui-title',1128);
 txt(summary,'Request / supporting','One request. Context, actions, and approvals together.','ui-label',1128,'muted');
 const list=auto(body,'Panel / Flat rows','VERTICAL',1216,0);list.paddingLeft=44;list.paddingRight=44;
 for(let i=0;i<rows.length;i++){
   const line=rect(list,'Row / separator '+i,0,0,1128,1,'line');
   const r=rowMaster.createInstance();list.appendChild(r);r.setProperties({[labelProp]:rows[i][0],[valueProp]:rows[i][1]});
   if(state==='Connected'||state==='Done'){
     const icon=r.children.find(n=>n.name==='Row / App '+(i%3));icon.visible=true;
     const label=r.children.find(n=>n.name==='Row / label');label.characters='       '+rows[i][0];
   }
   if(skeleton){r.query('TEXT').each(t=>t.opacity=0);const bar=r.children.find(n=>n.name==='Skeleton / reserved content');bar.visible=true;bar.resize(670-i*100,14);r.children.find(n=>n.name==='Skeleton / reserved label').visible=true;}
 }
 const foot=auto(body,'Panel / Footer','HORIZONTAL',1216,0);foot.paddingLeft=44;foot.paddingTop=24;foot.paddingBottom=24;
 txt(foot,'Panel / Text action',footer,'ui-body',1128,'blue');
 c.description='Continuous request panel, '+state+'. Keep width and top-left anchor fixed. Expand the shell downward; do not stretch text. Based on the approved 06 gray-header/flat-row component family.';
 return c;
}
const states={
 Request:panel('Request',[],{height:360,status:'New request',footer:'Ready for Innflow'}),
 Understanding:panel('Understanding',[['Customer','Cedar'],['Owner','Maya Chen'],['Due','Friday']],{skeleton:true,status:'Finding context',footer:'Bringing the details together'}),
 Context:panel('Context',[['Customer','Cedar'],['Owner','Maya Chen'],['Due','Friday']],{status:'Context ready',footer:'See the connected context'}),
 Workflow:panel('Workflow',[['Prepare','Draft the welcome email'],['Update','Add the onboarding details'],['Coordinate','Notify the account team']],{status:'Plan ready',footer:'Review before sending'}),
 Connected:panel('Connected',[['Gmail','Welcome email drafted'],['HubSpot','Customer details prepared'],['Slack','Team update ready']],{status:'Tools connected',footer:'Three actions. One workflow.'}),
 Approval:panel('Approval',[['Action','Send the welcome email'],['Reviewer','Maya Chen'],['Rule','Approval required before send']],{status:'Awaiting approval',footer:'Approve and continue  →'}),
 Done:panel('Done',[['Gmail','Welcome email sent'],['HubSpot','Customer details updated'],['Slack','Account team notified']],{status:'Completed',footer:'View the activity trail  →'})
};
const set=figma.combineAsVariants(Object.values(states),masters);set.name='Launch / Continuous request panel';set.description='Seven editable states of one persistent component for the launch storyboard.';set.layoutMode='HORIZONTAL';set.itemSpacing=64;

const board=auto(page,'Innflow launch / From request to done / Storyboard','VERTICAL',6112,80);board.x=120;board.y=120;board.paddingLeft=96;board.paddingRight=96;board.paddingTop=96;board.paddingBottom=96;board.fills=[paint('cloud')];board.setBoundVariable('paddingLeft',vars.space96);board.setBoundVariable('paddingRight',vars.space96);board.setBoundVariable('paddingTop',vars.space96);board.setBoundVariable('paddingBottom',vars.space96);
const intro=auto(board,'Storyboard / Brief','VERTICAL',5920,24);
txt(intro,'Storyboard title','From request to done.','display',5800);
txt(intro,'Storyboard brief','INNFLOW LAUNCH   /   Original concept   /   1920 × 1080   /   Proposed 52-second cut','body',5800,'muted');
txt(intro,'Creative direction','One request carries the story. Clean typography, a continuous expanding component, and short transition lines. UI states are illustrative; timing and sound are proposed.','body',5600);
txt(intro,'Reading instruction','Read left to right. Copy inside each picture is on screen. Timing, action, sound, and transition notes stay below the picture.','note',5600,'muted');

const shots = [
 {name:'The hook',time:'00:00–00:03',kind:'hook',copy:'Work starts\nwith a request.',action:'Reveal “Work starts” first. “with a request.” rises into the same type block. Keep the stage uncluttered.',transition:'TEXT BRIDGE: “a request” becomes the label on the incoming request panel. 450 ms position match; no glyph stretching.',sound:'A soft opening pulse. No voiceover required.'},
 {name:'The request',time:'00:03–00:07',kind:'ui',state:'Request',copy:'“Can you take it from here?”',action:'The compact panel settles at x 340, y 310. The request reads “Onboard Cedar by Friday.” Hold for two seconds.',transition:'TEXT BRIDGE: “from here” clears. Innflow appears as the answer; retain the request identity for the return to the panel.',sound:'One quiet intake click.'},
 {name:'Meet Innflow',time:'00:07–00:10',kind:'reveal',copy:'Meet Innflow.',action:'A clean brand reveal on signal blue. The supplied vector wordmark is the focal point. Supporting line: “AI agents. Real workflows.”',transition:'TEXT BRIDGE: “Real workflows.” changes to “Start with the full picture.” Blue recedes into the next scene’s gradient.',sound:'The musical pulse opens up.'},
 {name:'Context arrives',time:'00:10–00:12',kind:'ui',state:'Understanding',copy:'Start with the full picture.',action:'Return to the same panel anchor. The shell extends downward from 360 to 648 px. Skeletons reserve the exact three-row text slots.',transition:'Keep every edge and text slot still. Fade skeletons out as customer, owner, and deadline resolve in place.',sound:'A restrained rising texture, no loading chime.'},
 {name:'Context resolved',time:'00:12–00:16',kind:'ui',state:'Context',copy:'Start with the full picture.',action:'Customer: Cedar. Owner: Maya Chen. Due: Friday. Read top to bottom; hold the fully readable state before moving on.',transition:'TEXT BRIDGE: “full picture” gives way to “next steps.” Retain the panel header, request title, width, and anchor.',sound:'Three soft ticks, one for each resolved row.'},
 {name:'Intent becomes a workflow',time:'00:16–00:22',kind:'ui',state:'Workflow',copy:'Turn intent into next steps.',action:'The same rows now show Prepare, Update, Coordinate. Reveal one action at a time; this is a reviewable plan, not a completed action.',transition:'TEXT BRIDGE: “next steps” becomes “Across the tools you use.” Row labels change into their destination apps.',sound:'A gentle rhythmic build.'},
 {name:'Across your tools',time:'00:22–00:27',kind:'ui',state:'Connected',copy:'Across the tools you use.',action:'Native Gmail, HubSpot, and Slack artwork arrives inside the existing rows. Drafted, prepared, and ready stay explicit.',transition:'TEXT BRIDGE: “your tools” changes to “Your rules.” The action footer becomes the approval control.',sound:'Three light connection accents.'},
 {name:'The human decision',time:'00:27–00:33',kind:'ui',state:'Approval',copy:'Your rules. Your final say.',action:'Pause on the approval state. Maya reviews the welcome email. A deliberate click on “Approve and continue” is required before any sent state.',transition:'A 200 ms press/release, then a 500 ms status transition. Do not show completed rows before the approval beat.',sound:'Music briefly makes room; one clear approval click.'},
 {name:'The outcome',time:'00:33–00:39',kind:'ui',state:'Done',copy:'One request. Carried through.',action:'Resolve the same rows to sent, updated, and notified. Status reads Completed. Keep the activity-trail link visible; hold for three seconds.',transition:'TEXT BRIDGE: the completed panel recedes while “Less chasing.” takes its place. No new dashboard or extra card.',sound:'A soft completion tone; the music resolves.'},
 {name:'The payoff',time:'00:39–00:44',kind:'payoff',copy:'Less chasing.\nMore moving.',action:'Large, deliberate type. “Less chasing.” lands first; “More moving.” follows on the next beat. The white underline follows the second line.',transition:'TEXT BRIDGE: “More moving.” becomes “Put work in motion.” Use one left-aligned type anchor for both shots.',sound:'Two clean musical accents.'},
 {name:'The invitation',time:'00:44–00:50',kind:'cta',copy:'Put work in motion.',action:'Innflow wordmark, one launch line, and innflow.ai. Hold the final invitation for at least four seconds. This is the single-pass ending.',transition:'For a looping version only, continue into the return beat. For a standard launch export, end here after the hold.',sound:'A confident finish with a short musical tail.'},
 {name:'The return',time:'00:50–00:52',kind:'return',copy:'Work starts',action:'For the loop: the CTA leaves through a 450 ms opacity fade. White returns and the opening text rebuilds on its original baseline.',transition:'Land on the exact opening composition at 00:52. Ease to rest; match the first frame’s background, text, positions, and opacity.',sound:'The tail clears before the opening pulse repeats.'},
 {name:'Matching-first-frame seam',time:'00:52 = 00:00',kind:'seam',copy:'Work starts\nwith a request.',action:'Exact duplicate of the opening artwork. This pose defines the seam; it adds no extra hold or duration.',transition:'The next cycle resumes from this resting frame. Static matching is planned here; actual playback must be checked when animated.',sound:'No extra beat at the seam.'},
 {name:'Reduced-motion still',time:'STATIC ALTERNATIVE',kind:'static',copy:'Put work in motion.',action:'Use the readable closing brand composition immediately. No skeletons, staggered reveals, camera movement, or forced delay.',transition:'Static fallback only. It is not the final frame of the animated loop.',sound:'Optional silence.'}
];

let row;const frames=[];let hookScene;
for(let i=0;i<shots.length;i++){
 const s=shots[i];if(i%3===0)row=auto(board,'Storyboard / Sequence row '+Math.floor(i/3),'HORIZONTAL',5920,80);
 const tile=auto(row,'Shot / '+s.name,'VERTICAL',1920,28);
 txt(tile,'Shot / Timing',String(i+1).padStart(2,'0')+'   '+s.name+'   /   '+s.time,'label',1900,'muted');
 let scene;
 if(s.kind==='seam'){scene=hookScene.clone();tile.appendChild(scene);scene.name='Scene / '+s.name;}
 else {
   scene=frame(tile,'Scene / '+s.name,1920,1080,'paper');scene.clipsContent=true;
   if(s.kind==='ui'){
     const bg=figma.createRectangle();scene.appendChild(bg);bg.name='Background / Approved Solar gradient';bg.resize(1920,1080);bg.fills=gradientPaints;
     const veil=rect(scene,'Background / White light',0,0,1920,1080,'paper');veil.opacity=.40;
     const heading=txt(scene,'On-screen / Main line',s.copy,'heading',1640);heading.x=140;heading.y=100;
     const instance=states[s.state].createInstance();scene.appendChild(instance);instance.name='Focal component / Persistent request';instance.x=340;instance.y=310;
     const marker=txt(scene,'On-screen / Product signature','innflow','label',220,'muted');marker.x=140;marker.y=980;
   } else if(s.kind==='reveal'){
     scene.fills=[paint('blue')];const title=txt(scene,'On-screen / Transition text',s.copy,'heading',1600,'paper');title.x=140;title.y=150;
     const mark=logo.createInstance();scene.appendChild(mark);mark.rescale(730/mark.width);mark.x=140;mark.y=385;mark.query('VECTOR').each(v=>v.fills=[paint('paper')]);
     const sub=txt(scene,'On-screen / Product promise','AI agents. Real workflows.','body',1600,'paper');sub.x=140;sub.y=780;
   } else if(s.kind==='cta'||s.kind==='static'){
     const mark=logo.createInstance();scene.appendChild(mark);mark.rescale(380/mark.width);mark.x=140;mark.y=125;mark.query('VECTOR').each(v=>v.fills=[paint('ink')]);
     const headline=txt(scene,'On-screen / Invitation',s.copy,'display',1650);headline.x=140;headline.y=400;
     rect(scene,'Accent / Underline',140,612,640,12,'blue',6);
     const url=txt(scene,'On-screen / URL','innflow.ai  →','heading',1450,'blue');url.x=140;url.y=750;
   } else {
     const block=txt(scene,'On-screen / Transition text',s.copy,'display',1600);block.x=140;block.y=300;
     if(s.kind==='payoff'){scene.fills=[paint('blue')];block.fills=[paint('paper')];rect(scene,'Accent / Underline',140,665,825,12,'paper',6);}
     else if(s.kind==='hook'){block.setRangeFills(12,block.characters.length,[paint('blue')]);rect(scene,'Accent / Request line',140,665,825,12,'blue',6);hookScene=scene;}
     if(s.kind==='return'){const partial=txt(scene,'On-screen / Returning phrase','with a request.','display',1650,'blue');partial.x=140;partial.y=463.2;partial.opacity=.35;}
   }
 }
 scene.exportSettings=[{format:'PNG',constraint:{type:'SCALE',value:1},contentsOnly:true}];
 const notes=auto(tile,'Shot / Production notes','VERTICAL',1920,16);
 txt(notes,'Notes / Action',s.action,'note',1850);
 txt(notes,'Notes / Transition',s.transition,'note',1850,'blue');
 txt(notes,'Notes / Sound','SOUND: '+s.sound,'label',1850,'muted');
 frames.push({index:i+1,nodeId:scene.id,name:s.name,time:s.time,copy:s.copy,action:s.action,transition:s.transition,sound:s.sound});
}
const close=auto(board,'Storyboard / Handoff notes','VERTICAL',5920,24);
txt(close,'Handoff / Title','Motion handoff','heading',5800);
txt(close,'Handoff / Rules','Keep the panel anchored at x 340 / y 310, width 1240. Grow the shell vertically; preserve type and icon scale. Use bounded ease-in-out for expansion and 200–450 ms opacity transitions for text. UI wording is an illustrative onboarding scenario, not a captured production run.','body',5700);
txt(close,'Handoff / Scope','Delivery: editable storyboard poses and proposed timings. No prototype wiring, Rive composition, audio, rendered video, or publication in this pass. The 50-second single-pass cut and 52-second loop are separate export options.','note',5700,'muted');
const descendants=board.query('*').toArray();const counts={};for(const n of descendants)counts[n.type]=(counts[n.type]||0)+1;
const renderedFonts=[...new Set(board.query('TEXT').map(n=>n.fontName.family))];
if(renderedFonts.some(f=>!['Host Grotesk','Geist'].includes(f)))throw new Error('Unexpected font: '+renderedFonts.join(','));
return {pageId:page.id,boardId:board.id,mastersId:masters.id,componentSetId:set.id,frames,bounds:{w:board.width,h:board.height},counts,renderedFonts,imageNodes:descendants.filter(n=>'fills'in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE')).map(n=>({id:n.id,name:n.name,type:n.type,w:n.width,h:n.height})),createdNodeIds:[page.id,board.id,...board.query('*').map(n=>n.id),masters.id,...masters.query('*').map(n=>n.id)],createdStyleIds:Object.values(styles).map(s=>s.id)};
