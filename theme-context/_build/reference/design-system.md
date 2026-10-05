# Design system and competitor-driven changes

Reference for every phase that produces UI. Full competitor notes are in `../competitor-notes.md`.

---

## Design system: "Mountain Apothecary", as built in P02

Decided with the owner on 2026-10-06: the logo stays orange, the accent follows the logo, and the typeface is Manrope throughout. The earlier amber accent and the Fraunces and Inter pairing are replaced.

| Token | Value | Use | Contrast check |
|---|---|---|---|
| ink | `#0E0D0B` | Text, secondary button outline, dark sections | 17.25:1 on bone |
| bone | `#F5F1EA` | Page background | |
| accent | `#FF6B31` (brand orange, same as the logo) | Primary button fill, rules, icons on dark | Ink text on accent 6.84:1 (pass). White text on accent 2.84:1 (fail), so buttons use ink text |
| accent-deep | `#C2410C` | Links, eyebrows and small accents on light backgrounds | 4.60:1 on bone, 4.92:1 on card colour |
| muted | `#6B655C` | Secondary text, field borders | 5.12:1 on bone, 5.48:1 on card colour |
| card (surface) | `#FBF9F5` | Cards and fields on the page background | Ink on card 18.47:1 |
| success | `#2F6B3E` | In-stock, verified, savings | 5.66:1 on bone |
| error | `#A3211A` on light, `#FFA39A` on dark | Form errors | 6.69:1 on bone, 10.14:1 on ink |
| line | ink at 12% | Hairlines, card borders | Decorative |

- **Type:** Manrope for everything, chosen through Horizon's `font_picker` settings (headings 600, body 400, labels 600 and 700). Manrope has no italic, so a highlighted word inside a heading (`<em>`) is shown in the accent colour, not in italics.
- **Scale:** fluid with `clamp()`: H1 36px at 360px wide to 66px at 1280px (72px maximum), H2 28 to 46px, H3 22 to 31px, body 16px. Spacing in 4 and 8px steps. 14px card radius, pill buttons, controls at least 48px tall.
- **Premium without photography:** generous whitespace, large tightly tracked headings, hairline rules, the accent used sparingly, one dark ink section per page for rhythm, numerals set large for the proof points (16,000 ft, 85+ minerals).
- **Motion:** content fades and rises as it scrolls into view, done with a CSS scroll-driven animation and no script. It is off for reduced-motion visitors, in the Theme Editor, and in browsers that do not support it (content is simply visible).
- **Four section tones**, chosen per section with one setting: Bone (page colour, default), Surface (card colour), Ink (dark sections, footer), Accent (announcement bar, one call-to-action band). Horizon 4.2 has a single colour palette, not colour schemes, so the tones are classes in `assets/xo-base.css`.
- **Where it lives:** tokens in `snippets/xo-tokens.liquid`, components in `assets/xo-base.css`, live reference at `/pages/contact?view=styleguide` on the preview.
- **RTL:** logical properties only (`margin-inline`, `inset-inline`), no left/right, so the existing `ur.json` locale can be switched on later.

---

## What the competitor review changes

Full notes: `theme-context/_build/competitor-notes.md`. Nine sites were reviewed at mobile width. The closest to our target is kashmiril.com, which is built on Horizon like ours and uses a cream background, serif headings and card-based long-form product sections. That confirms the direction above.

**Sections added to the plan:**

| New section | What it is | Used on |
|---|---|---|
| `xo-problem` | One large statement that most shilajit on the market is fake or diluted (from our own About copy), then our answer | Homepage, after the trust strip |
| `xo-stats-band` | Ink band with three or four large accent-coloured numerals (16,000 ft, 85+ minerals, jar size); confirmed numbers only | Homepage, product page |
| `xo-spec-grid` | Two-column specification cards (net weight, form, origin, purity, lab testing, packaging, shelf life), filled from metafields, each hidden when empty | Product page |
| `xo-precautions` | Clearly labelled precautions block: not a medicine, pregnancy, medication, consult a doctor | Product page, end of health articles |
| `xo-pdp-anchor-nav` | Sticky chip row that jumps to Benefits, How to use, Lab, Reviews, FAQ | Product page |

**Changes to planned sections:**

- **Hero:** eyebrow pill above the headline; proof chips only for confirmed facts.
- **Bundles and variant cards:** each card shows size, days of supply, per-gram price, a "best for" line, and a badge on the recommended size.
- **Buy box:**
  - a one-line honest note ("New to shilajit? Start with the smallest jar");
  - price inside the Add to cart button;
  - a delivery-time line taken from the shipping setting;
  - three reassurance rows;
  - one testimonial line under the button;
  - "Order on WhatsApp" as a secondary outline button.
- **Section headings:** small-caps eyebrow, heading, short accent rule, used everywhere through `xo-section-heading`.
- **FAQ:** practical questions added (how long a jar lasts, how to get the resin out, daily use, with medication), marked for your confirmation.
- **Source story:** first-person founder voice with a signed line and two region cards (Chitral, Gilgit-Baltistan).

**Deliberately not done:**

- no instant entry popup, countdown timer or permanent sale banner (the promotional popup in phase P13 is delayed, capped and off by default);
- no mobile bottom tab bar (it collides with the sticky add-to-cart bar);
- no disease or organ claims, and no before/after images;
- no emoji or 3D icons;
- no borrowed media logos;
- no long keyword paragraphs on the homepage.

**Market expectation in Pakistan.** Both local competitors offer WhatsApp ordering, PKR prices, a 30-day guarantee, named lab certificates and a delivery estimate. Without a lab report (decision B3) and a confirmed guarantee (B4), Xomoashro will look weaker than them on proof, whatever the design.
