# Theme audit: `xomoashro-them/`

Phase P00 output, 2026-10-06. Confirms and extends `reference/analysis.md`. The theme folder has not been modified.

## 1. Identity and baseline

| Item | Value |
|---|---|
| Theme | Shopify Horizon 4.2.0, unmodified (one commit, "initial") |
| Files | 358 theme files inspected by `theme check`; 42 sections, 95 blocks, 145 snippets, 125 assets, 13 templates, 57 locale files |
| `shopify theme check` | 0 errors, 6 warnings, all in stock files |
| Warnings | `sections/header.liquid`: 42 settings, over the limit of 40. `snippets/divider.liquid`: five unused documented parameters |
| Brand settings | None. Default black and white palette, Inter for every text style |
| Shopify CLI | 4.8.4 installed. No `shopify.theme.toml`, no store linked yet |

The six warnings disappear on their own: the stock header is replaced in P03, and `divider.liquid` is a deletion candidate.

## 2. How the theme is put together

- **Layout.** `layout/theme.liquid` renders, in order: meta tags, stylesheets, fonts, scripts (import map), style variables, colour palette, header group, main content, footer group, cart drawer, theme drawer, search modal, quick-add modal.
- **Templates in use.** `index.json` (hero, product list), `product.json` (product information, recommendations), `collection.json`, `blog.json`, `article.json`, `page.json`, `page.contact.json`, `cart.json`, `search.json`, `404.json`, `password.json`, `list-collections.json`, and `gift_card.liquid`.
- **Section groups.** `header-group.json` (announcements, header) and `footer-group.json` (footer, footer utilities).
- **JavaScript.** 81 ES modules, no build step, loaded through an import map in `snippets/scripts.liquid`. Base class `Component` (`assets/component.js`) with `ref` attributes; typed events in `assets/events.js`; section re-rendering with `section-renderer.js` and `morph.js`.
- **CSS.** `assets/base.css` (45 KB) plus per-file `{% stylesheet %}` blocks in 154 files. Breakpoints 750px and 990px. One `color_palette` setting; no colour schemes.
- **Settings.** 18 groups, 94 values. Four `font_picker` settings (body, subheading, heading, accent).

## 3. What each phase reuses

| Phase | Horizon pieces reused (kept as engine) | Replaced by new `xo-` files |
|---|---|---|
| P02 Design foundation | `snippets/fonts.liquid`, `theme-styles-variables.liquid`, `color-palette.liquid`, `stylesheets.liquid`, `scripts.liquid`; `assets/base.css`, `component.js`, `utilities.js`, `events.js` | Visual defaults overridden in `xo-base.css` and `xo-tokens.liquid` |
| P03 Header | Elements `header-component`, `header-drawer`, `header-actions`, `cart-icon`, `predictive-search-component`; `assets/header.js`, `header-drawer.js`, `cart-icon.js`, `predictive-search.js`; `snippets/measure-header-heights.liquid`, `search-modal.liquid` | `sections/header.liquid`, `snippets/header-drawer.liquid`, `header-row.liquid`, `header-actions.liquid`, `blocks/_header-menu.liquid`, `_header-logo.liquid` |
| P04 Announcement bar | Element `announcement-bar-component` (`assets/announcement-bar.js`) | `sections/header-announcements.liquid`, `blocks/_announcement.liquid` |
| P05 Footer | Customer form for newsletter (pattern in `blocks/email-signup.liquid`), `blocks/payment-icons.liquid` logic | `sections/footer.liquid`, `footer-utilities.liquid`, footer blocks |
| P06 Cart | Elements `cart-drawer-component`, `cart-items-component`, `cart-quantity-selector-component`, `cart-note`, `cart-discount-component`; `assets/cart-drawer.js`, `component-cart-items.js`, `component-cart-quantity-selector.js`, `standard-actions-override.js` | `snippets/cart-drawer.liquid`, `cart-products.liquid`, `cart-summary.liquid`, `sections/main-cart.liquid` |
| P07 Homepage | `add-to-cart-component` (bundles), `accordion-custom` or native `<details>` (FAQ), `snippets/image.liquid` patterns | `sections/hero.liquid`, `product-list.liquid`, `featured-blog-posts.liquid` and other stock homepage sections |
| P08 Product page | Elements `product-form-component`, `variant-picker`, `media-gallery`, `zoom-dialog`, `product-price`, `quantity-selector-component`, `sticky-add-to-cart`, `deferred-media`; `assets/product-form.js` (1,122 lines), `variant-picker.js`, `variant-resolution.js`, `media-gallery.js`, `sticky-add-to-cart.js`; existing product structured data as reference | `sections/product-information.liquid` layout, `blocks/_product-details.liquid`, `buy-buttons.liquid`, `variant-picker.liquid` markup |
| P09 Collection and search | Elements `product-card`, `quick-add-component`, `results-list`, `paginated-list`; `assets/product-card.js`, `quick-add.js`, `paginated-list.js` | `sections/main-collection.liquid`, `search-results.liquid`, `main-404.liquid`, `password.liquid`, product card snippets |
| P10 Content pages | `blocks/contact-form.liquid` pattern (Shopify contact form) | `sections/main-page.liquid` |
| P11 Journal | `assets/blog-posts-list.js`, comment form snippet | `sections/main-blog.liquid`, `main-blog-post.liquid` |
| P13 Popup, P15 Cookie consent | `dialog-component` (`assets/dialog.js`), `assets/focus.js` | New |
| P14 WhatsApp widget | None needed | New. Horizon's `snippets/chat-drawer.liquid` (for Shopify Inbox) stays inert |

Kept untouched: `templates/gift_card.liquid` with `qr-code-generator.js` and `qr-code-image.js`, localization forms, `locales/` (including `ur.json`).

## 4. Risks found in the code

- **`ref` contracts.** Horizon components throw when a required `ref` is missing (`requiredRefs`). New markup must keep the same `ref` names. Read each component's script before writing its replacement markup.
- **Section re-rendering.** Cart and variant updates fetch sections by ID and morph the DOM. A replaced section must keep the element IDs and section names those scripts request, or the scripts must be pointed at the new section names.
- **Header measurement.** `theme.liquid` contains inline script that looks for `#header-component` and `.header__row--top`. The new header keeps those hooks or that script is updated with it.
- **Import map.** New modules that other modules import need an entry in `snippets/scripts.liquid`.
- **Translations.** Stock strings exist in 57 locale files; new `xo` strings will exist only in English until translated. Urdu is the one planned addition.

## 5. Candidates for deletion at launch (P24)

Nothing is deleted before P24 and only from an approved list with proof that nothing references each file. Candidates today:

| Feature | Files |
|---|---|
| Quick order list | `sections/quick-order-list.liquid`, `assets/quick-order-list.js` |
| Product hotspots | `sections/product-hotspots.liquid`, `blocks/_hotspot-product.liquid`, `assets/product-hotspot.js` |
| Layered slideshow | `sections/layered-slideshow.liquid`, `blocks/_layered-slide.liquid`, `assets/layered-slideshow.js` |
| Marquee | `sections/marquee.liquid`, `blocks/_marquee.liquid`, `assets/marquee.js` |
| Collection links | `sections/collection-links.liquid`, `assets/collection-links.js` |
| Jumbo text | `blocks/jumbo-text.liquid`, `snippets/jumbo-text.liquid`, `assets/jumbo-text.js` |
| Comparison slider | `blocks/comparison-slider.liquid`, `assets/comparison-slider.js` |
| Volume pricing | `snippets/volume-pricing-info.liquid`, `assets/volume-pricing.js`, `volume-pricing-info.js`, `price-per-item.js` |
| Local pickup | `assets/local-pickup.js` |
| Swatches | `blocks/swatches.liquid`, `snippets/swatch.liquid`, `swatch-styles.liquid`, `variant-swatches.liquid` |
| Stock sections replaced by `xo-` versions | Header, footer, hero, product list, featured product, slideshow, carousel, media with content and their private blocks, once no template references them |

Kept for later rather than deleted: filters and facets (`blocks/filters.liquid`, `assets/facets.js`, filter snippets). They are unused with one product but needed if the catalogue grows.
