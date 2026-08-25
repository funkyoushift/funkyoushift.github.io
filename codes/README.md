# FunkYouBoostingTools · BL3 codes

Community serial browser + submit form for **Borderlands 3**.

| Home | URL |
| --- | --- |
| Live codes + submissions | https://www.funkyoushift.com/codes/ |
| Form POST | `POST https://www.funkyoushift.com/codes/api/submit` |
| App download / updates | https://github.com/funkyoushift/FunkYouBoostingTools (Releases when they exist) |
| Support | https://github.com/funkyoushift/FunkYouBoostingTools/issues |
| Discord | https://discord.com/servers/funk-s-borderlands-trading-hub-997021744764289084 |
| Hub | https://www.funkyoushift.com/ |

This folder is **not** the download host. The Electron app stays on GitHub.

Author: FunkYouSHiFT · License: PolyForm Noncommercial

## What already exists on funkyoushift.com

- Apex `funkyoushift.com` → 301 → `https://www.funkyoushift.com/`
- DNS is **Cloudflare** in front of **GitHub Pages**
- Source repo: [funkyoushift/funkyoushift.github.io](https://github.com/funkyoushift/funkyoushift.github.io)
- `/codes` was a 404 until this collector was added under `codes/`
- GitHub Pages is static. It can serve the browser and `data/codes.json`. It cannot run `server.js`.
- Submissions therefore POST to a **Cloudflare Worker** on the same host: `/codes/api/*`

## Form field schema (Electron reuse)

`schema/submission.fields.json` and `shared/fields.js` — keep these names:

`name`, `serial`, `type`, `rarity`, `manufacturer`, `notes`, `submitter`, `discord`, `imageUrl`

`serial` must match `BL3(` + base64 + `)`.

Later, FunkYouBoostingTools Items/Spawn should POST the same JSON to:

`https://www.funkyoushift.com/codes/api/submit`

CORS is open (`*`) so the Electron panel can call it.

## How submissions land on funkyoushift.com

1. Browser (or Electron) POSTs JSON to `/codes/api/submit`.
2. The Cloudflare Worker validates the serial and **commits** the row to
   `codes/data/submissions.json` in `funkyoushift.github.io` (pending).
3. FunkYouSHiFT opens https://www.funkyoushift.com/codes/review.html with
   `REVIEW_KEY`, or runs `node review.js pending` against a local copy.
4. Approve writes the item into `codes/data/community.json` (live community
   catalog). The Lootlemon seed in `data/codes.json` is not rewritten.
5. The public browser merges `data/codes.json` + `data/community.json`.

Images: live collector accepts `imageUrl`. Big data-URL uploads are for the
local Node server only (GitHub file size).

## Run locally

```bat
cd /d "C:\src\BL3 Funk\web"
node seed.js
node server.js
```

Open http://127.0.0.1:8787/ — on localhost the form posts to the Node server.
Same field names as production.

## Deploy the static site (GitHub Pages)

From this repo, copy `web/` public files into `funkyoushift.github.io/codes/`:

- `index.html`, `styles.css`, `app.js`, `config.js`, `review.html`
- `logo.webp`, `favicon.ico`
- `shared/`, `schema/`, `data/codes.json`, `data/community.json`
- empty `data/submissions.json`
- `.nojekyll`

Push to `main`. Wait for Pages, then purge Cloudflare cache for `/codes/*`.

Hub homepage should link **BL3 Codes** → `/codes/`.

DNS is already correct (Cloudflare → GitHub Pages). No new DNS records.

## Attach the collector Worker (required for the live form)

GitHub Pages cannot accept POST. One-time Cloudflare step:

```bat
cd /d "C:\src\BL3 Funk\web\cloudflare"
npx wrangler login
npx wrangler secret put GITHUB_TOKEN
npx wrangler secret put REVIEW_KEY
npx wrangler deploy
```

`GITHUB_TOKEN` needs `contents:write` on `funkyoushift.github.io` only.
`REVIEW_KEY` is a password you invent for review.html.

Then in Cloudflare → Workers → this worker → **Triggers / Custom domains**:

`www.funkyoushift.com/codes/api/*`

Their existing Cloudflare API token cannot edit Rules (error 10000). This
Worker route is the path that does not need those Rules permissions.

Until the Worker is attached, the browse page is live from Pages, but Submit
returns 404. Use **Download JSON instead** only as a backup.

## What’s left for FunkYouSHiFT

1. If Submit still 405s, attach the Worker route in Cloudflare → Workers →
   `funkyoushift-bl3-codes` → Triggers: `www.funkyoushift.com/codes/api/*`
2. Secrets (if not already set):
   `npx wrangler secret put GITHUB_TOKEN`
   `npx wrangler secret put REVIEW_KEY`
   `GITHUB_TOKEN` needs `contents:write` on `funkyoushift.github.io` only.
3. Optional later: FunkYouBoostingTools Items/Spawn can POST the same JSON.

Do not put Discord tokens on this site. Do not host the `.exe` here.
