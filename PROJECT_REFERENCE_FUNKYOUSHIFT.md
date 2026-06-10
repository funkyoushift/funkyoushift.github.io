# FunkYouSHiFT Project Reference - v4.0.0

## Current Site Strategy
The site is now organized for humans first while keeping SEO signals intact.

### Core pages
- `index.html`: short homepage router.
- `borderlands-modding.html`: main SEO authority page for Borderlands modding, modded weapons, save editing, trainers, tools, and Discord help.
- `borderlands-builds.html`: builds, Maxroll planner, creator resources, and Discord feedback.
- `borderlands-resources.html`: toolbox only: mod databases, editors, trainers, GenieBot, Maxroll, creators, Lootlemon, MentalMars, BL4Hunt.
- `borderlands-discord.html`: Discord landing page for trading, modded gear help, giveaways, and active community.

### Merged pages
- `borderlands-modded-weapons.html` → `borderlands-modding.html`
- `borderlands-trading.html` → `borderlands-discord.html`
- `borderlands-build-videos.html` → `borderlands-builds.html`
- `discord.html` → `borderlands-discord.html`

These are redirect/noindex compatibility pages and are not in the sitemap.

### SEO notes
- Sitemap includes only core pages and brand pages.
- Download page and `.exe` are excluded from indexing.
- Canonicals use `https://www.funkyoushift.com/` and `.html` content pages.
- Discord link is the server landing page: https://discord.com/servers/funk-s-borderlands-trading-hub-997021744764289084

### UX rules
- No placeholder phrases like “for SEO.”
- Homepage stays short on mobile.
- Resources should remain a toolbox, not another explanation page.
- Modding explains. Resources links. Discord converts. Builds helps.


## v4.0.1 Resources page rule
Resources stays as one curated toolbox page. Do not split by game unless Search Console shows demand for a specific game query. Use groups: Core BL4 tools, Mod databases/references, Databases/guides/original sources, and Build creators.


## Public copy rule
All visible copy must read like it is written to a Borderlands player. Do not use internal phrases like 'for SEO', 'this page is designed to', 'cleaner toolbox', 'merged into a cleaner page', or other implementation-note wording in public-facing sections.


## v4.0.5
- Replaced FunkYouSHiFT-owned images on third-party creator cards with YouTube video thumbnails from the creators' own content.
- Kept creator links external and nofollow.
- Bumped cache/version to 4.0.5.


## v4.0.25 - Launcher audit notes
Homepage keeps the launcher. Tools/Discord/Modding use compact shortcut bars to reduce mobile scrolling and avoid repeated panels.
