# P01 tasks

| # | Task | Files | Check | Status |
|---|---|---|---|---|
| 1 | Confirm store access and record it | `decisions.md` | `shopify theme list` shows the store's themes | done (B7, 2026-10-06) |
| 2 | Theme config files for the CLI | `shopify.theme.toml`, `xomoashro-them/shopify.theme.toml` | Theme commands work from both folders | done (in P04) |
| 3 | Field definitions: product, size (variant) and shop | `store-setup/metafield-definitions.json`, `metafield-definition-create.graphql` | Valid against the Admin API schema; visible in Settings > Custom data after running | prepared, waiting for approval |
| 4 | Lab report metaobject definition | `store-setup/lab-report-definition.json`, `metaobject-definition-create.graphql` | Same | prepared, waiting for approval |
| 5 | Store facts | `store-setup/shop-metafield-values.json`, `shop-metafields-set.graphql` | Values read back from the store; theme shows them | prepared, waiting for approval and answers to B4, B9 |
| 6 | Runner and read-back | `store-setup/run_setup.py`, `read-back.graphql`, `shop-id.graphql` | `read-back-result.json` lists every definition | prepared, waiting for approval |
| 7 | Owner checklist | `store-setup/settings-checklist.md` | Owner ticks each item | done |
| 8 | Working copy of the theme on the store (optional) | none | `shopify theme push --unpublished` creates a theme with a stable preview link | done: theme 158632640684 |
