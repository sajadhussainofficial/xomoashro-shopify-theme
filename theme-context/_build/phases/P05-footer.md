# P05 — Footer

Group: Foundation. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A new footer with brand blurb, newsletter signup, link columns, contact details, payment and COD marks, all editable.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation.
- **Unblocks:** [P07](P07-homepage.md) Homepage, [P15](P15-cookie-consent.md) Cookie consent.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B4 | Guarantee length (7 or 30 days), and the one correct phone number and WhatsApp number. | soft | Guarantee line omitted; WhatsApp button and widget hidden. |
| B8 | Keep the "5,000+ customers" claim? Is "Asad" the person in `Khalid-Kurt.png`? Real social profile URLs? | soft | Claim removed, that testimonial shown without photo, social icons hidden. |

## Read first

- ../wordpress-site/pages/_global-header-footer.md
- reference/content-and-seo.md

## Shopify toolkit and tools

- `shopify-liquid`: search `form customer` (newsletter), `shop.enabled_payment_types`, `payment_type_svg_tag`; validate.

## Files

- Create `sections/xo-footer.liquid`
- Create `blocks/_xo-footer-links.liquid`, `_xo-footer-brand.liquid`, `_xo-footer-newsletter.liquid`, `_xo-footer-contact.liquid`
- Modify `sections/footer-group.json`

## Task outline

Expand these into `tasks/P05-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Ink-tone footer with four block types the owner can reorder: brand (logo, blurb), links (menu picker, heading), newsletter (heading, text, email field), contact (email, phone, WhatsApp from shop facts with optional overrides).
2. Default content: corrected blurb from the old footer; columns "Shop", "Company" (About, Our Source, Journal, Contact), "Partners" (Wholesale, Ambassador, Affiliate); policies row; dynamic copyright year with the name spelled Xomoashro.
3. Newsletter uses Shopify's customer form with the `newsletter` tag, shows inline success and error messages.
4. Payment row: Cash on Delivery mark plus the store's enabled payment icons.
5. Social icons render only for links that are filled in.
6. Use the white logo (`Asset-25.svg`); the old site's footer logo path was broken, so confirm the file renders.

## Best practices for this phase

- `<footer>` landmark; each link column is a `<nav>` with a label.
- Form field has a visible label or an accessible name; errors are announced.
- Phone and email are real `tel:` and `mailto:` links.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Newsletter signup creates a subscribed customer in admin.
- [ ] Empty contact facts and socials do not leave gaps.
- [ ] All columns editable and reorderable.
- [ ] 360, 768, 1280px screenshots reviewed.

## Out of scope

Cookie preferences link (added in P15).
