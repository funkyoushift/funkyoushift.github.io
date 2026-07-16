# Cloudflare setup for FunkYouSHiFT

The website is deployed by GitHub Pages and proxied through Cloudflare. GitHub Pages does not process the repository's `_redirects` file, so production redirects must be configured at Cloudflare.

## Redirects

In **Cloudflare > Rules > Redirect Rules**, create permanent (301) static redirects for these paths on `www.funkyoushift.com`:

| Old path(s) | Destination |
| --- | --- |
| `/index.html` | `/` |
| `/discord`, `/discord.html`, `/borderlands-discord` | `/borderlands-discord.html` |
| `/borderlands-trading`, `/borderlands-trading.html` | `/borderlands-discord.html` |
| `/borderlands-modded-weapons`, `/borderlands-modded-weapons.html` | `/borderlands-modding.html` |
| `/borderlands-build-videos`, `/borderlands-build-videos.html` | `/borderlands-builds.html` |
| `/tools`, `/resources`, `/editors`, `/save-editors`, `/modding-tools`, `/borderlands-tools` | `/borderlands-resources.html` |
| `/sdk-mods`, `/pc-mods`, `/borderlands-sdk-mods`, `/borderlands-save-editors`, `/borderlands-editor`, `/item-editor` | `/borderlands-resources.html` |
| `/downloads/borderlands-4-trainer.html`, `/downloads/Borderlands%204.exe` | `https://github.com/funkyoushift/MattsSDKBoostingTools/releases/latest` |

Preserve query strings and use status code 301. Keep the small `noindex` HTML fallback pages until these rules are confirmed live; they prevent old links from becoming dead links.

## Analytics baseline

Enable **Cloudflare Web Analytics** for `www.funkyoushift.com`. It provides privacy-focused traffic and page-view reporting without adding Google Analytics to every page. Use the first 30 days as the baseline for:

- visits landing on the homepage, Tools, Modding, Builds, and Discord pages;
- top search landing pages and referrers;
- mobile versus desktop traffic.

Cloudflare Web Analytics does not report custom CTA click events. If exact Twitch, Discord, and Matt's Tools button conversions are needed, add GA4 or another event-capable analytics service as a separate follow-up. Cloudflare analytics also does not replace Google Search Console. Keep `https://www.funkyoushift.com/sitemap.xml` submitted in Search Console and review Queries and Pages monthly.

## Current API limitation

The connected Cloudflare API can read the zone and DNS records, but it cannot currently manage Rules or Web Analytics (Cloudflare error 10000). Grant Rules edit and Web Analytics edit access before trying to automate these two dashboard steps.
