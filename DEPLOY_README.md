# FunkYouSHiFT v2.0.2 Deploy Notes

Upload this package over the current site root.

## Main changes
- Merch previews are now clickable shopping cards.
- Homepage merch art links to the merch page.
- Gallery merch artwork points to the merch store instead of opening raw image files.
- Version/cache busting updated to `style.css?v=2.0.2`.

## After upload
1. Hard refresh the site.
2. Open `/merch.html` and click each merch preview.
3. Confirm they open the Streamlabs merch store in a new tab.
4. Open homepage and confirm merch art/card links work.
5. Open gallery and confirm merch-related cards send users toward merch shopping.

## Note on item-level Streamlabs links
The site currently has one stable Streamlabs merch storefront URL. If Streamlabs provides exact item-level URLs later, replace the individual merch card `href` values in `merch.html`.
