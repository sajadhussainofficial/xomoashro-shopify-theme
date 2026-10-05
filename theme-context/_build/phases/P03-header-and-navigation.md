# P03 — Header and navigation

Group: Foundation. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A new header with logo, navigation, search and cart, and a mobile drawer, fully editable in the Theme Editor.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation.
- **Unblocks:** [P07](P07-homepage.md) Homepage.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B5 | Logo colour. Answered 2026-10-06: keep the orange `#FF6B31` logo. | answered | Orange logo. |

## Read first

- reference/design-system.md
- ../competitor-notes.md (Homepage: Header)
- _build/theme-audit.md (header elements)

## Shopify toolkit and tools

- `shopify-liquid`: search `linklists`, `section groups`, `predictive search` before writing; validate.
- `shopify-admin` to create the main menu (needs store access; otherwise list the menu for the owner to create).

## Files

- Create `sections/xo-header.liquid`
- Create `snippets/xo-header-drawer.liquid`
- Create `snippets/xo-nav-link.liquid`
- Modify `sections/header-group.json`
- Create `_build/menus.json` (main menu and footer menus)

## Task outline

Expand these into `tasks/P03-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Build `xo-header` around Horizon's `header-component`, `header-drawer`, `cart-icon` and predictive search elements so cart count, drawer and search keep working. Settings: logo (image or SVG), logo width, menu picker, sticky on or off, tone, show search, show a small "Shop" button on mobile with its link.
2. Desktop: logo left, menu centre, search and cart right. Mobile: menu button, logo, Shop button, cart.
3. Mobile drawer: menu links at 48px height, then Track order, Contact, WhatsApp link (from shop facts) and social links.
4. Default menu from `menus.json`: Shop, Lab Reports, Our Source, How to Use, Reviews, Journal, Wholesale. Links to pages that do not exist yet point to their future handles.
5. Logo: use `Asset-24.svg` recoloured per decision B5; set the favicon from `Asset-22.svg`.
6. Measure header height before first paint (reuse Horizon's `measure-header-heights`) so the hero does not jump.
7. Editor behaviour: opening the header in the editor does not break; selecting the drawer block opens the drawer.

## Best practices for this phase

- One `<header>` landmark, one `<nav>` with an accessible name, current page marked with `aria-current`.
- Drawer traps focus, closes on Escape and returns focus to the button.
- No layout shift when the header becomes sticky.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Keyboard: Tab reaches every link; drawer opens, traps focus and closes.
- [ ] Cart count updates after add to cart without reload.
- [ ] Menu, logo and tone change from the Theme Editor.
- [ ] 360, 768, 1280px screenshots reviewed.

## Out of scope

Announcement bar (P04). Mega menu (not needed for a one-product store).
