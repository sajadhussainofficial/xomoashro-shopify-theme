# Content map: old WordPress site to new Shopify store

Phase P00 output. Source: `theme-context/wordpress-site/` (captured 2026-10-06). Copy listed here is used in its corrected form; corrections are in `content-fixes.md`. Images are listed in `image-manifest.csv`.

## 1. Source file tree by type

| Path in `wordpress-site/` | Type | Count | Used for |
|---|---|---|---|
| `pages/home.md`, `about-us.md`, `benefits.md`, `contact-us.md`, `become-distributor.md`, `become-brand-ambassadar.md` | Page copy | 6 | Section default content |
| `pages/_global-header-footer.md` | Header and footer copy | 1 | Header, footer, contact data |
| `pages/post--*.md` | Blog posts | 10 | Journal import |
| `pages/privacy-policy.md`, `terms-and-conditions.md`, `shipping-returns.md` | Policies | 3 | Shopify policies (rewritten) |
| `pages/category--*.md`, `tag--*.md`, `author--*.md`, `search-results.md` | Archive listings | 11 | Redirect map only |
| `pages/shop.md`, `cart.md`, `checkout.md`, `my-account.md`, `affiliate-*.md` | Broken or empty pages | 8 | Redirect map only |
| `pages/home-2.md`, `sample-page.md`, `404-error.md`, `real-404.md` | Leftovers | 4 | Redirect map only (`home-2` has older wording of the homepage, not used) |
| `seo-meta.csv` | Titles, descriptions, H1, canonical | 43 rows | SEO carry-over (P20) |
| `assets/images/` | Raster images | 94 | 39 reused (25 journal, 14 product, section, testimonial) |
| `assets/svg/` | Logos, icons, decorations | 47 | 6 reused (5 logos, 1 COD mark as reference) |
| `assets/manifest.json` | Original URL, alt text, old usage per asset | 141 | Image manifest |
| `design-tokens.json` | Old colours and fonts | 1 | Reference only; the old design is not a target |
| `data/*.json` | Raw crawl data (links, JSON-LD, headings) | 43 | Reference |
| `screenshots/` | Full-page screenshots | 86 | Reference, not in git |

No product data file exists: the old store had no working product page.

## 2. Pages and their sections

### Homepage (`pages/home.md`)

| Old section | Old content | New section | Notes |
|---|---|---|---|
| Hero | Eyebrow "Pakistan's Most Trusted Shilajit Source", H1 "Elevate Your Life with Pure Himalayan Aftabi Shilajit", subhead, two buttons | `xo-hero-proof` | "Most trusted" needs CONFIRM. Buy button pointed to a 404 |
| Hero chips | 100% Pure, 30-Day Money Back, Cash On Delivery | `xo-trust-strip` | Guarantee conflict (30 vs 7 days), decision B4 |
| About Our Product | Six benefit blocks: Strong Muscles, Enhance Fitness, Boost Immunity, Support Aging, Activate & Energize, Improves Brain Function | `xo-benefits-grid` | Wording made conservative |
| Most Selling Edition | Product name, 70-word description, three ticks (65%+ fulvic, 16,000 ft, triple lab tested), three icons | `xo-course-bundles`, product description | Lab claims need decision B3 |
| Why Xomoashro is Pakistan's Trusted Shilajit Choice | Intro and six blocks: Authentic, Nationwide Delivery, Genuine Himalayan Shilajit, Guided Support, 100% Pure Resin, Customer Promise | `xo-why` | |
| Our Happy Clients | "Trusted by 5,000+ Pakistani customers", three testimonials | `xo-reviews-wall` | Count needs decision B8 |
| Newsletter | "Join Our Newsletter / Connect With us", email, "Get Exclusive Discount" | Footer newsletter block; promo popup (P13) | A discount is promised; decision B11 |
| FAQ | Five questions | `xo-faq` | Three answers describe powder and capsules; rewritten for resin |
| Our Latest Blogs | Three latest posts | `xo-featured-journal` | |
| (new) | "most Shilajit in the market was fake or diluted" from About | `xo-problem` | Source: `about-us.md` |
| (new, no source copy) | | `xo-stats-band`, `xo-results-timeline`, `xo-lab-proof`, `xo-source-story`, `xo-purity-test`, `xo-comparison-table`, `xo-how-to-use`, `xo-cta-partners` | Drafted conservatively and marked `{{TODO: confirm}}`; stats use only 16,000 ft and 85+ minerals from the source |

### About Us (`pages/about-us.md`) → `page.about`, `page.our-source`

| Old section | New home |
|---|---|
| Intro paragraph | `xo-page-hero` on About |
| Our Story (four short paragraphs: Chitral and Gilgit-Baltistan origin, fake shilajit problem, ethical collectors, 5,000+ customers) | `xo-media-text` on About; `xo-source-story` on Our Source and home |
| About Our Product (same six blocks as home) | `xo-benefits-grid` (shared) |
| Rediscover Health Through Ancient Himalayan Salajeet | `xo-rich-text` on Our Source |
| Why Xomoashro (same six blocks) | `xo-why` (shared) |
| Our Happy Clients (same three) | `xo-reviews-wall` (shared) |

### Other pages

| Old page | Content | New page and sections |
|---|---|---|
| Contact Us | Form (name, email, subject, message); phone +92-3128000718; ask@xomoashro.com; Islamabad; one line of text | `page.contact`: `xo-contact` (WhatsApp first), contact form |
| Become a Distributor | "How it works" five steps; form with nine fields | `page.wholesale`: `xo-page-hero`, `xo-steps`, `xo-lead-form`. Steps describe an affiliate flow ("referral link", "get paid"), not wholesale: CONFIRM |
| Ambassador Program | Three steps, "Why Should I Buy Shilajit?" text, three perks, six FAQ items, form with eight fields including file upload | `page.ambassador`: `xo-page-hero`, `xo-steps`, `xo-rich-text`, perks cards, `xo-faq`, `xo-lead-form`. No file upload (not supported by Shopify's contact form) |
| Blogs (`blogs.md`) | Listing of the ten posts with a sidebar (recent articles, tags, follow us) | `blog.json` with `xo-main-blog`; no sidebar, tag links above the grid |
| Benefits | Lorem ipsum blocks and one duplicated section with an uncited clinical claim | Not migrated. URL redirected to the product |
| Affiliate pages (four) | Raw shortcodes only | `page.affiliate`: new copy needed, decision B6 |
| Shop, Cart, Checkout, My account | Empty or raw shortcodes | Shopify native pages |
| Privacy Policy, Terms and Conditions, Shipping & Returns | Generic templates, 359 to 450 words | Shopify policies, rewritten (see `content-fixes.md`) |

## 3. Product

One product is named in the source. Everything else is missing and is decision B1 and B2.

| Shopify field | Value from source | Status |
|---|---|---|
| Title | "Pure Himaliyan Aftabi Salajeet 30g" → "Pure Himalayan Aftabi Shilajit" (size as variant) | Spelling corrected; CONFIRM "Shilajit" vs "Salajeet" in the title |
| Handle | `pure-himalayan-aftabi-shilajit` (old URL was `/product/black-pure-shilajit/`, redirected) | Proposed |
| Description | 70-word homepage paragraph | Too short; full description needed (B1) |
| Variants | 30g only | B2 |
| Price, compare-at, SKU, weight | None in source | B1 |
| Images | `xomoashro-shilajit-resin-jar-front.webp` (735px), two more candidates | Too small; photo shoot. Jar design needs decision B18 |
| `custom.fulvic_percent` | "65%+" | Unverified (B3) |
| `custom.altitude_ft` | 16,000 | From source |
| `custom.origin_region` | Chitral and Gilgit-Baltistan | From source |
| `custom.batch_number`, `lab_name`, `lab_test_date`, `lab_report` | None | B3 |
| `custom.supply_days`, `net_weight_g`, `best_for` | None | B1, B2 |
| `custom.how_to_use`, `custom.safety` | Partly in FAQ and the dosage post | Drafted in P08, marked for confirmation |
| SEO title and description | Homepage's: "Pure Himalayan Aftabi Shilajit in Pakistan \| Xomoashro" and its description | Reused on the product; homepage gets a variation |

## 4. Journal posts

Blog handle `journal`. Slugs unchanged. Author on the old site was "wp-support"; new author name is "Xomoashro" (CONFIRM if a named author is wanted).

| # | Slug | Title (corrected) | Date | Featured image (new name) | Old tags or category | Review flag |
|---|---|---|---|---|---|---|
| 1 | `what-is-shilajit` | What Is Shilajit? A Clear, Honest Guide to Salajeet | 2026-06-19 | None on the old site: `{{TODO}}` | Uncategorized | Best-written post; keep as the main guide |
| 2 | `shilajit-during-pregnancy` | Use of Shilajit During Pregnancy: A Comprehensive Guide | 2024-01-06 | `xomoashro-journal-shilajit-during-pregnancy-featured.webp` | Benefits of Shilajit, Shilajit for Women | High risk: presents shilajit as a remedy in pregnancy. Owner review before publishing |
| 3 | `exploring-shilajits-impact-on-testosterone` | Exploring Shilajit's Impact on Testosterone | 2024-01-05 | `xomoashro-journal-shilajit-impact-on-testosterone-featured.webp` | Benefits of Shilajit | Hormone claims; featured image has garbled label text |
| 4 | `best-shilajit-breakdown-traditional-medicines` | Best Shilajit Breakdown: Traditional Medicine's Trusted Wellness Companion | 2024-01-04 | `xomoashro-journal-best-shilajit-breakdown-featured.webp` | Best Shilajit | Mentions diseases |
| 5 | `unlocking-the-potential-of-pure-himalayan-shilajit` | Unlocking the Potential of Pure Himalayan Shilajit | 2024-01-03 | `xomoashro-journal-pure-himalayan-shilajit-featured.webp` | Pure Himalayan Shilajit | Mentions Alzheimer's and diabetes; no meta description |
| 6 | `how-to-take-shilajit-dosage-tips` | How to Take Shilajit: Dosage Tips and Safety Protocols | 2024-01-02 | `xomoashro-journal-how-to-take-shilajit-featured.webp` | Shilajit - Dosage | Dosage advice; add precautions block |
| 7 | `shilajit-benefits-for-male-reproductive-system` | Shilajit Benefits for the Male Reproductive System | 2024-01-01 | `xomoashro-journal-male-reproductive-system-featured.webp` | Benefits of Shilajit | Fertility and erectile claims |
| 8 | `what-is-shilajit-types-and-benefits` | What Is Shilajit: Types and Benefits | 2023-12-05 | `xomoashro-journal-what-is-shilajit-types-and-benefits-featured.webp` | Benefits of Shilajit | Overlaps post 1; keep, link to post 1 as the main guide |
| 9 | `10-empowering-benefits-of-shilajit-for-women` | 10 Empowering Benefits of Shilajit for Women | 2023-12-05 | `xomoashro-journal-benefits-of-shilajit-for-women-featured.webp` | Shilajit for Women | Anaemia claims |
| 10 | `shilajit-benefits-for-men-boost-energy` | Shilajit Benefits for Men: Boost Energy, Testosterone, and More | 2023-12-05 | `xomoashro-journal-shilajit-benefits-for-men-featured.webp` | Benefits of Shilajit | Infertility, erectile, blood pressure claims |

Tags on Shopify (from the old categories and tags, so the redirects land): `benefits-of-shilajit`, `best-shilajit`, `pure-himalayan-shilajit`, `shilajit-dosage`, `shilajit-for-women`, `himalayan-shilajit`, `himalayan-shilajit-for-immunity`, `natural-health-supplements`.

All journal images are AI-generated illustrations. They are kept for the journal only and are not used in store sections.

## 5. Policies

| Old page | Problem | New home |
|---|---|---|
| Privacy Policy (412 words) | Generic template | Settings > Policies > Privacy policy, regenerated from Shopify's template and reviewed |
| Terms and Conditions (450 words) | Generic template | Terms of service |
| Shipping & Returns (359 words) | "[X] business days", "[your contact email or form]", offers international shipping, 30-day returns on a consumable | Split into Shipping policy and Refund policy; facts from decision B9 and B4 |

## 6. Testimonials

| Name | Role | Text (first words) | Photo | Status |
|---|---|---|---|---|
| Abdullah | Cricketer | "I'm delighted with the high-quality shilajit…" | `xomoashro-customer-abdullah.webp` | Usable |
| Asad | Happy Customer | "Xomoashro's shilajit is top-notch!…" | `xomoashro-customer-asad.webp` (original file name `Khalid-Kurt.png`) | CONFIRM identity (B8) |
| Taimoor Khan | Professional International Boxer | "Xomoashro's shilajit is a game-changer!…" | `xomoashro-customer-taimoor-khan.webp` | Usable |

All three were shown as 5 out of 5 stars. They are testimonials supplied by the brand, not verified reviews, so they are shown without star ratings in structured data.

## 7. Contact data

| Item | Value on the old site | Where | Status |
|---|---|---|---|
| Email | ask@xomoashro.com | Footer, contact, FAQ, policy | Consistent. Goes to `custom.support_email` |
| Phone | +92-3128000718 | Contact page | Conflict, decision B4 |
| Phone | +9230333444 (twice) | Footer | Too short to be a valid number |
| WhatsApp | +923445443333 | FAQ answer | Conflict, decision B4 |
| City | Islamabad | Contact page | No street address |
| Facebook, Twitter, YouTube, Instagram | Icons with no links | Footer, blog sidebar | Decision B8 |
| Fulfilment time | "4–5 business days" | FAQ | Conflicts with "Fast delivery"; decision B9 |
