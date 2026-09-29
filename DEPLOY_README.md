# Current deployment

The live site uses GitHub Pages from the main branch of funkyoushift/funkyoushift.github.io, proxied by Cloudflare. Validate changes with `python validate_site.py`, push reviewed commits, and verify the Pages build and live pages. The phone install page is served from the MattsSDKBoostingTools repository docs directory at its existing URL.

The September 29 release update documents Borderlands 4 Modding Tools — Powered by Funk v2.21.0 and Android v1.4.3. Download links point to GitHub Releases; preserve the legacy URLs and filenames.

## Historical deployment notes

# FunkYouSHiFT v3.1.0 Full Human Tone + SEO Pass

Upload the contents of this ZIP to the site root, replacing existing files.

## What changed
- Edited the actual site HTML files directly.
- Rewrote visible copy across all public pages to sound more like FunkYouSHiFT and less like a generic landing page.
- Updated SEO titles and meta descriptions while keeping the user-facing copy natural.
- Kept the homepage click-to-load Twitch player so Twitch is still available without hurting initial mobile speed.
- Kept Lootlemon as a direct resource link because it blocks iframe embedding.
- Updated project reference/changelog and cache-busted CSS to v3.1.0.

## Deploy notes
- Replace the full site root with this package.
- After deploy, clear Cloudflare cache.
- Re-test mobile homepage and a few inner pages in PageSpeed/Search Console.

## v3.2.0 deploy notes
Upload the full ZIP contents. Submit/inspect sitemap at https://www.funkyoushift.com/sitemap.xml in Search Console. Use the www property and keep `.html` page URLs consistent with sitemap/canonicals.


## v3.2.1 deploy notes
- Deploy `gallery-manifest.js` with the site root.
- Keep the `/slideshow/` folder included; the gallery uses that manifest and hides any missing image cards automatically.
