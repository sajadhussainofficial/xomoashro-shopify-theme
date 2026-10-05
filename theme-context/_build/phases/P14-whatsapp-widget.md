# P14 — WhatsApp chat widget

Group: Interactive features. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A floating WhatsApp button with an optional small chat panel and prefilled messages, so mobile shoppers can ask or order in one tap.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation, [P01](P01-store-setup-and-data-model.md) Store setup and data model.
- **Unblocks:** [P21](P21-speed-optimization.md) Speed optimization, [P22](P22-accessibility.md) Accessibility, [P23](P23-responsiveness.md) Responsiveness.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B4 | Guarantee length (7 or 30 days), and the one correct phone number and WhatsApp number. | soft | Guarantee line omitted; WhatsApp button and widget hidden. |

## Read first

- snippets/xo-tokens.liquid (overlay layering contract)
- ../competitor-notes.md (Buy box: WhatsApp)

## Shopify toolkit and tools

- `shopify-liquid`: search `url_encode`, `request.page_type`, `template` object; validate.

## Files

- Create `sections/xo-whatsapp-widget.liquid`
- Create `assets/xo-whatsapp-widget.js`
- Create `snippets/xo-whatsapp-link.liquid`
- Modify `sections/overlay-group.json`

## Task outline

Expand these into `tasks/P14-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. `xo-whatsapp-link.liquid`: builds `https://wa.me/<number>?text=<encoded message>` from the shop metafield number (digits only, country code included) with an optional override; used by this widget, the product page button, the header drawer and the contact page.
2. Section settings: enable, number override, position (start or end side), show on mobile, desktop or both, delay before showing, label text, style (icon only or icon with label).
3. Optional panel (setting): greeting heading and text, support hours, and up to four quick-reply blocks (label and prefilled message), for example "Order help", "Product question", "Wholesale".
4. Prefilled messages by page type: product page includes the product title and URL; cart page includes the item count; other pages use the default message. All messages are editable settings with `[product]` and `[url]` placeholders.
5. Placement: bottom corner, respects `env(safe-area-inset-bottom)`, sits above the sticky add-to-cart bar and the cookie banner through `--xo-bottom-offset`, hidden while a drawer or the popup is open.
6. Accessibility: a real link or button with the name "Chat on WhatsApp", visible focus ring, panel closes with Escape.
7. Publish `xo:whatsapp_click` with the page type and the chosen quick reply.
8. The widget renders nothing when no number is set.

## Best practices for this phase

- No third-party chat script; a plain link costs nothing in page speed.
- Number format for `wa.me` is international without `+`, spaces or leading zero (for Pakistan: `92` then the 10-digit number).
- Open in a new tab on desktop (WhatsApp Web) and the app on mobile.
- Do not cover the cart or checkout button at any width.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Tap on Android and iOS opens WhatsApp with the right message; on desktop opens WhatsApp Web.
- [ ] Product page message contains the product name and link.
- [ ] Button never overlaps the sticky add-to-cart bar, cookie banner or footer links at 360px.
- [ ] Everything editable; removing the number hides the widget.

## Out of scope

WhatsApp Business API automation, order notifications by WhatsApp, Shopify Inbox (Horizon's chat drawer stays inert unless the owner installs Inbox).
