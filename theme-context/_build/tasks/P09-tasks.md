# P09 tasks

No owner decisions needed. The owner did not answer whether to create extra test products, so nothing was written to the store: the 2- and 12-product layouts were checked with a temporary preview-only change, removed afterwards.

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Product card: photo, title, one-line benefit, rating (only when real), price, price per gram, badge, quick add with a size list | `snippets/xo-product-card.liquid` | Quick add puts the chosen size in the cart and opens the drawer | done |
| 2 | Catalog page with a wide card for a single product, grid otherwise, page links | `sections/xo-main-collection.liquid`, `snippets/xo-pagination.liquid`, `templates/collection.json`, `templates/list-collections.json` | Looks right with 1, 2 and 12 products at 360, 768 and 1280px | done (2 and 12 by temporary preview change) |
| 3 | Search results: product cards, rows for journal posts and pages, helpful empty state; kept out of Google | `sections/xo-search.liquid`, `templates/search.json`, `snippets/meta-tags.liquid` | Results, no results and no query all render; `noindex` on search only | done |
| 4 | 404 page with search and buttons to the product and home | `sections/xo-main-404.liquid`, `templates/404.json` | Missing pages return HTTP 404 and show the designed page | done |
| 5 | Coming soon (password) page in the brand style with email signup; owner password entry kept | `sections/xo-password.liquid`, `templates/password.json`, `layout/password.liquid` | Renders at 360 and 1280px; "Enter using password" opens the password box | done |
| 6 | Gift card page keeps working | `templates/gift_card.liquid` | Already uses the theme's font and colour settings (Manrope, obsidian, bone); no change needed | done, unchanged |
| 7 | Shared styles, strings and checks | `assets/xo-base.css`, `blocks/xo-product-heading.liquid`, `locales/en.default.json`, `en.default.schema.json` | Toolkit validation and theme check pass | done |
