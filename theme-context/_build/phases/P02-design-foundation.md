# P02 — Design foundation

Group: Foundation. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Install the "Mountain Apothecary" design system so every later section inherits it: colours, type, spacing, buttons, forms, icons, shared snippets and the overlay layering contract.

## Dependencies

- **Needs finished first:** [P00](P00-inventory-and-audit.md) Inventory and audit.
- **Unblocks:** [P03](P03-header-and-navigation.md) Header and navigation, [P04](P04-announcement-bar.md) Announcement bar, [P05](P05-footer.md) Footer, [P06](P06-cart-drawer-and-cart-page.md) Cart drawer and cart page, [P07](P07-homepage.md) Homepage, [P08](P08-product-page.md) Product page, [P09](P09-collection-search-and-utility-pages.md) Collection, search and utility pages, [P10](P10-content-pages.md) Content pages, [P11](P11-blog-and-article.md) Journal: blog and article, [P13](P13-promotional-popup.md) Promotional popup, [P14](P14-whatsapp-widget.md) WhatsApp chat widget, [P15](P15-cookie-consent.md) Cookie consent.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B5 | Logo colour: keep orange `#FF6B31`, or render the logo in the new ink and amber palette. | soft | Logo shape kept, rendered in ink with an amber mark. |
| B19 | With the logo staying orange, which accent colour: (a) brand orange `#FF6B31` with dark text; (b) amber `#B8742A` as first planned. | soft | (a): orange buttons with ink text, deep orange `#C2410C` for links. |

## Read first

- reference/design-system.md
- reference/architecture.md
- ../competitor-notes.md (section 5)

## Shopify toolkit and tools

- `shopify-liquid`: search docs for `font_picker`, `color_palette`, `image_tag`, `stylesheet` tag before writing; validate each new file.
- `frontend-design` and `design-taste-frontend` for the visual direction of type scale, buttons and cards.
- `shopify theme check` after each file.

## Files

- Modify `config/settings_schema.json` (rename theme to Xomoashro 1.0.0, add a "Xomoashro" settings group)
- Modify `config/settings_data.json` (palette, fonts, sizes, buttons, radius, logo)
- Create `assets/xo-base.css`
- Create `snippets/xo-tokens.liquid`
- Create `snippets/xo-shop-facts.liquid`
- Create `snippets/xo-icon.liquid` and `assets/xo-icon-*.svg`
- Create `snippets/xo-image.liquid`
- Create `snippets/xo-section-heading.liquid`
- Create `snippets/xo-button.liquid`
- Create `assets/xo-reveal.js`
- Create `sections/overlay-group.json` (section group type `custom.overlay`)
- Create `sections/xo-styleguide.liquid` and `templates/page.styleguide.json`
- Modify `layout/theme.liquid`
- Modify `locales/en.default.json` and `locales/en.default.schema.json` (new `xo` namespace)

## Task outline

Expand these into `tasks/P02-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Set palette and button colours in theme settings: ink `#0E0D0B`, bone `#F5F1EA`, amber `#B8742A` with ink text, amber-deep `#9A5E1F` for links. Record contrast ratios next to each pair in a comment.
2. Set fonts: Fraunces for headings, Inter for body. Check through the toolkit whether Fraunces is in Shopify's font library; if not, self-host two WOFF2 weights in `assets/` with `font-display: swap`.
3. `xo-tokens.liquid`: spacing scale (8px steps), radius (14px cards, 999px pills), fluid type scale with `clamp()`, three section tones (bone, ink, amber) as custom properties, z-index scale, and the bottom-stack variables described below.
4. `xo-base.css`: headings, body, links, buttons (48px minimum height), form fields, focus ring, selection colour, section tone classes, a `.xo-container` and section spacing utilities. Loaded after `base.css`.
5. Overlay layering contract: one z-index scale (header, sticky bars, WhatsApp button, cookie banner, drawers, popup) and a `--xo-bottom-offset` variable that each bottom-fixed element adds to, so the sticky add-to-cart bar, WhatsApp button and cookie banner never overlap. Document it at the top of `xo-tokens.liquid`.
6. Shared snippets: `xo-section-heading` (eyebrow, serif heading, amber rule, optional lead), `xo-button`, `xo-image` (srcset, sizes, lazy or eager, width and height always set), `xo-icon` (inline SVG by name).
7. `xo-shop-facts.liquid`: reads shop metafields and returns guarantee days, WhatsApp link, support email, free-shipping threshold, delivery range; returns blank for anything unset.
8. `xo-reveal.js`: one IntersectionObserver for fade-and-rise, disabled under `prefers-reduced-motion` and in the theme editor.
9. Create the empty `overlay-group` section group and render it in `theme.liquid` before `</body>`; P13, P14 and P15 add their sections to it.
10. Build `xo-styleguide` (headings, text, buttons, form fields, cards, icons, tones) on a hidden page template for visual QA. Screenshot at 360, 768 and 1280px.

## Best practices for this phase

- Mobile-first CSS; logical properties only (`margin-inline`, `inset-inline`) so Urdu RTL works later.
- Use Horizon's breakpoints (750px, 990px) so new and reused parts change layout together.
- Tokens are CSS custom properties; no hard-coded colours or sizes in section files.
- Every interface string goes through `locales/en.default.json`.
- Do not edit `base.css`; override in `xo-base.css`.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Styleguide renders correctly in all three tones at 360, 768 and 1280px.
- [ ] Every text and button colour pair meets WCAG AA (4.5:1 text, 3:1 large text and UI).
- [ ] Changing the accent colour in theme settings changes every button.
- [ ] `shopify theme check` reports 0 errors.

## Out of scope

Any real page section. Header and footer.
