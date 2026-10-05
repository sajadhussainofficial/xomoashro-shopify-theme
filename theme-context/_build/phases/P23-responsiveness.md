# P23 — Responsiveness

Group: Quality. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Every page looks deliberate and works at every screen size, from a 320px phone to a wide desktop, in portrait and landscape.

## Dependencies

- **Needs finished first:** [P07](P07-homepage.md) Homepage, [P08](P08-product-page.md) Product page, [P09](P09-collection-search-and-utility-pages.md) Collection, search and utility pages, [P10](P10-content-pages.md) Content pages, [P11](P11-blog-and-article.md) Journal: blog and article, [P13](P13-promotional-popup.md) Promotional popup, [P14](P14-whatsapp-widget.md) WhatsApp chat widget, [P15](P15-cookie-consent.md) Cookie consent.
- **Unblocks:** [P24](P24-launch.md) Final QA and launch.

## Decisions needed from the owner

None. This phase can run without owner input.

## Read first

- reference/design-system.md
- snippets/xo-tokens.liquid

## Shopify toolkit and tools

- Playwright (plugin) screenshots of every template at each width; a script under `_build/tools/responsive-shots.mjs` for repeatable runs.
- Real devices where available: one small Android phone, one iPhone.

## Files

- Create `_build/tools/responsive-shots.mjs`
- Create `_build/responsive/matrix.md` (template by width, pass or issue)
- Create `_build/responsive/screens/`
- Modify theme files as findings require

## Task outline

Expand these into `tasks/P23-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Widths to test: 320, 360, 390, 414, 768, 1024, 1280, 1440, 1920; plus 844 by 390 landscape.
2. Capture every template at every width; review each screenshot; record issues in `matrix.md`.
3. No horizontal scrolling at any width; long words, prices and Urdu or English mixed text wrap correctly.
4. Type scale: headings scale smoothly with `clamp()`; body text never under 16px on mobile; line length 45 to 75 characters on desktop.
5. Grids: cards go 1, 2, 3 or 4 columns at Horizon's breakpoints (750px, 990px); the last row never leaves an awkward single card where it can be avoided.
6. Media: separate mobile and desktop hero images; correct aspect ratios; no cropping of the product jar.
7. Fixed elements together: header, anchor navigation, sticky add-to-cart bar, WhatsApp button, cookie banner and popup never overlap or hide content, including with the on-screen keyboard open.
8. Notches and home indicators: safe-area insets respected on all fixed elements.
9. Hover effects only inside `@media (hover: hover)`; touch devices get no stuck hover states.
10. Tables (comparison, lab reports, specifications) stay readable on mobile: stacked rows or contained horizontal scroll with a visible cue.
11. Forms: correct `inputmode` and `autocomplete` (phone, email), fields at least 48px tall, no zoom on focus on iOS.
12. Fix, re-capture, and mark every cell of the matrix as passed.

## Best practices for this phase

- Mobile first: about 85% of visitors are on phones, so the 360px layout is the primary design, not a fallback.
- Use container queries for components that appear in different widths (cards, bundles), media queries for page layout.
- Use `dvh` and safe-area units for full-height and fixed elements.
- Never hide content on mobile that exists on desktop; reorder or collapse it.
- Test in the Theme Editor's mobile preview as well as the browser.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Matrix complete with no open issue.
- [ ] No horizontal scroll on any template at 320px.
- [ ] Purchase path tested on a real Android phone and a real iPhone.
- [ ] Landscape phone view usable on home and product.

## Out of scope

Native app, tablet-specific designs beyond the breakpoints above.
