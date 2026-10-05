# P09 — Collection, search and utility pages

Group: Storefront. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Redesigned collection, search results, 404 and password pages, and a product card used everywhere.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation, [P08](P08-product-page.md) Product page.
- **Unblocks:** [P20](P20-technical-seo.md) Technical SEO, [P21](P21-speed-optimization.md) Speed optimization, [P22](P22-accessibility.md) Accessibility, [P23](P23-responsiveness.md) Responsiveness.

## Decisions needed from the owner

None. This phase can run without owner input.

## Read first

- ../competitor-notes.md (Other pages: Collection)
- _build/theme-audit.md

## Shopify toolkit and tools

- `shopify-liquid`: search `collection object`, `paginate`, `predictive search`, `search object`; validate.

## Files

- Create `snippets/xo-product-card.liquid`
- Create `sections/xo-main-collection.liquid`, `xo-search.liquid`, `xo-main-404.liquid`, `xo-password.liquid`
- Modify `templates/collection.json`, `search.json`, `404.json`, `password.json`, `list-collections.json`

## Task outline

Expand these into `tasks/P09-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Product card: image, title, one-line benefit (metafield or product subtitle), rating slot, price, per-gram price, badge, quick add.
2. Collection page: heading and description from the collection, grid of cards, pagination; looks good with one product (wide single card with a short pitch) as well as many.
3. Search results: same card for products, simple rows for articles and pages, helpful empty state with links to the product and the journal.
4. 404: short message, search field, buttons to home and the product. The old site's 404 button linked nowhere.
5. Password page in the brand style with newsletter signup, for the pre-launch period.
6. Keep `gift_card.liquid` working; restyle only fonts and colours.

## Best practices for this phase

- Pagination uses real links so crawlers can follow them.
- Search results pages stay `noindex` (Shopify default).
- Card links use `product.url` without a collection path where a canonical URL matters.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Collection renders correctly with 1, 2 and 12 products (use draft test products).
- [ ] Quick add works.
- [ ] 404 returns HTTP 404 and shows the designed page.
- [ ] All text editable in the editor.

## Out of scope

Filters and sorting UI (not needed until the catalogue grows; Horizon's facets code is kept for later).
