# Competitor review — what to take, what to avoid

Reviewed 2026-10-06 with Playwright at mobile width (390px), homepage and one product page per site. Screenshots are in `theme-context/competitors/` (`_plugin/` for the live captures, `_sheets/` for full-page flows, `<site>/data.json` for headings, navigation and detected apps).

Rule for everything below: patterns are adapted, never copied. No competitor copy, images or layouts are reused, and every pattern is drawn in our own palette (ink `#0E0D0B`, bone `#F5F1EA`, amber `#B8742A`) and type (Fraunces, Inter).

One gap: Cymbiotika's page body did not render below the first screen in capture, so its notes rest on the first screen and the page's heading structure.

## 1. Who is worth learning from

| Site | Theme | Look | Verdict |
|---|---|---|---|
| kashmiril.com | Horizon (same base as ours) | Cream background, serif headings, terracotta accents, card-based long-form product page | Closest to our target. Proves this look is achievable on our base |
| cymbiotika.com | Custom | Light grotesque type at large sizes, deep green buttons, lots of white space | Benchmark for restraint and hierarchy |
| pureindianfoods.com | Woodstock | Cream, serif headings, family-business tone | Benchmark for honesty and practical content |
| lotusbloomingherbs.com | Symmetry | Tan and cream, serif headings, founder story | Good founder narrative and safety accordions |
| penguinshilajit.com | Shrine | Black and white, system font, text-heavy | Direct Pakistani competitor. Best set of conversion sections, weakest visual polish |
| chitralhouse.com | Ella | Loud: sale countdown, banners, many colours | Direct Pakistani competitor. Strong buy-box mechanics, a look to avoid |
| upakarma.com | Eurus | Brown brand colour, offer-driven | A few useful buy-box details |
| shop.purehimalayanshilajit.com | Dawn | Plain | One idea: origin regions |
| shilajitstore.life | Dawn | Bare default theme | Nothing to take. Shows what an unfinished store looks like |

What the two Pakistani competitors both offer, and so what local shoppers will expect: WhatsApp ordering, prices in PKR, a 30-day guarantee, named lab certificates (Eurofins, PCSIR), a delivery date estimate and review counts in the hundreds. Chitral House sells 10g at Rs.1,400 and 20g at Rs.2,400; Penguin's Pakistan range starts at Rs.2,700. These are market reference points for your pricing decision, nothing more.

## 2. Homepage, section by section

| Our section | Pattern seen | Where | How we adapt it |
|---|---|---|---|
| Announcement bar | One short line, rotating; Cymbiotika adds a trust ticker directly under the hero | Kashmiril, Cymbiotika | Amber bar with three rotating lines. Trust ticker becomes our `xo-trust-strip` under the hero |
| Header | Logo centred or left, three icons, menu in a drawer on mobile; Cymbiotika keeps a "Shop All" button in the header | All | Logo left, search, cart, and a persistent small "Shop" button on mobile |
| `xo-hero-proof` | Headline as a proof sentence: altitude, lab, fulvic percentage in one line | Penguin | Keep our real headline; put the proof in chips below it, only for confirmed facts |
| `xo-hero-proof` | Small pill label above a large light-weight headline | Cymbiotika | Eyebrow pill "Himalayan Aftabi Shilajit · Pakistan" above the Fraunces headline |
| `xo-hero-proof` | Product macro as the hero image with text left-aligned over it and two buttons | Lotus, Upakarma (jar in hand) | Layout prepared for a jar-in-hand photo; until the shoot, the cut-out jar on a bone background with a soft amber glow |
| New: `xo-problem` | A short "problem" statement before the product: most supplements do not deliver | Cymbiotika | Our own source says it: "most Shilajit in the market was fake or diluted". One large sentence, one line of support, then the answer |
| `xo-course-bundles` | Size card with a "Popular" badge, servings count and a "best for" line | Kashmiril | Each card: size, days of supply, price, per-gram price, one "best for" line, badge on the recommended one |
| `xo-course-bundles` | Sizes named by servings, not grams | Penguin | Show both: "30g · about N days" (N from the supply-days metafield) |
| `xo-benefits-grid` | 2×2 chips with a line icon and four to five words each | Chitral House | Six chips from our "About Our Product" copy, conservative wording, bone cards with ink line icons |
| New: `xo-stats-band` | Dark band with three or four large numerals and small caps labels | Kashmiril, Cymbiotika ("Our numbers don't lie") | Ink band, Fraunces numerals in amber: 16,000 ft, 85+ minerals, jar size. Only confirmed numbers |
| `xo-why` | Numbered cards, each with a heading, two lines and three bullets | Kashmiril | Six cards from "Why Xomoashro is Pakistan's Trusted Shilajit Choice" |
| `xo-results-timeline` | Week 1 / 2 / 3 / 4 card, plus a "what to expect" list that tells people to stay patient | Penguin | Three steps on a vertical line. Wording stays "many people report", never a promise |
| `xo-lab-proof` | Certificate image with the key values written beside it; links to the report for each size | Penguin, Pure Indian Foods | Report thumbnail that opens full size, four values, batch number, link to the lab page |
| `xo-source-story` | Founder's first-person story with a real travel photo and a signed quote | Lotus, Pure Indian Foods | "Our Story" copy from the old About page, a signed line, room for a real photo |
| `xo-source-story` | Region cards showing where the resin comes from | Pure Himalayan Shilajit | Two small cards: Chitral, Gilgit-Baltistan |
| `xo-purity-test` | Four home tests in a 2×2 numbered grid: dissolves, softens when warm and hardens when cold, does not burn, colour and texture | Kashmiril, Penguin | Same four tests, our wording, numbered amber circles |
| `xo-comparison-table` | Two columns, dark label column, tick and cross | Penguin | Bone table, ink label column, amber ticks. Only rows we can back up |
| `xo-reviews-wall` | Review cards over a product photo; rating summary with bars; store replies shown | Penguin, Kashmiril, Chitral House | Judge.me block when reviews exist; until then our three real testimonials as cards |
| `xo-how-to-use` | Three or four numbered steps with one photo each | Penguin, Kashmiril | Three steps with numbered circles, photo slots filled after the shoot |
| `xo-faq` | Practical questions people actually ask: how long a jar lasts, how to get sticky resin out, can I take it daily, with medication, in summer | Pure Indian Foods, Penguin | Our five corrected questions plus practical ones, marked for your confirmation |
| `xo-featured-journal` | Three cards, image, title, date | Kashmiril | Same, with serif titles |
| Footer | Contact block with address and two phones, newsletter, payment and COD marks | Chitral House | Ink footer, amber links, contact from shop metafields |

## 3. Product page, top to bottom

| Element | Pattern seen | Where | How we adapt it |
|---|---|---|---|
| Gallery | Award or purity seal placed on the first image | Cymbiotika, Pure Indian Foods | Seal slot, shown only when a real certificate exists |
| Gallery | Thumbnails mix product, benefits graphic and how-to-use graphic | Penguin | Image 2 and 3 are designed info cards in our palette |
| Above the title | Two small pills: guarantee and lab tested | Chitral House | Pills read the guarantee metafield and lab data, hidden when empty |
| Title area | Stars with "Trusted by N people" | Penguin | Judge.me rating; no number until it is real |
| Title area | Three circular line-icon badges (wild crafted, packed in glass, lab tested) | Pure Indian Foods | Three ink line badges: resin only, glass jar, lab tested (last one conditional) |
| Price | Price, compare-at, percentage off | Upakarma, Chitral House | Price and per-gram line. Compare-at only if real |
| Variant picker | Boxes or pills, not a dropdown | All premium sites | Cards with size, days of supply, saving |
| Guidance | A plain note: "If you are new to shilajit, buy the smallest jar first" | Pure Indian Foods | A one-line honest note under the size cards. Builds more trust than any badge |
| Buy box | Green "Order on WhatsApp" button next to Add to cart | Chitral House | Kept, but as an ink-outline secondary button with the WhatsApp icon, so amber stays the single primary action |
| Buy box | Price shown inside the Add to cart button | Upakarma | "Add to cart · Rs X" |
| Buy box | Delivery estimate with dates | Penguin, Chitral House | "Delivered in N–M days" from the shipping setting; no fake dates |
| Buy box | Three reassurance rows with icons | Kashmiril | Delivery, cash on delivery, guarantee |
| Buy box | One short review quote directly under the button | Penguin | One testimonial line, rotating |
| Buy box | Add-on with its own quantity (measuring spoon) | Pure Indian Foods | Upsell slot, used only if you sell an accessory |
| Sticky bar | Bottom bar with name, price, button; Cymbiotika pins it to the top with a variant selector | Penguin, Lotus, Upakarma, Cymbiotika | Bottom bar on mobile with price and button, sitting above the WhatsApp button |
| Accordions | Ingredients, Lab test results, Usage, Safety and purity, Shipping, Refund, Country of origin | Pure Indian Foods, Lotus | Our six accordions, plus Country of origin inside Sourcing |
| New: `xo-spec-grid` | Specification cards in two columns: net weight, form, origin, key compounds, purity, lab testing, packaging, shelf life, what is included | Kashmiril | Same grid, filled from product metafields, each card hidden when its value is empty |
| Long-form sections | Small caps eyebrow, serif heading, short rule, then cards | Kashmiril | This becomes our standard section heading (`xo-section-heading`) |
| New: `xo-precautions` | A clearly labelled precautions block: not a medicine, consult a doctor, pregnancy, medication | Pure Indian Foods | Used on the product page and at the end of health articles |
| Anchor navigation | Tabs that jump to Benefits, Testing, How to use, Ingredients, Reviews | Cymbiotika | Sticky chip row under the header on the product page |
| Cross-sell | "People also bought" grid | Kashmiril | Horizon recommendations, restyled. Hidden while there is one product |

## 4. Other pages

- **Lab reports.** Penguin and Chitral House both give lab reports a top-level menu item, and Chitral House adds a Certificates page. Ours: one page, a table of batches, each row opening its report.
- **About / source.** Lotus and Pure Indian Foods lead with a person and a journey, not a mission statement. Ours: `page.about` opens with the "Our Story" copy and a signed line.
- **Collection.** Cymbiotika's card shows a one-line benefit under the product name, then stars and price. Ours: same, plus per-gram price.
- **Blog.** Kashmiril labels it "Journal" and shows it on the homepage. Penguin cites published studies with links in a "backed by studies" block; we can do the same inside articles where a real citation exists.
- **Track order and contact.** Kashmiril puts "Track Your Order" in the main menu. Ours: in the footer and the mobile drawer.

## 5. Look and feel to adopt

- **Type:** serif display headings with a clean sans for body, as on Kashmiril, Pure Indian Foods and Lotus. This confirms Fraunces with Inter.
- **Background:** warm off-white rather than pure white, with one dark band per page for rhythm.
- **Buttons:** one solid colour for the primary action everywhere. Cymbiotika uses deep green, Upakarma brown; ours is amber with ink text.
- **Cards:** thin border, soft radius, generous padding, no heavy shadows.
- **Spacing:** large gaps between sections and short paragraphs. Penguin's long centred text blocks are the clearest example of what hurts readability on mobile.
- **Icons:** thin line icons in one colour. No emoji, no 3D renders.

## 6. What to avoid

- **Instant entry popups:** Penguin and Cymbiotika both cover the page with a discount popup seconds after load. Ours (phase P13): a promotional popup is included at the owner's request, but it waits for a delay or scroll, never shows before the cookie choice is made, is capped per visitor, and stays off cart and policy pages.
- **Sale clutter:** countdown timers, permanent "sale" banners and inflated compare-at prices (Chitral House, Upakarma).
- **Mobile bottom tab bar:** Chitral House's bar would collide with our sticky add-to-cart bar and the WhatsApp button.
- **Medical claims:** disease and organ claims such as "male infertility", "heart health" and "bones", and before/after imagery (Chitral House). These carry real risk for ad accounts and for honesty.
- **Stock athlete and model photos:** used heavily by Upakarma.
- **Unprovable numbers:** "#1" claims and customer counts we cannot evidence.
- **Borrowed media logos:** Healthline or Mayo Clinic logos that imply endorsement (Penguin).
- **SEO text walls:** long centred keyword paragraphs on the homepage.
- **Buy-one-get-two offers:** these cheapen a premium product.
