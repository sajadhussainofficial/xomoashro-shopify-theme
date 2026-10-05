# P18 — Google Search Console

Group: Marketing and measurement. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Search Console verified for the domain on Shopify, the new sitemap submitted, and the migration monitored.

## Dependencies

- **Needs finished first:** [P20](P20-technical-seo.md) Technical SEO.
- **Unblocks:** [P19](P19-bing-webmaster-tools.md) Bing Webmaster Tools.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B13 | Domain: who controls the DNS for xomoashro.com, and the planned launch date. | hard | Phase waits. |

## Read first

- reference/content-and-seo.md (redirect map)
- _build/redirects.csv

## Shopify toolkit and tools

- `shopify-liquid` only if the verification meta tag route is used (a theme setting that outputs the tag in `<head>`).

## Files

- Create `_build/seo/search-console-checklist.md`
- Optionally modify `config/settings_schema.json` and `snippets/meta-tags.liquid` (verification tag settings for Google and Bing)

## Task outline

Expand these into `tasks/P18-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Before launch: check who owns the existing property. The old site was verified through Site Kit; that method stops working when WordPress is switched off.
2. Add a Domain property verified by a DNS TXT record (covers every protocol and subdomain and survives the platform change). Fallback: URL-prefix property verified by a meta tag from a theme setting.
3. Export the current performance data (queries, pages, 16 months) and the list of indexed URLs as the pre-migration baseline; save under `_build/seo/baseline/`.
4. At launch: submit `https://xomoashro.com/sitemap.xml` (Shopify generates it); remove the old `sitemap_index.xml` entry.
5. Inspect and request indexing for the homepage, the product page and the three best-performing posts.
6. Weeks 1 to 4 after launch: check Page indexing (404s, redirect errors, "crawled, not indexed"), Core Web Vitals, and the Merchant listings and Product snippet reports; fix or add redirects for any old URL that still gets clicks.
7. Link the property to GA4.

## Best practices for this phase

- Same domain, so no Change of Address request is needed.
- Do not block crawling during migration; keep redirects in place permanently.
- Expect ranking movement for a few weeks because most titles change with the brand-name fix.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Property shows as verified by DNS.
- [ ] Sitemap status is "Success" and discovered URLs match the store.
- [ ] No old URL with impressions returns 404.
- [ ] Baseline export saved.

## Out of scope

Link building, content strategy.
