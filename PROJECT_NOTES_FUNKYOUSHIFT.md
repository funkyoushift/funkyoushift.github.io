# PROJECT_NOTES_FUNKYOUSHIFT

## Current version
v2.0.2 — Merch link conversion + natural sitewide fixes (2026-05-03)

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
