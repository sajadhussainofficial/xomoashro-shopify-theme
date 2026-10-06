/**
 * Publishes a custom event to Shopify's Customer Events (web pixels), for example
 * the Google Tag Manager pixel set up in phase P16. The theme never loads tracking
 * scripts itself; it only announces what happened.
 *
 * Events are only delivered to pixels configured on the store, and respect the
 * visitor's consent. Publishing never throws.
 *
 * @param {string} name - Event name with the `xo:` prefix, for example `xo:announcement_click`
 * @param {Record<string, unknown>} [data] - Event data. Never include personal details.
 */
export function publish(name, data = {}) {
  try {
    const result = window.Shopify?.analytics?.publish?.(name, data);
    if (result && typeof result.catch === 'function') result.catch(() => {});
  } catch (_) {
    // Analytics must never break the storefront.
  }
}
