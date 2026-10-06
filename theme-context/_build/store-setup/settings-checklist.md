# Store settings checklist

For the store owner, in Shopify admin. These are settings the theme cannot change. Tick each one when done.

| # | Where in admin | What to set | Why |
|---|---|---|---|
| 1 | Settings > General > Store details | Store name: **Xomoashro** | The browser tab and copyright currently show "https://xomoashro.com/" |
| 2 | Settings > General > Store defaults | Currency: **Pakistani rupee (PKR)**; time zone: **(GMT+05:00) Karachi**; unit system: metric, weight in grams | Prices, order dates and per-gram prices |
| 3 | Settings > Markets | Primary market: **Pakistan** | Prices and checkout in PKR for Pakistani visitors |
| 4 | Settings > Shipping and delivery | A shipping zone for **Pakistan** with your rate (and a free rate above your free-delivery amount, if you offer one) | Checkout cannot complete without a rate. The amount must match the "Free delivery from" store fact |
| 5 | Settings > Payments > Manual payment methods | Add **Cash on Delivery (COD)** | The main way customers pay |
| 6 | Settings > Checkout | Customer contact: phone number or email; make **phone number required** in the address form | Courier delivery and COD confirmation calls need a phone number |
| 7 | Settings > Customer accounts | Choose accounts on or off | The header's account icon only shows when accounts are on |
| 8 | Settings > Notifications | Sender email; check the order confirmation and shipping emails show the name Xomoashro | Customers see these emails |
| 9 | Settings > Policies | Leave until P12, where the rewritten policies are pasted in | Policies need your business facts (decision B9) |
| 10 | Settings > Custom data | After `run_setup.py` has run: open Products, Variants, Shop and Metaobjects to see the new fields | Where the store facts and product facts are edited |
| 11 | Online Store > Preferences | Remove the storefront password only at launch (P24) | Keeps the unfinished store private |

Store facts (Settings > Custom data > Shop, or `shop-metafield-values.json` and `run_setup.py`):

| Fact | Used by | Today |
|---|---|---|
| WhatsApp number | Header drawer, footer, announcement bar, WhatsApp widget, product page | Not set (decision B4) |
| Support email | Footer, FAQ, contact page | ask@xomoashro.com |
| Free delivery from (PKR) | Announcement bar, cart progress bar | Not set (decision B9) |
| Guarantee (days) | Trust strip, product page, policies | Not set (decision B4) |
| Delivery time from / to (days) | Product page, FAQ, announcement | Not set (decision B9) |
