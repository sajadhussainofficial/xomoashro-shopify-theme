# P01 — Store setup and data model

Group: Foundation. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Connect the Shopify store and create the data structures the theme reads: metafield definitions, the lab report metaobject and base store settings.

## Dependencies

- **Needs finished first:** [P00](P00-inventory-and-audit.md) Inventory and audit.
- **Unblocks:** [P06](P06-cart-drawer-and-cart-page.md) Cart drawer and cart page, [P08](P08-product-page.md) Product page, [P10](P10-content-pages.md) Content pages, [P12](P12-content-import.md) Content import, [P14](P14-whatsapp-widget.md) WhatsApp chat widget.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | hard | Phase waits. |
| B4 | Guarantee length (7 or 30 days), and the one correct phone number and WhatsApp number. | soft | Guarantee line omitted; WhatsApp button and widget hidden. |
| B9 | Shipping facts: delivery time in days, shipping fee, free-delivery threshold, return terms. | soft | Progress bar and delivery estimate hidden; policies keep marked placeholders (blocks launch). |

## Read first

- reference/architecture.md
- ../master-prompt.md (Data model)

## Shopify toolkit and tools

- `shopify-custom-data` for metafield and metaobject definitions.
- `shopify-admin` to write and validate each GraphQL mutation.
- `shopify-use-shopify-cli` for `shopify store auth` and `shopify store execute`. Show each command and what it sends, and get approval before running it.
- `shopify-onboarding-merchant` for the store settings checklist.

## Files

- Create `_build/store-setup/metafields.graphql`
- Create `_build/store-setup/metaobjects.graphql`
- Create `_build/store-setup/shop-metafield-values.graphql`
- Create `_build/store-setup/settings-checklist.md`
- Create `xomoashro-them/shopify.theme.toml` (store and theme environments, no secrets)

## Task outline

Expand these into `tasks/P01-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Confirm CLI login and store domain; record the store domain in `decisions.md`. Run `shopify theme list` to confirm access.
2. Push the theme as a new unpublished theme (`shopify theme push --unpublished`) and record its theme ID. All later work previews against this theme, never the live one.
3. Define product metafields (`custom.` namespace): `fulvic_percent`, `altitude_ft`, `origin_region`, `batch_number`, `lab_name`, `lab_test_date`, `lab_report` (file), `supply_days`, `how_to_use` (rich text), `safety` (rich text), plus `best_for` (single line) and `net_weight_g` (number) for the size cards and per-gram price.
4. Define shop metafields: `custom.whatsapp_number`, `support_email`, `free_shipping_threshold`, `guarantee_days`, `delivery_days_min`, `delivery_days_max`.
5. Define the `lab_report` metaobject (batch, date, lab, fulvic_percent, lead, arsenic, mercury, cadmium, pdf) with storefront access enabled.
6. Validate every mutation with the toolkit, show them to the owner, run on approval, then read the definitions back to confirm.
7. Set shop metafield values for every decision already answered; leave the rest empty (sections hide empty facts).
8. Write `settings-checklist.md` for the owner: PKR currency, Pakistan shipping zone and rates, Cash on Delivery manual payment, customer accounts, phone required at checkout, order notification email, store name spelled "Xomoashro".

## Best practices for this phase

- Pin every metafield definition so it shows on the product in admin.
- Use typed metafields (number, date, file, rich text); never store numbers as text.
- Storefront access must be on for anything Liquid reads.
- Never write to the live published theme. Never commit tokens or passwords.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Definitions are visible in Settings > Custom data.
- [ ] A test value set on a product appears through `{{ product.metafields.custom.batch_number }}` in the preview theme.
- [ ] The unpublished theme previews without errors.

## Out of scope

Importing products or content (P12). Building sections.
