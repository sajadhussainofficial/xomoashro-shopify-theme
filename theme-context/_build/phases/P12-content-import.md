# P12 — Content import

Group: Storefront. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Load the store with real content: images, the product, pages, the ten journal posts, policies, menus.

## Dependencies

- **Needs finished first:** [P00](P00-inventory-and-audit.md) Inventory and audit, [P01](P01-store-setup-and-data-model.md) Store setup and data model.
- **Unblocks:** [P20](P20-technical-seo.md) Technical SEO, [P24](P24-launch.md) Final QA and launch.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | hard | Phase waits. |
| B1 | Product price(s) in PKR, SKU, net weight, real compare-at price if any, and the full product description. | hard | Phase waits. |
| B2 | Which sizes are sold: (a) 30g only, offered as 1, 2 or 3 jar packs; (b) 10g, 20g, 60g; (c) another set. | hard | Phase waits. |
| B9 | Shipping facts: delivery time in days, shipping fee, free-delivery threshold, return terms. | soft | Progress bar and delivery estimate hidden; policies keep marked placeholders (blocks launch). |
| B18 | Which jar is the current packaging: black lid with copper logo, gold lid, or the green jar? | soft | Black-lid jar, because it is the one on the old live site. |

## Read first

- _build/content-map.md
- _build/image-manifest.csv
- _build/content-fixes.md
- reference/content-and-seo.md

## Shopify toolkit and tools

- `shopify-admin`: write and validate `fileCreate`, `productSet`, `pageCreate`, `articleCreate`, `menuCreate` mutations.
- `shopify-use-shopify-cli`: `shopify store execute`, one approved batch at a time.

## Files

- Create `_build/products-import.csv` (Shopify product CSV)
- Create `_build/blog-import/*.md` (front matter and cleaned HTML body)
- Create `_build/policies/*.md`
- Create `_build/import/*.graphql` and `_build/import/import-log.md`

## Task outline

Expand these into `tasks/P12-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Images and posts can start before B1 and B2 are answered; only the product import waits for them.
2. Upload section and brand images from `images-optimized/` to Shopify Files; record each returned file reference in `import-log.md`; then replace placeholders in `templates/*.json` with `shopify://shop_images/<name>`.
3. Build `products-import.csv` from the owner's answers (title, description, variants, prices, SKU, weight, images, SEO title and description, metafields). Handle: `pure-himalayan-aftabi-shilajit`. Show it for approval, then import.
4. Create the `journal` blog and import the ten posts with their original slugs, dates, tags, featured images, excerpts and SEO fields, bodies corrected per `content-fixes.md`. Flag the pregnancy and testosterone posts for owner review before publishing.
5. Create pages with their template suffixes (about, our-source, how-to-use, lab-reports, wholesale, ambassador, affiliate, track-order, contact).
6. Write the three policies without template placeholders and paste them into Settings > Policies after owner approval.
7. Create the main and footer menus from `_build/menus.json`.
8. Read everything back from the store and tick it off in `import-log.md`.

## Best practices for this phase

- Every write to the store is shown first and run only after approval.
- Imports are idempotent: check for an existing handle before creating.
- Keep article slugs identical to the old site to protect search rankings.
- Publish dates on posts stay at their original dates.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Product page shows real data and can be added to cart.
- [ ] All ten posts open at `/blogs/journal/<old-slug>`.
- [ ] No template still references a placeholder image.
- [ ] Policies contain no bracketed placeholders.

## Out of scope

Redirects (P20). Reviews import.
