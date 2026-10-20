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

Owner answers on 2026-10-20:
- **Product:** facts later, so the product moves to the new last phase, P25.
- **Posts:** rewrite all nine and keep "What is shilajit?" as it is.
- **Shipping and returns:** use the recommended terms.
- **Jars:** use all three jar designs (in P25).

Live recheck on 2026-10-20 of `https://xomoashro.com/blogs/`:
- **Posts:** the same 10, and the text matches the capture. Nine were last edited on 2025-03-15 and the main guide on 2026-06-19.
- **Found:** the live site's SSL certificate expired on 7 October 2026, so browsers show a warning.

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Rewrite the nine posts from the captured text: honest wording, real sources, H2/H3 only, no sidebar text | `_build/blog-import/*.md` | 684 to 967 words each; links resolve; every Google title 60 characters or fewer; six studies checked against their abstracts | done |
| 2 | Pictures: 19 of the 26 old post pictures kept; 7 left out (anaemia diagram, garbled "TESTOTTONE BOOSTER" jar, caviar stock photo, benefit-claims chart, immune and fertility organ diagrams, one pregnancy image beside pills) | `tools/import-blog.mjs upload` | 19 files read back with their addresses | needs approval |
| 3 | Create the nine posts with original slugs, dates, tags, pictures and Google fields | `tools/import-blog.mjs create` | Each opens at `/blogs/guides/<slug>` | needs approval |
| 4 | Article design without the shop box, for the pregnancy post | `templates/article.safety.json` | `?view=safety`: 0 shop boxes; precautions, contents, author and share stay | done |
| 5 | Policy drafts | `_build/policies/shipping-policy.md`, `refund-policy.md`, `privacy-and-terms.md` | No bracketed gaps; facts match B4 and B9 | done; owner to confirm the money-back terms |
| 6 | Put the policies in the store | none | Policy pages open | owner pastes, or approves the extra login permission |
| 7 | Read everything back and record it | `_build/import/blog-import-log.json`, report | Every item ticked | to do |
| - | Real product | moved to P25 | | moved |

## Not in this phase

- Redirects from the old addresses (P20).
- Lab reports (B3).
- Reviews.
- Store name and time zone: owner settings in Settings > General.
