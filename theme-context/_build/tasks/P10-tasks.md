# P10 tasks

Decisions B3, B4 (phone) and B6 are open; the phase runs on their defaults (lab table in its empty state, no phone shown, affiliate page as an application form). The owner did not answer the two permission questions, so no store writes were made: no pages were created and no test messages were sent. Every page was previewed through the existing Contact page with `?view=`.

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Shared sections: page heading, text, picture with text, numbered steps | `sections/xo-page-hero.liquid`, `xo-rich-text.liquid`, `xo-media-text.liquid`, `xo-steps.liquid` | Each editable and pre-filled; render at 3 widths | done |
| 2 | Forms: one field helper and the application form section; shared form styles | `snippets/xo-form-field.liquid`, `sections/xo-lead-form.liquid`, `assets/xo-base.css` | Visible labels, required marks, form name line, browser blocks empty sends | done |
| 3 | About | `templates/page.about.json` | Story, mission, benefits, why us, reviews, partner links | done |
| 4 | Our Source | `templates/page.our-source.json` | Story, regions, purity checks, lab proof, comparison | done |
| 5 | How to Use | `templates/page.how-to-use.json` | Steps, tips, product questions, precautions | done |
| 6 | Lab Reports with batch search and an empty state | `sections/xo-lab-reports.liquid`, `snippets/xo-lab-report-row.liquid`, `assets/xo-lab-search.js`, `templates/page.lab-reports.json` | 0 reports: friendly message; 1 report: no search box; several: search works | done (1 and several by temporary TEST rows, removed) |
| 7 | Wholesale | `templates/page.wholesale.json` | Steps and wholesale application | done |
| 8 | Ambassador and Affiliate | `templates/page.ambassador.json`, `page.affiliate.json` | Steps, perks, applications; spelled Ambassador | done |
| 9 | Track Order | `sections/xo-track-order.liquid`, `templates/page.track-order.json` | Sign-in link to orders, order enquiry form, WhatsApp | done |
| 10 | Contact | `sections/xo-contact.liquid`, `templates/page.contact.json` | WhatsApp first, email, location, contact form, questions | done |
| 11 | Page records for the import phase | `_build/pages/*.json` | Title, address, template, search title (60 characters or less) and description | done |
| 12 | Form messages reach the store inbox | none | One test message per form | not run (no permission to send) |
