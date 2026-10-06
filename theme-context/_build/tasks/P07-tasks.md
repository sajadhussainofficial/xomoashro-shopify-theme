# P07 tasks

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Shared pieces: six icons, mountain drawing for empty image slots, card and number styles, store-fact text helper, labels | `assets/xo-icon-bolt.svg`, `-target`, `-heart`, `-chat`, `-users`, `-strength`, `assets/xo-art-mountains.svg`, `assets/xo-base.css`, `snippets/xo-fact-text.liquid`, `snippets/xo-image.liquid`, `snippets/xo-icon.liquid`, `sections/xo-styleguide.liquid`, `locales/en.default.json`, `locales/en.default.schema.json` | Toolkit validation and theme check pass; new icons show in the style guide | done |
| 2 | Hero, trust strip, statement | `sections/xo-hero-proof.liquid`, `xo-trust-strip.liquid`, `xo-problem.liquid` | One H1; guarantee line filled from store data; buttons with no link are not shown | done |
| 3 | Sizes and bundles, price per gram | `sections/xo-course-bundles.liquid`, `snippets/xo-per-gram-price.liquid` | Hidden while no product is chosen; card layout reviewed at three widths; add to cart opens the drawer | done, except add to cart (no product in the store, see report) |
| 4 | Benefits, numbers band, why us, results timeline | `sections/xo-benefits-grid.liquid`, `xo-stats-band.liquid`, `xo-why.liquid`, `xo-results-timeline.liquid` | Corrected wording from `content-fixes.md`; numbers line up at every width | done |
| 5 | Lab report, source story, purity checks, comparison table | `sections/xo-lab-proof.liquid`, `xo-source-story.liquid`, `xo-purity-test.liquid`, `xo-comparison-table.liquid` | Lab section hidden while no report exists; table readable at 360px | done; lab section never run with a real report (none exists) |
| 6 | Reviews, how to use, questions and answers, journal posts, partner links | `sections/xo-reviews-wall.liquid`, `xo-how-to-use.liquid`, `xo-faq.liquid`, `xo-featured-journal.liquid`, `xo-cta-partners.liquid`, `snippets/xo-faq-jsonld.liquid` | Questions open by mouse and keyboard; search-engine data matches the visible questions; journal hidden while there are no posts | done; journal never run with real posts (none exist) |
| 7 | Assemble the homepage | `templates/index.json` | 17 sections in the agreed order, timeline switched off; no Lorem ipsum, no empty blocks | done |
| 8 | Checks | `reports/P07-screens/` | 360, 768, 1280px reviewed; text, block, order and colour edits change the page; sections work when used twice | done |
