# P06 tasks

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Test product in the store (B21): "TEST – do not buy", sizes 1, 2 and 3 jars at placeholder prices, three photos from Files, weight and supply days per size, Online Store only | `_build/store-setup/test-product-set.graphql`, `test-product-variables.json`, `publications.graphql`, `publish.graphql` | GraphQL validated with the toolkit; read back: 3 photos ready, 3 sizes for sale, weight and days saved | done |
| 2 | Free delivery bar | `snippets/xo-free-shipping-bar.liquid` | Hidden with no free delivery amount; with a test amount it shows the amount left and fills, then "You have free delivery" once the total reaches it | done |
| 3 | Cart line and line list | `snippets/xo-cart-line.liquid`, `snippets/xo-cart-lines.liquid` | Picture, title, size, weight, price, quantity, Remove; keeps every hook Horizon's cart script needs | done |
| 4 | Summary: note, discount code, total, cash on delivery note, checkout, trust lines | `snippets/xo-cart-summary.liquid`, `snippets/xo-cart-trust.liquid` | Note saved to the cart; total updates in place; orange only on Check out | done |
| 5 | Suggested product | `snippets/xo-cart-upsell.liquid` | Shows when set; Add puts it in the cart without reload; hides once in the cart | done (tested with a temporary setting, see report) |
| 6 | Empty state | `snippets/xo-cart-empty.liquid` | Removing the last item shows it without reload; button goes to the product | done |
| 7 | Drawer | `snippets/xo-cart-drawer.liquid`, `sections/cart-drawer-section.liquid`, `layout/theme.liquid` | Opens after add to cart; focus kept inside; Escape closes; Check out stays visible at 360, 768 and 1280px | done |
| 8 | Cart page | `sections/xo-main-cart.liquid`, `templates/cart.json` | Same lines and summary in two columns; Remove works without reload | done |
| 9 | Settings and strings | `config/settings_schema.json`, `config/settings_data.json`, `locales/en.default.json`, `locales/en.default.schema.json` | Toolkit validation and theme check pass | done |
| 10 | Homepage fixes found while testing | `templates/index.json`, `sections/xo-course-bundles.liquid`, `sections/xo-benefits-grid.liquid`, `sections/xo-purity-test.liquid` | Size cards use the test product; weights read "30 g", not "30.0 g"; no sideways scroll when the drawer squeezes the page | done |
| 11 | Checkout hand-off | none (checkout not changed) | Check out reaches Shopify checkout with the cart | partly: the checkout link is created; its page is behind the store password in the test browser |
