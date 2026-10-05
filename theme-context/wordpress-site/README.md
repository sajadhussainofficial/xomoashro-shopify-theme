# xomoashro.com — WordPress site research (captured 2026-10-06)

Reference capture of the live WordPress site. The old design is outdated and is NOT a design target;
use this folder for copy, SEO meta, brand facts and assets only.

## What is here

| Path | Contents |
|---|---|
| `seo-meta.csv` | Meta title, meta description, robots, canonical, H1, word count, OG tags for all 43 URLs |
| `pages/<slug>.md` | Full copy of each page (headings, body, buttons with link targets, form fields, image refs) plus its meta |
| `pages/_global-header-footer.md` | Shared header and footer copy |
| `screenshots/desktop/<slug>.png` | Full-page screenshot at 1440px |
| `screenshots/mobile/<slug>.png` | Full-page screenshot at 390px (2x) |
| `assets/images`, `assets/svg` | 141 files: the whole public media library (94 raster, 47 SVG) |
| `assets/manifest.json` | Per asset: original URL, alt text, upload date, and which pages use it (`used_on`) |
| `design-tokens.json` | Colours, fonts and computed type styles of the old site |
| `data/<slug>.json` | Raw crawl data per URL (all links, JSON-LD, headings) |

Slugs: pages use their WP slug (`home`, `about-us`, ...); others are prefixed `post--`, `category--`, `tag--`, `author--`.

## Site facts

- Stack: WordPress, Astra theme, Elementor + Elementor Pro, Rank Math SEO, LiteSpeed Cache, PixelYourSite, Google Site Kit, SliceWP (affiliates).
- Business: Xomoashro sells one product, "Pure Himaliyan Aftabi Salajeet 30g" (Himalayan shilajit resin), to customers in Pakistan. Cash on delivery.
- Claims used in copy: 65%+ fulvic acid, sourced at 16,000 ft, triple lab tested, 85+ minerals, 5,000+ customers, sourced from Chitral and Gilgit-Baltistan.
- Contact: ask@xomoashro.com, Islamabad. Phone numbers are inconsistent across the site: +92-3128000718 (contact page), +9230333444 (footer, twice), +923445443333 (FAQ WhatsApp).
- Brand: accent orange `#FF6B31`, tint `#FFF4F0`, black headings, grey text `#54595F`/`#7A7A7A`. Fonts: Poppins (headings), Roboto (body). Logo: `assets/svg/Asset-24.svg` (header), `Asset-25.svg` (footer, white), favicon `Asset-22.svg`.

## URL inventory (43)

- Content pages: home, about-us, benefits, contact-us, blogs, become-distributor, become-brand-ambassadar
- Legal: privacy-policy, terms-and-conditions, shipping-returns
- Blog posts (10): see `post--*`
- Archives: 6 categories, 3 tags, 1 author, search — all render the same blog listing
- Broken or empty: shop, cart, checkout, my-account, affiliate-registration, affiliate-account, affiliate-dashboard, affiliate-reset-password
- Leftovers: home-2 (older homepage), 404-error, sample-page

## Problems found on the live site

- There is no working store. WooCommerce is not active: `/shop/` is an empty page, `/cart/`, `/checkout/`, `/my-account/` print raw shortcodes, and the homepage "Buy Now" button links to `/product/black-pure-shilajit/`, which returns 404. No price is shown anywhere.
- The four affiliate pages print raw `[slicewp_...]` shortcodes.
- The header has no navigation menu, only logo and search.
- Footer logo is a broken image (`/wp-content/uploads/Asset-25.svg` 404). Two illustration SVGs on the distributor and ambassador pages also 404.
- `/benefits/` contains Lorem ipsum placeholder blocks and a duplicated section.
- `/shipping-returns/` still has template placeholders ("[X] business days", "[your contact email or form]").
- Money-back claim is inconsistent: "30-Day Money Back" in the hero, "7-day money-back" in the product block.
- Brand name is spelled four ways: Xomoashro, Xomorashro (site title and most meta titles), Xomashro (testimonials), Xomoahro (footer copyright). "Ambassadar" is misspelled throughout, including the URL.
- SEO: 25 of 43 URLs have no meta description (including benefits, become-distributor, become-brand-ambassadar and one post). Only 14 URLs set an OG image; the homepage does not. Category and tag archives all use "Blogs" as H1. Indexable junk in the sitemap: home-2, sample-page, 404-error, cart, checkout, affiliate pages. Several post titles exceed 60 characters.
- The custom 404 page's "Back To Home" button links to `#`.
- Footer social icons and "Affiliate Program"/"My Account" both point at the broken affiliate dashboard.
