# P11 tasks

The blog is called "Blog" (owner's choice on 2026-10-20; the plan called it "Journal"). Shopify always puts blogs under `/blogs/<name>`, so it lives at `/blogs/guides`, and `/blog` redirects there. Internal file and setting names still say "journal".

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Blog listing: heading, topic links, latest post featured, grid of cards, pagination, empty state | `sections/xo-main-blog.liquid`, `snippets/xo-article-card.liquid`, `templates/blog.json` | Empty and one-post states at 3 widths; topic filter returns 200 | done |
| 2 | Article page: breadcrumb, title, date, reading time, main image, body at a readable width with styled headings, lists, quotes, tables and images | `sections/xo-main-article.liquid`, `snippets/xo-reading-time.liquid`, `templates/article.json` | 2,000-word post reads well at 360px; one H1; no sideways scroll | done |
| 3 | Contents list from the H2 headings, folded on phones | `snippets/xo-article-headings.liquid`, `blocks/xo-article-toc.liquid`, `assets/xo-article-toc.js` | Links jump to the right heading below the sticky header; reachable and usable by keyboard | done |
| 4 | Shop box after a chosen paragraph and at the end | `blocks/xo-article-product-cta.liquid`, `snippets/xo-article-cta.liquid` | Box after paragraph 4 and at the end | done (fixed: see report, section 4) |
| 5 | Author box, share links, related posts by topic, precautions box | `blocks/xo-author-box.liquid`, `blocks/xo-article-share.liquid`, section | Each shows; related posts hidden while there is only one post | done |
| 6 | Article structured data and breadcrumb | `snippets/xo-article-jsonld.liquid` | Google Rich Results Test: Article and Breadcrumbs valid | done |
| 7 | Comments off by default (setting) | section | Setting off; needs comments switched on for the blog as well | done |
| 8 | Blog link in the header and footer (owner request) | `sections/footer-group.json`, store menu | Header and footer show "Blog" and open `/blogs/guides` | done |
| 9 | Header layout when the cart drawer narrows the page | `sections/xo-header.liquid` | Logo full size, menu on one row, or the compact layout when there is no room | done |
| 10 | Store setup: rename the empty blog, publish the first post, menu link, `/blog` redirect | `store-setup/blog-update*.json`, `article-create.graphql`, `articles/`, `main-menu-variables-p11.json`, `url-redirect-create.graphql` | All four ran without errors; results saved next to the inputs | done (owner approved) |
