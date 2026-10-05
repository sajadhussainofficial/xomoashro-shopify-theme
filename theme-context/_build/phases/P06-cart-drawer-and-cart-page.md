# P06 — Cart drawer and cart page

Group: Storefront. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A redesigned cart drawer and cart page with a free-shipping progress bar, an upsell slot, trust icons and a COD note, on top of Horizon's cart logic.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation, [P01](P01-store-setup-and-data-model.md) Store setup and data model.
- **Unblocks:** [P08](P08-product-page.md) Product page, [P16](P16-google-tag-manager.md) Google Tag Manager.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | hard | Phase waits. |
| B9 | Shipping facts: delivery time in days, shipping fee, free-delivery threshold, return terms. | soft | Progress bar and delivery estimate hidden; policies keep marked placeholders (blocks launch). |

## Read first

- _build/theme-audit.md (cart elements)
- reference/architecture.md

## Shopify toolkit and tools

- `shopify-liquid`: search `cart object`, `Section Rendering API`, `Cart Ajax API`; validate.
- Reuse `cart-drawer-component`, `cart-items-component`, `component-cart-quantity-selector`.

## Files

- Create `snippets/xo-cart-drawer.liquid`
- Create `snippets/xo-cart-line.liquid`
- Create `snippets/xo-free-shipping-bar.liquid`
- Create `blocks/xo-cart-upsell.liquid`
- Create `sections/xo-main-cart.liquid`
- Modify `sections/cart-drawer-section.liquid`, `templates/cart.json`, `layout/theme.liquid`

## Task outline

Expand these into `tasks/P06-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. A test product must exist in the store; create a draft one if P12 has not run.
2. Drawer layout: title and count, progress bar, line items (image, title, variant, quantity, remove, line price), upsell slot, subtotal, COD note, checkout button, trust icons.
3. Progress bar reads the threshold from shop facts and the cart total; hidden when the threshold is empty; text states the amount remaining or "You have free delivery".
4. Upsell block: product picker and heading; hidden when the product is already in the cart or when not set.
5. Quantity and remove update the drawer through Horizon's cart components (no reload); announce changes in a live region.
6. Empty state with a button to the product.
7. Cart page (`xo-main-cart`) uses the same line and summary snippets.
8. Settings in the editor: COD note text, trust icons, show order note, show discount field.

## Best practices for this phase

- Do not modify checkout.
- Use `routes.cart_url` and friends, never hard-coded paths.
- Money always through the `money` filters with the store currency (PKR).
- Cart updates must be announced to screen readers.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Add, change quantity, remove, empty: all work without reload and the header count stays right.
- [ ] Progress bar crosses the threshold correctly.
- [ ] Drawer traps focus and closes on Escape.
- [ ] Checkout button reaches Shopify checkout with the right contents.

## Out of scope

Checkout changes, COD fees or COD verification (would need an app or Functions).
