# P07 — Homepage

Group: Storefront. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Seventeen reusable homepage sections, each editable and pre-filled with real content, assembled in `templates/index.json`.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation, [P03](P03-header-and-navigation.md) Header and navigation, [P05](P05-footer.md) Footer.
- **Unblocks:** [P08](P08-product-page.md) Product page, [P10](P10-content-pages.md) Content pages, [P20](P20-technical-seo.md) Technical SEO, [P21](P21-speed-optimization.md) Speed optimization, [P22](P22-accessibility.md) Accessibility, [P23](P23-responsiveness.md) Responsiveness.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B2 | Which sizes are sold: (a) 30g only, offered as 1, 2 or 3 jar packs; (b) 10g, 20g, 60g; (c) another set. | soft | (a), because 30g is the only size in the old site. |
| B3 | Lab report file, lab name, test date, batch number, measured fulvic percentage and heavy-metal values. | soft | All lab claims and lab sections stay hidden. |
| B4 | Guarantee length (7 or 30 days), and the one correct phone number and WhatsApp number. | soft | Guarantee line omitted; WhatsApp button and widget hidden. |
| B8 | Keep the "5,000+ customers" claim? Is "Asad" the person in `Khalid-Kurt.png`? Real social profile URLs? | soft | Claim removed, that testimonial shown without photo, social icons hidden. |
| B10 | New photography (see `reference/photo-shoot-list.md`). | soft | Launch with the cut-out jar on designed backgrounds. |

## Read first

- reference/design-system.md
- reference/content-and-seo.md (old section to new section)
- ../competitor-notes.md (section 2)
- ../wordpress-site/pages/home.md
- _build/content-fixes.md

## Shopify toolkit and tools

- `shopify-liquid`: search and validate for every section (schema, blocks, presets, `visible_if`).
- `frontend-design` and `design-taste-frontend` for hero, bundles and stats band.
- `design:ux-copy` for buttons and microcopy.

## Files

- Create sections: `xo-hero-proof`, `xo-trust-strip`, `xo-problem`, `xo-course-bundles`, `xo-benefits-grid`, `xo-stats-band`, `xo-why`, `xo-results-timeline`, `xo-lab-proof`, `xo-source-story`, `xo-purity-test`, `xo-comparison-table`, `xo-reviews-wall`, `xo-how-to-use`, `xo-faq`, `xo-featured-journal`, `xo-cta-partners`
- Create `snippets/xo-per-gram-price.liquid`, `blocks/xo-proof-chip.liquid`, `assets/xo-bundle-add.js`, `snippets/xo-faq-jsonld.liquid`
- Modify `templates/index.json`

## Task outline

Expand these into `tasks/P07-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Build in page order, one section per task, each with: schema (settings, blocks, a preset with real content), scoped styles, tone setting, heading through `xo-section-heading`.
2. Hero: eyebrow pill, the real H1 ("Elevate Your Life with Pure Himalayan Aftabi Shilajit"), subhead, two buttons, proof chips (confirmed facts only), rating slot, separate desktop and mobile media. The hero image is the LCP element: eager, `fetchpriority="high"`, preloaded.
3. Trust strip, problem statement, benefits grid, stats band, why-Xomoashro cards: content from the old homepage and About page, corrected per `content-fixes.md`.
4. Course bundles: cards per variant with size, days of supply, price, per-gram price, "best for" line, badge; add to cart without reload through Horizon's add-to-cart component, then open the cart drawer.
5. Results timeline, purity test, comparison table, how to use: no source copy exists; write conservative drafts marked `{{TODO: confirm}}` and list them in the report.
6. Lab proof: reads the newest `lab_report` metaobject; the whole section is hidden when none exists.
7. Reviews wall: an `@app` block slot for Judge.me plus fallback testimonial blocks seeded with Abdullah, Asad and Taimoor Khan (photo use per decision B8).
8. FAQ: native `<details>` accordions, corrected questions, FAQPage structured data from the same blocks.
9. Featured journal: latest three posts from the `journal` blog. Partner banner: wholesale, ambassador, affiliate links.
10. Assemble `index.json` in the agreed order; screenshot at 360, 768 and 1280px and review against the design system.

## Best practices for this phase

- Only one H1 per page (the hero); other sections use H2.
- Images below the first screen are lazy-loaded with width and height set.
- A section with nothing to show renders nothing (no empty headings).
- Never invent claims, numbers or reviews; unconfirmed facts stay hidden or marked.
- Each section must work when added twice and when added to another template.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Every section: change a text and an image in the editor and see it update; add it fresh from "Add section" and it arrives with default content.
- [ ] Homepage has no Lorem ipsum and no empty blocks.
- [ ] Bundle add to cart works and updates the drawer.
- [ ] `shopify theme check` 0 errors; screenshots reviewed at three widths.

## Out of scope

Product page layout (P08).
