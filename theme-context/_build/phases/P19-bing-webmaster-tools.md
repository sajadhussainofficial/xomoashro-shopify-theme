# P19 — Bing Webmaster Tools

Group: Marketing and measurement. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

The site verified in Bing Webmaster Tools with the sitemap submitted, covering Bing, DuckDuckGo and Copilot search.

## Dependencies

- **Needs finished first:** [P18](P18-google-search-console.md) Google Search Console.
- **Unblocks:** nothing further.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B13 | Domain: who controls the DNS for xomoashro.com, and the planned launch date. | hard | Phase waits. |

## Read first

- _build/seo/search-console-checklist.md

## Shopify toolkit and tools

- None beyond the verification meta tag setting created in P18.

## Files

- Create `_build/seo/bing-checklist.md`

## Task outline

Expand these into `tasks/P19-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Add the site using "Import from Google Search Console" (fastest), or verify by DNS CNAME, or by the `msvalidate.01` meta tag from the theme setting.
2. Submit `https://xomoashro.com/sitemap.xml`.
3. Run Bing's Site Scan and URL Inspection on the homepage and product page; record findings.
4. Check whether IndexNow can be used with Shopify at that time (search the Shopify docs and app store); if not, rely on the sitemap.
5. Optional: Microsoft Clarity for session recordings and heatmaps, loaded through a custom pixel and gated by analytics consent. Ask the owner before adding it.
6. Review Bing's SEO reports two weeks after launch and fix real issues.

## Best practices for this phase

- Bing reads the same structured data and meta tags as Google; no separate markup is needed.
- Any extra script (Clarity) goes through Customer Events and consent, never into the theme.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Site verified; sitemap processed without errors.
- [ ] Homepage and product page are indexable in URL Inspection.

## Out of scope

Microsoft Advertising setup.
