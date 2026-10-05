/**
 * Overlay coordination for everything fixed to the screen. See the contract at the
 * top of `snippets/xo-tokens.liquid`.
 *
 * - Bars fixed to the bottom carry `data-xo-bottom-bar`. The combined height of the
 *   visible ones is written to `--xo-bottom-offset` on the root element, and each
 *   bar receives `--xo-bar-offset`: the height of the bars stacked beneath it.
 *   Stack order follows the attribute value (lower number sits lower), then DOM order.
 * - `isOverlayBlocked()` tells a modal whether it may open now.
 */

const BAR_SELECTOR = '[data-xo-bottom-bar]';
const root = document.documentElement;

/** @param {Element} element */
const isShown = (element) =>
  element instanceof HTMLElement && !element.hidden && element.getClientRects().length > 0;

/** @param {Element} element */
const orderOf = (element) => Number(element.getAttribute('data-xo-bottom-bar')) || 0;

let frame = 0;

function measure() {
  frame = 0;
  const bars = [...document.querySelectorAll(BAR_SELECTOR)].filter(isShown).sort((a, b) => orderOf(a) - orderOf(b));
  let total = 0;

  for (const bar of bars) {
    if (!(bar instanceof HTMLElement)) continue;
    bar.style.setProperty('--xo-bar-offset', `${total}px`);
    total += bar.offsetHeight;
  }

  root.style.setProperty('--xo-bottom-offset', `${total}px`);
}

/** Recalculates the bottom stack on the next frame. Call after showing or hiding a bar. */
export function updateBottomStack() {
  if (frame) return;
  frame = window.requestAnimationFrame(measure);
}

/**
 * True when a modal should not open: another dialog or drawer is open, or a
 * consent choice is still pending.
 * @param {Element} [ignore] - The caller's own dialog, left out of the check
 * @returns {boolean}
 */
export function isOverlayBlocked(ignore) {
  for (const dialog of document.querySelectorAll('dialog[open]')) {
    if (dialog !== ignore && !ignore?.contains(dialog)) return true;
  }
  if (root.hasAttribute('scroll-lock')) return true;
  return [...document.querySelectorAll('[data-xo-consent-pending]')].some(isShown);
}

const resizeObserver = new ResizeObserver(updateBottomStack);
const seen = new WeakSet();

function track() {
  for (const bar of document.querySelectorAll(BAR_SELECTOR)) {
    if (seen.has(bar)) continue;
    seen.add(bar);
    resizeObserver.observe(bar);
  }
  updateBottomStack();
}

new MutationObserver(track).observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['hidden', 'data-xo-bottom-bar', 'open'],
});

window.addEventListener('resize', updateBottomStack, { passive: true });
track();
