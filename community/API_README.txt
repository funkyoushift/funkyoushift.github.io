FUNK COMMUNITY LIBRARY - PUBLIC API KIT

Read approved Borderlands 4 community collections from any app or website.
No account, API key, MSBT installation, or extra client dependencies required.

STATUS: Versioned endpoints deployed and public reads verified on 2026-09-30.

Documentation: https://www.funkyoushift.com/community/api.html
Base: https://msbt-community-library.screename53.workers.dev/api/v1
GET /folders?q=Vex&offset=0
GET /folders/{id}
GET /openapi.json

JAVASCRIPT (modern browser or Node 20+)
Copy community-library.js into your project.
Browser: <script src="community-library.js"></script>
Node: const CommunityLibrary = require('./community-library.js');

const library = new CommunityLibrary();
const page = await library.list({query: 'Vex'});
if (page.folders.length) {
  const result = await library.get(page.folders[0].id);
  console.log(result.folder.items);
}

Wrap async calls in your own error handling. Client HTTP errors have a status
property; network failures may not. Browsers require a secure context for digest
verification (HTTPS or localhost). Use local client copies in Electron renderers
with your own restricted IPC boundary; do not grant hosted content Node access.

PYTHON (3.9+)
Copy community_library.py into your project.

import community_library as library
page = library.list_folders('Vex')
if page['folders']:
    result = library.get_folder(page['folders'][0]['id'])
    print(result['folder']['items'])

Python HTTP failures raise urllib.error.HTTPError (inspect .code); integrity or
format errors raise ValueError. Call network functions off the game/UI thread.
Clients do not automatically retry, cache, write files, or touch the game.

DATA CONTRACT
Each collection contains version, title, creator, description, folders, items.
Each item contains name, folder, serial. Preserve exact serial case, duplicates,
order and subfolder labels. Never turn remote labels into filesystem paths.
Both clients verify the SHA-256 digest before returning folder contents.
Folders can change or be withdrawn: a 404 also represents private/unapproved
content. Imported copies should be independent, never silently overwritten.
Use textContent (not innerHTML) for community text in browser interfaces.
Format validation does not prove a code is legitimate or safe to equip.

PAGING AND LIMITS
List returns up to 25 entries and next (offset or null). Pass returned next as
offset to load another page. Ordering can change while paging; do not expect a
snapshot. Search matches title or creator; q is limited to 100 characters.
Current read limit: 120/minute per IP, shared across apps and read routes.
On 429 wait at least 60 seconds. Use bounded backoff for transient failures.
Folder payload budget is 16 MiB. Clients cap responses at that plus 256 KiB.

SECURITY AND ADMIN
This API is read-only. Browser requests work across origins without cookies.
Submissions, account access and moderation are outside this public API.
Admin portal: https://msbt-community-library.screename53.workers.dev/portal
An account does not grant admin access; the owner must assign a team role.
Never distribute admin passwords, cookies, or submission ownership keys.

LOCAL TESTS
node --test test_clients.cjs
python -m unittest test_client.py

Files are plain editable source; nothing needs npm/PyPI publication.
