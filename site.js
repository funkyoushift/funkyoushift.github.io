(function(){
  document.querySelectorAll('.navbar-toggle').forEach(function(button){
    button.addEventListener('click',function(){
      var nav=button.closest('.navbar'); var open=nav.classList.toggle('navbar--open'); button.setAttribute('aria-expanded',String(open));
    });
  });
  document.querySelectorAll('.twitch-loader').forEach(function(btn){
    btn.addEventListener('click',function(){
      var channel=btn.dataset.channel||'funkyoushift';
      var target=document.getElementById('twitch-frame')||btn.parentElement;
      target.innerHTML='<iframe title="FunkYouSHiFT Twitch stream" src="https://player.twitch.tv/?channel='+channel+'&parent=www.funkyoushift.com&parent=funkyoushift.com&muted=true" width="100%" height="420" allowfullscreen></iframe>';
      btn.remove();
    });
  });
  document.querySelectorAll('.planner-loader').forEach(function(btn){
    btn.addEventListener('click',function(){
      var target=document.getElementById('planner-frame');
      target.innerHTML='<iframe title="Maxroll Borderlands 4 planner" src="'+btn.dataset.src+'" width="100%" height="650" loading="lazy"></iframe><p class="fine-print">If the planner does not load here, open Maxroll directly.</p>';
      btn.remove();
    });
  });
  document.querySelectorAll('.video-loader').forEach(function(btn){
    btn.addEventListener('click',function(){
      var id=btn.dataset.video; var target=document.getElementById('video-frame'); if(!target){ target=document.createElement('div'); target.id='video-frame'; target.className='embed-frame'; btn.closest('section').appendChild(target); }
      target.innerHTML='<iframe title="Borderlands creator video" width="100%" height="420" src="https://www.youtube.com/embed/'+id+'?autoplay=1" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    });
  });
  function loadExternalEmbed(btn){
    var target=document.getElementById(btn.dataset.embedTarget);
    if(!target){return;}
    var src=btn.dataset.embedSrc;
    var title=btn.dataset.embedTitle || 'Embedded community tool';
    target.classList.add('is-loaded');
    target.classList.remove('external-embed-frame--pending');
    var safeTitle=title.replace(/"/g,'&quot;');
    var iframe=document.createElement('iframe');
    iframe.title=title;
    iframe.src=src;
    iframe.referrerPolicy='no-referrer-when-downgrade';
    iframe.allow='clipboard-read; clipboard-write; fullscreen';
    iframe.setAttribute('allowfullscreen','');
    // Keep production embeds unsandboxed by default. A sandbox can block file picker,
    // Blob downloads, popups, and other editor behavior unless the embedded tool is built for it.
    // If a future tool needs sandbox testing, add data-embed-sandbox="..." to its button.
    if(btn.dataset.embedSandbox){ iframe.setAttribute('sandbox', btn.dataset.embedSandbox); }
    target.innerHTML='';
    target.appendChild(iframe);
    var fallback=document.createElement('p');
    fallback.className='embed-fallback';
    fallback.textContent='If uploads, downloads, Discord, or GitHub links do not work inside the embed, open the original site in a new tab.';
    target.appendChild(fallback);
    btn.textContent=btn.dataset.loadedText || 'Reload embedded tool';
  }

  document.querySelectorAll('.external-embed-loader').forEach(function(btn){
    btn.addEventListener('click',function(){
      loadExternalEmbed(btn);
    });
    if(btn.dataset.autoEmbed === 'true'){
      var delay=parseInt(btn.dataset.autoEmbedDelay || '1800',10);
      var startAuto=function(){ window.setTimeout(function(){ loadExternalEmbed(btn); }, isNaN(delay) ? 1800 : delay); };
      if(document.readyState === 'complete'){ startAuto(); }
      else { window.addEventListener('load', startAuto, { once:true }); }
    }
  });
})();
