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
- Updated cache busting from `style.css?v=2.1.0` to `style.css?v=2.1.1`.


## v2.1.2 - Page uniqueness and gallery cleanup
- Removed page-design assets, merch previews, and stream asset duplicates from the public Gallery page.
- Kept Gallery focused on community slideshow images and video highlight.
- Updated slideshow image CSS to preserve full images instead of cropping tall/narrow photos.
- Tightened homepage, Discord, merch, donate, giveaway, and Borderlands support page copy so each page has a clearer unique purpose.
- Updated CSS cache busting to style.css?v=2.1.2.


## v2.1.3 - Embedded resource upgrade
- Replaced description-only resource sections with embedded Discord and YouTube content.
- Added MentalMars Borderlands 4 Hub to the resources page and schema list.
- Added direct fallback links for external resources because some outside sites may block iframe previews.
- Updated build videos page with embedded creator videos plus a Discord build-showoff CTA.
- Updated cache busting to style.css?v=2.1.3.


## v2.1.4 - Resources cleanup
- Removed the old description card grid from borderlands-resources.html.
- Resources page now starts with embed-focused sections and simple action buttons only.
- Added anchors for build videos and resource site embeds.
- Updated cache busting to style.css?v=2.1.4.


## v2.1.6
- Removed the Discord preview from the Resources page so the page focuses only on tools, videos, and resource embeds.
- Tightened Resources page spacing for better mobile scrolling.
- Reduced external iframe heights and card padding so embeds feel less oversized.
- Updated cache busting to `style.css?v=2.1.5`.

## v2.1.6 - Sitemap optimization
- Rebuilt sitemap.xml with explicit <lastmod> values for all indexed pages.
- Confirmed sitemap URLs match actual HTML files in the deploy package.
- Adjusted priority/changefreq values to better match current site goals: home, Discord, merch, resources, content, then supporting pages.
- Updated CSS cache busting to style.css?v=2.1.6.

