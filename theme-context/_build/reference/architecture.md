# Architecture decisions and the editing rule

Reference for every phase that writes theme code.

---

## Architecture decisions

1. **Completely new storefront, reused engine.** Every part a shopper sees is rebuilt from scratch as `xo-` files: header, announcement bar, footer, hero, all homepage sections, the product page layout, product cards, collection, cart drawer, search, blog, article, 404, password and contact. What is kept is the part nobody sees: Horizon's cart, product-form, variant, media-gallery, predictive-search, dialog and section-rendering modules. The new markup uses those custom elements (`product-form-component`, `variant-picker`, `cart-drawer-component`, `cart-items-component`, `predictive-search-component`, `media-gallery`) and honours their `ref` contracts. Rewriting that logic would add weeks and risk cart bugs with no visible gain.
2. **The theme stops being Horizon.** `theme_info` is renamed to "Xomoashro" version 1.0.0. It will no longer take Horizon updates; that is the accepted cost of "completely new".
3. **New design layer.** `assets/xo-base.css` replaces Horizon's global typography, buttons, forms and focus styles and is loaded after `base.css`. Each `xo-` section and block carries its own styles in `{% stylesheet %}`. The palette goes into Horizon's `color_palette` setting and button settings so the Theme Editor still controls it; extra tokens (amber-deep, success, line, dark-section colours) live in `snippets/xo-tokens.liquid`. New sections expose only the settings that are safe to change: copy, images, links, and a light/dark/amber tone.
3a. **Stock sections are retired, with your approval.** Templates stop referencing Horizon's stock sections. At the end of the build a single commit deletes the unused ones (quick order list, product hotspots, layered slideshow, marquee, collection links, jumbo text, comparison slider, volume pricing, local pickup and their JS), after you approve the exact file list. Until then nothing is deleted.
4. **Facts come from data, never from section text.** Guarantee days, WhatsApp number, support email and free-shipping threshold are read from shop metafields through one snippet, `snippets/xo-shop-facts.liquid`. Product facts (fulvic %, altitude, batch, supply days) come from product metafields. A section with a missing fact hides that line instead of printing a blank.
5. **Store data is created by script, not by hand.** Metafield and metaobject definitions, the product, pages, blog articles, menus and redirects are created with Admin GraphQL through the Shopify CLI, from files in `theme-context/_build/`. Each script is run only after you approve it, because it writes to the live store.
6. **Content images go to Shopify Files**, referenced as `shopify://shop_images/<name>` in templates. `assets/` holds only icons and UI SVGs.
7. **Git:** work on a `build/` branch per phase, one commit per section, `theme-context/` committed so the content map travels with the code.

---

## Editing rule: everything editable, everything pre-filled

This is a hard requirement for every phase.

1. **Every section on every page is editable in the Shopify Theme Editor.** Headings, body text, button labels and links, images, icons, tone, and the order and number of repeated items (as blocks) are all settings. No visible copy is hard-coded in Liquid.
2. **Every page is built from sections.** Home, product, collection, cart, blog, article, search, 404, password and each custom page (about, our source, how to use, lab reports, wholesale, ambassador, affiliate, track order, contact) is a JSON template made of `xo-` sections. Page copy lives in section settings, not in the page body, so it is edited in the same place as the design.
3. **Every section ships with real default content.** Schema defaults and presets carry the corrected copy from `theme-context/wordpress-site/`, and each `templates/*.json` is pre-populated, so the store looks complete on first preview and a section added from the editor arrives already written.
4. **Where the old site has no content,** the default is conservative draft copy marked `{{TODO: confirm}}` and listed in the phase report. Lorem ipsum is never used.
5. **Header, announcement bar, footer and cart drawer** are editable through their section groups. Navigation menus are edited in Shopify admin under Navigation.
6. **Facts shared across pages** (guarantee days, WhatsApp number, support email, free-shipping threshold) are edited once, in shop metafields, and every section picks them up.
7. **Product facts** (size, supply days, batch, lab values, how to use, safety) are edited on the product in admin through metafields; blog posts and policies are edited in their own admin screens.
8. **Fixed interface text** (Add to cart, Sold out, form errors) lives in `locales/en.default.json` and is editable under Edit default theme content.

Check at the end of each phase: open every new section in the editor, change one text and one image, confirm the change shows, and confirm that adding the section fresh from "Add section" arrives with its default content.
