# XOMOASHRO Shopify store — design implementation plan

Written 2026-10-06. Spec: `theme-context/master-prompt.md`. Source data: `theme-context/wordpress-site/`. Theme: `xomoashro-them/` (a starter clone of Shopify Horizon 4.2.0, to be turned into a completely new theme).

This plan does three things: checks the master prompt against what the WordPress capture and the cloned theme actually contain, records the decisions that follow, and lays out the build phase by phase with the files each phase touches. Nothing in the theme has been changed yet.

---

## 1. Verdict on the master prompt

The prompt is sound in structure (inventory first, phase gates, no invented claims, metafield-driven facts). It is wrong or incomplete in six places, and each one changes the build.

| # | What the prompt assumes | What is actually true | Consequence |
|---|---|---|---|
| 1 | WooCommerce product data exists: variants, prices, SKU, description, a ₨36,000 vs ₨3,200 compare-at | The capture has no product data at all. WooCommerce is inactive, `/product/black-pure-shilajit/` is a 404, no price appears on any page. The only product facts are one name ("Pure Himaliyan Aftabi Salajeet 30g") and one 70-word homepage paragraph | `products-import.csv` cannot be built from source. Price, SKU, sizes, weight, description must come from you (blocker B1) |
| 2 | Sizes 10g / 20g / 60g | Source mentions only 30g | Variant structure is undecided (blocker B2). The `course-bundles` section and per-gram pricing depend on it |
| 3 | Lab reports can be shown (hero CTA "View Lab Report", lab-proof section, lab page, metaobject) | No lab report, COA, batch number or lab name exists in the capture. "Triple Lab Tested" and "65%+ fulvic acid" are unsupported claims | Lab features get built but ship hidden until a real report is supplied (blocker B3). Hero CTA 2 falls back to "How to use" |
| 4 | Imagery exists: resin macro, jar in hand, collectors, landscape | There is one usable product image: a 735×582 cut-out of the jar. The 800px hero image and the "Hunza" sourcing image are AI-generated with garbled label text. The large banners are unrelated stock (herbal tea, a Montreal street map). Blog images are 1024px stock/AI | A premium, high-fidelity look is not achievable with current photos. A shoot list is part of this plan (section 6). Until then the design leans on typography, colour and layout, not photography |
| 5 | A generic OS 2.0 theme where header, cart drawer, sticky add-to-cart, variant cards and accordions must be built | The theme is Horizon 4.2.0. It already ships announcements, header with mobile drawer, predictive search, cart drawer, sticky add-to-cart, button-style variant picker, accordion, review block, 57 locales including Urdu (`ur.json`), logical CSS properties in 83 files, and `@app` support in 12 sections | Your instruction is that this folder is only a starter and the result must be completely new. So every visible part is rebuilt, but on top of Horizon's working cart, variant and search code instead of rewriting that from zero (section 3) |
| 6 | Accent `#B8742A` with white button text; "derive from logo if it exists" | The logo is `#FF6B31` orange. White on `#B8742A` is 3.77:1 and white on `#FF6B31` is 2.84:1; both fail WCAG AA for button text. Amber text on bone is 3.35:1 and fails for body-size text | Button and link colours are adjusted (section 4). Logo colour needs a decision (blocker B5) |

Smaller mismatches:

- **Three phone numbers, not two.** The contact page shows +92-3128000718, the footer +9230333444 (too short to be valid), the FAQ a WhatsApp number +923445443333.
- **No social links.** The footer icons for Facebook, Twitter and YouTube have no URLs in the source.
- **Three testimonials only**, and the photo used for "Asad" is a file named `Khalid-Kurt.png`. Needs confirming before it is reused as a named customer.
- **Policies are unfinished templates.** Shipping & Returns says "[X] business days" and "[your contact email or form]" and offers international shipping.
- **Benefits page makes a clinical claim** ("20% increase in testosterone after 90 days") with no citation, plus Lorem ipsum blocks.
- **Two blog posts compete for the same query**: `what-is-shilajit` (June 2026, well written) and `what-is-shilajit-types-and-benefits` (2023).
- **Affiliate programme has no content.** All four affiliate pages print raw SliceWP shortcodes. On Shopify this needs an app (blocker B6).
- **`/shop` may not be redirectable.** Shopify reserves some path prefixes for redirects; to be verified when the redirect file is imported.
- **Competitors reviewed.** Nine sites were captured with Playwright into `theme-context/competitors/`; findings are in `competitor-notes.md` and summarised in section 4a.
- **`sharp` is not installed.** Image optimisation will install it under `theme-context/_build/tools/`, outside the theme.

What the capture does supply in full: 10 blog posts (1,500–2,100 words each), homepage/about/distributor/ambassador copy, 5 FAQ items, 3 testimonials with photos, logo SVGs, SEO titles and descriptions for 43 URLs, and every old URL for the redirect map.

---

## 1a. Analysis of the `xomoashro-them` codebase

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

## 2. Blockers: decisions and inputs needed from you

Work can start on everything that does not depend on these. Items marked "blocks launch" do not block the build.

| ID | Needed | Blocks | Default if you do not answer |
|---|---|---|---|
| B1 | Product price(s) in PKR, SKU, net weight, real compare-at price if any, full product description | Product import, PDP, bundles | Product built with `{{TODO}}` price; not published |
| B2 | Sizes actually sold. Options: (a) 30g only, sold as 1 / 2 / 3 jar packs; (b) 10g / 20g / 60g as in the prompt; (c) another set | `course-bundles`, variant cards, per-gram price | (a), because 30g is the only size in the source |
| B3 | Lab report PDF/image, lab name, test date, batch number, measured fulvic %, heavy-metal values | Lab-proof section, lab page, "Lab tested" chips, hero CTA 2 | All lab claims hidden; chips show only "Sourced at 16,000 ft" and "100% resin" |
| B4 | Guarantee length (7 or 30 days) and the one correct phone and WhatsApp number | Trust strip, PDP, footer, floating WhatsApp button, policies | Guarantee line omitted; WhatsApp button hidden |
| B5 | Brand colour: keep orange `#FF6B31` logo, or move the logo to the new ink/amber palette | Header, favicon, all accents | Keep the logo shape, render it in ink with an amber mark |
| B6 | Affiliate app choice (Shopify Collabs, UpPromote or similar) or drop the programme | `page.affiliate`, footer links, four redirects | Page becomes an application form like Ambassador |
| B7 | Shopify store domain and CLI login (`shopify theme dev --store <domain>`) | Previewing, pushing, any Admin API work | Build locally, validate with `theme check` only |
| B8 | Keep the "5,000+ customers" claim? Is "Asad" the person in `Khalid-Kurt.png`? Real social profile URLs? | Reviews wall, why-xomoashro, footer | Claim removed, that testimonial shown without photo, social icons hidden |
| B9 | Shipping facts: delivery time, shipping fee, free-shipping threshold, return terms for a consumable | Announcement bar, cart progress bar, policies | Progress bar off; policy shipped with `{{TODO}}` markers (blocks launch) |
| B10 | New photography (section 6) | Final visual quality | Launch with the cut-out jar on designed backgrounds |

---

## 3. Architecture decisions

1. **Completely new storefront, reused engine.** Every part a shopper sees is rebuilt from scratch as `xo-` files: header, announcement bar, footer, hero, all homepage sections, the product page layout, product cards, collection, cart drawer, search, blog, article, 404, password and contact. What is kept is the part nobody sees: Horizon's cart, product-form, variant, media-gallery, predictive-search, dialog and section-rendering modules. The new markup uses those custom elements (`product-form-component`, `variant-picker`, `cart-drawer-component`, `cart-items-component`, `predictive-search-component`, `media-gallery`) and honours their `ref` contracts. Rewriting that logic would add weeks and risk cart bugs with no visible gain.
2. **The theme stops being Horizon.** `theme_info` is renamed to "Xomoashro" version 1.0.0. It will no longer take Horizon updates; that is the accepted cost of "completely new".
3. **New design layer.** `assets/xo-base.css` replaces Horizon's global typography, buttons, forms and focus styles and is loaded after `base.css`. Each `xo-` section and block carries its own styles in `{% stylesheet %}`. The palette goes into Horizon's `color_palette` setting and button settings so the Theme Editor still controls it; extra tokens (amber-deep, success, line, dark-section colours) live in `snippets/xo-tokens.liquid`. New sections expose only the settings that are safe to change: copy, images, links, and a light/dark/amber tone.
3a. **Stock sections are retired, with your approval.** Templates stop referencing Horizon's stock sections. At the end of the build a single commit deletes the unused ones (quick order list, product hotspots, layered slideshow, marquee, collection links, jumbo text, comparison slider, volume pricing, local pickup and their JS), after you approve the exact file list. Until then nothing is deleted.
4. **Facts come from data, never from section text.** Guarantee days, WhatsApp number, support email and free-shipping threshold are read from shop metafields through one snippet, `snippets/xo-shop-facts.liquid`. Product facts (fulvic %, altitude, batch, supply days) come from product metafields. A section with a missing fact hides that line instead of printing a blank.
5. **Store data is created by script, not by hand.** Metafield and metaobject definitions, the product, pages, blog articles, menus and redirects are created with Admin GraphQL through the Shopify CLI, from files in `theme-context/_build/`. Each script is run only after you approve it, because it writes to the live store.
6. **Content images go to Shopify Files**, referenced as `shopify://shop_images/<name>` in templates. `assets/` holds only icons and UI SVGs.
7. **Git:** work on a `build/` branch per phase, one commit per section, `theme-context/` committed so the content map travels with the code.

---

## 4. Design system: "Mountain Apothecary", corrected

| Token | Value | Use | Contrast check |
|---|---|---|---|
| ink | `#0E0D0B` | Text, secondary button outline, dark sections | 17.25:1 on bone |
| bone | `#F5F1EA` | Page background | |
| amber | `#B8742A` | Primary button fill, icons, large display accents | Ink text on amber 5.15:1 (pass). White text on amber 3.77:1 (fail), so buttons use ink text |
| amber-deep | `#9A5E1F` | Text links and small accent text on bone, hover state | White on amber-deep 5.26:1 |
| stone | `#6B655C` | Secondary text | 5.12:1 on bone |
| success | `#2F6B3E` | In-stock, verified, savings | White on success 6.38:1 |
| line | `rgba(14,13,11,.12)` | Hairlines, card borders | |

- **Type:** Fraunces for H1–H3, Inter for body and UI (Inter is already the theme default). Both are requested through Horizon's `font_picker`; if Fraunces is not in Shopify's font library it is self-hosted as two WOFF2 files with `font-display: swap`.
- **Scale:** fluid with `clamp()`, H1 from 36px at 360px wide to 72px at 1280px. 8px spacing scale. 14px card radius, 999px pills. Buttons at least 48px tall.
- **Premium without photography:** generous whitespace, serif display type at large sizes, hairline rules, a subtle paper-grain background on bone, amber used sparingly, one dark ink section per page for rhythm, numerals set large for the proof points (16,000 ft, 85+ minerals). Motion is limited to fade-and-rise on scroll and respects `prefers-reduced-motion`.
- **Three section tones**, chosen per section with one setting: Bone (default), Ink (dark sections, footer), Amber (announcement bar, one CTA band). Horizon 4.2 has a single colour palette, not colour schemes, so the tones are implemented in `xo-tokens`.
- **RTL:** logical properties only (`margin-inline`, `inset-inline`), no left/right, so the existing `ur.json` locale can be switched on later.

---

## 4a. What the competitor review changes

Full notes: `theme-context/_build/competitor-notes.md`. Nine sites were reviewed at mobile width. The closest to our target is kashmiril.com, which is built on Horizon like ours and uses a cream background, serif headings and card-based long-form product sections. That confirms the direction in section 4.

**Sections added to the plan:**

| New section | What it is | Used on |
|---|---|---|
| `xo-problem` | One large statement that most shilajit on the market is fake or diluted (from our own About copy), then our answer | Homepage, after the trust strip |
| `xo-stats-band` | Ink band with three or four large amber numerals (16,000 ft, 85+ minerals, jar size); confirmed numbers only | Homepage, product page |
| `xo-spec-grid` | Two-column specification cards (net weight, form, origin, purity, lab testing, packaging, shelf life), filled from metafields, each hidden when empty | Product page |
| `xo-precautions` | Clearly labelled precautions block: not a medicine, pregnancy, medication, consult a doctor | Product page, end of health articles |
| `xo-pdp-anchor-nav` | Sticky chip row that jumps to Benefits, How to use, Lab, Reviews, FAQ | Product page |

**Changes to planned sections:**

- **Hero:** eyebrow pill above the headline; proof chips only for confirmed facts.
- **Bundles and variant cards:** each card shows size, days of supply, per-gram price, a "best for" line, and a badge on the recommended size.
- **Buy box:**
  - a one-line honest note ("New to shilajit? Start with the smallest jar");
  - price inside the Add to cart button;
  - a delivery-time line taken from the shipping setting;
  - three reassurance rows;
  - one testimonial line under the button;
  - "Order on WhatsApp" as a secondary outline button.
- **Section headings:** small-caps eyebrow, serif heading, short amber rule, used everywhere through `xo-section-heading`.
- **FAQ:** practical questions added (how long a jar lasts, how to get the resin out, daily use, with medication), marked for your confirmation.
- **Source story:** first-person founder voice with a signed line and two region cards (Chitral, Gilgit-Baltistan).

**Deliberately not done:**

- no entry popup, countdown timer or permanent sale banner;
- no mobile bottom tab bar (it collides with the sticky add-to-cart bar);
- no disease or organ claims, and no before/after images;
- no emoji or 3D icons;
- no borrowed media logos;
- no long keyword paragraphs on the homepage.

**Market expectation in Pakistan.** Both local competitors offer WhatsApp ordering, PKR prices, a 30-day guarantee, named lab certificates and a delivery estimate. Without a lab report (blocker B3) and a confirmed guarantee (B4), Xomoashro will look weaker than them on proof, whatever the design.

---

## 4b. Editing rule: everything editable, everything pre-filled

This is a hard requirement for every phase.

1. **Every section on every page is editable in the Shopify Theme Editor.** Headings, body text, button labels and links, images, icons, tone, and the order and number of repeated items (as blocks) are all settings. No visible copy is hard-coded in Liquid.
2. **Every page is built from sections.** Home, product, collection, cart, blog, article, search, 404, password and each custom page (about, our source, how to use, lab reports, wholesale, ambassador, affiliate, track order, contact) is a JSON template made of `xo-` sections. Page copy lives in section settings, not in the page body, so it is edited in the same place as the design.
3. **Every section ships with real default content.** Schema defaults and presets carry the corrected copy from `theme-context/wordpress-site/`, and each `templates/*.json` is pre-populated, so the store looks complete on first preview and a section added from the editor arrives already written.
4. **Where the old site has no content,** the default is conservative draft copy marked `{{TODO: confirm}}` and listed in the phase report. Lorem ipsum is never used.
5. **Header, announcement bar, footer and cart drawer** are editable through their section groups. Navigation menus are edited in Shopify admin under Navigation.
6. **Facts shared across pages** (guarantee days, WhatsApp number, support email, free-shipping threshold) are edited once, in shop metafields, and every section picks them up.
7. **Product facts** (size, supply days, batch, lab values, how to use, safety) are edited on the product in admin through metafields; blog posts and policies are edited in their own admin screens.
8. **Fixed interface text** (Add to cart, Sold out, form errors) lives in `locales/en.default.json` and is editable under Edit default theme content.

Check at the end of each phase: open every new section in the editor, change one text and one image, confirm the change shows, and confirm that adding the section fresh from "Add section" arrives with its default content.

---

## 5. Content and SEO carry-over

**Copy corrections applied everywhere** (full before/after list goes in `content-fixes.md` in Phase 0):

- Brand spelled XOMOASHRO / Xomoashro only. The WordPress site title itself is "Xomorashro", so 30+ meta titles need rewriting.
- "Himaliyan" to "Himalayan", "Ambassadar" to "Ambassador" (including the URL), "SNo fillers" to "No fillers", "Email as at" to "Email us at", footer year made dynamic.
- FAQ answers that describe powder, capsules and liquid extract rewritten for resin.
- "Fast delivery" versus "4–5 business days" reconciled to one statement from B9.
- Health copy rewritten to "supports / traditionally used for" wording. The testosterone statistic, the pregnancy article, and any cure or treatment phrasing are flagged for your review with a "consult your doctor" line added.

**Old section to new section:**

| Old content | New home |
|---|---|
| Hero ("Elevate Your Life with Pure Himalayan Aftabi Shilajit") | `xo-hero-proof` |
| Hero chips (100% Pure, Money Back, COD) | `xo-trust-strip` |
| "About Our Product" six benefit blocks | `xo-benefits-grid` |
| "Most Selling Edition" product block | `xo-course-bundles` and PDP description |
| "Why Xomoashro is Pakistan's Trusted Shilajit Choice" six blocks | `xo-why` |
| "Our Happy Clients" three testimonials | `xo-reviews-wall` fallback blocks |
| Newsletter band | Footer email signup (Horizon block) |
| FAQ, 5 items | `xo-faq` with FAQPage JSON-LD |
| "Our Latest Blogs" | Horizon `featured-blog-posts`, restyled |
| About Us "Our Story" and "Rediscover Health" | `page.about`, `page.our-source` |
| Become Distributor steps and form | `page.wholesale` |
| Ambassador steps, perks, form | `page.ambassador` |
| Contact page | `page.contact` |
| Benefits page | Not migrated (placeholder content); URL redirected |

Sections in the prompt with **no source content**: results-timeline, lab-proof, purity-test, comparison-table, how-to-use steps. They are built with conservative draft copy marked `{{TODO: confirm}}` and listed in each phase report.

**Redirect map** (becomes `redirects.csv`). Blog handle is `journal`; post slugs are kept unchanged.

| Old path | New path |
|---|---|
| `/product/black-pure-shilajit/` | `/products/pure-himalayan-aftabi-shilajit` |
| `/shop/` | `/collections/all` (verify the `/shop` prefix is allowed) |
| `/about-us/` | `/pages/about` |
| `/benefits/` | `/products/pure-himalayan-aftabi-shilajit` |
| `/contact-us/` | `/pages/contact` |
| `/blogs/` | `/blogs/journal` |
| `/become-distributor/` | `/pages/wholesale` |
| `/become-brand-ambassadar/` | `/pages/ambassador` |
| `/affiliate-dashboard/`, `/affiliate-registration/`, `/affiliate-account/`, `/affiliate-reset-password/` | `/pages/affiliate` |
| `/my-account/` | `/account` |
| `/privacy-policy/` | `/policies/privacy-policy` |
| `/terms-and-conditions/` | `/policies/terms-of-service` |
| `/shipping-returns/` | `/policies/shipping-policy` |
| `/home-2/`, `/sample-page/`, `/404-error/` | `/` |
| The 10 post URLs, e.g. `/what-is-shilajit/` | `/blogs/journal/<same-slug>` |
| `/category/benefits-of-shilajit/`, `/category/best-shilajit/`, `/category/pure-himalayan-shilajit/`, `/category/shilajit-dosage/`, `/category/shilajit-for-women/` | `/blogs/journal/tagged/<slug>` |
| `/category/uncategorized/`, `/author/wp-support/` | `/blogs/journal` |
| `/tag/himalayan-shilajit/`, `/tag/himalayan-shilajit-for-immunity/`, `/tag/natural-health-supplements/` | `/blogs/journal/tagged/<slug>` |
| `/cart/`, `/checkout/` | No redirect; Shopify serves these natively |

**Meta:** the homepage and the June 2026 post have good titles and descriptions and are kept. 25 URLs have no description and get new ones. Titles over 60 characters are shortened. Every page gets a social share image.

---

## 6. Photography shoot list

Needed for the "ultra premium" result. Phone photos in daylight are acceptable if sharp and at least 2400px wide.

1. Jar, front, on a plain surface, 4:5 and 1:1.
2. Jar open, resin surface visible, macro.
3. Jar in a hand, for scale.
4. Pea-sized portion on a spoon.
5. Resin dissolving in a glass of warm water, turning amber (also as a 6–10 second video).
6. Resin stretched between fingers or a spoon (purity test).
7. Box and jar together, real packaging.
8. Chitral or Gilgit-Baltistan landscape that you own the rights to.
9. Collectors or raw shilajit rock, if available.
10. Lab report, flat scan.

Existing images that will not be reused: the AI-generated hero and Hunza images (garbled label text), the herbal-tea and street-map banners, and the 43×43 and 70×70 decorative files.

---

## 7. Phase plan

Each phase ends with `shopify theme check` at zero errors (baseline today: 0 errors, 6 warnings in stock Horizon), a report in the format the prompt asks for, and a stop for your approval.

### Phase 0 — Inventory and audit (no theme code)

Creates, all under `theme-context/_build/`:

- `content-map.md`: file tree by type, page-to-section mapping, product fields, blog posts, policies, testimonials, contact data.
- `image-manifest.csv`: 141 files with new kebab-case names, intended use, alt text, dimensions, and `needs_reshoot` with reason.
- `images-optimized/`: WebP conversions (2400px hero, 1600px others) made by `tools/optimize-images.mjs` using `sharp`. Originals untouched.
- `content-fixes.md`: every correction above as before/after, with CONFIRM markers.
- `theme-audit.md`: Horizon inventory, what is reused, what is extended.
- `competitor-notes.md`: done (nine sites reviewed).

### Phase 1 — Data model and store setup

- `_build/store-setup/metafields.graphql`: product metafields `custom.fulvic_percent`, `altitude_ft`, `origin_region`, `batch_number`, `lab_name`, `lab_test_date`, `lab_report`, `supply_days`, `how_to_use`, `safety`; shop metafields `custom.whatsapp_number`, `support_email`, `free_shipping_threshold`, `guarantee_days`.
- `_build/store-setup/metaobjects.graphql`: `lab_report` definition (batch, date, lab, fulvic_percent, lead, arsenic, mercury, cadmium, pdf), storefront-readable.
- `_build/products-import.csv`: Shopify product CSV. Built once B1 and B2 are answered.
- `_build/blog-import/*.md`: 10 posts with front matter (title, handle, date, excerpt, image, SEO title and description, tags), body cleaned and corrected.
- `_build/pages/*.html`, `_build/policies/*.md`, `_build/menus.json`, `_build/redirects.csv`.
- Store settings checklist: PKR currency, Pakistan shipping zone and rates, Cash on Delivery as a manual payment method, customer accounts, required phone number at checkout.

### Phase 2 — Design foundation and global shell

| File | Action |
|---|---|
| `config/settings_schema.json` | Modify: rename theme to Xomoashro 1.0.0; add a "Xomoashro" settings group (tone colours, WhatsApp toggle) |
| `config/settings_data.json` | Modify: palette, fonts, type sizes, button colours, radius, logo |
| `assets/xo-base.css` | Create: global typography, buttons, forms, links, focus, section tones, spacing scale |
| `snippets/xo-tokens.liquid` | Create: CSS custom properties |
| `snippets/xo-shop-facts.liquid` | Create: reads shop metafields, outputs guarantee, WhatsApp link, email, threshold |
| `snippets/xo-icon.liquid`, `assets/xo-icon-*.svg` | Create: icon set (leaf, mountain, flask, truck, cash, shield, WhatsApp) |
| `snippets/xo-image.liquid` | Create: responsive image with `srcset`, `sizes`, lazy or eager loading |
| `layout/theme.liquid` | Modify: load `xo-base.css` and tokens, render the WhatsApp button, preload LCP image and display font |
| `sections/xo-announcement.liquid` | Create: rotating messages (free delivery threshold, COD nationwide, WhatsApp) |
| `sections/xo-header.liquid`, `snippets/xo-header-drawer.liquid` | Create: logo, navigation (Shop, Lab Reports, Our Source, How to Use, Reviews, Journal, Wholesale), search, cart count, mobile drawer |
| `sections/xo-footer.liquid` | Create: brand blurb, newsletter, three link columns, contact from metafields, socials, COD and payment badges, dynamic year |
| `sections/header-group.json`, `sections/footer-group.json` | Modify: point to the new sections |
| `snippets/xo-cart-drawer.liquid`, `snippets/xo-free-shipping-bar.liquid`, `blocks/xo-cart-upsell.liquid` | Create: new cart drawer layout with progress bar, upsell, trust icons, COD note, around Horizon's cart components |
| `snippets/xo-whatsapp-button.liquid`, `assets/xo-whatsapp-button.js` | Create: floating button, safe-area aware, prefilled message including product title on product pages |
| `sections/xo-main-404.liquid`, `sections/xo-search.liquid`, `sections/xo-password.liquid` | Create: restyled utility pages |
| `locales/en.default.json`, `locales/en.default.schema.json` | Modify: add an `xo` namespace for all new strings |

### Phase 3 — Homepage

Seventeen sections, each with full schema, blocks, presets and real default content, assembled in `templates/index.json`:

`xo-hero-proof`, `xo-trust-strip`, `xo-problem`, `xo-course-bundles` (with `assets/xo-bundle-add.js` for add-to-cart without reload), `xo-benefits-grid`, `xo-stats-band`, `xo-why`, `xo-results-timeline`, `xo-lab-proof`, `xo-source-story`, `xo-purity-test`, `xo-comparison-table`, `xo-reviews-wall` (app block slot plus fallback testimonial blocks), `xo-how-to-use`, `xo-faq`, `xo-featured-journal`, `xo-cta-partners`.

Shared pieces built first: `snippets/xo-section-heading.liquid`, `snippets/xo-per-gram-price.liquid`, `blocks/xo-proof-chip.liquid`, `assets/xo-reveal.js`.

### Phase 4 — Product page

| File | Action |
|---|---|
| `sections/xo-main-product.liquid` | Create: new product layout wrapping Horizon's `product-form-component`, with `@app` block support |
| `templates/product.json` | Rebuild: gallery, title, rating app block, price with per-gram line, variant cards, quantity, add to cart, WhatsApp order, icon row, batch row, accordions |
| `blocks/xo-product-gallery.liquid` | Create: thumbnails, swipe, zoom, video, using Horizon's `media-gallery` element |
| `blocks/xo-variant-cards.liquid`, `assets/xo-variant-cards.js` | Create: size, supply days and savings per card, wired to Horizon's variant-change events |
| `blocks/xo-per-gram-price.liquid` | Create |
| `blocks/xo-buy-box.liquid` | Create: quantity, add to cart, "Order on WhatsApp" |
| `blocks/xo-delivery-icons.liquid` | Create: delivery, COD, guarantee from metafields |
| `blocks/xo-batch-lab-row.liquid` | Create: batch and lab from metafields, hidden when empty |
| `sections/xo-spec-grid.liquid`, `sections/xo-precautions.liquid`, `blocks/xo-pdp-anchor-nav.liquid` | Create: specification cards, precautions block, sticky jump links |
| `blocks/xo-metafield-accordion.liquid` | Create: Benefits, How to Use, What's Inside, Sourcing, Safety, Shipping & Returns |
| `snippets/xo-sticky-atc.liquid` | Create: mobile bar shown after the main button leaves the viewport, driven by Horizon's `sticky-add-to-cart` element |
| `snippets/xo-product-jsonld.liquid` | Create: Product structured data with brand, SKU, offers, rating when present |

Below the fold the product template reuses the Phase 3 sections: reviews, timeline, comparison, FAQ, then Horizon's recommendations.

### Phase 5 — Pages and templates

`templates/page.lab-reports.json` with `sections/xo-lab-reports.liquid` and `assets/xo-lab-search.js` (metaobject table, filter by batch) · `page.our-source.json` · `page.how-to-use.json` · `page.about.json` · `page.wholesale.json` with `sections/xo-lead-form.liquid` (name, city, quantity, business type, through Shopify's contact form) · `page.ambassador.json` · `page.affiliate.json` · `page.track-order.json` · `page.contact.json` (WhatsApp first) · `collection.json` with `sections/xo-main-collection.liquid` and `snippets/xo-product-card.liquid` (rating, per-gram price, badge, quick add) · `article.json` with `sections/xo-main-article.liquid` and `blocks/xo-article-toc.liquid`, `xo-author-box.liquid`, `xo-article-product-cta.liquid`, 68ch measure, Article JSON-LD · `blog.json` with `sections/xo-main-blog.liquid` · `cart.json` with `sections/xo-main-cart.liquid`.

### Phase 6 — SEO, tracking, QA, launch

- `snippets/xo-org-jsonld.liquid` (Organization, Breadcrumb), meta titles and descriptions applied to products, pages and articles.
- Import `redirects.csv`; verify each of the 43 old URLs returns a 301 to a 200.
- Meta Pixel and GA4 through Shopify's sales-channel apps and Customer Events; nothing inline in the theme.
- QA at 360, 768 and 1280px; keyboard and screen-reader pass; Lighthouse mobile target 85+, LCP under 2.5s, CLS under 0.1; every section opened and edited once in the Theme Editor; search for leftover `{{TODO` strings.
- Retire stock Horizon sections: present the deletion list, delete on approval, re-run `theme check`.
- Launch order: publish theme, point the domain, import redirects, submit the new sitemap, watch 404s in the first week.

---

## 8. Which skill is used where

| Skill | Used for |
|---|---|
| `shopify-plugin:shopify-liquid` | Every section, block and snippet; validating objects, filters and schema |
| `shopify-plugin:shopify-custom-data` | Metafield and metaobject definitions in Phase 1 |
| `shopify-plugin:shopify-admin` | GraphQL for product, files, pages, articles, menus and redirects |
| `shopify-plugin:shopify-use-shopify-cli` | `theme dev`, `theme check`, `theme push`, running store operations |
| `shopify-plugin:shopify-dev` | Checking current platform behaviour (redirect limits, font library, Customer Events) |
| `shopify-plugin:shopify-onboarding-merchant` | Store settings checklist: PKR, COD, shipping |
| `shopify-plugin:shopify-storefront-graphql` | Only if lab-report search needs more than Liquid can render |
| `frontend-design:frontend-design`, `design-taste-frontend` | Visual direction for the hero, bundles and product page so they do not look templated |
| `design:ux-copy` | Microcopy: buttons, empty states, form errors, WhatsApp prefill |
| `design:accessibility-review` | WCAG AA pass in Phase 6 |
| `marketing:seo-audit` | Meta rewrite and post-launch check |
| `superpowers:verification-before-completion` | End-of-phase checks before each report |

Not used, with reason: Hydrogen (this is a Liquid theme), checkout and customer-account extensions and Functions (the prompt says not to touch checkout; a COD fee or COD limit would need these later), POS, app pricing and app-store review (no app is being built).

---

## 9. Risks

- **Health claims.** Supplement advertising that implies treatment or cure can get ad accounts and listings rejected. All copy is held to "supports" wording and the risky posts are flagged, but the final call on each claim is yours.
- **Unsupported proof points.** "65%+ fulvic acid", "triple lab tested" and "5,000+ customers" are shown only once confirmed. A proof-led design with no proof is the largest gap between the prompt and reality.
- **Imagery.** Without new photos the store will look clean and well designed but not "ultra premium".
- **SEO during migration.** Post slugs are preserved and every old URL is mapped, which limits the risk. The brand-name fix changes most page titles at once, so expect a few weeks of ranking movement.
- **COD.** Shopify's native COD has no order confirmation step. If fake orders are a problem, a COD form or verification app is a later addition.
