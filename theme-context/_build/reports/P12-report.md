# P12 report — Content import

Date: 2026-10-20 to 2026-10-21. Branch: `phase/P12-content-import`.

## 1. Result

The blog now has all ten posts from the old site, at their old web address names under `/blogs/guides/`.
- **"What is shilajit?"** was imported in P11 and is kept exactly as it was, at your request.
- **The other nine** were rewritten from the captured text and published, with 19 of their old pictures.

The real product moved to a new phase, **P25 "Real product data"**, at your request. It runs last, just before launch. The policies are drafted and wait for you to confirm and paste them.

## 2. Your decisions (2026-10-20)

| Question | Answer | Recorded as |
|---|---|---|
| Product facts (B1, B2) | Later; you will gather them | New phase P25, just before launch (P24 now needs it) |
| Blog posts (B24) | Rewrite all nine; keep the guide as it is | Done |
| Shipping and returns (B9) | Use the recommended terms | Policy drafts |
| Jar photos (B18) | Use all three designs | Applied in P25 |
| Create the posts | "Yes, publish all 9" | Done |

## 3. Where the content came from

| Content | Source | What changed |
|---|---|---|
| 9 posts | The old site's posts, captured on 6 October. Rechecked against the live site on 20 October: the same 10 posts and text, last edited in March 2025 | Rewritten (section 4) |
| 19 pictures | The old posts' own pictures, compressed to WebP | Uploaded to Shopify Files |
| Shipping and refund policies | Old pages had "[X] business days", international shipping and 30-day returns on a food product | New drafts from your facts and the recommended terms |
| Privacy policy and terms | Old pages were generic templates | Steps to create them from Shopify's own templates, with your details |

## 4. How the posts were rewritten

- **Same topic, address, original date and old category** (now a topic tag) for each post.
- **Removed:** claims that cannot be backed up:
  - "endorsed by WHO"
  - treating anaemia, diabetes or Alzheimer's
  - erectile and "size" claims
  - shilajit as a pregnancy remedy
  - an unsourced "20% weaker" figure for fire-dried shilajit
  - folk tales stated as fact
  - capsule and powder advice for a resin product
- **Added:**
  - six published studies, each checked against its abstract and listed under "Sources"
  - plain "speak to your doctor" guidance
  - links between related posts
- **Dosage:** matches the rest of the site (a pea-sized amount, once a day, keep to the label).
- **Pregnancy post:** now opens with "not recommended during pregnancy or breastfeeding". It uses a new article design, `article.safety`, without the "Try pure Himalayan shilajit" box.
- **Pictures:** 19 of the 26 old ones kept, so every post has at least one. Left out: the "ANEMIA" diagram, a jar with garbled "TESTOTTONE BOOSTER" text, a caviar stock photo, a chart with claims printed on it, two organ diagrams, and a pregnant woman beside pills.

| Post | Words | Topic |
|---|---|---|
| Types of shilajit | 916 | Himalayan shilajit |
| How to take shilajit | 912 | Shilajit dosage |
| Aftabi and Agni shilajit | 737 | Best shilajit |
| Pure Himalayan shilajit | 967 | Pure Himalayan shilajit |
| Shilajit for women | 830 | Shilajit for women |
| Shilajit for men | 862 | Benefits of shilajit |
| Shilajit and male fertility | 769 | Benefits of shilajit |
| Does shilajit raise testosterone? | 750 | Benefits of shilajit |
| Shilajit during pregnancy | 684 | Shilajit for women |

## 5. Store changes (approved)

- **Files:** 19 pictures uploaded to Shopify Files.
- **Posts:** 9 posts created and published.

The inputs are `blog-import/*.md`, run through `tools/import-blog.mjs`. Every step is safe to repeat: existing posts and pictures are skipped. Results are in `import/blog-import-log.json`.

## 6. Acceptance checks

Screenshots are in `reports/P12-screens/`.

| Check | Result | Evidence |
|---|---|---|
| All ten posts open at `/blogs/guides/<old-slug>` | Pass. All 10 return 200 | test log |
| No template still references a placeholder image | Pass. The page designs use Files images. The 12 optional empty image slots each fall back by design: text-only heading, product photo, initials, or the SVG logo | test log |
| Policies contain no bracketed placeholders | Pass for the drafts. Not yet in the store (section 7) | `policies/*.md` |
| Product page shows real data | Moved to P25 at your request | |
| Blog page and homepage | Pass. Blog page: the guide featured, 9 cards, 6 topic links. Homepage: 3 posts | `blog-1280.png`, `blog-360.png` |
| Each article | Pass at 1280 and 360px. One H1; contents list; shop box after paragraph 4 and at the end (none on the pregnancy post); related posts; every picture loads; no sideways scroll | `article-aftabi-360.png`, `article-pregnancy-1280.png` |
| Toolkit validation and theme check | Pass. Theme check 0 errors, 18 warnings (unchanged) | |

## 7. Open items

- **Store time zone:** it is US Eastern, so post dates show one day early (5 January instead of 6 January). Set **Settings > General > Time zone** to Karachi.
- **Refund policy:** the site promises a "7-day money-back guarantee", so the draft refunds opened jars too, once per customer. Confirm it or tell us what to change, then paste the shipping and refund policies into Settings > Policies. Create the privacy policy and terms from Shopify's templates, following `policies/privacy-and-terms.md`.
- **Old WordPress site:** its SSL certificate expired on 7 October 2026, so visitors see a browser warning. Renew it with the hosting provider while that site is still live.
- **Live theme:** it does not have the P11 and P12 designs yet. The posts are visible there in the old design, and the pregnancy post still shows the shop box. Push live when you are ready (backup first).
- **Local preview "fetch failed":** this machine cannot reach Shopify over IPv6. Start `shopify theme dev` with `NODE_OPTIONS="--network-family-autoselection-attempt-timeout=2000"` (see implementation plan, section 3).
- **Store name:** still "https://xomoashro.com/" in page titles (raised in P09).

## 8. Next

P13, Promotional popup. It needs decision B11: what the popup offers (newsletter only, a discount code and its value, or an announcement).
