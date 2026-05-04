
## v3.3.6 Discord Landing Link Update
- Replaced expired Discord invite URL with the active Discord server landing page URL across all site CTAs, footers, schema sameAs entries, sticky mobile CTAs, and internal landing pages.
- Preserved third-party GenieBot/GZO Discord link separately.
- Bumped cache/version to 3.3.6.

# FunkYouSHiFT Project Reference

_Last updated: 2026-05-04 — v3.3.0 modding authority build_

## Working rules for future edits
- Work from the actual site files in the ZIP/project. Do not guess the file structure, page names, image paths, or current implementation.
- Make real deployable file changes, not copy/paste instructions, unless guidance-only is specifically requested.
- Keep the project notes and changelog updated after meaningful changes.
- Preserve the FunkYouSHiFT voice: direct, helpful, funny/chaotic when useful, not corporate filler.
- Keep the orange/black brand identity and current 2026 artwork.
- Keep navigation consistent across pages.
- Keep Streamlabs as the merch checkout destination.
- Mobile matters: big tap targets, simple routing, short above-the-fold sections, and fast perceived load beat decorative complexity.
- Do not create a separate `m.` mobile site. Use responsive mobile-first improvements on the same canonical URLs.
- Keep explicit image dimensions, lazy loading where appropriate, and optimized image formats to protect CLS and PageSpeed.

## Main site goal
FunkYouSHiFT.com is a creator/community hub. It should route visitors to:
1. Discord/community retention
2. Merch/store monetization
3. Embedded content/watch time
4. Social follows/support links
5. Gallery/brand depth

## Current preferred canonical domain
- Preferred live/canonical domain: `https://www.funkyoushift.com/`
- Keep canonicals, Open Graph URLs, sitemap URLs, robots references, and schema URLs aligned to the www domain unless the hosting strategy intentionally changes.

## Current top navigation
Home, Watch, Discord, Merch, Resources, Giveaway, Gallery, Donate

## Important pages
- `index.html` — homepage/router, Discord first, Watch second
- `video.html` — dedicated watch/video page with embedded content
- `discord.html` — primary community conversion page
- `merch.html` — merch preview and Streamlabs merch CTA
- `borderlands-resources.html` — resource hub with embeds/fallback links
- `borderlands-modding.html` — search traffic page for modding/modded item help
- `borderlands-trading.html` — search traffic page for trading/loot help
- `borderlands-build-videos.html` — curated creator/build video bridge while Discord build channels grow
- `gallery.html` — visual gallery/slideshow, not a merch dump
- `giveaway.html` — giveaway-first page
- `donate.html` — support page with Streamlabs/Throne context

## Version history summary
### v2.0.0
- Standardized sitewide nav/footer.
- Added page-specific SEO titles, descriptions, canonicals, Open Graph/Twitter metadata, and JSON-LD schema.
- Improved Discord, merch, giveaway, and donate pages.
- Updated sitemap, robots, and llms.txt.

### v2.0.1–v2.0.2
- Rebuilt gallery into visible image cards.
- Made merch preview images/cards clickable.
- Linked homepage and gallery merch art toward merch shopping.

### v2.1.0
- Added Borderlands traffic pages: modding, trading, resources, and build videos.
- Added homepage entry cards for modding/trading/resources.
- Added Lootlemon, BL4Hunt, MentalMars, creator video/resource links.
- Restored visible stream/offline/channel assets in Gallery.

### v2.1.1–v2.1.6
- Restored optimized `/slideshow/` assets.
- Added visible community slideshow to Gallery.
- Replaced oversized/opaque image references with smaller optimized versions where possible.
- Removed old resource description grid and Discord preview from Resources.
- Tightened resource page spacing and embed heights.

### v2.1.7
- Cleaned Search Console-related SEO issues.
- Kept preferred canonical URLs aligned to `https://www.funkyoushift.com/`.
- Added dedicated `video.html` watch page with VideoObject schema.
- Cleaned donate structured data.
- Added Cloudflare Pages-style `_redirects` helper.

### v2.1.8
- Made Discord visually dominant on the homepage.
- Kept Watch as the secondary homepage action.
- Added community proof strip and Quick Answers for user clarity/AEO.
- Rebuilt JSON-LD across pages with consistent WebSite, Person, WebPage, BreadcrumbList, FAQPage, ItemList, Store, Event, DonateAction, and VideoObject where appropriate.
- Added lazy loading/referrer policies to embeds and preconnect hints.
- Added WebP FU logo and refreshed image dimensions.
- Rebuilt sitemap with current priority order and video sitemap data.

### v2.1.9
- Added mobile-only collapsed nav button across pages.
- Tightened mobile hero/card/section/gallery/resource/footer/embed spacing.
- Preserved full gallery/slideshow images with `object-fit: contain`.
- Fixed duplicate nested media issue in CSS.

### v3.0.0
- Hard optimized the homepage for mobile-first performance and usability.
- Removed the homepage Google Font request to reduce render-blocking work.
- Kept the same canonical URL strategy and site structure; no separate mobile subdomain.
- Replaced the heavy homepage Twitch iframe with a lightweight watch card linking to the dedicated Watch page and Twitch.
- Added smaller WebP derivatives for hero/watch/merch artwork:
  - `team-funkyoushift-people-2026-480.webp`
  - `team-funkyoushift-people-2026-768.webp`
  - `team-funkyoushift-bots-2026-480.webp`
  - `team-funkyoushift-bots-2026-768.webp`
  - `fu-logo-2026-480.webp`
  - `fu-logo-2026-768.webp`
- Updated homepage hero image to use responsive WebP sources.
- Updated homepage merch preview images to smaller WebP files.
- Added v3 mobile CSS overrides for cleaner above-the-fold layout, tighter cards, better tap targets, and reduced visual clutter.
- Updated cache busting to `style.css?v=3.0.0` and body data version to `3.0.0`.


## v3.0.1 - Human copy/resource embed cleanup - 2026-05-03
- Confirmed the Twitch embed was intentionally removed from the homepage for mobile speed; kept Twitch available through the Watch page and direct Twitch buttons.
- Rewrote robotic/AEO-sounding visitor copy on the homepage, Watch page, Resources page, and selected Quick Answer sections into a more natural FunkYouSHiFT voice.
- Removed broken external site iframes from the Resources page, including Lootlemon, and replaced them with clean direct-link resource cards.
- Kept YouTube embeds because those render correctly and are appropriate for watch/build video content.
- Updated cache busting and body data version to `3.0.1`.


## v3.1.0 - Homepage human rewrite + lazy Twitch - 2026-05-03
- Homepage visible copy was rewritten to sound more like Funk: direct, casual, helpful, and less corporate.
- Twitch was added back to the homepage using a click-to-load `twitch-lite` component. The Twitch iframe is not requested until a visitor taps the preview.
- This preserves the Twitch embed experience without letting Twitch hurt initial mobile PageSpeed.
- Lootlemon remains a direct resource link only because it refuses iframe embedding.
- CSS cache busting and body data version updated to `3.1.0`.


## v3.1.0 - Full human tone + SEO pass
- Future work should continue editing actual files directly, not handing back paste-in snippets.
- The full visible-site tone is now more natural: direct, casual, gamer/community-native, and less template-like.
- SEO terms are still present naturally: Borderlands, Discord, trading, modded gear, giveaways, merch, builds, resources, Lootlemon, MentalMars, BL4Hunt.
- Homepage keeps the lazy Twitch player: no Twitch iframe request until the visitor taps the preview.
- External resource sites that block iframes should remain button/link cards, not embeds.

## v3.2.0 - Phase 2 growth build - 2026-05-03
- Added dedicated SEO/AEO pages for the current Search Console opportunity: `borderlands-discord.html`, `borderlands-modded-weapons.html`, and `borderlands-builds.html`.
- Updated homepage title/description and added a visible Borderlands Discord entry section targeting Borderlands Discord, BL3/BL4 Discord, modded weapons, and builds.
- Kept canonical strategy consistent: preferred domain is `https://www.funkyoushift.com/`; homepage canonical is `/`; internal content pages use `.html` canonicals.
- Updated page titles and meta descriptions across all pages to use a consistent `| FunkYouSHiFT` style while preserving CTR-focused search language.
- Updated sitemap.xml, llms.txt, redirects, internal links, schema WebPage metadata, cache busting, and body version to `3.2.0`.
- Local internal link audit passed after changes; no missing local `.html`, image, CSS, or slideshow targets found.


## v3.2.1 - Gallery auto-fix system - 2026-05-03
- Gallery slideshow now renders from `gallery-manifest.js`, generated from the actual `/slideshow/` files.
- Missing gallery images remove their own cards instead of showing broken image icons.
- Added no-JS fallback for the first slideshow images.
- Updated cache busting/body versions to `3.2.1`.

## v3.3.0 - Modding authority build - 2026-05-04
- Rebuilt `borderlands-modding.html` into the primary authority page for Borderlands modding, modded weapons, BL3/BL4 help, trusted resources, and Discord conversion.
- Updated title/meta/OG/schema with direct `Borderlands modding`, `modded weapons`, `BL3`, `BL4`, `Discord help`, and resource language so Google has a stronger snippet source than generic About copy.
- Added Article + FAQPage schema to the modding page and refreshed FAQ questions around modding, modded weapons, downloads, and BL3/BL4 help.
- Updated homepage title/description and the top search-entry section to route modding searches directly into the modding guide.
- Updated Borderlands Discord and Modded Weapons page metadata to reinforce modding/trading/gear search intent.
- Updated sitemap priority/lastmod, llms.txt, cache busting, and body version to v3.3.0.


## v3.3.1 - Internal linking system - 2026-05-04
- Added global nav links for Modding, Weapons, and Builds so the new SEO pages are not orphaned behind Resources only.
- Added footer links to Borderlands Discord, Modding Guide, Modded Weapons, Builds, and Resources across every HTML page.
- Added a reusable “More Borderlands help” internal-link cluster to every page so authority flows between the modding, Discord, modded weapons, and builds pages.
- Rebuilt sitemap.xml with the modding authority page, Discord page, modded weapons page, and builds page prioritized before lower-value support pages.
- Confirmed canonical strategy remains consistent: homepage canonical is https://www.funkyoushift.com/ and content pages use https://www.funkyoushift.com/page-name.html.
- Updated cache busting/body version to v3.3.1.


## v3.3.2 Resource Expansion
- Added requested Borderlands mod databases, editors, trainers, GenieBot tutorial/community link, Maxroll planner, and build creator resources.
- Added safety wording around third-party trainers/executable downloads and clarified third-party ownership.
- Updated Resources and Builds metadata/schema while keeping canonical `.html` structure and internal linking intact.


## v3.3.3 Creator Integration Patch
- Converted YouTube creator videos to click-to-load embeds so YouTube does not load on initial page load.
- Converted Maxroll BL4 planner to click-to-load iframe attempt with direct fallback.
- Expanded creator SEO/resource mentions for Moxsy, Ki11er Six, Joltzdude139, LazyData, Dantics, and RestAssured.
- Kept third-party creator/resource language clear: links are references, not FunkYouSHiFT-owned content.
