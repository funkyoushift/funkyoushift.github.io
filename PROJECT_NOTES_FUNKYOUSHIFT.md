
## v3.3.7 Discord Landing Link Update
- Replaced expired Discord invite URL with the active Discord server landing page URL across all site CTAs, footers, schema sameAs entries, sticky mobile CTAs, and internal landing pages.
- Preserved third-party GenieBot/GZO Discord link separately.
- Bumped cache/version to 3.3.7.

# PROJECT_NOTES_FUNKYOUSHIFT

## Current version
v3.3.0 — Modding authority build (2026-05-04)

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

## v3.2.0 - Phase 2 growth build - 2026-05-03
- Added dedicated SEO/AEO pages for the current Search Console opportunity: `borderlands-discord.html`, `borderlands-modded-weapons.html`, and `borderlands-builds.html`.
- Updated homepage title/description and added a visible Borderlands Discord entry section targeting Borderlands Discord, BL3/BL4 Discord, modded weapons, and builds.
- Kept canonical strategy consistent: preferred domain is `https://www.funkyoushift.com/`; homepage canonical is `/`; internal content pages use `.html` canonicals.
- Updated page titles and meta descriptions across all pages to use a consistent `| FunkYouSHiFT` style while preserving CTR-focused search language.
- Updated sitemap.xml, llms.txt, redirects, internal links, schema WebPage metadata, cache busting, and body version to `3.2.0`.
- Local internal link audit passed after changes; no missing local `.html`, image, CSS, or slideshow targets found.

## v3.2.1 - Gallery auto-fix system - 2026-05-03
- Replaced the manually hardcoded Community Slideshow card list with `gallery-manifest.js`, generated from the actual files inside `/slideshow/`.
- Gallery cards now render from the manifest and include an image error handler so missing slideshow files remove their card instead of showing broken browser image icons.
- Added a no-JS fallback for the first gallery images so the page is not empty if JavaScript is disabled.
- Changed generic "Slide 22" style labels to cleaner "Stream Moment" labels.
- Added a small homepage About spacing polish rule while keeping the existing copy and layout intact.
- Updated cache busting/body version to `3.2.1`.


## v3.2.3 - Readability / anti-blur polish - 2026-05-03
- Changed the sitewide default body font from the display-style Bangers font to a normal system sans-serif stack for regular text.
- Kept Bangers on headings, nav, buttons, card titles, and brand/CTA elements so the site still feels like FunkYouSHiFT.
- Removed text shadows from normal paragraph/card copy because they made desktop text look soft and blurry.
- Added font smoothing/readability overrides and tightened homepage About copy spacing.
- Updated cache busting/body version to `3.2.3`.


## Current mobile layout note - v3.2.3
Homepage hero must stay single-column on screens under 760px. Do not allow the desktop two-column grid to control mobile hero text, buttons, or proof badges. Twitch remains click-to-load only.

- Mobile hero polish: brand image now sits between headline and copy on phones; headline sizing capped to prevent horizontal overflow.

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


## v3.3.4 - Homepage Compression Without Losing SEO
- Shortened the homepage mobile flow by replacing duplicate long sections with focused routing cards.
- Kept Borderlands modding, modded weapons, Discord, builds, and resources language near the top for CTR/SEO.
- Moved the homepage toward a hub model: Home routes traffic, Modding explains, Resources holds tools, Discord converts.
- Kept lazy Twitch click-to-load behavior.
- Kept global footer/internal links to the new SEO pages for crawl flow.


## v3.3.7 Landing Router System
- Added fast-decision router sections to Borderlands landing pages, Resources, Watch, and Discord pages.
- Added mobile-only sticky Discord CTA to reduce friction for search visitors.
- Kept Resources as the toolbox and Modding as the SEO landing page.
- Bumped cache/version to 3.3.7.


## v3.3.7 - Safe direct download system
- Added `downloads/borderlands-4-trainer.html` as a noindex/nofollow landing page for the hosted Borderlands 4 trainer EXE.
- Resources page now routes the BL4 trainer through the safe download page instead of treating the EXE like a normal SEO resource.
- Added safety language for third-party executables and kept the download page out of the sitemap.
- Added robots directives for `.exe` crawling while keeping main SEO pages clean.

## v3.3.8 - Visual readability polish
- Replaced the hard-to-read display font on nav buttons, page titles, headings, card labels, and large CTA buttons with a crisp heavy system font.
- Removed heavy text shadows/outlined heading effects that made orange and white heading text look blurry.
- Kept the orange/black FunkYouSHiFT styling through color, weight, layout, and gradients instead of relying on blurry display text.
- Updated cache busting/body version to 3.3.8.


## v3.3.9 - Header/Footer + Readability Verification
- Standardized header/nav and footer links across all HTML pages, including the safe download page.
- Bumped all stylesheet cache versions and body data-version values to 3.3.9.
- Applied final global readability rules to nav buttons, titles, section headers, and CTA buttons.
- Verified internal links/assets after update.


## v3.3.10 - Desktop Performance Recovery
- Added homepage LCP image preload and fetch priority.
- Removed remaining blurry paint-heavy text effects from nav/buttons/headers.
- Tightened desktop nav/button rendering without changing header/footer link structure.
- Bumped cache/version to 3.3.10.
