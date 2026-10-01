const {test}=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const CommunityLibrary=require('./community-library.js');
const id='a1111111-1111-4111-8111-111111111111';
const folder={version:1,title:'Vex ♥',creator:'Test',description:'',folders:['Empty','Shields'],items:[{name:'One',folder:'',serial:'@UAbCdEfG'},{name:'Two',folder:'Shields',serial:'@UAbCdEfG'}]};
const data=()=>({ok:true,id,folder,digest:crypto.createHash('sha256').update(JSON.stringify(folder)).digest('hex')});
test('list uses versioned API without credentials; get preserves contents and validates integrity',async()=>{
 const calls=[];const client=new CommunityLibrary({fetcher:async(url,options)=>{calls.push({url,options});return Response.json(url.includes('?')?{ok:true,folders:[{id}],next:null}:data());}});
 assert.equal((await client.list({query:'Vex'})).folders[0].id,id);
 assert(calls[0].url.includes('/api/v1/folders?q=Vex&offset=0'));assert.equal(calls[0].options.credentials,'omit');assert.equal(calls[0].options.redirect,'error');
 assert.deepEqual((await client.get(client.shareLink(id))).folder,folder);
 assert.equal(client.folderId('https://msbt-community-library.screename53.workers.dev/api/v1/folders/'+id),id);
 assert.throws(()=>client.folderId('https://evil.example/share/'+id));
 await assert.rejects(client.list({offset:-1}));
});
test('tampering, malformed items and server errors fail explicitly',async()=>{
 const bad=new CommunityLibrary({fetcher:async()=>Response.json({...data(),digest:'bad'})});await assert.rejects(bad.get(id),/integrity/);
 const error=new CommunityLibrary({fetcher:async()=>Response.json({ok:false,message:'Wait a minute'},{status:429})});await assert.rejects(error.list(),e=>e.status===429);
 const broken=new CommunityLibrary({fetcher:async()=>new Response('<html>oops</html>')});await assert.rejects(broken.list(),/invalid JSON/);
});
