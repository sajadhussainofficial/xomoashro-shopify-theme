# P01 report — Store setup and data model

Date: 2026-10-06. Branch: `phase/P01-store-setup-and-data-model`.

## 1. Result

The phase goal is met: the store now has the data fields the theme reads, the lab-report content type, four saved store facts, and an unpublished working copy of the theme.

## 2. Files created and changed

| File | What it is |
|---|---|
| `store-setup/metafield-definitions.json` | The 19 field definitions |
| `store-setup/lab-report-definition.json` | The lab-report content type (9 fields) |
| `store-setup/shop-metafield-values.json` | Store facts to save; edit and re-run to change them |
| `store-setup/*.graphql` | The five Admin API operations (create field, create type, save facts, shop ID, read-back) |
| `store-setup/run_setup.py` | Runs the operations; safe to run again |
| `store-setup/read-back-result.json` | What the store reported after the run |
| `store-setup/settings-checklist.md` | 11 admin settings for the owner |
| `xomoashro-them/snippets/xo-shop-facts.liquid` | Fix: no longer outputs a line break before its value |
| `tasks/P01-tasks.md`, `status.md`, `decisions.md`, `implementation-plan.md` | Tracking and runner updates |

## 3. What was written to the store

| What | Detail |
|---|---|
| Product fields (9) | `custom.fulvic_percent`, `altitude_ft`, `origin_region`, `batch_number`, `lab_name`, `lab_test_date`, `lab_report`, `how_to_use`, `safety` |
| Size (variant) fields (4) | `custom.net_weight_g`, `supply_days`, `best_for`, `badge` |
| Store fields (6) | `custom.whatsapp_number`, `support_email`, `free_shipping_threshold`, `guarantee_days`, `delivery_days_min`, `delivery_days_max` |
| Content type | `lab_report`: batch, test date, lab, fulvic %, lead, arsenic, mercury, cadmium (ppm), report file; publishable |
| Store facts saved | Support email `ask@xomoashro.com`; WhatsApp `+92 306 8886317`; guarantee `7` days; delivery up to `5` days |
| Theme | "Xomoashro (working copy)", ID 158632640684, unpublished |

Changed from the phase file: weight, days of supply, "best for" and badge are on each size instead of on the product, because they differ per size.

## 4. Acceptance checks

| Check | Result | Evidence |
|---|---|---|
| Definitions exist in the store | Pass | `read-back-result.json`: 9 product, 4 variant and 6 shop definitions, all with storefront access, product ones pinned; `lab_report` with 9 fields. Not viewed in Settings > Custom data (needs your admin login) |
| A saved value appears in the theme | Pass, with store facts | No product exists yet, so the product-field test moves to P12. Store facts are live in the preview: the WhatsApp link `wa.me/923068886317` now appears in the announcement bar, header drawer and footer, and the style guide reads "7 days" for the guarantee |
| The unpublished theme exists and takes pushes | Pass | `shopify theme list`: 158632640684, unpublished; second push succeeded. Its preview page was not opened (storefront password) |
| Every operation valid before running | Pass | All five operations and all 20 definitions validated against the Admin API schema |
| Theme check | Pass | 0 errors, the same 6 stock warnings |

## 5. Decisions recorded

- **B4:** guarantee 7 days; WhatsApp 03068886317. The phone number given, 0308886317, has 10 digits where Pakistani mobile numbers have 11, so no phone number is shown yet.
- **B9:** "5" recorded as delivery in up to 5 working days. Shipping fee, free-delivery amount and return terms still open; the free-delivery message stays hidden.

## 6. Open items

- **Now visible on the store because of the saved facts:** the WhatsApp message in the announcement bar, and WhatsApp links in the mobile menu and footer.
- **Store name** is still "https://xomoashro.com/" (first item of the settings checklist).
- **Settings checklist:** 11 items for the owner; none confirmed yet.
- No `{{TODO}}` markers were placed.

## 7. How to preview

- Local preview: `shopify theme dev`, then `http://127.0.0.1:9292/`.
- Working copy: https://https-xomoashro-com-fcrv98st.myshopify.com?preview_theme_id=158632640684
- Store fields: Shopify admin > Settings > Custom data. Store facts are under Shop.

## 8. Next

- **P06 Cart drawer and cart page** is next in the order. It needs a product in the store to test adding to cart, so it will create one draft test product, with your approval.
- **P07 Homepage** is also unblocked and needs nothing from the store.
