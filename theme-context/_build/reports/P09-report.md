# P09 report — Collection, search and utility pages

Date: 2026-10-16. Branch: `phase/P09-collection-search-and-utility-pages`.

## 1. Result

The catalog, search, 404 and coming-soon (password) pages are rebuilt in the Xomoashro design, with one product card used everywhere a product is listed. Every acceptance check passed except two:
- **The Theme Editor check** needs your login.
- **The 2- and 12-product checks** were done with a temporary preview-only change, not with real extra products, because you did not ask for test products to be created.

The coming-soon page is what visitors see today, while the store is password protected. It goes live only when the theme is pushed to the live theme.

## 2. What changed

**Product card** (`snippets/xo-product-card.liquid`): photo, title and a one-line benefit (the product's subtitle, or else the start of its description), plus:
- **Rating:** only once a reviews app saves a real rating.
- **Price:** "From Rs X" when sizes differ, plus the price per gram.
- **Badge:** "Sold out", or "Sale" when there is a real compare-at price.
- **Quick add:** a size list and an Add to cart button. Quick add uses Horizon's product form, so the cart drawer opens with the item, exactly as on the product page.

**Catalog page** (`sections/xo-main-collection.liquid`): eyebrow, collection title, description and product count, then the cards. Page links are plain links that Google can follow (12 per page by default).
- **One product:** a single wide card with a large photo, a short pitch, the size list and an orange Add to cart. This is what the store shows now.
- **Two or more products:** a grid of 2 columns on phones and up to 3 on computers. It never leaves empty columns: two products fill two columns.
- **Collections list** (`/collections`) shows the same thing under the heading "Shop", since the store has one collection.

**Search** (`sections/xo-search.liquid`):
- A search bar, product cards, and rows for journal posts and pages.
- When nothing matches, it says so, with buttons to the shilajit and the journal.
- Search result pages now carry `noindex`. Shopify's robots.txt no longer blocks `/search`, so without it, search pages could end up in Google.

**404** (`sections/xo-main-404.liquid`): a large "404", "This path leads nowhere", a search bar, and buttons "Shop Shilajit" and "Back to home". The old site's 404 button linked nowhere.

**Coming soon page** (`sections/xo-password.liquid`):
- Dark, full screen, with the jar-on-mountain-rock picture and the light Xomoashro logo.
- Headline "Our new store is almost ready", a short text and an email signup ("Notify me"). Signups are saved as customers tagged `newsletter, prelaunch`.
- Three points: Cash on delivery, Delivery across Pakistan, Sourced above 16,000 ft.
- If you set a password message in Online Store → Preferences, it replaces the text.
- "Enter using password" and the owner login link still work. `layout/password.liquid` now loads the xo styles so the page can use them.

**Gift card page:** unchanged. It already uses the theme's font and colour settings, which are the brand's.

## 3. Acceptance checks

Screenshots are in `reports/P09-screens/`.

| Check | Result | Evidence |
|---|---|---|
| Catalog with 1 product | Pass. Wide card; no sideways scroll | `collection-1-product-1280.png` |
| Catalog with 2 and 12 products | Pass, by temporary preview change. The real product was shown 2 and 12 times, then the change was removed. 12 products: 3 columns on computers and tablets, 2 on phones. 2 products: 2 even columns | `collection-12-products-1280.png`, `-768.png`, `-360.png`, `collection-2-products-1280.png` |
| Quick add works | Pass. Choosing "2 jars" on the card and pressing Add to cart put "2 jars × 1" in the cart and opened the drawer | test log |
| 404 returns HTTP 404 and shows the designed page | Pass. `/pages/this-does-not-exist` and `/products/no-such-product` both return 404 | `page-404-1280.png` |
| Search | Pass. "shilajit" finds 1 product; "qqzzxx" shows the empty state; no search term shows the search bar and suggestions; `noindex, follow` on search pages only | `search-results-1280.png`, `search-none-1280.png`, `search-empty-1280.png` |
| Coming soon page | Pass at 360 and 1280px. The signup form is present, and "Enter using password" opens the password box | `password-1280.png`, `password-360.png` |
| All text editable in the editor | Every heading, text, button label and point is a section setting, and validation passes. **The click-through needs your Theme Editor login** | |
| Other pages unaffected | Homepage, product page and cart return 200 with no errors | test log |
| Toolkit validation and theme check | Pass on all files; theme check 0 errors, 18 warnings (unchanged from before P09) | |

## 4. Defaults taken

- **Catalog heading:** the collection's own title. Shopify calls the all-products collection "Products". You can type a different heading in the Theme Editor.
- **Coming soon picture:** the homepage hero picture. Logo: your light logo from Theme settings, or the built-in one.
- **Card text:** the product's subtitle when you fill it in, otherwise the start of the description. Fill the subtitle on the real product for a clean one-liner.
- **Shared styles** for the card grid, search bar and rating stars moved to `assets/xo-base.css`, so the product page, catalog, search and 404 use one copy.

## 5. Open items

- **Store name** (from P08, still open): it is "https://xomoashro.com/". It appears in every page title, including "404 Not Found – https://xomoashro.com/". Change it to "Xomoashro" in Settings → General.
- **Theme Editor click-through** for P08 and P09.
- **Live theme:** P06, P08 and P09 are not on the live theme yet. Visitors still see the old coming-soon page.

## 6. Next

P10 Content pages.
