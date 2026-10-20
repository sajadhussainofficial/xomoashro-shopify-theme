# P25 — Real product data

Group: Storefront. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

Created on 2026-10-20 at the owner's request: the owner is gathering the product facts and will give them in this phase. It runs last, just before launch (P24), because the store cannot launch with the TEST product.

## Goal

Replace "TEST – do not buy" with the real product: price, sizes, description, photos of all three jar designs, metafields and Google fields. Connect it everywhere the theme shows a product.

## Dependencies

- **Needs finished first:** [P08](P08-product-page.md) Product page, [P12](P12-content-import.md) Content import.
- **Unblocks:** [P24](P24-launch.md) Final QA and launch.

## Decisions needed from the owner

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B1 | Product price(s) in PKR, SKU, net weight, real compare-at price if any, and the full product description. | hard | Phase waits; launch waits. |
| B2 | Which sizes are sold: (a) 30g only, offered as 1, 2 or 3 jar packs; (b) 10g, 20g, 60g; (c) another set. | hard | Phase waits. |
| B3 | Lab report file, lab name, test date, batch number, measured fulvic percentage and heavy-metal values. | soft | Lab rows and the "lab tested" line stay hidden. |
| B4 | The one correct phone number (WhatsApp is known). | soft | Phone not shown. |

Already answered: B18, use all three jar designs (2026-10-20).

## What the owner brings

- **Product:** the price of each pack in PKR; the old price only if it was really charged; SKU; net weight per jar; the full description in your own words (what it is, where it comes from, how to use it, who should not take it).
- **Sizes:** the sizes or packs sold, and how many days one jar lasts.
- **Lab report (optional):** the PDF, lab name, test date, batch number, fulvic percentage, heavy-metal results.
- **Photos (optional):** real photos of the jars, if new ones exist. Otherwise the three designs already in the media library are used.

## Read first

- _build/content-map.md (section 3, Product)
- _build/content-fixes.md (part 2, claims)
- _build/store-setup/test-product-set.graphql and test-product-variables.json (how the TEST product was built)

## Shopify toolkit and tools

- `shopify-admin`: write and validate `productSet`, `fileCreate`, `metafieldsSet` and `publishablePublish`.
- `shopify-use-shopify-cli`: `shopify store execute`, one approved batch at a time.

## Photos (B18)

| Design | Files |
|---|---|
| Black lid | `images-optimized/xomoashro-shilajit-resin-jar-front.webp`, `-cutout.webp`, `-with-raw-resin.webp`; the restaged images already in Shopify Files (`xomoashro-shilajit-jar-*.webp`) |
| Gold lid | `images-optimized/xomoashro-shilajit-resin-jar-gold-lid.webp`, `-gold-lid-cutout.webp` |
| Green | `wordpress-site/assets/images/pure-himaliyan-shilajit-brand.png`, `pure-himaliyan-shilajit.png`, `pure-shilajit.png` (550px; to be optimized to WebP) |

## Task outline

Expand these into `tasks/P25-tasks.md` at phase start.

1. Record the owner's answers in `decisions.md` (B1, B2, and B3 and B4 if given).
2. Build the product with `productSet`: title, handle `pure-himalayan-aftabi-shilajit`, description, options and variants, prices, SKU, weight, status, Google title and description. Show the full input for approval, then create it.
3. Photos: optimize the green-jar images, upload them, and attach all three designs in a sensible gallery order with alt text.
4. Metafields per variant and product (net weight, supply days, badge, altitude, origin; lab fields only from a real report).
5. Point the theme at the real product: homepage bundles, cart suggestion, collection page check; the article shop box finds it on its own.
6. Retire the TEST product (archive or delete, with approval).
7. Check: the product page, adding each size to the cart, the cart drawer, structured data and Google's Rich Results test with the real price.

## Acceptance checks

- [ ] Product page shows real data and each size can be added to cart.
- [ ] No "TEST" product is visible anywhere.
- [ ] Rich Results Test passes for Product and Merchant listings with the real price.
- [ ] No claim on the page without a source (lab values only from a report).

## Out of scope

Reviews import; new photography.
