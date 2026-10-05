# P13 — Promotional popup

Group: Interactive features. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A centred promotional popup (newsletter signup, discount code or announcement) that is editable, polite in its timing and accessible.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation.
- **Unblocks:** [P21](P21-speed-optimization.md) Speed optimization, [P22](P22-accessibility.md) Accessibility, [P23](P23-responsiveness.md) Responsiveness.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B11 | Promotional popup: what does it offer (newsletter only, a discount code and its value, or an announcement)? | soft | Newsletter invitation without a discount; popup shipped disabled. |

## Read first

- reference/design-system.md
- snippets/xo-tokens.liquid (overlay layering contract)
- ../competitor-notes.md (What to avoid)

## Shopify toolkit and tools

- `shopify-liquid`: search `form customer`, `section groups`, theme editor JavaScript events (`shopify:section:select`); validate.
- Reuse Horizon's `dialog-component` (native `<dialog>`).

## Files

- Create `sections/xo-promo-popup.liquid`
- Create `assets/xo-promo-popup.js`
- Modify `sections/overlay-group.json`

## Task outline

Expand these into `tasks/P13-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Section settings — content: image, eyebrow, heading, text, mode (email signup, discount code with copy button, or button link), success message, small print.
2. Section settings — behaviour: enable, trigger (delay in seconds, scroll percentage, or exit intent on desktop), show again after N days, show on (all pages or homepage only), exclude cart, policy and password pages, show to logged-in customers or not, start and end date.
3. Layout: centred card, image on top (mobile) or beside (desktop), maximum 480px wide on mobile with 16px margins, close button at least 44px.
4. Logic in `xo-promo-popup.js`: never open while the cookie banner, cart drawer or menu drawer is open; wait for the cookie choice first; remember dismissal and signup in `localStorage` with the chosen number of days; check the date window in JavaScript (pages are cached).
5. Email mode uses Shopify's customer form with tags `newsletter, popup`; show the success state without a page reload where possible.
6. Accessibility: native modal dialog, labelled by its heading, focus moves in and returns to the page on close, closes with Escape, the close button and a click on the backdrop.
7. Theme Editor: selecting the section opens the popup so it can be edited; deselecting closes it.
8. Publish analytics events: `xo:popup_view`, `xo:popup_close`, `xo:popup_submit`.
9. Default content: newsletter invitation in brand voice with no discount promised unless decision B11 gives one; shipped disabled until the owner turns it on.

## Best practices for this phase

- Google penalises intrusive interstitials on mobile: default trigger is 12 seconds or 40% scroll, never on first paint.
- One popup per visit at most; a visitor who closed it is not asked again for at least 7 days.
- No fake urgency and no "No thanks, I don't like saving money" style decline text.
- The popup script loads deferred and only when the section is enabled.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Opens on each trigger type; does not reopen within the cap; never appears with the cookie banner or cart drawer.
- [ ] Keyboard and screen reader: focus trapped, Escape closes, focus returns.
- [ ] Signup creates a customer with the right tags.
- [ ] All text, image and timing editable; disabling it removes its JavaScript from the page.
- [ ] No change in LCP or CLS with the popup enabled.

## Out of scope

Spin-to-win wheels, countdown timers, multi-step popups.
