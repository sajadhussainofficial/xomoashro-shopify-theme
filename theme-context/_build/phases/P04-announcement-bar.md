# P04 — Announcement bar

Group: Interactive features. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A slim bar above the header with one or several rotating messages, editable, with no layout shift.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation.
- **Unblocks:** nothing further.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B9 | Shipping facts: delivery time in days, shipping fee, free-delivery threshold, return terms. | soft | Progress bar and delivery estimate hidden; policies keep marked placeholders (blocks launch). |
| B4 | Guarantee length (7 or 30 days), and the one correct phone number and WhatsApp number. | soft | Guarantee line omitted; WhatsApp button and widget hidden. |

## Read first

- reference/design-system.md
- ../competitor-notes.md (Announcement bar)

## Shopify toolkit and tools

- `shopify-liquid`: search `section blocks`, `visible_if`, `richtext` setting; validate.
- Reuse Horizon's `announcement-bar-component` (`assets/announcement-bar.js`) for rotation.

## Files

- Create `sections/xo-announcement.liquid`
- Create `blocks/_xo-announcement-message.liquid`
- Modify `sections/header-group.json`

## Task outline

Expand these into `tasks/P04-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Section settings: tone (accent by default), autoplay on or off, seconds per message (4 to 10), show arrows, dismissible on or off, text size.
2. Block "message": text (inline rich text), optional link, optional icon, and a "dynamic value" choice that inserts the free-shipping threshold or guarantee days from shop facts.
3. Default blocks: free delivery over the threshold, "Cash on delivery across Pakistan", "Questions? Chat on WhatsApp". A block whose dynamic value is empty is not rendered.
4. Rotation: fade between messages; pause on hover and on keyboard focus; arrows are real buttons; under `prefers-reduced-motion` show the first message only.
5. Reserve the bar height in CSS so the page does not jump when it loads; one line only, truncated with an ellipsis on very small screens.
6. Dismiss (when enabled) is remembered for the browser session only.
7. Publish a `xo:announcement_click` analytics event when a message link is clicked.

## Best practices for this phase

- Rotating content must be pausable (WCAG 2.2.2).
- Do not use a marquee; scrolling text is hard to read and to pause.
- Keep messages under about 45 characters so they fit at 360px.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] No layout shift (CLS 0) from the bar on load.
- [ ] Messages, order, links and timing change from the editor.
- [ ] Works with one message (no arrows, no rotation).
- [ ] Readable at 360px.

## Out of scope

Countdown timers and sale banners (deliberately excluded).
