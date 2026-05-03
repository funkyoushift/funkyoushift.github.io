# PROJECT NOTES - FunkYouSHiFT.com

## Source of Truth
This file should be read before making future changes to funkyoushift.com. Treat it like the project notes/rules file used for Subtronics LLC.

## Primary Goal
FunkYouSHiFT.com is the central brand hub. The site should route visitors quickly to:
1. Discord/community
2. Merch store
3. Embedded/streaming content
4. Social platforms and support links

The site is not just a Discord page and not just a creator bio page. It is a conversion hub for the full FunkYouSHiFT ecosystem.

## Working Rules
- Make actual file changes; do not only provide suggestions.
- Preserve existing working links, embeds, and asset paths unless intentionally replacing them.
- Keep pages mobile-first because most visitors are expected to come from social/Discord/mobile browsing.
- Keep the voice human, direct, a little chaotic, and useful. Avoid corporate fluff and avoid overly themed phrases that normal visitors would not say.
- Prioritize clear actions over visual noise.
- Keep notes updated after every major change.

## Brand Voice
FunkYouSHiFT should sound like Funk: direct, gamer-friendly, funny when appropriate, and community-first. The tone can be loud and weird, but the site copy still needs to clearly tell people what to do.

Good language:
- Join the Discord
- Watch the content
- Shop merch
- Rep the chaos
- People actually answer
- Not a dead server

Avoid overusing:
- signal
- terminal
- broadcasting
- vault channel
- always loud
- abstract themed copy that does not explain value

## Current Site Structure
- `index.html` = main brand hub / conversion router
- `merch.html` = merch page + Streamlabs store CTA
- `discord.html` = Discord widget/community page
- `giveaway.html` = giveaway page
- `gallery.html` = image/content gallery
- `donate.html` = support/donation page
- `style.css` = global styling
- `images/` = brand and merch assets

## Current External Links
- Merch: https://streamlabs.com/funkyoushift/merch
- Twitch: https://www.twitch.tv/funkyoushift
- YouTube: https://www.youtube.com/@funkyoushift
- Facebook: https://www.facebook.com/funkyoushift
- X: https://x.com/funkyoushift
- Discord: https://discord.gg/ttwl-bl3-trading
- Throne: https://throne.com/funkyoushift

## 2026-05-03 Homepage Flow Optimization
Changes made:
- Rebuilt homepage flow around four clear visitor actions: Discord, Watch, Merch, Follow.
- Moved Twitch embed into a dedicated Watch section instead of letting it dominate the top before visitors understand where to go.
- Added homepage merch feature section with Streamlabs CTA.
- Added newer brand images to `/images/`:
  - `fu-logo-2026.png`
  - `team-funkyoushift-bots-2026.png`
  - `team-funkyoushift-people-2026.png`
- Updated merch page with stronger merch messaging and newer brand artwork.
- Added CSS under the comment: `FunkYouSHiFT homepage flow update v1 - 2026-05-03`.
- Kept existing site style, grunge background, button language, and overall orange/red FunkYouSHiFT aesthetic.

## Next Recommended Work
- Optimize `discord.html` with a clearer join CTA above the widget.
- Add a content/social page or stronger homepage content preview if YouTube/TikTok embeds become available.
- Review merch product images periodically against Streamlabs store inventory so homepage and merch page match current products.

## 2026-05-03 SEO / Schema System v1
Changes made:
- Added consistent page titles, meta descriptions, canonical URLs, Open Graph tags, Twitter card tags, robots meta, and JSON-LD schema across the main site pages.
- Added schema graph defining FunkYouSHiFT as the official creator/brand entity, the website as the official home base, and the Discord/community/merch pages as related entities.
- Added `llms.txt` so AI/search systems can quickly understand the site purpose and official links.
- Updated `sitemap.xml` with all major pages, lastmod dates, priorities, and change frequency hints.
- Kept the goal aligned with Subtronics-style workflow: make real file changes, preserve working links/assets, and update project notes for future work.

SEO rules going forward:
- Every new public page should include a unique title, meta description, canonical URL, Open Graph tags, Twitter card tags, and page-specific JSON-LD where useful.
- Keep entity language consistent: FunkYouSHiFT is the creator/brand hub for Borderlands content, Discord community, merch, giveaways, socials, and support links.
- Avoid changing official URLs without also updating schema, sitemap, footer links, and `llms.txt`.

