# P21 — Speed optimization

Group: Quality. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Meet the performance targets on mobile: LCP under 2.5s, CLS under 0.1, INP under 200ms, Lighthouse mobile 85 or higher.

## Dependencies

- **Needs finished first:** [P07](P07-homepage.md) Homepage, [P08](P08-product-page.md) Product page, [P09](P09-collection-search-and-utility-pages.md) Collection, search and utility pages, [P10](P10-content-pages.md) Content pages, [P11](P11-blog-and-article.md) Journal: blog and article, [P13](P13-promotional-popup.md) Promotional popup, [P14](P14-whatsapp-widget.md) WhatsApp chat widget, [P15](P15-cookie-consent.md) Cookie consent.
- **Unblocks:** [P24](P24-launch.md) Final QA and launch.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | hard | Phase waits. |

## Read first

- _build/theme-audit.md
- reference/analysis.md (codebase)

## Shopify toolkit and tools

- `shopify theme profile` to find slow Liquid.
- Lighthouse (mobile, throttled) against the preview theme URL; Shopify's web performance report in admin for real-user data after launch.
- `shopify-dev`: search "theme performance best practices", "image_url", "preload_tag".

## Files

- Create `_build/performance/budget.md`
- Create `_build/performance/audit-before.md` and `audit-after.md`
- Modify theme files as findings require

## Task outline

Expand these into `tasks/P21-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Set the budget in `budget.md`: per template, maximum JavaScript and CSS transferred, number of requests, LCP element named.
2. Measure home, product, collection, article and one content page with Lighthouse mobile (three runs each, median); save as `audit-before.md`.
3. LCP: the hero or product image is eager, `fetchpriority="high"`, preloaded, correctly sized with `srcset` and `sizes`; nothing render-blocking sits in front of it.
4. Images: every image through `image_url` with explicit widths, width and height attributes set, lazy below the first screen.
5. Fonts: two families, limited weights, `font-display: swap`, preload only the two files used above the fold, fallback font metrics tuned to limit shift.
6. JavaScript: every `xo-` script is a deferred module loaded only when its section is on the page; no script runs before interaction unless it must; long tasks over 50ms investigated.
7. CSS: section styles stay in their sections; check for unused rules in `xo-base.css`; `content-visibility: auto` on long below-the-fold sections where it is safe.
8. CLS: reserve space for the announcement bar, images, embeds, the review widget and the cookie banner.
9. Liquid: run `shopify theme profile` on the slowest templates; remove loops inside loops and repeated metafield lookups.
10. Third parties: list every app script and pixel with its cost; remove or defer what is not needed. Retiring unused stock Horizon files (P24) reduces payload further.
11. Re-measure and write `audit-after.md` with before and after per metric.

## Best practices for this phase

- Measure before changing; change one thing at a time.
- Lab scores guide the work; real-user Core Web Vitals after launch are the result that matters.
- Each installed app adds weight; review the list quarterly.
- Do not lazy-load the LCP image; do not preload more than two fonts and one image.
- Videos use a poster image and load on interaction.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Lighthouse mobile performance 85 or higher on home and product (median of three).
- [ ] LCP under 2.5s, CLS under 0.1, total blocking time under 200ms in the lab.
- [ ] No image served larger than its rendered size by more than about 1.5 times.
- [ ] Budget in `budget.md` met for every template.

## Out of scope

Headless or app-level changes; server response time (controlled by Shopify).
