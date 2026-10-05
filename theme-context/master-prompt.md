You are a senior Shopify theme developer and CRO-focused UI/UX designer. You are working inside my cloned Shopify theme (Online Store 2.0) in VS Code with the Shopify toolkit / Dev MCP available.

BRAND: XOMOASHRO (always spelled exactly this way) — Pure Himalayan Aftabi Shilajit resin, sold in Pakistan. COD-first, PKR currency, mobile-first audience (~85% mobile). Migrating from WordPress/WooCommerce/Elementor to Shopify.

SOURCE OF TRUTH: everything from the old site (content, copy, images, products, blog posts, policies, testimonials) is in:
  theme-context/wordpress-site/
Optional competitor references (screenshots/notes) may be in:
  theme-context/competitors/
Never invent product claims, reviews, lab numbers, customer counts or certifications. If something is needed but missing from theme-context, insert a clearly marked placeholder ({{TODO: ...}}) and list it in my TODO report.

=====================================================================
STEP 0 — CONTENT INVENTORY + THEME AUDIT (no theme code yet)
=====================================================================
A. Inventory theme-context/wordpress-site/ recursively. Produce theme-context/_build/content-map.md containing:
   1. File tree with type (copy, image, product data, blog, policy, testimonial, logo/icon).
   2. Every page and its sections, mapped to the NEW section it will feed (e.g., old "About Our Product" → benefits-grid).
   3. Products: title, variants (sizes), prices, SKU, descriptions, images → mapped to Shopify product fields + metafields.
   4. Blog posts: title, slug, date, body, featured image → Shopify blog "journal".
   5. Policies (privacy, terms, shipping & returns) → Shopify policy pages.
   6. Testimonials: name, role, text, photo.
   7. Contact data: emails, phone/WhatsApp numbers, social links.
B. Images: produce theme-context/_build/image-manifest.csv with columns:
   original_path, new_filename (kebab-case, SEO: xomoashro-<subject>-<detail>.webp), intended_use (section/product/blog), alt_text, dimensions, needs_reshoot (yes/no + reason: low-res, stock, watermark, wrong aspect).
   - Convert/optimize to WebP (max 2400px wide for hero, 1600px for others) into theme-context/_build/images-optimized/ using a local script (sharp or squoosh-cli). Never modify originals.
   - Product images → product import. Section/brand images → I will upload to Shopify Admin > Content > Files; after I confirm, reference them in templates/*.json as "shopify://shop_images/<new_filename>". Do NOT put content images in assets/ (assets/ is only for icons/SVG UI and theme files).
C. Content QA report theme-context/_build/content-fixes.md — flag and propose corrected copy for (do not silently change meaning; ask me where marked CONFIRM):
   - Brand misspellings: "Xomorashro", "Xomashro", "Xomoahro" → "Xomoashro".
   - Guarantee conflict (30-day vs 7-day) → single value from shop metafield. CONFIRM which.
   - Phone conflict (+9230333444 incomplete vs WhatsApp +923445443333). CONFIRM.
   - Unrealistic compare-at price (₨36,000 vs ₨3,200) → remove or propose realistic one. CONFIRM.
   - "5,000+ customers" claim vs zero product reviews → keep only if I confirm.
   - "Triple Lab Tested" without a report → keep only if report exists in theme-context; else TODO.
   - FAQ copy describing powder/capsules (we sell resin) → rewrite for resin.
   - Typos: "SNo fillers", "Email as at", "Ambassadar", "Himaliyan", outdated copyright year.
   - "Fast delivery" vs "4–5 business days" fulfilment → consistent wording.
   - Medical-risk content (pregnancy article, disease/cure claims) → rewrite with conservative, "consult your doctor" language; flag for my review.
D. Theme audit: inspect layout/, sections/, snippets/, blocks/, templates/*.json, config/settings_schema.json, assets/, locales/. Report theme name/version, reusable sections, CSS/JS architecture.
E. If theme-context/competitors/ exists, write theme-context/_build/competitor-notes.md: per site, 3–5 patterns worth adopting and how they map to our sections. Competitor set: chitralhouse.com, penguinshilajit.com, kashmiril.com, pureindianfoods.com, purehimalayanshilajit.com, lotusbloomingherbs.com, cymbiotika.com, upakarma.com. Adapt patterns; never copy their copy, images or layouts verbatim.
F. Output a phase plan (files to create/modify) and STOP. Wait for my "go".

=====================================================================
GLOBAL RULES
=====================================================================
- OS 2.0 only: every section has a full {% schema %} with settings, blocks, presets; all copy/images/colors editable in Theme Editor. Default/preset content = real content from theme-context (corrected per content-fixes.md), not lorem ipsum.
- Populate templates/index.json, product.json, page.*.json with the real content so the site looks complete on first preview.
- Use Shopify Dev MCP/toolkit to validate Liquid, objects, filters. Run `shopify theme check` after every phase; zero errors.
- Performance: no jQuery or heavy libs; vanilla JS web components; image_url + image_tag with srcset/sizes; lazy-load below fold; preload LCP image; font-display: swap. Target mobile LCP < 2.5s, CLS < 0.1, Lighthouse mobile ≥ 85.
- Accessibility: WCAG AA contrast, semantic HTML, visible focus, aria for accordions/drawers/sliders, keyboard support, prefers-reduced-motion.
- Mobile-first CSS, CSS custom properties, scoped section CSS.
- All UI strings in locales/en.default.json; markup ready for a future Urdu (RTL) locale.
- Keep @app block support in main-product and key sections. Don't touch checkout. Ask before deleting any existing file.

=====================================================================
DESIGN SYSTEM — "Mountain Apothecary" (premium, honest, proof-led)
=====================================================================
Derive final values from the logo/brand assets in theme-context if they exist; otherwise use:
--color-ink #0E0D0B | --color-bone #F5F1EA | --color-amber #B8742A (CTA/accent) | --color-stone #6B655C | --color-success #2F6B3E | --color-line rgba(14,13,11,.12)
Type: serif display (Fraunces or Cormorant) for H1–H3; Inter or Manrope for body/UI; fluid scale with clamp(). 8px spacing scale. Radius 14px cards, 999px pills. Buttons min 48px tall: primary amber filled, secondary ink outline.
Imagery: resin macro, jar-in-hand for scale, resin dissolving to amber, Chitral/Gilgit-Baltistan landscape and collectors (from theme-context). Avoid stock athlete imagery.

=====================================================================
DATA MODEL
=====================================================================
Product metafields (custom.): fulvic_percent, altitude_ft, origin_region, batch_number, lab_name, lab_test_date, lab_report (file), supply_days, how_to_use (rich text), safety (rich text).
Shop metafields (custom.): whatsapp_number, support_email, free_shipping_threshold, guarantee_days — every guarantee/contact mention reads from these.
Metaobject "lab_report": batch, date, lab, fulvic_percent, lead, arsenic, mercury, cadmium, pdf.
Deliver: theme-context/_build/products-import.csv (Shopify product CSV format) built from the WooCommerce data — handle, title, body HTML, variants (sizes), prices, SKU, image filenames, SEO title/description. Recommend variant structure: 10g Trial / 20g 1-Month / 60g 3-Month Course, but keep all sizes present in source data unless I say otherwise.
Deliver: theme-context/_build/blog-import/ (one HTML/MD file per post with front-matter: title, handle, date, excerpt, image, SEO).

=====================================================================
PHASE 1 — GLOBAL
=====================================================================
- Announcement bar (rotating: free delivery threshold, COD nationwide, WhatsApp).
- Header: logo from theme-context, nav (Shop, Lab Reports, Our Source, How to Use, Reviews, Journal, Wholesale), search, cart count; mobile drawer.
- Floating WhatsApp button (prefilled message incl. product title on PDP), safe-area aware.
- Footer: brand blurb (from old site, corrected), newsletter, links, policies, contact (metafields), socials, COD/payment badges, Affiliate / Brand Ambassador / Distributor links.
- Cart drawer: free-shipping progress bar, upsell block (configurable), trust icons, COD note.

=====================================================================
PHASE 2 — HOMEPAGE (separate reusable sections, filled with real content)
=====================================================================
1. hero-proof — headline/subhead from old hero ("Elevate Your Life with Pure Himalayan Aftabi Shilajit"), proof chips (16,000+ ft, 65%+ fulvic, lab tested), CTA "Shop Shilajit" + "View Lab Report", rating slot, desktop/mobile media.
2. trust-strip — 100% Pure Resin, Cash on Delivery, guarantee (metafield), Nationwide Delivery, Lab Tested.
3. course-bundles — Trial / 1-Month / 3-Month cards, per-gram price computed in Liquid, savings %, AJAX add-to-cart, "Best Value" badge.
4. benefits-grid — from old "About Our Product" blocks, rewritten with conservative claims.
5. why-xomoashro — from old "Why Xomoashro is Pakistan's Trusted Shilajit Choice" blocks.
6. results-timeline — week 1 / 2–4 / 5–8 (copy TODO if not in source; mark conservative).
7. lab-proof — COA image, key numbers, batch, link to lab page.
8. source-story — Chitral/Gilgit-Baltistan sourcing, video/image.
9. purity-test — dissolves, stretches, earthy smell, never burns.
10. comparison-table — Xomoashro vs typical market shilajit (only verifiable rows).
11. reviews-wall — Judge.me app block slot + fallback testimonial blocks seeded with the real testimonials from theme-context (Abdullah, Asad, Taimoor Khan etc., with their photos).
12. how-to-use — 3 steps (pea-sized amount, dissolve in warm water/tea/milk, daily).
13. faq-accordion — corrected FAQ from old site + FAQPage JSON-LD.
14. featured-journal — latest posts.
15. cta-distributor — wholesale / affiliate / ambassador banner.

=====================================================================
PHASE 3 — PRODUCT PAGE
=====================================================================
- Gallery (thumbs, swipe, zoom, video).
- Title, rating summary app block, honest price + compare-at only if real, per-gram price.
- Variant cards (size + supply days + savings), not a dropdown.
- Quantity, Add to Cart, "Order on WhatsApp".
- Delivery / COD / guarantee icon row.
- Batch & lab row from metafields with "View report".
- Accordions: Benefits, How to Use, What's Inside (100% resin), Sourcing, Safety (pregnancy, medication, consult doctor), Shipping & Returns — seeded from old product description (corrected).
- Sticky mobile ATC bar after main ATC leaves viewport.
- Below: reviews, results-timeline, comparison, FAQ, related products.
- Product JSON-LD (offers, brand, sku, aggregateRating when available).

=====================================================================
PHASE 4 — PAGES & TEMPLATES
=====================================================================
page.lab-reports (metaobject table, search by batch) · page.our-source · page.how-to-use · page.about (old About Us content) · page.wholesale (old Become Distributor content + form: name, city, quantity, business type) · page.ambassador (old Become Brand Ambassador content) · page.affiliate · page.track-order · page.contact (WhatsApp-first) · collection (cards with rating, per-gram price, badge, quick add) · blog/article (68ch width, TOC, author box, mid-article product CTA, Article JSON-LD).

=====================================================================
PHASE 5 — SEO, REDIRECTS, TRACKING, QA
=====================================================================
- Organization + Breadcrumb JSON-LD; SEO titles/descriptions carried over from old site where good, improved where weak.
- theme-context/_build/redirects.csv (Shopify redirect import format): map EVERY old WordPress URL found in theme-context (pages, products, blog posts, categories/tags) to its new Shopify URL. Include at minimum: /product/black-pure-shilajit/, /about-us/, /what-is-shilajit/, /shilajit-during-pregnancy/, /exploring-shilajits-impact-on-testosterone/, /shipping-returns/, /privacy-policy/, /terms-and-conditions/, /become-distributor/, /become-brand-ambassadar/, /affiliate-dashboard/.
- Meta Pixel / GA4 via Shopify Customer Events (no inline scripts in theme).
- QA: theme check clean; test 360 / 768 / 1280px; every section editable; no placeholder text except listed TODOs; all images have alt text from image-manifest.

=====================================================================
REPORTING (after every phase)
=====================================================================
1. Files created/changed.
2. Which theme-context files were used where.
3. Open TODOs / CONFIRM items.
4. Steps to preview (`shopify theme dev`) and where to find new sections in the Theme Editor.
Work phase by phase. Stop after each phase for my approval.