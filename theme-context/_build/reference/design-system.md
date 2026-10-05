# Design system and competitor-driven changes

Reference for every phase that produces UI. Full competitor notes are in `../competitor-notes.md`.

---

## Design system: "Mountain Apothecary", corrected

| Token | Value | Use | Contrast check |
|---|---|---|---|
| ink | `#0E0D0B` | Text, secondary button outline, dark sections | 17.25:1 on bone |
| bone | `#F5F1EA` | Page background | |
| amber | `#B8742A` | Primary button fill, icons, large display accents | Ink text on amber 5.15:1 (pass). White text on amber 3.77:1 (fail), so buttons use ink text |
| amber-deep | `#9A5E1F` | Text links and small accent text on bone, hover state | White on amber-deep 5.26:1 |
| stone | `#6B655C` | Secondary text | 5.12:1 on bone |
| success | `#2F6B3E` | In-stock, verified, savings | White on success 6.38:1 |
| line | `rgba(14,13,11,.12)` | Hairlines, card borders | |

- **Type:** Fraunces for H1–H3, Inter for body and UI (Inter is already the theme default). Both are requested through Horizon's `font_picker`; if Fraunces is not in Shopify's font library it is self-hosted as two WOFF2 files with `font-display: swap`.
- **Scale:** fluid with `clamp()`, H1 from 36px at 360px wide to 72px at 1280px. 8px spacing scale. 14px card radius, 999px pills. Buttons at least 48px tall.
- **Premium without photography:** generous whitespace, serif display type at large sizes, hairline rules, a subtle paper-grain background on bone, amber used sparingly, one dark ink section per page for rhythm, numerals set large for the proof points (16,000 ft, 85+ minerals). Motion is limited to fade-and-rise on scroll and respects `prefers-reduced-motion`.
- **Three section tones**, chosen per section with one setting: Bone (default), Ink (dark sections, footer), Amber (announcement bar, one CTA band). Horizon 4.2 has a single colour palette, not colour schemes, so the tones are implemented in `xo-tokens`.
- **RTL:** logical properties only (`margin-inline`, `inset-inline`), no left/right, so the existing `ur.json` locale can be switched on later.

---

## What the competitor review changes

Full notes: `theme-context/_build/competitor-notes.md`. Nine sites were reviewed at mobile width. The closest to our target is kashmiril.com, which is built on Horizon like ours and uses a cream background, serif headings and card-based long-form product sections. That confirms the direction above.

**Sections added to the plan:**

| New section | What it is | Used on |
|---|---|---|
| `xo-problem` | One large statement that most shilajit on the market is fake or diluted (from our own About copy), then our answer | Homepage, after the trust strip |
| `xo-stats-band` | Ink band with three or four large amber numerals (16,000 ft, 85+ minerals, jar size); confirmed numbers only | Homepage, product page |
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
- **Section headings:** small-caps eyebrow, serif heading, short amber rule, used everywhere through `xo-section-heading`.
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
