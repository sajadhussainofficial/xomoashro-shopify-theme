# P12 tasks

Analysis done on 2026-10-20, before any store write. Some of the phase outline was finished earlier:
- **Pages:** all 9 created in P10.
- **Menus:** done in P10 and P11. The P00 plan in `menus.json` was replaced by the owner-approved menus.
- **Blog:** created in P11 at `/blogs/guides`, with post 1 of 10.
- **Page design images:** already Shopify Files images. None of the 12 empty image slots shows a placeholder; each falls back on purpose:
  - page headings without a picture are text only
  - the author box and logos use the SVG logo
  - a review without a photo shows initials
  - the bundles section uses the product photo

The phase's acceptance check "posts open at `/blogs/journal/<slug>`" now reads `/blogs/guides/<slug>` (owner decision, P11).

## Where the content comes from

| Content | Source | What changes |
|---|---|---|
| Blog posts (9) | `wordpress-site/pages/post--*.md` (text captured from the old site) | Spelling, structure and health wording; nothing invented |
| Post images (25) | `images-optimized/xomoashro-journal-*.webp` (the old site's images, renamed and compressed) | Uploaded to Shopify Files |
| Product | Old site: name, a 70-word paragraph, altitude and region. Owner: price, sizes, SKU, weight, description (B1, B2) | Real product replaces "TEST – do not buy" |
| Product photos | Images already in Files (restaged from the old photos); jar choice B18 | Attached to the product |
| Policies (4) | Old pages are generic templates with "[X]" gaps, international shipping and 30-day returns on a food product | Rewritten from Shopify's templates plus owner facts (B9, B4) |

## The nine posts

| Post (slug kept) | Old date | Words | Main issue | Action | Publish |
|---|---|---|---|---|---|
| `what-is-shilajit-types-and-benefits` | 2023-12-05 | 1,449 | Overlaps the main guide | Fix; link to `what-is-shilajit` near the top | Yes |
| `how-to-take-shilajit-dosage-tips` | 2024-01-02 | 1,657 | Dosage advice | Align amounts with the label (CONFIRM) | Hidden until approved |
| `best-shilajit-breakdown-traditional-medicines` | 2024-01-04 | 1,545 | Names diseases | Remove, or "research is early" | Hidden until approved |
| `unlocking-the-potential-of-pure-himalayan-shilajit` | 2024-01-03 | 1,653 | Alzheimer's, diabetes | Same | Hidden until approved |
| `10-empowering-benefits-of-shilajit-for-women` | 2023-12-05 | 1,956 | Anaemia, menopause claims | "Traditionally used for"; doctor for anaemia | Hidden until approved |
| `shilajit-benefits-for-men-boost-energy` | 2023-12-05 | 1,658 | Anaemia, heart, fertility, testosterone | Rephrase; condition names out of headings | Hidden until approved |
| `shilajit-benefits-for-male-reproductive-system` | 2024-01-01 | 1,643 | Fertility and erectile claims | Same | Hidden until approved |
| `exploring-shilajits-impact-on-testosterone` | 2024-01-05 | 1,322 | Hormone claims, studies without sources | Cite a real study or remove the claim | Hidden until approved |
| `shilajit-during-pregnancy` | 2024-01-06 | 1,721 | Presents shilajit as a pregnancy remedy | Rewrite: not recommended in pregnancy or breastfeeding unless a doctor advises; or unpublish and redirect | Hidden; owner decides |

All nine also get:
- the brand spelling fix
- tidied title punctuation
- the typed-in "Table of Contents" removed (the article page builds one)
- skipped heading levels fixed (H4 sections become H2, H5 questions become H3)
- the sidebar text and comment form captured with the page removed
- author "Xomoashro" and an old-category tag
- featured image, summary, and Google title and description
- the precautions box at the end (added by the article page)

## Tasks

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Clean the nine posts into import files | `_build/blog-import/*.md` | Fixes applied; headings H2/H3 only; no sidebar text; word count close to the source | to do |
| 2 | Upload the post images to Shopify Files | `_build/import/import-log.md` | 25 files read back with their addresses | needs approval |
| 3 | Create the posts with original slugs, dates, tags, images and Google fields: 1 published, 8 hidden | `_build/import/article-*.json` | Each opens at `/blogs/guides/<slug>`; hidden ones only after approval | needs approval |
| 4 | Real product: build the import from the owner's answers, show it, then create it; point the homepage bundles and the cart suggestion at it; then retire the TEST product | `_build/products-import.csv` or `_build/import/product-set.json` | Product page shows real data and adds to cart | waits for B1, B2 |
| 5 | Write the four policies with no bracketed gaps | `_build/policies/*.md` | No "[ ]" left; facts match B4 and B9 | waits for B9 (returns, fee) |
| 6 | Put the policies in the store: the owner pastes them, or a new login with the policy permission | none | Policy pages open | needs approval |
| 7 | Read everything back and record it | `_build/import/import-log.md` | Every item ticked | to do |

## Not in this phase

- Redirects from the old addresses (P20).
- Lab reports (B3).
- Reviews.
- Store name and time zone: owner settings in Settings > General.
