'use strict';
const API='https://msbt-community-library.screename53.workers.dev';
const credited=(title,creator)=>creator&&creator!=='Creator unverified'&&!title.toLowerCase().includes(creator.toLowerCase())?creator+' — '+title:title;
const $=id=>document.getElementById(id);
let next=null,query=(new URLSearchParams(location.search).get('q')||'').slice(0,100),current=null,shown=0,listRun=0,detailRun=0;
const node=(tag,text)=>{const el=document.createElement(tag);el.textContent=text;return el;};
async function request(route){
  const response=await fetch(API+route,{credentials:'omit',redirect:'error',signal:AbortSignal.timeout(60000)});
  if(!response.ok)throw Error(response.status===404?'This folder is no longer available.':'The library could not load. Please try again.');
  const reader=response.body.getReader(),parts=[];let length=0;
  try{while(true){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>communityFolderContract.MAX_BYTES+2*1024*1024){await reader.cancel();throw Error('This folder exceeds the download limit.');}parts.push(value);}}finally{reader.releaseLock();}
  const data=JSON.parse(await new Blob(parts).text());if(!data.ok)throw Error(data.message||'Library request failed.');return data;
}
async function browse(append=false){
  const run=++listRun;$('status').textContent='Loading community folders…';$('more').disabled=true;
  if(!append){$('collections').replaceChildren();next=null;$('more').hidden=true;}
  try{const data=await request('/folders?'+new URLSearchParams({q:query,offset:append?next||0:0,limit:$('page-size').value}));if(run!==listRun)return;
    for(const folder of data.folders){const card=node('article','');card.className='collection';card.append(node('h2',credited(folder.title,folder.creator)),node('p',`By ${folder.creator} · ${folder.item_count} items`),node('p',folder.description));const button=node('button','Preview folder');button.type='button';button.addEventListener('click',()=>openFolder(folder.id));card.append(button);$('collections').append(card);}
    next=data.next;$('more').hidden=next===null;$('status').textContent=$('collections').children.length?`${$('collections').children.length} folders shown`:'No approved folders found. Try another search.';
  }catch(error){if(run===listRun)$('status').textContent=error.message;}finally{if(run===listRun)$('more').disabled=false;}
}
async function openFolder(id){
  const run=++detailRun;current=null;$('preview').hidden=true;
  if(!communityFolderContract.ID.test(id)){$('status').textContent='Invalid folder link.';return;}
  $('status').textContent='Loading folder…';
  try{const data=await request('/folders/'+id);const folder=communityFolderContract.normalize(data.folder);
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(folder)))),b=>b.toString(16).padStart(2,'0')).join('');
    if(digest!==data.digest)throw Error('Folder integrity check failed. Please try again.');if(run!==detailRun)return;
    const names=new Map();await Promise.all(folder.items.map(async item=>{const match=data.item_details?.[await CommunityImages.hash(item.serial)];if(match?.title_source==='GZO'&&match.title)names.set(item.serial,match.title);}));if(run!==detailRun)return;current={id,folder,digest,images:data.images||[],names};$('folder-title').textContent=credited(folder.title,folder.creator);$('creator').textContent=`By ${folder.creator} · ${folder.items.length} items`;$('description').textContent=folder.description;$('item-query').value='';$('copy-status').textContent='';$('preview').hidden=false;renderItems();$('preview').focus();history.replaceState(null,'','#'+id);$('status').textContent='Folder ready.';
  }catch(error){if(run===detailRun)$('status').textContent=error.message;}
}
function renderItems(append=false){if(!current)return;const needle=$('item-query').value.toLowerCase();const items=current.folder.items.filter(i=>((current.names.get(i.serial)||'')+' '+i.name+' '+i.folder).toLowerCase().includes(needle));if(!append){shown=0;$('items').replaceChildren();}for(const item of items.slice(shown,shown+50)){const row=node('div','');row.className='item';const title=current.names.get(item.serial)||item.name;row.append(node('strong',title),node('small',item.folder||'Folder root'));if(current.names.has(item.serial))row.append(node('small','GZO title · exact code match'+(title!==item.name?' · Saved label: '+item.name:'')));const code=document.createElement('textarea');code.readOnly=true;code.value=item.serial;code.setAttribute('aria-label',item.name+' item code');const copy=node('button','Copy code');copy.type='button';copy.onclick=()=>copyText(item.serial);const picture=node('div','');row.append(picture);CommunityImages.show(picture,item,current.images,API).catch(()=>{});row.append(code,copy);$('items').append(row);}shown=Math.min(items.length,shown+50);$('item-count').textContent=`${shown} of ${items.length} matching items`;$('more-items').hidden=shown>=items.length;}
async function copyText(text){try{await navigator.clipboard.writeText(text);$('copy-status').textContent='Copied.';}catch{$('copy-status').textContent='Clipboard unavailable. Select the code text to copy it, or download the folder.';}}
$('search').onsubmit=event=>{
  event.preventDefault();query=$('query').value.trim().slice(0,100);
  // A new search invalidates the old preview, including an in-flight download.
  ++detailRun;current=null;$('preview').hidden=true;
  const url=new URL(location.href);url.hash='';
  if(query)url.searchParams.set('q',query);else url.searchParams.delete('q');
  history.replaceState(null,'',url.pathname+url.search);
  browse();
};
$('more').onclick=()=>browse(true);$('more-items').onclick=()=>renderItems(true);$('item-query').oninput=()=>renderItems();
$('copy-link').onclick=()=>current&&copyText(API+'/share/'+current.id);
$('copy-codes').onclick=()=>current&&copyText(current.folder.items.map(i=>i.serial).join('\n'));
$('download').onclick=()=>{if(!current)return;const url=URL.createObjectURL(new Blob([JSON.stringify({ok:true,id:current.id,digest:current.digest,folder:current.folder},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='community-folder-'+current.id+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('query').value=query;
browse().then(()=>{if(location.hash.length>1)openFolder(location.hash.slice(1));});

$('page-size').onchange=()=>browse();
