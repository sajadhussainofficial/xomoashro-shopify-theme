# P11 report — Blog: listing and article pages

Date: 2026-10-20. Branch: `phase/P11-blog-and-article`.

## 1. Result

The blog has its own page designs:
- **Listing:** the newest post is featured, the rest sit in a grid, with topic links and pages.
- **Article:** a contents list, a shop box inside the article and at the end, an author box, share links, a precautions box, related posts and Google structured data.

At your request it is called **Blog**:
- It is in the header menu (Shop, How to use, Blog, About, Contact) and in the footer's About column.
- Shopify always puts blogs under `/blogs/<name>`, so the address is `/blogs/guides`.
- `xomoashro.com/blog` redirects there, and so does the old `/blogs/news`.

The first post is in the store: "What is shilajit? A clear, honest guide to salajeet" (`/blogs/guides/what-is-shilajit`).
- **Text:** taken from the old site, with one fix: "chitral,Gilgit-Baltistan" became "Chitral and Gilgit-Baltistan".
- **Details:** the original date (19 June 2026), the old Google title and description, and the jar-on-rock photo as its main picture.
- The other nine posts come in P12, after the health-content review (decision B24).

## 2. Store changes (approved by you on 2026-10-20)

| Change | Result | Undo |
|---|---|---|
| Empty "News" blog renamed to "Blog", address `/blogs/guides` | Done; `/blogs/news` redirects | Rename back in Online Store > Blog posts > Manage blogs |
| First post published | Done, `gid://shopify/Article/634335789228` | Delete the post |
| Header menu: "Blog" added after "How to use" | Done; About and Contact dropdowns unchanged | `store-setup/main-menu-before-p11.json` |
| Redirect `/blog` → `/blogs/guides` | Done | Online Store > Navigation > URL redirects |

Inputs and results are saved in `store-setup/` (`blog-update*`, `articles/`, `main-menu-variables-p11.json`, `blog-redirect-*`).

Menus and posts are shared by all themes, so the live site already shows the Blog link. The live site still uses the old blog design until P11 is pushed. Customers cannot see any of it while the store is password protected.

## 3. Header fix

On computers the cart drawer narrows the page. The header kept its desktop menu anyway and squeezed the logo: to 30px wide on a 990px screen, and to nothing once the fifth menu item was added.

The header now picks its layout from its own width:
- **Full menu** when it is at least 960px wide.
- **Compact layout** (menu button, logo, icons) when it is narrower.

| Screen | Cart closed | Cart open |
|---|---|---|
| 990px | Full menu, logo full size | Compact |
| 1280px | Full menu, logo full size | Compact |
| 1440px | Full menu | Compact |
| 1600px | Full menu | Full menu, logo full size |

Phones and tablets are unchanged.

## 4. Problems found and fixed

- **Shop box inside the article never appeared.** For theme blocks, Shopify reports neither the type nor the settings to the section, so the section never found the box's paragraph number.
  - The shop box is now a fixed block of the article.
  - The section reads its output and places the first box after the chosen paragraph and the second at the end.
  - All its settings are still edited in one place in the Theme Editor.
  - Because it is fixed, it can no longer be added twice. To hide it, set the paragraph to 0 and untick "Also show at the end".
- **Word count low by about 3%.** Removing line breaks joined the last word of a paragraph to the next paragraph's first word. Fixed in the structured data and the reading time: the count is now 1,868, the same as the source.

## 5. Acceptance checks

Screenshots are in `reports/P11-screens/`.

| Check | Result | Evidence |
|---|---|---|
| A long post (2,000 words) reads well at 360px | Pass. 1,868 words, 17px text, 35 characters a line on phones and 70 on computers; no sideways scroll at 360, 768 or 1280px; one H1; 9 headings, each with its own link | `article-360.png`, `article-768.png`, `article-1280.png` |
| Contents links jump to the right heading and are keyboard reachable | Pass. Reached with Tab after the breadcrumb; Enter opens the list on phones; Enter on a link lands the heading just below the sticky header (85px from the top on phones, 97px on computers); on phones the list closes after use; the heading in view is marked | test log |
| Rich Results Test passes for Article | Pass. Code test of the article's structured data: 2 valid items, Articles and Breadcrumbs, 0 errors, 0 warnings. The page URL itself cannot be tested while the store is password protected | `rich-results-article.png` |
| Shop box after a chosen paragraph and at the end | Pass after the fix: after paragraph 4 and at the end, at all 3 widths | `article-360.png` |
| Blog listing | Pass. The post shows as the featured card with image, topic, date and reading time; topic filter `/blogs/guides/tagged/himalayan-shilajit` returns 200; empty state checked before the post existed | `blog-360.png`, `blog-1280.png`, `journal-empty-*.png` |
| Blog link in the header and footer | Pass. Header (desktop and phone menu) and footer show "Blog" and open `/blogs/guides`; `/blog` and `/blogs/news` redirect there | `header-1280-five-items.png` |
| Header with the cart drawer open | Pass, see section 3 | `header-1280-cart-open.png`, `header-360.png`, `header-768.png` |
| All block text editable | Pass in code: every label and text is a block or section setting. The Theme Editor click-through needs your login | |
| Toolkit validation and theme check | Pass on all changed files; theme check 0 errors, 18 warnings (unchanged, all in Horizon files) | |

Not tested: related posts. They need two posts with the same topic, which happens in P12.

## 6. Open items

- **Store time zone.** Dates in the structured data come out at −04:00, so the store's time zone is US Eastern. Set it to Pakistan (Asia/Karachi) in Settings > General. The post's date stays 19 June either way.
- **Live site.** It shows the Blog link now but the old blog design until P11 is pushed. On computers the logo is squeezed while the cart is open until then.
- **The other nine posts:** P12, after the health-content review (B24).
- **Comments** stay off. Turning them on needs both the section setting and the blog's comment setting.
- **Store name** still reads "https://xomoashro.com/" in page titles (raised in P09).

## 7. Next

P12 imports the remaining content, including the other blog posts. Redirects from the old WordPress addresses come in P20.
