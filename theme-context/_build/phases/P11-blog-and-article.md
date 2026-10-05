# P11 — Journal: blog and article

Group: Storefront. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A readable journal: listing page and article template with table of contents, author box, in-article product call-to-action and structured data.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation.
- **Unblocks:** [P20](P20-technical-seo.md) Technical SEO, [P21](P21-speed-optimization.md) Speed optimization, [P22](P22-accessibility.md) Accessibility, [P23](P23-responsiveness.md) Responsiveness.

## Decisions needed from the owner

None. This phase can run without owner input.

## Read first

- ../wordpress-site/pages/blogs.md and post--*.md
- ../competitor-notes.md (Other pages: Blog)

## Shopify toolkit and tools

- `shopify-liquid`: search `article object`, `blog object`, `paginate`, `comment form`; validate.

## Files

- Create `sections/xo-main-blog.liquid`, `sections/xo-main-article.liquid`
- Create blocks: `xo-article-toc`, `xo-author-box`, `xo-article-product-cta`, `xo-article-share`
- Create `assets/xo-article-toc.js`, `snippets/xo-article-jsonld.liquid`
- Modify `templates/blog.json`, `templates/article.json`

## Task outline

Expand these into `tasks/P11-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Blog listing: featured latest post, grid of cards (image, tag, title, date, reading time), tag filter links, pagination.
2. Article: title, date, reading time, featured image, body at a 68-character measure with styled headings, lists, quotes, tables and images.
3. Table of contents built from the article's H2 headings, collapsed on mobile.
4. Product call-to-action block inserted after a chosen paragraph number, and again at the end.
5. Author box, share links, related posts by tag, precautions block at the end of health articles (by tag).
6. Article structured data and breadcrumb.
7. Comments off by default (setting).

## Best practices for this phase

- Body images are responsive and lazy; wide tables scroll inside their own container.
- One H1 (the title); the table of contents never changes heading levels.
- Health content keeps "consult your doctor" wording; no cure claims.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] A long post (2,000 words) reads well at 360px.
- [ ] TOC links jump to the right heading and are keyboard reachable.
- [ ] Rich Results Test passes for Article.
- [ ] All block text editable.

## Out of scope

Importing the ten posts (P12).
