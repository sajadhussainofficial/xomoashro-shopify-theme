# P08 report — Product page

Date: 2026-10-16. Branch: `phase/P08-product-page`.

## 1. Result

The product page is rebuilt in the Xomoashro design on top of Horizon's product engine, so size switching, add to cart, the gallery and the sticky bar all use Horizon's tested code.

Every acceptance check passed except the Theme Editor click-through, which needs your login (section 4). The page runs on the test product until your real product details arrive (B1).

Two fixes from your feedback are included:
- **Cart drawer:** no gap and no border between the page and the drawer (P06 feedback).
- **Product page:** the photos and title no longer touch the header.

## 2. What is on the page

**Top of the page, left:** photos with thumbnails on computers, swipe and dots on phones, and zoom on click. A size with its own photo shows that photo when chosen.

**Top of the page, right**, in this order. Every item is a block you can move, hide or edit, and app blocks such as a reviews widget can be added.
1. Guarantee pill ("7-day money-back guarantee", from store facts) and a "Lab tested" pill. The lab pill shows only once a lab report or lab name is saved on the product.
2. Product title. The star rating appears only when a reviews app has saved a real rating.
3. Three badges: 100% resin, Above 16,000 ft, Cash on delivery.
4. Price, price per gram and days of supply. A crossed-out price shows only when a size has a real compare-at price.
5. Size cards: size, weight, days, price, saving per gram and the "Most popular" badge, all from each size's fields. On phones they become full-width rows.
6. Beginner note: "New to shilajit? Start with one jar and a small daily amount."
7. Quantity, the orange "Add to cart · Rs X" button and an outlined "Order on WhatsApp" button. The WhatsApp message is filled in with the product, the size and its link.
8. One customer quote at a time, changing every 7 seconds. These are real quotes from the old site's reviews; nothing new was written. It stops while hovered and stays still for reduced motion.
9. Delivery and guarantee rows ("Delivered in 5 days across Pakistan", "Cash on delivery: pay when it arrives", "7-day money-back guarantee"). Each row hides if its store fact is missing.
10. Batch and lab report row with "View report". Hidden until those fields are saved.
11. Fold-out details: About this shilajit (the product description), Benefits, How to use, What's inside, Sourcing, Safety, Shipping and returns. Each reads its product field when filled and otherwise shows the approved homepage wording.

**Further down:** jump links (Details, Lab report, Reviews, Questions, Safety), a details grid, the numbers band, comparison, reviews, questions, and a precautions box.
- The "Lab report" jump link and the lab section stay hidden until a report exists.
- A detail card with no value is hidden.

**Phones:** an add-to-cart bar slides up once the main button scrolls away. It adds the size chosen on the page, and it follows the shared bottom-bar rule, so the floating WhatsApp button (a later phase) will move up above it.

**Search engines:** product structured data for the chosen size (name, photos, description, brand, SKU, price in PKR, in stock). It updates when the size changes.

## 3. Files

| File | What it is |
|---|---|
| `sections/xo-main-product.liquid` | The product section: photos left, blocks right, sticky bar, structured data |
| `blocks/xo-product-gallery.liquid` | Photos, using Horizon's media gallery (carousel, thumbnails, zoom, video) |
| `blocks/xo-product-heading.liquid` | Pills, title, rating, badges |
| `blocks/xo-per-gram-price.liquid` | Price, compare-at, price per gram, days of supply |
| `blocks/xo-variant-cards.liquid` | Size cards, built on Horizon's variant picker |
| `blocks/xo-buy-box.liquid` | Quantity, Add to cart, Order on WhatsApp, customer quotes |
| `blocks/xo-beginner-note.liquid`, `xo-delivery-icons.liquid`, `xo-batch-lab-row.liquid`, `xo-metafield-accordion.liquid` | Note, delivery rows, lab row, fold-out details |
| `snippets/xo-sticky-atc.liquid` | Phone add-to-cart bar, using Horizon's sticky add-to-cart element |
| `snippets/xo-product-jsonld.liquid` | Product structured data |
| `assets/xo-product.js` | Keeps structured data and the WhatsApp link in step with the size; quote rotation; jump links |
| `sections/xo-pdp-anchor-nav.liquid`, `xo-spec-grid.liquid`, `xo-precautions.liquid` | Jump links, details grid, precautions |
| `templates/product.json` | The page: product section, jump links, details, lab report, numbers, comparison, reviews, questions, precautions |
| `snippets/xo-cart-drawer.liquid` | Fix: drawer uses Horizon's drawer width (no gap) and a soft shadow instead of the border |
| `locales/en.default.json`, `en.default.schema.json` | Product page strings and editor labels |

Horizon's `product-information` section is no longer used on the product page. It is kept, not deleted.

## 4. Acceptance checks

Tested on the local preview with Playwright. Screenshots are in `reports/P08-screens/`.

| Check | Result | Evidence |
|---|---|---|
| Add to cart from the main button, right size in the cart | Pass. With 2 jars chosen, the cart held "2 jars × 1" (variant 47627094130860) | test log |
| Add to cart from the sticky bar | Pass. At 360px, with 3 jars chosen and the page scrolled, the bar showed "3 jars · Rs.2,700.00"; pressing it put "3 jars × 1" in the cart | `pdp-360-sticky.png` |
| Switching size updates the page | Pass. Choosing 2 jars changed the URL to `?variant=47627094130860`, the price to Rs.1,900.00 and Rs.31.67 per gram, the button to "Add to cart · Rs.1,900", the sticky bar, the WhatsApp message and the structured data (name, price 1900, SKU TEST-2JAR) | `pdp-1280-2jars.png` |
| Complete with every product field empty | Pass. All product fields are empty on the test product: the lab row, lab pill, lab section, lab jump link and empty detail cards are hidden; the fold-out details show their own text; no blank rows | `pdp-1280-full.png` |
| Rich Results Test | Pass. Code test of the page's structured data: 2 valid items, Product snippets and Merchant listings, 0 errors. The two notes are optional fields, shipping details and return policy, which wait for B9. The preview URL itself cannot be tested because the store is password protected | `rich-results-test.png`, `rich-results-merchant.png` |
| Editor: reorder and hide blocks, add an app block | **Not run.** Needs your Theme Editor login. The section accepts its blocks and app blocks, and validation passes | |
| Space below the header | Pass. 48px on computers, 24px on phones | `pdp-1280-top.png`, `pdp-360-full.png` |
| Cart drawer gap and border | Pass. At 1920px the page edge and the drawer meet exactly; no border | `../P06-screens/drawer-1920-fixed.png` |
| Widths 360, 768 and 1280px | Pass. No sideways scroll; one H1; size cards become rows on phones; quantity and button fit on one row | `pdp-360-full.png`, `pdp-360-sizes.png`, `pdp-768-full.png`, `pdp-1280-full.png` |
| Console errors | None from the theme. Only Shopify's login frame, which is refused on localhost | |
| Toolkit validation and theme check | Pass on all 18 files; theme check 0 errors. The 3 new warnings are Horizon class names kept on purpose as script hooks | |

**Please check in the Theme Editor** (Online Store → Themes → Customize → Products):
- Move a block on the right, for example the beginner note.
- Hide one block.
- Add an app block.

## 5. Defaults taken

- **B1 and B2:** built and tested on the test product's placeholder prices and its sizes, 30 g in 1, 2 or 3 jars.
- **B3:** no lab report, so every lab item stays hidden.
- **B18:** the photos are the black-lid jar.
- **B4:** only the WhatsApp number is used. The phone number is still unconfirmed.
- **"You may also like" is switched off** on the product page. With one product it showed four empty grey cards. Switch it on in the Theme Editor once you sell more than one product.
- **Badges** read "100% resin", "Above 16,000 ft" and "Cash on delivery". I did not use "Glass jar", the competitor idea, because the jar material is not confirmed.
- **The sticky bar shows on phones only.** A setting turns it on for computers.
- **The reviews section's "Shop Shilajit" button** still goes to the catalogue page, as on the homepage.

**Changes from the plan:**
- I added a `xo-product-heading` block for the title area, which the plan's file list did not name.
- The jump links are a section rather than a block, so they can sit between the product section and the sections below.
- The page script is `assets/xo-product.js` rather than `assets/xo-variant-cards.js`. The size cards need no script of their own, because they reuse Horizon's variant picker; the new script handles the structured data, quotes and jump links.

## 6. Open items

- **Store name (please fix):** the store's name in Shopify is "https://xomoashro.com/". It shows in every browser tab and in Google results ("TEST – do not buy – https://xomoashro.com/"). Change it in Settings → General → Store name to "Xomoashro".
- **B9:** shipping fee, free-delivery amount and return terms. With these, I can add shipping details and the return policy to the structured data, which clears Google's two optional notes.
- **B1, B2, B3, B18 and the B4 phone number:** still open. Once the real product exists:
  1. Point the homepage Sizes section at it.
  2. Fill its fields: weight, days and badge on each size; region, altitude, fulvic acid and the lab fields on the product.
  3. Delete the test product.
- **Theme Editor click-through:** see section 4.
- **Live theme:** nothing from P06 or P08 is on the live theme yet.

## 7. Next

P09 Collection, search and utility pages.
