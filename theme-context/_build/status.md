# Build status

The single record of progress. The runner updates this file at the start and end of every phase. Status values: `not started`, `in progress`, `blocked` (say by what), `awaiting approval`, `awaiting merge`, `done`.

| Order | Phase | Title | Needs | Hard decisions | Status | Started | Finished | Report |
|---|---|---|---|---|---|---|---|---|
| 1 | [P00](phases/P00-inventory-and-audit.md) | Inventory and audit | - | - | done | 2026-10-06 | 2026-10-06 | [report](reports/P00-report.md) |
| 2 | [P02](phases/P02-design-foundation.md) | Design foundation | P00 | - | done | 2026-10-06 | 2026-10-06 | [report](reports/P02-report.md) |
| 3 | [P03](phases/P03-header-and-navigation.md) | Header and navigation | P02 | - | done | 2026-10-06 | 2026-10-06 | [report](reports/P03-report.md) |
| 4 | [P04](phases/P04-announcement-bar.md) | Announcement bar | P02 | - | done | 2026-10-06 | 2026-10-06 | [report](reports/P04-report.md) |
| 5 | [P05](phases/P05-footer.md) | Footer | P02 | - | done | 2026-10-06 | 2026-10-06 | [report](reports/P05-report.md) |
| 6 | [P01](phases/P01-store-setup-and-data-model.md) | Store setup and data model | P00 | B7 | done | 2026-10-06 | 2026-10-06 | [report](reports/P01-report.md) |
| 7 | [P06](phases/P06-cart-drawer-and-cart-page.md) | Cart drawer and cart page | P02, P01 | B7 | not started | | | |
| 8 | [P07](phases/P07-homepage.md) | Homepage | P02, P03, P05 | - | done | 2026-10-07 | 2026-10-07 | [report](reports/P07-report.md) |
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
- 2026-10-06 P00 finished, all five checks pass; awaiting owner approval. New question B18 (jar design) added.
- 2026-10-06 P00 approved by the owner with no changes; merged to `main`. B5 answered (keep orange logo). New question B19 (accent colour beside the orange logo) added.
- 2026-10-06 B7 answered (store connected, local preview running). P02 started on branch `phase/P02-design-foundation`.
- 2026-10-06 P02 finished; all checks pass (editor click-through and keyboard pass not run, see report). Owner asked for commit, push, pull request and merge on completion. Fonts changed to Manrope and accent to the logo orange during the phase. New question B20 added.
- 2026-10-06 P02 pull request and merge blocked: the GitHub account logged in on the command line (`zeshan-rx`) is not a collaborator on `sajadhussainofficial/xomoashro-shopify-theme` (push and `gh pr create` both refused). The branch `phase/P02-design-foundation` reached GitHub through the owner's editor account (`zeshanamindev-hub`). Waiting for the owner to open and merge the pull request, or to give the command-line account write access.
- 2026-10-06 P02 merged into `main` through pull request #1 (opened and merged by the owner). The development theme lost files during the branch switches and was repaired with a full `shopify theme push` to theme `158613045420`.
- 2026-10-06 Owner made commit, push, pull request and merge standing for every phase; runner updated. P03 started on branch `phase/P03-header-and-navigation`.
- 2026-10-06 Correction to the P02 note above: the files lost from the development theme, and the broken style guide reported by the owner during P03, were caused by `shopify theme dev` running from the repository root instead of `xomoashro-them/`, not by branch switching. The server was restarted from `xomoashro-them/`; runner updated.
- 2026-10-06 P03 finished; all checks pass, two of them by simulation or proxy (see report). Owner committed part of the work mid-phase through GitHub Desktop (`d7fbb69`). Waiting for the owner to push, open and merge the pull request.
- 2026-10-06 P03's last two commits reached GitHub after pull request #2 was merged; they were merged into the P04 branch so they reach `main` with P04.
- 2026-10-06 The owner's terminal started `shopify theme dev` from the repository root again and emptied the development theme. Fixed for good with `shopify.theme.toml` in the repository root and in `xomoashro-them/` (path and `nodelete`); development theme restored with `shopify theme push`.
- 2026-10-06 P04 finished; all checks pass. Waiting for the owner to push, open and merge the pull request.
- 2026-10-06 P05 finished except one check: a real newsletter signup. Shopify's bot protection blocks automated form posts, so the owner is asked to sign up once and confirm the customer appears in admin before the pull request is merged.
- 2026-10-06 P05 merged by the owner (pull request #5). The manual newsletter signup check was not confirmed before the merge; it is carried into P24 launch checks.
- 2026-10-06 P01 started on branch `phase/P01-store-setup-and-data-model`.
- 2026-10-06 Owner approved the P01 store writes and the working copy. Working copy created: "Xomoashro (working copy)", theme 158632640684, unpublished, preview https://https-xomoashro-com-fcrv98st.myshopify.com?preview_theme_id=158632640684. B4 and B9 answered "yes" without values; still open.
- 2026-10-06 P03 and P04 marked done: merged through pull requests #2, #3 and #4.
- 2026-10-06 Store login completed by the owner. `run_setup.py` created 19 metafield definitions and the `lab_report` metaobject definition and saved four store facts (support email, WhatsApp number, guarantee 7 days, delivery up to 5 days). Read-back confirmed. Working copy theme 158632640684 updated. P01 finished; waiting for the owner to push, open and merge the pull request.
- 2026-10-07 P01 merged by the owner (pull request #6). P07 started on branch `phase/P07-homepage`, ahead of P06 because the store has no product to test the cart with.
- 2026-10-07 P07 built: 17 homepage sections and `templates/index.json`. One acceptance check not run (add to cart from the size cards: the store has no product), so the phase is awaiting the owner's approval. New questions B21 (test product) and B22 (draft wording) added.
- 2026-10-07 P07 update after the owner's feedback ("use actual pictures"): seven pictures restaged from the real old-site photographs, uploaded to the store's Files and set on the homepage. OpenAI restaging not run: both keys in `.env` report no credits. `.env` added to `.gitignore` (it was not ignored; the repository is public). Two old-site pictures found to be stock photos of other things and dropped. New questions B23 (OpenAI credit) and B24 (import blog posts now).
- 2026-10-07 P07 merged by the owner (pull request #7), which approves it with one check carried into P06: add to cart from the homepage size cards. The picture work above is on branch `phase/P07-homepage-pictures`, waiting for the owner to push, open and merge.
- 2026-10-07 Owner asked for two more hero designs, pictures without the rounded box, obsidian black as the second colour and less orange. Three hero concepts built in a temporary review file (`previews/hero-concepts/hero-concepts.html`) with stand-in pictures; `tools/image-jobs-hero-concepts.json` is ready for OpenAI image model 2 but both keys still report no credits. Colour rule applied across the theme. Waiting for the owner's choice of hero (B25).
- 2026-10-07 B25 answered: hero concept 2 (Obsidian) with the owner's picture `salajit.png`. Hero rebuilt, picture uploaded to the store's Files, header made dark, numbers band switched off on the homepage (the hero carries the numbers), last orange accents in the header and footer changed to the text colour.
- 2026-10-09 Owner asked for two new designs for every homepage section below the hero. Built as temporary review pages in `previews/section-variations/` (14 sections, 28 designs, each shown side by side, on a phone and at full size, with the current design for comparison). Waiting for the owner's choices (B26). A third OpenAI key was added; it is also refused with "no credits remaining".
