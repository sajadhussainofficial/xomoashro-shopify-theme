# P20 — Technical SEO

Group: Marketing and measurement. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Everything search engines need: correct titles and descriptions, structured data, canonical URLs, redirects from every old URL, clean indexing rules.

## Dependencies

- **Needs finished first:** [P07](P07-homepage.md) Homepage, [P08](P08-product-page.md) Product page, [P09](P09-collection-search-and-utility-pages.md) Collection, search and utility pages, [P10](P10-content-pages.md) Content pages, [P11](P11-blog-and-article.md) Journal: blog and article, [P12](P12-content-import.md) Content import.
- **Unblocks:** [P18](P18-google-search-console.md) Google Search Console, [P24](P24-launch.md) Final QA and launch.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | hard | Phase waits. |

## Read first

- reference/content-and-seo.md
- ../wordpress-site/seo-meta.csv
- _build/content-fixes.md

## Shopify toolkit and tools

- `marketing:seo-audit` for the audit pass.
- `shopify-liquid`: search `structured_data` filter, `canonical_url`, `robots.txt.liquid`, `seo` objects; validate.
- `shopify-admin`: `urlRedirectImport` or `urlRedirectCreate`, and SEO fields on products, pages and articles.
- Google Rich Results Test and Schema validator.

## Files

- Create `snippets/xo-org-jsonld.liquid`, `snippets/xo-breadcrumbs.liquid` (visible trail and BreadcrumbList data)
- Modify `snippets/meta-tags.liquid` (default share image, title pattern)
- Create `_build/redirects.csv`
- Create `_build/seo/meta-rewrite.csv` (old and new title and description per URL)
- Create `_build/seo/technical-seo-audit.md`
- Create `templates/robots.txt.liquid` only if a rule must change

## Task outline

Expand these into `tasks/P20-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Titles and descriptions: write `meta-rewrite.csv` for every page, product and post — brand spelled Xomoashro, titles under 60 characters, descriptions 120 to 155, keep the good ones from the old site, write the 25 missing descriptions. Apply after owner approval.
2. Structured data: Organization and WebSite on the homepage; BreadcrumbList on product, collection, article and pages; Product (P08), Article (P11) and FAQPage (P07) verified. Note for the owner: Google now shows FAQ rich results for very few sites, so this markup is for completeness.
3. Canonical URLs on every template; product links avoid collection-scoped duplicates.
4. Headings: exactly one H1 per template, no skipped levels; check all templates.
5. Images: alt text from the image manifest on every content image; decorative images have empty alt.
6. Default social share image in theme settings; per-page images where available.
7. Redirects: build `redirects.csv` from the map in `reference/content-and-seo.md` covering all 43 old URLs; confirm whether `/shop` can be redirected; import at launch (P24).
8. Indexing rules: search and cart stay out of the index; tag-filtered blog pages are handled (canonical or noindex); the styleguide page is noindex.
9. Internal links: each post links to the product; the product links to how-to-use and lab pages; footer covers policies.
10. Run the audit on the preview theme and write `technical-seo-audit.md` with pass or fail per item.

## Best practices for this phase

- Shopify generates `sitemap.xml` and a sensible `robots.txt`; change them only for a specific reason.
- Structured data must match what is visible on the page: no ratings without reviews, no price that differs from the page.
- Redirects are 301 and permanent; one hop only.
- URL handles are lowercase, short and stable; do not rename after launch.
- Do not stuff keywords; write titles for people.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Rich Results Test passes for Product, Article, Breadcrumb and Organization.
- [ ] Every template has one H1, a unique title and a description.
- [ ] Every row of `redirects.csv` resolves 301 to a 200 page after import.
- [ ] No image without alt text on any template.

## Out of scope

Ongoing content marketing, backlinks.
