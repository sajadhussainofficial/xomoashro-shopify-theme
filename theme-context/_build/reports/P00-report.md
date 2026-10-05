# P00 report — Inventory and audit

Date: 2026-10-06. Branch: `phase/P00-inventory-and-audit`.

## 1. Result

The phase goal is met: the WordPress capture is now a content map, an image manifest with optimised images, a list of copy corrections and a theme audit. No theme code was written.

## 2. Files created and changed

| File | What it is |
|---|---|
| `.gitignore` | Ignores `node_modules`, Playwright logs and raw screenshot folders |
| `_build/content-map.md` | Every old page, section, post, policy, testimonial and contact detail mapped to its new home |
| `_build/image-manifest.csv` | 141 rows: new file name, intended use, alt text, dimensions, reuse yes or no, reshoot note |
| `_build/tools/optimize-images.mjs`, `package.json`, `package-lock.json` | Image optimisation script (sharp) |
| `_build/images-optimized/` | 44 files: 39 WebP images, 5 logo SVGs and 1 COD mark, plus `_optimization-log.csv` |
| `_build/content-fixes.md` | 12 global fixes, 14 claim items, 6 benefit rewrites, 6 FAQ rewrites, policy and journal items |
| `_build/theme-audit.md` | Baseline, reuse map per phase, code risks, deletion candidates |
| `_build/decisions.md`, three phase files, `implementation-plan.md` | New question B18 added |
| `_build/tasks/P00-tasks.md`, `_build/status.md` | Task list and status |

## 3. Source content used

- `wordpress-site/pages/*.md` and `seo-meta.csv` → `content-map.md`, `content-fixes.md`.
- `wordpress-site/assets/` and `assets/manifest.json` → `image-manifest.csv`, `images-optimized/`.
- `xomoashro-them/` (read only) and `reference/analysis.md` → `theme-audit.md`.

## 4. Acceptance checks

| Check | Result | Evidence |
|---|---|---|
| Every file in `wordpress-site/assets/` has a manifest row | Pass | 141 files on disk, 141 rows, 0 missing |
| Every old URL in `seo-meta.csv` appears in the content map | Pass | 43 slugs checked; `blogs` was missing on the first run and was added |
| Optimised images open and are smaller than the originals | Pass | 44 files verified; 7,586 KB → 3,284 KB; none larger than its original; originals unchanged (`git diff` on `wordpress-site/` is empty) |
| No silent meaning changes in `content-fixes.md` | Pass | Every claim change is marked: 26 CONFIRM, 7 REVIEW; spelling-only changes are marked Fix |
| Baseline `shopify theme check` recorded | Pass | 358 files, 0 errors, 6 warnings, all in stock Horizon files |

## 5. Defaults taken

- **B17:** raw screenshot folders are ignored in git; text, data, source assets and optimised images are committed.

## 6. Open items

- **New question B18:** three jar designs are in the media library (black lid, gold lid, green). Default: black lid, as on the old live site.
- **26 CONFIRM items** in `content-fixes.md`, most tied to decisions B1, B3, B4, B8, B9 and B11.
- **7 REVIEW items** for journal health content. Highest priority: the pregnancy post presents shilajit as a remedy during pregnancy.
- **Images:** 97 of 141 assets are not reusable (unrelated stock, old-design graphics, icon packs of unknown licence, other brands' packaging). The only product image is 735×582. All 25 journal images are AI-generated.
- **No featured image** exists for the newest post, `what-is-shilajit`.

## 7. How to preview

Nothing to preview; this phase produced documents and images only. Open the files listed in part 2.

## 8. Next

- Recommended next phase: **P02 Design foundation**. It needs no hard decision. Its one soft decision is B5 (logo colour).
- Its files can be written and linted now, but its visual checks need a store preview, so decision **B7** (Shopify store domain and CLI login) is needed before P02 can be marked done.
