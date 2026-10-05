# Content mapping, copy corrections, redirect map

Reference for content, import and SEO phases.

---

## Content and SEO carry-over

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
