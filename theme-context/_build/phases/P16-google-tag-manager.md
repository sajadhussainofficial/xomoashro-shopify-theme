# P16 — Google Tag Manager

Group: Marketing and measurement. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Google Tag Manager running through a Shopify custom pixel, fed by a clean ecommerce data layer, respecting consent.

## Dependencies

- **Needs finished first:** [P15](P15-cookie-consent.md) Cookie consent, [P08](P08-product-page.md) Product page, [P06](P06-cart-drawer-and-cart-page.md) Cart drawer and cart page.
- **Unblocks:** [P17](P17-google-analytics-4.md) Google Analytics 4, [P24](P24-launch.md) Final QA and launch.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B12 | Google access: GTM container ID, GA4 measurement ID, and whether the old site's GA4 property should be reused. | hard | Phase waits. |
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | hard | Phase waits. |
| B16 | Tracking route: GA4 through Google Tag Manager (recommended since GTM is wanted), or through Shopify's Google and YouTube app. One only. | soft | GA4 through GTM in a custom pixel; Meta through Shopify's Facebook and Instagram app. |
| B15 | Meta (Facebook) Pixel ID, if Meta ads are used. | soft | Meta tracking not set up. |

## Read first

- _build/tracking/consent-notes.md
- ../master-prompt.md (Phase 5: tracking through Customer Events, no inline scripts in the theme)

## Shopify toolkit and tools

- `shopify-dev`: search "custom pixels", "Web Pixels API standard events", "analytics.subscribe", "customer privacy in pixels" before writing.
- Google Tag Assistant and GA4 DebugView for testing.

## Files

- Create `_build/tracking/gtm-custom-pixel.js`
- Create `_build/tracking/datalayer-spec.md`
- Create `_build/tracking/gtm-container-spec.md` (tags, triggers, variables) and, if useful, an importable `gtm-container.json`
- Create `_build/tracking/setup-steps.md`

## Task outline

Expand these into `tasks/P16-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Decide the tracking architecture and record it (decision B16): GTM as the single hub for GA4, with Meta through Shopify's Facebook and Instagram app. Never run the same GA4 property through two routes.
2. Write `datalayer-spec.md`: map Shopify standard events to GA4 ecommerce events — `page_viewed` to `page_view`, `product_viewed` to `view_item`, `collection_viewed` to `view_item_list`, `search_submitted` to `search`, `product_added_to_cart` to `add_to_cart`, `cart_viewed` to `view_cart`, `checkout_started` to `begin_checkout`, `payment_info_submitted` to `add_payment_info`, `checkout_completed` to `purchase` — with item, value and currency (PKR) fields.
3. Add the custom events published by the theme: `xo:whatsapp_click`, `xo:popup_view`, `xo:popup_submit`, `xo:announcement_click`, plus a lead event for the wholesale and ambassador forms.
4. Write `gtm-custom-pixel.js`: loads the GTM container, sets Consent Mode defaults to denied, updates consent from the pixel's customer privacy data, subscribes to the events above and pushes them to the data layer.
5. Write `gtm-container-spec.md`: Consent Mode settings, GA4 configuration tag, one GA4 event tag per event, data layer variables.
6. Write `setup-steps.md` for the owner: create the pixel in Settings > Customer events, paste the code, set its permission to analytics and marketing, connect, then publish the GTM container.
7. Test: place a test order on the preview theme; confirm each event once in Tag Assistant and GA4 DebugView, with consent accepted and declined.

## Best practices for this phase

- The pixel runs in a sandbox: it cannot read the page DOM, and GTM preview mode does not attach to it. Test through GA4 DebugView and network requests.
- No tracking scripts in theme files; the theme only publishes events with `Shopify.analytics.publish`.
- Never send personal data (email, phone, name) to Google Analytics.
- Purchase must fire exactly once per order.
- COD orders count as purchases at order creation; note this in reporting.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Each event fires once with correct item, value and currency.
- [ ] With consent declined, no GA4 hits are sent (or only cookieless pings if Consent Mode is configured that way).
- [ ] A test purchase appears in GA4 with the right revenue in PKR.
- [ ] No GTM or gtag code exists in `layout/` or `snippets/`.

## Out of scope

Server-side tagging, Google Ads conversion setup, Meta Conversions API (use Shopify's own app).
