# P03 tasks

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Header icons, built-in logo and favicon | `assets/xo-icon-menu.svg`, `xo-icon-search.svg`, `xo-icon-bag.svg`, `xo-icon-user.svg`, `xo-icon-chevron-down.svg`, `assets/xo-logo.svg`, `xo-logo-inverse.svg`, `xo-favicon.svg`, `layout/theme.liquid` | Icons render; favicon link present when no favicon is set | done |
| 2 | Navigation link snippet | `snippets/xo-nav-link.liquid` | Current page carries `aria-current="page"` | done |
| 3 | Mobile drawer | `snippets/xo-header-drawer.liquid`, `assets/xo-header.js` | Opens, traps focus, closes on Escape, backdrop and link click; focus returns to the menu button | done |
| 4 | Header section | `sections/xo-header.liquid`, `assets/xo-base.css` (small button), `locales/en.default.json`, `locales/en.default.schema.json` | Toolkit validation and theme check pass; sticky; search opens; cart count updates without reload | done |
| 5 | Use the new header | `sections/header-group.json` | Preview shows the new header on every page | done |
| 6 | Menu definitions for the store | `_build/menus.json` | Main and footer menus listed with future handles | done (creating them in the store is P12) |
| 7 | Visual and keyboard checks | `reports/P03-screens/` | 360, 768, 1280px reviewed; keyboard pass with Playwright | done |
