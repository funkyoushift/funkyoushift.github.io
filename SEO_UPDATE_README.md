# FunkYouSHiFT SEO Update v1 - Install Notes

## What this ZIP contains
This is a deployable patch set for FunkYouSHiFT.com SEO/schema work. It includes updated versions of:

- `index.html`
- `discord.html`
- `merch.html`
- `giveaway.html`
- `gallery.html`
- `donate.html`
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `PROJECT_NOTES_FUNKYOUSHIFT.md`
- `CHANGELOG_FUNKYOUSHIFT.md`

## How to install
Upload/replace these files at the site root, keeping existing `/images/`, `/slideshow/`, and `style.css` files in place.

This ZIP does not include the image folder to keep the package small. The HTML references the existing image files already used by the site.

## Important
The SEO update assumes these image files already exist:

- `/images/fu-logo-2026.png`
- `/images/team-funkyoushift-people-2026.jpg`
- `/images/team-funkyoushift-bots-2026.jpg`
- `/images/favicon.ico`

## What changed
- Added consistent titles, descriptions, canonical URLs, Open Graph, Twitter cards, robots meta, and JSON-LD schema to every major page.
- Added `llms.txt` for AI/search discovery.
- Improved sitemap with lastmod, changefreq, and priority.
- Updated project notes/changelog so future edits have context.


## v2.1.7 Search Console follow-up
After pushing this version:
1. Confirm https://www.funkyoushift.com/sitemap.xml loads and shows the preferred www canonical URLs.
2. In Search Console, keep/sub submit only https://www.funkyoushift.com/sitemap.xml and remove any old non-www sitemap submission.
3. Validate fixes for canonical, page redirect, video indexing, and donate structured data after Cloudflare redirects are configured.
4. Configure Cloudflare to redirect http -> https, apex/non-www -> www, and /index.html -> /.

Preferred domain for this deploy is https://www.funkyoushift.com/. Keep only the www sitemap submitted in Search Console unless you intentionally change Cloudflare/GitHub to apex-only later.
