# Content fixes: corrections to the old copy

Phase P00 output. Every change to the old site's copy is listed here before it is used as default content in a section.

- **Fix:** spelling, grammar or consistency. Applied without asking.
- **CONFIRM:** changes what is claimed or promised. The proposed wording is used as a marked default until the owner confirms; the decision ID is given where one exists.
- **REVIEW:** health content that the owner must read before it is published.

## 1. Applied everywhere

| # | Found | Where | Corrected to | Type |
|---|---|---|---|---|
| 1 | "Xomorashro" | 45 times in 39 files: the WordPress site title, most meta titles, About intro, three meta descriptions | "Xomoashro" | Fix |
| 2 | "Xomashro" | 15 times: all three testimonials (home, about, old homepage) | "Xomoashro" | Fix. Testimonial text is otherwise unchanged |
| 3 | "Xomoahro" | Footer copyright | "Xomoashro" | Fix |
| 4 | "XomoAshro" | One image alt text | "Xomoashro" | Fix |
| 5 | "Himaliyan" | Product name on home, about, old homepage | "Himalayan" | Fix |
| 6 | "Ambassadar", "AMBASSADAR" | 15 times: page title, H1, headings, form, footer link, URL | "Ambassador"; new URL `/pages/ambassador`, old URL redirected | Fix |
| 7 | "SNo fillers, additives, or binders" | Home, About | "No fillers, additives or binders" | Fix |
| 8 | "Email as at ask@xomoashro.com or drop a message on whatsapp" | FAQ | "Email us at {support email} or message us on WhatsApp" (values from shop metafields) | Fix |
| 9 | "explore new opprtunitities" | Ambassador page | "explore new opportunities" | Fix |
| 10 | "Copyright © 2025" | Footer | Current year, generated automatically | Fix |
| 11 | "Salajeet" and "Shilajit" used interchangeably | Home, About | "Shilajit" as the main term; "Salajeet" kept once per page as the local name, since people search for both | CONFIRM |
| 12 | "your trust matters most." (lower-case sentence start), "We Cant Find Page" | Home, 404 | Capitalised and punctuated | Fix |

## 2. Claims and promises

| # | Found | Where | Problem | Proposed | Type |
|---|---|---|---|---|---|
| 13 | "30-Day Money Back" and "7-day money-back" | Hero chips; product block | Two different guarantees on one page | One value from `custom.guarantee_days`; line hidden until set | CONFIRM (B4) |
| 14 | "+9230333444" (footer, twice), "+92-3128000718" (contact), "+923445443333" (FAQ WhatsApp) | Three places | Three numbers; the footer one is too short to be valid | One phone and one WhatsApp number from shop metafields | CONFIRM (B4) |
| 15 | "Trusted by 5,000+ Pakistani customers", "over 5,000+ customers trust Xomoashro" | Home, About | No evidence in the capture; the old store had no working checkout or reviews | Kept only if confirmed; otherwise "Trusted by customers across Pakistan" | CONFIRM (B8) |
| 16 | "Triple Lab Tested" | Product block | No lab report in the capture | Hidden until a report is supplied; then "Lab tested" with the lab's name and a link to the report | CONFIRM (B3) |
| 17 | "65%+ Fulvic Acid" | Product block, homepage meta description | No lab report | Shown only from `custom.fulvic_percent` once a report supports it; removed from the meta description until then | CONFIRM (B3) |
| 18 | "Pakistan's Most Trusted Shilajit Source", "Pakistan's Trusted Shilajit Choice" | Hero eyebrow, section heading | Superlative that cannot be evidenced | Eyebrow: "Himalayan Aftabi Shilajit · Pakistan". Heading: "Why choose Xomoashro" | CONFIRM |
| 19 | "85+ minerals" | Benefit block | Common industry figure; not from our own lab report | Kept as "naturally contains 85+ trace minerals" (general statement about shilajit, not a lab result for this batch) | CONFIRM |
| 20 | "Sourced at 16,000 ft", "16,000+ ft" | Hero, product block | Plausible, unverified | Kept, from `custom.altitude_ft` | CONFIRM |
| 21 | "Fast Delivery" beside "We strive to fulfill all orders within 4-5 business days" | Product icons, FAQ | Contradiction | "Delivered in {min}–{max} working days" from shop metafields; the word "fast" dropped unless delivery is 1–3 days | CONFIRM (B9) |
| 22 | "Get Exclusive Discount" | Newsletter button | Promises a discount that may not exist | "Subscribe" unless a discount is confirmed | CONFIRM (B11) |
| 23 | "Clinical studies show a 20% increase in testosterone levels after 90 days of consistent use" | Benefits page | Specific clinical claim, no citation, about a hormone | Not migrated | Removed |
| 24 | "Guided Support: Clear instructions and expert advice" | Why Xomoashro | "Expert advice" implies medical advice | "Clear instructions and help from our team on WhatsApp" | CONFIRM |
| 25 | Distributor page steps: "Order should be on your referral link", "Get Paid" | Become a Distributor | These describe an affiliate scheme, not wholesale | Wholesale steps: apply, we contact you with pricing, place your first order. Affiliate steps move to the affiliate page | CONFIRM (B6) |
| 26 | Compare-at price ₨36,000 against ₨3,200 (named in the master prompt) | Not in the capture | Cannot be verified from source; a 91% "discount" is not credible | No compare-at price unless the owner gives a real former price | CONFIRM (B1) |

## 3. Benefit copy: conservative wording

The six benefit blocks appear on Home and About. Original text makes direct effect claims; the proposed text keeps the topic and softens the claim.

| Block | Original | Proposed |
|---|---|---|
| Strong Muscles | "Packed with 85+ minerals and fulvic acid that support muscle strength, recovery, and endurance. Perfect for athletes." | "Strength and recovery — Naturally contains 85+ trace minerals and fulvic acid. Traditionally used to support strength, recovery and endurance." |
| Enhance Fitness | "Experience Shilajit's adaptogens for improved endurance, less soreness, and enhanced athletic performance and recovery." | "Active lifestyle — Many people take shilajit as part of a training routine to support stamina and recovery." |
| Boost Immunity | "Shilajit's antioxidants defend cells, reduce inflammation, and support immunity, enhancing overall well-being and vitality." | "Everyday wellness — Contains natural antioxidants. Traditionally used to support general well-being and vitality." |
| Support Aging | "Shilajit's antioxidants combat oxidative stress, promoting skin elasticity, reducing inflammation, and fostering overall well-being for healthy aging." | "Healthy ageing — A long-standing part of Ayurvedic tradition for vitality in later years." |
| Activate & Energize | "Shilajit's fulvic acid enhances cognitive function, optimizing nutrient absorption and cell communication, potentially boosting memory and clarity." | "Natural energy — Fulvic acid is studied for its role in nutrient absorption. Many people take shilajit for steady daily energy." |
| Improves Brain Function | "Rich in fulvic acid and antioxidants that support memory, focus, and cognitive performance." | "Focus and clarity — Traditionally taken to support focus and mental clarity." |

All six: CONFIRM. Titles change from capitals with effect verbs ("BOOST IMMUNITY", "IMPROVES BRAIN FUNCTION") to neutral topics.

## 4. FAQ

| # | Question | Original answer problem | Proposed answer |
|---|---|---|---|
| 1 | "How much time you are going to take to finish my order?" | Awkward wording; "4-5 business days" conflicts with "fast delivery" | Q: "How long does delivery take?" A: "Orders are delivered in {min}–{max} working days across Pakistan." (B9) |
| 2 | "What is Shilajit?" | Fine; "purported health benefits" reads oddly | "Shilajit is a natural mineral resin that forms over centuries in high mountain rock, including the Himalayas. It contains fulvic acid, humic acid and trace minerals, and has been used in traditional medicine for centuries." |
| 3 | "How do I take Shilajit?" | Describes "powder, capsule, and liquid extract"; we sell resin | "Take a pea-sized amount of resin, dissolve it in warm water, milk or tea, and drink it once a day. Start small and keep to the amount on the label." (amount: CONFIRM) |
| 4 | "Are there any side effects of Shilajit?" | Acceptable | Kept, tightened: "Most people tolerate shilajit well at the recommended amount. Some may notice an upset stomach. Speak to your doctor before use if you are pregnant, breastfeeding, taking medication or have a health condition." |
| 5 | "Still have questions?" | Typo; hard-coded contact details | "Email us at {support email} or message us on WhatsApp." |
| 6 | "Can Shilajit help with fatigue and low energy levels?" (Ambassador page) | Answer says "Yes… renowned… may help combat fatigue" | "Many people take shilajit for daily energy. It is a food supplement, not a treatment for tiredness caused by a medical condition." CONFIRM |

Practical questions proposed from the competitor review, all `{{TODO: confirm}}`: how long one jar lasts; how to get sticky resin out of the jar; can I take it every day; can I take it with other supplements or medication; how to store it; how do I know it is pure.

## 5. Policies

| Policy | Found | Proposed | Type |
|---|---|---|---|
| Shipping | "Orders are typically processed within [X] business days" | Real processing and delivery times | CONFIRM (B9) |
| Shipping | "We may offer international shipping" | Removed; Pakistan only, unless the owner ships abroad | CONFIRM |
| Shipping | "Shipping costs and delivery times will be calculated at checkout" | Actual fee and free-delivery threshold | CONFIRM (B9) |
| Returns | "contact our customer service team at [your contact email or form]" | Support email and WhatsApp from shop metafields | Fix |
| Returns | "30-Day Return Policy… Items must be unused… with all tags" | A food supplement cannot be returned once opened. Terms for unopened jars, damaged or wrong items, and the money-back guarantee stated precisely | CONFIRM (B4, B9) |
| Returns | "last updated on 01-01-2024" | Date of approval | Fix |
| Privacy, Terms | Generic text with the old brand spelling | Regenerated from Shopify's policy templates with store details, then reviewed by the owner | CONFIRM |

## 6. Journal posts: health content

All ten posts get the brand-spelling fix, a precautions block at the end, and "consult your doctor" wording where advice is given. Title punctuation is tidied (trailing colons and full stops removed).

| Post | Issue found | Action | Type |
|---|---|---|---|
| `shilajit-during-pregnancy` | Calls shilajit "a compelling remedy for pregnant women combating fatigue" and discusses benefits for the baby's development. Most guidance advises against supplements like this in pregnancy | Rewrite so the answer is clear in the first paragraph: not recommended during pregnancy or breastfeeding unless a doctor advises it. Remove benefit claims for pregnancy. Or unpublish and redirect to the main guide | REVIEW, highest priority |
| `shilajit-benefits-for-men-boost-energy` | Mentions infertility, erectile function, blood pressure | Rephrase as "traditionally used for"; remove condition names from headings | REVIEW |
| `shilajit-benefits-for-male-reproductive-system` | Fertility and erectile claims | Same | REVIEW |
| `exploring-shilajits-impact-on-testosterone` | Hormone claims; refers to studies without citations | Cite a real study with a link or remove the claim | REVIEW |
| `10-empowering-benefits-of-shilajit-for-women` | Anaemia claims; pregnancy mentions | Rephrase; point to a doctor for anaemia | REVIEW |
| `best-shilajit-breakdown-traditional-medicines`, `unlocking-the-potential-of-pure-himalayan-shilajit` | Name diseases (diabetes, Alzheimer's) | Remove disease names or frame as "research is early and not conclusive" | REVIEW |
| `how-to-take-shilajit-dosage-tips` | Gives dosage guidance | Align amounts with the product label; add precautions | CONFIRM |
| `what-is-shilajit-types-and-benefits` | Overlaps the newer main guide | Keep; add a link to `what-is-shilajit` near the top | Fix |
| `what-is-shilajit` | Already balanced ("Treat the benefits as promising, not proven") | Brand fix only; add a featured image | Fix |
| All | Author shown as "wp-support" | Author "Xomoashro" | CONFIRM |

## 7. SEO text

| Found | Proposed | Type |
|---|---|---|
| 30+ meta titles ending "- Xomorashro" | "\| Xomoashro" | Fix |
| 25 URLs without a meta description | Written in P20 | Fix |
| Homepage description "65%+ fulvic acid, boosts energy, immunity & focus" | Remove the percentage and "boosts" until supported: "Pure Himalayan Aftabi Shilajit resin, delivered across Pakistan. Cash on delivery." plus confirmed facts | CONFIRM (B3) |
| Category and tag pages all with the H1 "Blogs" | Journal tag pages get the tag name as heading | Fix |
