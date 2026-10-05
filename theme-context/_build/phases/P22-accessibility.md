# P22 — Accessibility

Group: Quality. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

The whole storefront meets WCAG 2.2 level AA, checked by automated tools and by hand.

## Dependencies

- **Needs finished first:** [P07](P07-homepage.md) Homepage, [P08](P08-product-page.md) Product page, [P09](P09-collection-search-and-utility-pages.md) Collection, search and utility pages, [P10](P10-content-pages.md) Content pages, [P11](P11-blog-and-article.md) Journal: blog and article, [P13](P13-promotional-popup.md) Promotional popup, [P14](P14-whatsapp-widget.md) WhatsApp chat widget, [P15](P15-cookie-consent.md) Cookie consent.
- **Unblocks:** [P24](P24-launch.md) Final QA and launch.

## Decisions needed from the owner

None. This phase can run without owner input.

## Read first

- reference/design-system.md (contrast table)

## Shopify toolkit and tools

- `design:accessibility-review` for the audit method.
- axe-core through Playwright (`@axe-core/playwright`, installed under `_build/tools/`) on every template; Lighthouse accessibility.
- Manual: keyboard only; one screen reader pass (NVDA or VoiceOver, and TalkBack on Android since most visitors are on mobile).

## Files

- Create `_build/tools/a11y-scan.mjs`
- Create `_build/accessibility/audit.md` and `fixes.md`
- Modify theme files as findings require

## Task outline

Expand these into `tasks/P22-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Automated scan of every template at 390 and 1280px; record violations in `audit.md`.
2. Keyboard pass: every link, button, form field, accordion, carousel, drawer, popup and the cookie banner reachable and operable; focus always visible; focus order follows reading order; no keyboard trap except inside modals.
3. Dialogs (cart drawer, menu drawer, popup, preferences, zoom): labelled, focus moves in, Escape closes, focus returns to the trigger.
4. Structure: landmarks (header, nav, main, footer), skip link, one H1, heading order, lists marked up as lists, tables with headers.
5. Forms: visible labels, required fields indicated in text, errors described and linked to their field, success announced.
6. Images and icons: meaningful alt text, decorative ones hidden; icon-only buttons have accessible names.
7. Colour and contrast: text 4.5:1, large text and interface parts 3:1; information never by colour alone (the comparison table uses icons with text alternatives).
8. Motion: carousels and rotating messages can be paused; everything respects `prefers-reduced-motion`.
9. Zoom and reflow: usable at 200% zoom and at 320px width without horizontal scrolling; text spacing can be increased.
10. Touch targets: at least 44 by 44px for primary controls and never under 24px.
11. Dynamic updates (cart changes, form results, variant change) announced through live regions.
12. Fix everything found, re-scan, and write `fixes.md`.

## Best practices for this phase

- Use native elements first (`button`, `a`, `details`, `dialog`, `input`); add ARIA only where no native element fits.
- Automated tools find roughly a third of issues; the manual pass is required.
- The `lang` and `dir` attributes must be correct for a future Urdu version.
- Accessibility is checked in every phase; this phase is the full audit, not the first look.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] axe reports zero serious or critical violations on every template.
- [ ] Lighthouse accessibility 95 or higher on home and product.
- [ ] A complete purchase path (home to checkout button) is possible with keyboard only.
- [ ] Screen reader pass notes recorded with no blocking issue.

## Out of scope

Accessibility of Shopify checkout and of third-party app widgets (report issues to the app, cannot be fixed in the theme).
