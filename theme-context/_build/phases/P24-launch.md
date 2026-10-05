# P24 — Final QA and launch

Group: Launch. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Final checks, clean-up of unused stock code, go-live on the domain, redirects, and the first week of monitoring.

## Dependencies

- **Needs finished first:** [P12](P12-content-import.md) Content import, [P20](P20-technical-seo.md) Technical SEO, [P21](P21-speed-optimization.md) Speed optimization, [P22](P22-accessibility.md) Accessibility, [P23](P23-responsiveness.md) Responsiveness, [P16](P16-google-tag-manager.md) Google Tag Manager, [P17](P17-google-analytics-4.md) Google Analytics 4.
- **Unblocks:** nothing further.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B13 | Domain: who controls the DNS for xomoashro.com, and the planned launch date. | hard | Phase waits. |
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | hard | Phase waits. |
| B1 | Product price(s) in PKR, SKU, net weight, real compare-at price if any, and the full product description. | hard | Phase waits. |
| B3 | Lab report file, lab name, test date, batch number, measured fulvic percentage and heavy-metal values. | soft | All lab claims and lab sections stay hidden. |
| B4 | Guarantee length (7 or 30 days), and the one correct phone number and WhatsApp number. | hard | Phase waits. |
| B9 | Shipping facts: delivery time in days, shipping fee, free-delivery threshold, return terms. | hard | Phase waits. |
| B20 | Delete the 55 unused locale files (keep English and Urdu)? | soft | Files stay; the translation-matching check stays off. |

## Read first

- status.md
- decisions.md
- every phase report

## Shopify toolkit and tools

- `shopify theme check`, `shopify theme push`, `shopify theme publish` (owner approves the publish).
- `shopify-admin` for the redirect import.
- `superpowers:verification-before-completion` for the final checklist.

## Files

- Create `_build/launch/checklist.md`
- Create `_build/launch/stock-files-to-delete.md`
- Create `_build/launch/post-launch-log.md`

## Task outline

Expand these into `tasks/P24-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Search the theme and templates for `{{TODO`; every one is either resolved or accepted by the owner in writing.
2. Retire stock Horizon files: list unused sections, blocks, snippets and scripts in `stock-files-to-delete.md` with proof that nothing references each one; delete only after the owner approves the list; run `theme check` and a full click-through after.
3. Full regression: purchase path with COD on a real phone, every form, every editable section opened once in the editor.
4. Owner checklist: payment and shipping settings, policies approved, notification emails branded, test order placed and cancelled, staff accounts, domain connected in Shopify.
5. Go-live order: publish the theme; point the domain DNS to Shopify; wait for SSL; import `redirects.csv`; test every redirect; remove the storefront password.
6. Right after launch: submit the sitemap (P18), check GA4 realtime and a real order, check the cookie banner, WhatsApp button and popup on the live domain.
7. Days 1 to 7: watch 404s in Search Console and Shopify, add missing redirects, compare orders with GA4, check Core Web Vitals; log everything in `post-launch-log.md`.
8. Keep the WordPress site backed up and reachable on a private address for at least 30 days.

## Best practices for this phase

- Launch on a quiet day and hour; never on a Friday evening.
- Lower the DNS TTL a day before the switch.
- Keep the previous theme unpublished as an instant rollback.
- Nothing is deleted without an approved list; nothing is published without the owner's explicit go.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] A real COD order completes on the live domain from a phone.
- [ ] All 43 old URLs redirect correctly.
- [ ] `theme check` 0 errors; no `{{TODO` left unaccepted.
- [ ] Analytics shows the order; Search Console accepts the sitemap.

## Out of scope

Ongoing maintenance and marketing.
