# P05 report — Footer

Date: 2026-10-06. Branch: `phase/P05-footer`.

## 1. Result

The phase goal is met, with one check waiting on you: a new dark footer with a newsletter band, brand blurb, three link columns, customer-care details, policy links and the cash-on-delivery mark, all editable. The real newsletter signup has to be done by a person (part 4).

## 2. Files created and changed

Theme (`xomoashro-them/`):

| File | What it is |
|---|---|
| `sections/xo-footer.liquid` | Footer section with four block types the owner can add, remove and reorder: Newsletter, Brand, Link column (up to four), Contact; bottom bar with copyright, policies, cash-on-delivery mark and payment icons |
| `sections/footer-group.json` | Uses the new footer in place of Horizon's footer and footer utilities |
| `locales/en.default.json`, `en.default.schema.json` | Footer strings and editor labels |

Build files: `tasks/P05-tasks.md`, `reports/P05-screens/`, status update.

Deviation from the phase file: the four block types are defined inside the section instead of four `blocks/_xo-footer-*.liquid` files. They are still separate, reorderable blocks in the editor.

## 3. Source content used

- Brand blurb from `wordpress-site/pages/_global-header-footer.md` (already spelled Xomoashro; unchanged).
- `ask@xomoashro.com` and "Islamabad" from the old contact page and footer.
- Link columns from `menus.json` (P03): Shop, Company, Partners. "Ambassador" spelled correctly; "My Account" dropped (it pointed to the broken affiliate dashboard).
- The broken old footer logo is replaced by the built-in white logo.

## 4. Acceptance checks

| Check | Result | Evidence |
|---|---|---|
| Newsletter signup creates a subscribed customer in admin | **Not run: needs you** | The form is correct (`customer` form, `contact[email]`, tags `newsletter,footer`, visible label, success and error messages wired to the field). Shopify's bot protection ("Verifying your connection") stops automated submissions, and creating a customer is a write to your store, so I left it to you |
| Empty contact facts and socials leave no gaps | Pass | With email and address cleared, the contact column disappears on the store (it shows a note only in the Theme Editor). Social icons appear only for filled-in links (tested with Instagram). The empty phone and WhatsApp lines are hidden today |
| All columns editable and reorderable | Pass, by proxy | Reordering blocks, removing two, switching to the light tone and turning off the cash-on-delivery mark all changed the live footer, including the switch to the dark logo. The editor itself was not opened (needs your login) |
| 360, 768, 1280px screenshots reviewed | Pass | `reports/P05-screens/footer-360.jpeg`, `-768`, `-1280`; no horizontal scroll |
| Accessibility | Pass | One `<footer>` landmark (the layout's); each link column is a labelled `<nav>`; every link 44px tall; keyboard reaches the field, button and every link with a visible focus ring |
| Toolkit validation and theme check | Pass | 4 of 4 files valid; 0 errors, the same 6 stock warnings |

## 5. Defaults taken

- **B4:** no phone number shown (three conflicting numbers on the old site); WhatsApp line hidden until a number is saved in store data.
- **B8:** no social icons (no profile links in the old site).
- Newsletter copy promises no discount (decision B11 still open).

## 6. Open items

- **Payment icons** show nothing yet because no payment methods are set up in the store; they appear automatically once they are.
- **Policies:** only the privacy policy exists in the store, so only that link shows. The rest follow in P12.
- **Menus:** the link columns use their own default links until real menus exist (P12); choosing a menu in a column replaces them.
- No `{{TODO}}` markers were placed.

## 7. How to preview

- `shopify theme dev`, then any page on `http://127.0.0.1:9292/`, scroll to the bottom.
- Theme Editor: "Footer" in the Footer group. Settings: tone, WhatsApp message, copyright, policy links, cash-on-delivery mark, payment icons. Blocks: Newsletter, Brand (logo, text, social links), Link column, Contact.

## 8. Next

- **To finish P05:** sign up once with your own email in the footer, then check Customers in Shopify admin for a subscribed customer tagged `newsletter`.
- **P01 Store setup and data model** is next in the order. It writes to your store (metafield definitions and values), so each step will be shown to you for approval first.
