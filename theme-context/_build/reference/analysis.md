# Analysis: master prompt, WordPress capture, theme codebase, risks

Reference for every phase. Written 2026-10-06. Sources: `theme-context/master-prompt.md`, `theme-context/wordpress-site/`, `xomoashro-them/`.

---

## Verdict on the master prompt

The prompt is sound in structure (inventory first, phase gates, no invented claims, metafield-driven facts). It is wrong or incomplete in six places, and each one changes the build.

| # | What the prompt assumes | What is actually true | Consequence |
|---|---|---|---|
| 1 | WooCommerce product data exists: variants, prices, SKU, description, a ₨36,000 vs ₨3,200 compare-at | The capture has no product data at all. WooCommerce is inactive, `/product/black-pure-shilajit/` is a 404, no price appears on any page. The only product facts are one name ("Pure Himaliyan Aftabi Salajeet 30g") and one 70-word homepage paragraph | `products-import.csv` cannot be built from source. Price, SKU, sizes, weight, description must come from you (decision B1) |
| 2 | Sizes 10g / 20g / 60g | Source mentions only 30g | Variant structure is undecided (decision B2). The `course-bundles` section and per-gram pricing depend on it |
| 3 | Lab reports can be shown (hero CTA "View Lab Report", lab-proof section, lab page, metaobject) | No lab report, COA, batch number or lab name exists in the capture. "Triple Lab Tested" and "65%+ fulvic acid" are unsupported claims | Lab features get built but ship hidden until a real report is supplied (decision B3). Hero CTA 2 falls back to "How to use" |
| 4 | Imagery exists: resin macro, jar in hand, collectors, landscape | There is one usable product image: a 735×582 cut-out of the jar. The 800px hero image and the "Hunza" sourcing image are AI-generated with garbled label text. The large banners are unrelated stock (herbal tea, a Montreal street map). Blog images are 1024px stock/AI | A premium, high-fidelity look is not achievable with current photos. A shoot list is in `photo-shoot-list.md`. Until then the design leans on typography, colour and layout, not photography |
| 5 | A generic OS 2.0 theme where header, cart drawer, sticky add-to-cart, variant cards and accordions must be built | The theme is Horizon 4.2.0. It already ships announcements, header with mobile drawer, predictive search, cart drawer, sticky add-to-cart, button-style variant picker, accordion, review block, 57 locales including Urdu (`ur.json`), logical CSS properties in 83 files, and `@app` support in 12 sections | Your instruction is that this folder is only a starter and the result must be completely new. So every visible part is rebuilt, but on top of Horizon's working cart, variant and search code instead of rewriting that from zero (see `architecture.md`) |
| 6 | Accent `#B8742A` with white button text; "derive from logo if it exists" | The logo is `#FF6B31` orange. White on `#B8742A` is 3.77:1 and white on `#FF6B31` is 2.84:1; both fail WCAG AA for button text. Amber text on bone is 3.35:1 and fails for body-size text | Button and link colours are adjusted (see `design-system.md`). Logo colour needs a decision (decision B5) |

Smaller mismatches:

- **Three phone numbers, not two.** The contact page shows +92-3128000718, the footer +9230333444 (too short to be valid), the FAQ a WhatsApp number +923445443333.
- **No social links.** The footer icons for Facebook, Twitter and YouTube have no URLs in the source.
- **Three testimonials only**, and the photo used for "Asad" is a file named `Khalid-Kurt.png`. Needs confirming before it is reused as a named customer.
- **Policies are unfinished templates.** Shipping & Returns says "[X] business days" and "[your contact email or form]" and offers international shipping.
- **Benefits page makes a clinical claim** ("20% increase in testosterone after 90 days") with no citation, plus Lorem ipsum blocks.
- **Two blog posts compete for the same query**: `what-is-shilajit` (June 2026, well written) and `what-is-shilajit-types-and-benefits` (2023).
- **Affiliate programme has no content.** All four affiliate pages print raw SliceWP shortcodes. On Shopify this needs an app (decision B6).
- **`/shop` may not be redirectable.** Shopify reserves some path prefixes for redirects; to be verified when the redirect file is imported.
- **Competitors reviewed.** Nine sites were captured with Playwright into `theme-context/competitors/`; findings are in `competitor-notes.md` and summarised in `design-system.md`.
- **`sharp` is not installed.** Image optimisation will install it under `theme-context/_build/tools/`, outside the theme.

What the capture does supply in full: 10 blog posts (1,500–2,100 words each), homepage/about/distributor/ambassador copy, 5 FAQ items, 3 testimonials with photos, logo SVGs, SEO titles and descriptions for 43 URLs, and every old URL for the redirect map.

---

## Analysis of the `xomoashro-them` codebase

**What it is.** An unmodified copy of Shopify Horizon 4.2.0, committed once ("initial"). `theme check` reports 0 errors and 6 warnings. No custom code, no brand settings, default black-and-white palette, Inter everywhere.

| Folder | Files | Lines | What is in it |
|---|---|---|---|
| `layout/` | 2 | 310 | `theme.liquid` renders meta tags, stylesheets, fonts, scripts, palette variables, header and footer groups, cart drawer, search modal, quick-add modal |
| `sections/` | 42 | 18,005 | Mostly thin wrappers around blocks. Largest: `header.liquid` (1,819), `section.liquid` (1,754), `hero.liquid` (1,498) |
| `blocks/` | 95 | 27,235 | Theme blocks: text, image, button, group, accordion, product card, price, variant picker, buy buttons, filters, email signup, review, contact form. Files starting with `_` are private to one section |
| `snippets/` | 145 | 25,899 | Rendering helpers and a large number of `*-styles.liquid` files that carry component CSS |
| `assets/` | 125 | 26,998 | 81 ES-module JS files, 35 icon SVGs, 3 CSS files (`base.css` is 45 KB), TypeScript type declarations |
| `templates/` | 13 | 2,609 | JSON templates. `index.json` is only a hero and a product list; `product.json` is product information and recommendations |
| `locales/` | 57 | | Storefront and schema strings, including `ur.json` with 356 lines of Urdu |
| `config/` | 2 | 2,334 | 18 settings groups, 94 current values |

**How it works.**

- **JavaScript.** No build step, no jQuery. An import map in `snippets/scripts.liquid` names 29 modules (`@theme/component`, `@theme/product-form`, `@theme/variant-picker`, `@theme/section-renderer`, `@theme/morph` and so on). Every interactive piece is a custom element extending a `Component` base class that wires child elements through `ref` attributes and declarative event handlers. There are about 80 such elements: cart drawer, cart items, product form, variant picker, media gallery with zoom, predictive search, facets, header drawer, sticky add-to-cart, quick add, slideshow, accordion, dialog.
- **Updates without reload.** Cart and variant changes re-render sections through the Section Rendering API and patch the page with `morph.js`. Events are typed classes in `events.js`.
- **CSS.** One global file (`base.css`: layout grid, typography presets, buttons, focus) plus styles colocated in each section, block and snippet through `{% stylesheet %}` (154 files). Colours come from a single `color_palette` theme setting (background, foreground, two extra colours) with contrast computed in `snippets/color-palette.liquid`; there are no colour schemes. Fonts come from four `font_picker` settings.
- **Already right for this project.** Logical CSS properties in 83 files and a `dir` attribute on `<html>` (RTL-ready), `prefers-reduced-motion` handled in 24 files, `@app` blocks accepted in 12 sections, view transitions, safe-area aware gutters, structured data in 5 files.

**What does not fit.**

- **Look.** Horizon's default look is neutral and generic; nothing in it reads as premium or as Xomoashro.
- **Generic sections.** Its sections are built for any store. None of the 15 homepage sections in the master prompt exists.
- **Product page.** There are no per-gram prices, supply days, lab rows or WhatsApp ordering.
- **Dead weight for a one-product store.** Quick order list, product hotspots, layered slideshow, marquee, collection links, volume pricing, local pickup, facets and swatches (about 5,000 lines of JS and Liquid) would never be used.
- **Too many editor settings.** Stock sections expose dozens of layout options each, which makes it easy to break a designed page in the Theme Editor.

---

## Risks

- **Health claims.** Supplement advertising that implies treatment or cure can get ad accounts and listings rejected. All copy is held to "supports" wording and the risky posts are flagged, but the final call on each claim is yours.
- **Unsupported proof points.** "65%+ fulvic acid", "triple lab tested" and "5,000+ customers" are shown only once confirmed. A proof-led design with no proof is the largest gap between the prompt and reality.
- **Imagery.** Without new photos the store will look clean and well designed but not "ultra premium".
- **SEO during migration.** Post slugs are preserved and every old URL is mapped, which limits the risk. The brand-name fix changes most page titles at once, so expect a few weeks of ranking movement.
- **COD.** Shopify's native COD has no order confirmation step. If fake orders are a problem, a COD form or verification app is a later addition.
