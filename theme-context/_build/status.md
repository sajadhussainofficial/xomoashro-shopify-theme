# Build status

The single record of progress. The runner updates this file at the start and end of every phase. Status values: `not started`, `in progress`, `blocked` (say by what), `awaiting approval`, `done`.

| Order | Phase | Title | Needs | Hard decisions | Status | Started | Finished | Report |
|---|---|---|---|---|---|---|---|---|
| 1 | [P00](phases/P00-inventory-and-audit.md) | Inventory and audit | - | - | in progress | 2026-10-06 | | |
| 2 | [P02](phases/P02-design-foundation.md) | Design foundation | P00 | - | not started | | | |
| 3 | [P03](phases/P03-header-and-navigation.md) | Header and navigation | P02 | - | not started | | | |
| 4 | [P04](phases/P04-announcement-bar.md) | Announcement bar | P02 | - | not started | | | |
| 5 | [P05](phases/P05-footer.md) | Footer | P02 | - | not started | | | |
| 6 | [P01](phases/P01-store-setup-and-data-model.md) | Store setup and data model | P00 | B7 | not started | | | |
| 7 | [P06](phases/P06-cart-drawer-and-cart-page.md) | Cart drawer and cart page | P02, P01 | B7 | not started | | | |
| 8 | [P07](phases/P07-homepage.md) | Homepage | P02, P03, P05 | - | not started | | | |
| 9 | [P08](phases/P08-product-page.md) | Product page | P02, P06, P01, P07 | B7 | not started | | | |
| 10 | [P09](phases/P09-collection-search-and-utility-pages.md) | Collection, search and utility pages | P02, P08 | - | not started | | | |
| 11 | [P10](phases/P10-content-pages.md) | Content pages | P02, P07, P01 | - | not started | | | |
| 12 | [P11](phases/P11-blog-and-article.md) | Journal: blog and article | P02 | - | not started | | | |
| 13 | [P12](phases/P12-content-import.md) | Content import | P00, P01 | B7, B1, B2 | not started | | | |
| 14 | [P13](phases/P13-promotional-popup.md) | Promotional popup | P02 | - | not started | | | |
| 15 | [P14](phases/P14-whatsapp-widget.md) | WhatsApp chat widget | P02, P01 | - | not started | | | |
| 16 | [P15](phases/P15-cookie-consent.md) | Cookie consent | P02, P05 | - | not started | | | |
| 17 | [P16](phases/P16-google-tag-manager.md) | Google Tag Manager | P15, P08, P06 | B12, B7 | not started | | | |
| 18 | [P17](phases/P17-google-analytics-4.md) | Google Analytics 4 | P16 | B12 | not started | | | |
| 19 | [P20](phases/P20-technical-seo.md) | Technical SEO | P07, P08, P09, P10, P11, P12 | B7 | not started | | | |
| 20 | [P21](phases/P21-speed-optimization.md) | Speed optimization | P07, P08, P09, P10, P11, P13, P14, P15 | B7 | not started | | | |
| 21 | [P22](phases/P22-accessibility.md) | Accessibility | P07, P08, P09, P10, P11, P13, P14, P15 | - | not started | | | |
| 22 | [P23](phases/P23-responsiveness.md) | Responsiveness | P07, P08, P09, P10, P11, P13, P14, P15 | - | not started | | | |
| 23 | [P24](phases/P24-launch.md) | Final QA and launch | P12, P20, P21, P22, P23, P16, P17 | B13, B7, B1, B4, B9 | not started | | | |
| 24 | [P18](phases/P18-google-search-console.md) | Google Search Console | P20 | B13 | not started | | | |
| 25 | [P19](phases/P19-bing-webmaster-tools.md) | Bing Webmaster Tools | P18 | B13 | not started | | | |

## Done before the phases

- 2026-10-06: WordPress site captured (43 URLs, 141 assets) into `../wordpress-site/`.
- 2026-10-06: Nine competitor sites reviewed; notes in `competitor-notes.md`.
- 2026-10-06: Theme codebase analysed; findings in `reference/analysis.md`.

## Log

Newest first. One line per event: date, phase, what happened.
- 2026-10-06 P00 started on branch `phase/P00-inventory-and-audit`. B17 not asked separately; default taken (screenshots ignored in git).
