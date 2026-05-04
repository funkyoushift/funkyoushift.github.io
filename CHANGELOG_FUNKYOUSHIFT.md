# CHANGELOG_FUNKYOUSHIFT

## v2.0.0 - 2026-05-03
- Sitewide consistency pass across Home, Discord, Merch, Giveaway, Gallery, Donate.
- Standardized nav and footer links.
- Added page-specific SEO titles/descriptions/canonicals/Open Graph/Twitter metadata.
- Added page-specific JSON-LD schema graph to all major pages.
- Improved Discord page for clear join intent.
- Improved merch page with brand hook, product preview, and Streamlabs CTA.
- Improved giveaway page so giveaway is primary and donations are secondary.
- Improved donate page around Streamlabs/Throne support.
- Updated sitemap.xml, robots.txt, and llms.txt.


## v2.0.1 — Gallery Rebuild
- Rebuilt `gallery.html` from an empty tile loader into a curated visual gallery.
- Added featured brand art, stream/social assets, merch design cards, and responsive YouTube video highlight.
- Added gallery-specific CSS for image cards, responsive grids, and mobile display.
- Updated HTML cache-busting to `style.css?v=2.0.1` across pages.


## v2.0.2 — Merch Link Conversion + Natural Fixes
- Updated `merch.html` so every merch preview image/card is clickable.
- Added shopping-card labels under merch preview images to make the click action obvious.
- Linked merch feature artwork on the homepage to `merch.html`.
- Updated gallery merch artwork cards to point users to the Streamlabs merch store instead of raw image files.
- Added scoped CSS for clickable merch cards, hover/focus states, and mobile display.
- Updated version/cache busting from `2.0.1` to `2.0.2` across HTML/CSS.


## v2.1.0 — SEO traffic pages + resources hub — 2026-05-03
- Added `borderlands-modding.html` targeting Borderlands modding/modded item help.
- Added `borderlands-trading.html` targeting Borderlands trading/loot help.
- Added `borderlands-resources.html` linking Discord, Lootlemon, BL4Hunt, creator build video searches, and onsite traffic pages.
- Added `borderlands-build-videos.html` as a bridge page while build channels grow in Discord.
- Added homepage traffic-entry cards for modding, trading, and resources.
- Added resource links to nav/footer.
- Added internal link block to Discord page.
- Restored stream/offline/channel assets into Gallery so it is not only AI brand art.
- Updated `style.css` with v2.1.0 traffic/resource card styles.
- Updated `sitemap.xml`, `robots.txt`, `llms.txt`, project notes, and cache busting.

## v2.1.1 — Slideshow restore + image optimization — 2026-05-03
- Added the optimized `/slideshow/` asset folder back into the deployable site package.
- Added a visible Community Slideshow section to `gallery.html` using lazy-loaded optimized images.
- Optimized oversized site images for faster mobile loading and smaller deploy ZIP size.
- Converted opaque oversized brand art from heavy PNG files to compressed JPG references while preserving the transparent FU logo PNG.
- Added image dimensions/decoding attributes across local image tags to reduce layout shift and improve PageSpeed behavior.
- Updated cache busting from `style.css?v=2.1.7` to `style.css?v=2.1.7`.


## v2.1.2 - Page uniqueness and gallery cleanup
- Removed page-design assets, merch previews, and stream asset duplicates from the public Gallery page.
- Kept Gallery focused on community slideshow images and video highlight.
- Updated slideshow image CSS to preserve full images instead of cropping tall/narrow photos.
- Tightened homepage, Discord, merch, donate, giveaway, and Borderlands support page copy so each page has a clearer unique purpose.
- Updated CSS cache busting to style.css?v=2.1.7.


## v2.1.3 - Embedded resource upgrade
- Replaced description-only resource sections with embedded Discord and YouTube content.
- Added MentalMars Borderlands 4 Hub to the resources page and schema list.
- Added direct fallback links for external resources because some outside sites may block iframe previews.
- Updated build videos page with embedded creator videos plus a Discord build-showoff CTA.
- Updated cache busting to style.css?v=2.1.7.


## v2.1.4 - Resources cleanup
- Removed the old description card grid from borderlands-resources.html.
- Resources page now starts with embed-focused sections and simple action buttons only.
- Added anchors for build videos and resource site embeds.
- Updated cache busting to style.css?v=2.1.7.


## v2.1.6
- Removed the Discord preview from the Resources page so the page focuses only on tools, videos, and resource embeds.
- Tightened Resources page spacing for better mobile scrolling.
- Reduced external iframe heights and card padding so embeds feel less oversized.
- Updated cache busting to `style.css?v=2.1.7`.

## v2.1.6 - Sitemap optimization
- Rebuilt sitemap.xml with explicit <lastmod> values for all indexed pages.
- Confirmed sitemap URLs match actual HTML files in the deploy package.
- Adjusted priority/changefreq values to better match current site goals: home, Discord, merch, resources, content, then supporting pages.
- Updated CSS cache busting to style.css?v=2.1.7.



## v2.1.7 - Search Console SEO cleanup
- Switched canonicals, Open Graph URLs, sitemap, robots.txt, and schema URLs to the preferred non-www domain: https://www.funkyoushift.com/.
- Added dedicated video.html watch page with VideoObject schema for embedded Borderlands build videos.
- Updated navigation Watch links to point to the dedicated video page.
- Cleaned donate.html structured data and added valid BreadcrumbList + DonateAction schema to avoid itemListElement/name rich result errors.
- Updated sitemap.xml with video.html and refreshed lastmod values.
- Updated cache busting to style.css?v=2.1.7.
- Added _redirects helper for Cloudflare Pages-style redirect handling; Cloudflare dashboard rules should still be configured after deploy.

- Preferred canonical domain kept as https://www.funkyoushift.com/ to match the site CNAME and existing live routing.

## v2.1.8 - Homepage priority + SEO/AEO/PageSpeed polish
- Made Discord visually dominant on the homepage while keeping Watch as the secondary action; merch/socials remain available but no longer compete equally above the fold.
- Added a community proof strip and visible Quick Answers sections for AEO-style crawler/user clarity.
- Rebuilt JSON-LD across pages with consistent WebSite, Person, WebPage, BreadcrumbList, FAQPage, ItemList, Store, Event, DonateAction, and VideoObject where appropriate.
- Added lazy loading/referrer policies to embeds and preconnect hints for common external content providers.
- Created a WebP FU logo and updated logo references for smaller downloads.
- Optimized JPG assets and refreshed image width/height attributes to reduce file weight and layout shift.
- Rebuilt sitemap.xml with video sitemap data and current priority order: Home, Discord, Watch, Resources, Merch, supporting Borderlands pages, Giveaway, Gallery, Donate.
- Updated cache busting to `style.css?v=2.1.8` and body version to `2.1.8`.


## v2.1.9 - Mobile UX + speed polish
- Compared uploaded friend-optimized index.html against the current package. Kept the current v2.1.8 SEO/AEO/schema/canonical structure and used the useful mobile menu idea globally.
- Added a mobile-only collapsed navigation button to every HTML page so phones no longer open with eight full orange nav buttons.
- Tightened mobile hero, card, section, gallery, resource, footer, and embed spacing.
- Preserved full gallery/slideshow image display with object-fit: contain so tall/narrow images are not cropped.
- Fixed a duplicate nested @media line in style.css.
- Updated cache busting to style.css?v=2.1.9 and body data-version to 2.1.9.
- Updated sitemap lastmod values.

## v3.0.0 - Mobile homepage hard optimize - 2026-05-03
- Created `PROJECT_REFERENCE_FUNKYOUSHIFT.md` as the readable consolidated source of rules, goals, page notes, and version history.
- Removed homepage reliance on the external Google Font request to reduce render-blocking work.
- Replaced the heavy homepage Twitch iframe with a lightweight watch card linking to `video.html` and Twitch.
- Added smaller WebP image derivatives for homepage hero, watch, and merch artwork.
- Updated homepage hero/merch images to use smaller responsive WebP assets.
- Added mobile-first v3 CSS overrides for cleaner above-the-fold layout, tighter sections, better tap targets, and less mobile clutter.
- Updated cache busting and body data versions to `3.0.0`.


## v3.0.1 - Human copy/resource embed cleanup - 2026-05-03
- Confirmed the Twitch embed was intentionally removed from the homepage for mobile speed; kept Twitch available through the Watch page and direct Twitch buttons.
- Rewrote robotic/AEO-sounding visitor copy on the homepage, Watch page, Resources page, and selected Quick Answer sections into a more natural FunkYouSHiFT voice.
- Removed broken external site iframes from the Resources page, including Lootlemon, and replaced them with clean direct-link resource cards.
- Kept YouTube embeds because those render correctly and are appropriate for watch/build video content.
- Updated cache busting and body data version to `3.0.1`.

## v3.1.0 - Homepage human rewrite + lazy Twitch - 2026-05-03
- Rewrote the homepage visible copy in a more natural FunkYouSHiFT voice instead of generic landing-page/AEO phrasing.
- Added the Twitch experience back to the homepage as a click-to-load player so the heavy Twitch iframe does not load during initial page render.
- Kept direct Watch page and Twitch links below the lazy player.
- Updated homepage FAQ text and matching FAQPage schema.
- Updated CSS cache busting and body data version to `3.1.0`.


## v3.1.0 - Full human tone + SEO pass - 2026-05-03
- Actually edited the site files instead of providing copy/paste instructions.
- Reworked visible copy across Home, Discord, Watch, Merch, Donate, Giveaway, Gallery, Resources, Modding, Trading, and Build Videos.
- Kept the tone direct, creator/community-focused, and less corporate while preserving search-friendly Borderlands terms.
- Updated page titles and meta descriptions for stronger click-through language.
- Kept the homepage click-to-load Twitch player so Twitch is present without loading during initial mobile render.
- Kept Lootlemon as a direct link because it blocks iframe embedding.
- Bumped cache busting/body versions to `3.1.0`.

## v3.2.0 - Phase 2 growth build - 2026-05-03
- Added dedicated SEO/AEO pages for the current Search Console opportunity: `borderlands-discord.html`, `borderlands-modded-weapons.html`, and `borderlands-builds.html`.
- Updated homepage title/description and added a visible Borderlands Discord entry section targeting Borderlands Discord, BL3/BL4 Discord, modded weapons, and builds.
- Kept canonical strategy consistent: preferred domain is `https://www.funkyoushift.com/`; homepage canonical is `/`; internal content pages use `.html` canonicals.
- Updated page titles and meta descriptions across all pages to use a consistent `| FunkYouSHiFT` style while preserving CTR-focused search language.
- Updated sitemap.xml, llms.txt, redirects, internal links, schema WebPage metadata, cache busting, and body version to `3.2.0`.
- Local internal link audit passed after changes; no missing local `.html`, image, CSS, or slideshow targets found.
