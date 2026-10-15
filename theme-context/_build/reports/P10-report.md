# P10 report — Content pages

Date: 2026-10-16. Branch: `phase/P10-content-pages`.

## 1. Result

Nine content pages are built as page designs (JSON templates), each made from editable sections and pre-filled with the old site's copy, corrected under the rules in `content-fixes.md`.

Two checks were not run, because you did not give permission for store writes:
- **Form messages reaching your inbox:** sending a test would put messages in your store's inbox.
- **The pages as real pages:** creating the page records is P12's job anyway.

Every design was previewed through your existing Contact page with `?view=`, for example `/pages/contact?view=about`.

**Update, same day: pages created.** At your request ("Yes Create Pages"), the 8 missing pages were created in the store with `store-setup/page-create.graphql` and the files in `store-setup/pages/`:
- About us, Our source, How to use, Lab reports, Wholesale, Ambassador programme, Affiliate programme, Track your order.
- Each is published, with an empty content box (the sections carry the content) and its Google title and description.
- Contact already existed and was left alone.

All 9 addresses now return 200 on the preview, each showing its own design. Customers still cannot see them while the store is password protected. On the live store they show the new designs once P10 is pushed live.

## 2. The pages

| Page | Address after P12 | What is on it |
|---|---|---|
| About | `/pages/about` | Heading with picture; "Our story" signed by the Xomoashro team; mission with three points; benefits; why Xomoashro; reviews; partner links |
| Our Source | `/pages/our-source` | Heading; the source story; the two regions (Chitral, Gilgit-Baltistan) and direct sourcing; the four home purity checks; lab proof (hidden until a report exists); comparison; "Shop Shilajit" |
| How to Use | `/pages/how-to-use` | Heading; the three steps with picture; storage tips; product questions; precautions |
| Lab Reports | `/pages/lab-reports` | Heading; the batch table with search, or "Reports will be published here" until the first report; how to read a report; purity checks |
| Wholesale | `/pages/wholesale` | Heading with picture and "Apply now"; three steps (apply, we contact you, first order); wholesale application; delivery questions |
| Ambassador | `/pages/ambassador` | Heading; three steps; perks; ambassador application with a terms tick box |
| Affiliate | `/pages/affiliate` | Heading; three steps (apply, get your link, share and earn); affiliate application |
| Track Order | `/pages/track-order` | Heading; "View my orders" sign-in, order enquiry form, WhatsApp; delivery questions |
| Contact | `/pages/contact` | WhatsApp first (+92 306 8886317), email, location (Islamabad, Pakistan), contact form; all questions |

The Contact page design also replaces the one your existing Contact page uses, so it takes effect on that page as soon as the theme goes live.

## 3. New sections

| Section | What it does |
|---|---|
| `xo-page-hero` | The page's main heading (H1), with an optional picture and buttons; uses the page title when the heading is empty |
| `xo-rich-text` | Text with an optional signed line and button |
| `xo-media-text` | Picture beside text, with up to six points |
| `xo-steps` | Numbered step cards |
| `xo-lead-form` | Application form built from field blocks (text, phone, number, web address, dropdown, long text, tick box) |
| `xo-contact` | Contact methods and a contact form |
| `xo-track-order` | Order sign-in, order enquiry form and WhatsApp |
| `xo-lab-reports` | Lab report table, newest first, with search by batch |

**Supporting files:**
- `snippets/xo-form-field.liquid`: one field with label, required mark and error state.
- `snippets/xo-lab-report-row.liquid`: one row of the lab table.
- `assets/xo-lab-search.js`: the batch search.
- Shared form styles in `assets/xo-base.css`.

## 4. How the forms work

All forms are Shopify contact forms, so messages arrive in the store's contact inbox (the staff contact notification). Spam protection is Shopify's own.
- **Each message starts with a form name line** (for example "Form: Wholesale enquiry"), so you can tell the forms apart. Every other answer appears under its question.
- **Shopify only requires the email.** Other required fields are marked * and checked by the browser.
- **Errors and thanks:** if Shopify rejects the email, the error shows at the top and the email field is marked. A thank-you message is announced after sending.
- **No file uploads**, because Shopify forms do not support them. The ambassador form asks people to send portfolios by email or WhatsApp.

## 5. Acceptance checks

Screenshots are in `reports/P10-screens/`.

| Check | Result | Evidence |
|---|---|---|
| Each form arrives in the contact inbox with the right subject | **Not run.** No permission to send test messages. Each form carries its form name line ("Wholesale enquiry", "Ambassador application", "Affiliate application", "Order status enquiry", "Contact page message") | test log |
| Forms usable and safe without sending | Pass. All 5 forms: every field has a visible label; required fields marked; the browser blocks an empty send; 0 messages sent during testing | test log |
| Every section editable and pre-filled | Pass. All copy sits in section settings in the templates; nothing is in the page body. The Theme Editor click-through needs your login | |
| Lab page with 0, 1 and several reports | Pass. 0: the friendly message, and the "Find your batch" heading hidden. 1 and 3 (temporary TEST rows, removed afterwards): 1 shows no search box; 3 shows search, "2607" leaves one row, a non-match shows the help message, missing values show a dash; phone layout turns rows into cards | `lab-reports-1280.png`, `lab-reports-one-TEST-1280.png`, `lab-reports-several-TEST-1280.png`, `lab-reports-several-TEST-360.png` |
| Screenshots at three widths | Pass. All 9 pages at 360, 768 and 1280px; one H1 each; no sideways scroll; no errors | `<page>-360.png`, `-768.png`, `-1280.png` |
| Toolkit validation and theme check | Pass on all 21 files; theme check 0 errors, 18 warnings (unchanged) | |

Not proven by the TEST rows: the newest-first order, which sorts real reports by test date. It runs only with real reports.

## 6. Wording decisions

- **"Over 5,000+ customers"** became "customers across Pakistan trust Xomoashro" (not confirmed, B8).
- **Effect claims removed:** "restore vitality, strengthen the body, support mental clarity" became neutral wording about tradition and routine.
- **Ambassador perks:** "Community of healthcare experts provides guidance" became "support from our team and a community" (no medical advice implied).
- **Lab pages:** no claim that every batch is tested, and no claim that the batch number is printed on the jar, until B3 is answered.
- **Distributor page:** its referral steps were affiliate steps, so they moved to the Affiliate page. Wholesale got its own steps (content fix 25).
- **Spelling:** "Ambassador" everywhere; old typos fixed.
- **No phone number** is shown on Contact while the number is unconfirmed (B4). Add it in the Contact section once confirmed.

## 7. Open items

- **Permission to send test messages:** one per form (5 messages, marked TEST), to prove they arrive.
- **B6, Affiliate:** an app (Shopify Collabs, UpPromote) or keep the form.
- **B3, Lab reports:** saving the first report fills the table automatically.
- **B4, Phone number:** to show on Contact.
- **P12:** the page records now exist. P12 still adds the redirects from the old addresses.
- **Store name:** still "https://xomoashro.com/"; please change it to "Xomoashro".

## 8. Next

P11 Journal: blog and article.
