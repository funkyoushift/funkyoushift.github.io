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
  if ((window.GALLERY_ITEMS || window.FUNK_GALLERY_IMAGES) && document.getElementById('gallery-grid')) {
    var grid=document.getElementById('gallery-grid');
    (window.GALLERY_ITEMS || window.FUNK_GALLERY_IMAGES).forEach(function(item){
      var card=document.createElement('a'); card.className='gallery-card gallery-card--auto'; card.href=item.href||item.src; card.target='_blank'; card.rel='noopener';
      var img=document.createElement('img'); img.loading='lazy'; img.decoding='async'; img.src=item.src; img.alt=item.alt||'FunkYouSHiFT gallery image';
      img.onerror=function(){card.remove();};
      var title=document.createElement('strong'); title.textContent=item.title||'Stream Moment'; var label=document.createElement('span'); label.textContent=item.label||'Community / stream memory';
      card.appendChild(img); card.appendChild(title); card.appendChild(label); grid.appendChild(card);
    });
  }
})();
