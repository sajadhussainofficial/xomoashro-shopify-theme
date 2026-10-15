# P08 tasks

Decisions B1, B2, B3, B18 and the phone part of B4 are still open; the phase runs on their defaults (test product's placeholder details, 30 g in 1, 2 or 3 jars, lab rows hidden, black-lid jar, WhatsApp number only).

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Owner feedback on P06: no gap or border between the page and the cart drawer | `snippets/xo-cart-drawer.liquid` | At 1920px the page edge and the drawer meet (gap 0), no border | done |
| 2 | Section shell: gallery on the left, buy column on the right (theme blocks and app blocks), sticky bar, structured data | `sections/xo-main-product.liquid` | Blocks reorder and hide in the editor; an app block can be added | done; editor click-through left for the owner |
| 3 | Gallery on Horizon's media gallery: thumbnails on computers, swipe on phones, zoom, video | `blocks/xo-product-gallery.liquid` | First image loads eagerly; switching size shows that size's picture | done |
| 4 | Title area: guarantee and lab pills, title, rating (only when real), three badges | `blocks/xo-product-heading.liquid` | Pills hide when their data is missing | done |
| 5 | Price with price per gram; compare-at only when real | `blocks/xo-per-gram-price.liquid` | Updates on size change | done |
| 6 | Size cards on Horizon's variant picker: size, weight, days, saving, badge | `blocks/xo-variant-cards.liquid` | Changing size updates price, picture, URL, button and sticky bar; single-variant products show no cards | done |
| 7 | Buy box: quantity, "Add to cart · price", "Order on WhatsApp", one rotating customer quote | `blocks/xo-buy-box.liquid`, `assets/xo-product.js` | Correct size lands in the cart; sold out shows a disabled button with text | done |
| 8 | Beginner note, delivery and reassurance rows, batch and lab row | `blocks/xo-beginner-note.liquid`, `xo-delivery-icons.liquid`, `xo-batch-lab-row.liquid` | Rows hide when their fact is missing | done |
| 9 | Fold-out details: Benefits, How to use, What's inside, Sourcing, Safety, Shipping and returns | `blocks/xo-metafield-accordion.liquid` | Each reads its product field or shows the block's own text; never empty | done |
| 10 | Sticky add-to-cart bar on phones, lifting the WhatsApp button | `snippets/xo-sticky-atc.liquid` | Appears once the main button scrolls away; adds the selected size | done |
| 11 | Product structured data, refreshed on size change | `snippets/xo-product-jsonld.liquid`, `assets/xo-product.js` | Valid Product with PKR offer; rating only with real reviews | done |
| 12 | Below the fold: jump links, spec grid, numbers, comparison, reviews, questions, precautions | `sections/xo-pdp-anchor-nav.liquid`, `xo-spec-grid.liquid`, `xo-precautions.liquid`, `templates/product.json` | Jump links only for sections on the page; empty spec cards hidden | done |
| 13 | Strings and checks | `locales/en.default.json`, `en.default.schema.json` | Toolkit validation, theme check, 360/768/1280px, add to cart from main button and sticky bar | done |
