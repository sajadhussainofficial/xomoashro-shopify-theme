# XOMOASHRO Shopify store — implementation plan (runner)

This file is the instruction set for building the store. It does not contain the work itself: each phase has its own file in `phases/`. To build, an agent is told to "run `theme-context/_build/implementation-plan.md`" and then follows section 2.

Project in one paragraph: XOMOASHRO sells Pure Himalayan Aftabi Shilajit resin in Pakistan, cash-on-delivery first, prices in PKR, about 85% of visitors on mobile. The store moves from a broken WordPress site to Shopify. The theme in `xomoashro-them/` is a stock Horizon 4.2.0 starter that is rebuilt as a completely new, premium theme.

---

## 1. Where everything is

| Path | What it is |
|---|---|
| `theme-context/master-prompt.md` | The owner's original specification |
| `theme-context/wordpress-site/` | Source of truth for copy, SEO data and assets from the old site |
| `theme-context/competitors/` | Competitor screenshots and data |
| `theme-context/_build/implementation-plan.md` | This file: how to run the build |
| `theme-context/_build/status.md` | Progress of every phase. Updated at the start and end of each phase |
| `theme-context/_build/decisions.md` | Questions for the owner, their answers, and decisions already made |
| `theme-context/_build/phases/Pxx-*.md` | One file per phase: goal, dependencies, decisions, files, task outline, checks |
| `theme-context/_build/tasks/Pxx-tasks.md` | The detailed task list for a phase, created when the phase starts |
| `theme-context/_build/reports/Pxx-report.md` | The end-of-phase report |
| `theme-context/_build/reference/` | Analysis, architecture, design system, content and redirect map, photo list |
| `theme-context/_build/competitor-notes.md` | What to take from and avoid in the nine competitor sites |
| `xomoashro-them/` | The Shopify theme. The only place theme code is written |

---

## 2. Run procedure

Follow these steps every time this file is run, including in a new session with no memory of earlier work.

1. **Load state.** Read `status.md` and `decisions.md`. Read `reference/architecture.md` and `reference/design-system.md` once per session.
2. **Resume first.** If a phase is `in progress`, continue it from its task file. If a phase is `awaiting merge` or `awaiting approval`, finish that first (section 3, "Finishing a phase"); do not start another phase.
3. **Pick the next phase.** Take the first phase in the order of section 6 that is `not started` and whose "needs finished first" phases are all `done`.
4. **Check its decisions.** Compare the phase's hard and soft decisions with `decisions.md`.
   - No open hard decision: go to step 5.
   - An open hard decision: follow section 5 (ask, and offer the next unblocked phase).
5. **Ask before building.** Ask the owner every open question the phase lists, hard and soft, in one batch of at most four questions at a time, each with the default stated. Write the answers into `decisions.md` with the date. An unanswered soft question takes its default.
6. **Run the phase** as described in sections 3 and 4.
7. **Finish.** After the report, follow "Finishing a phase" in section 3: when every check passes, commit, push, open a pull request and merge it into `main`; otherwise stop and ask. Then tell the owner which phase is next and what it will need from them, and wait for their go before starting it.

The owner may also name a phase directly ("run P13"). Then skip step 3, but still apply steps 4 to 7, and refuse to start if a needed phase is not done, saying which one.

Where to start: **P00**. It needs nothing from the owner. While P00 runs, ask for decision B7 (store domain and CLI login), because every phase after P00 needs the store to be previewed.

---

## 3. How a phase works

Every phase moves through the same seven stages.

| Stage | What happens | Output |
|---|---|---|
| 1. Ready check | Dependencies done, hard decisions answered (section 5) | Status set to `in progress` in `status.md` with the date |
| 2. Questions | Open questions asked and recorded | Updated `decisions.md` |
| 3. Read | The phase file, its "Read first" list, and the files it will touch | Nothing written yet |
| 4. Task list | The task outline is expanded into concrete tasks (section 4) | `tasks/Pxx-tasks.md` |
| 5. Build | Tasks done one at a time with the loop in section 4 | Theme files or build files, one commit per task |
| 6. Verify | Every acceptance check in the phase file is run and evidence collected | Check results |
| 7. Report and merge | Report written; phase committed, pushed, opened as a pull request and merged (see below) | `reports/Pxx-report.md`, merged pull request |

Work happens on a git branch named `phase/Pxx-short-name`, created from `main` at stage 1.

### Finishing a phase

Standing instruction from the owner (2026-10-06): every phase ends with commit, push, pull request and merge into `main`, once the phase is fully satisfactory.

1. **All acceptance checks pass:** set the phase to `done`, commit, push the branch, open a pull request into `main` with the report summary as its description, and merge it with a merge commit (never squash: local history must match). Then update local `main`. Also update the shareable working copy on the store: `shopify theme push --theme 158632640684` ("Xomoashro (working copy)", unpublished).
2. **A check failed, or an important check could not be run:** set the phase to `awaiting approval`, report, and ask the owner before merging.
3. **No write access from the command line:** commit, set the phase to `awaiting merge`, and hand the owner the pull request title and description. The owner pushes, opens and merges, then pulls `main`. (On 2026-10-06 the command-line GitHub account `zeshan-rx` was not a collaborator on the repository; the owner pushes through GitHub Desktop.)
4. **Theme commands read `shopify.theme.toml`** (one in the repository root, one in `xomoashro-them/`). Their `default` environment sets the store, the theme path and `nodelete = true`, so `shopify theme dev` works from either folder. Without that file, a dev server started from the root saw no theme files and deleted the development theme's files (2026-10-06, twice). Do not remove or rename the file; real deletions happen deliberately at launch.
5. **After any merge, pull or branch switch,** check the local preview. If pages return 404 or 502, re-upload the theme to the development theme (`shopify theme push --theme <development theme id>`) or restart `shopify theme dev`.

### Report format

Each `reports/Pxx-report.md` has exactly these parts:

1. **Result:** one sentence on whether the phase goal is met.
2. **Files created and changed.**
3. **Source content used:** which `wordpress-site/` and `reference/` files fed which sections.
4. **Acceptance checks:** each one with pass or fail and its evidence (command output, screenshot path, URL).
5. **Defaults taken:** every soft decision that was not answered and the default used.
6. **Open items:** every `{{TODO: ...}}` placed, and every `CONFIRM` waiting for the owner.
7. **How to preview:** the `shopify theme dev` command, the preview link, and where the new sections appear in the Theme Editor.
8. **Next:** the next unblocked phase and what it needs from the owner.

A check that could not be run is reported as "not run" with the reason. It is never reported as passed.

---

## 4. How tasks are created and implemented

### Creating the task list

At stage 4 the phase's task outline becomes `tasks/Pxx-tasks.md`. Rules:

- **One task is one file, or one unit that only makes sense together** (for example a section with its script). A task that touches more than about three files is split.
- **Each task states:** the files it creates or changes, what "finished" looks like, and the check that proves it.
- **Order:** shared pieces first (snippets, tokens), then the things that use them, then the template that assembles them.
- **Every task that produces a section includes its default content**, taken from the source file named in the phase, corrected per `content-fixes.md`.
- **The list is shown to the owner before building** when the phase has more than ten tasks or changes store data. Otherwise building starts directly.

Task file format:

```markdown
# Pxx tasks

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | ... | `sections/xo-...liquid` | theme check clean; renders at 360/768/1280; editable | todo |
```

Status values: `todo`, `doing`, `done`, `blocked (reason)`.

### The loop for each task

1. **Look up before writing.** Search the Shopify docs through the toolkit for every object, filter, tag or schema setting the task uses (section 8). Do not rely on memory for Shopify APIs.
2. **Read the code it touches.** For anything reusing a Horizon element, read that element's Liquid and JavaScript first and keep its `ref` names and events.
3. **Write** the file, following sections 7 and 9.
4. **Validate.** Run the toolkit's Liquid validation on the new code, then `shopify theme check` in `xomoashro-them/`. Fix until there are zero errors.
5. **Preview.** With `shopify theme dev` running, open the page, and screenshot it with the Playwright plugin at 360, 768 and 1280px. Look at the screenshots.
6. **Editor check.** In the Theme Editor change one text and one image of the new section, and add the section fresh to confirm it arrives with default content.
7. **Commit** with a message naming the phase and task (`P07: add xo-hero-proof section`). Mark the task `done`.

If a task fails its check three times, stop, mark it `blocked` with what was tried, and tell the owner. Do not work around a failing check by weakening it.

---

## 5. Dependencies, blocking, and questions

### Two kinds of dependency

- **Phase dependency:** a phase needs other phases to be `done` first. These are fixed and listed in section 6 and in each phase file.
- **Decision dependency:** a phase needs an answer from the owner.
  - **Hard:** the phase, or the task named in the phase file, cannot be done without it.
  - **Soft:** the phase proceeds on the stated default; the default is reported, and the section or text is built so the real answer can be dropped in later without code changes.

### What to do when the next phase is blocked

1. Say plainly which phase is blocked and by what: the unfinished phase, or the decision ID and its question.
2. Ask the blocking questions now (at most four at a time, each with its default and what it unblocks).
3. Find the **next unblocked phase**: the next phase in the order of section 6 that is `not started`, has all its needed phases `done`, and has no open hard decision.
4. Tell the owner: "Pxx is blocked by ... . The next phase I can run now is Pyy (title). Shall I start it while you get the answers?" Then wait for the answer.
5. If nothing is unblocked, list every open hard decision with what each one unblocks, and stop.
6. When the owner answers later, record it in `decisions.md`, set the blocked phase back to `not started`, and it becomes the next phase again.

### Partly blocked phases

Some phases have one task that waits for a decision while the rest can proceed (for example P12: posts and images can be imported before the product price is known). The phase file says so. Run the unblocked tasks, mark the waiting task `blocked (Bx)`, and report the phase as `in progress`, not done.

### The decision that gates almost everything

Decision **B7** (Shopify store domain and CLI login) is needed to preview anything. Without it, theme files can be written and pass `theme check`, but no acceptance check that needs a browser can be run, so no storefront phase can reach `done`. Ask for B7 first.

### How to ask questions

- Ask only what the current or next phase needs. Do not ask everything at once.
- Each question gives: the ID, the question, the options, the default, and what answering it unblocks.
- Never ask again for something already answered in `decisions.md`.
- A new question found mid-phase goes into `decisions.md` under "New questions" with the next free ID, and is asked at the next stop unless it blocks the current task.
- Anything that changes the meaning of a claim (guarantee, lab values, customer counts, health statements) is always asked, never assumed.

---

## 6. Phases, order and dependencies

Recommended order top to bottom. Each row links to the phase file.

| Order | Phase | Title | Group | Needs finished first | Hard decisions | Soft decisions |
|---|---|---|---|---|---|---|
| 1 | [P00](phases/P00-inventory-and-audit.md) | Inventory and audit | Foundation | - | - | B17 |
| 2 | [P02](phases/P02-design-foundation.md) | Design foundation | Foundation | P00 | - | B5, B19 |
| 3 | [P03](phases/P03-header-and-navigation.md) | Header and navigation | Foundation | P02 | - | B5 |
| 4 | [P04](phases/P04-announcement-bar.md) | Announcement bar | Interactive features | P02 | - | B9, B4 |
| 5 | [P05](phases/P05-footer.md) | Footer | Foundation | P02 | - | B4, B8 |
| 6 | [P01](phases/P01-store-setup-and-data-model.md) | Store setup and data model | Foundation | P00 | B7 | B4, B9 |
| 7 | [P06](phases/P06-cart-drawer-and-cart-page.md) | Cart drawer and cart page | Storefront | P02, P01 | B7 | B9 |
| 8 | [P07](phases/P07-homepage.md) | Homepage | Storefront | P02, P03, P05 | - | B2, B3, B4, B8, B10, B18 |
| 9 | [P08](phases/P08-product-page.md) | Product page | Storefront | P02, P06, P01, P07 | B7 | B1, B2, B3, B4, B18 |
| 10 | [P09](phases/P09-collection-search-and-utility-pages.md) | Collection, search and utility pages | Storefront | P02, P08 | - | - |
| 11 | [P10](phases/P10-content-pages.md) | Content pages | Storefront | P02, P07, P01 | - | B3, B4, B6 |
| 12 | [P11](phases/P11-blog-and-article.md) | Journal: blog and article | Storefront | P02 | - | - |
| 13 | [P12](phases/P12-content-import.md) | Content import | Storefront | P00, P01 | B7, B1, B2 | B9, B18 |
| 14 | [P13](phases/P13-promotional-popup.md) | Promotional popup | Interactive features | P02 | - | B11 |
| 15 | [P14](phases/P14-whatsapp-widget.md) | WhatsApp chat widget | Interactive features | P02, P01 | - | B4 |
| 16 | [P15](phases/P15-cookie-consent.md) | Cookie consent | Interactive features | P02, P05 | - | B14, B7 |
| 17 | [P16](phases/P16-google-tag-manager.md) | Google Tag Manager | Marketing and measurement | P15, P08, P06 | B12, B7 | B16, B15 |
| 18 | [P17](phases/P17-google-analytics-4.md) | Google Analytics 4 | Marketing and measurement | P16 | B12 | B16 |
| 19 | [P20](phases/P20-technical-seo.md) | Technical SEO | Marketing and measurement | P07, P08, P09, P10, P11, P12 | B7 | - |
| 20 | [P21](phases/P21-speed-optimization.md) | Speed optimization | Quality | P07, P08, P09, P10, P11, P13, P14, P15 | B7 | - |
| 21 | [P22](phases/P22-accessibility.md) | Accessibility | Quality | P07, P08, P09, P10, P11, P13, P14, P15 | - | - |
| 22 | [P23](phases/P23-responsiveness.md) | Responsiveness | Quality | P07, P08, P09, P10, P11, P13, P14, P15 | - | - |
| 23 | [P24](phases/P24-launch.md) | Final QA and launch | Launch | P12, P20, P21, P22, P23, P16, P17 | B13, B7, B1, B4, B9 | B3, B20 |
| 24 | [P18](phases/P18-google-search-console.md) | Google Search Console | Marketing and measurement | P20 | B13 | - |
| 25 | [P19](phases/P19-bing-webmaster-tools.md) | Bing Webmaster Tools | Marketing and measurement | P18 | B13 | - |

Notes on the order:

- **Phase numbers are names, not the order.** P01 runs sixth because it needs the store; P18 and P19 run around launch because they need the live domain.
- **P18 straddles launch.** Its "before launch" tasks (DNS verification, baseline export) run before P24; the rest run after the site is live.
- **Phases that can run in any order once P02 is done:** P03, P04, P05, P11, P13. If the recommended one is blocked, these are the usual substitutes.
- **Quality phases are audits, not first looks.** Speed, accessibility and responsiveness are checked in every phase (section 7). P21, P22 and P23 are the full passes over the finished site.
- **The interactive features share one contract.** The popup, WhatsApp widget, cookie banner and sticky add-to-cart bar all follow the overlay layering rules created in P02, so they never overlap.

---

## 7. Rules that apply to every phase

These come from the master prompt and from the owner's later instructions. A phase file never overrides them.

1. **Completely new theme, inside the starter.** Every part a shopper sees is new `xo-` code. Horizon's cart, variant, search and dialog logic is reused underneath. Stock Horizon files are not deleted until the owner approves the list in P24.
2. **Everything editable, everything pre-filled.** Every section on every page is editable in the Theme Editor. Every section ships with real default content from `wordpress-site/`, corrected per `content-fixes.md`. Full rule: `reference/architecture.md`.
3. **No invented facts.** No made-up claims, reviews, lab numbers, customer counts or certificates. Missing content gets `{{TODO: ...}}` and is listed in the report.
4. **Brand name** is spelled XOMOASHRO or Xomoashro, nothing else.
5. **Facts come from data.** Guarantee, phone, WhatsApp, email, shipping threshold and delivery days come from shop metafields; product facts from product metafields. Empty facts hide their line.
6. **Our own design.** Colours and type from `reference/design-system.md`. Competitor patterns are adapted, never copied.
7. **Conservative health wording.** "Supports", "traditionally used for"; never "cures" or "treats". Risky content is flagged for the owner.
8. **Checkout is not touched.**
9. **Ask before deleting** any existing file and before any write to the store.
10. **Finish every phase with commit, push, pull request and merge** once all checks pass (section 3). Stop and ask instead when a check fails or could not be run. Start the next phase only on the owner's go.
11. **Definition of done for any section:** theme check clean; correct at 360, 768 and 1280px; keyboard usable; contrast passes; no layout shift; editable and pre-filled; strings in the locale file; committed.

---

## 8. Using the Shopify toolkit

The Shopify AI toolkit (the `shopify-plugin` skills) and the Shopify CLI are used during implementation, not only at the end.

| When | Tool | How |
|---|---|---|
| Before writing any Liquid, schema or theme JSON | `shopify-plugin:shopify-liquid` | Search the docs for the objects, filters, tags and setting types the task uses; write the code; run the skill's validation on it; fix and re-validate (up to three tries) |
| A question that spans several Shopify areas (consent API, custom pixels, redirects limits, font library, performance) | `shopify-plugin:shopify-dev` | Search first, then answer or build |
| Metafield and metaobject definitions | `shopify-plugin:shopify-custom-data` | Write and validate definitions |
| Products, files, pages, articles, menus, redirects, SEO fields | `shopify-plugin:shopify-admin` | Write and validate each GraphQL operation before it is run |
| Running anything against the store | `shopify-plugin:shopify-use-shopify-cli` | Show the exact command, the store it targets, the data it sends and its effect; run only after the owner confirms |
| Store settings (currency, COD, shipping) | `shopify-plugin:shopify-onboarding-merchant` | Produce the owner's checklist |
| Only if Liquid cannot do a lookup | `shopify-plugin:shopify-storefront-graphql` | Lab-report search fallback |

Shopify CLI commands used (CLI 4.8.4 is installed):

| Command | Use |
|---|---|
| `shopify theme check` | After every task. Zero errors required |
| `shopify theme dev --store <domain>` | Local preview with hot reload while building. The owner keeps this running: preview at `http://127.0.0.1:9292/`, development theme `158613045420`. Any page with `?view=styleguide` (for example `/pages/contact?view=styleguide`) shows the style guide |
| `shopify theme push --unpublished` | Create the working theme on the store (once, in P01) |
| `shopify theme push --theme <id>` | Update the working theme. Never the live theme without approval |
| `shopify theme pull --theme <id> --only config/settings_data.json --only "templates/*.json"` | Before each phase, bring back edits the owner made in the Theme Editor so they are not overwritten |
| `shopify theme profile` | Find slow Liquid (P21) |
| `shopify store execute` | Run approved Admin API operations |
| `shopify theme publish` | Launch only, on the owner's explicit go |

Other tools: the Playwright plugin for screenshots and visual checks at each width; Lighthouse for performance and accessibility scores; axe-core for accessibility scans; Google's Rich Results Test for structured data; `frontend-design`, `design-taste-frontend`, `design:ux-copy`, `design:accessibility-review` and `marketing:seo-audit` skills where the phase file names them.

Not used: Hydrogen (this is a Liquid theme), checkout and customer-account extensions, Functions, POS and app-store skills. A COD fee or COD order limit would need Functions or an app and is outside this plan.

---

## 9. Best practices

### Shopify theme

- **Online Store 2.0 throughout:** JSON templates, section groups for header, footer and overlays, sections everywhere.
- **Schema quality:** every section has settings, blocks where items repeat, and at least one preset with real content. Use `visible_if` to hide settings that do not apply. Limit settings to what is safe to change.
- **Blocks:** theme blocks for reusable pieces, `@app` blocks accepted in the product section and key homepage sections.
- **Dynamic sources:** text and image settings can be connected to metafields in the editor; build sections so that works.
- **Never hard-code** handles, URLs, prices or IDs. Use `routes`, pickers, and settings.
- **Translations:** every interface string through `{{ 'xo.key' | t }}`; schema labels in `en.default.schema.json`.
- **Theme Editor support:** sections re-initialise on `shopify:section:load` and `shopify:block:select`; overlays open when selected in the editor.
- **Do not touch** `{{ content_for_header }}`, checkout, or Shopify's generated sitemap and robots rules without a specific reason.
- **The owner's edits are data.** `settings_data.json` and `templates/*.json` change when the owner uses the editor. Pull before each phase; never push over them blindly.

### Horizon conventions

- Extend the `Component` base class and use `ref` attributes, as Horizon does. Import shared modules through the existing import map (`@theme/component`, `@theme/events`, and so on).
- Keep Horizon's event classes and custom element names when reusing cart, variant, gallery, dialog and search logic.
- Styles live with their file in `{% stylesheet %}`; scripts in `{% javascript %}` or a module in `assets/`.
- Use Horizon's breakpoints, 750px and 990px.
- From 990px up Horizon scrolls `.page-wrapper`, not the window. Use `position: sticky` and viewport-based observers accordingly. For full-page or element screenshots on desktop, first inject `html,body,.page-wrapper{height:auto!important;overflow:visible!important}`.
- Horizon's `base.css` styles `input` by element name. Field styles must include the element (`:is(input, textarea, select).xo-field__control`) to take effect.
- Create a section file before the template that uses it; the live preview uploads files as they are saved and rejects a template that names a missing section.
- After changing many files at once, do not rely on the live preview to upload them all: on 2026-10-07 it skipped one changed section. Push the changed files to the development theme directly (`shopify theme push --theme <development theme id> --only <file> --nodelete`) before checking the page.

### Pictures

- Content pictures live in the store's Files, never in `assets/`. `tools/upload-files.mjs` uploads everything listed in `images-generated/manifest.json` with its alt text and replaces a file of the same name, so a better version of a picture can be swapped in without touching the theme. Settings refer to a picture as `shopify://shop_images/<file name>`.
- `tools/compose-homepage-images.mjs` restages the real photographs locally. `tools/generate-images.mjs` makes pictures with OpenAI from a jobs file and switches between the keys in `.env` when one is refused. Never print or commit the keys; `.env` is git-ignored.
- Never redraw the bottle's label by hand or accept a generated picture in which the logo or lettering has changed. Check each generated picture against the real bottle before uploading.
- Check what an old-site picture actually shows before using it: two files named as shilajit were stock photos of caviar and of a jelly dessert.

### Liquid

- `render`, never `include`. Pass only what the snippet needs.
- Document every snippet with a `{% doc %}` block listing its parameters.
- No loops inside loops over large collections; assign a metafield once and reuse it.
- Escape output that comes from settings or customers (`| escape`), and use `| json` for data passed to scripts.
- Images through `image_url` and `image_tag` with `widths`, `sizes`, and width and height attributes.
- Dates and time-based logic that must be exact run in JavaScript, because pages are cached.

### CSS

- Mobile first. Custom properties for every colour, space and size. Fluid type with `clamp()`.
- Logical properties only, so right-to-left works.
- Container queries for components, media queries for page layout.
- Hover styles inside `@media (hover: hover)`. Motion inside `@media (prefers-reduced-motion: no-preference)`.
- No `!important` except to override third-party app styles.

### JavaScript

- Vanilla ES modules and web components. No jQuery, no UI libraries.
- Every script deferred; loaded only when its section is on the page.
- Progressive enhancement: links, forms, accordions (`<details>`) and add to cart work without JavaScript where possible.
- Reveal-on-scroll is CSS only (`data-xo-reveal`, scroll-driven animation). Do not hide content with a script-added class: Horizon morphs re-rendered sections and would strip it.
- Passive scroll and touch listeners.
- State kept in the DOM or `localStorage` with an `xo:` prefix; no global variables.
- Analytics: the theme only publishes events with `Shopify.analytics.publish`; all tags live in Customer Events.

### Accessibility

- Native elements first; ARIA only where needed.
- Visible focus, logical focus order, focus trapped in modals and returned on close.
- Contrast 4.5:1 for text, 3:1 for large text and interface parts.
- Everything that moves can be paused; reduced motion respected.
- Targets at least 44 by 44px. Usable at 200% zoom and 320px width.

### Performance

- One LCP image per page: eager, high priority, preloaded, right-sized.
- Width and height on every image and embed; space reserved for late content.
- Two font families, few weights, `font-display: swap`.
- No third-party script in the theme. Every app and pixel is weighed before it is added.
- Targets: mobile LCP under 2.5s, CLS under 0.1, INP under 200ms, Lighthouse mobile 85 or higher.

### SEO

- One H1 per page, unique title and description, canonical URL.
- Structured data matches what is visible on the page.
- Old slugs kept; every old URL redirected with a single 301.
- Alt text on every content image.

### Tracking and privacy

- Consent first: Shopify's Customer Privacy API is the single source of truth.
- One route per tool: never the same GA4 property through two integrations.
- No personal data sent to analytics.
- Tracking code lives in Customer Events (custom pixel) and Shopify's own sales-channel apps, never in theme files.

### Git and safety

- One branch per phase, one commit per task, clear messages.
- Never amend, rebase or otherwise rewrite a commit. The owner's GitHub Desktop pushes alongside the agent, and a rewritten commit causes a conflict on their next pull. Corrections go in a new commit.
- Do not switch branches in the middle of a phase. `shopify theme dev` mirrors every file change, including the deletions a branch switch causes, to the development theme.
- Never commit tokens, passwords or customer data.
- Never push to or publish the live theme, and never write to the store, without the owner's explicit approval for that action.
- Before deleting or overwriting anything, look at it and list it.

---

## 10. Changing the plan

- **New feature:** add a phase file in `phases/` with the next free number using the same headings as the others, add its row to section 6 and to `status.md`, and state what it needs and what it unblocks.
- **New question:** add it to `decisions.md` with the next free ID and reference it from the phases that use it.
- **Changed decision:** update the answer in `decisions.md` with the date, and list in the "Log" of `status.md` which finished phases need a follow-up.
- **This file** changes only when the way of working changes. The earlier single-file plan is kept at `reference/_implementation-plan-v1-archive.md`.
