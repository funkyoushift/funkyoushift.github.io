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
      target.innerHTML='<iframe title="Maxroll Borderlands 4 planner" src="'+btn.dataset.src+'" width="100%" height="650" loading="lazy"></iframe><p class="fine-print">If the planner refuses to load, use the direct Maxroll button.</p>';
      btn.remove();
    });
  });
  document.querySelectorAll('.video-loader').forEach(function(btn){
    btn.addEventListener('click',function(){
      var id=btn.dataset.video; var target=document.getElementById('video-frame');
      target.innerHTML='<iframe title="Borderlands creator video" width="100%" height="420" src="https://www.youtube.com/embed/'+id+'?autoplay=1" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    });
  });
  if (window.GALLERY_ITEMS && document.getElementById('gallery-grid')) {
    var grid=document.getElementById('gallery-grid');
    window.GALLERY_ITEMS.forEach(function(item){
      var card=document.createElement('figure'); card.className='gallery-card';
      var img=document.createElement('img'); img.loading='lazy'; img.decoding='async'; img.src=item.src; img.alt=item.alt||'FunkYouSHiFT gallery image';
      img.onerror=function(){card.remove();};
      var cap=document.createElement('figcaption'); cap.textContent=item.title||'Community moment';
      card.appendChild(img); card.appendChild(cap); grid.appendChild(card);
    });
  }
})();
