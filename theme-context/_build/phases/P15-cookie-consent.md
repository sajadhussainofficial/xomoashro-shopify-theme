# P15 — Cookie consent

Group: Interactive features. Run this phase through [`implementation-plan.md`](../implementation-plan.md); it defines how tasks are created, built, checked and reported. Paths are relative to `theme-context/_build/` unless they start with a theme folder (`sections/`, `blocks/`, `snippets/`, `assets/`, `templates/`, `layout/`, `config/`, `locales/`), which are in `xomoashro-them/`.

## Goal

A branded cookie consent banner connected to Shopify's Customer Privacy API, so analytics and marketing pixels load only with the visitor's consent.

## Dependencies

- **Needs finished first:** [P02](P02-design-foundation.md) Design foundation, [P05](P05-footer.md) Footer.
- **Unblocks:** [P16](P16-google-tag-manager.md) Google Tag Manager, [P21](P21-speed-optimization.md) Speed optimization, [P22](P22-accessibility.md) Accessibility, [P23](P23-responsiveness.md) Responsiveness.

## Decisions needed from the owner

Ask the open ones before creating tasks. A **hard** decision stops the phase (or the named task) until answered. A **soft** decision lets the phase proceed on the default, which must be listed in the report.

| ID | Question | Type | If unanswered |
|---|---|---|---|
| B14 | Cookie banner: show to every visitor on first visit, or only where the law requires consent? | soft | Show to every visitor once, with Accept, Decline and Preferences. |
| B7 | Shopify store domain (`*.myshopify.com`) and Shopify CLI login on this machine. | soft | None: without this nothing can be previewed or pushed. |

## Read first

- snippets/xo-tokens.liquid (overlay layering contract)

## Shopify toolkit and tools

- `shopify-dev`: search "Customer Privacy API", "consent-tracking-api", "cookie banner" and confirm the current method names before writing.
- `shopify-liquid`: validate the section.

## Files

- Create `sections/xo-cookie-consent.liquid`
- Create `assets/xo-cookie-consent.js`
- Modify `sections/overlay-group.json`, `sections/xo-footer.liquid` (add "Cookie preferences" link)
- Create `_build/tracking/consent-notes.md`

## Task outline

Expand these into `tasks/P15-tasks.md` at phase start (one task per file or per coherent unit, each with its own check).

1. Confirm the store's privacy setup: Settings > Customer privacy. Turn Shopify's own banner off if this custom banner is used, so two banners never show. Record the chosen regions.
2. Load the consent API with `Shopify.loadFeatures` (`consent-tracking-api`); show the banner when the API says consent is needed and none is stored, or always on first visit if decision B14 says so.
3. Banner: short text, links to the privacy policy, three actions of equal weight: Accept, Decline, Preferences.
4. Preferences panel: Necessary (always on), Analytics, Marketing, Preferences; Save sends the choices with `setTrackingConsent`.
5. A "Cookie preferences" link in the footer reopens the panel at any time.
6. Section settings: all texts, position (bottom bar or bottom corner card), tone, show Decline button, policy link.
7. Layout: bottom of the screen, never a full-screen wall; adds its height to `--xo-bottom-offset`; the promo popup waits until a choice is made.
8. Accessibility: a labelled region, focus moves to it on first show without trapping, all controls reachable by keyboard, toggles are real checkboxes.
9. Write `consent-notes.md`: what each category controls, how Shopify pixels and the GTM custom pixel read consent (used by P16 and P17).

## Best practices for this phase

- Do not set analytics or marketing cookies before consent where consent is required.
- Accept and Decline must be equally easy; no pre-ticked optional categories.
- Use Shopify's consent API as the single source of truth; do not keep a separate consent cookie.
- This is a technical implementation, not legal advice; the owner confirms the policy text.

## Acceptance checks

The phase is done only when every line is verified and the evidence (command output, screenshot path, URL) is in the report.

- [ ] First visit shows the banner; the choice persists across pages and visits.
- [ ] With Decline, Shopify's analytics and marketing pixels do not fire (check in the browser network panel).
- [ ] Footer link reopens preferences.
- [ ] Banner does not cover the add-to-cart button at 360px.
- [ ] All text editable.

## Out of scope

Region-specific legal texts, a consent log for audits (would need an app).
