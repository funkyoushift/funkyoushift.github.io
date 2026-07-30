(function(){
  // Optional: set to your GA4 ID (G-XXXXXXXX) to send CTA events sitewide.
  var FUNK_GA_ID = '';
  var CTA_KEY = 'funk_cta_counts_v1';

  function loadCounts(){
    try { return JSON.parse(localStorage.getItem(CTA_KEY) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function saveCounts(counts){
    try { localStorage.setItem(CTA_KEY, JSON.stringify(counts)); } catch (e) {}
  }
  function inferCta(el){
    if (el.getAttribute && el.getAttribute('data-cta')) return el.getAttribute('data-cta');
    var href = (el.getAttribute && el.getAttribute('href')) || '';
    var lower = href.toLowerCase();
    if (lower.indexOf('discord') !== -1) return 'discord';
    if (lower.indexOf('twitch.tv') !== -1 || (el.classList && el.classList.contains('twitch-loader'))) return 'twitch';
    if (lower.indexOf('youtube.com') !== -1 || lower.indexOf('youtu.be') !== -1) return 'youtube';
    if (lower.indexOf('mattssdkboostingtools') !== -1 || lower.indexOf('releases/latest') !== -1) return 'msbt';
    if (lower.indexOf('streamlabs.com') !== -1 && lower.indexOf('merch') !== -1) return 'merch';
    if (lower.indexOf('borderlands-resources') !== -1) return 'tools';
    if (lower.indexOf('video.html') !== -1) return 'watch_page';
    return '';
  }
  function trackCta(name, meta){
    if (!name) return;
    var counts = loadCounts();
    counts[name] = (counts[name] || 0) + 1;
    saveCounts(counts);
    var payload = Object.assign({ event_category: 'cta', event_label: name }, meta || {});
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'cta_click', payload);
    }
    if (window.plausible) {
      window.plausible('CTA', { props: { name: name } });
    }
    window.dispatchEvent(new CustomEvent('funk-cta', { detail: { name: name, counts: counts } }));
  }
  window.FunkCTA = {
    track: trackCta,
    report: function(){ return loadCounts(); },
    reset: function(){ saveCounts({}); }
  };

  if (FUNK_GA_ID) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(FUNK_GA_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', FUNK_GA_ID, { anonymize_ip: true });
  }

  document.querySelectorAll('.navbar-toggle').forEach(function(button){
    button.addEventListener('click',function(){
      var nav=button.closest('.navbar'); var open=nav.classList.toggle('navbar--open'); button.setAttribute('aria-expanded',String(open));
    });
  });
  document.querySelectorAll('.twitch-loader').forEach(function(btn){
    btn.addEventListener('click',function(){
      trackCta('twitch', { method: 'embed_load' });
      var channel=btn.dataset.channel||'funkyoushift';
      var target=document.getElementById('twitch-frame')||btn.parentElement;
      target.innerHTML='<iframe title="FunkYouSHiFT Twitch stream" src="https://player.twitch.tv/?channel='+channel+'&parent=www.funkyoushift.com&parent=funkyoushift.com&muted=true" width="100%" height="420" allowfullscreen></iframe>';
      btn.remove();
    });
  });
  document.querySelectorAll('.planner-loader').forEach(function(btn){
    btn.addEventListener('click',function(){
      trackCta('builds_planner');
      var target=document.getElementById('planner-frame');
      target.innerHTML='<iframe title="Maxroll Borderlands 4 planner" src="'+btn.dataset.src+'" width="100%" height="650" loading="lazy"></iframe><p class="fine-print">If the planner does not load here, open Maxroll directly.</p>';
      btn.remove();
    });
  });
  document.querySelectorAll('.video-loader').forEach(function(btn){
    btn.addEventListener('click',function(){
      trackCta('build_video');
      var id=btn.dataset.video; var target=document.getElementById('video-frame'); if(!target){ target=document.createElement('div'); target.id='video-frame'; target.className='embed-frame'; btn.closest('section').appendChild(target); }
      target.innerHTML='<iframe title="Borderlands creator video" width="100%" height="420" src="https://www.youtube.com/embed/'+id+'?autoplay=1" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    });
  });
  function loadExternalEmbed(btn){
    var target=document.getElementById(btn.dataset.embedTarget);
    if(!target){return;}
    trackCta('tool_embed', { tool: btn.dataset.embedTitle || btn.dataset.embedTarget || 'embed' });
    var src=btn.dataset.embedSrc;
    var title=btn.dataset.embedTitle || 'Embedded community tool';
    target.classList.add('is-loaded');
    target.classList.remove('external-embed-frame--pending');
    var iframe=document.createElement('iframe');
    iframe.title=title;
    iframe.src=src;
    iframe.referrerPolicy='no-referrer-when-downgrade';
    iframe.allow='clipboard-read; clipboard-write; fullscreen';
    iframe.setAttribute('allowfullscreen','');
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

  document.addEventListener('click', function(ev){
    var el = ev.target && ev.target.closest ? ev.target.closest('a[href], button[data-cta], .twitch-loader') : null;
    if (!el) return;
    if (el.classList && el.classList.contains('twitch-loader')) return; // handled above
    var name = inferCta(el);
    if (name) trackCta(name);
  }, true);
})();
