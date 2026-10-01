"""Read-only client for the existing MSBT community library. No SDK dependency."""
import hashlib
import json
import re
import urllib.parse
import urllib.request

ENDPOINT = 'https://msbt-community-library.screename53.workers.dev'
WEBSITE = 'https://www.funkyoushift.com/community/'
MAX_BYTES = 16 * 1024 * 1024 + 262144
ID = re.compile(r'[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}', re.I)
SERIAL = re.compile(r'@U[0-9A-Za-z!#$%&()*+\-;<=>?@^_`{/}~]+')


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        raise ValueError('The library redirected the request. Nothing imported.')


def folder_id(value):
    value = value.strip()
    if ID.fullmatch(value):
        return value
    url = urllib.parse.urlsplit(value)
    origin = f'{url.scheme}://{url.netloc}'
    if origin == ENDPOINT and not url.query and not url.fragment:
        match = re.fullmatch(r'/(?:share|folders|api/v1/folders)/([^/]+)', url.path)
        if match and ID.fullmatch(match[1]):
            return match[1]
    if origin == 'https://www.funkyoushift.com' and url.path == '/community/' and not url.query and ID.fullmatch(url.fragment):
        return url.fragment
    raise ValueError('Copy a community folder link or ID first.')


def request(route):
    req = urllib.request.Request(ENDPOINT + '/api/v1' + route, headers={'User-Agent': 'Funk-Community-Library/1', 'Accept': 'application/json'})
    with urllib.request.build_opener(NoRedirect).open(req, timeout=30) as response:
        raw = response.read(MAX_BYTES + 1)
    if len(raw) > MAX_BYTES:
        raise ValueError('Library response exceeds the size limit.')
    data = json.loads(raw)
    if data.get('ok') is not True:
        raise ValueError('Library request failed.')
    return data


def validate(data):
    folder = data.get('folder')
    if not isinstance(folder, dict) or folder.get('version') != 1:
        raise ValueError('Unsupported folder format.')
    # The service stores its canonical, ordered JSON. Reproduce that UTF-8 wire form.
    canonical = json.dumps(folder, ensure_ascii=False, separators=(',', ':'), allow_nan=False).encode('utf-8')
    if len(canonical) > 16 * 1024 * 1024 or hashlib.sha256(canonical).hexdigest() != data.get('digest'):
        raise ValueError('Folder integrity check failed.')
    if not isinstance(folder.get('items'), list) or not folder['items']:
        raise ValueError('Folder has no items.')
    for key in ('title', 'creator', 'description'):
        if not isinstance(folder.get(key), str):
            raise ValueError('Invalid folder metadata.')
    if not isinstance(folder.get('folders'), list) or any(not isinstance(p, str) for p in folder['folders']):
        raise ValueError('Invalid subfolders.')
    for item in folder['items']:
        if not isinstance(item, dict) or not all(isinstance(item.get(k), str) for k in ('name', 'folder', 'serial')) or not SERIAL.fullmatch(item['serial']):
            raise ValueError('Invalid item data. Nothing imported.')
    return folder


def get_folder(link):
    ident = folder_id(link)
    data = request('/folders/' + ident)
    validate(data)
    if data.get('id') != ident:
        raise ValueError('The library returned a different folder.')
    return data


def list_folders(query='', offset=0):
    if not isinstance(offset, int) or not 0 <= offset <= 100000:
        raise ValueError('Invalid page.')
    return request('/folders?' + urllib.parse.urlencode({'q': query[:100], 'offset': offset}))

