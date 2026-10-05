# Decisions and open questions

One row per question for the store owner. The runner reads this file before every phase, asks what is still open, and writes the answer here with the date. A phase must never re-ask a question that has an answer.

| ID | Question | Default if unanswered | Used by | Status | Answer | Date |
|---|---|---|---|---|---|---|
| B1 | Product price(s) in PKR, SKU, net weight, real compare-at price if any, and the full product description. | Product is built with marked placeholders and is not published. | P08, P12, P24 | open | | |
| B2 | Which sizes are sold: (a) 30g only, offered as 1, 2 or 3 jar packs; (b) 10g, 20g, 60g; (c) another set. | (a), because 30g is the only size in the old site. | P07, P08, P12 | open | | |
| B3 | Lab report file, lab name, test date, batch number, measured fulvic percentage and heavy-metal values. | All lab claims and lab sections stay hidden. | P07, P08, P10, P24 | open | | |
| B4 | Guarantee length (7 or 30 days), and the one correct phone number and WhatsApp number. | Guarantee line omitted; WhatsApp button and widget hidden. | P01, P04, P05, P07, P08, P10, P14, P24 | open | | |
| B5 | Logo colour: keep orange `#FF6B31`, or render the logo in the new ink and amber palette. | Logo shape kept, rendered in ink with an amber mark. | P02, P03 | answered | Keep the logo in orange `#FF6B31`. | 2026-10-06 |
| B6 | Affiliate programme: which app (Shopify Collabs, UpPromote or other), or drop it. | Affiliate page becomes an application form. | P10 | open | | |
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | None: without this nothing can be previewed or pushed. | P01, P06, P08, P12, P15, P16, P20, P21, P24 | answered | Store `https-xomoashro-com-fcrv98st.myshopify.com`. CLI logged in. Owner runs `shopify theme dev` locally: preview `http://127.0.0.1:9292/`, working theme ID `158613045420`. | 2026-10-06 |
| B8 | Keep the "5,000+ customers" claim? Is "Asad" the person in `Khalid-Kurt.png`? Real social profile URLs? | Claim removed, that testimonial shown without photo, social icons hidden. | P05, P07 | open | | |
| B9 | Shipping facts: delivery time in days, shipping fee, free-delivery threshold, return terms. | Progress bar and delivery estimate hidden; policies keep marked placeholders (blocks launch). | P01, P04, P06, P12, P24 | open | | |
| B10 | New photography (see `reference/photo-shoot-list.md`). | Launch with the cut-out jar on designed backgrounds. | P07 | open | | |
| B11 | Promotional popup: what does it offer (newsletter only, a discount code and its value, or an announcement)? | Newsletter invitation without a discount; popup shipped disabled. | P13 | open | | |
| B12 | Google access: GTM container ID, GA4 measurement ID, and whether the old site's GA4 property should be reused. | None: tracking phases cannot be completed without these. | P16, P17 | open | | |
| B13 | Domain: who controls the DNS for xomoashro.com, and the planned launch date. | None: Search Console, Bing and launch wait for this. | P18, P19, P24 | open | | |
| B14 | Cookie banner: show to every visitor on first visit, or only where the law requires consent? | Show to every visitor once, with Accept, Decline and Preferences. | P15 | open | | |
| B15 | Meta (Facebook) Pixel ID, if Meta ads are used. | Meta tracking not set up. | P16 | open | | |
| B16 | Tracking route: GA4 through Google Tag Manager (recommended since GTM is wanted), or through Shopify's Google and YouTube app. One only. | GA4 through GTM in a custom pixel; Meta through Shopify's Facebook and Instagram app. | P16, P17 | open | | |
| B17 | Commit the raw screenshots (about 240 MB) to git, or ignore them? | Ignore the PNG folders, commit text and data files. | P00 | default taken | Ignore the PNG/JPG screenshot folders; commit text and data files. Owner can reverse this. | 2026-10-06 |
| B18 | Which jar is the current packaging: black lid with copper logo (shown on the old site), gold lid, or the green jar? All three are in the media library. | Black-lid jar, because it is the one on the old live site. | P07, P08, P12 | open | | |
| B19 | With the logo staying orange, which accent colour for buttons and highlights: (a) the brand orange `#FF6B31` with dark text, so logo and buttons match; (b) keep amber `#B8742A` as planned, beside the orange logo. | (a): one accent family. Orange `#FF6B31` for buttons with ink text (6.84:1), deep orange `#C2410C` for links and small accents (4.6:1 on bone). | P02 | answered | (a) Orange accent: `#FF6B31` buttons with ink text, `#C2410C` for links. Confirmed by the owner ("go with your recommendation on all 3 points"). | 2026-10-06 |
| B20 | The starter ships 55 locale files besides English and Urdu. New `xo` strings exist only in English, so Theme Check's translation-matching rule is switched off in `.theme-check.yml`. Delete the unused locale files (keep English and Urdu)? | Files stay and the rule stays off until launch. | P24 | open | | |

## Decisions already made

| Date | Decision |
|---|---|
| 2026-10-06 | `xomoashro-them/` is only a starter; the theme is rebuilt as completely new inside that folder. |
| 2026-10-06 | The old WordPress design is not a target; `wordpress-site/` supplies copy, SEO data and assets only. |
| 2026-10-06 | Every section on every page is editable in the Theme Editor and ships with default content from the WordPress capture. |
| 2026-10-06 | Competitor patterns are adapted in our own colour scheme; nothing is copied. |
| 2026-10-06 | A promotional popup, announcement bar, WhatsApp widget and cookie consent are in scope, each as its own phase. |
| 2026-10-06 | Google Tag Manager, Google Analytics, Search Console, Bing, technical SEO, speed, accessibility and responsiveness each get their own phase. |
| 2026-10-06 | The logo stays orange `#FF6B31`; the accent colour follows it (buttons orange with dark text, links `#C2410C`). The earlier amber accent is dropped. |
| 2026-10-06 | Typeface is Manrope for headings and body (owner's request during P02), replacing Fraunces and Inter. |
| 2026-10-06 | For P02 the owner asked for commit, push, pull request and merge into `main` on completion, without a separate approval stop. |

## New questions

Add any question discovered during a phase here with the next free ID, then move it into the table above.
