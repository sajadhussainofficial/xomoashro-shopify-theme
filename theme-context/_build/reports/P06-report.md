# P06 report — Cart drawer and cart page

Date: 2026-10-15. Branch: `phase/P06-cart-drawer-and-cart-page`.

## 1. Result

The cart drawer and the cart page are rebuilt in the Xomoashro design on top of Horizon's own cart engine, so adding, changing and removing items all happen without a page reload. A test product is in the store so the cart could be tested end to end.

Every acceptance check passed except one, which is partly verified: Check out creates a real Shopify checkout for the cart, but its page sits behind the store password, which this test browser does not have. Please try Check out once yourself (section 4).

The free delivery bar is built and tested, but it stays hidden until you save a free delivery amount (decision B9).

## 2. Test product

Created in the store on 2026-10-15 at your request (B21): **"TEST – do not buy"**, handle `test-do-not-buy`, product id `gid://shopify/Product/9618867585196`.

| Size | Price (placeholder) | SKU | Weight | Days | Badge |
|---|---|---|---|---|---|
| 1 jar | Rs 1,000 | TEST-1JAR | 30 g | 30 | |
| 2 jars | Rs 1,900 | TEST-2JAR | 60 g | 60 | Most popular |
| 3 jars | Rs 2,700 | TEST-3JAR | 90 g | 90 | |

- Status active, published to the Online Store only (not Point of Sale), stock not tracked.
- Three photos from Files: jar on the mountain rock, jar on black stone, jar cut-out.
- Tagged `test-product` and `delete-before-launch`.

**When you replace it with the real product:**
- Change the homepage "Sizes" section's product (Theme Editor → Home → Sizes → Product).
- Then delete the test product.

Nothing else points at it: the empty cart button finds the store's only product by itself.

## 3. Files

| File | What it is |
|---|---|
| `snippets/xo-cart-drawer.liquid` | The drawer. Keeps Horizon's drawer structure and hooks, so opening, updates, focus and Escape come from Horizon |
| `sections/xo-main-cart.liquid` | The cart page: lines on the left, order summary on the right from 990px, stacked below |
| `snippets/xo-cart-line.liquid`, `xo-cart-lines.liquid` | One cart line (picture, title, size and weight, price, quantity, Remove) and the list of lines |
| `snippets/xo-cart-summary.liquid` | Order note, discount code, total, tax line, cash on delivery note, Check out, express checkout buttons |
| `snippets/xo-cart-trust.liquid` | The three trust lines with icons |
| `snippets/xo-free-shipping-bar.liquid` | "Add Rs X more for free delivery" with a progress line, or "You have free delivery" |
| `snippets/xo-cart-upsell.liquid` | One suggested product with an Add button |
| `snippets/xo-cart-empty.liquid` | Empty cart message with a "Shop Shilajit" button |
| `sections/cart-drawer-section.liquid`, `layout/theme.liquid` | Now render the new drawer |
| `templates/cart.json` | Cart page uses the new section. Horizon's "product list" under the cart was removed: with one product it repeated the item already in the cart |
| `config/settings_schema.json` | New settings in Theme settings → Cart (section 6) |
| `config/settings_data.json` | Drawer opens by itself after Add to cart |
| `locales/en.default.json`, `en.default.schema.json` | Cart strings and editor labels |
| `templates/index.json` | Homepage Sizes section now uses the test product |
| `sections/xo-course-bundles.liquid` | Fix: weights show "30 g", not "30.0 g" (first seen with real data) |
| `sections/xo-benefits-grid.liquid`, `xo-purity-test.liquid` | Fix: on computers Horizon pushes the page aside when the drawer opens; these two sections overflowed sideways in the narrower space. Their layout now follows the section's own width |
| `_build/store-setup/test-product-set.graphql`, `test-product-variables.json`, `publications.graphql`, `publish.graphql` | Store commands used to create and publish the test product |

Horizon's own `snippets/cart-drawer.liquid` is no longer used. It is kept, not deleted; say if you want it removed.

## 4. Acceptance checks

Tested on the local preview (`shopify theme dev`) with Playwright. Screenshots are in `reports/P06-screens/`.

| Check | Result | Evidence |
|---|---|---|
| Add to cart from the homepage | Pass. Choosing "2 jars" and Add opens the drawer with "2 jars · 60 g · Rs 1,900"; header count 0 → 1 | `drawer-1280.png` |
| Change quantity without reload | Pass. + makes 2 (line Rs 3,800, total Rs 3,800, title "2 items", header 2); − returns to 1; no page navigation | test log |
| Remove without reload | Pass. On the cart page, removing one of two lines leaves 1 item, total and header count updated, no navigation | test log |
| Empty without reload | Pass. Removing the last item in the drawer shows the empty state; header count 0; button goes to `/products/test-do-not-buy` | `drawer-empty-360.png` |
| Header count stays right | Pass at every step above | test log |
| Screen reader announcements | Pass. A hidden status line updates after each change, for example "2 items in your cart. Total Rs.3,800.00." | test log |
| Progress bar crosses the amount | Pass, with a temporary test amount of Rs 3,000 (since removed). Rs 1,900 shows "Add Rs.1,100 more" at 63%; Rs 3,800 shows "You have free delivery" at 100%; back to 63% at Rs 1,900 | `drawer-bar-below-1280.png`, `drawer-bar-reached-1280.png` |
| Focus kept in the drawer, Escape closes | Pass. Computers: 30 Tab presses never left the drawer; Escape closed it and focus went back to the cart button. Phones: native modal; focus only passes through the browser's own address bar, never to the page behind | test log |
| Check out reaches Shopify checkout | **Partly.** The button posts the cart and Shopify returns a checkout link (`/checkouts/cn/…/en-pk`, status 200). The test browser is then sent to the store password page, so the checkout contents were not seen | `checkout-reached-1280.png` |
| Suggested product | Pass, with a temporary setting (since removed): the test product's 1 jar was suggested while 2 jars was in the cart; Add put it in the cart without reload and the suggestion then hid | `drawer-upsell-note-1280.png` |
| Order note | Pass, with the note temporarily switched on (since switched off). Typed text was saved to the cart | `drawer-upsell-note-1280.png` |
| Widths | 360, 768 and 1280px: no sideways scroll; Check out stays in view at the bottom of the drawer | `drawer-360.png`, `drawer-768.png`, `drawer-1280.png`, `cart-page-1280.png` |
| Toolkit validation | Pass on every new and changed file | |
| Theme check | 0 errors, 16 warnings. The 10 new ones are listed below | |

New theme-check warnings, all expected:
- Horizon's unused `cart-drawer` snippet is reported as orphaned.
- Some Horizon class names I kept on purpose, because Horizon's scripts look for them, are reported as "may be defined outside this file".

**Please test Check out once while logged in to the store preview.** Add a size, open the cart and press Check out. You should see Shopify checkout listing the same item and total. Do not complete the order.

## 5. Defaults taken

- **The drawer opens by itself after Add to cart.** Horizon's setting was off. Turn it off in Theme settings → Cart.
- **Order note is off,** as before. Switch it on in Theme settings → Cart if you want delivery instructions.
- **Trust lines:**
  - "Delivery across Pakistan" and "100% resin, no fillers", reusing the homepage wording.
  - "[days]-day money-back guarantee", which shows "7-day" from your store facts.
- **Cash on delivery note:** "Pay in cash when your order arrives."
- **Suggested product:** none set, so it is hidden. With one product in the store there is nothing else to suggest.
- **The suggestion is a theme setting, not a block.** The plan named a block, but Horizon draws the drawer from the layout, where blocks cannot be added. One setting now drives both the drawer and the cart page.
- **The total shows the currency code** ("Rs.1,900.00 PKR"). This is Horizon's setting "Show currency codes" for cart totals.

## 6. Settings you can edit

Theme settings → Cart → Xomoashro cart:
- Cash on delivery note.
- Three trust lines, each with an icon. `[days]`, `[amount]` and `[delivery]` fill in from store facts, and a line hides itself until its fact is saved.
- Suggested product and its heading.

Horizon's existing cart settings still apply: drawer or page, open after add, order note, discount code, express checkout buttons, empty cart button link.

Theme Editor → Cart page section: background tone, heading, "Continue shopping" link.

## 7. Open items

- **B9:** free delivery amount and shipping fee. Save the amount in Settings → Custom data → Shop → "Free delivery from (PKR)" and the bar appears.
- **Check out:** your one check from section 4.
- **B1/B2:** real product details and prices replace the test product.
- **Live theme:** this work is pushed only to the unpublished working copy. Publishing still waits for your "yes, publish".

## 8. Next

P08 Product page.
