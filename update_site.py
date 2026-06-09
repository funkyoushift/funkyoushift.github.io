from pathlib import Path
import re, json
root=Path('/mnt/data/funky_v9_work')
files=list(root.glob('*.html'))
for p in files:
    s=p.read_text()
    s=s.replace('style.css?v=4.0.7','style.css?v=4.0.9')
    s=s.replace('site.js?v=4.0.7','site.js?v=4.0.9')
    s=s.replace('data-version="4.0.7"','data-version="4.0.9"')
    s=s.replace('https://www.funkyoushift.com/images/team-funkyoushift-people-2026.jpg','https://www.funkyoushift.com/images/team-funkyoushift-new.jpg')
    s=s.replace('images/team-funkyoushift-people-2026-768.webp','images/team-funkyoushift-new-768.webp')
    s=s.replace('images/team-funkyoushift-people-2026-480.webp','images/team-funkyoushift-new-480.webp')
    s=s.replace('images/team-funkyoushift-bots-2026-768.webp','images/funkyoushift-logo-portrait-768.webp')
    s=s.replace('images/team-funkyoushift-bots-2026-480.webp','images/funkyoushift-logo-portrait-480.webp')
    s=s.replace('images/team-funkyoushift-bots-2026.jpg','images/funkyoushift-logo-portrait.jpg')
    s=s.replace('team-funkyoushift-people-2026.jpg','team-funkyoushift-new.jpg')
    p.write_text(s)

def replace_between(text,start,end,new):
    a=text.index(start); b=text.index(end,a)
    return text[:a]+new+text[b:]

# Homepage visual overhaul
p=root/'index.html'
s=p.read_text()
new_header='''<header class="hero hero--home"><div class="hero-inner"><div class="hero-copy"><p class="kicker">Borderlands • Discord • modded gear</p><h1>FUNKYOUSHIFT</h1><p class="lead">Pick a button. Get to the game.</p><div class="hero-actions"><a class="button primary" href="https://discord.com/servers/funk-s-borderlands-trading-hub-997021744764289084" rel="noopener" target="_blank">Join Discord</a><a class="button secondary" href="borderlands-resources.html">Open Tools</a></div></div><div class="hero-art hero-art--glow"><picture><source media="(max-width: 760px)" srcset="images/team-funkyoushift-new-480.webp" type="image/webp"/><img alt="Team FunkYouSHiFT artwork" decoding="async" fetchpriority="high" height="768" loading="eager" src="images/team-funkyoushift-new-768.webp" width="768"/></picture></div></div></header>'''
s=re.sub(r'<header class="hero">.*?</header>', new_header, s, count=1, flags=re.S)
main_start=s.index('<main>')
footer_start=s.index('</main>')
new_main='''<main>
<section class="home-launch"><h2>What do you need?</h2><div class="image-button-grid">
<a class="image-button image-button--discord" href="https://discord.com/servers/funk-s-borderlands-trading-hub-997021744764289084" rel="noopener" target="_blank"><span>Join Discord</span><small>Gear • trading • help</small></a>
<a class="image-button" href="borderlands-modding.html"><span>Get Modded Gear</span><small>Start here</small></a>
<a class="image-button" href="borderlands-resources.html#editor-hub"><span>Save Editors</span><small>Online tools</small></a>
<a class="image-button" href="video.html"><span>Watch Stream</span><small>Twitch + videos</small></a>
<a class="image-button" href="merch.html"><span>Shop Merch</span><small>Shirts • hoodies • mugs</small></a>
<a class="image-button" href="giveaway.html"><span>Giveaways</span><small>Discord updates</small></a>
<a class="image-button" href="donate.html"><span>Support</span><small>Wishlist + charity</small></a>
<a class="image-button" href="gallery.html"><span>Gallery</span><small>Community chaos</small></a>
</div></section>
<section class="visual-strip"><a href="merch.html"><img src="images/merch-team-hoodie.webp" alt="Team FunkYouSHiFT hoodie merch" loading="lazy" decoding="async"></a><a href="borderlands-resources.html"><img src="images/funkyoushift-logo-portrait-768.webp" alt="FunkYouSHiFT logo artwork" loading="lazy" decoding="async"></a><a href="gallery.html"><img src="images/funkyoushift-framed-chaos-768.webp" alt="FunkYouSHiFT framed artwork" loading="lazy" decoding="async"></a></section>
<section class="charity-panel" id="hunt-charity"><div><p class="kicker">Community</p><h2>Events, giveaways, and chaos</h2><p>Updates live in Discord.</p></div><div class="mini-grid"><a class="feature-card" href="borderlands-discord.html"><strong>Discord</strong><span>Rules, requests, trading, and announcements.</span></a><a class="feature-card" href="borderlands-resources.html"><strong>Tools</strong><span>Editors, planners, downloads, and links.</span></a><a class="feature-card" href="donate.html#hunt-charity"><strong>Charity</strong><span>Community support and fundraiser info.</span></a></div></section>
<section class="watch-lite" id="watch"><div><h2>Watch Live</h2><p>Load Twitch here or open the watch page.</p><div class="hero-actions"><button class="button primary twitch-loader" data-channel="funkyoushift" type="button">Load Twitch</button><a class="button secondary" href="video.html">Watch Page</a></div></div><picture><source media="(max-width: 760px)" srcset="images/funkyoushift-logo-portrait-480.webp" type="image/webp"/><img alt="FunkYouSHiFT stream artwork" decoding="async" height="768" loading="lazy" src="images/funkyoushift-logo-portrait-768.webp" width="768"/></picture></section>
</main>'''
s=s[:main_start]+new_main+s[footer_start+7:]
p.write_text(s)

# Merch page overhaul
p=root/'merch.html'
s=p.read_text()
new_header='''<header class="hero hero--merch"><div class="hero-inner"><div class="hero-copy"><p class="kicker">FunkYouSHiFT merch</p><h1>Wear the chaos.</h1><p class="lead">Shirts, hoodies, hats, mugs, and inside jokes.</p><div class="hero-actions"><a class="button primary" href="https://streamlabs.com/funkyoushift/merch" rel="noopener nofollow" target="_blank">Shop All Merch</a><a class="button secondary" href="#merch-preview-title">See Items</a></div></div><div class="hero-art hero-art--glow"><img alt="Team FunkYouSHiFT hoodie" src="images/merch-team-hoodie.webp" width="543" height="575" loading="eager" decoding="async"></div></div></header>'''
s=re.sub(r'<header class="hero">.*?</header>', new_header, s, count=1, flags=re.S)
urls='''https://streamlabs.com/funkyoushift/merch/5697646
https://streamlabs.com/funkyoushift/merch/5697630
https://streamlabs.com/funkyoushift/merch/5626138
https://streamlabs.com/funkyoushift/merch/5610415
https://streamlabs.com/funkyoushift/merch/5605019
https://streamlabs.com/funkyoushift/merch/5595675
https://streamlabs.com/funkyoushift/merch/5594444
https://streamlabs.com/funkyoushift/merch/5590330
https://streamlabs.com/funkyoushift/merch/5588148
https://streamlabs.com/funkyoushift/merch/5588145
https://streamlabs.com/funkyoushift/merch/5588144
https://streamlabs.com/funkyoushift/merch/5588138
https://streamlabs.com/funkyoushift/merch/5588136
https://streamlabs.com/funkyoushift/merch/5469637
https://streamlabs.com/funkyoushift/merch/5469636
https://streamlabs.com/funkyoushift/merch/5469633'''.splitlines()
items=[
('Team hoodie','merch-new-logo-hoodie.webp'),('Funk portrait tee','merch-new-logo-shirt.webp'),('FU hat','merch-fu-hat.webp'),('FU mug','merch-fu-mug.webp'),('Hank tee','merch-hank-shirt.webp'),('Claptrap hoodie','merch-claptrap-orange-hoodie.webp'),('Controller tee','merch-controller-shirt.webp'),('Funkhub tee','merch-funkhub-shirt.webp'),('Stinky sock tee','merch-stinky-sock-shirt.webp'),('Portrait back tee','merch-portrait-back-shirt.webp'),('RevCashMoney tee','merch-revcashmoney-shirt.webp'),('Team bots tee','merch-team-bots-shirt.webp'),('Team Funk hoodie','merch-team-hoodie.webp'),('Framed chaos tee','merch-framed-art-shirt.webp'),('FunkYouSHiFT logo','funkyoushift-logo-portrait-768.webp'),('Framed artwork','funkyoushift-framed-chaos-768.webp')]
cards='\n'.join(f'''<a class="merch-card" href="{urls[i]}" rel="noopener nofollow" target="_blank"><img src="images/{img}" alt="{title} merch preview" loading="lazy" decoding="async"><strong>{title}</strong><span>View item</span></a>''' for i,(title,img) in enumerate(items))
new_main=f'''<main>
<section class="merch-feature-row"><a class="merch-feature-card" href="{urls[0]}" rel="noopener nofollow" target="_blank"><img src="images/merch-new-logo-hoodie.webp" alt="FunkYouSHiFT hoodie preview" loading="lazy" decoding="async"><strong>New logo drop</strong><span>Updated Team FunkYouSHiFT artwork.</span></a><a class="merch-feature-card" href="{urls[3]}" rel="noopener nofollow" target="_blank"><img src="images/merch-fu-mug.webp" alt="FU mug preview" loading="lazy" decoding="async"><strong>FU mug</strong><span>Simple, loud, useful.</span></a><a class="merch-feature-card" href="{urls[12]}" rel="noopener nofollow" target="_blank"><img src="images/merch-team-hoodie.webp" alt="Team Funk hoodie preview" loading="lazy" decoding="async"><strong>Team hoodie</strong><span>Big back print.</span></a></section>
<section aria-labelledby="merch-preview-title" class="merch-shop-section"><div class="section-heading-row"><div><h2 id="merch-preview-title">Shop the lineup</h2><p class="section-lead">Tap a card to open the item on Streamlabs.</p></div><a class="button secondary" href="https://streamlabs.com/funkyoushift/merch" rel="noopener nofollow" target="_blank">Shop All</a></div><div class="merch-card-grid">{cards}</div></section>
<section class="notice compact-notice"><h2>Merch opens on Streamlabs.</h2><p>Product checkout, sizes, colors, and availability are handled there.</p></section>
</main>'''
ms=s.index('<main>'); me=s.index('</main>')
s=s[:ms]+new_main+s[me+7:]
p.write_text(s)

# Update gallery with new art section instead of only dynamic list? append a visual section before main end
p=root/'gallery.html'
s=p.read_text()
insert='''\n<section class="visual-gallery-feature"><h2>New art</h2><div class="visual-strip visual-strip--large"><a href="images/team-funkyoushift-new.png" target="_blank" rel="noopener"><img src="images/team-funkyoushift-new-768.webp" alt="Team FunkYouSHiFT new artwork" loading="lazy" decoding="async"></a><a href="images/funkyoushift-logo-portrait.png" target="_blank" rel="noopener"><img src="images/funkyoushift-logo-portrait-768.webp" alt="FunkYouSHiFT portrait logo" loading="lazy" decoding="async"></a><a href="images/funkyoushift-framed-chaos.png" target="_blank" rel="noopener"><img src="images/funkyoushift-framed-chaos-768.webp" alt="FunkYouSHiFT framed chaos artwork" loading="lazy" decoding="async"></a></div></section>\n'''
s=s.replace('</main>', insert+'</main>')
p.write_text(s)

# Add art to resources hero? not necessary. update video image alt okay.
# Build simplified CSS additions
css=root/'style.css'
sc=css.read_text()
sc=sc.replace('? no','')
sc += r'''

/* v4.0.9 visual overhaul / Twitch-viewer friendly layout */
.hero--home .hero-inner,.hero--merch .hero-inner { max-width:1180px; }
.hero--home h1 { font-size:clamp(3rem,10vw,8rem); line-height:.82; letter-spacing:.02em; text-shadow:0 6px 0 #000,0 0 34px rgba(255,153,0,.28); }
.hero--home .lead,.hero--merch .lead { font-size:clamp(1.3rem,2.7vw,2rem); font-weight:900; color:#fff; }
.hero-art--glow img { border-radius:22px; box-shadow:0 0 0 1px rgba(255,153,0,.55),0 0 42px rgba(0,190,255,.22),0 18px 45px rgba(0,0,0,.55); }
.home-launch { text-align:center; padding:26px; }
.image-button-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:16px; margin-top:16px; }
.image-button { min-height:170px; display:flex; flex-direction:column; justify-content:flex-end; gap:6px; padding:18px; border-radius:20px; border:1px solid rgba(255,153,0,.72); text-decoration:none; color:var(--text); background:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.86)), url('images/funkyoushift-framed-chaos-768.webp') center/cover; box-shadow:0 12px 28px rgba(0,0,0,.35); overflow:hidden; }
.image-button:nth-child(1){ background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.86)),url('images/team-funkyoushift-new-768.webp'); }
.image-button:nth-child(2){ background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.86)),url('images/merch-team-bots-shirt.webp'); }
.image-button:nth-child(3){ background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.86)),url('images/funkyoushift-logo-portrait-768.webp'); }
.image-button:nth-child(4){ background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.86)),url('images/funkyoushift-logo-portrait-768.webp'); }
.image-button:nth-child(5){ background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.86)),url('images/merch-new-logo-hoodie.webp'); }
.image-button:nth-child(6){ background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.86)),url('images/merch-fu-mug.webp'); }
.image-button:nth-child(7){ background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.86)),url('images/merch-fu-hat.webp'); }
.image-button:nth-child(8){ background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.86)),url('images/funkyoushift-framed-chaos-768.webp'); }
.image-button span { color:#fff; font-size:clamp(1.35rem,2.5vw,2.1rem); font-weight:1000; line-height:.95; text-shadow:0 3px 10px #000; }
.image-button small { color:var(--orange); font-weight:950; font-size:1rem; }
.image-button:hover,.image-button:focus-visible,.merch-card:hover,.merch-feature-card:hover { transform:translateY(-3px); border-color:var(--orange); outline:none; }
.visual-strip { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; padding:0; background:transparent; border:0; box-shadow:none; }
.visual-strip a,.visual-strip img { display:block; width:100%; }
.visual-strip img { aspect-ratio:1/1; object-fit:cover; border-radius:18px; border:1px solid var(--line); background:#050505; box-shadow:0 12px 28px rgba(0,0,0,.35); }
.visual-strip--large img { aspect-ratio:4/3; }
.merch-feature-row { display:grid; grid-template-columns:1.2fr 1fr 1fr; gap:18px; background:transparent; border:0; box-shadow:none; padding:0; }
.merch-feature-card,.merch-card { display:flex; flex-direction:column; gap:10px; text-decoration:none; color:var(--text); border:1px solid var(--line); background:rgba(0,0,0,.58); border-radius:18px; padding:14px; box-shadow:0 12px 28px rgba(0,0,0,.30); }
.merch-feature-card img,.merch-card img { width:100%; aspect-ratio:1/1; object-fit:contain; border-radius:14px; background:rgba(0,0,0,.35); }
.merch-feature-card strong,.merch-card strong { color:var(--orange); font-weight:1000; font-size:1.2rem; }
.merch-feature-card span,.merch-card span { color:var(--muted); font-weight:800; }
.section-heading-row { display:flex; gap:16px; align-items:center; justify-content:space-between; margin-bottom:18px; }
.section-heading-row h2 { text-align:left; margin:0; }
.section-heading-row .section-lead { text-align:left; margin:.25rem 0 0; }
.merch-card-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:16px; }
@media (max-width:980px){ .image-button-grid,.merch-card-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .merch-feature-row { grid-template-columns:1fr; } }
@media (max-width:620px){ .image-button-grid,.merch-card-grid,.visual-strip { grid-template-columns:1fr; } .image-button{ min-height:190px; } .section-heading-row{ flex-direction:column; align-items:stretch; } }
'''
css.write_text(sc)

# Changelog/project notes append
for fn in ['CHANGELOG_FUNKYOUSHIFT.md','PROJECT_NOTES_FUNKYOUSHIFT.md']:
    p=root/fn
    s=p.read_text() if p.exists() else ''
    s += '\n\n## v4.0.9 - Visual merch/home overhaul\n- Added new Team FunkYouSHiFT artwork with the updated member lineup.\n- Replaced old Team artwork references with the new brand art for OG/social previews and hero imagery.\n- Rebuilt the homepage into a short, button-first launcher for Twitch viewers.\n- Rebuilt the merch page as a visual storefront with uploaded mockups and Streamlabs product links.\n- Added new art previews to the gallery.\n- Continued the reduced-copy, big-button, imagery-heavy design direction.\n'
    p.write_text(s)
