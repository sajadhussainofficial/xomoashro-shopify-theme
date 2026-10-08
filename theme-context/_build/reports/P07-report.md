# P07 report — Homepage

Date: 2026-10-07. Branch: `phase/P07-homepage`.

## 1. Result

The homepage is built: 17 new sections, each editable and pre-filled with corrected copy from the old site, assembled in the agreed order. One acceptance check could not be run, because the store has no product: adding a size to the cart from the homepage. The phase is therefore **awaiting your approval**, not marked done.

Three sections show nothing on the store yet, by design, because the data they read does not exist: sizes and bundles (no product), lab report (no report), journal posts (no posts). Their code passes validation and their layout was checked with sample markup, but none of the three has ever run with real data.

**Update, same day, after your feedback on pictures:** the homepage now shows real pictures. Seven were uploaded to the store's Files and set on the hero, statement, benefits, source story and two testimonials. They are the real bottle and mountain photographs from the old site, restaged on this computer. The restaging by OpenAI that you asked for did not run: both keys in `.env` are refused with "no credits remaining".

**Second update, same day: new hero and colours.** You chose concept 2, "Obsidian", from three designs, with your own picture (`wordpress-site/assets/salajit.png`). The hero is now dark and full width: the picture fills the section and fades to black behind the text, and the four key numbers run along its bottom. Obsidian black (`#0B0B0D`) is now the second colour and orange is kept for main buttons; headings no longer have an orange word. The header and the announcement bar are dark on every page.

## 2. Files created and changed

Theme (`xomoashro-them/`):

| File | What it is |
|---|---|
| `sections/xo-hero-proof.liquid` | Hero, rebuilt as the approved "Obsidian" design: dark, full width, the page's one H1, text, main button and text link, up to four numbers (blocks), a slot for a reviews-app rating, separate pictures for computers and for phones and tablets |
| `sections/xo-trust-strip.liquid` | Row of short trust points with icons |
| `sections/xo-problem.liquid` | Large statement on a dark band |
| `sections/xo-course-bundles.liquid` | One card for each size of a chosen product: price, days of supply, price per gram, saving, "best for" line, badge, add to cart |
| `sections/xo-benefits-grid.liquid` | Six benefit cards with a disclaimer line |
| `sections/xo-stats-band.liquid` | Four large numbers |
| `sections/xo-why.liquid` | Six numbered reasons |
| `sections/xo-results-timeline.liquid` | Week-by-week guide. Switched off on the homepage |
| `sections/xo-lab-proof.liquid` | Results from the newest lab report saved in store data, or one you pick |
| `sections/xo-source-story.liquid` | Our story with three facts and an image |
| `sections/xo-purity-test.liquid` | Four numbered home checks |
| `sections/xo-comparison-table.liquid` | Table comparing Xomoashro with typical market shilajit |
| `sections/xo-reviews-wall.liquid` | Testimonial cards and a slot for a reviews app |
| `sections/xo-how-to-use.liquid` | Three steps, optional image |
| `sections/xo-faq.liquid` | Questions that open and close, a contact box, and the same questions shared with search engines |
| `sections/xo-featured-journal.liquid` | Newest posts from a blog |
| `sections/xo-cta-partners.liquid` | Orange band with wholesale, ambassador and affiliate links |
| `snippets/xo-fact-text.liquid` | Fills `[days]`, `[amount]`, `[delivery]` and `[email]` in a line from store data, and hides the line when the fact is missing |
| `snippets/xo-per-gram-price.liquid` | Price per gram of a size |
| `snippets/xo-faq-jsonld.liquid` | The questions in the format search engines read |
| `assets/xo-icon-*.svg` (6 new) | Bolt, target, heart, chat, users, strength |
| `assets/xo-art-mountains.svg` | Mountain drawing shown where no image has been chosen yet |
| `assets/xo-base.css` | Shared styles for feature cards, numbers, two-column layouts, the drawing, editor notes, small print, jump links |
| `snippets/xo-image.liquid`, `snippets/xo-icon.liquid`, `sections/xo-styleguide.liquid` | Image preloading for the hero; new icons listed |
| `locales/en.default.json`, `en.default.schema.json` | Storefront strings and editor labels |
| `templates/index.json` | The homepage: 17 sections in order, with the pictures set |

Pictures (added in the update):

| File | What it is |
|---|---|
| `sections/xo-problem.liquid` | New: optional background picture with a darkness setting |
| `sections/xo-benefits-grid.liquid` | New: optional wide picture above the cards |
| `snippets/xo-image.liquid` | New `decorative` option for pictures that need no description |
| `_build/tools/compose-homepage-images.mjs` | Restages the real photographs: cuts the bottle out, places it on a warm backdrop with a shadow, saves WebP |
| `_build/tools/generate-images.mjs`, `image-jobs-homepage.json`, `openai-keys.mjs` | Ready-to-run OpenAI picture generation for six homepage pictures, with switching between the keys in `.env`. Not run yet (no credits) |
| `_build/tools/upload-files.mjs`, `_build/store-setup/staged-uploads-create.graphql`, `file-create.graphql`, `file-by-id.graphql`, `files-by-name.graphql` | Uploads pictures to the store's Files with alt text; a file with the same name is replaced |
| `_build/images-generated/` | The seven WebP pictures, `manifest.json` (alt text and source of each) and `uploaded.json` (where each one is in the store) |
| `.gitignore` | `.env` is now ignored. It was not, and this repository is public |

Build files: `tasks/P07-tasks.md`, `reports/P07-screens/`, status and decisions updates.

Deviations from the phase file:

- **No `blocks/xo-proof-chip.liquid`.** Proof points are blocks defined inside the hero. A section cannot mix its own blocks with separate block files, and the hero needs its own.
- **No `assets/xo-bundle-add.js`.** The size cards reuse the theme's existing add-to-cart code, so no new script was needed.
- **No `{{TODO: confirm}}` text in the copy.** It would show to shoppers. Draft sections instead have a "Draft reminder" setting, on by default, that shows a note in the Theme Editor only.
- **Added `snippets/xo-fact-text.liquid`**, used by five sections.

## 3. Source content used

| Section | Source | Changes |
|---|---|---|
| Hero | `wordpress-site/pages/home.md` | H1 kept. Label "Pakistan's Most Trusted Shilajit Source" replaced by "Himalayan Aftabi Shilajit · Pakistan" (`content-fixes.md` 18). Text rewritten without "stronger immunity". "30-Day Money Back" proof point dropped; the guarantee comes from store data in the trust strip |
| Trust strip | `home.md` product icons | "Fast Delivery" became "Delivery across Pakistan" (fix 21); guarantee reads 7 days from store data |
| Statement, source story | `pages/about-us.md`, "Our Story" | "over 5,000+ customers" line removed (fix 15) |
| Sizes and bundles | `home.md` product block | Heading and intro only; "65%+ Fulvic Acid" and "Triple Lab Tested" not used (fixes 16, 17) |
| Benefits | `home.md`, six blocks | The conservative wording from `content-fixes.md` part 3, plus a disclaimer line |
| Numbers | `home.md` | 16,000+ ft, 85+ minerals, 100% resin; guarantee days from store data |
| Why us | `home.md`, six blocks | Heading without "Pakistan's Trusted" (fix 18); "expert advice" replaced (fix 24); "Fast" removed from delivery |
| Reviews | `home.md` | Three testimonials, wording unchanged apart from the brand spelling. No star ratings, no photos, no "5,000+" line |
| Questions | `home.md`, `content-fixes.md` part 4 | Four rewritten answers; "Still have questions?" became the contact box |
| Partner links | `pages/become-distributor.md`, `become-brand-ambassadar.md` | One line each, spelling corrected |
| Hero picture | `assets/salajit.png`, supplied by you (the bottle on a rock in front of the mountains at sunset) | Converted to WebP, not altered. A closer crop is used on phones and tablets |
| Benefits picture | `assets/images/product_shot-1.png` (studio photograph) | Cropped wide and warmed to the page colour. Not enlarged |
| Statement background | `assets/images/Rectangle-39358.jpg` (mountain range, dark) | Unchanged, darkened by the section |
| Source story picture | `assets/images/Rectangle-145.jpg` (mountain range) | Made tall by continuing its plain sky upward and its dark ridge downward |
| Testimonial photos | `assets/images/Abdullah.png`, `Taimoor.png` | Unchanged. Asad has no photo (B8) |

## 4. Acceptance checks

| Check | Result | Evidence |
|---|---|---|
| Change a text and an image in the editor and see it update; a section added fresh arrives with default content | **Partly run** | Text, a block's text, block order and colour tone were changed in the template and the page updated each time, then restored. Every section on the homepage is filled from its own "Add section" defaults. Pictures were set through the template and all six load at 360, 768 and 1280px with width, height and alt text; the hero picture loads first, the others when scrolled to. **Not run:** the Theme Editor itself (needs your login) |
| No Lorem ipsum and no empty blocks | Pass | Page text searched at three widths: no Lorem ipsum, no TODO text. Sections with nothing to show output nothing |
| Bundle add to cart works and updates the drawer | **Not run** | The store has no product (`/products.json` is empty). The cards use the theme's own add-to-cart code, which already drives the cart drawer, but this has not been seen working here |
| Theme check 0 errors | Pass | 0 errors; 6 warnings, all in two stock Horizon files, unchanged from earlier phases. Toolkit validation: 24 of 24 files valid |
| Screenshots reviewed at 360, 768 and 1280px | Pass | `reports/P07-screens/home-360-full.jpeg`, `-768-`, `-1280-`. No sideways scrolling at any width |

Further checks made:

- **One H1**, then H2 per section and H3 per card.
- **Store facts:** the trust strip, numbers band, comparison table and two answers show "7" guarantee days, "5" delivery days and the support email from store data.
- **Questions:** open by click and by keyboard. The data for search engines holds the same six questions, with the facts filled in.
- **"How to use" button** in the hero jumps to that section, which lands just below the sticky header on phone and desktop.
- **Used twice:** six section types were placed twice on a test page. All rendered and no element ID was repeated.
- **Tap targets:** every link and button in the page body is at least 44px tall at 360px.
- **Reduced motion:** all 28 fade-in elements are visible without animation.
- **Sample layouts** for the three data-driven sections: `sample-1280-bundles.jpeg`, `sample-360-bundles.jpeg`, `sample-1280-lab.jpeg`, `sample-1280-journal.jpeg`. The values in them are placeholders typed into the browser, not store data. Timeline: `test-1280-timeline.jpeg`.

## 5. Defaults taken

- **B2 (sizes):** nothing fixed in the theme. The cards show whatever sizes the product has.
- **B3 (lab report):** lab section hidden; no lab claims anywhere on the page.
- **B8 (5,000+ customers, photos):** claim removed. Abdullah and Taimoor Khan are shown with their photos from the old site; Asad is shown with an initial until his photo is confirmed.
- **B10 (photography) and B18 (jar):** the black-lid bottle from the old site is used, restaged locally. No new photography.
- **B6 (affiliates):** the affiliate link is kept and worded as an application.

## 6. Open items

Wording written for the new store, with no source in the old site. Please read and confirm (new decision B22):

| Where | Status on the homepage |
|---|---|
| Results timeline, all text | Switched off |
| Purity checks, four home tests | Shown, with the editor-only draft reminder |
| Comparison table, all rows | Shown, with the reminder |
| How to use, three steps | Shown, with the reminder. Follows the rewritten answer in `content-fixes.md`; the amount needs your confirmation |
| Two answers: "Can I pay cash on delivery?" and "Is there a money-back guarantee?" | Shown. The guarantee answer does not state the terms |
| Hero text, section labels and headings, three source-story facts | Shown |

Other items:

- **Links to pages that do not exist yet** return "page not found" until P10: `/pages/our-source`, `/pages/how-to-use`, `/pages/wholesale`, `/pages/ambassador`, `/pages/affiliate`.
- **OpenAI keys:** both keys in `.env` answer "You have no credits remaining" for every picture model (tested 2026-10-07 with four models). Once one account has credit, `node theme-context/_build/tools/generate-images.mjs theme-context/_build/tools/image-jobs-homepage.json` makes six pictures of the real bottle in different settings (decision B23).
- **Picture sharpness:** your hero picture is 1586px wide, so on screens wider than about 1600px it is shown slightly enlarged. A 2400px version would be sharper there.
- **Numbers band:** the separate numbers section is switched off on the homepage because the hero now shows the same four numbers. It is still available under "Add section".
- **Trust strip:** now shows the points the hero does not: cash on delivery, delivery across Pakistan, direct from local collectors, help on WhatsApp.
- **Unused pictures in the store's Files:** the two first-design hero pictures (`xomoashro-pure-himalayan-shilajit-resin-jar*.webp`) are no longer used. They can be deleted from Content > Files; I have not deleted them.
- **Hero concepts review file** (`previews/hero-concepts/`) is temporary and git-ignored.
- **Two old-site pictures are not shilajit** and are not used: `Purified-Shilajit.png` is a stock photo of black caviar, and `Group-1000001394-min.png` is a stock photo of a jelly dessert. `image-manifest.csv` is corrected.
- **Mountain photograph:** its source and usage rights are unknown (`image-manifest.csv`). It is used on two sections for now.
- **How to use and purity checks have no picture:** no real photograph exists for them.
- **Store Files:** seven pictures were written to the store, at your request. The store login now also has permission for blog content, asked for at the same time; nothing was written with it.
- **Search-engine question data** is output once per questions section; use the setting on one section per page.
- **Development theme:** a temporary test template, `templates/page.p07-test.json`, was removed locally but remains on the development theme (file deletion is switched off there on purpose). It is not in the repository or the working copy.
- **Working copy theme** (158632640684) not updated yet; it follows your approval.

## 7. How to preview

- `shopify theme dev`, then `http://127.0.0.1:9292/`.
- Theme Editor, Home page: 17 sections named Hero, Trust strip, Statement, Sizes and bundles, Benefits, Numbers band, Why us, Results timeline, Lab report, Source story, Purity checks, Comparison table, Reviews, How to use, Questions and answers, Journal posts, Partner links. Each has a colour tone setting; most have blocks you can add, remove and reorder.
- To see the size cards: choose a product in "Sizes and bundles".

## 8. Next

- **To finish P07:** a product is needed to test add to cart. Either give the real product details (B1, B2), or approve a clearly named test product (new decision B21).
- **P06 Cart drawer and cart page** is next and needs the same product.
