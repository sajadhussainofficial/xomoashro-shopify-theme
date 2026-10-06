# P04 report — Announcement bar

Date: 2026-10-06. Branch: `phase/P04-announcement-bar`.

## 1. Result

The phase goal is met: a slim, editable announcement bar above the header with rotating messages, a pause button, optional arrows and an optional close button, with no layout shift.

## 2. Files created and changed

Theme (`xomoashro-them/`):

| File | What it is |
|---|---|
| `sections/xo-announcement.liquid` | Announcement bar section with "Message" blocks and four default messages |
| `assets/xo-announcement.js` | Rotation, pause on hover, focus and button, arrows, dismiss for the session, analytics on link click |
| `assets/xo-analytics.js` | Shared helper that publishes `xo:` events to Shopify Customer Events; never throws. Used again by the popup, WhatsApp widget and tracking phases |
| `snippets/scripts.liquid` | Import map entry for the helper |
| `sections/header-group.json` | Uses the new bar in place of Horizon's announcements |
| `locales/en.default.json`, `en.default.schema.json` | Bar strings and editor labels |
| `shopify.theme.toml` (repository root and `xomoashro-them/`) | Makes `shopify theme dev` and other theme commands safe from either folder (see part 6) |

Build files: `tasks/P04-tasks.md`, `reports/P04-screens/`, runner and status updates.

Two deviations from the phase file, both smaller than planned: the bar uses blocks defined in the section instead of a separate `blocks/_xo-announcement-message.liquid` file, and its own small script instead of Horizon's `announcement-bar.js`, which cannot pause on focus or offer a pause button.

## 3. Source content used

- "Cash on delivery" and the Chitral and Gilgit-Baltistan sourcing line from `wordpress-site/pages/home.md` and `about-us.md`.
- Free delivery and WhatsApp messages from the master prompt; their values come from store data (decisions B9 and B4).

## 4. Acceptance checks

| Check | Result | Evidence |
|---|---|---|
| No layout shift from the bar on load | Pass | CLS 0 at 360 and 1280px and in three repeat loads at 768px. A dismissed bar is hidden before first paint: CLS 0 on reload |
| Messages, order, links and timing change from the editor | Pass, by proxy | Changing the section's saved settings (one message, new text and link, dark tone, larger text, close button on) changed the live bar. The editor itself was not opened (needs your admin login) |
| Works with one message | Pass | One message: no arrows, no pause button, no rotation |
| Readable at 360px | Pass | Both visible messages fit without being cut at 320 and 360px (`bar-360.jpeg`, `bar-360-second-message.jpeg`) |
| Rotation can be paused (WCAG 2.2.2) | Pass | Rotates every 6 seconds; stops while hovered, while focused and when the pause button is pressed (`aria-pressed`, label switches to "Play"); resumes after |
| Reduced motion | Pass | No rotation and no pause button; arrows still work |
| Keyboard and screen readers | Pass | Arrows are real buttons; hidden messages are `inert`; the message is announced only when the visitor changes it |
| Analytics event | Pass | `xo:announcement_click` published with message, link and position; the helper does not throw when Shopify analytics is missing |
| Toolkit validation and theme check | Pass | 5 of 5 files valid; 0 errors, the same 6 stock warnings |

Controls in the bar are 32px, below the 44px used for main controls but above the 24px minimum in WCAG 2.2.

## 5. Defaults taken

- **B9 and B4 not answered:** the free delivery and WhatsApp messages are set up but hidden until the free delivery amount and WhatsApp number are saved in store data (P01). Today the bar shows two messages: cash on delivery, and the sourcing line.
- Close button off by default.

## 6. Open items

- **The repeated "Failed to delete" errors are fixed.** They happened because `shopify theme dev` was started from the repository folder, where the CLI saw no theme files and deleted the development theme's files. `shopify.theme.toml` now points the CLI at `xomoashro-them` from the repository folder, and `nodelete = true` stops it deleting remote files at all. Tested: started from the repository folder, zero deletion attempts.
- The shortened sourcing message reads "From Chitral and Gilgit-Baltistan" so it fits on phones.
- No `{{TODO}}` markers were placed.

## 7. How to preview

- `shopify theme dev` from the repository folder or from `xomoashro-them`, then `http://127.0.0.1:9292/`.
- Theme Editor: "Announcement bar" in the Header group. Settings: tone, text size, rotation and speed, arrows, close button. Blocks: "Message" (text with `[amount]` or `[days]`, link, icon, "only show when this is set").

## 8. Next

- **P05 Footer** is next and unblocked. Soft questions: guarantee and phone or WhatsApp number (B4); the "5,000+ customers" claim, the Asad photo and social profile links (B8).
