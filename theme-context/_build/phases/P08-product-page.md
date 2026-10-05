# P08 — Product page

Group: Storefront. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A new product page: gallery, proof-led buy box with variant cards and WhatsApp ordering, metafield-driven details, sticky mobile add-to-cart, and long-form sections below.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation, [P06](P06-cart-drawer-and-cart-page.md) Cart drawer and cart page, [P01](P01-store-setup-and-data-model.md) Store setup and data model, [P07](P07-homepage.md) Homepage.
- **Unblocks:** [P09](P09-collection-search-and-utility-pages.md) Collection, search and utility pages, [P16](P16-google-tag-manager.md) Google Tag Manager, [P20](P20-technical-seo.md) Technical SEO, [P21](P21-speed-optimization.md) Speed optimization, [P22](P22-accessibility.md) Accessibility, [P23](P23-responsiveness.md) Responsiveness.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | hard | Phase waits. |
| B1 | Product price(s) in PKR, SKU, net weight, real compare-at price if any, and the full product description. | soft | Product is built with marked placeholders and is not published. |
| B2 | Which sizes are sold: (a) 30g only, offered as 1, 2 or 3 jar packs; (b) 10g, 20g, 60g; (c) another set. | soft | (a), because 30g is the only size in the old site. |
| B3 | Lab report file, lab name, test date, batch number, measured fulvic percentage and heavy-metal values. | soft | All lab claims and lab sections stay hidden. |
| B4 | Guarantee length (7 or 30 days), and the one correct phone number and WhatsApp number. | soft | Guarantee line omitted; WhatsApp button and widget hidden. |
| B18 | Which jar is the current packaging: black lid with copper logo, gold lid, or the green jar? | soft | Black-lid jar, because it is the one on the old live site. |

## Read first

- ../competitor-notes.md (section 3)
- reference/design-system.md
- _build/theme-audit.md (product elements)

## Shopify toolkit and tools

- `shopify-liquid`: search `product object`, `variant`, `metafield` filters, `structured_data`, `content_for "blocks"`; validate.
- Reuse `product-form-component`, `variant-picker`, `media-gallery`, `sticky-add-to-cart`.

## Files

- Create `sections/xo-main-product.liquid`
- Create blocks: `xo-product-gallery`, `xo-variant-cards`, `xo-per-gram-price`, `xo-buy-box`, `xo-delivery-icons`, `xo-batch-lab-row`, `xo-metafield-accordion`, `xo-pdp-anchor-nav`, `xo-beginner-note`
- Create `assets/xo-variant-cards.js`
- Create `sections/xo-spec-grid.liquid`, `sections/xo-precautions.liquid`
- Create `snippets/xo-sticky-atc.liquid`, `snippets/xo-product-jsonld.liquid`
- Modify `templates/product.json`

## Task outline

Expand these into `tasks/P08-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Section shell `xo-main-product` wrapping Horizon's product form, accepting theme blocks and `@app` blocks.
2. Gallery: thumbnails on desktop, swipe on mobile, zoom, video support; first image eager, the rest lazy.
3. Title area: guarantee and lab pills (hidden when empty), title, rating app block slot, three line-icon badges.
4. Price with per-gram line; compare-at shown only when set.
5. Variant cards (not a dropdown): size, days of supply, saving, "best for"; selecting a card updates price, gallery, URL and sticky bar through Horizon's variant events. Works with a single variant.
6. Buy box: quantity, "Add to cart · price", secondary "Order on WhatsApp" with the product title and URL prefilled, beginner note, delivery estimate from shop facts, three reassurance rows, one rotating testimonial line.
7. Batch and lab row from metafields with "View report"; hidden when empty.
8. Accordions: Benefits, How to Use, What's Inside, Sourcing, Safety, Shipping and Returns; each reads a metafield or falls back to the block's default text.
9. Sticky mobile add-to-cart bar appears when the main button leaves the screen; it raises `--xo-bottom-offset` so the WhatsApp button moves up.
10. Below the fold in `product.json`: anchor navigation, spec grid, stats band, results timeline, comparison table, reviews, FAQ, precautions, recommendations (hidden while there is one product).
11. Product structured data: name, image, description, brand, SKU, offers with PKR price and availability, rating only when real reviews exist.

## Best practices for this phase

- The first variant available is preselected; the URL carries `?variant=` on change.
- Never show a compare-at price that was not a real selling price.
- Sold out state: button disabled with clear text, never hidden.
- All product facts come from the product or its metafields; the section holds only fallback copy.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Add to cart from the main button and from the sticky bar; correct variant lands in the cart.
- [ ] Switching variant updates price, per-gram price, image and structured data.
- [ ] With all metafields empty the page still looks complete and shows no blank rows.
- [ ] Rich Results Test passes for Product on the preview URL.
- [ ] Editor: reorder and hide blocks; add an app block.

## Out of scope

Reviews app installation (owner installs Judge.me); subscriptions.
