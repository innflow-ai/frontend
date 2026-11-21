async (page) => {
const routes = ["/about", "/advisor-partner-program", "/affordable-housing", "/blog", "/connections", "/contact", "/demo", "/faq"];
const results=[];
for(const route of routes){
 try {
 await page.setViewportSize({width:1440,height:900});
 const response=await page.goto('https://innflow.ai'+route,{waitUntil:'domcontentloaded',timeout:25000});
 await page.locator('h1').first().waitFor({timeout:8000}).catch(()=>{});
 await page.evaluate(()=>document.fonts.ready);
 const name=route==='/'?'home':route.slice(1).replaceAll('/','--');
 for(const [device,width,height] of [['desktop',1440,900],['mobile',390,844]]){
 await page.setViewportSize({width,height});
 const metrics=await page.evaluate(()=>({title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.innerText),headings:[...document.querySelectorAll('main h2, main h3')].slice(0,30).map(e=>e.innerText),width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,brokenImages:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.currentSrc),overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0 && (r.right>innerWidth+2||r.left< -2)}).slice(0,8).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,80)})),forms:[...document.forms].map(f=>({name:f.getAttribute('aria-label'),fields:[...f.querySelectorAll('input,select,textarea')].map(e=>({name:e.name,type:e.type,label:e.getAttribute('aria-label'),id:e.id}))})),links:[...document.querySelectorAll('main a')].slice(0,12).map(a=>({text:a.innerText,href:a.getAttribute('href')}))}));
 results.push({route,device,status:response?.status(),...metrics});
 }
 }catch(e){results.push({route,error:String(e)})}
}
return results;
}