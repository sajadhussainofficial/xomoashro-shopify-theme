# P10 — Content pages

Group: Storefront. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Every custom page as a JSON template built from sections, pre-filled with corrected content: About, Our Source, How to Use, Lab Reports, Wholesale, Ambassador, Affiliate, Track Order, Contact.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation, [P07](P07-homepage.md) Homepage, [P01](P01-store-setup-and-data-model.md) Store setup and data model.
- **Unblocks:** [P20](P20-technical-seo.md) Technical SEO, [P21](P21-speed-optimization.md) Speed optimization, [P22](P22-accessibility.md) Accessibility, [P23](P23-responsiveness.md) Responsiveness.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B3 | Lab report file, lab name, test date, batch number, measured fulvic percentage and heavy-metal values. | soft | All lab claims and lab sections stay hidden. |
| B4 | Guarantee length (7 or 30 days), and the one correct phone number and WhatsApp number. | soft | Guarantee line omitted; WhatsApp button and widget hidden. |
| B6 | Affiliate programme: which app (Shopify Collabs, UpPromote or other), or drop it. | soft | Affiliate page becomes an application form. |

## Read first

- ../wordpress-site/pages/about-us.md, become-distributor.md, become-brand-ambassadar.md, contact-us.md
- reference/content-and-seo.md
- _build/content-fixes.md

## Shopify toolkit and tools

- `shopify-liquid`: search `metaobject`, `form contact`, `page object`; validate.
- `shopify-storefront-graphql` only if lab-report search cannot be done in Liquid.

## Files

- Create templates: `page.about.json`, `page.our-source.json`, `page.how-to-use.json`, `page.lab-reports.json`, `page.wholesale.json`, `page.ambassador.json`, `page.affiliate.json`, `page.track-order.json`, `page.contact.json`
- Create sections: `xo-page-hero`, `xo-rich-text`, `xo-media-text`, `xo-steps`, `xo-lab-reports`, `xo-lead-form`, `xo-contact`, `xo-track-order`
- Create `assets/xo-lab-search.js`
- Create `_build/pages/*.json` (page titles, handles, template suffixes)

## Task outline

Expand these into `tasks/P10-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Shared sections first: page hero, rich text, media with text, numbered steps.
2. About: "Our Story" and the mission copy from the old About page, corrected; reuse benefits grid, why-Xomoashro and reviews sections.
3. Our Source: sourcing story, region cards, purity test, lab proof.
4. How to Use: three steps, FAQ subset, precautions block.
5. Lab Reports: table of `lab_report` metaobjects with batch search; friendly empty state ("Reports will be published here") while none exist.
6. Wholesale: "How it works" steps and a lead form (name, business, city, phone, quantity, business type) through Shopify's contact form with a subject tag.
7. Ambassador: steps, perks, application form (spelled Ambassador). Affiliate: programme outline and application form, or the affiliate app's embed per decision B6.
8. Track Order: order number and phone or email field that opens the order status link, plus WhatsApp help.
9. Contact: WhatsApp first, then phone, email, city, and a contact form.

## Best practices for this phase

- Page copy lives in section settings in the JSON template, not in the page body.
- Forms: visible labels, required fields marked, server errors shown next to fields, success message announced, spam protection left to Shopify.
- Do not collect file uploads through the contact form (not supported); ask applicants to send portfolios by email or WhatsApp.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Each form submission arrives in the store's contact inbox with the right subject.
- [ ] Each page: every section editable and pre-filled.
- [ ] Lab page works with zero, one and several reports.
- [ ] Screenshots at three widths.

## Out of scope

Creating the page records in admin (P12).
