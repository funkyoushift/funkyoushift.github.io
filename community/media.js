(function(root){
const hash=async text=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)))].map(x=>x.toString(16).padStart(2,'0')).join('');
let catalog,generated;
async function generatedMatch(serial){generated ||= fetch(new URL('cards/index.json',location.href),{signal:AbortSignal.timeout(30000)}).then(r=>{if(!r.ok)throw Error('Cards unavailable');return r.json();}).catch(()=>({images:{}}));const card=(await generated).images[await hash(serial)];if(!card||!/^cards\/images\/[a-f0-9]{64}\.(?:png|webp)$/.test(card.url))return null;return {...card,url:new URL(card.url,location.href).href,generated:true};}
async function match(serial){catalog ||= fetch(new URL('gzo-images.json',location.href),{signal:AbortSignal.timeout(30000)}).then(r=>{if(!r.ok)throw Error('GZO images unavailable');return r.json();}).catch(()=>({images:{}}));return (await catalog).images[await hash(serial)];}
async function prepare(file){if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>12*1024*1024)throw Error('Choose a PNG, JPEG, or WebP screenshot up to 12 MB.');const bitmap=await createImageBitmap(file);try{if(bitmap.width*bitmap.height>40000000)throw Error('Screenshot is too large.');const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));const ctx=canvas.getContext('2d');ctx.fillStyle='#111';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);let blob;for(const quality of [.9,.8,.65,.5]){blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',quality));if(blob&&blob.size<=524288)break;}if(!blob||blob.size>524288)throw Error('Screenshot is too detailed. Crop it to the item card and try again.');const bytes=new Uint8Array(await blob.arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));return {id:crypto.randomUUID(),data:btoa(binary),blob};}finally{bitmap.close();}}
async function show(container,item,images=[],base=''){
 const generation=container.dataset.imageRequest=crypto.randomUUID(),current=()=>container.dataset.imageRequest===generation&&container.isConnected;
 const digest=await hash(item.serial),uploaded=images.find(i=>i.serial_hash===digest);
 let source=uploaded?{url:base+'/images/'+uploaded.id}:await match(item.serial);
 if(!source?.url)source=await generatedMatch(item.serial);
 if(!source?.url||!current())return;
 const figure=document.createElement('figure'),img=document.createElement('img'),caption=document.createElement('figcaption');figure.className='community-card';
 img.alt=source.generated?source.name:'Screenshot for '+item.name;img.loading='lazy';img.referrerPolicy='no-referrer';img.style.cssText='display:block;width:100%;height:auto;border-radius:10px';
 img.onload=()=>{if(!current())return;root.MSBTCardPreview?.attach(figure,img,current);if(source.generated&&source.name)container.dispatchEvent(new CustomEvent('community-card-name',{detail:{serial:item.serial,name:source.name}}));};
 img.onerror=()=>{figure.replaceChildren();caption.textContent='Screenshot unavailable.';figure.append(caption);};
 figure.append(img);
 if(uploaded)caption.textContent='Uploaded screenshot';
 else if(source.generated)caption.textContent='Game card'+(source.layout==='expanded'?' · expanded layout':'');
 else{const credit=document.createElement('a');credit.href=source.source;credit.target='_blank';credit.rel='noopener noreferrer';credit.textContent='GZO screenshot · exact code match'+(source.creator?' · '+source.creator:'');caption.append(credit);}
 figure.append(caption);container.replaceChildren(figure);img.src=source.url;
}
root.CommunityImages={hash,match,prepare,show};
})(globalThis);
