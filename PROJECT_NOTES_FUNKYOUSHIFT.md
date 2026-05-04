# PROJECT_NOTES_FUNKYOUSHIFT

## Current version
v3.0.1 — Human copy/resource embed cleanup (2026-05-03)

## Workflow rules
- Treat this like the Subtronics site workflow: make real files, do not only provide advice.
- Keep notes and changelog updated inside the site files on every meaningful change.
- Preserve the FunkYouSHiFT voice: direct, helpful, funny/chaotic when useful, never corporate filler.
- Primary site goal: route visitors to Discord, embedded content, merch, socials, giveaways, and support links.
- Mobile matters. Big tap targets and simple routing beat decorative complexity.

## Conversion priority
1. Discord/community retention
2. Merch/store monetization
3. Embedded content/watch time
4. Social follows/support links
5. Gallery/brand depth

## Design notes
- Orange/black brand identity remains.
- New 2026 imagery used: FU logo, Team FunkYouSHiFT people art, Team FunkYouSHiFT bot art.
- Keep nav consistent across pages.
- Keep Streamlabs merch as the checkout destination.

## v2.0.0 changes
- Adopted v2.x.x versioning for this current redesign/optimization phase.
- Standardized nav order sitewide: Home, Watch, Discord, Merch, Giveaway, Gallery, Donate.
- Added active nav states with aria-current.
- Added viewport/meta/canonical/Open Graph/Twitter cards/schema to all major pages.
- Reworked Discord, Merch, Giveaway, Donate pages to match homepage goals and tone.
- Kept homepage as hub/router for Discord, Watch, Merch, and Socials.
- Updated robots.txt, sitemap.xml, and llms.txt.


## v2.0.1 Gallery Rebuild Notes
- Gallery page should not rely on an empty `/slideshow/` folder or invisible JavaScript-generated tiles.
- Gallery is now a curated page with real image cards using assets already bundled in `/images/`.
- Gallery goals: show recognizable brand art, drive merch clicks, reinforce Discord/community identity, and keep embedded video visible.
- Future gallery updates should add real visible cards with proper alt text, not placeholder empty loaders.


## v2.0.2 Merch Link Conversion Notes
- Merch page preview images are now clickable shopping cards.
- Because the Streamlabs store does not expose stable individual product URLs inside the site files, product cards point to the official Streamlabs merch storefront. If exact item-level URLs become available, replace each `href` on the merch cards individually.
- Homepage merch art now links to the onsite merch page instead of behaving like decoration only.
- Gallery merch-design cards now send users toward merch shopping instead of opening raw image files.
- Updated cache busting to `style.css?v=2.0.2` and body version to `data-version="2.0.2"`.


## v2.1.0 Traffic Pages Notes
- Added search-entry pages for Borderlands modding, trading, resources, and build-video resources.
- Build content is intentionally positioned as community growth / curated creator resources for now, because FunkYouSHiFT does not currently own the skill-build lane yet.
- Added links to Lootlemon and BL4Hunt as useful external resources; these support user trust and make the site more useful instead of trying to fake being a complete guide database.
- Discord remains the primary conversion target for modding/trading/help traffic.
- Gallery regression addressed by restoring visible stream/offline/channel assets alongside newer AI/brand artwork.
- Sitemap, llms.txt, nav/footer, cache busting, and internal links updated for v2.1.0.

## v2.1.1 Slideshow + Performance Notes
- The `/slideshow/` folder is now part of the deployable ZIP and contains optimized JPG slideshow images.
- Gallery should keep slideshow images lazy-loaded and below the primary brand/merch sections so mobile visitors see core actions first.
- Do not re-upload raw full-size slideshow images over these optimized files unless they are resized/compressed again.
- Large opaque PNG brand artwork was replaced with JPG references for speed. Keep transparent logo art as PNG unless a tested WebP fallback system is added.
- Maintain explicit `width`, `height`, `loading`, and `decoding` attributes on local images for Google PageSpeed and CLS stability.


## v2.1.4 Notes
- Resource descriptions/card grid was removed after review; page should not show the old resource boxes above the embeds.
- Keep embeds/fallback buttons as the main resource page format.


## v2.1.6
- Removed the Discord preview from the Resources page so the page focuses only on tools, videos, and resource embeds.
- Tightened Resources page spacing for better mobile scrolling.
- Reduced external iframe heights and card padding so embeds feel less oversized.
- Updated cache busting to `style.css?v=2.1.7`.

## v2.1.8 - Homepage priority + SEO/AEO/PageSpeed polish
- Made Discord visually dominant on the homepage while keeping Watch as the secondary action; merch/socials remain available but no longer compete equally above the fold.
- Added a community proof strip and visible Quick Answers sections for AEO-style crawler/user clarity.
- Rebuilt JSON-LD across pages with consistent WebSite, Person, WebPage, BreadcrumbList, FAQPage, ItemList, Store, Event, DonateAction, and VideoObject where appropriate.
- Added lazy loading/referrer policies to embeds and preconnect hints for common external content providers.
- Created a WebP FU logo and updated logo references for smaller downloads.
- Optimized JPG assets and refreshed image width/height attributes to reduce file weight and layout shift.
- Rebuilt sitemap.xml with video sitemap data and current priority order: Home, Discord, Watch, Resources, Merch, supporting Borderlands pages, Giveaway, Gallery, Donate.
- Updated cache busting to `style.css?v=2.1.8` and body version to `2.1.8`.


## v3.0.0 - Mobile homepage hard optimize
- Added `PROJECT_REFERENCE_FUNKYOUSHIFT.md` as the consolidated rules/change reference.
- Kept the existing canonical/www strategy and actual file structure.
- Removed the heavy Twitch iframe from the homepage and routed viewers to the dedicated Watch page instead.
- Added smaller WebP derivatives for homepage hero/watch/merch artwork.
- Updated homepage mobile CSS for cleaner above-the-fold layout, tighter routing cards, and better tap targets.
- Updated cache busting to `style.css?v=3.0.0`.


## v3.0.1 - Human copy/resource embed cleanup - 2026-05-03
- Confirmed the Twitch embed was intentionally removed from the homepage for mobile speed; kept Twitch available through the Watch page and direct Twitch buttons.
- Rewrote robotic/AEO-sounding visitor copy on the homepage, Watch page, Resources page, and selected Quick Answer sections into a more natural FunkYouSHiFT voice.
- Removed broken external site iframes from the Resources page, including Lootlemon, and replaced them with clean direct-link resource cards.
- Kept YouTube embeds because those render correctly and are appropriate for watch/build video content.
- Updated cache busting and body data version to `3.0.1`.
