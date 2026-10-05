# P00 — Inventory and audit

Group: Foundation. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

Turn the raw WordPress capture into build-ready inputs: a content map, optimised images, a list of copy corrections and a theme audit. No theme code is written.

## Dependencies

- **Needs finished first:** nothing; can start now.
- **Unblocks:** [P01](P01-store-setup-and-data-model.md) Store setup and data model, [P02](P02-design-foundation.md) Design foundation, [P12](P12-content-import.md) Content import.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B17 | Commit the raw screenshots (about 240 MB) to git, or ignore them? | soft | Ignore the PNG folders, commit text and data files. |

## Read first

- reference/analysis.md
- reference/content-and-seo.md
- ../wordpress-site/README.md
- ../master-prompt.md (Step 0)

## Shopify toolkit and tools

- None needed for inventory. Run `shopify theme check` once in `xomoashro-them/` to record the baseline (today: 0 errors, 6 warnings).

## Files

- Create `_build/content-map.md`
- Create `_build/image-manifest.csv`
- Create `_build/images-optimized/` (WebP)
- Create `_build/tools/optimize-images.mjs` and `_build/tools/package.json` (sharp)
- Create `_build/content-fixes.md`
- Create `_build/theme-audit.md`
- Create `.gitignore` at the repository root

## Task outline

Expand these into `tasks/P00-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Create `.gitignore`: `node_modules/`, `.playwright-mcp/`, `theme-context/_build/tools/node_modules/`. Ask whether the raw screenshots (about 240 MB in `wordpress-site/screenshots` and `competitors/`) should be committed; default is to ignore the PNG folders and commit the text files.
2. Write `content-map.md`: file tree by type; every old page and its sections mapped to the new `xo-` section; the one product and its known fields; 10 blog posts with slug, date, featured image; three policies; three testimonials; all contact data with the conflicts marked.
3. Write `image-manifest.csv` for all 141 assets: original path, new kebab-case name (`xomoashro-<subject>-<detail>.webp`), intended use, alt text, dimensions, `needs_reshoot` with a reason. Mark the AI-generated and unrelated stock images as not reusable.
4. Install sharp under `_build/tools/` and write `optimize-images.mjs`: WebP, max 2400px wide for hero images and 1600px for others, originals untouched. Run it and record input and output sizes.
5. Write `content-fixes.md`: every correction as before and after, grouped by page, with `CONFIRM` on anything that changes meaning (guarantee, phone, customer count, lab claims, health claims).
6. Write `theme-audit.md`: confirm the findings in `reference/analysis.md` still hold, list the Horizon custom elements each later phase will reuse, and list the stock files that are candidates for deletion at launch.
7. Update `decisions.md` with any new question found during inventory.

## Best practices for this phase

- Never modify files in `wordpress-site/`; write derived files to `_build/` only.
- Alt text describes what is in the image, not keywords.
- Flag, never silently fix, anything that changes a claim.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] Every file in `wordpress-site/assets/` has a row in the manifest.
- [ ] Every old page in `seo-meta.csv` appears in the content map with a destination or an explicit "not migrated".
- [ ] Optimised images open and are smaller than the originals.
- [ ] `content-fixes.md` contains no silent meaning changes.

## Out of scope

Writing theme code, uploading anything to Shopify.
