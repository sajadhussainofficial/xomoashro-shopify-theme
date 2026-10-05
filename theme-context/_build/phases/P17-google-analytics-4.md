# P17 — Google Analytics 4

Group: Marketing and measurement. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A correctly configured GA4 property receiving ecommerce data from the store, continuous with the old site's history where possible.

## Dependencies

- **Needs finished first:** [P16](P16-google-tag-manager.md) Google Tag Manager.
- **Unblocks:** [P24](P24-launch.md) Final QA and launch.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B12 | Google access: GTM container ID, GA4 measurement ID, and whether the old site's GA4 property should be reused. | hard | Phase waits. |
| B16 | Tracking route: GA4 through Google Tag Manager (recommended since GTM is wanted), or through Shopify's Google and YouTube app. One only. | soft | GA4 through GTM in a custom pixel; Meta through Shopify's Facebook and Instagram app. |

## Read first

- _build/tracking/datalayer-spec.md
- _build/tracking/setup-steps.md

## Shopify toolkit and tools

- `shopify-dev`: search "Google & YouTube app analytics" to confirm what the native integration sends, in case B16 chooses it.
- GA4 DebugView and Realtime report.

## Files

- Create `_build/tracking/ga4-setup.md`
- Create `_build/tracking/ga4-events-and-conversions.md`

## Task outline

Expand these into `tasks/P17-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Find out whether the old site's GA4 property (set up through Site Kit) should be reused; reusing it keeps history. Record the measurement ID in `decisions.md`.
2. Write `ga4-setup.md`: data stream for the domain, enhanced measurement settings (turn off duplicate page-view and site-search tracking that GTM already sends), currency PKR, time zone Pakistan, data retention 14 months, Google signals per the owner's choice, internal traffic filter, cross-domain setting for Shopify checkout if needed.
3. Mark key events: `purchase`, `begin_checkout`, `add_to_cart`, `generate_lead`, `whatsapp_click`, `sign_up`.
4. Custom dimensions: page type, product size, WhatsApp click source, popup name.
5. Unwanted referrals: add payment and Shopify domains so they do not break sessions.
6. Link GA4 to Search Console (after P18) and to Google Ads if used.
7. Build two simple reports or explorations: purchase funnel, and WhatsApp clicks by page.
8. Verify with a test order end to end; compare GA4 revenue with the Shopify order.

## Best practices for this phase

- One route only for GA4 (GTM or the Google and YouTube app), never both.
- Compare GA4 with Shopify analytics weekly at first; a gap of 5 to 15 percent is normal because of consent and ad blockers.
- Name events in lower snake case following GA4's recommended names.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Realtime shows page views and a test purchase.
- [ ] Ecommerce purchases report shows the product, quantity and revenue in PKR.
- [ ] No duplicate `page_view` or `purchase` events.
- [ ] Key events are marked and counting.

## Out of scope

Looker Studio dashboards, BigQuery export, paid media setup.
