# P03 tasks

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Header icons, built-in logo and favicon | `assets/xo-icon-menu.svg`, `xo-icon-search.svg`, `xo-icon-bag.svg`, `xo-icon-user.svg`, `xo-icon-chevron-down.svg`, `assets/xo-logo.svg`, `xo-logo-inverse.svg`, `xo-favicon.svg`, `layout/theme.liquid` | Icons render; favicon link present when no favicon is set | todo |
| 2 | Navigation link snippet | `snippets/xo-nav-link.liquid` | Current page carries `aria-current="page"` | todo |
| 3 | Mobile drawer | `snippets/xo-header-drawer.liquid`, `assets/xo-header.js` | Opens, traps focus, closes on Escape, backdrop and link click; focus returns to the menu button | todo |
| 4 | Header section | `sections/xo-header.liquid`, `assets/xo-base.css` (small button), `locales/en.default.json`, `locales/en.default.schema.json` | Toolkit validation and theme check pass; sticky; search opens; cart count updates without reload | todo |
| 5 | Use the new header | `sections/header-group.json` | Preview shows the new header on every page | todo |
| 6 | Menu definitions for the store | `_build/menus.json` | Main and footer menus listed with future handles | todo |
| 7 | Visual and keyboard checks | `reports/P03-screens/` | 360, 768, 1280px reviewed; keyboard pass with Playwright | todo |
