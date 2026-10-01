/* Public read-only API client. Browser: CommunityLibrary. Node: require(this file). */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.CommunityLibrary=factory();})(globalThis,()=>{
  'use strict';
  const ORIGIN='https://msbt-community-library.screename53.workers.dev';
  const ID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  class LibraryError extends Error{constructor(message,status){super(message);this.name='LibraryError';this.status=status;}}
  class CommunityLibrary{
    static Error=LibraryError;
    constructor({fetcher=(...args)=>globalThis.fetch(...args)}={}){this.fetcher=fetcher;}
    folderId(value){
      if(typeof value!=='string')throw new TypeError('A folder ID or share link is required.');
      value=value.trim();if(ID.test(value))return value;
      const url=new URL(value);
      if(url.origin===ORIGIN&&!url.search&&!url.hash){const match=url.pathname.match(/^\/(?:share|folders|api\/v1\/folders)\/([^/]+)$/);if(match&&ID.test(match[1]))return match[1];}
      if(url.origin==='https://www.funkyoushift.com'&&url.pathname==='/community/'&&!url.search&&ID.test(url.hash.slice(1)))return url.hash.slice(1);
      throw new TypeError('Use a community library folder ID or share link.');
    }
    async request(route){
      const response=await this.fetcher(ORIGIN+'/api/v1'+route,{credentials:'omit',redirect:'error',signal:AbortSignal.timeout(60000)});
      const reader=response.body?.getReader();if(!reader)throw new LibraryError('Empty library response.',response.status);
      const parts=[];let length=0;
      try{while(true){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>16*1024*1024+2097152){await reader.cancel();throw new LibraryError('Library response is too large.',response.status);}parts.push(value);}}finally{reader.releaseLock();}
      let data;try{data=JSON.parse(await new Blob(parts).text());}catch{throw new LibraryError('Library returned invalid JSON.',response.status);}
      if(!response.ok||data.ok!==true)throw new LibraryError(data.message||'Library request failed.',response.status);
      return data;
    }
    async list({query='',offset=0}={}){
      if(typeof query!=='string'||!Number.isInteger(offset)||offset<0||offset>100000)throw new TypeError('Use a text query and an offset from 0 to 100000.');
      return this.request('/folders?'+new URLSearchParams({q:query.slice(0,100),offset:String(offset)}));
    }
    async get(idOrLink){
      const id=this.folderId(idOrLink),data=await this.request('/folders/'+id),folder=data.folder;
      if(data.id!==id||!folder||folder.version!==1||!Array.isArray(folder.items)||!folder.items.length||!Array.isArray(folder.folders)||folder.folders.some(p=>typeof p!=='string')||['title','creator','description'].some(k=>typeof folder[k]!=='string')||folder.items.some(i=>!i||['name','folder','serial'].some(k=>typeof i[k]!=='string')||!/^@U[0-9A-Za-z!#$%&()*+\-;<=>?@^_`{/}~]+$/.test(i.serial)))throw new LibraryError('Invalid folder data.',200);
      const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(folder)))),b=>b.toString(16).padStart(2,'0')).join('');
      if(digest!==data.digest)throw new LibraryError('Folder integrity check failed.',200);
      return data;
    }
    shareLink(idOrLink){return ORIGIN+'/share/'+this.folderId(idOrLink);}
  }
  return CommunityLibrary;
});
