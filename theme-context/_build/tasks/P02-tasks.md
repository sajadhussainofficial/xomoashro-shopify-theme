# P02 tasks

Written at the end of the phase from the work actually done (it should have been created at the start; noted in the report).

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Theme identity, brand settings group, palette, fonts, buttons, fields | `config/settings_schema.json`, `config/settings_data.json`, `locales/en.default.json`, `locales/en.default.schema.json` | Settings validate; fonts load on the preview | done |
| 2 | Design tokens and overlay layering contract | `snippets/xo-tokens.liquid` | Tokens present in page source | done |
| 3 | Base styles: tones, layout, type, buttons, fields, cards, chips, focus, reveal | `assets/xo-base.css` | Rendered at 360, 768, 1280px in four tones; contrast computed | done |
| 4 | Icon set | `assets/xo-icon-*.svg` (22), `snippets/xo-icon.liquid` | All 22 render in the style guide | done |
| 5 | Shared snippets | `snippets/xo-button.liquid`, `xo-section-heading.liquid`, `xo-image.liquid`, `xo-shop-facts.liquid` | Used by the style guide; toolkit validation passes | done |
| 6 | Overlay coordination and section group | `assets/xo-overlays.js`, `sections/overlay-group.json`, `layout/theme.liquid`, `snippets/scripts.liquid` | Page loads with no script error from these files; `--xo-bottom-offset` is `0px` with no bars | done |
| 7 | Style guide | `sections/xo-styleguide.liquid`, `templates/page.styleguide.json` | Visible at `/pages/contact?view=styleguide`; settings change the output | done |
| 8 | Theme Check configuration | `.theme-check.yml` | 0 errors | done |
| 9 | Logo and favicon in theme settings | `config/settings_data.json` | Needs the logo files uploaded to Shopify Files | moved to P03 |
